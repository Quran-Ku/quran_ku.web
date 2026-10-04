import { DeepLinkRepositoryImpl } from "./infrastructure/repositories/deeplink.repository-impl";
import { ResolveDeepLinkUseCase } from "./application/use-cases/resolve-deeplink.use-case";

export interface DeepLinkModule {
  readonly resolveDeepLinkUseCase: ResolveDeepLinkUseCase;
}

let deepLinkModuleInstance: DeepLinkModule | null = null;

export function createDeepLinkModule(): DeepLinkModule {
  if (deepLinkModuleInstance) {
    return deepLinkModuleInstance;
  }

  const repository = new DeepLinkRepositoryImpl();

  deepLinkModuleInstance = {
    resolveDeepLinkUseCase: new ResolveDeepLinkUseCase(repository),
  };

  return deepLinkModuleInstance;
}
