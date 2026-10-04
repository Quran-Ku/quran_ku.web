"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/client/presentation/components/ui/Container";
import { Button } from "@/client/presentation/components/ui/Button";
import { Card } from "@/client/presentation/components/ui/Card";
import { Badge } from "@/client/presentation/components/ui/Badge";
import { QuranSurah } from "@/client/domain/quran/entity/quran-surah";
import { ROUTES } from "@/core/constants/routes";
import { useTranslator } from "@/core/translator";
import { LANDING_SEMANTIC_IDS } from "../constants/SemanticIdConstant";
import { ArrowRight, Volume2 } from "lucide-react";

export interface QuranPreviewSectionProps {
  surahs: readonly QuranSurah[];
  loading?: boolean;
  onPlaySurah?: (surah: QuranSurah) => void;
}

export function QuranPreviewSection({
  surahs,
  loading = false,
  onPlaySurah,
}: QuranPreviewSectionProps) {
  const { t } = useTranslator();

  return (
    <section
      id={LANDING_SEMANTIC_IDS.quranPreviewSection}
      className="py-20 bg-gray-50/50 dark:bg-dark-surface/50 border-y border-gray-100 dark:border-dark-border"
    >
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-dark-textPrimary tracking-tight">
              {t("quran.preview.title")}
            </h2>
            <p className="text-sm text-gray-600 dark:text-dark-textMuted max-w-lg">
              {t("quran.preview.subtitle")}
            </p>
          </div>

          <Link href={ROUTES.QURAN}>
            <Button variant="outline" size="sm" className="gap-2">
              <span>{t("nav.quran")} Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-28 bg-gray-200 dark:bg-dark-card rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {surahs.map((surah) => (
              <Card
                key={surah.number}
                hoverable
                className="p-4 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-light dark:bg-primary-1/20 text-primary-1 dark:text-primary-3 font-bold text-xs flex items-center justify-center shrink-0">
                      {String(surah.number).padStart(2, "0")}
                    </div>
                    <div>
                      <Link
                        href={ROUTES.SURAH(surah.number)}
                        className="text-sm font-bold text-gray-900 dark:text-dark-textPrimary group-hover:text-primary-1 dark:group-hover:text-primary-3 transition-colors block"
                      >
                        {surah.name}
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-dark-textMuted">
                        {surah.translation}
                      </p>
                    </div>
                  </div>

                  <span className="font-arabic text-xl font-semibold text-primary-1 dark:text-primary-3">
                    {surah.arabicName}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-dark-border text-xs text-gray-500 dark:text-dark-textMuted">
                  <Badge variant="secondary" size="sm">
                    {surah.revelation} • {surah.numberOfAyahs} Ayat
                  </Badge>

                  {surah.fullAudioUrl && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (onPlaySurah) onPlaySurah(surah);
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-primary-1 hover:bg-primary-light dark:hover:bg-primary-1/20 transition-colors"
                      title="Putar Audio Surah"
                      aria-label={`Putar ${surah.name}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
