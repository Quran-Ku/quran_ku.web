import { DeepLinkRepository } from "@/client/domain/deeplink/repository/deeplink-repository";
import { ResolvedDeepLink } from "@/client/domain/deeplink/entity/deeplink";
import { DeepLinkRemoteDataSource } from "../data_source/deeplink-remote-data-source";
import { DeepLinkClientMapper } from "../mapper/deeplink-mapper";

export class DeepLinkRepositoryImpl implements DeepLinkRepository {
  constructor(private readonly remoteDataSource: DeepLinkRemoteDataSource) {}

  async resolveDeepLink(target: string, ayah?: number): Promise<ResolvedDeepLink> {
    const model = await this.remoteDataSource.resolveDeepLink({ target, ayah });
    return DeepLinkClientMapper.toEntity(model);
  }
}
