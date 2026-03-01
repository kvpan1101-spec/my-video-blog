import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // 登出操作主要在前端处理，后端只需要返回成功响应
    // 前端需要清除本地存储的token
    return NextResponse.json(
      { success: true, message: '登出成功' },
      { status: 200 }
    )
  } catch (error) {
    console.error('登出失败:', error)
    return NextResponse.json(
      { success: false, error: '登出失败', code: 'LOGOUT_FAILED' },
      { status: 500 }
    )
  }
}
