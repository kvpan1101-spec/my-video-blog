"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      // 检查响应是否为 JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('非 JSON 响应:', text)
        throw new Error('API 返回非 JSON 数据')
      }

      const data = await response.json()

      if (data.success) {
        // 存储token到localStorage
        localStorage.setItem('token', data.data.token)
        // 跳转到后台首页
        router.push('/admin')
      } else {
        setError(data.error || '登录失败')
      }
    } catch (err) {
      setError('登录失败，请稍后重试')
      console.error('登录失败:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-lg border-2 border-sunshine/30">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-sunshine rounded-full flex items-center justify-center">
            <LogIn size={32} className="text-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">后台管理登录</h1>
          <p className="text-foreground/60 mt-2">请使用管理员账号登录</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-cherry/10 text-cherry rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              邮箱
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入邮箱"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入密码"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-cream py-3 rounded-lg font-bold hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
      </div>
    </div>
  )
}
