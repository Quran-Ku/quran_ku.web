import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/client/presentation/components/layout/Navbar";
import { Footer } from "@/client/presentation/components/layout/Footer";
import { TranslatorProvider } from "@/core/translator";
import { APP_CONFIG } from "@/core/constants/app-config";

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.canonicalUrl),
  title: {
    default: `${APP_CONFIG.appName} — Al-Quran Digital & Doa Harian`,
    template: `%s — ${APP_CONFIG.appName}`,
  },
  description: APP_CONFIG.description,
  keywords: [...APP_CONFIG.keywords],
  authors: [{ name: APP_CONFIG.author, url: APP_CONFIG.domain }],
  creator: APP_CONFIG.author,
  publisher: APP_CONFIG.author,
  applicationName: APP_CONFIG.appName,
  manifest: "/manifest.json",
  icons: {
    icon: "/logo/app_logo.png",
    shortcut: "/logo/app_logo.png",
    apple: "/logo/app_logo.png",
  },
  openGraph: {
    title: `${APP_CONFIG.appName} — Al-Quran Digital & Doa Harian`,
    description: APP_CONFIG.description,
    url: APP_CONFIG.canonicalUrl,
    siteName: APP_CONFIG.appName,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo/app_logo.png",
        width: 512,
        height: 512,
        alt: `${APP_CONFIG.appName} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.appName} — Al-Quran Digital & Doa Harian`,
    description: APP_CONFIG.description,
    creator: APP_CONFIG.social.twitter,
    images: ["/logo/app_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: APP_CONFIG.appName,
    operatingSystem: "Android",
    applicationCategory: "LifestyleApplication",
    description: APP_CONFIG.description,
    url: APP_CONFIG.canonicalUrl,
    downloadUrl: APP_CONFIG.playStoreUrl,
    author: {
      "@type": "Organization",
      name: APP_CONFIG.author,
    },
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-textPrimary antialiased transition-colors selection:bg-primary-1/20 selection:text-primary-1">
        <TranslatorProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </TranslatorProvider>
      </body>
    </html>
  );
}
