"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Upload, X } from 'lucide-react'

export default function EditWork() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '短视频',
    cover_image: '',
    video_url: '',
    tags: '',
    status: 'draft'
  })
  const [tagInput, setTagInput] = useState('')

  const categories = ['短视频', '图文', '小说推文', '其他']
  const statuses = [
    { value: 'draft', label: '草稿' },
    { value: 'published', label: '已发布' }
  ]

  useEffect(() => {
    fetchWork()
  }, [id])

  const fetchWork = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/works/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
        const workTags = Array.isArray(data.data.tags) ? data.data.tags.join(', ') : ''
        setFormData({
          title: data.data.title,
          description: data.data.description,
          category: data.data.category,
          cover_image: data.data.cover_image || '',
          video_url: data.data.video_url || '',
          tags: workTags,
          status: data.data.status
        })
      } else {
        console.error('获取作品详情失败:', data.error)
      }
    } catch (error) {
      console.error('获取作品详情失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddTag = () => {
    if (tagInput) {
      const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      if (!currentTags.includes(tagInput.trim())) {
        setFormData(prev => ({ 
          ...prev, 
          tags: [...currentTags, tagInput.trim()].join(', ') 
        }))
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    const newTags = currentTags.filter(t => t !== tag)
    setFormData(prev => ({ ...prev, tags: newTags.join(', ') }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const token = localStorage.getItem('token')
      const url = `/api/works/${id}`
      const method = 'PUT'

      // 处理标签：转换为数组
      const tagsArray = formData.tags 
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : []

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray
        })
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
        router.push('/admin/works')
      } else {
        console.error('保存作品失败:', data.error)
      }
    } catch (error) {
      console.error('保存作品失败:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-foreground">加载中...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/admin/works')}
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
          返回作品列表
        </button>
        <h1 className="text-2xl font-bold text-foreground">
          {id === 'new' ? '新增作品' : '编辑作品'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border-2 border-sunshine/30 space-y-6">
        {/* 基本信息 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              标题 <span className="text-cherry">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入作品标题"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              描述 <span className="text-cherry">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入作品描述"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              分类 <span className="text-cherry">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              required
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
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
            >
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
            </select>
          </div>
        </div>

        {/* 媒体文件 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">媒体文件</h3>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              封面图 URL
            </label>
            <input
              type="text"
              name="cover_image"
              value={formData.cover_image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入封面图 URL"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              视频 URL
            </label>
            <input
              type="text"
              name="video_url"
              value={formData.video_url}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="请输入视频 URL"
            />
          </div>
        </div>

        {/* 标签 */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            标签
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              className="flex-1 px-4 py-2 rounded-lg border-2 border-sunshine/30 focus:outline-none focus:border-sunshine transition-colors bg-card text-foreground"
              placeholder="输入标签后按回车添加"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 rounded-lg bg-sunshine text-foreground font-medium hover:bg-sunshine/90 transition-colors"
            >
              添加
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []).map((tag, index) => (
              <span key={index} className="flex items-center gap-1 px-3 py-1 bg-sunshine/15 text-foreground rounded-full text-sm">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-foreground/70 hover:text-cherry transition-colors"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-foreground text-cream px-6 py-3 rounded-lg font-bold hover:bg-foreground/90 transition-colors flex items-center gap-2"
          >
            {saving ? '保存中...' : '保存'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/works')}
            className="px-6 py-3 rounded-lg border-2 border-sunshine/30 text-foreground font-bold hover:bg-sunshine/10 transition-colors"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  )
}
