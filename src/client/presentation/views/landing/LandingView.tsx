"use client";

import React from "react";
import { useLanding } from "./hooks/useLanding";
import { HeroSection } from "./components/HeroSection";
import { FeatureCardsSection } from "./components/FeatureCardsSection";
import { AppSlidesSection } from "./components/AppSlidesSection";
import { QuranPreviewSection } from "./components/QuranPreviewSection";
import { DoaPreviewSection } from "./components/DoaPreviewSection";
import { MobileAppCtaSection } from "./components/MobileAppCtaSection";
import { AudioPlayerBar } from "@/client/presentation/components/audio/AudioPlayerBar";

export function LandingView() {
  const {
    surahs,
    doas,
    loading,
    playingAudio,
    onPlayAudio,
    onCloseAudio,
    selectedReciter,
    onChangeReciter,
  } = useLanding();

  const handlePlayHeroSample = () => {
    onPlayAudio(
      "Al-Fatihah - Ayat 1",
      "Mishari Rashid al-`Afasy",
      "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3"
    );
  };

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-textPrimary">
      <HeroSection onPlaySample={handlePlayHeroSample} />
      <FeatureCardsSection />
      <AppSlidesSection />
      <QuranPreviewSection
        surahs={surahs}
        loading={loading}
        onPlaySurah={(surah) => {
          if (surah.fullAudioUrl) {
            onPlayAudio(surah.name, "Audio Penuh Surah", surah.fullAudioUrl);
          }
        }}
      />
      <DoaPreviewSection doas={doas} loading={loading} />
      <MobileAppCtaSection />

      {playingAudio && (
        <AudioPlayerBar
          title={playingAudio.title}
          subtitle={playingAudio.subtitle}
          audioUrl={playingAudio.url}
          onClose={onCloseAudio}
          reciter={selectedReciter}
          onReciterChange={onChangeReciter}
        />
      )}
    </main>
  );
}
