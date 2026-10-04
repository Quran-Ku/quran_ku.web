import { ResolvedDeepLinkApiModel } from "../model/deeplink-api-model";
import { ResolvedDeepLink } from "@/client/domain/deeplink/entity/deeplink";

export class DeepLinkClientMapper {
  static toEntity(model: ResolvedDeepLinkApiModel): ResolvedDeepLink {
    return {
      canonicalUrl: model.canonicalUrl,
      appSchemeUrl: model.appSchemeUrl,
      fallbackWebUrl: model.fallbackWebUrl,
      targetType: model.targetType,
      metadata: model.metadata,
    };
  }
}
