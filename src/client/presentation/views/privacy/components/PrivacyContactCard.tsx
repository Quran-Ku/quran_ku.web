"use client";

import React from "react";
import { Card } from "@/client/presentation/components/ui/Card";
import { Button } from "@/client/presentation/components/ui/Button";
import { PrivacyDataContent } from "../constants/privacy-data";
import {
  Mail,
  Building2,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

interface PrivacyContactCardProps {
  data: PrivacyDataContent;
}

export function PrivacyContactCard({ data }: PrivacyContactCardProps) {
  return (
    <section
      id="kontak-privasi"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none space-y-6"
      aria-labelledby="heading-kontak-privasi"
    >
      {/* Account Deletion Callout Card */}
      <Card
        bordered
        className="p-6 sm:p-8 bg-gradient-to-br from-rose-50/50 via-white to-gray-50 dark:from-rose-950/10 dark:via-dark-card dark:to-dark-surface border-rose-200/60 dark:border-rose-900/30 shadow-sm"
      >
        <div className="flex items-center gap-3 pb-3">
          <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400">
            <Trash2 className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-dark-textPrimary">
            {data.deletionHeading}
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed">
          {data.deletionDescription}
        </p>
      </Card>

      {/* Main Support & DPO Card */}
      <Card
        bordered
        className="p-6 sm:p-8 bg-gradient-to-br from-emerald-50/40 via-white to-gray-50 dark:from-emerald-950/10 dark:via-dark-card dark:to-dark-surface shadow-sm border-emerald-500/20 dark:border-emerald-500/30"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-200/80 dark:border-dark-border">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-soft">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2
                id="heading-kontak-privasi"
                className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-textPrimary"
              >
                {data.contactHeading}
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed">
              {data.contactDescription}
            </p>
          </div>

          <a
            href={`mailto:${data.contactEmail}?subject=Pertanyaan Kebijakan Privasi Qur'an Ku`}
            className="flex-shrink-0"
          >
            <Button size="md" className="gap-2 shadow-soft bg-emerald-600 hover:bg-emerald-700 text-white">
              <Mail className="w-4 h-4" />
              <span>Hubungi Tim Privasi</span>
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-sm">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border">
            <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-dark-textMuted font-medium">
                Email Data Protection Officer (DPO)
              </p>
              <a
                href={`mailto:${data.contactEmail}`}
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {data.contactEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border">
            <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-dark-textMuted font-medium">
                Pengembang Resmi
              </p>
              <p className="font-semibold text-gray-900 dark:text-dark-textPrimary">
                {data.contactDeveloper}
              </p>
            </div>
          </div>
        </div>

        {/* Closing Consent Notice */}
        <div className="mt-6 p-4 rounded-xl bg-gray-100/80 dark:bg-dark-surface/80 border border-gray-200 dark:border-dark-border text-xs sm:text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p>{data.closingNote}</p>
        </div>
      </Card>
    </section>
  );
}
