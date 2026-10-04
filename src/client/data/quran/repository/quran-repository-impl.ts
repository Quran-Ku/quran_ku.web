import { QuranRepository, QuranFilterOptions } from "@/client/domain/quran/repository/quran-repository";
import { QuranSurah } from "@/client/domain/quran/entity/quran-surah";
import { QuranAyah } from "@/client/domain/quran/entity/quran-ayah";
import { QuranRemoteDataSource } from "../data_source/quran-remote-data-source";
import { QuranClientMapper } from "../mapper/quran-mapper";

export class QuranRepositoryImpl implements QuranRepository {
  constructor(private readonly remoteDataSource: QuranRemoteDataSource) {}

  async getSurahList(options?: QuranFilterOptions): Promise<readonly QuranSurah[]> {
    const models = await this.remoteDataSource.fetchSurahList({
      search: options?.search,
      juz: options?.juz,
    });
    return models.map((m) => QuranClientMapper.toSurahEntity(m));
  }

  async getSurahDetail(surahNumber: number): Promise<QuranSurah> {
    const model = await this.remoteDataSource.fetchSurahDetail(surahNumber);
    return QuranClientMapper.toSurahEntity(model);
  }

  async getAyah(surahNumber: number, ayahNumber: number): Promise<QuranAyah> {
    const model = await this.remoteDataSource.fetchAyah(surahNumber, ayahNumber);
    return QuranClientMapper.toAyahEntity(model);
  }
}
