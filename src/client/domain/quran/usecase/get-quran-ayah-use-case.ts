import { QuranRepository } from "../repository/quran-repository";
import { QuranAyah } from "../entity/quran-ayah";

export class GetQuranAyahUseCase {
  constructor(private readonly repository: QuranRepository) {}

  async execute(surahNumber: number, ayahNumber: number): Promise<QuranAyah> {
    return this.repository.getAyah(surahNumber, ayahNumber);
  }
}
