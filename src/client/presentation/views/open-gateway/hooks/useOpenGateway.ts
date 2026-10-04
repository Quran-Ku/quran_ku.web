"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { getService } from "@/core/di/container";
import { TOKENS } from "@/core/di/tokens";
import { ResolvedDeepLink } from "@/client/domain/deeplink/entity/deeplink";
import { openQuranKuApp } from "@/core/utils/open-app";

export interface OpenGatewayViewModel {
  resolved: ResolvedDeepLink | null;
  loading: boolean;
  attempted: boolean;
  onRetry: () => void;
  onContinueWeb: () => void;
}

export function useOpenGateway(
  targetPath: string,
  rawAyah?: string
): OpenGatewayViewModel {
  const [resolved, setResolved] = useState<ResolvedDeepLink | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [attempted, setAttempted] = useState<boolean>(false);

  const resolveDeepLinkUseCase = useMemo(
    () => getService(TOKENS.ResolveDeepLinkUseCase),
    []
  );

  const ayahNumber = rawAyah ? parseInt(rawAyah, 10) : undefined;

  const attemptOpen = useCallback((targetResolved: ResolvedDeepLink) => {
    openQuranKuApp({
      appUrl: targetResolved.appSchemeUrl,
      webFallback: targetResolved.fallbackWebUrl,
      timeoutMs: 2000,
      onFallback: () => {
        setAttempted(true);
      },
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function processDeepLink() {
      try {
        setLoading(true);
        const res = await resolveDeepLinkUseCase.execute(targetPath || "/", ayahNumber);
        if (isMounted) {
          setResolved(res);
          attemptOpen(res);
        }
      } catch (err: unknown) {
        console.error("Deep link resolution error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    processDeepLink();

    return () => {
      isMounted = false;
    };
  }, [resolveDeepLinkUseCase, targetPath, ayahNumber, attemptOpen]);

  const onRetry = useCallback(() => {
    if (resolved) {
      attemptOpen(resolved);
    }
  }, [resolved, attemptOpen]);

  const onContinueWeb = useCallback(() => {
    if (resolved && typeof window !== "undefined") {
      window.location.href = resolved.fallbackWebUrl;
    }
  }, [resolved]);

  return {
    resolved,
    loading,
    attempted,
    onRetry,
    onContinueWeb,
  };
}
