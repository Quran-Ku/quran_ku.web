import type { Metadata } from "next";
import { DoaDetailView } from "@/client/presentation/views/doa-detail";
import { createDoaModule } from "@/server/modules/doa/doa.module";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const { getDoaDetailUseCase } = createDoaModule();
    const doa = await getDoaDetailUseCase.execute(slug);

    return {
      title: `${doa.title}`,
      description: `Baca ${doa.title} lengkap dengan lafal Arab, transliterasi latin, terjemahan Indonesia, dan sumber riwayat (${doa.source}).`,
      openGraph: {
        title: `${doa.title} — Quran Ku`,
        description: `Baca ${doa.title} lengkap dengan lafal Arab, transliterasi latin, terjemahan Indonesia, dan sumber riwayat.`,
      },
    };
  } catch {
    return {
      title: "Doa Harian",
    };
  }
}

export default function DoaDetailPage({ params }: PageProps) {
  return <DoaDetailView slug={params.slug} />;
}
