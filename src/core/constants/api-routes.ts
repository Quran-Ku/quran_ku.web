export const API_BASE_PATHS = {
  v1: "/api/v1",
} as const;

export const API_ROUTES = {
  QURAN: `${API_BASE_PATHS.v1}/quran`,
  SURAH: (surahNumber: number | string) =>
    `${API_BASE_PATHS.v1}/quran/${surahNumber}`,
  AYAH: (surahNumber: number | string, ayahNumber: number | string) =>
    `${API_BASE_PATHS.v1}/quran/${surahNumber}/${ayahNumber}`,
  DOA: `${API_BASE_PATHS.v1}/doa`,
  DOA_DETAIL: (slug: string) => `${API_BASE_PATHS.v1}/doa/${slug}`,
  RESOLVE_DEEP_LINK: `${API_BASE_PATHS.v1}/deeplink/resolve`,
} as const;
