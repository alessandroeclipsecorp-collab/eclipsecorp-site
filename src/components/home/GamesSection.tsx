"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const ECLIPSE_PILLARS = [
  { number: "01", title: "Missão",  body: "Ser o guardião da última chama da humanidade num universo consumido pelo eclipse cósmico." },
  { number: "02", title: "Origem",  body: "Um mundo destruído por um evento irreversível. Civilizações extintas. Você é o que resta." },
  { number: "03", title: "Método",  body: "RPG de ação com escolhas reais. Cada decisão remodela o destino do universo." },
  { number: "04", title: "Futuro",  body: "Lançamento em 2026. Múltiplos atos. Um universo que cresce com os jogadores." },
];


function PillarList({
  pillars,
  accent,
  delayBase,
  slideDir,
}: {
  pillars: typeof ECLIPSE_PILLARS;
  accent: string;
  delayBase: number;
  slideDir: "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-0">
      {pillars.map((p, i) => (
        <motion.div
          key={p.number}
          initial={{ opacity: 0, x: slideDir === "left" ? -20 : 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: delayBase + i * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="group relative py-5 cursor-default"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-transparent transition-colors duration-300"
            style={{ ["--hover-color" as string]: accent }}
            onMouseEnter={e => (e.currentTarget.style.background = accent + "80")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          />
          <div className="flex gap-5 pl-3">
            <span
              className="font-black text-sm shrink-0 pt-0.5"
              style={{ fontFamily: "var(--font-cinzel)", color: accent + "55" }}
            >
              {p.number}
            </span>
            <div>
              <h3
                className="font-bold mb-1 tracking-wider text-sm transition-colors duration-300"
                style={{ fontFamily: "var(--font-cinzel)", color: "#111827" }}
                onMouseEnter={e => (e.currentTarget.style.color = accent)}
                onMouseLeave={e => (e.currentTarget.style.color = "#111827")}
              >
                {p.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
                {p.body}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function GamesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="jogos"
      ref={ref}
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-3xl">

        {/* Eclipse */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        >
          <Link href="/jogos/eclipse-a-ultima-fronteira" style={{ cursor: "none" }}>
            <motion.div
              className="group mb-8"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            >
              <h2
                className="font-black leading-none whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "clamp(1rem, 2.2vw, 1.8rem)",
                  color: "#0A0A0A",
                  letterSpacing: "0.01em",
                }}
              >
                Eclipse: A Última Fronteira
              </h2>
              <motion.div
                className="mt-2 h-px"
                style={{ background: "#C9A84C", width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
          </Link>

          <PillarList pillars={ECLIPSE_PILLARS} accent="#C9A84C" delayBase={0.2} slideDir="left" />
        </motion.div>

      </div>
    </section>
  );
}
