"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareColor?: string;
  scale?: number;
}

export default function Card3D({
  children,
  className = "",
  maxTilt = 18,
  glareColor = "rgba(201,168,76,0.15)",
  scale = 1.03,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [maxTilt, -maxTilt]), { stiffness: 350, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-maxTilt, maxTilt]), { stiffness: 350, damping: 30 });
  const glareX  = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glareY  = useTransform(rawY, [-0.5, 0.5], [0, 100]);
  const scaleV  = useSpring(1, { stiffness: 350, damping: 30 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  };

  const onMouseEnter = () => scaleV.set(scale);

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    scaleV.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale: scaleV,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {/* Glare */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, ${glareColor}, transparent 60%)`
          ),
          opacity: useTransform(rawX, [-0.5, 0, 0.5], [0.4, 0, 0.4]),
        }}
      />
      {children}
    </motion.div>
  );
}
