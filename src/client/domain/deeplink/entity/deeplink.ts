export interface ResolvedDeepLink {
  readonly canonicalUrl: string;
  readonly appSchemeUrl: string;
  readonly fallbackWebUrl: string;
  readonly targetType: "home" | "quran" | "surah" | "ayah" | "doa" | "doa_detail" | "unknown";
  readonly metadata: {
    readonly surahNumber?: number;
    readonly ayahNumber?: number;
    readonly doaSlug?: string;
  };
}
