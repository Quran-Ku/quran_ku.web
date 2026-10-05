import { MetadataRoute } from "next";
import { APP_CONFIG } from "@/core/constants/app-config";
import { createQuranModule } from "@/server/modules/quran/quran.module";
import { createDoaModule } from "@/server/modules/doa/doa.module";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APP_CONFIG.canonicalUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/quran`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/doa`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms-and-condition`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const { getSurahListUseCase } = createQuranModule();
    const surahs = await getSurahListUseCase.execute();
    const surahRoutes: MetadataRoute.Sitemap = surahs.map((s) => ({
      url: `${baseUrl}/quran/${s.number}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const { getDoaListUseCase } = createDoaModule();
    const doas = await getDoaListUseCase.execute();
    const doaRoutes: MetadataRoute.Sitemap = doas.map((d) => ({
      url: `${baseUrl}/doa/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...surahRoutes, ...doaRoutes];
  } catch {
    return staticRoutes;
  }
}
