"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swords, Cpu, Globe2, Users, ChevronRight } from "lucide-react";

const features = [
  {
    icon: Swords,
    title: "Combate Épico",
    desc: "Sistema de combate fluido com físicas avançadas, armas customizáveis e habilidades espectrais únicas.",
  },
  {
    icon: Globe2,
    title: "Mundo Aberto",
    desc: "Mapa massivo: da floresta amazônica devastada ao espaço sideral — cada bioma com ecossistema próprio.",
  },
  {
    icon: Cpu,
    title: "IA Revolucionária",
    desc: "Inimigos e aliados com comportamento dinâmico. O mundo reage às suas escolhas em tempo real.",
  },
  {
    icon: Users,
    title: "Multiplayer Online",
    desc: "Missões cooperativas para até 4 jogadores, disputas PvP e eventos globais sazonais.",
  },
];

export default function JogoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="jogo" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      {/* Large decorative text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.015] pointer-events-none select-none whitespace-nowrap"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        ECLIPSE
      </div>

      {/* Glow left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/4 blur-[100px] pointer-events-none" />

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
              Nosso Jogo
            </span>
            <div className="w-12 h-px bg-[#C9A84C]/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black leading-none mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            <span className="text-white">ECLIPSE:</span>
            <br />
            <span className="shimmer-text">A ÚLTIMA FRONTEIRA</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Uma jornada épica através de mundos devastados pelo eclipse cósmico. Você é o último
            guardião — a linha entre a extinção e a sobrevivência da humanidade.
          </motion.p>
        </div>

        {/* Game showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Visual placeholder - game art */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative aspect-video bg-[#111111] border border-[#C9A84C]/20 overflow-hidden"
          >
            {/* Cinematic placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 via-transparent to-black/80" />

            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Center Eclipse symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-2 border-[#C9A84C]/30 float-anim" />
                <div className="absolute inset-4 rounded-full border border-[#C9A84C]/20" />
                <div className="absolute inset-8 rounded-full bg-[#C9A84C]/10 blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-4xl font-black shimmer-text"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    E
                  </span>
                </div>
                {/* Orbiting particle */}
                <div className="absolute inset-0 rotate-slow">
                  <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-[#C9A84C]" />
                </div>
              </div>
            </div>

            {/* Letterbox bars */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-black/60" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/60" />

            {/* ARTE DO JOGO label */}
            <div className="absolute bottom-10 left-4 right-4 flex items-end justify-between">
              <div>
                <p className="text-[#C9A84C] text-xs tracking-widest mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
                  EM DESENVOLVIMENTO
                </p>
                <p className="text-white/40 text-xs">Arte conceitual · 2025</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3
                className="text-2xl font-bold text-white mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Uma Nova Era dos Games
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Eclipse: A Última Fronteira é um RPG de ação em mundo aberto com narrativa ramificada,
                visuais de nível cinematográfico e uma trilha sonora orquestral original.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Com influências de The Last of Us, God of War e Horizon — mas com alma completamente
                brasileira. Da fauna amazônica ao mitológico, da favela ao cosmos.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["RPG", "Mundo Aberto", "Ação", "Single Player", "Co-op", "PC/Console"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-[#C9A84C]/25 text-[#C9A84C]/70 text-xs tracking-wider"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#diferenciais"
              className="inline-flex items-center gap-2 text-[#C9A84C] text-sm tracking-widest hover:gap-4 transition-all duration-300 group"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              VER DIFERENCIAIS
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="group p-5 bg-[#111111] border border-white/5 hover:border-[#C9A84C]/30 transition-all duration-400"
              >
                <Icon size={20} className="text-[#C9A84C] mb-3" />
                <h4
                  className="text-white font-bold text-sm mb-2 tracking-wide"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {feat.title}
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-500 transition-colors">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
