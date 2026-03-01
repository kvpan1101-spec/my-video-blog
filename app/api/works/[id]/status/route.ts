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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userInfo = await verifyToken(request)
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: '未授权', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    // 检查权限（只有管理员可以切换状态）
    if (userInfo.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: '权限不足', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }

    const { id } = params
    const { status } = await request.json()

    // 验证参数
    if (!status || !['published', 'draft'].includes(status)) {
      return NextResponse.json(
        { success: false, error: '无效的状态值', code: 'INVALID_STATUS' },
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

    // 更新状态
    await worksCollection.where({ _id: id }).update({ 
      status, 
      updated_at: new Date().toISOString() 
    })

    return NextResponse.json(
      { success: true, data: { status }, message: '切换状态成功' },
      { status: 200 }
    )
  } catch (error) {
    console.error('切换状态失败:', error)
    return NextResponse.json(
      { success: false, error: '切换状态失败', code: 'UPDATE_STATUS_FAILED' },
      { status: 500 }
    )
  }
}
