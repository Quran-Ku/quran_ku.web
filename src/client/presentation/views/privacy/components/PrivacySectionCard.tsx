"use client";

import React from "react";
import { Card } from "@/client/presentation/components/ui/Card";
import { PrivacySection } from "../constants/privacy-data";
import {
  Database,
  Sliders,
  Layers,
  Lock,
  Share2,
  HeartHandshake,
  UserCheck,
  Trash2,
  Clock,
  Info,
  AlertTriangle,
  CheckCircle2,
  Shield,
} from "lucide-react";

interface PrivacySectionCardProps {
  section: PrivacySection;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Database,
  Sliders,
  Layers,
  Lock,
  Share2,
  HeartHandshake,
  UserCheck,
  Trash2,
  Clock,
};

export function PrivacySectionCard({ section }: PrivacySectionCardProps) {
  const IconComponent = ICON_MAP[section.iconName] || Shield;

  return (
    <section
      id={section.id}
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none"
      aria-labelledby={`heading-${section.id}`}
    >
      <Card
        bordered
        className="p-6 sm:p-8 hover:border-emerald-500/30 dark:hover:border-emerald-400/30 transition-all shadow-sm"
      >
        {/* Section Header */}
        <div className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-dark-border">
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shadow-xs">
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50">
                BAGIAN {section.number}
              </span>
            </div>
            <h2
              id={`heading-${section.id}`}
              className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-textPrimary"
            >
              {section.title}
            </h2>
            {section.summary && (
              <p className="text-sm text-gray-500 dark:text-dark-textMuted mt-1">
                {section.summary}
              </p>
            )}
          </div>
        </div>

        {/* Section Body */}
        <div className="pt-5 space-y-4 text-gray-700 dark:text-dark-textPrimary">
          {section.points.map((point, index) => (
            <div key={index} className="space-y-2">
              {point.subtitle && (
                <h3 className="text-base font-semibold text-gray-900 dark:text-dark-textPrimary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:text-emerald-400" />
                  {point.subtitle}
                </h3>
              )}
              <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-dark-textMuted">
                {point.description}
              </p>

              {point.bulletList && point.bulletList.length > 0 && (
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm text-gray-600 dark:text-dark-textMuted">
                  {point.bulletList.map((bullet, bIndex) => (
                    <li key={bIndex} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Alert Callout */}
          {section.alertBox && (
            <div
              className={`mt-4 rounded-xl p-4 text-xs sm:text-sm flex items-start gap-3 border ${
                section.alertBox.type === "warning"
                  ? "bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/40"
                  : section.alertBox.type === "success"
                  ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40"
                  : "bg-primary-light/50 dark:bg-primary-1/10 text-primary-dark dark:text-primary-3 border-primary-1/20 dark:border-primary-1/30"
              }`}
            >
              {section.alertBox.type === "warning" ? (
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              ) : section.alertBox.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 flex-shrink-0 text-primary-1 dark:text-primary-3 mt-0.5" />
              )}
              <p className="leading-relaxed font-medium">
                {section.alertBox.text}
              </p>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
