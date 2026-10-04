import { QuranSurahApiModel, QuranAyahApiModel } from "../model/quran-api-model";

export interface QuranFilterParams {
  search?: string;
  juz?: number;
}

export interface QuranRemoteDataSource {
  fetchSurahList(params?: QuranFilterParams): Promise<readonly QuranSurahApiModel[]>;
  fetchSurahDetail(surahNumber: number): Promise<QuranSurahApiModel>;
  fetchAyah(surahNumber: number, ayahNumber: number): Promise<QuranAyahApiModel>;
}
