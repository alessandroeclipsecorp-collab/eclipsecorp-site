import type { Metadata } from "next";
import LastonGamePage from "@/components/games/LastonGamePage";

export const metadata: Metadata = {
  title: "Laston: O Último Bastião — EclipseCorp",
  description: "Survival horror na Amazônia profunda. Os últimos sobreviventes versus uma entidade primordial que reclama o que sempre foi dela.",
};

export default function Page() {
  return <LastonGamePage />;
}
