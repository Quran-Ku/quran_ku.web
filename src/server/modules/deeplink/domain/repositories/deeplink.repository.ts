import { ResolvedDeepLinkEntity } from "../entities/deeplink.entity";

export interface DeepLinkRepository {
  resolveTarget(target: string, ayah?: number): Promise<ResolvedDeepLinkEntity>;
}
