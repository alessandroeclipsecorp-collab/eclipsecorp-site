"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Globe, Share2, Video, Radio } from "lucide-react";

const social = [
  { icon: Globe, label: "Instagram", href: "#" },
  { icon: Share2, label: "Twitter / X", href: "#" },
  { icon: Video, label: "YouTube", href: "#" },
  { icon: Radio, label: "Twitch", href: "#" },
];

const links = {
  Empresa: ["Sobre", "Missão", "Time", "Carreiras"],
  Jogo: ["Eclipse: A Última Fronteira", "Lore", "Personagens", "Universo"],
  Comunidade: ["Discord", "Newsletter", "Imprensa", "Parceiros"],
};

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden">
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />

      {/* BG */}
      <div className="bg-[#050508]">
        {/* Newsletter band */}
        <div className="border-b border-white/5 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3
                  className="text-2xl md:text-3xl font-black text-white mb-2"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  SEJA O PRIMEIRO A SABER
                </h3>
                <p className="text-gray-500 text-sm">
                  Notícias exclusivas, betas antecipados e conteúdo dos bastidores.
                </p>
              </div>
              <div className="flex w-full md:w-auto gap-0">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 md:w-72 px-4 py-3 bg-[#08080E] border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                />
                <button
                  className="px-6 py-3 bg-[#C9A84C] text-black text-sm font-bold tracking-widest hover:bg-[#F0D080] transition-colors shrink-0"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  INSCREVER
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border border-[#C9A84C]/40 flex items-center justify-center">
                    <span
                      className="text-[#C9A84C] font-bold"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      EC
                    </span>
                  </div>
                </div>
                <span
                  className="text-xl font-bold tracking-widest text-[#C9A84C]"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  ECLIPSECORP
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
                Estúdio de games AAA nascido em Belém do Pará. Criadores de Eclipse: A Última
                Fronteira. Missão: ser o maior do mundo.
              </p>

              {/* Contact */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <Mail size={14} className="text-[#C9A84C]/60" />
                  <a href="mailto:contato@eclipsecorp.gg" className="hover:text-[#C9A84C] transition-colors">
                    contato@eclipsecorp.gg
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <MapPin size={14} className="text-[#C9A84C]/60" />
                  <span>Belém, Pará — Brasil</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3">
                {social.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center border border-white/10 text-gray-500 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-300"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4
                  className="text-white font-bold text-sm tracking-widest mb-6"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {category.toUpperCase()}
                </h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-500 text-sm hover:text-[#C9A84C] transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs tracking-wide">
              © 2025 EclipseCorp. Todos os direitos reservados. Belém, Brasil.
            </p>
            <div className="flex gap-6">
              {["Privacidade", "Termos", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-600 text-xs hover:text-[#C9A84C]/60 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
