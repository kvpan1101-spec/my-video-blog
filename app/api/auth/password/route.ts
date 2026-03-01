import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/cloudbase'
import { JWT_SECRET } from '@/lib/config'
import bcrypt from 'bcrypt'
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

export async function PUT(request: NextRequest) {
  try {
    const userInfo = await verifyToken(request)
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: '未授权', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    const { oldPassword, newPassword } = await request.json()

    // 验证参数
    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数', code: 'MISSING_PARAMS' },
        { status: 400 }
      )
    }

    // 获取用户信息
    const userResult = await usersCollection.doc(userInfo._id).get()
    if (!userResult.data) {
      return NextResponse.json(
        { success: false, error: '用户不存在', code: 'USER_NOT_FOUND' },
        { status: 404 }
      )
    }

    const user = userResult.data

    // 验证旧密码 - 支持明文和bcrypt两种格式
    let passwordMatch = false
    if (user.password === oldPassword) {
      passwordMatch = true
    } else {
      passwordMatch = await bcrypt.compare(oldPassword, user.password)
    }
    
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, error: '旧密码错误', code: 'INVALID_OLD_PASSWORD' },
        { status: 400 }
      )
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // 更新密码
    await usersCollection.doc(userInfo._id).update({ password: hashedPassword })

    return NextResponse.json(
      { success: true, message: '密码修改成功' },
      { status: 200 }
    )
  } catch (error) {
    console.error('修改密码失败:', error)
    return NextResponse.json(
      { success: false, error: '修改密码失败', code: 'CHANGE_PASSWORD_FAILED' },
      { status: 500 }
    )
  }
}
