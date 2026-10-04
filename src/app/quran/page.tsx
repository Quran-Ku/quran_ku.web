import type { Metadata } from "next";
import { QuranView } from "@/client/presentation/views/quran";

export const metadata: Metadata = {
  title: "114 Surah Al-Quran",
  description:
    "Baca 114 Surah Al-Quran lengkap dengan teks Arab, terjemahan resmi Kementerian Agama RI, dan audio murattal.",
};

export default function QuranPage() {
  return <QuranView />;
}
