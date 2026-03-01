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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    // 验证用户身份
    const userInfo = await verifyToken(request)
    
    // 如果有token但验证失败，返回错误
    if (userInfo === null && request.headers.get('authorization')) {
      return NextResponse.json(
        { success: false, error: 'Token已失效', code: 'TOKEN_INVALID' },
        { status: 401 }
      )
    }

    // 构建查询 - 前台只返回已发布的作品
    let query = worksCollection

    // 前台用户（未登录）：只返回已发布的作品
    // 后台管理员：可以查看所有状态的作品
    if (!userInfo || userInfo.role !== 'admin') {
      query = query.where({ status: 'published' })
    } else if (status) {
      // 管理员指定了状态筛选
      query = query.where({ status })
    }

    // 按分类筛选
    if (category) {
      query = query.where({ category })
    }

    // 计算偏移量
    const offset = (page - 1) * limit

    // 获取总数
    const countResult = await query.count()
    const total = countResult.total

    // 获取分页数据
    const works = await query
      .orderBy('created_at', 'desc')
      .skip(offset)
      .limit(limit)
      .get()

    return NextResponse.json(
      { 
        success: true, 
        data: {
          works: works.data,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }, 
        message: '获取作品列表成功' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('获取作品列表失败:', error)
    return NextResponse.json(
      { success: false, error: '获取作品列表失败', code: 'GET_WORKS_FAILED' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userInfo = await verifyToken(request)
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: '未授权', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    // 检查权限（只有管理员可以创建作品）
    if (userInfo.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: '权限不足', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }

    const { title, description, video_url, cover_image, category, tags, status } = await request.json()

    // 验证参数
    if (!title || !description || !category) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数', code: 'MISSING_PARAMS' },
        { status: 400 }
      )
    }

    // 创建作品
    const newWork = {
      title,
      description,
      video_url: video_url || '',
      cover_image: cover_image || '',
      category,
      tags: tags || [],
      status: status || 'draft',
      author_id: userInfo._id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const result = await worksCollection.add(newWork)

    return NextResponse.json(
      { success: true, data: { _id: result.id, ...newWork }, message: '创建作品成功' },
      { status: 201 }
    )
  } catch (error) {
    console.error('创建作品失败:', error)
    return NextResponse.json(
      { success: false, error: '创建作品失败', code: 'CREATE_WORK_FAILED' },
      { status: 500 }
    )
  }
}
