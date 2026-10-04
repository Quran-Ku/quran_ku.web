import { DeepLinkRepository } from "../../domain/repositories/deeplink.repository";
import { ResolvedDeepLinkEntity } from "../../domain/entities/deeplink.entity";
import { DEEP_LINK_SCHEMES, DEEP_LINK_HOST, DEEP_LINK_ROUTES } from "@/core/constants/deep-link-routes";
import { APP_CONFIG } from "@/core/constants/app-config";
import { ROUTES } from "@/core/constants/routes";
import { InvalidDeepLinkError } from "@/server/shared/errors/app-error";

export class DeepLinkRepositoryImpl implements DeepLinkRepository {
  async resolveTarget(rawTarget: string, rawAyah?: number): Promise<ResolvedDeepLinkEntity> {
    const trimmed = rawTarget.trim();

    // Prevent open redirects or script protocols
    if (
      trimmed.startsWith("javascript:") ||
      trimmed.startsWith("data:") ||
      trimmed.startsWith("vbscript:")
    ) {
      throw new InvalidDeepLinkError("Unsafe protocol is not permitted");
    }

    // Normalize path
    let pathname = trimmed;
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      try {
        const parsed = new URL(trimmed);
        if (parsed.hostname !== DEEP_LINK_HOST && parsed.hostname !== "localhost") {
          throw new InvalidDeepLinkError(`Disallowed external host: ${parsed.hostname}`);
        }
        pathname = parsed.pathname + parsed.search;
      } catch (err: unknown) {
        if (err instanceof InvalidDeepLinkError) throw err;
        throw new InvalidDeepLinkError("Malformed URL");
      }
    } else if (trimmed.startsWith(`${DEEP_LINK_SCHEMES.CUSTOM}://`) || trimmed.startsWith(`${DEEP_LINK_SCHEMES.LEGACY}://`)) {
      const stripped = trimmed.replace(/^[a-z0-9]+:\/\/[^/]+/i, "");
      pathname = stripped || "/";
    }

    if (!pathname.startsWith("/")) {
      pathname = `/${pathname}`;
    }

    // Match Surah / Ayah: /quran/:surah/:ayah or /quran/:surah?ayah=:ayah
    const surahAyahPathMatch = pathname.match(/^\/quran\/(\d+)\/(\d+)/);
    if (surahAyahPathMatch && surahAyahPathMatch[1] && surahAyahPathMatch[2]) {
      const surahNum = parseInt(surahAyahPathMatch[1], 10);
      const ayahNum = parseInt(surahAyahPathMatch[2], 10);
      return {
        canonicalUrl: `${APP_CONFIG.canonicalUrl}/quran/${surahNum}?ayah=${ayahNum}`,
        appSchemeUrl: DEEP_LINK_ROUTES.AYAH(surahNum, ayahNum),
        fallbackWebUrl: ROUTES.AYAH(surahNum, ayahNum),
        targetType: "ayah",
        metadata: { surahNumber: surahNum, ayahNumber: ayahNum },
      };
    }

    const surahMatch = pathname.match(/^\/quran\/(\d+)/);
    if (surahMatch && surahMatch[1]) {
      const surahNum = parseInt(surahMatch[1], 10);
      if (rawAyah && rawAyah > 0) {
        return {
          canonicalUrl: `${APP_CONFIG.canonicalUrl}/quran/${surahNum}?ayah=${rawAyah}`,
          appSchemeUrl: DEEP_LINK_ROUTES.AYAH(surahNum, rawAyah),
          fallbackWebUrl: ROUTES.AYAH(surahNum, rawAyah),
          targetType: "ayah",
          metadata: { surahNumber: surahNum, ayahNumber: rawAyah },
        };
      }
      return {
        canonicalUrl: `${APP_CONFIG.canonicalUrl}/quran/${surahNum}`,
        appSchemeUrl: DEEP_LINK_ROUTES.SURAH(surahNum),
        fallbackWebUrl: ROUTES.SURAH(surahNum),
        targetType: "surah",
        metadata: { surahNumber: surahNum },
      };
    }

    // Match Doa detail: /doa/:slug
    const doaDetailMatch = pathname.match(/^\/doa\/([a-z0-9-]+)/);
    if (doaDetailMatch && doaDetailMatch[1]) {
      const slug = doaDetailMatch[1];
      return {
        canonicalUrl: `${APP_CONFIG.canonicalUrl}/doa/${slug}`,
        appSchemeUrl: DEEP_LINK_ROUTES.DOA_DETAIL(slug),
        fallbackWebUrl: ROUTES.DOA_DETAIL(slug),
        targetType: "doa_detail",
        metadata: { doaSlug: slug },
      };
    }

    // Match /quran
    if (pathname.startsWith("/quran")) {
      return {
        canonicalUrl: `${APP_CONFIG.canonicalUrl}/quran`,
        appSchemeUrl: DEEP_LINK_ROUTES.QURAN,
        fallbackWebUrl: ROUTES.QURAN,
        targetType: "quran",
        metadata: {},
      };
    }

    // Match /doa
    if (pathname.startsWith("/doa")) {
      return {
        canonicalUrl: `${APP_CONFIG.canonicalUrl}/doa`,
        appSchemeUrl: DEEP_LINK_ROUTES.DOA,
        fallbackWebUrl: ROUTES.DOA,
        targetType: "doa",
        metadata: {},
      };
    }

    // Default to Home
    return {
      canonicalUrl: APP_CONFIG.canonicalUrl,
      appSchemeUrl: DEEP_LINK_ROUTES.HOME,
      fallbackWebUrl: ROUTES.HOME,
      targetType: "home",
      metadata: {},
    };
  }
}
