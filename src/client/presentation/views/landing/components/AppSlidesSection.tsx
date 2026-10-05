"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/client/presentation/components/ui/Container";
import { Button } from "@/client/presentation/components/ui/Button";
import { OpenInAppButton } from "@/client/presentation/components/deep-link/OpenInAppButton";
import { useTranslator } from "@/core/translator";
import { ROUTES } from "@/core/constants/routes";
import { LANDING_SEMANTIC_IDS } from "../constants/SemanticIdConstant";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  List,
  Heart,
  Bookmark,
  CheckCircle2,
  Smartphone,
  ExternalLink,
  Search,
  FileText,
} from "lucide-react";

interface SlideData {
  id: string;
  image: string;
  titleKey: string;
  tagKey: string;
  subtitleKey: string;
  descKey: string;
  icon: React.ElementType;
  highlights: string[];
  deepLinkTarget?: string;
  webLink?: string;
}

const SLIDES: SlideData[] = [
  {
    id: "intro",
    image: "/images/slides/slide-1-intro.png",
    titleKey: "slides.item1.title",
    tagKey: "slides.item1.tag",
    subtitleKey: "slides.item1.subtitle",
    descKey: "slides.item1.desc",
    icon: Smartphone,
    highlights: [
      "Antarmuka Islami yang tenang & modern",
      "Akses cepat ke surah terakhir dibaca",
      "Desain responsif & nyaman di mata",
    ],
    deepLinkTarget: "/",
    webLink: ROUTES.HOME,
  },
  {
    id: "daftar-surah",
    image: "/images/slides/slide-3-daftar-surah.png",
    titleKey: "slides.item3.title",
    tagKey: "slides.item3.tag",
    subtitleKey: "slides.item3.subtitle",
    descKey: "slides.item3.desc",
    icon: List,
    highlights: [
      "Daftar 114 Surah & Pembagian 30 Juz",
      "Pencarian cepat nama & nomor surah",
      "Informasi golongan Makkiyah / Madaniyah",
    ],
    deepLinkTarget: "/quran",
    webLink: ROUTES.QURAN,
  },
  {
    id: "detail-surah",
    image: "/images/slides/slide-6-detail-surah.png",
    titleKey: "slides.item6.title",
    tagKey: "slides.item6.tag",
    subtitleKey: "slides.item6.subtitle",
    descKey: "slides.item6.desc",
    icon: FileText,
    highlights: [
      "Info lengkap Makkiyah / Madaniyah & arti nama",
      "Header kartu audio murattal per surah",
      "Navigasi cepat antar ayat dan juz",
    ],
    deepLinkTarget: "/quran/1",
    webLink: "/quran/1",
  },
  {
    id: "baca-quran",
    image: "/images/slides/slide-2-baca-quran.png",
    titleKey: "slides.item2.title",
    tagKey: "slides.item2.tag",
    subtitleKey: "slides.item2.subtitle",
    descKey: "slides.item2.desc",
    icon: BookOpen,
    highlights: [
      "Teks Arab standar Kemenag RI & terjemahan",
      "Audio murattal per ayat dengan 6 Qari ternama",
      "Tombol bookmark & bagikan ayat instan",
    ],
    deepLinkTarget: "/quran/1",
    webLink: "/quran/1",
  },
  {
    id: "pencarian-ayat",
    image: "/images/slides/slide-7-pencarian-ayat.png",
    titleKey: "slides.item7.title",
    tagKey: "slides.item7.tag",
    subtitleKey: "slides.item7.subtitle",
    descKey: "slides.item7.desc",
    icon: Search,
    highlights: [
      "Pencarian kata kunci terjemahan & nama surah",
      "Filter tab cepat: Surat, Ayat, dan Do'a",
      "Hasil instan dengan opsi putar murattal",
    ],
    deepLinkTarget: "/quran",
    webLink: ROUTES.QURAN,
  },
  {
    id: "doa-harian",
    image: "/images/slides/slide-4-doa-harian.png",
    titleKey: "slides.item4.title",
    tagKey: "slides.item4.tag",
    subtitleKey: "slides.item4.subtitle",
    descKey: "slides.item4.desc",
    icon: Heart,
    highlights: [
      "Koleksi 200+ Doa Harian bersumber shahih",
      "Kaligrafi Arab, transliterasi & arti Indonesia",
      "Rujukan riwayat hadis terverifikasi",
    ],
    deepLinkTarget: "/doa",
    webLink: ROUTES.DOA,
  },
  {
    id: "bookmark",
    image: "/images/slides/slide-5-bookmark.png",
    titleKey: "slides.item5.title",
    tagKey: "slides.item5.tag",
    subtitleKey: "slides.item5.subtitle",
    descKey: "slides.item5.desc",
    icon: Bookmark,
    highlights: [
      "Simpan ayat favorit untuk diakses cepat",
      "Riwayat bacaan terakhir otomatis tersimpan",
      "Koleksi doa tersimpan dalam satu tab profil",
    ],
    deepLinkTarget: "/quran",
    webLink: ROUTES.QURAN,
  },
];

const AUTO_PLAY_INTERVAL = 6000;

