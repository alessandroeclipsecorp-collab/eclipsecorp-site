"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// ─── Logo com Glow Dourado + Luz Volumétrica ────────────────────────────────

function LogoGlow({ size = 148 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size * 2.4, height: size * 2.4 }}
      aria-hidden
    >
      {/* Camada 1 — Luz volumétrica externa (raios difusos) */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 2.4,
          height: size * 2.4,
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.08) 35%, rgba(240,208,128,0.03) 60%, transparent 78%)",
          filter: "blur(28px)",
        }}
        animate={{ opacity: [0.55, 1, 0.55], scale: [0.92, 1.06, 0.92] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Camada 2 — Halo médio nítido */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 1.7,
          height: size * 1.7,
          background:
            "radial-gradient(ellipse at center, rgba(240,208,128,0.22) 0%, rgba(201,168,76,0.12) 45%, transparent 70%)",
          filter: "blur(14px)",
        }}
        animate={{ opacity: [0.45, 0.9, 0.45], scale: [0.96, 1.08, 0.96] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {/* Camada 3 — Glow interno concentrado (halo dourado brilhante) */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 1.18,
          height: size * 1.18,
          background:
            "radial-gradient(ellipse at center, rgba(255,220,100,0.28) 0%, rgba(201,168,76,0.14) 50%, transparent 72%)",
          filter: "blur(6px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
      />

      {/* Camada 4 — Raios de luz volumétrica (conic gradient) */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 2.1,
          height: size * 2.1,
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(201,168,76,0.06) 8deg, transparent 16deg, transparent 90deg, rgba(201,168,76,0.04) 98deg, transparent 106deg, transparent 180deg, rgba(201,168,76,0.05) 188deg, transparent 196deg, transparent 270deg, rgba(201,168,76,0.03) 278deg, transparent 286deg)",
          filter: "blur(22px)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* Logo real */}
      <motion.div
        className="relative z-10"
        style={{ width: size, height: Math.round(size * 0.554) }}
        animate={{
          scale: [1, 1.032, 1],
          filter: [
            `drop-shadow(0 0 ${size * 0.12}px rgba(201,168,76,0.65)) drop-shadow(0 0 ${size * 0.28}px rgba(201,168,76,0.3))`,
            `drop-shadow(0 0 ${size * 0.22}px rgba(240,208,128,1))   drop-shadow(0 0 ${size * 0.48}px rgba(201,168,76,0.55))`,
            `drop-shadow(0 0 ${size * 0.12}px rgba(201,168,76,0.65)) drop-shadow(0 0 ${size * 0.28}px rgba(201,168,76,0.3))`,
          ],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/logo.png"
          alt="EclipseCorp"
          width={1078}
          height={597}
          priority
          style={{ width: size, height: "auto", display: "block" }}
        />
      </motion.div>
    </div>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────────

const TITLE = "Bem-vindo à EclipseCorp";
const TAGLINE = "O maior estúdio de games do mundo nasce em Belém do Pará.";

// Animation stages:
// 0 → preto, lua oculta
// 1 → lua aparece (ainda no preto)
// 2 → overlay fade para branco
// 3 → branco completo, texto revela

export default function HeroPremium() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 150);   // lua aparece
    const t2 = setTimeout(() => setStage(2), 1400);  // overlay começa a sumir
    const t3 = setTimeout(() => setStage(3), 2650);  // branco completo → texto
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  // Parallax ao scroll
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY       = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  // Atraso total das letras + margem para tagline e indicador
  const titleDuration  = TITLE.length * 0.048 + 0.5;
  const taglineDelay   = titleDuration + 0.15;
  const scrollDelay    = taglineDelay + 0.7;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* ── Overlay preto — desaparece na fase 2 ────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-20 bg-black pointer-events-none"
        animate={{ opacity: stage >= 2 ? 0 : 1 }}
        transition={{ duration: 1.3, ease: [0.4, 0, 0.15, 1] as [number,number,number,number] }}
      />

      {/* ── Conteúdo centralizado ───────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto"
      >
        {/* Logo EclipseCorp */}
        <motion.div
          className="mb-0"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(16px)" }}
          animate={
            stage >= 1
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.8, filter: "blur(16px)" }
          }
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        >
          <LogoGlow size={300} />
        </motion.div>

        {/* Título — palavra por palavra */}
        <h1
          className="font-black leading-none mb-5"
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "clamp(1.4rem, 3.8vw, 2.6rem)",
            letterSpacing: "0.03em",
            color: "#0A0A0A",
            whiteSpace: "nowrap",
            marginTop: -16,
          }}
          aria-label={TITLE}
        >
          {TITLE.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 18 }}
              animate={
                stage >= 3
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 18 }
              }
              transition={{
                duration: 0.55,
                delay: i * 0.2,
                ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
              }}
            >
              {word}{i < TITLE.split(" ").length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </h1>

        {/* Linha separadora */}
        <motion.div
          className="mb-5"
          style={{
            height: 1,
            width: 48,
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={stage >= 3 ? { scaleX: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.9,
            delay: taglineDelay - 0.3,
            ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
          }}
        />

        {/* Tagline */}
        <motion.p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-cinzel)",
            color: "#9CA3AF",
            letterSpacing: "0.06em",
            maxWidth: 420,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.9,
            delay: taglineDelay,
            ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
          }}
        >
          {TAGLINE}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={stage >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: scrollDelay }}
        >
          {/* Seta pulsante */}
          <motion.div
            className="flex flex-col items-center gap-[3px]"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-[1px] h-5" style={{ background: "linear-gradient(to bottom, transparent, #C9A84C)" }} />
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <span
            className="text-[9px] tracking-[0.45em] uppercase"
            style={{ fontFamily: "var(--font-cinzel)", color: "#D1D5DB" }}
          >
            Scroll
          </span>
        </motion.div>
      </motion.div>

    </section>
  );
}
