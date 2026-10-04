"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/client/presentation/components/ui/Card";
import { Badge } from "@/client/presentation/components/ui/Badge";
import { Button } from "@/client/presentation/components/ui/Button";
import { OpenInAppButton } from "@/client/presentation/components/deep-link/OpenInAppButton";
import { QuranAyah } from "@/client/domain/quran/entity/quran-ayah";
import { AVAILABLE_RECITERS, ReciterId } from "@/client/domain/quran/entity/reciter";
import { formatAyahNumber, toArabicDigits } from "@/core/utils/arabic";
import { Play, Pause, Copy, Check, Share2, ChevronDown, UserCheck } from "lucide-react";

export interface AyahCardProps {
  ayah: QuranAyah;
  surahNumber: number;
  isPlaying?: boolean;
  isCopied?: boolean;
  isTarget?: boolean;
  selectedReciter?: ReciterId;
  onPlay: (reciterId?: ReciterId) => void;
  onStop?: () => void;
  onCopy: () => void;
}

export function AyahCard({
  ayah,
  surahNumber,
  isPlaying = false,
  isCopied = false,
  isTarget = false,
  selectedReciter = "alafasy",
  onPlay,
  onStop,
  onCopy,
}: AyahCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Filter reciters that actually have audio for this ayah
  const availableReciters = AVAILABLE_RECITERS.filter((r) => {
    const url = ayah.audio[r.id];
    return url && url.length > 0;
  });

  // Close menu on click outside or escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleShare = () => {
    const text = `${ayah.arabic}\n\n"${ayah.translation}"\n(QS. ${ayah.surahName}: ${ayah.number})`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: `QS. ${ayah.surahName} Ayat ${ayah.number}`,
          text,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      onCopy();
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (onStop) {
        onStop();
      } else {
        onPlay();
      }
    } else {
      setIsMenuOpen((prev) => !prev);
    }
  };

  const handleSelectReciterAndPlay = (reciterId: ReciterId) => {
    setIsMenuOpen(false);
    onPlay(reciterId);
  };

  return (
    <Card
      id={`ayah-${ayah.number}`}
      className={`p-6 sm:p-7 space-y-6 transition-all duration-300 rounded-3xl ${
        isPlaying
          ? "border-primary-1 dark:border-primary-3 ring-2 ring-primary-1/20 dark:ring-primary-3/20 bg-primary-light/10 dark:bg-primary-1/5 shadow-soft-lg"
          : isTarget
          ? "border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/30 bg-amber-50/20"
          : "border-gray-100 dark:border-dark-border"
      }`}
    >
      {/* Top Meta Bar: Ayah Number & Quick Actions */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-colors ${
              isPlaying
                ? "bg-primary-1 text-white shadow-soft"
                : "bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-dark-textPrimary"
            }`}
          >
            {formatAyahNumber(ayah.number)}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" size="sm">
              Juz {ayah.juz}
            </Badge>
            <Badge variant="secondary" size="sm">
              Hal. {ayah.page}
            </Badge>
          </div>
        </div>

        {/* Eastern Arabic numeral */}
        <span className="font-arabic text-xl font-bold text-gray-400 dark:text-dark-textMuted">
          ﴿{toArabicDigits(ayah.number)}﴾
        </span>
      </div>

      {/* Main Arabic Scripture (RTL) */}
      <div className="py-2">
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-2xl sm:text-3xl lg:text-4xl text-right text-gray-900 dark:text-dark-textPrimary leading-[2.3] sm:leading-[2.5] tracking-wide select-none"
        >
          {ayah.arabic}
        </p>
      </div>

      {/* Indonesian Translation */}
      <div className="space-y-1.5 pt-2">
        <p className="text-sm sm:text-base text-gray-700 dark:text-dark-textMuted leading-relaxed">
          {ayah.translation}
        </p>
      </div>

      {/* Ayah Bottom Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-dark-border">
        <div className="flex items-center gap-2 relative">
          {/* Play & Reciter Selector Dropdown Menu */}
          <div className="relative" ref={menuRef}>
            <Button
              variant={isPlaying ? "primary" : "secondary"}
              size="sm"
              onClick={handleTogglePlay}
              className="gap-1.5"
              aria-label={isPlaying ? "Jeda Audio" : "Pilih Qari & Putar Audio"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Jeda</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Putar</span>
                  <ChevronDown className={`w-3 h-3 ml-0.5 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
                </>
              )}
            </Button>

            {/* Reciters Popup Menu */}
            {isMenuOpen && (
              <div className="absolute left-0 bottom-full mb-2 w-72 sm:w-80 bg-white dark:bg-dark-surface rounded-2xl shadow-soft-xl border border-gray-100 dark:border-dark-border py-2 z-30 animate-fade-in">
                <div className="px-3.5 py-2 border-b border-gray-100 dark:border-dark-border/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-dark-textPrimary">
                    Pilih Qari (Pembaca):
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-dark-textMuted">
                    Ayat {ayah.number}
                  </span>
                </div>

                <div className="max-h-60 overflow-y-auto py-1 space-y-0.5 custom-scrollbar">
                  {availableReciters.length === 0 ? (
                    <div className="p-3 text-xs text-center text-gray-400">
                      Audio belum tersedia
                    </div>
                  ) : (
                    availableReciters.map((r) => {
                      const isSelected = r.id === selectedReciter;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => handleSelectReciterAndPlay(r.id)}
                          className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs transition-colors rounded-xl mx-auto ${
                            isSelected
                              ? "bg-primary-light/50 dark:bg-primary-1/15 text-primary-1 dark:text-primary-3 font-semibold"
                              : "text-gray-700 dark:text-dark-textPrimary hover:bg-gray-50 dark:hover:bg-dark-card"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "bg-primary-1 text-white"
                                  : "bg-gray-100 dark:bg-dark-card text-gray-500 dark:text-dark-textMuted"
                              }`}
                            >
                              <Play className="w-3 h-3 fill-current" />
                            </div>
                            <div className="truncate">
                              <p className="truncate font-medium">{r.name}</p>
                              <p className="text-[10px] text-gray-400 dark:text-dark-textMuted font-arabic truncate">
                                {r.arabicName}
                              </p>
                            </div>
                          </div>

                          {isSelected && (
                            <UserCheck className="w-4 h-4 text-primary-1 dark:text-primary-3 shrink-0" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Copy Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onCopy}
            className="gap-1.5"
            aria-label="Salin Ayat"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin</span>
              </>
            )}
          </Button>

          {/* Share Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            aria-label="Bagikan Ayat"
          >
            <Share2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Open In App Deep Link Button */}
        <OpenInAppButton
          surahNumber={surahNumber}
          ayahNumber={ayah.number}
          size="sm"
          variant="secondary"
        >
          Buka di App
        </OpenInAppButton>
      </div>
    </Card>
  );
}
