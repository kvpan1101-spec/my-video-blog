import { Check } from "lucide-react"

export function PainPoints() {
  const painPoints = [
    "想做自媒体，但不知道从哪开始",
    "每天花大量时间写文案、剪视频，效率极低",
    "AI 工具一大堆，却不会组合成工作流",
    "想低成本启动，不想报高价课",
    "希望内容可复制、可批量、可稳定产出",
  ]

  return (
    <section className="py-16 md:py-24" id="painpoints">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-cherry/10 text-cherry px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-cherry/20">
            {"适合你吗"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
            {"适合你，如果..."}
          </h2>
          <p className="text-foreground/50 max-w-xl mx-auto leading-relaxed">
            {"看看以下描述是否命中了你的现状。"}
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="space-y-3">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl px-6 py-4 border-2 border-foreground/5 hover:border-sunshine/40 transition-colors flex items-center gap-4"
              >
                <div className="w-8 h-8 bg-sunshine/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="text-sunshine" size={16} strokeWidth={3} />
                </div>
                <span className="text-foreground font-semibold text-sm md:text-base">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight statement */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-foreground rounded-2xl p-8 text-center text-cream relative overflow-hidden">
            <div className="absolute top-0 left-1/2 w-40 h-40 bg-cherry/20 rounded-full -translate-y-1/2 -translate-x-1/2" />
            <p className="text-lg md:text-xl font-bold relative z-10 leading-relaxed">
              {"我不教你 \"怎么做\""}
              <br />
              {"我直接给你"}
              <span className="text-sunshine">{" \"可以照着做\" "}</span>
              {"的模板。"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
