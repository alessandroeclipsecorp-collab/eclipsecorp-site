"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const STAR_COLORS = [
  "255,255,255",
  "255,248,220",
  "200,168,100",
  "180,210,255",
  "255,220,180",
];

export default function StarfieldCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildStars();
    };

    const buildStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random(),
        size: 0.3 + Math.random() * 2.2,
        opacity: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.0005 + Math.random() * 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }));
    };

    const spawnShootingStar = () => {
      if (Math.random() > 0.003) return;
      const angle = (Math.random() * Math.PI) / 6 + Math.PI / 8;
      shootingRef.current.push({
        x: Math.random() * canvas.width * 1.5 - canvas.width * 0.25,
        y: Math.random() * canvas.height * 0.4,
        len: 80 + Math.random() * 120,
        speed: 8 + Math.random() * 12,
        angle,
        opacity: 1,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    };

    const draw = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space gradient
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      grad.addColorStop(0, "rgba(8,4,20,1)");
      grad.addColorStop(0.5, "rgba(4,2,12,1)");
      grad.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula clouds (subtle)
      const nebulaPositions = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 300, color: "15,5,40" },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, r: 250, color: "40,10,5" },
        { x: canvas.width * 0.6, y: canvas.height * 0.2, r: 200, color: "5,15,40" },
      ];
      nebulaPositions.forEach(({ x, y, r, color }) => {
        const ng = ctx.createRadialGradient(x, y, 0, x, y, r);
        ng.addColorStop(0, `rgba(${color},0.08)`);
        ng.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = ng;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Parallax offset from mouse
      const mx = (mouseRef.current.x - canvas.width / 2) * 0.015;
      const my = (mouseRef.current.y - canvas.height / 2) * 0.015;

      // Stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed * 60 + star.twinkleOffset);
        const alpha = star.opacity * (0.7 + 0.3 * twinkle);
        const parallaxX = star.x + mx * star.z;
        const parallaxY = star.y + my * star.z;

        if (star.size > 1.4) {
          // Glowing large star
          const glow = ctx.createRadialGradient(parallaxX, parallaxY, 0, parallaxX, parallaxY, star.size * 4);
          glow.addColorStop(0, `rgba(${star.color},${alpha})`);
          glow.addColorStop(0.4, `rgba(${star.color},${alpha * 0.3})`);
          glow.addColorStop(1, `rgba(${star.color},0)`);
          ctx.beginPath();
          ctx.arc(parallaxX, parallaxY, star.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(parallaxX, parallaxY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color},${alpha})`;
        ctx.fill();
      });

      // Shooting stars
      spawnShootingStar();
      shootingRef.current = shootingRef.current.filter((s) => {
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        const progress = s.life / s.maxLife;
        s.opacity = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.8, `rgba(201,168,76,${s.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(255,255,255,${s.opacity})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return s.life < s.maxLife;
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onResize = () => {
      init();
    };

    init();
    draw();
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
}
