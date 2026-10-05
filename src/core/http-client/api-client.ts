import { ApiResponse } from "@/core/types/api-response";

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export interface PostRequestOptions<TBody> extends RequestOptions {
  body?: TBody;
}

export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || "") {
    this.baseUrl = baseUrl;
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const fullUrl = this.baseUrl ? `${this.baseUrl}${endpoint}` : endpoint;
    if (!params) return fullUrl;

    const fallbackOrigin =
      process.env.NEXT_PUBLIC_APP_URL || "https://quran-ku.com";
    const url = new URL(
      fullUrl,
      typeof window !== "undefined" ? window.location.origin : fallbackOrigin
    );

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.pathname + url.search;
  }

  async get<TResponse>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<TResponse>> {
    try {
      const url = this.buildUrl(endpoint, options?.params);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...options?.headers,
        },
        cache: options?.cache ?? "default",
        next: options?.next,
      });

      const json = (await res.json()) as ApiResponse<TResponse>;
      return json;
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected network error occurred.";
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message,
        },
      };
    }
  }

  async post<TResponse, TBody = unknown>(
    endpoint: string,
    options?: PostRequestOptions<TBody>
  ): Promise<ApiResponse<TResponse>> {
    try {
      const url = this.buildUrl(endpoint, options?.params);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...options?.headers,
        },
        body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
      });

      const json = (await res.json()) as ApiResponse<TResponse>;
      return json;
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected network error occurred.";
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message,
        },
      };
    }
  }
}

export const apiClient = new ApiClient();
