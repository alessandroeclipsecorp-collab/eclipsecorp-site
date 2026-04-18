"use client";

import { useRef, useEffect, CSSProperties } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import LetterReveal from "@/components/ui/LetterReveal";
import Card3D from "@/components/ui/Card3D";
import Footer from "@/components/Footer";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const characters = [
  {
    name: "Dra. Amélia Vidal",
    title: "Bióloga Sobrevivente",
    faction: "Bastião 12",
    ability: "Comunicação com MATER",
    desc: "Única humana capaz de ouvir MATER sem enlouquecer. Não sabe se isso a torna valiosa — ou marcada para morrer por último.",
    symbol: "⬡",
    accentColor: "#4DFFAA",
    glowColor: "rgba(77,255,170,0.25)",
    number: "01",
  },
  {
    name: "Ten. Ruan Cruz",
    title: "Último Comando Militar",
    faction: "Exército Remanescente",
    ability: "Defesa de Perímetro",
    desc: "Sobreviveu a 3 quedas de Bastião. Cada vez que um cai, ele fica mais quieto. Os outros sobreviventes temem o que ele se tornou para conseguir sobreviver.",
    symbol: "▲",
    accentColor: "#7B9CFF",
    glowColor: "rgba(123,156,255,0.25)",
    number: "02",
  },
  {
    name: "MATER",
    title: "A Entidade Primordial",
    faction: "A Floresta",
    ability: "Controle Total do Ecossistema",
    desc: "Não é maligna. Não é boa. É justa. A floresta existia antes. Vai existir depois. A questão é: você entende isso antes que ela precise te ensinar.",
    symbol: "✦",
    accentColor: "#FF6B6B",
    glowColor: "rgba(255,107,107,0.25)",
    number: "03",
  },
  {
    name: "Karim Flores",
    title: "Engenheiro de Bastiões",
    faction: "Bastião Central",
    ability: "Fabricação em Campo",
    desc: "Construiu 7 Bastiões. Assistiu 5 deles serem destruídos. Ainda constrói. Não porque acredita em salvação — mas porque construir é a única coisa que o mantém humano.",
    symbol: "◈",
    accentColor: "#FFB347",
    glowColor: "rgba(255,179,71,0.25)",
    number: "04",
  },
];

const regions = [
  {
    n: "01", name: "Bastião Central", subtitle: "O Último Lar",
    desc: "Fortaleza de aço e paranoia. 3.000 sobreviventes, 400 dias de comida, zero esperança de resgate. O único lugar seguro — por enquanto.",
    threat: "Conflito Interno · Recursos Limitados",
    color: "#4A60CC",
    glow: "rgba(74,96,204,0.2)",
  },
  {
    n: "02", name: "Floresta Profunda", subtitle: "Território de MATER",
    desc: "Sem mapa. Sem sinais. A bússola gira em espiral. Apenas a bioluminescência das plantas guia — mas ela guia para onde MATER quer.",
    threat: "Fauna Controlada · Ausência de Rota",
    color: "#2A6640",
    glow: "rgba(42,102,64,0.2)",
  },
  {
    n: "03", name: "Rio Negro Digital", subtitle: "Veias de Tecnologia",
    desc: "O leito do Rio Negro coberto por infraestrutura digital que MATER absorveu. Servidores que brotam de cipós. Cabos que pulsam como nervos.",
    threat: "Sistemas Hostis · Água Contaminada",
    color: "#1A1A4A",
    glow: "rgba(26,26,74,0.25)",
  },
  {
    n: "04", name: "Zona de Silêncio", subtitle: "Onde o Tempo Para",
    desc: "Nenhum sobrevivente voltou. As transmissões de rádio enviadas de lá chegam com 3 horas de atraso — e às vezes do futuro. MATER mostra sua forma real aqui.",
    threat: "Anomalia Temporal · Forma Real de MATER",
    color: "#3A0A0A",
    glow: "rgba(100,20,20,0.2)",
  },
];

