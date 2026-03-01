"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, LogIn } from "lucide-react"
import { LoginModal } from "./login-modal"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/70 border-b-2 border-sunshine/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-sunshine flex items-center justify-center border-2 border-foreground/10">
                <span className="text-lg font-black text-foreground">LC</span>
              </div>
              <span className="text-xl font-extrabold text-foreground">
                {"凌晨"}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#about" className="text-foreground/70 hover:text-foreground font-semibold transition-colors">
                {"关于我"}
              </Link>
              <Link href="#product" className="text-foreground/70 hover:text-foreground font-semibold transition-colors">
                {"产品"}
              </Link>
              <Link href="#showcase" className="text-foreground/70 hover:text-foreground font-semibold transition-colors">
                {"作品展示"}
              </Link>
              <Link href="#painpoints" className="text-foreground/70 hover:text-foreground font-semibold transition-colors">
                {"适合你吗"}
              </Link>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-foreground text-cream px-5 py-2 rounded-full font-bold hover:bg-foreground/90 transition-colors text-sm flex items-center gap-2"
              >
                <LogIn size={16} />
                {"登录"}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2" aria-label="Toggle menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-sunshine/20 bg-cream">
              <div className="flex flex-col gap-1 px-2 pt-2 pb-4">
                <Link href="#about" className="text-foreground/70 hover:text-foreground hover:bg-sunshine/20 px-4 py-2.5 rounded-lg font-semibold transition-colors" onClick={() => setIsOpen(false)}>
                  {"关于我"}
                </Link>
                <Link href="#product" className="text-foreground/70 hover:text-foreground hover:bg-sunshine/20 px-4 py-2.5 rounded-lg font-semibold transition-colors" onClick={() => setIsOpen(false)}>
                  {"产品"}
                </Link>
                <Link href="#showcase" className="text-foreground/70 hover:text-foreground hover:bg-sunshine/20 px-4 py-2.5 rounded-lg font-semibold transition-colors" onClick={() => setIsOpen(false)}>
                  {"作品展示"}
                </Link>
                <Link href="#painpoints" className="text-foreground/70 hover:text-foreground hover:bg-sunshine/20 px-4 py-2.5 rounded-lg font-semibold transition-colors" onClick={() => setIsOpen(false)}>
                  {"适合你吗"}
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setIsLoginOpen(true)
                  }}
                  className="bg-foreground text-cream px-4 py-2.5 rounded-lg font-bold text-center mt-1 flex items-center justify-center gap-2"
                >
                  <LogIn size={16} />
                  {"登录"}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}
