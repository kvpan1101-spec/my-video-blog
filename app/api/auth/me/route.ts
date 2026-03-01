import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/cloudbase'
import { JWT_SECRET } from '@/lib/config'
import jwt from 'jsonwebtoken'

const usersCollection = db.collection('users')

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
    const userInfo = await verifyToken(request)
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: '未授权', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    const userResult = await usersCollection.where({ _id: userInfo._id }).get()
    if (userResult.data.length === 0) {
      return NextResponse.json(
        { success: false, error: '用户不存在', code: 'USER_NOT_FOUND' },
        { status: 404 }
      )
    }

    const user = userResult.data[0]
    // 不返回密码
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(
      { success: true, data: userWithoutPassword, message: '获取用户信息成功' },
      { status: 200 }
    )
  } catch (error) {
    console.error('获取用户信息失败:', error)
    return NextResponse.json(
      { success: false, error: '获取用户信息失败', code: 'GET_USER_FAILED' },
      { status: 500 }
    )
  }
}
