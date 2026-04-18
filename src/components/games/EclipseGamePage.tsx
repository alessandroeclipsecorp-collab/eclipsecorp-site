"use client";

import { useRef, CSSProperties } from "react";
import {
  motion, useInView, useScroll, useTransform,
  useMotionValue, useSpring, AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import StarfieldCanvas from "@/components/canvas/StarfieldCanvas";
import LetterReveal from "@/components/ui/LetterReveal";
import Card3D from "@/components/ui/Card3D";
import Footer from "@/components/Footer";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const characters = [
  {
    name: "Kael Sombra",
    title: "O Último Guardião",
    faction: "Ordem dos Guardiões",
    ability: "Absorção do Void",
    desc: "Único ser capaz de absorver e redirecionar a energia do eclipse. Kael carrega o peso de cada alma que falhou em proteger.",
    symbol: "◉",
    accentColor: "#C9A84C",
    glowColor: "rgba(201,168,76,0.3)",
    number: "01",
  },
  {
    name: "Lyra Vox",
    title: "Hacker do Eclipse",
    faction: "Rede da Resistência",
    ability: "Interface com IA Hostil",
    desc: "Hackeou sistemas de IA corrompidos pelo evento. Seus implantes neurais a deixam a um passo de se tornar o que combate.",
    symbol: "⬡",
    accentColor: "#7B9CFF",
    glowColor: "rgba(123,156,255,0.3)",
    number: "02",
  },
  {
    name: "Dren",
    title: "Entidade do Eclipse",
    faction: "O Eclipse",
    ability: "Controle da Matéria Escura",
    desc: "Não é humano. Nunca foi. Dren é a personificação do eclipse — a força que apagou o sol e decidiu que gostou do escuro.",
    symbol: "✦",
    accentColor: "#FF6B6B",
    glowColor: "rgba(255,107,107,0.3)",
    number: "03",
  },
  {
    name: "Dr. Marcos Cerrado",
    title: "Cientista dos Guardiões",
    faction: "Ordem dos Guardiões",
    ability: "Engenharia Espectral",
    desc: "O homem que descobriu como weaponizar a energia espectral. Mora na linha tênue entre gênio e loucura.",
    symbol: "◈",
    accentColor: "#4DFFAA",
    glowColor: "rgba(77,255,170,0.3)",
    number: "04",
  },
];

const biomes = [
  {
    n: "01", name: "Amazônia Devastada", subtitle: "A Floresta Que Grita",
    desc: "Vegetação mutante absorveu energia espectral. Fauna transformada. Cristais negros brotam do chão. A floresta pulsa como um coração vivo — e ela sente você.",
    hazard: "Fauna Espectral · Matéria Orgânica Hostil",
    color: "#2A4A1A", glow: "rgba(60,120,30,0.2)",
  },
  {
    n: "02", name: "Ruínas Costeiras", subtitle: "Onde o Mar Virou Escuridão",
    desc: "Cidades costeiras afundadas em matéria escura líquida. Arranha-céus emersos como ilhas. Ruas cobertas de cristais que cantam quando o vento passa.",
    hazard: "Matéria Escura Líquida · Estruturas Instáveis",
    color: "#0A1A2A", glow: "rgba(20,60,120,0.2)",
  },
  {
    n: "03", name: "Planalto Morto", subtitle: "O Fim do Horizonte",
    desc: "Deserto de cinzas onde a gravidade flutua entre 0.3G e 2G sem aviso. Campos de batalha abandonados com armamentos espectrais ainda ativos.",
    hazard: "Gravidade Variável · Armamentos Autônomos",
    color: "#2A1A0A", glow: "rgba(120,60,20,0.2)",
  },
  {
    n: "04", name: "Void Orbital", subtitle: "Entre as Estrelas Mortas",
    desc: "Detritos de satélites e estações espaciais destruídas em órbita baixa. Gravidade zero. Frio absoluto. E algo vivo no vácuo que não deveria existir.",
    hazard: "Vácuo Espacial · Gravidade Zero · Entidades Orbitais",
    color: "#0A0A2A", glow: "rgba(30,30,120,0.25)",
  },
  {
    n: "05", name: "Núcleo do Eclipse", subtitle: "O Coração da Escuridão",
    desc: "Epicentro do evento. As leis da física são sugestões. Tempo corre em múltiplas direções. Apenas os Guardiões mais fortes chegam aqui — e nem todos voltam.",
    hazard: "Realidade Fraturada · Leis Físicas Quebradas",
    color: "#1A0A2A", glow: "rgba(80,20,120,0.25)",
  },
];

const gameplay = [
  {
    n: "01", title: "Combate Espectral",
    body: "Sistema de combate fluido combinando poderes espectrais únicos da sua classe com armas físicas modificadas. Combos ilimitados, parry de matéria escura e execuções cinematográficas.",
    tag: "COMBAT",
  },
  {
    n: "02", title: "Exploração em 5 Biomas",
    body: "200+ locações distintas espalhadas por biomas radicalmente diferentes. Cada ambiente tem mecânicas únicas, fauna exclusiva e lore escondido em cada canto.",
    tag: "EXPLORATION",
  },
  {
    n: "03", title: "Narrativa com 47 Decisões",
    body: "Cada escolha altera o mundo de forma permanente. 47 decisões críticas ao longo da jornada de 40+ horas moldam quem sobrevive, quem vira inimigo e como o eclipse termina.",
    tag: "STORY",
  },
  {
    n: "04", title: "Classes de Guardiões",
    body: "4 classes jogáveis com poderes completamente distintos. Espectral, Tecnomante, Vinculado e Vazio — cada um com 3 árvores de habilidade e builds emergentes.",
    tag: "RPG",
  },
  {
    n: "05", title: "Co-op para 4 Jogadores",
    body: "Missões cooperativas designadas com quebra-cabeças que exigem classes específicas. Progressão cruzada entre single e co-op. Raids semanais com loot exclusivo.",
    tag: "MULTIPLAYER",
  },
  {
    n: "06", title: "Mundo Persistente",
    body: "Suas ações deixam marcas permanentes. Cidades que você salva prosperam. Guardiões que você perde ficam mortos. O mundo lembra de tudo.",
    tag: "WORLD",
  },
];

// ─── SECTION HELPERS ───────────────────────────────────────────────────────────

function SectionLabel({ text, color = "#C9A84C" }: { text: string; color?: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-8 h-px" style={{ background: color }} />
      <span
        className="text-[10px] tracking-[0.5em] uppercase"
        style={{ fontFamily: "var(--font-cinzel)", color, opacity: 0.6 }}
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

// ─── HERO ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <StarfieldCanvas />
      </motion.div>

      {/* Corona glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "25%", left: "50%", transform: "translate(-50%, -50%)",
            width: 500, height: 500,
            background: "radial-gradient(ellipse, rgba(201,168,76,0.14) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Eclipse disk */}
        <div
          className="absolute rounded-full border border-[#C9A84C]/10"
          style={{
            width: 260, height: 260,
            top: "22%", left: "50%", transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse at 38% 36%, #1a0d00, #050508)",
            boxShadow: "0 0 80px rgba(201,168,76,0.18), 0 0 200px rgba(201,168,76,0.06)",
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none z-10" />

      <motion.div style={{ y: textY, opacity: fadeOut }} className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
          <span
            className="text-[10px] tracking-[0.5em] uppercase text-[#C9A84C]/50"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            EclipseCorp · RPG de Ação
          </span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
        </motion.div>

        <LetterReveal
          text="ECLIPSE"
          as="h1"
          delay={0.6}
          stagger={0.07}
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: "clamp(5rem,16vw,11rem)",
            lineHeight: 1,
            letterSpacing: "0.08em",
            background: "linear-gradient(180deg, #FFFFFF 0%, #F0D080 30%, #C9A84C 65%, #6B4A0A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 40px rgba(201,168,76,0.5))",
          } as CSSProperties}
          className="block"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="tracking-[0.4em] text-[#C9A84C]/50 mt-3 mb-8"
          style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(0.8rem,2vw,1.1rem)" }}
        >
          A ÚLTIMA FRONTEIRA
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="text-white/30 text-sm max-w-lg mx-auto leading-relaxed mb-10"
        >
          Quando o sol parou por 72 horas, o mundo que restou não era o mesmo.
          Você é o último Guardião. A linha entre extinção e sobrevivência.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a href="#synopsis"
            className="group px-8 py-3.5 bg-[#C9A84C] text-black text-[10px] tracking-[0.35em] font-bold hover:bg-[#F0D080] transition-colors"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            EXPLORAR O UNIVERSO
          </a>
          <a href="#gameplay"
            className="px-8 py-3.5 border border-[#C9A84C]/30 text-[#C9A84C]/70 text-[10px] tracking-[0.35em] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            VER GAMEPLAY
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-px h-14 overflow-hidden relative mx-auto">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
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
    "Em 2089, o sol desapareceu.",
    "Não por 24 horas. Por 72.",
    "Quando a luz voltou, o mundo não era o mesmo.",
    "Cidades engolidas. Física reescrita. Espécies transformadas.",
    "O eclipse não foi natural.",
    "Foi um convite.",
  ];

  return (
    <section id="synopsis" ref={ref} className="relative py-36 overflow-hidden" style={{ background: "#050508" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

      {/* Animated side line */}
      <div className="absolute left-16 top-0 bottom-0 w-px bg-white/5 hidden lg:block">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-[#C9A84C]/40 to-transparent"
          style={{ height: "40%" }}
          animate={{ y: ["0%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel text="Sinopse" />
        </motion.div>

        <div className="space-y-6 mb-20">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={`font-black leading-none ${i === lines.length - 1 ? "text-[#C9A84C]" : "text-white/80"}`}
              style={{
                fontFamily: "var(--font-cinzel)",
                fontSize: `clamp(${1.6 - i * 0.05}rem, ${3.5 - i * 0.2}vw, ${2.8 - i * 0.1}rem)`,
                opacity: i === lines.length - 1 ? undefined : 1 - i * 0.08,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Expanding separator */}
        <motion.div className="h-px bg-gradient-to-r from-[#C9A84C]/60 via-[#F0D080] to-[#C9A84C]/60" style={{ width: lineW }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <p className="text-gray-500 leading-relaxed text-sm">
              Os Guardiões são os únicos seres que absorveram a energia do eclipse e sobreviveram —
              transformados, poderosos e condenados a carregar o peso de um mundo que não pediu para existir assim.
            </p>
          </div>
          <div>
            <p className="text-gray-500 leading-relaxed text-sm">
              Você é o mais poderoso deles. E o mais sozinho. Porque enquanto os outros Guardiões
              foram corrompidos pelo evento, você ainda lembra quem era antes. Por quanto tempo isso vai durar?
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
    <section id="world" ref={ref} className="relative py-32 overflow-hidden" style={{ background: "#050508" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/15 to-transparent" />

      {/* Large BG word */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-black select-none pointer-events-none leading-none"
        style={{ fontFamily: "var(--font-cinzel)", color: "rgba(201,168,76,0.018)" }}
      >
        MUNDO
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
              background: "linear-gradient(135deg, #ffffff 40%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            5 BIOMAS.
            <br />
            <span className="text-white/20">1 SOBREVIVENTE.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {biomes.map((b, i) => (
            <motion.div
              key={b.n}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="group relative p-6 border border-white/5 overflow-hidden"
              style={{ background: "#08080E", cursor: "default" }}
            >
              {/* Color wash on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 30%, ${b.glow}, transparent 70%)` }}
              />
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${b.color}, transparent)` }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="text-[10px] tracking-[0.4em] text-white/20"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    BIOMA {b.n}
                  </span>
                  <div className="w-6 h-6 border border-white/8 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: b.color }} />
                  </div>
                </div>

                <h3
                  className="font-black text-white mb-1 tracking-wide group-hover:text-[#C9A84C] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(1rem,2vw,1.2rem)" }}
                >
                  {b.name}
                </h3>
                <p
                  className="text-[10px] tracking-[0.3em] mb-4 opacity-50"
                  style={{ fontFamily: "var(--font-cinzel)", color: "#C9A84C" }}
                >
                  {b.subtitle}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed mb-5 group-hover:text-gray-400 transition-colors duration-300">
                  {b.desc}
                </p>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] tracking-widest text-red-400/40 group-hover:text-red-400/70 transition-colors">
                    ⚠ {b.hazard}
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
          className="relative h-full p-7 border border-white/8 overflow-hidden"
          style={{ background: "linear-gradient(145deg, #0D0D14, #080810)" }}
        >
          {/* Background symbol */}
          <div
            className="absolute bottom-4 right-4 text-[6rem] font-black select-none pointer-events-none leading-none opacity-[0.04]"
            style={{ fontFamily: "var(--font-cinzel)", color: char.accentColor }}
          >
            {char.symbol}
          </div>

          {/* Card number + faction */}
          <div className="flex items-start justify-between mb-6">
            <span
              className="text-[10px] tracking-[0.4em] opacity-30"
              style={{ fontFamily: "var(--font-cinzel)", color: char.accentColor }}
            >
              {char.number}
            </span>
            <div
              className="px-2.5 py-1 border text-[9px] tracking-[0.3em] uppercase"
              style={{
                fontFamily: "var(--font-cinzel)",
                borderColor: `${char.accentColor}30`,
                color: `${char.accentColor}80`,
              }}
            >
              {char.faction}
            </div>
          </div>

          {/* Symbol */}
          <div className="mb-5 relative">
            <motion.span
              className="block text-5xl"
              style={{ color: char.accentColor, filter: `drop-shadow(0 0 20px ${char.accentColor})` }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
            >
              {char.symbol}
            </motion.span>
          </div>

          {/* Name + title */}
          <h3
            className="font-black leading-none mb-1"
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
              color: char.accentColor,
              filter: `drop-shadow(0 0 12px ${char.accentColor}50)`,
            }}
          >
            {char.name}
          </h3>
          <p
            className="text-[11px] tracking-[0.3em] mb-5 opacity-50"
            style={{ fontFamily: "var(--font-cinzel)", color: char.accentColor }}
          >
            {char.title}
          </p>

          {/* Description */}
          <p className="text-gray-500 text-xs leading-relaxed mb-6">
            {char.desc}
          </p>

          {/* Ability */}
          <div
            className="flex items-center gap-2 pt-4 border-t"
            style={{ borderColor: `${char.accentColor}20` }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: char.accentColor, boxShadow: `0 0 8px ${char.accentColor}` }}
            />
            <span className="text-[10px] tracking-widest text-white/30" style={{ fontFamily: "var(--font-cinzel)" }}>
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
    <section id="characters" className="relative py-32 overflow-hidden" style={{ background: "#050508" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.03) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

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
              background: "linear-gradient(135deg, #ffffff 30%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            OS GUARDIÕES
          </h2>
          <p className="text-white/20 text-sm mt-3 max-w-md" style={{ fontFamily: "var(--font-cinzel)", letterSpacing: "0.1em" }}>
            Passe o cursor para interagir
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {characters.map((char, i) => (
            <CharacterCard key={char.name} char={char} index={i} />
          ))}
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
    <section id="gameplay" className="relative py-32 overflow-hidden" style={{ background: "#050508" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Sticky header */}
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
                  background: "linear-gradient(135deg, #ffffff, #C9A84C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                COMO<br />JOGAR
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Eclipse não é um jogo — é uma experiência que define o que RPGs de ação
                podem ser quando feitos sem concessões.
              </p>
            </motion.div>
          </div>

          {/* Feature list */}
          <div className="flex-1 space-y-0">
            {gameplay.map((g, i) => (
              <motion.div
                key={g.n}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="group border-b border-white/5 py-7 hover:border-[#C9A84C]/20 transition-colors duration-300"
              >
                <div className="flex gap-6 items-start">
                  <div className="shrink-0 mt-1">
                    <span
                      className="text-[10px] tracking-[0.3em] text-[#C9A84C]/20 group-hover:text-[#C9A84C]/60 transition-colors"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      {g.tag}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-[#C9A84C]/20 text-xs group-hover:text-[#C9A84C]/50 transition-colors"
                        style={{ fontFamily: "var(--font-cinzel)" }}
                      >
                        {g.n}
                      </span>
                      <h3
                        className="text-white/70 font-bold tracking-wide group-hover:text-white transition-colors"
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
    <section className="relative py-32 overflow-hidden" style={{ background: "#050508" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)" }}
      />
      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel text="Junte-se a Nós" color="#C9A84C" />
          <h2
            className="font-black mb-4 leading-none"
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "clamp(2.5rem,7vw,5rem)",
              background: "linear-gradient(180deg, #ffffff, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SEJA O PRIMEIRO<br />A JOGAR
          </h2>
          <p className="text-gray-600 text-sm mb-10 leading-relaxed">
            Acesso antecipado, beta fechado e conteúdo exclusivo dos bastidores.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#footer"
              className="px-8 py-4 bg-[#C9A84C] text-black text-[10px] tracking-[0.35em] font-bold hover:bg-[#F0D080] transition-colors"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              LISTA DE ESPERA
            </Link>
            <Link href="/jogos/laston"
              className="px-8 py-4 border border-white/10 text-white/30 text-[10px] tracking-[0.3em] hover:border-[#7B9CFF]/40 hover:text-[#7B9CFF] transition-all"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              VER LASTON →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function EclipseGamePage() {
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
