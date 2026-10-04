export const DEEP_LINK_SCHEMES = {
  CUSTOM: "quranku",
  LEGACY: "myapp",
  HTTPS: "https",
} as const;

export const DEEP_LINK_HOST = "quran-ku.com";

export const DEEP_LINK_ROUTES = {
  HOME: `${DEEP_LINK_SCHEMES.CUSTOM}://${DEEP_LINK_HOST}`,
  QURAN: `${DEEP_LINK_SCHEMES.CUSTOM}://${DEEP_LINK_HOST}/quran`,
  SURAH: (surahNumber: number | string) =>
    `${DEEP_LINK_SCHEMES.CUSTOM}://${DEEP_LINK_HOST}/quran/${surahNumber}`,
  AYAH: (surahNumber: number | string, ayahNumber: number | string) =>
    `${DEEP_LINK_SCHEMES.CUSTOM}://${DEEP_LINK_HOST}/quran/${surahNumber}?ayah=${ayahNumber}`,
  DOA: `${DEEP_LINK_SCHEMES.CUSTOM}://${DEEP_LINK_HOST}/doa`,
  DOA_DETAIL: (slug: string) =>
    `${DEEP_LINK_SCHEMES.CUSTOM}://${DEEP_LINK_HOST}/doa/${slug}`,
} as const;
