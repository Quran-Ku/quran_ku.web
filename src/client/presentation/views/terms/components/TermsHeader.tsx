"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/client/presentation/components/ui/Container";
import { Badge } from "@/client/presentation/components/ui/Badge";
import { Button } from "@/client/presentation/components/ui/Button";
import { ROUTES } from "@/core/constants/routes";
import { TermsDataContent } from "../constants/terms-data";
import {
  ShieldCheck,
  Calendar,
  Sparkles,
  Share2,
  Check,
  Smartphone,
  BookOpen,
} from "lucide-react";

interface TermsHeaderProps {
  data: TermsDataContent;
}

export function TermsHeader({ data }: TermsHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback if clipboard API fails
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/60 via-white to-gray-50/50 dark:from-primary-1/10 dark:via-dark-bg dark:to-dark-surface/40 pt-32 sm:pt-36 md:pt-40 pb-16 md:pb-20 transition-colors border-b border-gray-100 dark:border-dark-border">
      {/* Background Decorative Blobs */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-primary-1/10 dark:bg-primary-3/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-brand-teal3/10 dark:bg-primary-1/10 blur-3xl"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Badge variant="primary" size="md" className="gap-1.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-primary-1 dark:text-primary-3" />
              <span>Dokumen Resmi Excitech</span>
            </Badge>
            <Badge variant="secondary" size="md" className="gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Versi {data.version}</span>
            </Badge>
            <Badge variant="success" size="md" className="gap-1.5">
              <span>Google Families Safe</span>
            </Badge>
          </div>

          {/* App Logo & Title */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-dark-card shadow-soft p-2 flex items-center justify-center border border-gray-100 dark:border-dark-border">
                <Image
                  src="/logo/app_logo.png"
                  alt="Quran Ku"
                  width={44}
                  height={44}
                  className="w-11 h-11 object-contain"
                  priority
                />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-dark-textPrimary">
              {data.appTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-dark-textMuted max-w-2xl mx-auto font-medium">
              {data.tagline}
            </p>
          </div>

          {/* Timestamps & Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-dark-textMuted">
            <span className="flex items-center gap-1.5 bg-white dark:bg-dark-card px-3.5 py-1.5 rounded-full border border-gray-200/80 dark:border-dark-border shadow-xs">
              <Calendar className="w-4 h-4 text-primary-1 dark:text-primary-3" />
              Berlaku sejak: <strong>{data.effectiveDate}</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-white dark:bg-dark-card px-3.5 py-1.5 rounded-full border border-gray-200/80 dark:border-dark-border shadow-xs">
              Pembaruan terakhir: <strong>{data.lastUpdated}</strong>
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="gap-2 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm"
              aria-label="Salin tautan halaman syarat dan ketentuan"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Tautan Tersalin!
                  </span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-gray-500 dark:text-dark-textMuted" />
                  <span>Salin Tautan</span>
                </>
              )}
            </Button>

            <Link href={ROUTES.OPEN_APP}>
              <Button size="sm" className="gap-2 shadow-soft">
                <Smartphone className="w-4 h-4" />
                <span>Buka di Aplikasi</span>
              </Button>
            </Link>

            <Link href={ROUTES.QURAN}>
              <Button variant="ghost" size="sm" className="gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Baca Quran Web</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
