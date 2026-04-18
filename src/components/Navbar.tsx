"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EclipseGlowLogo from "@/components/ui/EclipseGlowLogo";

const gameLinks = [
  { label: "Eclipse: A Última Fronteira", href: "/jogos/eclipse-a-ultima-fronteira", color: "#C9A84C" },
  { label: "Laston: O Último Bastião",    href: "/jogos/laston",                     color: "#7B9CFF" },
];

const navItems = [
  { label: "Início",       href: "/"           },
  { label: "Sobre",        href: "/#sobre"     },
  { label: "Diferenciais", href: "/#diferenciais" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [gamesOpen,   setGamesOpen]   = useState(false);
  const pathname = usePathname();

  // Light mode: home page, not scrolled (white hero)
  const isHome  = pathname === "/";
  const isLight = isHome && !scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn(); // run once on mount
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setGamesOpen(false);
  }, [pathname]);

  // Dynamic classes
  const navBg = scrolled
    ? "bg-black/85 backdrop-blur-xl border-b border-white/5"
    : isLight
      ? "bg-white/0"          // transparent on white hero
      : "bg-transparent";

  const linkColor     = isLight ? "text-black/45 hover:text-black/80"   : "text-white/40 hover:text-white/80";
  const mobileBtn     = isLight ? "text-black/50 hover:text-[#C9A84C]"  : "text-white/50 hover:text-[#C9A84C]";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <EclipseGlowLogo size={34} />
            <motion.span
              className="text-[11px] font-bold tracking-[0.35em] hidden sm:block text-[#C9A84C] group-hover:text-[#F0D080] transition-colors duration-300"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              ECLIPSECORP
            </motion.span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[11px] tracking-[0.3em] uppercase transition-colors duration-200 group ${linkColor}`}
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C]/60 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* Jogos dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setGamesOpen(true)}
              onMouseLeave={() => setGamesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 text-[11px] tracking-[0.3em] uppercase transition-colors ${linkColor}`}
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Jogos
                <motion.div
                  animate={{ rotate: gamesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={12} />
                </motion.div>
              </button>

              <AnimatePresence>
                {gamesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-3 w-64 bg-[#050508]/98 backdrop-blur-xl border border-white/8 overflow-hidden"
                  >
                    {gameLinks.map((g) => (
                      <Link
                        key={g.href}
                        href={g.href}
                        className="flex items-center gap-3 px-4 py-3.5 text-[11px] tracking-[0.2em] text-white/40 hover:text-white/80 hover:bg-white/4 transition-colors border-b border-white/5 last:border-0"
                        style={{ fontFamily: "var(--font-cinzel)" }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: g.color, boxShadow: `0 0 6px ${g.color}` }}
                        />
                        {g.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link
              href="/#jogos"
              className={`px-5 py-2 text-[10px] tracking-[0.3em] uppercase border transition-all duration-300 ${
                isLight
                  ? "border-black/20 text-black/50 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                  : "border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black"
              }`}
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Jogar Agora
            </Link>
          </div>

          {/* Mobile button */}
          <button
            className={`md:hidden p-2 transition-colors ${mobileBtn}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="x"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="fixed inset-0 z-40 bg-[#050508]/99 backdrop-blur-2xl flex flex-col pt-24 px-8 pb-8 overflow-y-auto"
          >
            <div className="space-y-0">
              {[...navItems, ...gameLinks.map(g => ({ label: g.label, href: g.href }))].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    className="block py-5 border-b border-white/5 text-sm tracking-widest text-white/35 hover:text-[#C9A84C] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-auto pt-8"
            >
              <Link
                href="/#jogos"
                className="block w-full text-center py-4 bg-[#C9A84C] text-black text-xs tracking-[0.3em] font-bold hover:bg-[#F0D080] transition-colors"
                style={{ fontFamily: "var(--font-cinzel)" }}
                onClick={() => setMobileOpen(false)}
              >
                JOGAR AGORA
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
