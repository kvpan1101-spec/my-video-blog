import { Bot, Briefcase, Lightbulb, Handshake } from "lucide-react"

export function About() {
  return (
    <section className="py-16 md:py-24" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-orange/10 text-orange px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-orange/20">
            {"关于我"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 text-balance">
            {"我是"}
            <span className="text-cherry">{"凌晨"}</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto leading-relaxed text-lg">
            {"AI时代的创业者，专注 AI + 效率工具研发，互联网商业模式变现。"}
          </p>
        </div>

        {/* Mission statement card */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-card rounded-2xl p-8 border-2 border-sunshine/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sunshine/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-skyblue/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <p className="text-foreground/70 leading-relaxed relative z-10 text-center text-base md:text-lg">
              {"未来会将所有跑通的商业模式，在个人站进行展示。"}
              <br />
              <span className="font-bold text-foreground">{"不夸大，不割韭菜，与君同行。"}</span>
            </p>
          </div>
        </div>

        {/* What I focus on */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-6 border-2 border-sunshine/20 hover:border-sunshine/50 transition-colors text-center">
            <div className="w-12 h-12 bg-sunshine/15 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Bot className="text-sunshine" size={24} />
            </div>
            <h3 className="font-bold text-foreground mb-1">{"AI 工具研发"}</h3>
            <p className="text-sm text-foreground/50">{"探索最前沿的 AI 效率工具"}</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-skyblue/20 hover:border-skyblue/50 transition-colors text-center">
            <div className="w-12 h-12 bg-skyblue/15 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-skyblue" size={24} />
            </div>
            <h3 className="font-bold text-foreground mb-1">{"商业模式验证"}</h3>
            <p className="text-sm text-foreground/50">{"只分享真实跑通的项目"}</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-cherry/20 hover:border-cherry/50 transition-colors text-center">
            <div className="w-12 h-12 bg-cherry/15 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="text-cherry" size={24} />
            </div>
            <h3 className="font-bold text-foreground mb-1">{"工作流模板化"}</h3>
            <p className="text-sm text-foreground/50">{"将流程标准化，可直接复用"}</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-lime/20 hover:border-lime/50 transition-colors text-center">
            <div className="w-12 h-12 bg-lime/15 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Handshake className="text-lime" size={24} />
            </div>
            <h3 className="font-bold text-foreground mb-1">{"互联网变现"}</h3>
            <p className="text-sm text-foreground/50">{"低成本启动，高效率产出"}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
