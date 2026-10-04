import { QuranRepository, QuranFilterOptions } from "../repository/quran-repository";
import { QuranSurah } from "../entity/quran-surah";

export class GetQuranSurahListUseCase {
  constructor(private readonly repository: QuranRepository) {}

  async execute(options?: QuranFilterOptions): Promise<readonly QuranSurah[]> {
    return this.repository.getSurahList(options);
  }
}
