import { Doa } from "../entity/doa";

export interface DoaFilterOptions {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface DoaRepository {
  getDoaList(options?: DoaFilterOptions): Promise<readonly Doa[]>;
  getDoaDetail(slug: string): Promise<Doa>;
}
