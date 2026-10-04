import { QuranRepository } from "../../domain/repositories/quran.repository";
import { QuranSurahDetailResponseDto } from "../dto/quran-response.dto";
import { NotFoundError } from "@/server/shared/errors/app-error";

export class GetSurahDetailUseCase {
  constructor(private readonly repository: QuranRepository) {}

  async execute(surahNumber: number): Promise<QuranSurahDetailResponseDto> {
    const surah = await this.repository.findSurahByNumber(surahNumber);
    if (!surah) {
      throw new NotFoundError(`Surah with number ${surahNumber} not found`, "SURAH_NOT_FOUND");
    }

    return {
      number: surah.number,
      numberOfAyahs: surah.numberOfAyahs,
      name: surah.name,
      arabicName: surah.arabicName,
      translation: surah.translation,
      revelation: surah.revelation,
      fullAudioUrl: surah.fullAudioUrl,
      ayahs: (surah.ayahs || []).map((a) => ({
        number: a.number,
        arabic: a.arabic,
        translation: a.translation,
        audio: a.audio,
        juz: a.juz,
        page: a.page,
        surahName: a.surahName,
      })),
    };
  }
}
