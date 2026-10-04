import { DeepLinkRepository } from "../repository/deeplink-repository";
import { ResolvedDeepLink } from "../entity/deeplink";

export class ResolveDeepLinkUseCase {
  constructor(private readonly repository: DeepLinkRepository) {}

  async execute(target: string, ayah?: number): Promise<ResolvedDeepLink> {
    return this.repository.resolveDeepLink(target, ayah);
  }
}
