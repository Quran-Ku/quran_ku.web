export const ROUTES = {
  HOME: "/",
  QURAN: "/quran",
  SURAH: (surahNumber: number | string) => `/quran/${surahNumber}`,
  AYAH: (surahNumber: number | string, ayahNumber: number | string) =>
    `/quran/${surahNumber}?ayah=${ayahNumber}`,
  DOA: "/doa",
  DOA_DETAIL: (slug: string) => `/doa/${slug}`,
  OPEN_APP: "/open",
} as const;
