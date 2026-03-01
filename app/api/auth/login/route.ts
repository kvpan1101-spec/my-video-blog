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

export async function POST(request: NextRequest) {
  try {
    let requestBody
    try {
      requestBody = await request.json()
    } catch (error) {
      console.error('解析请求体失败:', error)
      return NextResponse.json(
        { success: false, error: '请求体格式错误', code: 'INVALID_REQUEST_BODY' },
        { status: 400 }
      )
    }
    
    const { email, password } = requestBody
    console.log('登录请求:', { email, password })

    // 验证参数
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数', code: 'MISSING_PARAMS' },
        { status: 400 }
      )
    }

    // 查找用户
    const userResult = await usersCollection.where({ email }).get()
    console.log('用户查询结果:', userResult)
    
    if (userResult.data.length === 0) {
      console.log('用户不存在:', email)
      return NextResponse.json(
        { success: false, error: '邮箱或密码错误', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      )
    }

    const user = userResult.data[0]
    console.log('找到用户:', user)

    // 检查用户状态
    if (user.status !== 'active') {
      return NextResponse.json(
        { success: false, error: '账号已被禁用', code: 'ACCOUNT_DISABLED' },
        { status: 403 }
      )
    }

    // 验证密码 - 支持明文密码（开发环境）和bcrypt加密密码（生产环境）
    let passwordMatch = false
    if (user.password === password) {
      // 明文密码匹配（开发环境）
      passwordMatch = true
    } else {
      // 尝试bcrypt验证（生产环境）
      passwordMatch = await bcrypt.compare(password, user.password)
    }

    if (!passwordMatch) {
      console.log('密码不匹配')
      return NextResponse.json(
        { success: false, error: '邮箱或密码错误', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      )
    }

    // 生成JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    console.log('登录成功，生成token:', token)
    return NextResponse.json(
      { 
        success: true, 
        data: { 
          token, 
          user: { 
            _id: user._id, 
            username: user.username, 
            email: user.email, 
            role: user.role 
          } 
        }, 
        message: '登录成功' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('登录失败:', error)
    return NextResponse.json(
      { success: false, error: '登录失败', code: 'LOGIN_FAILED' },
      { status: 500 }
    )
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