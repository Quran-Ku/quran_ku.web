"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/client/presentation/components/ui/Container";
import { useTranslator } from "@/core/translator";
import { PRIVACY_DATA, PrivacyDataContent } from "./constants/privacy-data";
import { PrivacyHeader } from "./components/PrivacyHeader";
import { PrivacyNav } from "./components/PrivacyNav";
import { PrivacyOverviewCard } from "./components/PrivacyOverviewCard";
import { PrivacySectionCard } from "./components/PrivacySectionCard";
import { PrivacyContactCard } from "./components/PrivacyContactCard";
import { ArrowUp, Menu, ChevronDown } from "lucide-react";

export function PrivacyView() {
  const { locale } = useTranslator();
  const data: PrivacyDataContent =
    PRIVACY_DATA[locale as "id" | "en" | "zh"] || PRIVACY_DATA.id;

  const [activeId, setActiveId] = useState<string>("komitmen-privasi");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToSection = (id: string) => {
    setActiveId(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionIds = [
        "komitmen-privasi",
        ...data.sections.map((s) => s.id),
        "kontak-privasi",
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
      <PrivacyHeader data={data} />

      <Container size="wide" className="pt-10">
        {/* Mobile Accordion Jump Menu */}
        <div className="lg:hidden mb-6">
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-4 shadow-sm">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 dark:text-dark-textPrimary"
              aria-expanded={mobileMenuOpen}
            >
              <div className="flex items-center gap-2">
                <Menu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Navigasi Kebijakan Privasi</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileMenuOpen && (
              <div className="pt-4 border-t border-gray-100 dark:border-dark-border mt-3">
                <PrivacyNav
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
          {/* Left Column Sticky TOC */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-5 shadow-sm">
              <PrivacyNav
                sections={data.sections}
                activeId={activeId}
                onSelectSection={handleScrollToSection}
              />
            </div>
          </div>

          {/* Right Column Sections */}
          <main className="lg:col-span-8 space-y-8">
            <PrivacyOverviewCard data={data} />

            {data.sections.map((section) => (
              <PrivacySectionCard key={section.id} section={section} />
            ))}

            <PrivacyContactCard data={data} />
          </main>
        </div>
      </Container>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft-lg transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
