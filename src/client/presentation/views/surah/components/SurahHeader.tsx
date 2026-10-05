"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/client/presentation/components/ui/Badge";
import { Button } from "@/client/presentation/components/ui/Button";
import { OpenInAppButton } from "@/client/presentation/components/deep-link/OpenInAppButton";
import { QuranSurah } from "@/client/domain/quran/entity/quran-surah";
import { ROUTES } from "@/core/constants/routes";
import { useTranslator } from "@/core/translator";
import { ArrowLeft, Volume2, Share2 } from "lucide-react";

export interface SurahHeaderProps {
  surah: QuranSurah;
  initialAyah?: number;
  onPlayFullAudio?: () => void;
}

export function SurahHeader({ surah, initialAyah, onPlayFullAudio }: SurahHeaderProps) {
  const { t } = useTranslator();

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: `Surah ${surah.name} — Quran Ku`,
        text: `Baca Surah ${surah.name} (${surah.arabicName}) lengkap dengan terjemahan dan audio di Quran Ku.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Tautan surah berhasil disalin!");
    }
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-primary-1 via-primary-2 to-primary-3 p-6 sm:p-10 text-white shadow-glow overflow-hidden mb-10">
      {/* Decorative background glow & shapes */}
      <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6">
        <Link
          href={ROUTES.QURAN}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("nav.quran")}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Bagikan Surah"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <OpenInAppButton
            surahNumber={surah.number}
            ayahNumber={initialAyah}
            size="sm"
            variant="secondary"
            className="bg-white text-primary-1 hover:bg-gray-100 font-bold"
          >
            Buka di App
          </OpenInAppButton>
        </div>
      </div>

      <div className="text-center space-y-4 py-4 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {surah.name}
        </h1>

        <p className="font-arabic text-3xl sm:text-4xl font-bold text-white/95">
          {surah.arabicName}
        </p>

        <p className="text-sm sm:text-base text-white/90">
          {surah.translation}
        </p>

        <div className="flex items-center justify-center gap-2 pt-2">
          <Badge variant="secondary" size="md" className="bg-white/20 text-white">
            {surah.revelation}
          </Badge>
          <Badge variant="secondary" size="md" className="bg-white/20 text-white">
            {surah.numberOfAyahs} Ayat
          </Badge>
          <Badge variant="secondary" size="md" className="bg-white/20 text-white">
            Surah ke-{surah.number}
          </Badge>
        </div>

        {surah.fullAudioUrl && (
          <div className="pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onPlayFullAudio}
              className="border-white/40 text-white hover:bg-white/15 gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Putar Audio Penuh Surah</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
