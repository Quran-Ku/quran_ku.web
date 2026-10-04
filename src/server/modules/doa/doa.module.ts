import { DoaJsonDataSource } from "./infrastructure/datasource/doa-json.data-source";
import { DoaJsonRepository } from "./infrastructure/repositories/doa-json.repository";
import { GetDoaListUseCase } from "./application/use-cases/get-doa-list.use-case";
import { GetDoaDetailUseCase } from "./application/use-cases/get-doa-detail.use-case";

export interface DoaModule {
  readonly getDoaListUseCase: GetDoaListUseCase;
  readonly getDoaDetailUseCase: GetDoaDetailUseCase;
}

let doaModuleInstance: DoaModule | null = null;

export function createDoaModule(): DoaModule {
  if (doaModuleInstance) {
    return doaModuleInstance;
  }

  const dataSource = new DoaJsonDataSource();
  const repository = new DoaJsonRepository(dataSource);

  doaModuleInstance = {
    getDoaListUseCase: new GetDoaListUseCase(repository),
    getDoaDetailUseCase: new GetDoaDetailUseCase(repository),
  };

  return doaModuleInstance;
}
