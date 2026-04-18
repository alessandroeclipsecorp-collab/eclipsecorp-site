"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const LASTON_PILLARS = [
  { number: "01", title: "Missão",  body: "Ser o maior estúdio de games do mundo. Não o maior do Brasil — do mundo. Ponto." },
  { number: "02", title: "Origem",  body: "Belém do Pará, na margem do maior rio do planeta. Onde a grandeza da natureza nos lembra que escala não é limitação." },
  { number: "03", title: "Método",  body: "Qualidade AAA sem comprometer alma. Cada pixel, cada nota, cada linha de código carrega nossa assinatura." },
  { number: "04", title: "Futuro",  body: "Um universo em expansão. Eclipse é o começo. Laston é o segundo capítulo. O terceiro está sendo escrito agora." },
];

const items = [
  { n: "01", title: "Engine Própria", body: "Tecnologia desenvolvida in-house para máximo controle sobre performance e visual.", tag: "TECH" },
  { n: "02", title: "Arte Cinematográfica", body: "Cada frame é uma obra de arte. Direção visual que rivaliza com os maiores estúdios AAA do planeta.", tag: "ARTE" },
  { n: "03", title: "Trilha Orquestral", body: "Composições originais gravadas com orquestra completa. Música que define o momento.", tag: "ÁUDIO" },
  { n: "04", title: "Narrativa Ramificada", body: "200+ horas de lore. Escolhas reais. Múltiplos finais. Cada jogada conta.", tag: "STORY" },
  { n: "05", title: "IA Comportamental", body: "NPCs que evoluem, aprendem, reagem. Nenhum personagem é estático ou previsível.", tag: "IA" },
  { n: "06", title: "Multiplayer Robusto", body: "Infraestrutura própria, anti-cheat nativo, servidores dedicados. Fair play garantido.", tag: "ONLINE" },
  { n: "07", title: "Identidade Brasileira", body: "Da fauna amazônica ao mito indígena — cultura brasileira no palco global. Sem concessões.", tag: "CULTURA" },
  { n: "08", title: "Franquia Geracional", body: "Eclipse e Laston são capítulos de um universo maior. Construindo legado, não produto.", tag: "LEGADO" },
];

export default function DiferenciaisPremium() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="diferenciais" className="relative py-32 overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* Large watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-[22vw] font-black whitespace-nowrap leading-none"
        style={{ fontFamily: "var(--font-cinzel)", color: "rgba(0,0,0,0.03)" }}
      >
        AAA
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs tracking-[0.5em] uppercase mb-4"
              style={{ color: "#C9A84C", fontFamily: "var(--font-cinzel)" }}
            >
              Por que EclipseCorp
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-none"
              style={{
                fontFamily: "var(--font-cinzel)",
                fontSize: "clamp(2.5rem,6vw,4.5rem)",
                background: "linear-gradient(135deg, #111827 40%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              DIFERENCIAIS
            </motion.h2>
          </div>

          <div>
            {/* Laston + pillars */}
            <Link href="/jogos/laston" style={{ cursor: "none" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                className="group mb-6"
                whileHover={{ y: -2 }}
              >
                <h3
                  className="font-black leading-none whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-cinzel)",
                    fontSize: "clamp(1rem, 2.2vw, 1.8rem)",
                    color: "#0A0A0A",
                    letterSpacing: "0.01em",
                  }}
                >
                  Laston
                </h3>
                <motion.div
                  className="mt-2 h-px"
                  style={{ background: "#7B9CFF", width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>
            </Link>

            <div className="space-y-0 mb-8">
              {LASTON_PILLARS.map((p, i) => (
                <motion.div
                  key={p.number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                  className="group relative py-4 cursor-default"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-transparent group-hover:bg-[#7B9CFF]/50 transition-colors duration-300" />
                  <div className="flex gap-4 pl-3">
                    <span
                      className="font-black text-xs shrink-0 pt-0.5"
                      style={{ fontFamily: "var(--font-cinzel)", color: "rgba(123,156,255,0.4)" }}
                    >
                      {p.number}
                    </span>
                    <div>
                      <h4
                        className="font-bold mb-1 tracking-wider text-xs transition-colors duration-300 group-hover:text-[#7B9CFF]"
                        style={{ fontFamily: "var(--font-cinzel)", color: "#111827" }}
                      >
                        {p.title}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
                        {p.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Texto abaixo dos pillars */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="text-sm leading-relaxed"
              style={{ color: "#9CA3AF", maxWidth: 320 }}
            >
              Cada detalhe é intencional. Cada escolha reflete a obsessão com excelência que define o DNA da EclipseCorp.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
          {items.map((item, i) => (
            <motion.div
              key={item.n}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
              className="group relative p-6 transition-colors duration-500 cursor-default overflow-hidden"
              style={{ background: "#FFFFFF" }}
            >
              {/* Gold fill on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%)" }}
              />
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/40 transition-colors duration-300" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="text-[10px] tracking-[0.3em] transition-colors"
                    style={{ fontFamily: "var(--font-cinzel)", color: "rgba(201,168,76,0.5)" }}
                  >
                    {item.tag}
                  </span>
                  <span
                    className="text-[10px] tracking-widest transition-colors"
                    style={{ fontFamily: "var(--font-cinzel)", color: "rgba(0,0,0,0.15)" }}
                  >
                    {item.n}
                  </span>
                </div>
                <h3
                  className="font-bold text-sm mb-3 tracking-wide transition-colors duration-300 group-hover:text-[#C9A84C]"
                  style={{ fontFamily: "var(--font-cinzel)", color: "#111827" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
