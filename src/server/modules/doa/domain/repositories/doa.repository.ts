import { DoaEntity } from "../entities/doa.entity";

export interface FindDoaListOptions {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface DoaRepository {
  findAllDoas(options?: FindDoaListOptions): Promise<readonly DoaEntity[]>;
  findBySlug(slug: string): Promise<DoaEntity | null>;
  findById(id: number): Promise<DoaEntity | null>;
}
