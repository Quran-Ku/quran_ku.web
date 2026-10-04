"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/client/presentation/components/ui/Container";
import { OpenInAppButton } from "@/client/presentation/components/deep-link/OpenInAppButton";
import { ROUTES } from "@/core/constants/routes";
import { useTranslator } from "@/core/translator";
import { Menu, X, Moon, Sun, BookOpen, Heart, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useTranslator();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial theme check
    const darkThemeActive =
      document.documentElement.classList.contains("dark") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(darkThemeActive);
    if (darkThemeActive) {
      document.documentElement.classList.add("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("quranku_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("quranku_theme", "light");
    }
  };

  const navLinks = [
    { label: t("nav.home"), href: ROUTES.HOME, icon: Sparkles },
    { label: t("nav.quran"), href: ROUTES.QURAN, icon: BookOpen },
    { label: t("nav.doa"), href: ROUTES.DOA, icon: Heart },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-dark-bg/85 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-dark-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
            <Image
              src="/logo/app_logo.png"
              alt="Quran Ku Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
              priority
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-dark-textPrimary tracking-tight">
                Quran <span className="text-primary-1 dark:text-primary-3">Ku</span>
              </span>
              <span className="text-[10px] text-gray-400 dark:text-dark-textMuted font-arabic leading-none">
                القرآن الكريم
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-gray-50/80 dark:bg-dark-surface/80 p-1.5 rounded-2xl border border-gray-100 dark:border-dark-border">
            {navLinks.map((link) => {
              const isActive =
                link.href === ROUTES.HOME
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white dark:bg-dark-card text-primary-1 dark:text-primary-3 shadow-xs font-semibold"
                      : "text-gray-600 dark:text-dark-textMuted hover:text-gray-900 dark:hover:text-dark-textPrimary"
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Locale, DarkMode, OpenApp */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Locale selector */}
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as "id" | "en" | "zh")}
              className="bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl text-xs font-semibold px-2.5 py-2 text-gray-700 dark:text-dark-textPrimary cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-1"
              aria-label="Select Language"
            >
              <option value="id">ID</option>
              <option value="en">EN</option>
              <option value="zh">中文</option>
            </select>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-gray-600 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Open In App CTA */}
            <OpenInAppButton size="sm" variant="gradient" />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-gray-600 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 dark:text-dark-textPrimary hover:bg-gray-100 dark:hover:bg-dark-surface"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border shadow-xl space-y-3 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === ROUTES.HOME
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive
                        ? "bg-primary-light dark:bg-primary-1/20 text-primary-1 dark:text-primary-3 font-semibold"
                        : "text-gray-700 dark:text-dark-textPrimary hover:bg-gray-50 dark:hover:bg-dark-card"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-primary-1 dark:text-primary-3" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-gray-100 dark:border-dark-border flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-dark-textMuted">Bahasa</span>
              <div className="flex gap-1.5">
                {(["id", "en", "zh"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-semibold uppercase ${
                      locale === l
                        ? "bg-primary-1 text-white"
                        : "bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-textMuted"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <OpenInAppButton fullWidth size="lg" variant="gradient" />
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
