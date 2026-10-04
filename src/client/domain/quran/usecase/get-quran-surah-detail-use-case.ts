import { QuranRepository } from "../repository/quran-repository";
import { QuranSurah } from "../entity/quran-surah";

export class GetQuranSurahDetailUseCase {
  constructor(private readonly repository: QuranRepository) {}

  async execute(surahNumber: number): Promise<QuranSurah> {
    return this.repository.getSurahDetail(surahNumber);
  }
}
