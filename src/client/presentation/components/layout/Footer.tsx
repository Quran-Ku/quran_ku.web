"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/client/presentation/components/ui/Container";
import { ROUTES } from "@/core/constants/routes";
import { APP_CONFIG } from "@/core/constants/app-config";
import { useTranslator } from "@/core/translator";
import { BookOpen, Heart, Smartphone, ShieldCheck } from "lucide-react";

export function Footer() {
  const { t } = useTranslator();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-dark-surface border-t border-gray-100 dark:border-dark-border pt-16 pb-12 transition-colors">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-200/70 dark:border-dark-border">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
              <Image
                src="/logo/app_logo.png"
                alt="Quran Ku"
                width={40}
                height={40}
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="text-xl font-bold text-gray-900 dark:text-dark-textPrimary">
                  Quran <span className="text-primary-1 dark:text-primary-3">Ku</span>
                </span>
                <p className="text-xs text-gray-500 dark:text-dark-textMuted font-arabic">
                  القرآن الكريم والتطبيق الإسلامي
                </p>
              </div>
            </Link>

            <p className="text-sm text-gray-600 dark:text-dark-textMuted max-w-md leading-relaxed">
              {t("footer.desc")}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-gray-500 dark:text-dark-textMuted">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Data Kemenag RI
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light dark:bg-primary-1/20 text-primary-1 dark:text-primary-3 font-medium">
                <Smartphone className="w-3.5 h-3.5" />
                Flutter Deep Link
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-dark-textPrimary">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href={ROUTES.HOME}
                  className="text-gray-600 dark:text-dark-textMuted hover:text-primary-1 dark:hover:text-primary-3 transition-colors flex items-center gap-2"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.QURAN}
                  className="text-gray-600 dark:text-dark-textMuted hover:text-primary-1 dark:hover:text-primary-3 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 opacity-70" />
                  {t("nav.quran")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.DOA}
                  className="text-gray-600 dark:text-dark-textMuted hover:text-primary-1 dark:hover:text-primary-3 transition-colors flex items-center gap-2"
                >
                  <Heart className="w-3.5 h-3.5 opacity-70" />
                  {t("nav.doa")}
                </Link>
              </li>
              <li>
                <a
                  href={APP_CONFIG.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-dark-textMuted hover:text-primary-1 dark:hover:text-primary-3 transition-colors flex items-center gap-2"
                >
                  <Smartphone className="w-3.5 h-3.5 opacity-70" />
                  Android App
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Notice */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-dark-textPrimary">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-dark-textMuted">
              <li>
                <Link
                  href={ROUTES.PRIVACY_POLICY}
                  className="hover:text-primary-1 dark:hover:text-primary-3 transition-colors inline-flex items-center gap-1.5"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.TERMS_AND_CONDITIONS}
                  className="hover:text-primary-1 dark:hover:text-primary-3 transition-colors inline-flex items-center gap-1.5"
                >
                  {t("footer.terms")}
                </Link>
              </li>
              <li className="pt-2 text-xs text-gray-400 dark:text-dark-textMuted/70 leading-normal">
                Aplikasi Quran Ku didesain sebagai sarana pendamping ibadah dan pembelajaran mandiri.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-dark-textMuted">
          <p>© {currentYear} {APP_CONFIG.appName}. {t("footer.rights")}</p>
          <p className="font-arabic text-sm text-gray-400 dark:text-dark-textMuted">
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
        </div>
      </Container>
    </footer>
  );
}
