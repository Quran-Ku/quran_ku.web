"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/client/presentation/components/ui/Container";
import { Card } from "@/client/presentation/components/ui/Card";
import { Button } from "@/client/presentation/components/ui/Button";
import { OpenInAppButton } from "@/client/presentation/components/deep-link/OpenInAppButton";
import { useDoaDetail } from "./hooks/useDoaDetail";
import { ROUTES } from "@/core/constants/routes";
import { ArrowLeft, Copy, Check, Share2, Heart, BookMarked } from "lucide-react";

export interface DoaDetailViewProps {
  slug: string;
}

export function DoaDetailView({ slug }: DoaDetailViewProps) {
  const { doa, loading, error, copied, onCopy, onShare } = useDoaDetail(slug);

  return (
    <main className="min-h-screen bg-gray-50/40 dark:bg-dark-bg pt-28 pb-32 text-gray-900 dark:text-dark-textPrimary">
      <Container size="narrow">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={ROUTES.DOA}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-dark-textMuted hover:text-primary-1 dark:hover:text-primary-3 transition-colors bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border px-3.5 py-2 rounded-xl shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Kumpulan Doa</span>
          </Link>

          {doa && (
            <OpenInAppButton doaSlug={doa.slug} size="sm" variant="gradient">
              Buka di App
            </OpenInAppButton>
          )}
        </div>

        {error && (
          <div className="p-6 rounded-3xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-center max-w-md mx-auto mb-10">
            <h3 className="font-bold mb-2">Terjadi Kendala</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="h-96 bg-gray-200 dark:bg-dark-card rounded-3xl animate-pulse" />
        ) : doa ? (
          <Card className="p-6 sm:p-10 space-y-8 rounded-3xl border-gray-100 dark:border-dark-border shadow-soft-lg">
            {/* Header / Title */}
            <div className="text-center space-y-3 pb-6 border-b border-gray-100 dark:border-dark-border">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-dark-textPrimary">
                {doa.title}
              </h1>

              {doa.source && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light dark:bg-primary-1/20 text-primary-1 dark:text-primary-3 text-xs font-medium">
                  <BookMarked className="w-3.5 h-3.5" />
                  <span>Riwayat: {doa.source}</span>
                </div>
              )}
            </div>

            {/* Arabic Scripture (RTL) */}
            <div className="py-4">
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-2xl sm:text-3xl lg:text-4xl text-right text-gray-900 dark:text-dark-textPrimary leading-[2.4] sm:leading-[2.6] tracking-wide select-none"
              >
                {doa.arabic}
              </p>
            </div>

            {/* Transliteration */}
            {doa.transliteration && (
              <div className="p-4 rounded-2xl bg-primary-light/40 dark:bg-dark-surface border border-primary-1/10 dark:border-dark-border">
                <span className="text-xs uppercase font-bold text-primary-1 dark:text-primary-3 block mb-1">
                  Transliterasi
                </span>
                <p className="text-sm font-medium text-gray-800 dark:text-dark-textPrimary italic leading-relaxed">
                  {doa.transliteration}
                </p>
              </div>
            )}

            {/* Meaning / Translation */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-gray-400 dark:text-dark-textMuted block">
                Artinya
              </span>
              <p className="text-base text-gray-700 dark:text-dark-textMuted leading-relaxed italic">
                &ldquo;{doa.translation}&rdquo;
              </p>
            </div>

            {/* Notes / Keywords */}
            {doa.notes && doa.notes.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-dark-border">
                <span className="text-xs uppercase font-bold text-gray-400 dark:text-dark-textMuted block">
                  Keterangan
                </span>
                <ul className="text-xs text-gray-600 dark:text-dark-textMuted space-y-1 list-disc pl-4">
                  {doa.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-gray-100 dark:border-dark-border">
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="md" onClick={onCopy} className="gap-2">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Doa</span>
                    </>
                  )}
                </Button>

                <Button variant="ghost" size="md" onClick={onShare} className="gap-2">
                  <Share2 className="w-4 h-4" />
                  <span>Bagikan</span>
                </Button>
              </div>

              <OpenInAppButton doaSlug={doa.slug} size="md" variant="gradient">
                Buka di Aplikasi
              </OpenInAppButton>
            </div>
          </Card>
        ) : null}
      </Container>
    </main>
  );
}
