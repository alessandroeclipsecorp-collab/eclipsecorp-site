"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";

function Particle({ delay }: { delay: number }) {
  const style = {
    left: `${Math.random() * 100}%`,
    top: `${60 + Math.random() * 40}%`,
    width: `${1 + Math.random() * 2}px`,
    height: `${1 + Math.random() * 2}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
  };

  return (
    <div
      className="absolute rounded-full bg-[#C9A84C] opacity-60"
      style={{
        ...style,
        animation: `particle-rise ${style.animationDuration} ${style.animationDelay} ease-out infinite`,
      }}
    />
  );
}

export default function HeroSection() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({ id: i, delay: Math.random() * 5 }))
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#C9A84C]/5 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#C9A84C]/8 blur-[80px]" />

      {/* Particles */}
      <style>{`
        @keyframes particle-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-400px) scale(0); opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} delay={p.delay} />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-[#C9A84C]/30 bg-[#C9A84C]/5 backdrop-blur-sm"
        >
          <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
          <span
            className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Estúdio AAA — Belém, Brasil
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1
            className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tighter mb-2"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            <span className="shimmer-text">ECLIPSE</span>
          </h1>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-[0.2em] text-white/80 mb-6"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            CORP
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-gray-400 tracking-widest max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          O maior estúdio de games do mundo nasce em Belém do Pará.
          <br />
          <span className="text-[#C9A84C]/80">A fronteira entre sonho e realidade vai ser apagada.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#jogo"
            className="group relative flex items-center gap-3 px-8 py-4 bg-[#C9A84C] text-black font-bold text-sm tracking-widest overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            <Play size={16} fill="black" />
            DESCOBRIR O JOGO
          </a>
          <a
            href="#sobre"
            className="flex items-center gap-3 px-8 py-4 border border-[#C9A84C]/40 text-[#C9A84C] text-sm tracking-widest hover:bg-[#C9A84C]/10 transition-all duration-300"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            NOSSA MISSÃO
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-20 grid grid-cols-3 gap-4 max-w-xl mx-auto"
        >
          {[
            { value: "2025", label: "Fundação" },
            { value: "∞", label: "Ambição" },
            { value: "#1", label: "Objetivo" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold text-[#C9A84C] mb-1"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 tracking-widest" style={{ fontFamily: "var(--font-cinzel)" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} className="text-[#C9A84C]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
