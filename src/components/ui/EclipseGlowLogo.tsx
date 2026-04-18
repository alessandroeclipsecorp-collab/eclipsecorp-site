"use client";

import { motion } from "framer-motion";

interface Props {
  size?: number;
  className?: string;
}

export default function EclipseGlowLogo({ size = 160, className = "" }: Props) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer halo — Interstellar accretion disk */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 1.8,
          height: size * 1.8,
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mid glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 1.3,
          height: size * 1.3,
          background: "radial-gradient(ellipse at center, rgba(240,208,128,0.2) 0%, transparent 65%)",
          filter: "blur(12px)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Rotating orbital ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 1.1,
          height: size * 1.1,
          border: "1px solid rgba(201,168,76,0.35)",
          boxShadow: "0 0 20px rgba(201,168,76,0.2), inset 0 0 20px rgba(201,168,76,0.05)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {/* Orbital dot */}
        <div
          className="absolute rounded-full bg-[#F0D080]"
          style={{
            width: 6,
            height: 6,
            top: "50%",
            left: -3,
            marginTop: -3,
            boxShadow: "0 0 12px 4px rgba(240,208,128,0.8)",
          }}
        />
      </motion.div>

      {/* Counter-rotating inner ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.88,
          height: size * 0.88,
          border: "1px solid rgba(201,168,76,0.15)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute rounded-full bg-[#C9A84C]"
          style={{
            width: 4,
            height: 4,
            top: -2,
            left: "50%",
            marginLeft: -2,
            boxShadow: "0 0 8px 3px rgba(201,168,76,0.7)",
          }}
        />
      </motion.div>

      {/* Core black hole */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: "radial-gradient(ellipse at 40% 40%, rgba(40,20,0,1) 0%, rgba(10,5,0,1) 50%, rgba(0,0,0,1) 100%)",
          boxShadow:
            "0 0 40px rgba(201,168,76,0.3), 0 0 80px rgba(201,168,76,0.15), inset 0 0 40px rgba(0,0,0,0.9)",
        }}
        animate={{
          boxShadow: [
            "0 0 40px rgba(201,168,76,0.3), 0 0 80px rgba(201,168,76,0.15)",
            "0 0 60px rgba(201,168,76,0.5), 0 0 120px rgba(201,168,76,0.25)",
            "0 0 40px rgba(201,168,76,0.3), 0 0 80px rgba(201,168,76,0.15)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* EC monogram */}
      <div className="relative z-10 flex items-center justify-center">
        <span
          className="font-black select-none"
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: size * 0.28,
            background: "linear-gradient(135deg, #8B6914, #C9A84C, #F0D080, #C9A84C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 8px rgba(201,168,76,0.6))",
            letterSpacing: "0.05em",
          }}
        >
          EC
        </span>
      </div>
    </div>
  );
}
