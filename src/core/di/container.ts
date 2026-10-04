import { Container, Token } from "@needle-di/core";
import { registerClientDependencies } from "./register-client-dependencies";

class AppContainer {
  private static instance: Container | null = null;

  public static getContainer(): Container {
    if (!AppContainer.instance) {
      AppContainer.instance = new Container();
      registerClientDependencies(AppContainer.instance);
    }
    return AppContainer.instance;
  }
}

/**
 * Resolve client dependency using InjectionToken or Token from the central container
 */
export function getService<T>(token: Token<T>): T {
  const container = AppContainer.getContainer();
  return container.get<T>(token);
}
