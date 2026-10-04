"use client";

import React from "react";
import { AVAILABLE_RECITERS, ReciterId } from "@/client/domain/quran/entity/reciter";
import { Volume2 } from "lucide-react";

export interface ReciterSelectorProps {
  selectedReciter: ReciterId;
  onSelectReciter: (reciter: ReciterId) => void;
}

export function ReciterSelector({
  selectedReciter,
  onSelectReciter,
}: ReciterSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border shadow-xs mb-8">
      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-dark-textPrimary font-semibold">
        <Volume2 className="w-4 h-4 text-primary-1 dark:text-primary-3" />
        <span>Pilihan Qari Audio:</span>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <select
          value={selectedReciter}
          onChange={(e) => onSelectReciter(e.target.value as ReciterId)}
          className="w-full sm:w-auto bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border text-xs rounded-xl px-4 py-2 font-medium text-gray-800 dark:text-dark-textPrimary focus:outline-none focus:ring-1 focus:ring-primary-1 cursor-pointer"
          aria-label="Pilih Qari Audio"
        >
          {AVAILABLE_RECITERS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} ({r.arabicName})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
