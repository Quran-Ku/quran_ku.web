"use client";

import React from "react";
import { TermsSection } from "../constants/terms-data";
import { ListFilter, ChevronRight } from "lucide-react";

interface TermsNavProps {
  sections: TermsSection[];
  activeId: string;
  onSelectSection: (id: string) => void;
}

export function TermsNav({ sections, activeId, onSelectSection }: TermsNavProps) {
  return (
    <aside className="space-y-4">
      <div className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-dark-textMuted">
        <ListFilter className="w-4 h-4 text-primary-1 dark:text-primary-3" />
        <span>Daftar Isi Ketentuan</span>
      </div>

      <nav
        aria-label="Daftar Isi Syarat dan Ketentuan"
        className="space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-scrollbar"
      >
        {/* Intro jump */}
        <button
          onClick={() => onSelectSection("ringkasan-aplikasi")}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between group ${
            activeId === "ringkasan-aplikasi"
              ? "bg-primary-1 text-white shadow-soft font-semibold"
              : "text-gray-700 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-primary-1 dark:hover:text-primary-3"
          }`}
        >
          <span className="truncate">Tentang Qur'an Ku</span>
          <ChevronRight
            className={`w-3.5 h-3.5 transition-transform ${
              activeId === "ringkasan-aplikasi"
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
                  ? "bg-primary-1 text-white shadow-soft font-semibold"
                  : "text-gray-700 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-primary-1 dark:hover:text-primary-3"
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

        {/* Contact jump */}
        <button
          onClick={() => onSelectSection("kontak-bantuan")}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between group ${
            activeId === "kontak-bantuan"
              ? "bg-primary-1 text-white shadow-soft font-semibold"
              : "text-gray-700 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-primary-1 dark:hover:text-primary-3"
          }`}
        >
          <span className="truncate">Kontak & Pusat Bantuan</span>
          <ChevronRight
            className={`w-3.5 h-3.5 transition-transform ${
              activeId === "kontak-bantuan"
                ? "translate-x-0.5 text-white"
                : "opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5"
            }`}
          />
        </button>
      </nav>
    </aside>
  );
}
