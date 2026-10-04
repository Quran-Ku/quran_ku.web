import { DoaRemoteDataSource, DoaFilterParams } from "./doa-remote-data-source";
import { DoaApiModel } from "../model/doa-api-model";
import { apiClient } from "@/core/http-client/api-client";
import { API_ROUTES } from "@/core/constants/api-routes";

export class DoaRemoteDataSourceImpl implements DoaRemoteDataSource {
  async fetchDoaList(params?: DoaFilterParams): Promise<readonly DoaApiModel[]> {
    const res = await apiClient.get<DoaApiModel[]>(API_ROUTES.DOA, {
      params: {
        search: params?.search,
      },
    });

    if (!res.success) {
      throw new Error(res.error.message || "Failed to fetch Doa list");
    }

    return res.data;
  }

  async fetchDoaDetail(slug: string): Promise<DoaApiModel> {
    const res = await apiClient.get<DoaApiModel>(API_ROUTES.DOA_DETAIL(slug));

    if (!res.success) {
      throw new Error(res.error.message || `Failed to fetch Doa with slug "${slug}"`);
    }

    return res.data;
  }
}