export function AppSlidesSection() {
  const { t } = useTranslator();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Autoplay management
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = document.getElementById(LANDING_SEMANTIC_IDS.slidesSection);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isInView) return;

      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0 && e.touches[0]) {
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    if (e.changedTouches.length > 0 && e.changedTouches[0]) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
    setTouchStartX(null);
  };

  const activeSlide: SlideData = SLIDES[activeIndex] ?? (SLIDES[0] as SlideData);
  const ActiveIcon = activeSlide.icon;

  return (
    <section
      id={LANDING_SEMANTIC_IDS.slidesSection}
      className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-gray-50/70 via-white to-gray-50/50 dark:from-dark-surface/40 dark:via-dark-bg dark:to-dark-bg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary-1/10 dark:bg-primary-3/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light dark:bg-primary-1/20 border border-primary-1/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-primary-1 dark:text-primary-3" />
            <span className="text-xs font-semibold text-primary-1 dark:text-primary-3">
              {t("slides.badge")}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-dark-textPrimary tracking-tight">
            {t("slides.heading")}
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-dark-textMuted leading-relaxed">
            {t("slides.subheading")}
          </p>
        </div>

        {/* Feature Category Tabs (Top Selector Bar) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 md:mb-14">
          {SLIDES.map((slide, idx) => {
            const Icon = slide.icon;
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-primary-1 text-white shadow-glow scale-105"
                    : "bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-textMuted hover:border-primary-1/50 hover:text-primary-1 dark:hover:text-primary-3"
                }`}
                aria-label={`Lihat slide ${t(slide.titleKey)}`}
                aria-selected={isActive}
                role="tab"
              >
                <Icon className="w-4 h-4" />
                <span>{t(slide.titleKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Phone Mockup Slider Viewport */}
          <div
            className="lg:col-span-6 flex flex-col items-center justify-center relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Phone Container Frame */}
            <div className="relative group w-[280px] sm:w-[320px] md:w-[340px]">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-4 rounded-[48px] bg-gradient-to-tr from-primary-1/30 via-sky-400/20 to-primary-3/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Smartphone Outer Hardware Shell */}
              <div className="relative bg-slate-950 dark:bg-slate-900 rounded-[44px] p-3 shadow-2xl border-[4px] border-slate-800/80 dark:border-slate-700/80 ring-1 ring-white/20">
                {/* Speaker Grill & Front Camera Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1 bg-black/60 rounded-full backdrop-blur-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 ring-1 ring-sky-400/40" />
                  <div className="w-10 h-1 rounded-full bg-slate-800" />
                </div>

                {/* Screen Content Viewport */}
                <div className="relative aspect-[9/16] w-full rounded-[34px] overflow-hidden bg-slate-900 shadow-inner">
                  {SLIDES.map((slide, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-500 ease-out ${
                          isActive
                            ? "opacity-100 scale-100 translate-x-0 z-20 pointer-events-auto"
                            : "opacity-0 scale-95 pointer-events-none " +
                              (idx < activeIndex ? "-translate-x-8" : "translate-x-8")
                        }`}
                        aria-hidden={!isActive}
                      >
                        <Image
                          src={slide.image}
                          alt={t(slide.titleKey)}
                          fill
                          sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 340px"
                          className="object-contain sm:object-cover select-none"
                          priority={idx <= 1}
                        />
                      </div>
                    );
                  })}

                  {/* Glossy screen glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20" />
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/40 z-30" />
              </div>

              {/* Prev / Next Floating Navigation Controls */}
              <button
                onClick={prevSlide}
                className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-textPrimary flex items-center justify-center shadow-lg hover:scale-110 hover:bg-primary-light dark:hover:bg-primary-1/20 transition-all z-30 focus:outline-none focus:ring-2 focus:ring-primary-1"
                aria-label={t("slides.prev")}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-textPrimary flex items-center justify-center shadow-lg hover:scale-110 hover:bg-primary-light dark:hover:bg-primary-1/20 transition-all z-30 focus:outline-none focus:ring-2 focus:ring-primary-1"
                aria-label={t("slides.next")}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Pagination Indicator Dots & Progress */}
            <div className="flex items-center gap-2.5 mt-6">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-8 bg-primary-1 dark:bg-primary-3 shadow-xs"
                        : "w-2.5 bg-gray-300 dark:bg-dark-border hover:bg-gray-400"
                    }`}
                    aria-label={`Pindah ke slide ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Slide Details & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-primary-light dark:bg-primary-1/20 text-primary-1 dark:text-primary-3 text-xs font-bold">
                <ActiveIcon className="w-3.5 h-3.5" />
                <span>{t(activeSlide.tagKey)}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-dark-textPrimary tracking-tight">
                {t(activeSlide.titleKey)}
              </h3>

              {/* Subtitle / Punchline */}
              <p className="text-base sm:text-lg font-medium text-primary-1 dark:text-primary-3 leading-snug">
                {t(activeSlide.subtitleKey)}
              </p>

              {/* Long Description */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-dark-textMuted leading-relaxed">
                {t(activeSlide.descKey)}
              </p>
            </div>

            {/* Feature Highlights Card */}
            <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-dark-textMuted text-left">
                Keunggulan Fitur
              </h4>
              <ul className="space-y-2.5 text-left">
                {activeSlide.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-dark-textPrimary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <OpenInAppButton
                targetPath={activeSlide.deepLinkTarget}
                size="lg"
                variant="gradient"
                className="w-full sm:w-auto shadow-glow font-bold"
              >
                {t("slides.openInApp")}
              </OpenInAppButton>

              {activeSlide.webLink && (
                <Link href={activeSlide.webLink} className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" fullWidth>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buka di Web
                  </Button>
                </Link>
              )}
            </div>

            {/* Thumbnail Preview Strip */}
            <div className="pt-4 border-t border-gray-100 dark:border-dark-border">
              <div className="flex items-center justify-center lg:justify-start gap-3 overflow-x-auto pb-2">
                {SLIDES.map((slide, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(idx)}
                      className={`relative w-14 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                        isActive
                          ? "border-primary-1 dark:border-primary-3 shadow-md scale-105 ring-2 ring-primary-1/30"
                          : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-300 dark:hover:border-dark-border"
                      }`}
                      aria-label={`Thumbnail ${t(slide.titleKey)}`}
                    >
                      <Image
                        src={slide.image}
                        alt={t(slide.titleKey)}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
