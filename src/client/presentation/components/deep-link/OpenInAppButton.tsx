"use client";

import React, { useState } from "react";
import { Button, ButtonProps } from "@/client/presentation/components/ui/Button";
import { openQuranKuApp, createDeepLinkFromWebPath } from "@/core/utils/open-app";
import { Smartphone, Download, ExternalLink } from "lucide-react";
import { APP_CONFIG } from "@/core/constants/app-config";
import { useTranslator } from "@/core/translator";

export interface OpenInAppButtonProps extends Omit<ButtonProps, "onClick"> {
  targetPath?: string;
  surahNumber?: number;
  ayahNumber?: number;
  doaSlug?: string;
  showFallbackModal?: boolean;
}

export function OpenInAppButton({
  targetPath,
  surahNumber,
  ayahNumber,
  doaSlug,
  showFallbackModal = true,
  children,
  variant = "gradient",
  size = "md",
  ...props
}: OpenInAppButtonProps) {
  const { t } = useTranslator();
  const [modalOpen, setModalOpen] = useState(false);

  const calculateTarget = (): string => {
    if (targetPath) return targetPath;
    if (surahNumber) {
      return ayahNumber ? `/quran/${surahNumber}?ayah=${ayahNumber}` : `/quran/${surahNumber}`;
    }
    if (doaSlug) {
      return `/doa/${doaSlug}`;
    }
    return "/";
  };

  const handleOpenApp = () => {
    const target = calculateTarget();
    const deepLink = createDeepLinkFromWebPath(target);

    openQuranKuApp({
      appUrl: deepLink,
      webFallback: target,
      onFallback: () => {
        if (showFallbackModal) {
          setModalOpen(true);
        }
      },
    });
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleOpenApp}
        id="btn-open-in-app"
        {...props}
      >
        <Smartphone className="w-4 h-4 mr-1.5" />
        {children || t("hero.cta.open")}
      </Button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-primary-light dark:bg-primary-1/20 flex items-center justify-center text-primary-1 dark:text-primary-3 mx-auto">
              <Smartphone className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-dark-textPrimary">
                {t("open.fallback.title")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed">
                {t("open.fallback.desc")}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href={APP_CONFIG.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="gradient" fullWidth size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  {t("cta.download")}
                </Button>
              </a>

              <Button
                variant="secondary"
                fullWidth
                size="lg"
                onClick={() => setModalOpen(false)}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {t("open.button.continueWeb")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
