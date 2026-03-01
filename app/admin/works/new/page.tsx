"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Check } from 'lucide-react'

export default function NewWork() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    cover_image: '',
    category: '短视频',
    tags: '',
    status: 'draft'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = ['短视频', '图文', '小说推文', '其他']
  const statuses = [
    { value: 'draft', label: '草稿' },
    { value: 'published', label: '已发布' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/works', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []
        })
      })

      const data = await response.json()
      if (data.success) {
        router.push('/admin/works')
      } else {
        setError(data.error || '创建作品失败')
      }
    } catch (err) {
      setError('创建作品失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">新增作品</h1>
          <p className="text-foreground/60">创建一个新的作品</p>
        </div>
        <button
          onClick={() => router.push('/admin/works')}
          className="bg-sunshine/20 text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-sunshine/30 transition-colors flex items-center gap-2"
        >
          <X size={18} />
          取消
        </button>
      </div>

      {error && (
        <div className="p-4 bg-cherry/10 text-cherry rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border-2 border-sunshine/30 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              标题 <span className="text-cherry">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入作品标题"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              分类 <span className="text-cherry">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              视频链接
            </label>
            <input
              type="url"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入视频链接"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              封面图片
            </label>
            <input
              type="url"
              name="cover_image"
              value={formData.cover_image}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入封面图片链接"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              标签
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入标签，用逗号分隔"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              状态 <span className="text-cherry">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
            >
              {statuses.map(stat => (
                <option key={stat.value} value={stat.value}>
                  {stat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            描述 <span className="text-cherry">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
            placeholder="请输入作品描述"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-sunshine/10">
          <button
            type="button"
            onClick={() => router.push('/admin/works')}
            className="px-6 py-2 rounded-lg border-2 border-sunshine/30 text-foreground hover:bg-sunshine/10 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-foreground text-cream hover:bg-foreground/90 transition-colors flex items-center gap-2"
          >
            {loading ? '创建中...' : (
              <>
                <Check size={18} />
                创建作品
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}