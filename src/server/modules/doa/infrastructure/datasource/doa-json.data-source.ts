import fs from "fs";
import path from "path";

export interface RawDoaItem {
  readonly nama: string;
  readonly lafal: string;
  readonly transliterasi: string;
  readonly arti: string;
  readonly riwayat: string;
  readonly keterangan?: readonly string[];
  readonly kata_kunci?: readonly string[];
}

export class DoaJsonDataSource {
  private static cachedData: readonly RawDoaItem[] | null = null;

  async loadAllDoas(): Promise<readonly RawDoaItem[]> {
    if (DoaJsonDataSource.cachedData) {
      return DoaJsonDataSource.cachedData;
    }

    try {
      const filePath = path.join(process.cwd(), "src/server/data/doa.json");
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content) as readonly RawDoaItem[];
      DoaJsonDataSource.cachedData = parsed;
      return parsed;
    } catch (err: unknown) {
      console.error("Failed to load doa.json data:", err);
      return [];
    }
  }
}
