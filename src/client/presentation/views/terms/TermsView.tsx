"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/client/presentation/components/ui/Container";
import { useTranslator } from "@/core/translator";
import { TERMS_DATA, TermsDataContent } from "./constants/terms-data";
import { TermsHeader } from "./components/TermsHeader";
import { TermsNav } from "./components/TermsNav";
import { TermsOverviewCard } from "./components/TermsOverviewCard";
import { TermsSectionCard } from "./components/TermsSectionCard";
import { TermsContactCard } from "./components/TermsContactCard";
import { ArrowUp, Menu, ChevronDown } from "lucide-react";

export function TermsView() {
  const { locale } = useTranslator();
  const data: TermsDataContent =
    TERMS_DATA[locale as "id" | "en" | "zh"] || TERMS_DATA.id;

  const [activeId, setActiveId] = useState<string>("ringkasan-aplikasi");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll handler
  const handleScrollToSection = (id: string) => {
    setActiveId(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll spy & Back-to-top detection
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionIds = [
        "ringkasan-aplikasi",
        ...data.sections.map((s) => s.id),
        "kontak-bantuan",
      ];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50/50 dark:bg-dark-bg transition-colors">
      {/* Hero Header */}
      <TermsHeader data={data} />

      {/* Main Content Layout */}
      <Container size="wide" className="pt-10">
        {/* Mobile Quick Jump Dropdown / Accordion */}
        <div className="lg:hidden mb-6">
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-4 shadow-sm">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 dark:text-dark-textPrimary"
              aria-expanded={mobileMenuOpen}
            >
              <div className="flex items-center gap-2">
                <Menu className="w-4 h-4 text-primary-1 dark:text-primary-3" />
                <span>Navigasi Pasal Ketentuan</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileMenuOpen && (
              <div className="pt-4 border-t border-gray-100 dark:border-dark-border mt-3">
                <TermsNav
                  sections={data.sections}
                  activeId={activeId}
                  onSelectSection={handleScrollToSection}
                />
              </div>
            )}
          </div>
        </div>

        {/* Desktop 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Table of Contents */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-5 shadow-sm">
              <TermsNav
                sections={data.sections}
                activeId={activeId}
                onSelectSection={handleScrollToSection}
              />
            </div>
          </div>

          {/* Right Column: Terms Sections & Details */}
          <main className="lg:col-span-8 space-y-8">
            {/* Overview / Introduction */}
            <TermsOverviewCard data={data} />

            {/* 10 Detailed Sections */}
            {data.sections.map((section) => (
              <TermsSectionCard key={section.id} section={section} />
            ))}

            {/* Support & Contact Card */}
            <TermsContactCard data={data} />
          </main>
        </div>
      </Container>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary-1 hover:bg-primary-dark text-white shadow-soft-lg transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-1/50"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
