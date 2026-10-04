"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { getService } from "@/core/di/container";
import { TOKENS } from "@/core/di/tokens";
import { QuranSurah } from "@/client/domain/quran/entity/quran-surah";

export const DEFAULT_QURAN_PAGE_SIZE = 12;

export interface QuranListViewModel {
  surahs: readonly QuranSurah[];
  paginatedSurahs: readonly QuranSurah[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedJuz: number | undefined;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onSearchChange: (q: string) => void;
  onJuzChange: (juz: number | undefined) => void;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

export function useQuranList(pageSize: number = DEFAULT_QURAN_PAGE_SIZE): QuranListViewModel {
  const [surahs, setSurahs] = useState<readonly QuranSurah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedJuz, setSelectedJuz] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getSurahListUseCase = useMemo(
    () => getService(TOKENS.GetQuranSurahListUseCase),
    []
  );

  const fetchSurahs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await getSurahListUseCase.execute({
        search: searchQuery || undefined,
        juz: selectedJuz,
      });
      setSurahs(list);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load Surah list");
    } finally {
      setLoading(false);
    }
  }, [getSurahListUseCase, searchQuery, selectedJuz]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSurahs();
    }, 200);

    return () => clearTimeout(timer);
  }, [fetchSurahs]);

  const onSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const onJuzChange = (juz: number | undefined) => {
    setSelectedJuz(juz);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(surahs.length / pageSize));

  // Ensure currentPage doesn't exceed totalPages when list changes
  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedSurahs = useMemo(() => {
    const start = (effectivePage - 1) * pageSize;
    return surahs.slice(start, start + pageSize);
  }, [surahs, effectivePage, pageSize]);

  const onPageChange = (page: number) => {
    const target = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(target);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  return {
    surahs,
    paginatedSurahs,
    loading,
    error,
    searchQuery,
    selectedJuz,
    currentPage: effectivePage,
    totalPages,
    pageSize,
    totalItems: surahs.length,
    onSearchChange,
    onJuzChange,
    onPageChange,
    onRefresh: fetchSurahs,
  };
}
