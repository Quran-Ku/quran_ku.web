import { QuranRemoteDataSource, QuranFilterParams } from "./quran-remote-data-source";
import { QuranSurahApiModel, QuranAyahApiModel } from "../model/quran-api-model";
import { apiClient } from "@/core/http-client/api-client";
import { API_ROUTES } from "@/core/constants/api-routes";

export class QuranRemoteDataSourceImpl implements QuranRemoteDataSource {
  async fetchSurahList(params?: QuranFilterParams): Promise<readonly QuranSurahApiModel[]> {
    const res = await apiClient.get<QuranSurahApiModel[]>(API_ROUTES.QURAN, {
      params: {
        search: params?.search,
        juz: params?.juz,
      },
    });

    if (!res.success) {
      throw new Error(res.error.message || "Failed to fetch Surah list");
    }

    return res.data;
  }

  async fetchSurahDetail(surahNumber: number): Promise<QuranSurahApiModel> {
    const res = await apiClient.get<QuranSurahApiModel>(API_ROUTES.SURAH(surahNumber));

    if (!res.success) {
      throw new Error(res.error.message || `Failed to fetch Surah ${surahNumber}`);
    }

    return res.data;
  }

  async fetchAyah(surahNumber: number, ayahNumber: number): Promise<QuranAyahApiModel> {
    const res = await apiClient.get<QuranAyahApiModel>(API_ROUTES.AYAH(surahNumber, ayahNumber));

    if (!res.success) {
      throw new Error(res.error.message || `Failed to fetch Ayah ${ayahNumber} of Surah ${surahNumber}`);
    }

    return res.data;
  }
}
