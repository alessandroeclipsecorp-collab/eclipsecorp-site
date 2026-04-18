"use client";

import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface Props {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  once?: boolean;
}

export default function LetterReveal({
  text,
  className = "",
  style,
  delay = 0,
  stagger = 0.04,
  as: Tag = "h1",
  once = true,
}: Props) {
  const letters = text.split("");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 30, rotateX: -90, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className="overflow-hidden"
      style={{ perspective: "800px" }}
    >
      <Tag className={className} style={style} aria-label={text}>
        {letters.map((char, i) =>
          char === " " ? (
            <span key={i}>&nbsp;</span>
          ) : (
            <motion.span
              key={i}
              variants={letter}
              className="inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              {char}
            </motion.span>
          )
        )}
      </Tag>
    </motion.div>
  );
}
