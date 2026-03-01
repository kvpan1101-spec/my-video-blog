import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/cloudbase'
import bcrypt from 'bcrypt'

const usersCollection = db.collection('users')

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json()

    // 验证参数
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数', code: 'MISSING_PARAMS' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existingUser = await usersCollection.where({ email }).get()
    if (existingUser.data.length > 0) {
      return NextResponse.json(
        { success: false, error: '邮箱已被注册', code: 'EMAIL_EXISTS' },
        { status: 400 }
      )
    }

    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建用户
    const newUser = {
      username,
      email,
      password: hashedPassword,
      role: 'user',
      status: 'active',
      created_at: new Date().toISOString()
    }

    const result = await usersCollection.add(newUser)

    return NextResponse.json(
      { success: true, data: { _id: result.id, ...newUser }, message: '注册成功' },
      { status: 201 }
    )
  } catch (error) {
    console.error('注册失败:', error)
    return NextResponse.json(
      { success: false, error: '注册失败', code: 'REGISTER_FAILED' },
      { status: 500 }
    )
  }
}
