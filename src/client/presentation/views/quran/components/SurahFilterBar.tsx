"use client";

import React from "react";
import { Input } from "@/client/presentation/components/ui/Input";
import { Search } from "lucide-react";
import { useTranslator } from "@/core/translator";

export interface SurahFilterBarProps {
  searchQuery: string;
  selectedJuz: number | undefined;
  onSearchChange: (q: string) => void;
  onJuzChange: (juz: number | undefined) => void;
}

export function SurahFilterBar({
  searchQuery,
  selectedJuz,
  onSearchChange,
  onJuzChange,
}: SurahFilterBarProps) {
  const { t } = useTranslator();

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-dark-surface p-3 sm:p-4 rounded-2xl border border-gray-100 dark:border-dark-border shadow-xs">
      <div className="w-full sm:max-w-md">
        <Input
          placeholder={t("quran.search.placeholder")}
          icon={<Search className="w-4 h-4" />}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          clearable
          onClear={() => onSearchChange("")}
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        <select
          value={selectedJuz ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onJuzChange(val ? parseInt(val, 10) : undefined);
          }}
          className="bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border text-xs rounded-xl px-3.5 py-2.5 font-medium text-gray-700 dark:text-dark-textPrimary focus:outline-none focus:ring-1 focus:ring-primary-1 cursor-pointer w-full sm:w-auto"
          aria-label="Filter berdasarkan Juz"
        >
          <option value="">Semua Juz (1 - 30)</option>
          {Array.from({ length: 30 }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Juz {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
