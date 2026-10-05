"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/client/presentation/components/ui/Container";
import { Button } from "@/client/presentation/components/ui/Button";
import { Badge } from "@/client/presentation/components/ui/Badge";
import { OpenInAppButton } from "@/client/presentation/components/deep-link/OpenInAppButton";
import { ROUTES } from "@/core/constants/routes";
import { useTranslator } from "@/core/translator";
import { LANDING_SEMANTIC_IDS } from "../constants/SemanticIdConstant";
import { BookOpen, Play, Sparkles } from "lucide-react";

export interface HeroSectionProps {
  onPlaySample?: () => void;
}

export function HeroSection({ onPlaySample }: HeroSectionProps) {
  const { t } = useTranslator();

  return (
    <section
      id={LANDING_SEMANTIC_IDS.heroSection}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-primary-light/40 via-white to-white dark:from-dark-bg dark:via-dark-bg dark:to-dark-surface"
    >
      {/* Subtle Islamic geometric background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-1/5 dark:bg-primary-3/5 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-dark-surface border border-primary-1/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary-1 dark:text-primary-3" />
              <span className="text-xs font-semibold text-primary-1 dark:text-primary-3">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-dark-textPrimary tracking-tight leading-[1.15]">
              Al-Quran Lebih Dekat, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary-1 via-primary-2 to-primary-3 bg-clip-text text-transparent">
                Setiap Hari.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-dark-textMuted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <OpenInAppButton size="lg" variant="gradient" className="w-full sm:w-auto shadow-glow">
                {t("hero.cta.open")}
              </OpenInAppButton>

              <Link href={ROUTES.QURAN} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" fullWidth>
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t("hero.cta.explore")}
                </Button>
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 dark:text-dark-textMuted">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Tanpa Iklan Mengganggu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-1" />
                <span>Audio Murattal 6 Qari</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Double-Phone Pedestal Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-xl group">
              {/* Outer decorative ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-primary-1/30 via-amber-400/20 to-primary-3/30 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* 3D Phone Mockup Container */}
              <div className="relative transform group-hover:scale-[1.02] transition-transform duration-500 ease-out flex justify-center">
                <Image
                  src="/images/hero-mockup.png"
                  alt="Quran Ku Mobile App 3D Mockup"
                  width={1024}
                  height={682}
                  className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] select-none"
                  priority
                />

                {/* Floating Interactive Audio Sample Player */}
                {onPlaySample && (
                  <div className="absolute -bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 z-20 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border border-gray-100 dark:border-dark-border rounded-2xl p-2.5 sm:p-3 shadow-2xl flex items-center gap-3 hover:scale-105 transition-all">
                    <button
                      onClick={onPlaySample}
                      className="w-10 h-10 rounded-xl bg-primary-1 text-white flex items-center justify-center shadow-md hover:bg-primary-dark transition-colors shrink-0"
                      aria-label="Putar sampel murattal"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                    <div className="text-left pr-2">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="primary" size="sm" className="text-[10px] px-1.5 py-0">
                          Audio Sample
                        </Badge>
                        <span className="text-[11px] font-bold text-gray-900 dark:text-dark-textPrimary">
                          Al-Fatihah : 1
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-dark-textMuted mt-0.5">
                        Mishari Rashid al-`Afasy
                      </p>
                    </div>
                  </div>
                )}

                {/* Floating Version 2.0 Badge */}
                <div className="hidden sm:flex absolute top-4 right-2 z-20 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md border border-gray-100 dark:border-dark-border rounded-2xl px-3.5 py-2 shadow-lg items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-gray-800 dark:text-dark-textPrimary">
                    Quran Ku v2.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
