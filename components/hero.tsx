import Image from "next/image"
import { Zap, TrendingUp, DollarSign } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-sunshine/30 rounded-full blur-2xl" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-skyblue/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-orange/20 rounded-full blur-2xl" />

      {/* Sparkle decorations */}
      <svg className="absolute top-32 right-[15%] w-6 h-6 text-sunshine animate-sparkle" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
      <svg className="absolute top-48 left-[10%] w-4 h-4 text-skyblue animate-sparkle" style={{ animationDelay: "0.5s" }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
      <svg className="absolute bottom-32 right-[25%] w-5 h-5 text-cherry animate-sparkle" style={{ animationDelay: "1s" }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 relative animate-float">
              <div className="absolute inset-0 bg-sunshine/40 rounded-full blur-xl" />
              <Image
                src="/images/avatar.png"
                alt="凌晨的卡通头像"
                fill
                className="rounded-full object-cover relative z-10 border-4 border-card shadow-lg"
                priority
              />
            </div>
            {/* Sticker badge */}
            <div className="absolute -bottom-2 -right-2 z-20 bg-cherry text-card px-3 py-1 rounded-full text-xs font-bold shadow-md rotate-6">
              {"AI 创业者"}
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left flex-1">
            <div className="inline-block bg-sunshine/20 text-foreground px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-sunshine/30">
              {"Hello Friends!"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 text-balance leading-tight">
              {"AI时代："}
              <span className="text-cherry">{"我们不下牌桌!"}</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 mb-8 max-w-lg leading-relaxed">
              {"将跑通的 AI 自媒体工作流，制作成标准化模板，帮你快速提升内容产出效率。"}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#cta"
                className="bg-foreground text-cream px-6 py-3 rounded-full font-bold hover:bg-foreground/90 transition-colors text-sm"
              >
                {"立即获取工作流模板"}
              </a>
              <a
                href="#product"
                className="bg-card text-foreground px-6 py-3 rounded-full font-bold border-2 border-foreground/10 hover:border-sunshine transition-colors text-sm"
              >
                {"看看能获得什么"}
              </a>
            </div>
          </div>
        </div>

        {/* Three Core Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-5 border-2 border-sunshine/20 hover:border-sunshine/50 transition-colors flex items-start gap-4">
            <div className="w-10 h-10 bg-sunshine/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="text-sunshine" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm mb-1">{"降低试错成本"}</h3>
              <p className="text-xs text-foreground/50 leading-relaxed">{"不用自己研究纷繁复杂的 AI 工具组合"}</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-5 border-2 border-skyblue/20 hover:border-skyblue/50 transition-colors flex items-start gap-4">
            <div className="w-10 h-10 bg-skyblue/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="text-skyblue" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm mb-1">{"提升产出效率"}</h3>
              <p className="text-xs text-foreground/50 leading-relaxed">{"选题、文案、剪辑、发布全流程模板化"}</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-5 border-2 border-lime/20 hover:border-lime/50 transition-colors flex items-start gap-4">
            <div className="w-10 h-10 bg-lime/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <DollarSign className="text-lime" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm mb-1">{"直接变现"}</h3>
              <p className="text-xs text-foreground/50 leading-relaxed">{"买了就能用，用了就能产出内容"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
