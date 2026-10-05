"use client";

import React from "react";
import { Card } from "@/client/presentation/components/ui/Card";
import { Button } from "@/client/presentation/components/ui/Button";
import { TermsDataContent } from "../constants/terms-data";
import {
  Mail,
  Building2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface TermsContactCardProps {
  data: TermsDataContent;
}

export function TermsContactCard({ data }: TermsContactCardProps) {
  return (
    <section
      id="kontak-bantuan"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none space-y-6"
      aria-labelledby="heading-kontak-bantuan"
    >
      <Card
        bordered
        className="p-6 sm:p-8 bg-gradient-to-br from-primary-light/40 via-white to-gray-50 dark:from-primary-1/10 dark:via-dark-card dark:to-dark-surface shadow-sm border-primary-1/20 dark:border-primary-1/30"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-200/80 dark:border-dark-border">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary-1 text-white shadow-soft">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2
                id="heading-kontak-bantuan"
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
            href={`mailto:${data.contactEmail}?subject=Pertanyaan Syarat dan Ketentuan Qur'an Ku`}
            className="flex-shrink-0"
          >
            <Button size="md" className="gap-2 shadow-soft">
              <Mail className="w-4 h-4" />
              <span>Hubungi Pengembang</span>
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-sm">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border">
            <Mail className="w-5 h-5 text-primary-1 dark:text-primary-3 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-dark-textMuted font-medium">
                Email Dukungan
              </p>
              <a
                href={`mailto:${data.contactEmail}`}
                className="font-semibold text-primary-1 dark:text-primary-3 hover:underline"
              >
                {data.contactEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border">
            <Building2 className="w-5 h-5 text-primary-1 dark:text-primary-3 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-dark-textMuted font-medium">
                Pengembang Aplikasi
              </p>
              <p className="font-semibold text-gray-900 dark:text-dark-textPrimary">
                {data.contactDeveloper}
              </p>
            </div>
          </div>
        </div>

        {/* Closing Agreement Notice */}
        <div className="mt-6 p-4 rounded-xl bg-gray-100/80 dark:bg-dark-surface/80 border border-gray-200 dark:border-dark-border text-xs sm:text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p>{data.closingNote}</p>
        </div>
      </Card>
    </section>
  );
}
