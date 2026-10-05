"use client";

import React from "react";
import { Container } from "@/client/presentation/components/ui/Container";
import { useSurahDetail } from "./hooks/useSurahDetail";
import { SurahHeader } from "./components/SurahHeader";
import { AyahCard } from "./components/AyahCard";
import { ReciterSelector } from "./components/ReciterSelector";
import { AudioPlayerBar } from "@/client/presentation/components/audio/AudioPlayerBar";
import { AVAILABLE_RECITERS } from "@/client/domain/quran/entity/reciter";
import { SURAH_SEMANTIC_IDS } from "./constants/SemanticIdConstant";

export interface SurahDetailViewProps {
  surahNumber: number;
  initialAyah?: number;
}

export function SurahDetailView({ surahNumber, initialAyah }: SurahDetailViewProps) {
  const {
    surah,
    loading,
    error,
    selectedReciter,
    playingAyah,
    audioUrl,
    copiedAyah,
    onSelectReciter,
    onPlayAyah,
    onPlaySurahFull,
    onStopAudio,
    onCopyAyah,
    onNextAyah,
    onPrevAyah,
  } = useSurahDetail(surahNumber, initialAyah);

  const activeReciterInfo = AVAILABLE_RECITERS.find((r) => r.id === selectedReciter);

  return (
    <main className="min-h-screen bg-gray-50/40 dark:bg-dark-bg pt-28 pb-32 text-gray-900 dark:text-dark-textPrimary">
      <Container size="narrow">
        {error && (
          <div className="p-6 rounded-3xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-center max-w-md mx-auto mb-10">
            <h3 className="font-bold mb-2">Terjadi Kendala</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 dark:bg-dark-card rounded-3xl animate-pulse" />
            <div className="h-44 bg-gray-200 dark:bg-dark-card rounded-3xl animate-pulse" />
            <div className="h-44 bg-gray-200 dark:bg-dark-card rounded-3xl animate-pulse" />
          </div>
        ) : surah ? (
          <div>
            <SurahHeader
              surah={surah}
              initialAyah={initialAyah}
              onPlayFullAudio={onPlaySurahFull}
            />

            <ReciterSelector
              selectedReciter={selectedReciter}
              onSelectReciter={onSelectReciter}
            />

            {/* Ayahs Container with comfortable reading width */}
            <div id={SURAH_SEMANTIC_IDS.ayahList} className="space-y-6">
              {surah.ayahs?.map((ayah) => (
                <AyahCard
                  key={ayah.number}
                  ayah={ayah}
                  surahNumber={surah.number}
                  isPlaying={playingAyah === ayah.number}
                  isCopied={copiedAyah === ayah.number}
                  isTarget={initialAyah === ayah.number}
                  selectedReciter={selectedReciter}
                  onPlay={(reciterId) => onPlayAyah(ayah, reciterId)}
                  onStop={onStopAudio}
                  onCopy={() => onCopyAyah(ayah)}
                />
              ))}
            </div>
          </div>
        ) : null}

        {audioUrl && (
          <AudioPlayerBar
            title={
              playingAyah !== null
                ? `${surah?.name} - Ayat ${playingAyah}`
                : `${surah?.name} (Penuh)`
            }
            subtitle={activeReciterInfo?.name || "Mishari Rashid al-`Afasy"}
            audioUrl={audioUrl}
            onClose={onStopAudio}
            onNext={playingAyah !== null ? onNextAyah : undefined}
            onPrev={playingAyah !== null ? onPrevAyah : undefined}
            reciter={selectedReciter}
            onReciterChange={onSelectReciter}
          />
        )}
      </Container>
    </main>
  );
}
