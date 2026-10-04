import type { Metadata } from "next";
import { DoaView } from "@/client/presentation/views/doa";

export const metadata: Metadata = {
  title: "Kumpulan Doa Harian Shahih",
  description:
    "Kumpulan doa-doa harian shahih bersumber dari Al-Quran dan Hadits Rasulullah ﷺ lengkap dengan teks Arab, latin, dan artinya.",
};

export default function DoaPage() {
  return <DoaView />;
}
