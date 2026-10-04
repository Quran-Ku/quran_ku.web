import { QuranSurah } from "../entity/quran-surah";
import { QuranAyah } from "../entity/quran-ayah";

export interface QuranFilterOptions {
  search?: string;
  juz?: number;
}

export interface QuranRepository {
  getSurahList(options?: QuranFilterOptions): Promise<readonly QuranSurah[]>;
  getSurahDetail(surahNumber: number): Promise<QuranSurah>;
  getAyah(surahNumber: number, ayahNumber: number): Promise<QuranAyah>;
}
