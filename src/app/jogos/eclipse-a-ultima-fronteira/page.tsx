import type { Metadata } from "next";
import EclipseGamePage from "@/components/games/EclipseGamePage";

export const metadata: Metadata = {
  title: "Eclipse: A Última Fronteira — EclipseCorp",
  description: "RPG de ação em mundo aberto. Você é o último guardião — a linha entre a extinção e a sobrevivência da humanidade.",
};

export default function Page() {
  return <EclipseGamePage />;
}
