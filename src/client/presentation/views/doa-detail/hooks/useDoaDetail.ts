"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { getService } from "@/core/di/container";
import { TOKENS } from "@/core/di/tokens";
import { Doa } from "@/client/domain/doa/entity/doa";

export interface DoaDetailViewModel {
  doa: Doa | null;
  loading: boolean;
  error: string | null;
  copied: boolean;
  onCopy: () => void;
  onShare: () => void;
}

export function useDoaDetail(slug: string): DoaDetailViewModel {
  const [doa, setDoa] = useState<Doa | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const getDoaDetailUseCase = useMemo(
    () => getService(TOKENS.GetDoaDetailUseCase),
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function loadDoa() {
      try {
        setLoading(true);
        setError(null);
        const data = await getDoaDetailUseCase.execute(slug);
        if (isMounted) {
          setDoa(data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load Doa detail");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      loadDoa();
    }

    return () => {
      isMounted = false;
    };
  }, [getDoaDetailUseCase, slug]);

  const onCopy = useCallback(() => {
    if (!doa) return;
    const text = `${doa.title}\n\n${doa.arabic}\n\n"${doa.translation}"\n(Riwayat: ${doa.source})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [doa]);

  const onShare = useCallback(() => {
    if (!doa) return;
    const text = `${doa.title}\n\n${doa.arabic}\n\n"${doa.translation}"\n(Riwayat: ${doa.source})`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: doa.title,
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      onCopy();
    }
  }, [doa, onCopy]);

  return {
    doa,
    loading,
    error,
    copied,
    onCopy,
    onShare,
  };
}
