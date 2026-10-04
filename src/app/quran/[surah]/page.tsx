import type { Metadata } from "next";
import { SurahDetailView } from "@/client/presentation/views/surah";
import { createQuranModule } from "@/server/modules/quran/quran.module";

interface PageProps {
  params: {
    surah: string;
  };
  searchParams?: {
    ayah?: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const surahNum = parseInt(params.surah, 10);
  if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
    return {
      title: "Surah Tidak Ditemukan",
    };
  }

  try {
    const { getSurahDetailUseCase } = createQuranModule();
    const surah = await getSurahDetailUseCase.execute(surahNum);

    return {
      title: `Surah ${surah.name} (${surah.arabicName})`,
      description: `Baca Surah ${surah.name} (${surah.arabicName}) lengkap dengan ${surah.numberOfAyahs} ayat, terjemahan Indonesia, dan audio murattal.`,
      openGraph: {
        title: `Surah ${surah.name} (${surah.arabicName}) — Quran Ku`,
        description: `Baca Surah ${surah.name} (${surah.arabicName}) lengkap dengan ${surah.numberOfAyahs} ayat, terjemahan Indonesia, dan audio murattal.`,
      },
    };
  } catch {
    return {
      title: `Surah ${surahNum}`,
    };
  }
}

export default function SurahDetailPage({ params, searchParams }: PageProps) {
  const surahNumber = parseInt(params.surah, 10);
  const initialAyah = searchParams?.ayah ? parseInt(searchParams.ayah, 10) : undefined;

  return <SurahDetailView surahNumber={surahNumber} initialAyah={initialAyah} />;
}
