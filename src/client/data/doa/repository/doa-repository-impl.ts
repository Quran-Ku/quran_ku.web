import { DoaRepository, DoaFilterOptions } from "@/client/domain/doa/repository/doa-repository";
import { Doa } from "@/client/domain/doa/entity/doa";
import { DoaRemoteDataSource } from "../data_source/doa-remote-data-source";
import { DoaClientMapper } from "../mapper/doa-mapper";

export class DoaRepositoryImpl implements DoaRepository {
  constructor(private readonly remoteDataSource: DoaRemoteDataSource) {}

  async getDoaList(options?: DoaFilterOptions): Promise<readonly Doa[]> {
    const models = await this.remoteDataSource.fetchDoaList({
      search: options?.search,
    });
    return models.map(DoaClientMapper.toEntity);
  }

  async getDoaDetail(slug: string): Promise<Doa> {
    const model = await this.remoteDataSource.fetchDoaDetail(slug);
    return DoaClientMapper.toEntity(model);
  }
}
