import { QuranRepository } from "../../domain/repositories/quran.repository";
import { QuranAyahResponseDto } from "../dto/quran-response.dto";
import { NotFoundError } from "@/server/shared/errors/app-error";

export class GetAyahUseCase {
  constructor(private readonly repository: QuranRepository) {}

  async execute(surahNumber: number, ayahNumber: number): Promise<QuranAyahResponseDto> {
    const ayah = await this.repository.findAyah(surahNumber, ayahNumber);
    if (!ayah) {
      throw new NotFoundError(
        `Ayah ${ayahNumber} in surah ${surahNumber} not found`,
        "AYAH_NOT_FOUND"
      );
    }

    return {
      number: ayah.number,
      arabic: ayah.arabic,
      translation: ayah.translation,
      audio: ayah.audio,
      juz: ayah.juz,
      page: ayah.page,
      surahName: ayah.surahName,
    };
  }
}
