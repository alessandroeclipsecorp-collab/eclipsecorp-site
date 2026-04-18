import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";

const inter   = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel  = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "EclipseCorp — O Futuro dos Games Começa em Belém",
  description: "Estúdio AAA do Brasil. Criadores de Eclipse: A Última Fronteira e Laston. Missão: ser o maior estúdio de games do mundo.",
  keywords: "EclipseCorp, games, Belém, Eclipse, Laston, estúdio AAA, Brasil",
  openGraph: {
    title: "EclipseCorp",
    description: "O maior estúdio de games do mundo nasce em Belém do Pará.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="min-h-screen overflow-x-hidden" style={{ background: "#050508" }}>
        <CustomCursor />
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
