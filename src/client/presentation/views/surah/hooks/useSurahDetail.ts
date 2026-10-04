"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { getService } from "@/core/di/container";
import { TOKENS } from "@/core/di/tokens";
import { QuranSurah } from "@/client/domain/quran/entity/quran-surah";
import { QuranAyah } from "@/client/domain/quran/entity/quran-ayah";
import { ReciterId } from "@/client/domain/quran/entity/reciter";

export interface SurahDetailViewModel {
  surah: QuranSurah | null;
  loading: boolean;
  error: string | null;
  selectedReciter: ReciterId;
  playingAyah: number | null;
  audioUrl: string | undefined;
  copiedAyah: number | null;
  targetAyah: number | undefined;
  onSelectReciter: (reciter: ReciterId) => void;
  onPlayAyah: (ayah: QuranAyah, reciterId?: ReciterId) => void;
  onPlaySurahFull: () => void;
  onStopAudio: () => void;
  onCopyAyah: (ayah: QuranAyah) => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
}

export function useSurahDetail(
  surahNumber: number,
  initialAyah?: number
): SurahDetailViewModel {
  const [surah, setSurah] = useState<QuranSurah | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<ReciterId>("alafasy");
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  const getSurahDetailUseCase = useMemo(
    () => getService(TOKENS.GetQuranSurahDetailUseCase),
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function loadSurah() {
      try {
        setLoading(true);
        setError(null);
        const data = await getSurahDetailUseCase.execute(surahNumber);
        if (isMounted) {
          setSurah(data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load Surah detail");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (surahNumber > 0 && surahNumber <= 114) {
      loadSurah();
    } else {
      setError("Nomor surah tidak valid (1-114)");
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [getSurahDetailUseCase, surahNumber]);

  // Scroll to target ayah if requested
  useEffect(() => {
    if (surah && initialAyah && !loading) {
      const el = document.getElementById(`ayah-${initialAyah}`);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    }
  }, [surah, initialAyah, loading]);

  const onSelectReciter = useCallback(
    (reciter: ReciterId) => {
      setSelectedReciter(reciter);
      if (playingAyah && surah?.ayahs) {
        const currentAyah = surah.ayahs.find((a) => a.number === playingAyah);
        if (currentAyah) {
          const newUrl = currentAyah.audio[reciter] || currentAyah.audio.alafasy;
          if (newUrl) {
            setAudioUrl(newUrl);
          }
        }
      }
    },
    [playingAyah, surah]
  );

  const onPlayAyah = useCallback(
    (ayah: QuranAyah, reciterId?: ReciterId) => {
      const activeReciter = reciterId || selectedReciter;
      if (reciterId && reciterId !== selectedReciter) {
        setSelectedReciter(reciterId);
      }

      if (playingAyah === ayah.number && (!reciterId || reciterId === selectedReciter)) {
        setPlayingAyah(null);
        setAudioUrl(undefined);
      } else {
        setPlayingAyah(ayah.number);
        const url =
          ayah.audio[activeReciter] ||
          ayah.audio.alafasy ||
          ayah.audio.ahmedajamy ||
          Object.values(ayah.audio)[0];
        setAudioUrl(url);
      }
    },
    [playingAyah, selectedReciter]
  );

  const onPlaySurahFull = useCallback(() => {
    if (surah?.fullAudioUrl) {
      setPlayingAyah(null);
      setAudioUrl(surah.fullAudioUrl);
    }
  }, [surah]);

  const onStopAudio = useCallback(() => {
    setPlayingAyah(null);
    setAudioUrl(undefined);
  }, []);

  const onCopyAyah = useCallback((ayah: QuranAyah) => {
    const text = `${ayah.arabic}\n\n"${ayah.translation}"\n(QS. ${ayah.surahName}: ${ayah.number})`;
    navigator.clipboard.writeText(text);
    setCopiedAyah(ayah.number);
    setTimeout(() => setCopiedAyah(null), 2000);
  }, []);

  const onNextAyah = useCallback(() => {
    if (!surah?.ayahs || playingAyah === null) return;
    const currentIndex = surah.ayahs.findIndex((a) => a.number === playingAyah);
    if (currentIndex >= 0 && currentIndex < surah.ayahs.length - 1) {
      const next = surah.ayahs[currentIndex + 1];
      if (next) {
        onPlayAyah(next, selectedReciter);
      }
    }
  }, [surah, playingAyah, selectedReciter, onPlayAyah]);

  const onPrevAyah = useCallback(() => {
    if (!surah?.ayahs || playingAyah === null) return;
    const currentIndex = surah.ayahs.findIndex((a) => a.number === playingAyah);
    if (currentIndex > 0) {
      const prev = surah.ayahs[currentIndex - 1];
      if (prev) {
        onPlayAyah(prev, selectedReciter);
      }
    }
  }, [surah, playingAyah, selectedReciter, onPlayAyah]);

  return {
    surah,
    loading,
    error,
    selectedReciter,
    playingAyah,
    audioUrl,
    copiedAyah,
    targetAyah: initialAyah,
    onSelectReciter,
    onPlayAyah,
    onPlaySurahFull,
    onStopAudio,
    onCopyAyah,
    onNextAyah,
    onPrevAyah,
  };
}
