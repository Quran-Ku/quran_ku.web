"use client";

import React, { useState } from "react";
import { Container } from "@/client/presentation/components/ui/Container";
import { useQuranList } from "./hooks/useQuranList";
import { SurahCard } from "./components/SurahCard";
import { SurahFilterBar } from "./components/SurahFilterBar";
import { Pagination } from "@/client/presentation/components/ui/Pagination";
import { AudioPlayerBar } from "@/client/presentation/components/audio/AudioPlayerBar";
import { useTranslator } from "@/core/translator";
import { BookOpen } from "lucide-react";

export function QuranView() {
  const { t } = useTranslator();
  const {
    surahs,
    paginatedSurahs,
    loading,
    error,
    searchQuery,
    selectedJuz,
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    onSearchChange,
    onJuzChange,
    onPageChange,
  } = useQuranList();

  const [playingAudio, setPlayingAudio] = useState<{
    title: string;
    subtitle: string;
    url: string;
  } | null>(null);

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-dark-bg pt-28 pb-24 text-gray-900 dark:text-dark-textPrimary">
      <Container size="wide">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light dark:bg-primary-1/20 text-primary-1 dark:text-primary-3 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Al-Quran Al-Karim</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t("features.quran.title")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-dark-textMuted leading-relaxed">
            {t("features.quran.desc")}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 max-w-4xl mx-auto">
          <SurahFilterBar
            searchQuery={searchQuery}
            selectedJuz={selectedJuz}
            onSearchChange={onSearchChange}
            onJuzChange={onJuzChange}
          />
        </div>

        {/* Content Section */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-center max-w-md mx-auto mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 dark:bg-dark-card rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : surahs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-dark-card rounded-3xl border border-gray-100 dark:border-dark-border max-w-md mx-auto space-y-3">
            <p className="text-base font-bold text-gray-700 dark:text-dark-textPrimary">
              Surah tidak ditemukan
            </p>
            <p className="text-xs text-gray-500 dark:text-dark-textMuted">
              Coba kata kunci lain atau hapus filter juz.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedSurahs.map((surah) => (
                <SurahCard
                  key={surah.number}
                  surah={surah}
                  onPlay={(s) => {
                    if (s.fullAudioUrl) {
                      setPlayingAudio({
                        title: s.name,
                        subtitle: `${s.translation} • ${s.numberOfAyahs} Ayat`,
                        url: s.fullAudioUrl,
                      });
                    }
                  }}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={onPageChange}
              itemLabel="Surah"
              className="mt-8"
            />
          </>
        )}

        {playingAudio && (
          <AudioPlayerBar
            title={playingAudio.title}
            subtitle={playingAudio.subtitle}
            audioUrl={playingAudio.url}
            onClose={() => setPlayingAudio(null)}
          />
        )}
      </Container>
    </main>
  );
}
