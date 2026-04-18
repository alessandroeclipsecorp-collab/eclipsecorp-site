"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Dot follows cursor instantly
  const dotX = useSpring(mx, { stiffness: 2000, damping: 80 });
  const dotY = useSpring(my, { stiffness: 2000, damping: 80 });

  // Ring follows with lag
  const ringX = useSpring(mx, { stiffness: 300, damping: 30 });
  const ringY = useSpring(my, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const onHoverIn  = () => setHovered(true);
    const onHoverOut = () => setHovered(false);

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    // Attach hover listeners to interactive elements
    const attachHover = () => {
      const els = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']");
      els.forEach(el => {
        el.addEventListener("mouseenter", onHoverIn);
        el.addEventListener("mouseleave", onHoverOut);
      });
    };
    attachHover();

    // Re-attach on DOM mutations
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { subtree: true, childList: true });

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
    };
  }, [mx, my]);

  const ringSize = hovered ? 48 : clicked ? 18 : 36;
  const dotSize  = hovered ?  4 : clicked ? 10 :  5;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{ opacity: hidden ? 0 : 1 }}
    >
      {/* Outer ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width:  ringSize,
          height: ringSize,
          borderColor: hovered ? "#F0D080" : "#C9A84C",
          boxShadow: hovered
            ? "0 0 16px rgba(240,208,128,0.6), 0 0 32px rgba(201,168,76,0.3)"
            : "0 0 8px rgba(201,168,76,0.3)",
          opacity: hovered ? 0.9 : 0.6,
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="absolute rounded-full border border-[#C9A84C]"
      />

      {/* Inner dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: dotSize,
          height: dotSize,
          background: hovered
            ? "radial-gradient(circle, #FFFFFF, #F0D080)"
            : "radial-gradient(circle, #F0D080, #C9A84C)",
          boxShadow: "0 0 10px rgba(201,168,76,0.9)",
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
        className="absolute rounded-full"
      />
    </div>
  );
}
