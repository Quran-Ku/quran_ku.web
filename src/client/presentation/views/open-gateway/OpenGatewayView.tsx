"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/client/presentation/components/ui/Container";
import { Button } from "@/client/presentation/components/ui/Button";
import { Card } from "@/client/presentation/components/ui/Card";
import { useOpenGateway } from "./hooks/useOpenGateway";
import { APP_CONFIG } from "@/core/constants/app-config";
import { useTranslator } from "@/core/translator";
import { Smartphone, Download, ExternalLink } from "lucide-react";

export interface OpenGatewayViewProps {
  targetPath: string;
  ayah?: string;
}

export function OpenGatewayView({ targetPath, ayah }: OpenGatewayViewProps) {
  const { t } = useTranslator();
  const { resolved, loading, onRetry, onContinueWeb } = useOpenGateway(
    targetPath,
    ayah
  );

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-dark-bg flex items-center justify-center p-4 pt-24 pb-20 text-gray-900 dark:text-dark-textPrimary">
      <Container size="narrow">
        <Card className="max-w-md mx-auto p-8 sm:p-10 text-center space-y-6 rounded-3xl border-gray-100 dark:border-dark-border shadow-soft-lg">
          {/* App Logo */}
          <div className="mx-auto flex items-center justify-center">
            <Image
              src="/logo/app_logo.png"
              alt="Quran Ku"
              width={72}
              height={72}
              className="w-18 h-18 object-contain drop-shadow-md"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-dark-textPrimary">
              {loading ? t("open.title") : t("open.fallback.title")}
            </h1>
            <p className="text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed">
              {loading ? t("open.desc") : t("open.fallback.desc")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="gradient"
              size="lg"
              fullWidth
              onClick={onRetry}
              className="gap-2 shadow-glow"
            >
              <Smartphone className="w-4 h-4" />
              <span>{t("open.button.retry")}</span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={onContinueWeb}
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t("open.button.continueWeb")}</span>
            </Button>

            <a
              href={APP_CONFIG.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                variant="outline"
                size="md"
                fullWidth
                className="gap-2 text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t("open.button.download")}</span>
              </Button>
            </a>
          </div>

          {resolved && (
            <div className="pt-4 border-t border-gray-100 dark:border-dark-border text-xs text-gray-400 dark:text-dark-textMuted/70 truncate">
              Target: <span className="font-mono">{resolved.fallbackWebUrl}</span>
            </div>
          )}
        </Card>
      </Container>
    </main>
  );
}