const gameplay = [
  {
    n: "01", title: "Sobrevivência Real",
    body: "Fome, sede, temperatura, sanidade — 4 métricas que não param. Sem HUD de combate. Você sente que está morrendo antes de ver a tela vermelha.",
    tag: "SURVIVAL",
  },
  {
    n: "02", title: "Navegação por Instinto",
    body: "Sem mapa. Sem marcadores. Posição do sol, migração de pássaros, padrão de bioluminescência. A floresta dá pistas — mas nem todas são amigáveis.",
    tag: "EXPLORATION",
  },
  {
    n: "03", title: "Construção de Bastiões",
    body: "Cada Bastião é construído com recursos coletados no campo. Cada um destruído por MATER é permanente no arquivo de save. Perda real, sem reversão.",
    tag: "BUILD",
  },
  {
    n: "04", title: "Sistema de Sanidade",
    body: "Quanto mais você avança, mais o jogo reescreve o que você vê. Texturas mudam. Sons distorcem. NPCs dizem coisas que você não tem certeza se aconteceram.",
    tag: "HORROR",
  },
  {
    n: "05", title: "Co-op Assimétrico",
    body: "2 jogadores com papéis opostos: um explora, um defende o Bastião. Comunicação exclusiva por texto — sem voz, como na realidade pós-colapso.",
    tag: "CO-OP",
  },
  {
    n: "06", title: "Morte com Consequências",
    body: "Morrer reseta o personagem mas não o mundo. O que você destruiu não volta. O que MATER aprendeu sobre você, ela lembra na próxima run.",
    tag: "ROGUELIKE",
  },
];

// ─── CANVAS ─────────────────────────────────────────────────────────────────────

function JungleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    interface Spore { x: number; y: number; vy: number; vx: number; s: number; o: number; hue: number; wobble: number; wSpeed: number; }
    const spores: Spore[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: H + Math.random() * 100,
      vy: -(0.25 + Math.random() * 0.7),
      vx: (Math.random() - 0.5) * 0.2,
      s: 0.6 + Math.random() * 2,
      o: 0.15 + Math.random() * 0.5,
      hue: 130 + Math.random() * 50,
      wobble: Math.random() * Math.PI * 2,
      wSpeed: 0.005 + Math.random() * 0.012,
    }));

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      // Deep night gradient
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#010309");
      grad.addColorStop(0.5, "#020810");
      grad.addColorStop(1, "#010506");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Bioluminescent ambient
      const bio = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, 380);
      bio.addColorStop(0, `rgba(20,80,50,${0.06 + Math.sin(t) * 0.025})`);
      bio.addColorStop(1, "transparent");
      ctx.fillStyle = bio;
      ctx.fillRect(0, 0, W, H);

      // Red void hint — MATER's presence
      const void_ = ctx.createRadialGradient(W * 0.75, H * 0.6, 0, W * 0.75, H * 0.6, 280);
      void_.addColorStop(0, `rgba(80,10,10,${0.04 + Math.sin(t * 0.7) * 0.02})`);
      void_.addColorStop(1, "transparent");
      ctx.fillStyle = void_;
      ctx.fillRect(0, 0, W, H);

      spores.forEach(s => {
        s.wobble += s.wSpeed;
        s.x += Math.sin(s.wobble) * 0.5 + s.vx;
        s.y += s.vy;
        if (s.y < -10) { s.y = H + 10; s.x = Math.random() * W; }
        const fade = Math.min(1, (H - s.y) / (H * 0.45));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue},80%,60%,${s.o * fade})`;
        ctx.fill();

        // Faint glow
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.s * 4);
        g.addColorStop(0, `hsla(${s.hue},80%,60%,${s.o * fade * 0.4})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.s * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      frame.current = requestAnimationFrame(draw);
    };

    draw();
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => { cancelAnimationFrame(frame.current); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />;
}

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function SectionLabel({ text, color = "#7B9CFF" }: { text: string; color?: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-8 h-px" style={{ background: color }} />
      <span
        className="text-[10px] tracking-[0.5em] uppercase"
        style={{ fontFamily: "var(--font-cinzel)", color, opacity: 0.5 }}
      >
        {text}
      </span>
    </div>
  );
}

