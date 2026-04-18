"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Shield,
  Layers,
  Code2,
  Palette,
  Music2,
  Award,
  TrendingUp,
} from "lucide-react";

const diferenciais = [
  {
    icon: Zap,
    title: "Engine Própria",
    desc: "Desenvolvemos nossa própria engine otimizada para desempenho máximo em hardware brasileiro.",
    tag: "TECNOLOGIA",
  },
  {
    icon: Palette,
    title: "Arte AAA",
    desc: "Equipe de artistas com experiência em estúdios internacionais. Visuais que rivalizam com os maiores.",
    tag: "CRIAÇÃO",
  },
  {
    icon: Music2,
    title: "Trilha Orquestral",
    desc: "Composições originais gravadas com orquestra completa. Música que eleva cada momento dramático.",
    tag: "ÁUDIO",
  },
  {
    icon: Layers,
    title: "Narrativa Profunda",
    desc: "Roteiro com mais de 200 horas de conteúdo, escolhas morais reais e múltiplos finais.",
    tag: "HISTÓRIA",
  },
  {
    icon: Code2,
    title: "IA Generativa",
    desc: "NPCs com personalidade dinâmica. Nenhum personagem secundário é idêntico ou previsível.",
    tag: "INOVAÇÃO",
  },
  {
    icon: Shield,
    title: "Anti-Cheat Nativo",
    desc: "Sistema de segurança desenvolvido in-house. Fair play garantido desde o lançamento.",
    tag: "SEGURANÇA",
  },
  {
    icon: Award,
    title: "Premiado",
    desc: "Reconhecido por aceleradoras de games antes mesmo do lançamento. Talento validado globalmente.",
    tag: "RECONHECIMENTO",
  },
  {
    icon: TrendingUp,
    title: "Roadmap Ambicioso",
    desc: "3 expansões planejadas, spin-offs e universo expandido. Construindo uma franquia geracional.",
    tag: "FUTURO",
  },
];

export default function DiferenciaisSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="diferenciais" className="relative py-32 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#C9A84C]/3 blur-[150px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-[#C9A84C]/50" />
            <span
              className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Por que nós?
            </span>
            <div className="w-12 h-px bg-[#C9A84C]/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black leading-none"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            <span className="gold-gradient-text">NOSSOS</span>
            <br />
            <span className="text-white">DIFERENCIAIS</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {diferenciais.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="group relative p-6 bg-[#0F0F0F] border border-white/5 hover:border-[#C9A84C]/40 transition-all duration-500 cursor-default overflow-hidden"
              >
                {/* Hover BG */}
                <div className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/3 transition-all duration-500" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#C9A84C]/0 group-hover:border-[#C9A84C]/50 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#C9A84C]/0 group-hover:border-[#C9A84C]/50 transition-all duration-500" />

                <div className="relative z-10">
                  {/* Tag */}
                  <span
                    className="text-[#C9A84C]/40 text-[10px] tracking-[0.3em] font-medium mb-4 block"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {item.tag}
                  </span>

                  <div className="mb-4 w-10 h-10 flex items-center justify-center border border-[#C9A84C]/15 group-hover:border-[#C9A84C]/50 transition-all duration-300 group-hover:bg-[#C9A84C]/5">
                    <Icon size={18} className="text-[#C9A84C]" />
                  </div>

                  <h3
                    className="text-white font-bold text-base mb-3 tracking-wide"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 mb-6 text-sm tracking-wide">
            Pronto para fazer parte da maior revolução dos games?
          </p>
          <a
            href="#footer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A84C] text-black font-bold text-sm tracking-widest hover:bg-[#F0D080] transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            ENTRAR EM CONTATO
          </a>
        </motion.div>
      </div>
    </section>
  );
}
