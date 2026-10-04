import { QuranSurahEntity } from "../entities/quran-surah.entity";
import { QuranAyahEntity } from "../entities/quran-ayah.entity";

export interface FindSurahListOptions {
  search?: string;
  juz?: number;
}

export interface QuranRepository {
  findAllSurahs(options?: FindSurahListOptions): Promise<readonly QuranSurahEntity[]>;
  findSurahByNumber(number: number): Promise<QuranSurahEntity | null>;
  findAyah(surahNumber: number, ayahNumber: number): Promise<QuranAyahEntity | null>;
}
