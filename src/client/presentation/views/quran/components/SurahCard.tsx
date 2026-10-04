"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/client/presentation/components/ui/Card";
import { Badge } from "@/client/presentation/components/ui/Badge";
import { QuranSurah } from "@/client/domain/quran/entity/quran-surah";
import { ROUTES } from "@/core/constants/routes";
import { Volume2, ArrowUpRight } from "lucide-react";

export interface SurahCardProps {
  surah: QuranSurah;
  onPlay?: (surah: QuranSurah) => void;
}

export function SurahCard({ surah, onPlay }: SurahCardProps) {
  return (
    <Card
      hoverable
      className="p-5 flex flex-col justify-between group rounded-2xl relative overflow-hidden transition-all duration-200"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-primary-light dark:bg-primary-1/20 text-primary-1 dark:text-primary-3 font-bold text-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {String(surah.number).padStart(2, "0")}
            </div>
            <div>
              <Link
                href={ROUTES.SURAH(surah.number)}
                className="text-base font-bold text-gray-900 dark:text-dark-textPrimary group-hover:text-primary-1 dark:group-hover:text-primary-3 transition-colors flex items-center gap-1"
              >
                <span>{surah.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <p className="text-xs text-gray-500 dark:text-dark-textMuted">
                {surah.translation}
              </p>
            </div>
          </div>

          <span className="font-arabic text-2xl font-semibold text-primary-1 dark:text-primary-3">
            {surah.arabicName}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-dark-border text-xs text-gray-500 dark:text-dark-textMuted">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" size="sm">
            {surah.revelation}
          </Badge>
          <span>{surah.numberOfAyahs} Ayat</span>
        </div>

        {surah.fullAudioUrl && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onPlay) onPlay(surah);
            }}
            className="p-1.5 rounded-xl text-gray-400 hover:text-primary-1 hover:bg-primary-light dark:hover:bg-primary-1/20 transition-colors"
            title="Putar Audio Surah"
            aria-label={`Putar ${surah.name}`}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </Card>
  );
}
