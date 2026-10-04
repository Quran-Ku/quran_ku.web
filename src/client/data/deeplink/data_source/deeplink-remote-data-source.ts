import { ResolvedDeepLinkApiModel } from "../model/deeplink-api-model";

export interface ResolveDeepLinkPayload {
  target: string;
  ayah?: number;
}

export interface DeepLinkRemoteDataSource {
  resolveDeepLink(payload: ResolveDeepLinkPayload): Promise<ResolvedDeepLinkApiModel>;
}
