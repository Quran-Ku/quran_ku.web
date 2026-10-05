import type { Metadata } from "next";
import { TermsView } from "@/client/presentation/views/terms";
import { APP_CONFIG } from "@/core/constants/app-config";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan Penggunaan",
  description:
    "Syarat dan Ketentuan resmi penggunaan aplikasi mobile Qur'an Ku dan layanan website terpercaya dari Excitech.",
  alternates: {
    canonical: `${APP_CONFIG.canonicalUrl}/terms-and-condition`,
  },
  openGraph: {
    title: `Syarat & Ketentuan Penggunaan — ${APP_CONFIG.appName}`,
    description:
      "Syarat dan Ketentuan resmi penggunaan aplikasi mobile Qur'an Ku dan layanan website terpercaya dari Excitech.",
    url: `${APP_CONFIG.canonicalUrl}/terms-and-condition`,
    type: "website",
  },
};

export default function TermsAndConditionPage() {
  return <TermsView />;
}
