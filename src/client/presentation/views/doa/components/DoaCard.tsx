"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/client/presentation/components/ui/Card";
import { Badge } from "@/client/presentation/components/ui/Badge";
import { Button } from "@/client/presentation/components/ui/Button";
import { OpenInAppButton } from "@/client/presentation/components/deep-link/OpenInAppButton";
import { Doa } from "@/client/domain/doa/entity/doa";
import { ROUTES } from "@/core/constants/routes";
import { Copy, Check, Share2, Heart, ArrowUpRight } from "lucide-react";

export interface DoaCardProps {
  doa: Doa;
}

export function DoaCard({ doa }: DoaCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `${doa.title}\n\n${doa.arabic}\n\n"${doa.translation}"\n(Riwayat: ${doa.source})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `${doa.title}\n\n${doa.arabic}\n\n"${doa.translation}"\n(Riwayat: ${doa.source})`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: doa.title,
        text,
        url: window.location.origin + ROUTES.DOA_DETAIL(doa.slug),
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <Card
      hoverable
      className="p-6 flex flex-col justify-between space-y-4 rounded-3xl group transition-all"
    >
      <div className="space-y-4">
        {/* Title & Heart */}
        <div className="flex items-start justify-between gap-3">
          <Link
            href={ROUTES.DOA_DETAIL(doa.slug)}
            className="text-base sm:text-lg font-bold text-gray-900 dark:text-dark-textPrimary group-hover:text-primary-1 dark:group-hover:text-primary-3 transition-colors flex items-center gap-1.5"
          >
            <span>{doa.title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Heart className="w-4 h-4 text-rose-500 opacity-60 shrink-0" />
        </div>

        {/* Arabic (RTL) */}
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-xl sm:text-2xl text-right text-gray-900 dark:text-dark-textPrimary leading-[2.2] select-none"
        >
          {doa.arabic}
        </p>

        {/* Transliteration */}
        {doa.transliteration && (
          <p className="text-xs text-primary-1 dark:text-primary-3 font-medium italic line-clamp-2">
            {doa.transliteration}
          </p>
        )}

        {/* Translation */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed line-clamp-3">
          &ldquo;{doa.translation}&rdquo;
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-100 dark:border-dark-border text-xs">
        <Badge variant="secondary" size="sm" className="truncate max-w-[180px]">
          {doa.source || "Shahih"}
        </Badge>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="px-2 py-1"
            aria-label="Salin Doa"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="px-2 py-1"
            aria-label="Bagikan Doa"
          >
            <Share2 className="w-3.5 h-3.5" />
          </Button>

          <OpenInAppButton
            doaSlug={doa.slug}
            size="sm"
            variant="secondary"
            className="text-xs py-1 px-3"
          >
            Buka App
          </OpenInAppButton>
        </div>
      </div>
    </Card>
  );
}
