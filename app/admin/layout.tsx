"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  FileText, 
  Users, 
  Upload, 
  LogOut,
  Menu,
  X
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const isLoginPage = pathname === '/admin/login'
    if (isLoginPage) {
      setLoading(false)
      return
    }

    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/admin/login')
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()
        if (data.success) {
          if (data.data.role !== 'admin') {
            router.push('/admin/login')
          } else {
            setUser(data.data)
          }
        } else {
          localStorage.removeItem('token')
          router.push('/admin/login')
        }
      } catch (error) {
        localStorage.removeItem('token')
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">加载中...</div>
      </div>
    )
  }

  const isLoginPage = pathname === '/admin/login'
  if (isLoginPage) {
    return children
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-sunshine/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-foreground"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-foreground">后台管理系统</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-foreground/70">欢迎，{user?.username}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-foreground/70 hover:text-cherry transition-colors"
            >
              <LogOut size={16} />
              登出
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside 
          className={`
            ${isSidebarOpen ? 'block' : 'hidden'} md:block 
            w-64 bg-card border-r border-sunshine/30 
            fixed md:sticky top-[61px] bottom-0 z-20 
            overflow-y-auto
          `}
        >
          <nav className="py-4">
            <ul className="space-y-1 px-3">
              <li>
                <a
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-sunshine/10 transition-colors"
                >
                  <Home size={20} />
                  首页
                </a>
              </li>
              <li>
                <a
                  href="/admin/works"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-sunshine/10 transition-colors"
                >
                  <FileText size={20} />
                  作品管理
                </a>
              </li>
              <li>
                <a
                  href="/admin/users"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-sunshine/10 transition-colors"
                >
                  <Users size={20} />
                  用户管理
                </a>
              </li>
              <li>
                <a
                  href="/admin/files"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-sunshine/10 transition-colors"
                >
                  <Upload size={20} />
                  文件管理
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
