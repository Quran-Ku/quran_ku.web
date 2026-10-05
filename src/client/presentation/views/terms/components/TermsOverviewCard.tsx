"use client";

import React from "react";
import { Card } from "@/client/presentation/components/ui/Card";
import { TermsDataContent } from "../constants/terms-data";
import {
  BookOpen,
  Volume2,
  Heart,
  BookmarkCheck,
  Compass,
  Sparkles,
} from "lucide-react";

interface TermsOverviewCardProps {
  data: TermsDataContent;
}

const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Volume2,
  Heart,
  BookmarkCheck,
  Compass,
};

export function TermsOverviewCard({ data }: TermsOverviewCardProps) {
  return (
    <section
      id="ringkasan-aplikasi"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none"
      aria-labelledby="heading-ringkasan-aplikasi"
    >
      <Card
        bordered
        className="p-6 sm:p-8 border-primary-1/20 dark:border-primary-1/30 shadow-soft"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-dark-border">
          <div className="w-10 h-10 rounded-xl bg-primary-1 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-1 dark:text-primary-3">
              Pendahuluan
            </span>
            <h2
              id="heading-ringkasan-aplikasi"
              className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-textPrimary"
            >
              {data.overviewHeading}
            </h2>
          </div>
        </div>

        <p className="pt-4 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-dark-textMuted">
          {data.overviewDescription}
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          {data.overviewFeatures.map((feat, index) => {
            const IconComp = FEATURE_ICON_MAP[feat.icon] || BookOpen;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-dark-border space-y-2 hover:border-primary-1/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-primary-1 dark:text-primary-3 font-semibold text-sm">
                  <IconComp className="w-4 h-4" />
                  <span>{feat.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
