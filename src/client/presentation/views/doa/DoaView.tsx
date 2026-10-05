"use client";

import React, { useEffect } from "react";
import { Container } from "@/client/presentation/components/ui/Container";
import { Input } from "@/client/presentation/components/ui/Input";
import { useDoaList } from "./hooks/useDoaList";
import { DoaCard } from "./components/DoaCard";
import { Pagination } from "@/client/presentation/components/ui/Pagination";
import { useTranslator } from "@/core/translator";
import { Heart, Search } from "lucide-react";
import { autoRedirectToAppIfMobile } from "@/core/utils/open-app";

export function DoaView() {
  const { t } = useTranslator();
  useEffect(() => {
    autoRedirectToAppIfMobile("/doa");
  }, []);
  const {
    doas,
    paginatedDoas,
    loading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    onSearchChange,
    onPageChange,
  } = useDoaList();

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-dark-bg pt-28 pb-24 text-gray-900 dark:text-dark-textPrimary">
      <Container size="wide">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5" />
            <span>Kumpulan Doa Harian</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t("doa.preview.title")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-dark-textMuted leading-relaxed">
            {t("features.doa.desc")}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10 max-w-xl mx-auto">
          <Input
            placeholder={t("doa.search.placeholder")}
            icon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            clearable
            onClear={() => onSearchChange("")}
          />
        </div>

        {/* Content */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-center max-w-md mx-auto mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 dark:bg-dark-card rounded-3xl animate-pulse"
              />
            ))}
          </div>
        ) : doas.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-dark-card rounded-3xl border border-gray-100 dark:border-dark-border max-w-md mx-auto space-y-3">
            <p className="text-base font-bold text-gray-700 dark:text-dark-textPrimary">
              Doa tidak ditemukan
            </p>
            <p className="text-xs text-gray-500 dark:text-dark-textMuted">
              Coba gunakan kata kunci pencarian yang lebih umum.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedDoas.map((doa) => (
                <DoaCard key={doa.slug} doa={doa} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={onPageChange}
              itemLabel="Doa"
              className="mt-10"
            />
          </>
        )}
      </Container>
    </main>
  );
}
