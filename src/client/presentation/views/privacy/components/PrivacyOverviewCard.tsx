"use client";

import React from "react";
import { Card } from "@/client/presentation/components/ui/Card";
import { PrivacyDataContent } from "../constants/privacy-data";
import {
  ShieldCheck,
  ShieldOff,
  Lock,
  HeartHandshake,
  UserCheck,
} from "lucide-react";

interface PrivacyOverviewCardProps {
  data: PrivacyDataContent;
}

const PILLAR_ICON_MAP: Record<string, React.ElementType> = {
  ShieldBan: ShieldOff,
  ShieldOff,
  Lock,
  HeartHandshake,
  UserCheck,
};

export function PrivacyOverviewCard({ data }: PrivacyOverviewCardProps) {
  return (
    <section
      id="komitmen-privasi"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none"
      aria-labelledby="heading-komitmen-privasi"
    >
      <Card
        bordered
        className="p-6 sm:p-8 border-emerald-500/20 dark:border-emerald-500/30 shadow-soft"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-dark-border">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Prinsip Privasi
            </span>
            <h2
              id="heading-komitmen-privasi"
              className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-textPrimary"
            >
              {data.overviewHeading}
            </h2>
          </div>
        </div>

        <p className="pt-4 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-dark-textMuted">
          {data.overviewDescription}
        </p>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          {data.pillars.map((pillar, index) => {
            const IconComp = PILLAR_ICON_MAP[pillar.icon] || ShieldCheck;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-dark-border space-y-2 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                  <IconComp className="w-4 h-4" />
                  <span>{pillar.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
