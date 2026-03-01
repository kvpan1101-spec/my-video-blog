"use client"

import { useState } from "react"
import { X, LogIn, UserPlus } from "lucide-react"

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加登录或注册的逻辑
    console.log(isLogin ? "登录" : "注册", { username, password, email })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-cream rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-sunshine/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {isLogin ? "登录" : "注册"}
          </h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground transition-colors p-2"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
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
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入用户名"
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
            className="w-full bg-foreground text-cream py-3 rounded-lg font-bold hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
          >
            {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
            {isLogin ? "登录" : "注册"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-cherry font-semibold hover:underline transition-colors text-sm"
          >
            {isLogin ? "还没有账号？点击注册" : "已有账号？点击登录"}
          </button>
        </div>
      </div>
    </div>
  )
}
