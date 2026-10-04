import { DeepLinkRepository } from "../../domain/repositories/deeplink.repository";
import { ResolveDeepLinkRequestDto, ResolveDeepLinkResponseDto } from "../dto/resolve-deeplink.dto";

export class ResolveDeepLinkUseCase {
  constructor(private readonly repository: DeepLinkRepository) {}

  async execute(dto: ResolveDeepLinkRequestDto): Promise<ResolveDeepLinkResponseDto> {
    const resolved = await this.repository.resolveTarget(dto.target, dto.ayah);
    return {
      canonicalUrl: resolved.canonicalUrl,
      appSchemeUrl: resolved.appSchemeUrl,
      fallbackWebUrl: resolved.fallbackWebUrl,
      targetType: resolved.targetType,
      metadata: resolved.metadata,
    };
  }
}
