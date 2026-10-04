import type { Metadata } from "next";
import { OpenGatewayView } from "@/client/presentation/views/open-gateway";

interface PageProps {
  searchParams?: {
    target?: string;
    ayah?: string;
  };
}

export const metadata: Metadata = {
  title: "Membuka Quran Ku",
  description: "Mengarahkan ke aplikasi Quran Ku di perangkat Anda...",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OpenPage({ searchParams }: PageProps) {
  const target = searchParams?.target || "/";
  const ayah = searchParams?.ayah;

  return <OpenGatewayView targetPath={target} ayah={ayah} />;
}
