import { ResolvedDeepLink } from "../entity/deeplink";

export interface DeepLinkRepository {
  resolveDeepLink(target: string, ayah?: number): Promise<ResolvedDeepLink>;
}
