import { DEEP_LINK_SCHEMES, DEEP_LINK_HOST } from "@/core/constants/deep-link-routes";
import { ROUTES } from "@/core/constants/routes";

export interface OpenAppOptions {
  appUrl: string;
  webFallback?: string;
  timeoutMs?: number;
  onFallback?: () => void;
}

/**
 * Validate that the deep link is a safe, allowed scheme & host
 */
export function isAllowedDeepLink(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    const trimmed = url.trim();
    if (trimmed.startsWith("javascript:") || trimmed.startsWith("data:") || trimmed.startsWith("vbscript:")) {
      return false;
    }

    if (trimmed.startsWith(`${DEEP_LINK_SCHEMES.CUSTOM}://${DEEP_LINK_HOST}`) ||
        trimmed.startsWith(`${DEEP_LINK_SCHEMES.LEGACY}://${DEEP_LINK_HOST}`) ||
        trimmed.startsWith(`https://${DEEP_LINK_HOST}`)) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Convert relative web path to deep link URL
 */
export function createDeepLinkFromWebPath(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${DEEP_LINK_SCHEMES.CUSTOM}://${DEEP_LINK_HOST}${cleanPath}`;
}

/**
 * Browser-safe invocation to trigger app deep link with fallback
 */
export function openQuranKuApp(options: OpenAppOptions): void {
  if (typeof window === "undefined") return;

  const { appUrl, webFallback = ROUTES.HOME, timeoutMs = 2500, onFallback } = options;

  if (!isAllowedDeepLink(appUrl)) {
    console.warn("Invalid or disallowed deep link URI:", appUrl);
    if (webFallback && typeof window !== "undefined") {
      window.location.href = webFallback;
    }
    return;
  }

  let hasHidden = false;
  const handleVisibilityChange = () => {
    if (document.hidden) {
      hasHidden = true;
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange, { once: true });

  // Attempt opening deep link
  window.location.href = appUrl;

  const timer = setTimeout(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    if (!hasHidden && !document.hidden) {
      if (onFallback) {
        onFallback();
      } else if (webFallback && window.location.pathname !== webFallback) {
        // Stay on fallback without disruptive reload
      }
    }
  }, timeoutMs);

  // Clear timeout if user switches away
  window.addEventListener("pagehide", () => clearTimeout(timer), { once: true });
}
