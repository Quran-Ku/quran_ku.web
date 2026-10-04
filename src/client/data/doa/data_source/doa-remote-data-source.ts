import { DoaApiModel } from "../model/doa-api-model";

export interface DoaFilterParams {
  search?: string;
}

export interface DoaRemoteDataSource {
  fetchDoaList(params?: DoaFilterParams): Promise<readonly DoaApiModel[]>;
  fetchDoaDetail(slug: string): Promise<DoaApiModel>;
}
