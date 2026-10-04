"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { getService } from "@/core/di/container";
import { TOKENS } from "@/core/di/tokens";
import { QuranSurah } from "@/client/domain/quran/entity/quran-surah";
import { Doa } from "@/client/domain/doa/entity/doa";
import { ReciterId } from "@/client/domain/quran/entity/reciter";

export interface LandingViewModel {
  surahs: readonly QuranSurah[];
  doas: readonly Doa[];
  loading: boolean;
  error: string | null;
  selectedReciter: ReciterId;
  playingAudio: {
    title: string;
    subtitle: string;
    url: string;
  } | null;
  onPlayAudio: (title: string, subtitle: string, url: string) => void;
  onCloseAudio: () => void;
  onChangeReciter: (reciter: ReciterId) => void;
}

export function useLanding(): LandingViewModel {
  const [surahs, setSurahs] = useState<readonly QuranSurah[]>([]);
  const [doas, setDoas] = useState<readonly Doa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<ReciterId>("alafasy");
  const [playingAudio, setPlayingAudio] = useState<{
    title: string;
    subtitle: string;
    url: string;
  } | null>(null);

  const getSurahListUseCase = useMemo(
    () => getService(TOKENS.GetQuranSurahListUseCase),
    []
  );

  const getDoaListUseCase = useMemo(
    () => getService(TOKENS.GetDoaListUseCase),
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function loadPreviewData() {
      try {
        setLoading(true);
        setError(null);

        const [surahList, doaList] = await Promise.all([
          getSurahListUseCase.execute(),
          getDoaListUseCase.execute(),
        ]);

        if (isMounted) {
          setSurahs(surahList.slice(0, 8));
          setDoas(doaList.slice(0, 6));
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load preview data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPreviewData();

    return () => {
      isMounted = false;
    };
  }, [getSurahListUseCase, getDoaListUseCase]);

  const onPlayAudio = useCallback((title: string, subtitle: string, url: string) => {
    setPlayingAudio({ title, subtitle, url });
  }, []);

  const onCloseAudio = useCallback(() => {
    setPlayingAudio(null);
  }, []);

  const onChangeReciter = useCallback((reciter: ReciterId) => {
    setSelectedReciter(reciter);
  }, []);

  return {
    surahs,
    doas,
    loading,
    error,
    selectedReciter,
    playingAudio,
    onPlayAudio,
    onCloseAudio,
    onChangeReciter,
  };
}
