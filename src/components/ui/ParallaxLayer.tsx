"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, UseScrollOptions } from "framer-motion";

type ScrollOffset = NonNullable<UseScrollOptions["offset"]>;

interface Props {
  children: ReactNode;
  speed?: number;
  className?: string;
  offset?: ScrollOffset;
}

export default function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
  offset = ["start start", "end start"],
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