const fadeUp = {
  hidden:  { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

const BG = "#010309";

// ─── HERO ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: BG }}>
      <JungleCanvas />

      {/* Signal lost indicator */}
      <motion.div
        className="absolute top-24 left-8 z-20 flex items-center gap-2"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
        <span className="text-red-400/50 text-[9px] tracking-[0.4em]" style={{ fontFamily: "var(--font-cinzel)" }}>
          SINAL PERDIDO · DIA 847
        </span>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#010309] to-transparent pointer-events-none z-10" />

      <motion.div style={{ y: textY, opacity: fadeOut }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#7B9CFF]/40" />
          <span
            className="text-[10px] tracking-[0.5em] uppercase text-[#7B9CFF]/40"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            EclipseCorp · Survival Horror
          </span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#7B9CFF]/40" />
        </motion.div>

        <LetterReveal
          text="LASTON"
          as="h1"
          delay={0.6}
          stagger={0.09}
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "clamp(6rem,20vw,13rem)",
            lineHeight: 1,
            letterSpacing: "0.06em",
            background: "linear-gradient(180deg, #ffffff 0%, #B8CBFF 25%, #7B9CFF 55%, #1E2A5A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 50px rgba(123,156,255,0.55))",
          } as CSSProperties}
          className="block"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
          className="tracking-[0.4em] text-[#7B9CFF]/40 mt-3 mb-6"
          style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(0.7rem,1.8vw,1rem)" }}
        >
          O ÚLTIMO BASTIÃO
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          className="text-white/25 text-sm max-w-lg mx-auto leading-relaxed mb-10"
        >
          Os últimos sobreviventes da humanidade se refugiam na Amazônia.
          Uma entidade primordial reclama o que sempre foi dela. Nenhum mapa vai te salvar aqui.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a href="#synopsis"
            className="px-8 py-3.5 border border-[#7B9CFF]/40 text-[#7B9CFF] text-[10px] tracking-[0.35em] hover:bg-[#7B9CFF] hover:text-black transition-all"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            ENTRAR NA FLORESTA
          </a>
          <a href="#characters"
            className="px-8 py-3.5 border border-white/8 text-white/25 text-[10px] tracking-[0.35em] hover:border-white/20 hover:text-white/50 transition-all"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            VER PERSONAGENS
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-px h-14 overflow-hidden relative mx-auto">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7B9CFF] to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ─── SYNOPSIS ──────────────────────────────────────────────────────────────────

function SynopsisSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineW = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  const lines = [
    "Os governos colapsaram em 2028.",
    "O vírus não foi biológico.",
    "Foi informacional.",
    "Uma frequência que apagou sistemas — e mentes.",
    "A floresta sobreviveu.",
    "A cidade, não.",
    "E agora a floresta quer de volta o que era dela.",
  ];

  return (
    <section id="synopsis" ref={ref} className="relative py-36 overflow-hidden" style={{ background: BG }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B9CFF]/15 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="Sinopse" />
        </motion.div>

        <div className="space-y-5 mb-20">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-black leading-none"
              style={{
                fontFamily: "var(--font-cinzel)",
                fontSize: `clamp(${1.5 - i * 0.04}rem, ${3.2 - i * 0.15}vw, ${2.6 - i * 0.1}rem)`,
                color: i === lines.length - 1 ? "#7B9CFF" : `rgba(255,255,255,${0.85 - i * 0.08})`,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="h-px bg-gradient-to-r from-[#7B9CFF]/50 via-[#B0BEFF] to-[#7B9CFF]/50"
          style={{ width: lineW }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <p className="text-gray-600 leading-relaxed text-sm">
              Os que chegaram à Amazônia encontraram algo diferente do que lembravam. Mais vivo.
              Mais consciente. As árvores se comunicam. Os animais obedecem a um ritmo invisível.
            </p>
          </div>
          <div>
            <p
              className="leading-relaxed text-sm italic"
              style={{ color: "rgba(123,156,255,0.45)" }}
            >
              "MATER não nos quer mortos. Ela quer que a gente entenda por que o jogo acabou.
              O problema é que a maioria de nós não sobrevive à lição."
              <br /><br />
              <span className="not-italic text-xs text-white/20 tracking-widest" style={{ fontFamily: "var(--font-cinzel)" }}>
                — Dra. Amélia Vidal · Transmissão Dia 612
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── WORLD ─────────────────────────────────────────────────────────────────────

function WorldSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: BG }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B9CFF]/15 to-transparent" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-black select-none pointer-events-none leading-none"
        style={{ fontFamily: "var(--font-cinzel)", color: "rgba(123,156,255,0.015)" }}
      >
        FLORESTA
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <SectionLabel text="O Mundo" />
          <h2
            className="font-black leading-none"
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(2.5rem,6vw,4.5rem)",
              background: "linear-gradient(135deg, #ffffff 40%, #7B9CFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            4 REGIÕES.
            <br />
            <span className="text-white/20">UMA ENTIDADE.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regions.map((r, i) => (
            <motion.div
              key={r.n}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
              className="group relative p-7 border border-white/5 overflow-hidden"
              style={{ background: "#08080E" }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 30%, ${r.glow}, transparent 70%)` }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${r.color}, transparent)` }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="text-[10px] tracking-[0.4em] text-white/15"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    REGIÃO {r.n}
                  </span>
                  <div className="w-5 h-5 flex items-center justify-center border border-white/8">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: r.color }} />
                  </div>
                </div>
                <h3
                  className="font-black text-white mb-1 tracking-wide group-hover:text-[#7B9CFF] transition-colors"
                  style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(1rem,2.5vw,1.3rem)" }}
                >
                  {r.name}
                </h3>
                <p
                  className="text-[10px] tracking-[0.3em] mb-4"
                  style={{ fontFamily: "var(--font-cinzel)", color: "#7B9CFF", opacity: 0.4 }}
                >
                  {r.subtitle}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed mb-5 group-hover:text-gray-400 transition-colors">
                  {r.desc}
                </p>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] tracking-widest text-orange-400/40 group-hover:text-orange-400/60 transition-colors">
                    ⚠ {r.threat}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CHARACTERS ────────────────────────────────────────────────────────────────

function CharacterCard({ char, index }: { char: typeof characters[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Card3D
        glareColor={char.glowColor}
        maxTilt={14}
        className="h-full"
      >
        <div
          className="relative h-full p-7 border border-white/5 overflow-hidden"
          style={{ background: "linear-gradient(145deg, #060B12, #040810)" }}
        >
          <div
            className="absolute bottom-4 right-4 text-[6rem] font-black select-none pointer-events-none leading-none opacity-[0.03]"
            style={{ fontFamily: "var(--font-cinzel)", color: char.accentColor }}
          >
            {char.symbol}
          </div>

          <div className="flex items-start justify-between mb-6">
            <span
              className="text-[10px] tracking-[0.4em] opacity-25"
              style={{ fontFamily: "var(--font-cinzel)", color: char.accentColor }}
            >
              {char.number}
            </span>
            <div
              className="px-2.5 py-1 border text-[9px] tracking-[0.3em]"
              style={{
                fontFamily: "var(--font-cinzel)",
                borderColor: `${char.accentColor}25`,
                color: `${char.accentColor}70`,
              }}
            >
              {char.faction}
            </div>
          </div>

          <motion.span
            className="block text-5xl mb-5"
            style={{ color: char.accentColor, filter: `drop-shadow(0 0 20px ${char.accentColor})` }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          >
            {char.symbol}
          </motion.span>

          <h3
            className="font-black leading-none mb-1"
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(1.1rem,2.2vw,1.5rem)",
              color: char.accentColor,
              filter: `drop-shadow(0 0 10px ${char.accentColor}40)`,
            }}
          >
            {char.name}
          </h3>
          <p
            className="text-[10px] tracking-[0.3em] mb-5 opacity-40"
            style={{ fontFamily: "var(--font-cinzel)", color: char.accentColor }}
          >
            {char.title}
          </p>
          <p className="text-gray-600 text-xs leading-relaxed mb-6">{char.desc}</p>
          <div
            className="flex items-center gap-2 pt-4 border-t"
            style={{ borderColor: `${char.accentColor}15` }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: char.accentColor, boxShadow: `0 0 8px ${char.accentColor}` }}
            />
            <span className="text-[10px] tracking-widest text-white/25" style={{ fontFamily: "var(--font-cinzel)" }}>
              {char.ability}
            </span>
          </div>
        </div>
      </Card3D>
    </motion.div>
  );
}

function CharactersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="characters" className="relative py-32 overflow-hidden" style={{ background: BG }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B9CFF]/15 to-transparent" />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <SectionLabel text="Personagens" />
          <h2
            className="font-black leading-none"
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(2.5rem,6vw,4.5rem)",
              background: "linear-gradient(135deg, #ffffff 30%, #7B9CFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            OS SOBREVIVENTES
          </h2>
          <p className="text-white/15 text-sm mt-3" style={{ fontFamily: "var(--font-cinzel)", letterSpacing: "0.1em" }}>
            Passe o cursor para interagir
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {characters.map((c, i) => <CharacterCard key={c.name} char={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── GAMEPLAY ──────────────────────────────────────────────────────────────────

function GameplaySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ background: BG }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B9CFF]/15 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:sticky lg:top-28 lg:w-80 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel text="Gameplay" />
              <h2
                className="font-black leading-none mb-6"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  background: "linear-gradient(135deg, #ffffff, #7B9CFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                SOBREVIVER<br />É UM VERBO
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Laston não é sobre matar monstros. É sobre entender por que você está na floresta
                de alguém e o que isso significa para sobreviver.
              </p>
            </motion.div>
          </div>

          <div className="flex-1 space-y-0">
            {gameplay.map((g, i) => (
              <motion.div
                key={g.n}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="group border-b border-white/5 py-7 hover:border-[#7B9CFF]/20 transition-colors duration-300"
              >
                <div className="flex gap-6 items-start">
                  <span
                    className="text-[10px] tracking-[0.3em] text-[#7B9CFF]/20 group-hover:text-[#7B9CFF]/50 transition-colors shrink-0 mt-1"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {g.tag}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-[#7B9CFF]/20 text-xs group-hover:text-[#7B9CFF]/50 transition-colors"
                        style={{ fontFamily: "var(--font-cinzel)" }}
                      >
                        {g.n}
                      </span>
                      <h3
                        className="text-white/60 font-bold tracking-wide group-hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-cinzel)" }}
                      >
                        {g.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {g.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────────

function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="relative py-32 overflow-hidden" style={{ background: BG }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B9CFF]/15 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(123,156,255,0.03) 0%, transparent 60%)" }}
      />
      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel text="Você está pronto?" color="#7B9CFF" />
          <h2
            className="font-black mb-4 leading-none"
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(2.5rem,7vw,5rem)",
              background: "linear-gradient(180deg, #ffffff, #7B9CFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ENTRE NA<br />FLORESTA
          </h2>
          <p className="text-gray-700 text-sm mb-10 leading-relaxed">
            Lista de acesso antecipado, transmissões do desenvolvimento e beta fechado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#footer"
              className="px-8 py-4 border border-[#7B9CFF]/40 text-[#7B9CFF] text-[10px] tracking-[0.35em] hover:bg-[#7B9CFF] hover:text-black transition-all"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              ENTRAR NA LISTA
            </Link>
            <Link href="/jogos/eclipse-a-ultima-fronteira"
              className="px-8 py-4 border border-white/8 text-white/25 text-[10px] tracking-[0.3em] hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              VER ECLIPSE →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function LastonGamePage() {
  return (
    <>
      <HeroSection />
      <SynopsisSection />
      <WorldSection />
      <CharactersSection />
      <GameplaySection />
      <CTASection />
      <Footer />
    </>
  );
}
