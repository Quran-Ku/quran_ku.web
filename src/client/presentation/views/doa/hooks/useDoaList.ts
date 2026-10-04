"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { getService } from "@/core/di/container";
import { TOKENS } from "@/core/di/tokens";
import { Doa } from "@/client/domain/doa/entity/doa";

export const DEFAULT_DOA_PAGE_SIZE = 9;

export interface DoaListViewModel {
  doas: readonly Doa[];
  paginatedDoas: readonly Doa[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onSearchChange: (q: string) => void;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

export function useDoaList(pageSize: number = DEFAULT_DOA_PAGE_SIZE): DoaListViewModel {
  const [doas, setDoas] = useState<readonly Doa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getDoaListUseCase = useMemo(
    () => getService(TOKENS.GetDoaListUseCase),
    []
  );

  const fetchDoas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await getDoaListUseCase.execute({
        search: searchQuery || undefined,
      });
      setDoas(list);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load Doa list");
    } finally {
      setLoading(false);
    }
  }, [getDoaListUseCase, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDoas();
    }, 200);

    return () => clearTimeout(timer);
  }, [fetchDoas]);

  const onSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(doas.length / pageSize));
  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedDoas = useMemo(() => {
    const start = (effectivePage - 1) * pageSize;
    return doas.slice(start, start + pageSize);
  }, [doas, effectivePage, pageSize]);

  const onPageChange = (page: number) => {
    const target = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(target);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  return {
    doas,
    paginatedDoas,
    loading,
    error,
    searchQuery,
    currentPage: effectivePage,
    totalPages,
    pageSize,
    totalItems: doas.length,
    onSearchChange,
    onPageChange,
    onRefresh: fetchDoas,
  };
}
