"use client";

import React from "react";
import { Container } from "@/client/presentation/components/ui/Container";
import { Card } from "@/client/presentation/components/ui/Card";
import { useTranslator } from "@/core/translator";
import { LANDING_SEMANTIC_IDS } from "../constants/SemanticIdConstant";
import { BookOpen, Headphones, Heart, Bookmark, Moon, Smartphone } from "lucide-react";

export function FeatureCardsSection() {
  const { t } = useTranslator();

  const features = [
    {
      icon: BookOpen,
      title: t("features.quran.title"),
      desc: t("features.quran.desc"),
      color: "bg-teal-50 dark:bg-teal-950/40 text-primary-1 dark:text-primary-3",
    },
    {
      icon: Headphones,
      title: t("features.audio.title"),
      desc: t("features.audio.desc"),
      color: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400",
    },
    {
      icon: Heart,
      title: t("features.doa.title"),
      desc: t("features.doa.desc"),
      color: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
    },
    {
      icon: Bookmark,
      title: t("features.bookmark.title"),
      desc: t("features.bookmark.desc"),
      color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    },
    {
      icon: Moon,
      title: t("features.theme.title"),
      desc: t("features.theme.desc"),
      color: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: Smartphone,
      title: t("features.deeplink.title"),
      desc: t("features.deeplink.desc"),
      color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <section id={LANDING_SEMANTIC_IDS.featuresSection} className="py-20 bg-white dark:bg-dark-bg">
      <Container size="wide">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-dark-textPrimary tracking-tight">
            {t("features.heading")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-dark-textMuted leading-relaxed">
            {t("features.subheading")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                hoverable
                className="p-6 space-y-4 rounded-2xl border-gray-100 dark:border-dark-border"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-textPrimary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
