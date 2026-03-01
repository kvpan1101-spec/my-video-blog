import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/cloudbase'
import { JWT_SECRET } from '@/lib/config'
import jwt from 'jsonwebtoken'

const worksCollection = db.collection('works')

// 验证JWT token的中间件
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // 验证用户身份
    const userInfo = await verifyToken(request)
    
    // 如果有token但验证失败，返回错误
    if (userInfo === null && request.headers.get('authorization')) {
      return NextResponse.json(
        { success: false, error: 'Token已失效', code: 'TOKEN_INVALID' },
        { status: 401 }
      )
    }

    const workResult = await worksCollection.where({ _id: id }).get()
    if (workResult.data.length === 0) {
      return NextResponse.json(
        { success: false, error: '作品不存在', code: 'WORK_NOT_FOUND' },
        { status: 404 }
      )
    }

    const work = workResult.data[0]
    
    // 前台用户只能查看已发布的作品
    if (!userInfo || userInfo.role !== 'admin') {
      if (work.status !== 'published') {
        return NextResponse.json(
          { success: false, error: '作品不存在', code: 'WORK_NOT_FOUND' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(
      { success: true, data: work, message: '获取作品详情成功' },
      { status: 200 }
    )
  } catch (error) {
    console.error('获取作品详情失败:', error)
    return NextResponse.json(
      { success: false, error: '获取作品详情失败', code: 'GET_WORK_FAILED' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userInfo = await verifyToken(request)
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: '未授权', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    // 检查权限（只有管理员可以更新作品）
    if (userInfo.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: '权限不足', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }

    const { id } = params
    const { title, description, video_url, cover_image, category, tags, status } = await request.json()

    // 验证参数
    if (!title || !description || !category) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数', code: 'MISSING_PARAMS' },
        { status: 400 }
      )
    }

    // 检查作品是否存在
    const existingWorkResult = await worksCollection.where({ _id: id }).get()
    if (existingWorkResult.data.length === 0) {
      return NextResponse.json(
        { success: false, error: '作品不存在', code: 'WORK_NOT_FOUND' },
        { status: 404 }
      )
    }

    const existingWork = existingWorkResult.data[0]

    // 更新作品
    const updatedWork = {
      title,
      description,
      video_url: video_url || '',
      cover_image: cover_image || '',
      category,
      tags: tags || [],
      status: status || 'draft',
      updated_at: new Date().toISOString()
    }

    await worksCollection.where({ _id: id }).update(updatedWork)

    return NextResponse.json(
      { success: true, data: { ...existingWork, ...updatedWork }, message: '更新作品成功' },
      { status: 200 }
    )
  } catch (error) {
    console.error('更新作品失败:', error)
    return NextResponse.json(
      { success: false, error: '更新作品失败', code: 'UPDATE_WORK_FAILED' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userInfo = await verifyToken(request)
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: '未授权', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    // 检查权限（只有管理员可以删除作品）
    if (userInfo.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: '权限不足', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }

    const { id } = params

    // 检查作品是否存在
    const existingWorkResult = await worksCollection.where({ _id: id }).get()
    if (existingWorkResult.data.length === 0) {
      return NextResponse.json(
        { success: false, error: '作品不存在', code: 'WORK_NOT_FOUND' },
        { status: 404 }
      )
    }

    // 删除作品
    await worksCollection.where({ _id: id }).remove()

    return NextResponse.json(
      { success: true, message: '删除作品成功' },
      { status: 200 }
    )
  } catch (error) {
    console.error('删除作品失败:', error)
    return NextResponse.json(
      { success: false, error: '删除作品失败', code: 'DELETE_WORK_FAILED' },
      { status: 500 }
    )
  }
}
