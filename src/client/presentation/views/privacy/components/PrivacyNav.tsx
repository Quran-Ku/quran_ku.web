"use client";

import React from "react";
import { PrivacySection } from "../constants/privacy-data";
import { Shield, ChevronRight } from "lucide-react";

interface PrivacyNavProps {
  sections: PrivacySection[];
  activeId: string;
  onSelectSection: (id: string) => void;
}

export function PrivacyNav({
  sections,
  activeId,
  onSelectSection,
}: PrivacyNavProps) {
  return (
    <aside className="space-y-4">
      <div className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-dark-textMuted">
        <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span>Daftar Isi Kebijakan Privasi</span>
      </div>

      <nav
        aria-label="Daftar Isi Kebijakan Privasi"
        className="space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-scrollbar"
      >
        <button
          onClick={() => onSelectSection("komitmen-privasi")}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between group ${
            activeId === "komitmen-privasi"
              ? "bg-emerald-600 text-white shadow-soft font-semibold"
              : "text-gray-700 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-emerald-600 dark:hover:text-emerald-400"
          }`}
        >
          <span className="truncate">Komitmen Privasi</span>
          <ChevronRight
            className={`w-3.5 h-3.5 transition-transform ${
              activeId === "komitmen-privasi"
                ? "translate-x-0.5 text-white"
                : "opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5"
            }`}
          />
        </button>

        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between group ${
                isActive
                  ? "bg-emerald-600 text-white shadow-soft font-semibold"
                  : "text-gray-700 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-emerald-600 dark:hover:text-emerald-400"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-200/70 dark:bg-dark-border text-gray-600 dark:text-dark-textMuted"
                  }`}
                >
                  {section.number}
                </span>
                <span className="truncate">{section.title}</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                  isActive
                    ? "translate-x-0.5 text-white"
                    : "opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5"
                }`}
              />
            </button>
          );
        })}

        <button
          onClick={() => onSelectSection("kontak-privasi")}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between group ${
            activeId === "kontak-privasi"
              ? "bg-emerald-600 text-white shadow-soft font-semibold"
              : "text-gray-700 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-emerald-600 dark:hover:text-emerald-400"
          }`}
        >
          <span className="truncate">Kontak & Petugas DPO</span>
          <ChevronRight
            className={`w-3.5 h-3.5 transition-transform ${
              activeId === "kontak-privasi"
                ? "translate-x-0.5 text-white"
                : "opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5"
            }`}
          />
        </button>
      </nav>
    </aside>
  );
}
