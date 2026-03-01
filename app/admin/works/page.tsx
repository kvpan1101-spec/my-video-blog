"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function WorksManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [works, setWorks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('全部')
  const [status, setStatus] = useState('全部')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = ['全部', '短视频', '图文', '小说推文', '其他']
  const statuses = ['全部', 'published', 'draft']

  useEffect(() => {
    fetchWorks()
  }, [category, status, page])

  const fetchWorks = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const categoryParam = category !== '全部' ? `&category=${category}` : ''
      const statusParam = status !== '全部' ? `&status=${status}` : ''

      console.log('Fetching works with params:', { page, limit: 10, category, status })
      
      const response = await fetch(`/api/works?page=${page}&limit=10${categoryParam}${statusParam}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log('Response status:', response.status)
      
      // 检查响应是否为 JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('非 JSON 响应:', text)
        throw new Error('API 返回非 JSON 数据')
      }
      
      const data = await response.json()
      console.log('Response data:', data)
      
      if (data.success) {
        setWorks(data.data.works)
        setTotalPages(data.data.pagination.totalPages)
      } else {
        console.error('API error:', data.error)
      }
    } catch (error) {
      console.error('获取作品列表失败:', error)
    } finally {
      setLoading(false)
      console.log('Loading set to false')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个作品吗？')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/works/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      if (data.success) {
        toast({
          title: '删除成功',
          description: '作品已成功删除',
          variant: 'default'
        })
        fetchWorks()
      } else {
        toast({
          title: '删除失败',
          description: data.error || '删除作品时发生错误',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('删除作品失败:', error)
      toast({
        title: '删除失败',
        description: '网络错误，请稍后重试',
        variant: 'destructive'
      })
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const token = localStorage.getItem('token')
      const newStatus = currentStatus === 'published' ? 'draft' : 'published'
      const statusText = newStatus === 'published' ? '发布' : '草稿'

      const response = await fetch(`/api/works/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('非 JSON 响应:', text)
        throw new Error('API 返回非 JSON 数据')
      }

      const data = await response.json()
      if (data.success) {
        toast({
          title: '状态更新成功',
          description: `作品已设为${statusText}`,
          variant: 'default'
        })
        if (status !== '全部') {
          setStatus('全部')
        } else {
          fetchWorks()
        }
      } else {
        toast({
          title: '状态更新失败',
          description: data.error || '更新状态时发生错误',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('切换状态失败:', error)
      toast({
        title: '状态更新失败',
        description: '网络错误，请稍后重试',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">作品管理</h1>
          <p className="text-foreground/60">管理所有作品的发布状态和内容</p>
        </div>
        <button
          onClick={() => router.push('/admin/works/new')}
          className="bg-foreground text-cream px-5 py-2 rounded-lg font-bold hover:bg-foreground/90 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          新增作品
        </button>
      </div>

      {/* 筛选条件 */}
      <div className="bg-card rounded-2xl p-4 border-2 border-sunshine/30 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            分类
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            状态
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
          >
            {statuses.map((stat) => (
              <option key={stat} value={stat}>
                {stat === '全部' ? '全部' : stat === 'published' ? '已发布' : '草稿'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 作品列表 */}
      <div className="bg-card rounded-2xl border-2 border-sunshine/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-sunshine/5">
                <th className="text-left py-4 px-4 text-foreground/70 font-medium">标题</th>
                <th className="text-left py-4 px-4 text-foreground/70 font-medium">分类</th>
                <th className="text-left py-4 px-4 text-foreground/70 font-medium">状态</th>
                <th className="text-left py-4 px-4 text-foreground/70 font-medium">创建时间</th>
                <th className="text-right py-4 px-4 text-foreground/70 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-foreground/50">
                    加载中...
                  </td>
                </tr>
              ) : works.length > 0 ? (
                works.map((work) => (
                  <tr key={work._id} className="border-t border-sunshine/10 hover:bg-sunshine/5 transition-colors">
                    <td className="py-4 px-4 text-foreground">{work.title}</td>
                    <td className="py-4 px-4 text-foreground/70">{work.category}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        work.status === 'published' ? 'bg-lime/15 text-lime' : 'bg-cherry/15 text-cherry'
                      }`}>
                        {work.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-foreground/70">
                      {new Date(work.created_at).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(work._id, work.status)}
                          className="p-2 rounded-lg text-foreground/70 hover:bg-sunshine/10 transition-colors"
                          title={work.status === 'published' ? '设为草稿' : '发布'}
                        >
                          {work.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button
                          onClick={() => router.push(`/admin/works/${work._id}/edit`)}
                          className="p-2 rounded-lg text-foreground/70 hover:bg-sunshine/10 transition-colors"
                          title="编辑"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(work._id)}
                          className="p-2 rounded-lg text-cherry/70 hover:bg-cherry/10 transition-colors"
                          title="删除"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-foreground/50">
                    暂无作品
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        {!loading && totalPages > 1 && (
          <div className="border-t border-sunshine/10 p-4 flex items-center justify-between">
            <span className="text-foreground/70 text-sm">
              第 {page} 页，共 {totalPages} 页
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-lg border-2 border-sunshine/30 text-foreground/70 hover:bg-sunshine/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-lg border-2 border-sunshine/30 text-foreground/70 hover:bg-sunshine/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
