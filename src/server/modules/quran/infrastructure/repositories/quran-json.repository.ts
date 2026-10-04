import { QuranRepository, FindSurahListOptions } from "../../domain/repositories/quran.repository";
import { QuranSurahEntity } from "../../domain/entities/quran-surah.entity";
import { QuranAyahEntity } from "../../domain/entities/quran-ayah.entity";
import { QuranJsonDataSource } from "../datasource/quran-json.data-source";
import { QuranMapper } from "../mappers/quran.mapper";

export class QuranJsonRepository implements QuranRepository {
  constructor(private readonly dataSource: QuranJsonDataSource) {}

  async findAllSurahs(options?: FindSurahListOptions): Promise<readonly QuranSurahEntity[]> {
    const rawList = await this.dataSource.loadAllSurahs();
    let entities = rawList.map((raw) => QuranMapper.toSurahEntity(raw, false));

    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      entities = entities.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.translation.toLowerCase().includes(q) ||
          String(s.number).includes(q) ||
          s.arabicName.includes(q)
      );
    }

    if (options?.juz) {
      const juzTarget = options.juz;
      const fullList = await this.dataSource.loadAllSurahs();
      const matchedSurahNumbers = new Set<number>();

      fullList.forEach((s) => {
        const hasJuz = s.ayahs?.some((a) => a.meta?.juz === juzTarget);
        if (hasJuz) {
          matchedSurahNumbers.add(s.number);
        }
      });

      entities = entities.filter((s) => matchedSurahNumbers.has(s.number));
    }

    return entities;
  }

  async findSurahByNumber(number: number): Promise<QuranSurahEntity | null> {
    const rawList = await this.dataSource.loadAllSurahs();
    const found = rawList.find((s) => s.number === number);
    if (!found) return null;
    return QuranMapper.toSurahEntity(found, true);
  }

  async findAyah(surahNumber: number, ayahNumber: number): Promise<QuranAyahEntity | null> {
    const surah = await this.findSurahByNumber(surahNumber);
    if (!surah || !surah.ayahs) return null;
    const ayah = surah.ayahs.find((a) => a.number === ayahNumber);
    return ayah ?? null;
  }
}
