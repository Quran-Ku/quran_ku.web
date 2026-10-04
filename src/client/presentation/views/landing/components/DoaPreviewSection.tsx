"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/client/presentation/components/ui/Container";
import { Button } from "@/client/presentation/components/ui/Button";
import { Card } from "@/client/presentation/components/ui/Card";
import { Badge } from "@/client/presentation/components/ui/Badge";
import { OpenInAppButton } from "@/client/presentation/components/deep-link/OpenInAppButton";
import { Doa } from "@/client/domain/doa/entity/doa";
import { ROUTES } from "@/core/constants/routes";
import { useTranslator } from "@/core/translator";
import { LANDING_SEMANTIC_IDS } from "../constants/SemanticIdConstant";
import { ArrowRight, Heart } from "lucide-react";

export interface DoaPreviewSectionProps {
  doas: readonly Doa[];
  loading?: boolean;
}

export function DoaPreviewSection({ doas, loading = false }: DoaPreviewSectionProps) {
  const { t } = useTranslator();

  return (
    <section id={LANDING_SEMANTIC_IDS.doaPreviewSection} className="py-20 bg-white dark:bg-dark-bg">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-dark-textPrimary tracking-tight">
              {t("doa.preview.title")}
            </h2>
            <p className="text-sm text-gray-600 dark:text-dark-textMuted max-w-lg">
              {t("doa.preview.subtitle")}
            </p>
          </div>

          <Link href={ROUTES.DOA}>
            <Button variant="outline" size="sm" className="gap-2">
              <span>{t("doa.viewAll")}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-44 bg-gray-200 dark:bg-dark-card rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doas.map((doa) => (
              <Card
                key={doa.slug}
                hoverable
                className="p-5 flex flex-col justify-between space-y-4 group rounded-2xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Link
                      href={ROUTES.DOA_DETAIL(doa.slug)}
                      className="text-base font-bold text-gray-900 dark:text-dark-textPrimary group-hover:text-primary-1 dark:group-hover:text-primary-3 transition-colors line-clamp-1"
                    >
                      {doa.title}
                    </Link>
                    <Heart className="w-4 h-4 text-rose-500 opacity-60" />
                  </div>

                  {/* Arabic (RTL) */}
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-xl text-right text-gray-900 dark:text-dark-textPrimary leading-[2] line-clamp-2"
                  >
                    {doa.arabic}
                  </p>

                  {/* Meaning */}
                  <p className="text-xs text-gray-600 dark:text-dark-textMuted line-clamp-2 leading-relaxed italic">
                    &ldquo;{doa.translation}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-border text-xs">
                  <Badge variant="secondary" size="sm" className="truncate max-w-[160px]">
                    {doa.source || "Shahih"}
                  </Badge>

                  <OpenInAppButton doaSlug={doa.slug} size="sm" variant="ghost">
                    Buka App
                  </OpenInAppButton>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
