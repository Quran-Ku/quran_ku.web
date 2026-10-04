import { QuranJsonDataSource } from "./infrastructure/datasource/quran-json.data-source";
import { QuranJsonRepository } from "./infrastructure/repositories/quran-json.repository";
import { GetSurahListUseCase } from "./application/use-cases/get-surah-list.use-case";
import { GetSurahDetailUseCase } from "./application/use-cases/get-surah-detail.use-case";
import { GetAyahUseCase } from "./application/use-cases/get-ayah.use-case";

export interface QuranModule {
  readonly getSurahListUseCase: GetSurahListUseCase;
  readonly getSurahDetailUseCase: GetSurahDetailUseCase;
  readonly getAyahUseCase: GetAyahUseCase;
}

let quranModuleInstance: QuranModule | null = null;

export function createQuranModule(): QuranModule {
  if (quranModuleInstance) {
    return quranModuleInstance;
  }

  const dataSource = new QuranJsonDataSource();
  const repository = new QuranJsonRepository(dataSource);

  quranModuleInstance = {
    getSurahListUseCase: new GetSurahListUseCase(repository),
    getSurahDetailUseCase: new GetSurahDetailUseCase(repository),
    getAyahUseCase: new GetAyahUseCase(repository),
  };

  return quranModuleInstance;
}
