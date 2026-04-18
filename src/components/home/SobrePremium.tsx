"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import InfiniteCarousel from "./InfiniteCarousel";

const pillars = [
  { number: "01", title: "Missão", body: "Ser o maior estúdio de games do mundo. Não o maior do Brasil — do mundo. Ponto." },
  { number: "02", title: "Origem", body: "Belém do Pará, na margem do maior rio do planeta. Onde a grandeza da natureza nos lembra que escala não é limitação." },
  { number: "03", title: "Método", body: "Qualidade AAA sem comprometer alma. Cada pixel, cada nota, cada linha de código carrega nossa assinatura." },
  { number: "04", title: "Futuro", body: "Um universo em expansão. Eclipse é o começo. Laston é o segundo capítulo. O terceiro está sendo escrito agora." },
];

export default function SobrePremium() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="sobre" className="relative py-32 overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Side accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-black/5" />
      <div className="absolute left-0 top-0 bottom-0 w-px overflow-hidden">
        <motion.div className="w-full bg-[#C9A84C]/50" style={{ height: lineHeight }} />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: heading block */}
          <div className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.5em] uppercase mb-6"
              style={{ fontFamily: "var(--font-cinzel)", color: "#C9A84C" }}
            >
              Manifesto
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="leading-relaxed text-base max-w-sm"
              style={{ color: "#6B7280" }}
            >
              A EclipseCorp nasceu com uma tese simples: o Brasil tem talento AAA e o mundo
              ainda não sabe disso. Vamos mudar esse cenário, jogo a jogo.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-4 pt-12"
              style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
            >
              {[
                { v: "2",  l: "Jogos\nem Dev"    },
                { v: "∞",  l: "Ambição\nReal"    },
                { v: "#1", l: "Objetivo\nFinal"  },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div
                    className="text-3xl font-black mb-1"
                    style={{
                      fontFamily: "var(--font-cinzel)",
                      background: "linear-gradient(180deg, #C9A84C, #8B6914)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {v}
                  </div>
                  <div
                    className="text-[10px] tracking-wider leading-tight whitespace-pre-line"
                    style={{ color: "#9CA3AF" }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: pillars */}
          <div className="space-y-0">
            {pillars.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative py-8 cursor-default"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-transparent group-hover:bg-[#C9A84C]/50 transition-colors duration-300" />
                <div className="flex gap-6 pl-4">
                  <span
                    className="font-black text-lg shrink-0 pt-0.5 transition-colors"
                    style={{ fontFamily: "var(--font-cinzel)", color: "rgba(201,168,76,0.3)" }}
                  >
                    {p.number}
                  </span>
                  <div>
                    <h3
                      className="font-bold mb-2 tracking-wider text-base transition-colors duration-300 group-hover:text-[#C9A84C]"
                      style={{ fontFamily: "var(--font-cinzel)", color: "#111827" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Carrossel — abaixo dos stats ── */}
      <div className="mt-20">
        <InfiniteCarousel />
      </div>
    </section>
  );
}
