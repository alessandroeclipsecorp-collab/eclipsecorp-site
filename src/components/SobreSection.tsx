"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Globe, Flame, Star } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Missão",
    desc: "Ser o maior estúdio de games do mundo, provando que o Brasil pode liderar a indústria global.",
  },
  {
    icon: Globe,
    title: "Origem",
    desc: "Nascemos em Belém do Pará — onde a selva encontra o cosmos, e o impossível vira roteiro.",
  },
  {
    icon: Flame,
    title: "Visão",
    desc: "Criar experiências que redefinam o que um jogo pode ser: arte, emoção e tecnologia sem limites.",
  },
  {
    icon: Star,
    title: "Valores",
    desc: "Excelência AAA, narrativa épica, inovação constante e orgulho de ser brasileiro no palco mundial.",
  },
];

export default function SobreSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="relative py-32 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      {/* Decorative orb */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/3 blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-[#C9A84C]" />
            <span
              className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Quem Somos
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black leading-none mb-8"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            <span className="text-white">A FORÇA QUE</span>
            <br />
            <span className="gold-gradient-text">VEM DE BELÉM</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg leading-relaxed max-w-2xl"
          >
            A EclipseCorp não é apenas um estúdio de games — é um manifesto. Surgimos do coração da
            Amazônia com uma certeza: o próximo grande estúdio AAA do mundo será brasileiro. E será
            nosso.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="group relative p-6 bg-[#111111] border border-white/5 hover:border-[#C9A84C]/40 transition-all duration-500 cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#C9A84C]/0 to-[#C9A84C]/0 group-hover:from-[#C9A84C]/5 group-hover:to-transparent transition-all duration-500" />

                {/* Top border accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/60 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="mb-4 w-12 h-12 flex items-center justify-center border border-[#C9A84C]/20 group-hover:border-[#C9A84C]/60 transition-all duration-300">
                    <Icon size={22} className="text-[#C9A84C]" />
                  </div>
                  <h3
                    className="text-white font-bold text-lg mb-3 tracking-wider"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 text-center"
        >
          <blockquote
            className="text-2xl md:text-3xl font-bold text-[#C9A84C]/60 italic"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            "A fronteira do impossível existe para ser cruzada."
          </blockquote>
          <p className="text-gray-600 text-sm mt-3 tracking-widest">— EclipseCorp, Belém 2025</p>
        </motion.div>
      </div>
    </section>
  );
}
