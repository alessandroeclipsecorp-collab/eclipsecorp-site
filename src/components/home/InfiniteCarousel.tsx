"use client";

const CARDS = [
  { id: 1, label: "Eclipse — O Guardião",  bg: "linear-gradient(145deg,#1a0d00,#3a2000)", accent: "#C9A84C" },
  { id: 2, label: "Laston — Mundo Aberto", bg: "linear-gradient(145deg,#020810,#0b1830)", accent: "#7B9CFF" },
  { id: 3, label: "Eclipse — Kael Sombra", bg: "linear-gradient(145deg,#100800,#281500)", accent: "#C9A84C" },
  { id: 4, label: "Laston — MATER",        bg: "linear-gradient(145deg,#06020f,#130626)", accent: "#B97EFF" },
  { id: 5, label: "Universo EclipseCorp",  bg: "linear-gradient(145deg,#080808,#1c1408)", accent: "#C9A84C" },
];

const CARD_W   = 300;
const CARD_GAP = 24;
const TRACK_W  = CARDS.length * (CARD_W + CARD_GAP);

export default function InfiniteCarousel() {
  const doubled = [...CARDS, ...CARDS];

  return (
    <div
      className="w-full overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <style>{`
        @keyframes carousel-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${TRACK_W}px); }
        }
        .carousel-track {
          animation: carousel-scroll ${CARDS.length * 7}s linear infinite;
          will-change: transform;
        }
        .carousel-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="carousel-track flex" style={{ gap: CARD_GAP, width: TRACK_W * 2 }}>
        {doubled.map((card, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-2xl overflow-hidden relative"
            style={{ width: CARD_W, height: 200, background: card.bg }}
          >
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse at 30% 40%, ${card.accent}22 0%, transparent 65%)` }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(${card.accent}44 1px, transparent 1px), linear-gradient(90deg, ${card.accent}44 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="6" y="6" width="36" height="36" rx="4" stroke={card.accent} strokeWidth="1.5" />
                <circle cx="24" cy="20" r="7" stroke={card.accent} strokeWidth="1.5" />
                <path d="M10 42c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke={card.accent} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 p-4"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
            >
              <p
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "var(--font-cinzel)", color: card.accent, opacity: 0.9 }}
              >
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
