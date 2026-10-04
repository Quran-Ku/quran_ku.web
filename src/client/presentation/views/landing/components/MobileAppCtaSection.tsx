"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/client/presentation/components/ui/Container";
import { Button } from "@/client/presentation/components/ui/Button";
import { OpenInAppButton } from "@/client/presentation/components/deep-link/OpenInAppButton";
import { APP_CONFIG } from "@/core/constants/app-config";
import { useTranslator } from "@/core/translator";
import { LANDING_SEMANTIC_IDS } from "../constants/SemanticIdConstant";
import { Download, Smartphone, CheckCircle } from "lucide-react";

export function MobileAppCtaSection() {
  const { t } = useTranslator();

  return (
    <section
      id={LANDING_SEMANTIC_IDS.mobileCtaSection}
      className="py-20 relative overflow-hidden"
    >
      <Container size="wide">
        <div className="relative rounded-3xl bg-brand-gradient p-8 sm:p-12 lg:p-16 text-white shadow-glow overflow-hidden">
          {/* Subtle geometric circles */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Aplikasi Flutter Mobile</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {t("cta.heading")}
              </h2>

              <p className="text-white/90 text-sm sm:text-base max-w-xl leading-relaxed">
                {t("cta.subheading")}
              </p>

              <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Mode Offline & Terang/Gelap</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Murattal Lengkap</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Jadwal Doa Harian</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <OpenInAppButton
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary-1 hover:bg-gray-100 shadow-md w-full sm:w-auto font-bold"
                >
                  {t("cta.openApp")}
                </OpenInAppButton>

                <a
                  href={APP_CONFIG.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    fullWidth
                    className="border-2 border-white/60 text-white dark:text-white dark:border-white/60 hover:bg-white/20 dark:hover:bg-white/20 font-bold shadow-sm backdrop-blur-sm"
                  >
                    <Download className="w-4 h-4 mr-2 text-white" />
                    {t("cta.download")}
                  </Button>
                </a>
              </div>
            </div>

            {/* Right App Icon Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 rounded-full bg-white/20 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/logo/app_logo.png"
                  alt="Quran Ku Android App"
                  width={224}
                  height={224}
                  className="relative w-44 h-44 sm:w-56 sm:h-56 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-all duration-300"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
