import type { Metadata } from "next";
import { PrivacyView } from "@/client/presentation/views/privacy";
import { APP_CONFIG } from "@/core/constants/app-config";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan Privasi resmi dan komitmen perlindungan data pengguna aplikasi Qur'an Ku dari Excitech.",
  alternates: {
    canonical: `${APP_CONFIG.canonicalUrl}/privacy-policy`,
  },
  openGraph: {
    title: `Kebijakan Privasi — ${APP_CONFIG.appName}`,
    description:
      "Kebijakan Privasi resmi dan komitmen perlindungan data pengguna aplikasi Qur'an Ku dari Excitech.",
    url: `${APP_CONFIG.canonicalUrl}/privacy-policy`,
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyView />;
}
