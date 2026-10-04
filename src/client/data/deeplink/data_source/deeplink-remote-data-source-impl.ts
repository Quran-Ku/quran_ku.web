import { DeepLinkRemoteDataSource, ResolveDeepLinkPayload } from "./deeplink-remote-data-source";
import { ResolvedDeepLinkApiModel } from "../model/deeplink-api-model";
import { apiClient } from "@/core/http-client/api-client";
import { API_ROUTES } from "@/core/constants/api-routes";

export class DeepLinkRemoteDataSourceImpl implements DeepLinkRemoteDataSource {
  async resolveDeepLink(payload: ResolveDeepLinkPayload): Promise<ResolvedDeepLinkApiModel> {
    const res = await apiClient.post<ResolvedDeepLinkApiModel, ResolveDeepLinkPayload>(
      API_ROUTES.RESOLVE_DEEP_LINK,
      { body: payload }
    );

    if (!res.success) {
      throw new Error(res.error.message || "Failed to resolve deep link");
    }

    return res.data;
  }
}
