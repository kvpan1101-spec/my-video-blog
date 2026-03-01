import { FileText, Wand2, Layout, BookOpen, RefreshCw, Video, ImageIcon, BookMarked, Users } from "lucide-react"

export function Product() {
  return (
    <section className="py-16 md:py-24" id="product">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-skyblue/10 text-skyblue px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-skyblue/20">
            {"核心产品"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
            {"你能获得什么"}
          </h2>
          <p className="text-foreground/50 max-w-2xl mx-auto leading-relaxed">
            {"一套可直接复制的 AI 内容生产工作流 -- 我的产品不是课程，不是教程，而是拿来就能跑的 AI 工作流模板。"}
          </p>
        </div>

        {/* Product highlight card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-foreground rounded-2xl p-8 md:p-10 text-cream relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-sunshine/20 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-skyblue/15 rounded-full translate-y-1/2 -translate-x-1/4" />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-black mb-4">{"商业模式，一句话说清楚"}</h3>
              <p className="text-cream/80 leading-relaxed text-base md:text-lg">
                {"我将自己跑通的 AI 自媒体工作流，制作成标准化模板，你购买后，可直接套用在你的账号上，快速提升内容产出效率、降低时间成本、放大流量与变现能力。"}
              </p>
              <div className="mt-6 inline-block bg-sunshine text-foreground px-5 py-2 rounded-full text-sm font-bold">
                {"你买的是：一套可落地、可复用、可迭代的 AI 工作流系统"}
              </div>
            </div>
          </div>
        </div>

        {/* Applicable scenarios */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-lg font-bold text-foreground text-center mb-6">{"适配多种自媒体场景"}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-card px-5 py-2.5 rounded-full border-2 border-cherry/20 hover:border-cherry/50 transition-colors">
              <Video size={16} className="text-cherry" />
              <span className="text-sm font-bold text-foreground">{"短视频"}</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-5 py-2.5 rounded-full border-2 border-skyblue/20 hover:border-skyblue/50 transition-colors">
              <ImageIcon size={16} className="text-skyblue" />
              <span className="text-sm font-bold text-foreground">{"图文"}</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-5 py-2.5 rounded-full border-2 border-lime/20 hover:border-lime/50 transition-colors">
              <BookMarked size={16} className="text-lime" />
              <span className="text-sm font-bold text-foreground">{"小说推文"}</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-5 py-2.5 rounded-full border-2 border-orange/20 hover:border-orange/50 transition-colors">
              <Users size={16} className="text-orange" />
              <span className="text-sm font-bold text-foreground">{"私域引流"}</span>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-6 border-2 border-sunshine/20 hover:border-sunshine/50 transition-colors flex items-start gap-4">
            <div className="w-10 h-10 bg-sunshine/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="text-sunshine" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">{"选题 / 脚本 / 文案"}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">{"从选题灵感到完整脚本，标题到封面文案，全部模板化"}</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-skyblue/20 hover:border-skyblue/50 transition-colors flex items-start gap-4">
            <div className="w-10 h-10 bg-skyblue/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <Wand2 className="text-skyblue" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">{"工具清单 + 提示词模板"}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">{"精选 AI 工具搭配与可直接粘贴使用的提示词库"}</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-cherry/20 hover:border-cherry/50 transition-colors flex items-start gap-4">
            <div className="w-10 h-10 bg-cherry/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <Layout className="text-cherry" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">{"发布节奏模板"}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">{"内容排期、发布时间、平台策略，让产出节奏稳定可控"}</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-lime/20 hover:border-lime/50 transition-colors flex items-start gap-4">
            <div className="w-10 h-10 bg-lime/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="text-lime" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">{"执行步骤清单"}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">{"每天照着做就行，帮你跳过摸索期，最低成本做出稳定内容"}</p>
            </div>
          </div>
        </div>

        {/* Continuous update note */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-lime/10 text-lime px-5 py-2 rounded-full text-sm font-bold border border-lime/20">
            <RefreshCw size={14} />
            {"持续更新 -- 帮自媒体人跳过摸索期，用最低成本、最高速度做出稳定内容"}
          </div>
        </div>
      </div>
    </section>
  )
}
