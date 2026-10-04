import fs from "fs";
import path from "path";

export interface RawQuranAyah {
  readonly arab: string;
  readonly translation: string;
  readonly audio?: {
    readonly alafasy?: string;
    readonly ahmedajamy?: string;
    readonly husarymujawwad?: string;
    readonly minshawi?: string;
    readonly muhammadayyoub?: string;
    readonly muhammadjibreel?: string;
  };
  readonly meta?: {
    readonly juz?: number;
    readonly page?: number;
  };
  readonly adv?: {
    readonly arab?: string;
    readonly id?: string;
    readonly ayah?: number;
  };
}

export interface RawQuranSurah {
  readonly number: number;
  readonly numberOfAyahs: number;
  readonly name: string;
  readonly translation: string;
  readonly revelation: string;
  readonly audio?: string;
  readonly arab?: string;
  readonly ayahs?: readonly RawQuranAyah[];
}

export class QuranJsonDataSource {
  private static cachedData: readonly RawQuranSurah[] | null = null;

  async loadAllSurahs(): Promise<readonly RawQuranSurah[]> {
    if (QuranJsonDataSource.cachedData) {
      return QuranJsonDataSource.cachedData;
    }

    try {
      const filePath = path.join(process.cwd(), "src/server/data/quran.json");
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content) as readonly RawQuranSurah[];
      QuranJsonDataSource.cachedData = parsed;
      return parsed;
    } catch (err: unknown) {
      console.error("Failed to load quran.json data:", err);
      return [];
    }
  }
}
