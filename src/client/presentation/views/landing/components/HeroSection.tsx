"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/client/presentation/components/ui/Container";
import { Button } from "@/client/presentation/components/ui/Button";
import { Badge } from "@/client/presentation/components/ui/Badge";
import { OpenInAppButton } from "@/client/presentation/components/deep-link/OpenInAppButton";
import { ROUTES } from "@/core/constants/routes";
import { useTranslator } from "@/core/translator";
import { LANDING_SEMANTIC_IDS } from "../constants/SemanticIdConstant";
import { BookOpen, Play, Bookmark, Sparkles, Share2 } from "lucide-react";

export interface HeroSectionProps {
  onPlaySample?: () => void;
}

export function HeroSection({ onPlaySample }: HeroSectionProps) {
  const { t } = useTranslator();

  return (
    <section
      id={LANDING_SEMANTIC_IDS.heroSection}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-primary-light/40 via-white to-white dark:from-dark-bg dark:via-dark-bg dark:to-dark-surface"
    >
      {/* Subtle Islamic geometric background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-1/5 dark:bg-primary-3/5 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-dark-surface border border-primary-1/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary-1 dark:text-primary-3" />
              <span className="text-xs font-semibold text-primary-1 dark:text-primary-3">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-dark-textPrimary tracking-tight leading-[1.15]">
              Al-Quran Lebih Dekat, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary-1 via-primary-2 to-primary-3 bg-clip-text text-transparent">
                Setiap Hari.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-dark-textMuted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <OpenInAppButton size="lg" variant="gradient" className="w-full sm:w-auto shadow-glow">
                {t("hero.cta.open")}
              </OpenInAppButton>

              <Link href={ROUTES.QURAN} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" fullWidth>
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t("hero.cta.explore")}
                </Button>
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 dark:text-dark-textMuted">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Tanpa Iklan Mengganggu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-1" />
                <span>Audio Murattal 6 Qari</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Mockup Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 rounded-3xl bg-brand-gradient opacity-20 blur-xl transition-all group-hover:opacity-30" />

              {/* Quran Reading Card Mockup */}
              <div className="relative bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
                {/* Header of the mock card */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary-light dark:bg-primary-1/20 flex items-center justify-center font-bold text-primary-1 dark:text-primary-3">
                      01
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-dark-textPrimary">
                        Al-Fatihah
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-dark-textMuted">
                        Makkiyah • 7 Ayat
                      </p>
                    </div>
                  </div>
                  <span className="font-arabic text-2xl text-primary-1 dark:text-primary-3 font-semibold">
                    الفاتحة
                  </span>
                </div>

                {/* Real Ayah 1 Content */}
                <div className="space-y-4 py-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="primary" size="sm">
                      Ayat 1
                    </Badge>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Bookmark className="w-4 h-4 hover:text-primary-1 cursor-pointer transition-colors" />
                      <Share2 className="w-4 h-4 hover:text-primary-1 cursor-pointer transition-colors" />
                    </div>
                  </div>

                  {/* Arabic Text (RTL) */}
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-2xl sm:text-3xl text-right text-gray-900 dark:text-dark-textPrimary leading-[2.2] tracking-wide select-none"
                  >
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </p>

                  {/* Indonesian Translation */}
                  <p className="text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed italic">
                    &ldquo;Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.&rdquo;
                  </p>
                </div>

                {/* Ayah Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onPlaySample}
                    className="gap-1.5 rounded-xl"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Putar Murattal</span>
                  </Button>

                  <OpenInAppButton
                    surahNumber={1}
                    ayahNumber={1}
                    size="sm"
                    variant="secondary"
                  >
                    Buka di App
                  </OpenInAppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
