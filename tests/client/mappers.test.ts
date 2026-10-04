import { describe, it, expect } from "vitest";
import { QuranClientMapper } from "@/client/data/quran/mapper/quran-mapper";
import { DoaClientMapper } from "@/client/data/doa/mapper/doa-mapper";
import { DeepLinkClientMapper } from "@/client/data/deeplink/mapper/deeplink-mapper";
import { QuranSurahApiModel } from "@/client/data/quran/model/quran-api-model";
import { DoaApiModel } from "@/client/data/doa/model/doa-api-model";
import { ResolvedDeepLinkApiModel } from "@/client/data/deeplink/model/deeplink-api-model";

describe("Client Data Mappers", () => {
  it("should correctly map QuranSurahApiModel to QuranSurah domain entity", () => {
    const apiModel: QuranSurahApiModel = {
      number: 1,
      numberOfAyahs: 7,
      name: "Al-Fatihah",
      arabicName: "الفاتحة",
      translation: "Pembukaan",
      revelation: "Makkiyah",
      fullAudioUrl: "https://example.com/audio.mp3",
      ayahs: [
        {
          number: 1,
          arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
          translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
          audio: {
            alafasy: "https://example.com/1.mp3",
          },
          juz: 1,
          page: 1,
          surahName: "Al-Fatihah",
        },
      ],
    };

    const entity = QuranClientMapper.toSurahEntity(apiModel);
    expect(entity.number).toBe(1);
    expect(entity.name).toBe("Al-Fatihah");
    expect(entity.ayahs?.length).toBe(1);
    expect(entity.ayahs?.[0]?.audio.alafasy).toBe("https://example.com/1.mp3");
  });

  it("should correctly map DoaApiModel to Doa domain entity", () => {
    const apiModel: DoaApiModel = {
      id: 1,
      slug: "doa-sebelum-tidur",
      title: "Doa Sebelum Tidur",
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا",
      transliteration: "Bismika-llaahumma amuutu wa ahyaa.",
      translation: "Dengan Nama-Mu ya Allah, aku mati dan aku hidup.",
      source: "HR. Bukhari 6324.",
    };

    const entity = DoaClientMapper.toEntity(apiModel);
    expect(entity.id).toBe(1);
    expect(entity.slug).toBe("doa-sebelum-tidur");
    expect(entity.title).toBe("Doa Sebelum Tidur");
  });

  it("should correctly map ResolvedDeepLinkApiModel to ResolvedDeepLink domain entity", () => {
    const apiModel: ResolvedDeepLinkApiModel = {
      canonicalUrl: "https://quran-ku.com/quran/1",
      appSchemeUrl: "quranku://quran-ku.com/quran/1",
      fallbackWebUrl: "/quran/1",
      targetType: "surah",
      metadata: { surahNumber: 1 },
    };

    const entity = DeepLinkClientMapper.toEntity(apiModel);
    expect(entity.appSchemeUrl).toBe("quranku://quran-ku.com/quran/1");
    expect(entity.targetType).toBe("surah");
    expect(entity.metadata.surahNumber).toBe(1);
  });
});
