"use client"

import { useState, useEffect } from 'react'
import { BarChart3, FileText, Users, CheckCircle2, Clock } from 'lucide-react'

export default function AdminHome() {
  const [stats, setStats] = useState({
    totalWorks: 0,
    publishedWorks: 0,
    draftWorks: 0,
    totalUsers: 0
  })
  const [recentWorks, setRecentWorks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 获取统计数据
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        
        // 获取作品统计
        const worksResponse = await fetch('/api/works?limit=5', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const worksData = await worksResponse.json()

        if (worksData.success) {
          // 获取作品总数
          const totalWorksResponse = await fetch('/api/works?limit=1', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          const totalWorksData = await totalWorksResponse.json()

          // 获取已发布作品数
          const publishedWorksResponse = await fetch('/api/works?status=published&limit=1', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          const publishedWorksData = await publishedWorksResponse.json()

          // 计算草稿作品数
          const draftWorks = totalWorksData.data.pagination.total - publishedWorksData.data.pagination.total

          // 获取用户总数
          // 这里需要实现用户管理API，暂时使用模拟数据
          const totalUsers = 10

          setStats({
            totalWorks: totalWorksData.data.pagination.total,
            publishedWorks: publishedWorksData.data.pagination.total,
            draftWorks,
            totalUsers
          })

          setRecentWorks(worksData.data.works)
        }
      } catch (error) {
        console.error('获取统计数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="text-foreground">加载中...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">后台首页</h1>
        <p className="text-foreground/60">欢迎回来，查看系统数据统计</p>
      </div>

      {/* 数据统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl p-6 border-2 border-sunshine/30">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-sunshine/15 rounded-xl flex items-center justify-center">
              <FileText size={24} className="text-sunshine" />
            </div>
            <span className="text-2xl font-bold text-foreground">{stats.totalWorks}</span>
          </div>
          <h3 className="text-foreground/70 font-medium">作品总数</h3>
        </div>

        <div className="bg-card rounded-2xl p-6 border-2 border-skyblue/30">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-skyblue/15 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={24} className="text-skyblue" />
            </div>
            <span className="text-2xl font-bold text-foreground">{stats.publishedWorks}</span>
          </div>
          <h3 className="text-foreground/70 font-medium">已发布作品</h3>
        </div>

        <div className="bg-card rounded-2xl p-6 border-2 border-cherry/30">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-cherry/15 rounded-xl flex items-center justify-center">
              <Clock size={24} className="text-cherry" />
            </div>
            <span className="text-2xl font-bold text-foreground">{stats.draftWorks}</span>
          </div>
          <h3 className="text-foreground/70 font-medium">草稿作品</h3>
        </div>

        <div className="bg-card rounded-2xl p-6 border-2 border-lime/30">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-lime/15 rounded-xl flex items-center justify-center">
              <Users size={24} className="text-lime" />
            </div>
            <span className="text-2xl font-bold text-foreground">{stats.totalUsers}</span>
          </div>
          <h3 className="text-foreground/70 font-medium">用户总数</h3>
        </div>
      </div>

      {/* 最近发布的作品 */}
      <div className="bg-card rounded-2xl p-6 border-2 border-sunshine/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">最近发布的作品</h2>
          <a href="/admin/works" className="text-cherry font-medium hover:underline">
            查看全部
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sunshine/30">
                <th className="text-left py-3 px-4 text-foreground/70 font-medium">标题</th>
                <th className="text-left py-3 px-4 text-foreground/70 font-medium">分类</th>
                <th className="text-left py-3 px-4 text-foreground/70 font-medium">状态</th>
                <th className="text-left py-3 px-4 text-foreground/70 font-medium">创建时间</th>
              </tr>
            </thead>
            <tbody>
              {recentWorks.length > 0 ? (
                recentWorks.map((work) => (
                  <tr key={work._id} className="border-b border-sunshine/10 hover:bg-sunshine/5 transition-colors">
                    <td className="py-3 px-4 text-foreground">{work.title}</td>
                    <td className="py-3 px-4 text-foreground/70">{work.category}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        work.status === 'published' ? 'bg-lime/15 text-lime' : 'bg-cherry/15 text-cherry'
                      }`}>
                        {work.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground/70">
                      {new Date(work.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-foreground/50">
                    暂无作品
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
