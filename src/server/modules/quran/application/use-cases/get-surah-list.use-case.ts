import { QuranRepository, FindSurahListOptions } from "../../domain/repositories/quran.repository";
import { QuranSurahSummaryResponseDto } from "../dto/quran-response.dto";

export class GetSurahListUseCase {
  constructor(private readonly repository: QuranRepository) {}

  async execute(options?: FindSurahListOptions): Promise<QuranSurahSummaryResponseDto[]> {
    const surahs = await this.repository.findAllSurahs(options);
    return surahs.map((s) => ({
      number: s.number,
      numberOfAyahs: s.numberOfAyahs,
      name: s.name,
      arabicName: s.arabicName,
      translation: s.translation,
      revelation: s.revelation,
      fullAudioUrl: s.fullAudioUrl,
    }));
  }
}
