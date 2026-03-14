"use client"

import { useState, useEffect } from "react"
import { Play, Eye, Heart, Clock, ChevronLeft, ChevronRight, X } from "lucide-react"

interface VideoItem {
  _id: string
  title: string
  description: string
  cover_image: string
  category: string
  video_url: string
  tags: string[]
  status: string
  created_at: string
  updated_at: string
}

const categories = ["全部", "短视频", "图文", "小说推文", "其他"]

const categoryColorMap: Record<string, string> = {
  "短视频": "bg-cherry/15 text-cherry",
  "图文": "bg-skyblue/15 text-skyblue",
  "小说推文": "bg-lime/15 text-lime",
  "其他": "bg-orange/15 text-orange",
}

export function VideoShowcase() {
  const [activeCategory, setActiveCategory] = useState("全部")
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorks()
  }, [activeCategory])

  const fetchWorks = async () => {
    setLoading(true)
    try {
      const categoryParam = activeCategory !== "全部" ? `&category=${activeCategory}` : ''
      const response = await fetch(`/api/works?status=published${categoryParam}`)
      const data = await response.json()
      if (data.success) {
        setVideos(data.data.works)
      }
    } catch (error) {
      console.error('获取作品列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = videos

  return (
    <section className="py-16 md:py-24 bg-muted/30" id="showcase">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-cherry/10 text-cherry px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-cherry/20">
            {"作品展示"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
            {"用工作流做出来的视频，长这样"}
          </h2>
          <p className="text-foreground/50 max-w-xl mx-auto leading-relaxed">
            {"以下视频均由 AI 工作流模板辅助生产，从选题到成片，效率提升 10 倍"}
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-cream"
                  : "bg-card text-foreground/60 border-2 border-border hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {loading ? (
            // 加载状态
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="bg-card rounded-2xl overflow-hidden border-2 border-sunshine/30 animate-pulse">
                <div className="aspect-video bg-sunshine/10"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-sunshine/20 rounded"></div>
                  <div className="h-3 bg-sunshine/10 rounded"></div>
                  <div className="h-3 bg-sunshine/10 rounded w-3/4"></div>
                  <div className="flex gap-4">
                    <div className="h-2 bg-sunshine/10 rounded w-16"></div>
                    <div className="h-2 bg-sunshine/10 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))
          ) : filtered.map((video) => (
            <button
              key={video._id}
              onClick={() => setActiveVideo(video)}
              className="group bg-card rounded-2xl overflow-hidden border-2 border-transparent hover:border-sunshine/50 transition-all text-left hover:-translate-y-1 hover:shadow-lg hover:shadow-sunshine/10"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.cover_image || "https://via.placeholder.com/640x360"}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100">
                    <Play size={24} className="text-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* Duration badge */}
                {/* <div className="absolute bottom-2 right-2 bg-foreground/80 text-cream text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <Clock size={10} />
                  {"0:00"}
                </div> */}
                {/* Category badge */}
                <div className={`absolute top-2 left-2 text-xs font-bold px-2.5 py-1 rounded-full ${categoryColorMap[video.category] || "bg-muted text-foreground"}`}>
                  {video.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-foreground text-base mb-1 line-clamp-1 group-hover:text-cherry transition-colors">
                  {video.title}
                </h3>
                <p className="text-foreground/50 text-sm leading-relaxed line-clamp-2 mb-3">
                  {video.description}
                </p>
                {/* <div className="flex items-center gap-4 text-xs text-foreground/40">
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {"0"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={12} />
                    {"0"}
                  </span>
                </div> */}
              </div>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-foreground/40">
            <p className="text-lg font-semibold">{"该分类暂无视频，敬请期待"}</p>
          </div>
        )}
      </div>

      {/* Lightbox modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
          <div className="bg-card rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Video area */}
            <div className="relative aspect-video bg-foreground">
              {activeVideo.video_url ? (
                <video 
                  src={activeVideo.video_url} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={activeVideo.cover_image || "https://via.placeholder.com/640x360"}
                    alt={activeVideo.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-cream">
                    <div className="w-20 h-20 rounded-full bg-sunshine flex items-center justify-center">
                      <Play size={36} className="text-foreground ml-1" fill="currentColor" />
                    </div>
                    <span className="text-sm font-semibold">{"点击播放视频"}</span>
                  </div>
                </>
              )}
              {/* Close btn */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-foreground/60 hover:bg-foreground/80 text-cream flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Info area */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColorMap[activeVideo.category] || "bg-muted text-foreground"}`}>
                  {activeVideo.category}
                </span>
                {/* <span className="text-xs text-foreground/40 flex items-center gap-1">
                  <Clock size={10} />
                  {"0:00"}
                </span> */}
              </div>
              <h3 className="text-xl font-black text-foreground mb-2">{activeVideo.title}</h3>
              <p className="text-foreground/50 leading-relaxed">{activeVideo.description}</p>
              {/* <div className="flex items-center gap-5 mt-4 text-sm text-foreground/40">
                <span className="flex items-center gap-1.5">
                  <Eye size={14} />
                  {"0"} {"次观看"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart size={14} />
                  {"0"} {"次喜欢"}
                </span>
              </div> */}
            </div>
          </div>

          {/* Prev/Next buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              const idx = filtered.findIndex((v) => v._id === activeVideo._id)
              if (idx > 0) setActiveVideo(filtered[idx - 1])
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/20 hover:bg-cream/40 text-cream flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              const idx = filtered.findIndex((v) => v._id === activeVideo._id)
              if (idx < filtered.length - 1) setActiveVideo(filtered[idx + 1])
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/20 hover:bg-cream/40 text-cream flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  )
}
