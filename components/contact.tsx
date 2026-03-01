import { Package, BookOpen, ListChecks, RefreshCw, MessageCircle, ArrowRight } from "lucide-react"

export function CallToAction() {
  return (
    <section className="py-16 md:py-24" id="cta">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-sunshine/20 text-foreground px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-sunshine/30">
            {"购买后你得到"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
            {"一次购买，持续获益"}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="space-y-3">
            <div className="bg-card rounded-2xl px-6 py-4 border-2 border-sunshine/20 hover:border-sunshine/40 transition-colors flex items-center gap-4">
              <div className="w-10 h-10 bg-sunshine/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="text-sunshine" size={20} />
              </div>
              <span className="text-foreground font-semibold text-sm md:text-base">{"完整 AI 工作流模板（可直接导入工具使用）"}</span>
            </div>
            <div className="bg-card rounded-2xl px-6 py-4 border-2 border-skyblue/20 hover:border-skyblue/40 transition-colors flex items-center gap-4">
              <div className="w-10 h-10 bg-skyblue/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="text-skyblue" size={20} />
              </div>
              <span className="text-foreground font-semibold text-sm md:text-base">{"配套提示词库 + 使用手册"}</span>
            </div>
            <div className="bg-card rounded-2xl px-6 py-4 border-2 border-cherry/20 hover:border-cherry/40 transition-colors flex items-center gap-4">
              <div className="w-10 h-10 bg-cherry/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <ListChecks className="text-cherry" size={20} />
              </div>
              <span className="text-foreground font-semibold text-sm md:text-base">{"执行步骤清单（每天照着做就行）"}</span>
            </div>
            <div className="bg-card rounded-2xl px-6 py-4 border-2 border-lime/20 hover:border-lime/40 transition-colors flex items-center gap-4">
              <div className="w-10 h-10 bg-lime/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <RefreshCw className="text-lime" size={20} />
              </div>
              <span className="text-foreground font-semibold text-sm md:text-base">{"后续版本免费更新"}</span>
            </div>
            <div className="bg-card rounded-2xl px-6 py-4 border-2 border-orange/20 hover:border-orange/40 transition-colors flex items-center gap-4">
              <div className="w-10 h-10 bg-orange/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="text-orange" size={20} />
              </div>
              <span className="text-foreground font-semibold text-sm md:text-base">{"专属使用答疑（简单问题直接回复）"}</span>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="max-w-xl mx-auto">
          <div className="bg-foreground rounded-2xl p-8 md:p-10 text-center text-cream relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-sunshine/20 rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-skyblue/15 rounded-full" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black mb-3">{"立即获取"}</h3>
              <p className="text-xl md:text-2xl font-black text-sunshine mb-2">{"AI 自媒体工作流模板"}</p>
              <p className="text-cream/60 text-sm mb-8">{"让你的内容生产，从此流水线化"}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sunshine text-foreground px-8 py-4 rounded-full font-black text-base hover:bg-sunshine/90 transition-colors shadow-lg shadow-sunshine/20"
              >
                {"立即获取"}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
