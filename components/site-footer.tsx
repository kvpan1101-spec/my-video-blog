export function SiteFooter() {
  return (
    <footer className="border-t-2 border-foreground/5 bg-card/50">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sunshine flex items-center justify-center border-2 border-foreground/10">
              <span className="text-sm font-black text-foreground">LC</span>
            </div>
            <span className="text-lg font-extrabold text-foreground">
              {"凌晨"}
            </span>
          </div>
          <p className="text-foreground/50 text-sm text-center font-semibold max-w-md leading-relaxed">
            {"不割韭菜、不画大饼，只分享真实能跑通的互联网项目。"}
          </p>
          <div className="flex gap-6">
            <a href="#about" className="text-foreground/40 hover:text-foreground transition-colors text-sm font-semibold">
              {"关于我"}
            </a>
            <a href="#product" className="text-foreground/40 hover:text-foreground transition-colors text-sm font-semibold">
              {"产品"}
            </a>
            <a href="#painpoints" className="text-foreground/40 hover:text-foreground transition-colors text-sm font-semibold">
              {"适合你吗"}
            </a>
            <a href="#cta" className="text-foreground/40 hover:text-foreground transition-colors text-sm font-semibold">
              {"立即获取"}
            </a>
          </div>
          <p className="text-xs text-foreground/30">
            {"© 2026 凌晨. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
