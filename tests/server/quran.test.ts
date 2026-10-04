import { describe, it, expect } from "vitest";
import { createQuranModule } from "@/server/modules/quran/quran.module";
import { NotFoundError } from "@/server/shared/errors/app-error";

describe("Server Quran Module", () => {
  const { getSurahListUseCase, getSurahDetailUseCase, getAyahUseCase } = createQuranModule();

  it("should fetch all 114 surahs", async () => {
    const surahs = await getSurahListUseCase.execute();
    expect(surahs.length).toBe(114);
    expect(surahs[0]?.number).toBe(1);
    expect(surahs[0]?.name).toBe("Al-Fatihah");
    expect(surahs[113]?.number).toBe(114);
    expect(surahs[113]?.name).toBe("An-Nas");
  });

  it("should search surahs by name and meaning", async () => {
    const results = await getSurahListUseCase.execute({ search: "baqarah" });
    expect(results.length).toBe(1);
    expect(results[0]?.number).toBe(2);
    expect(results[0]?.name).toBe("Al-Baqarah");
  });

  it("should fetch Surah detail with Ayahs", async () => {
    const surah1 = await getSurahDetailUseCase.execute(1);
    expect(surah1.number).toBe(1);
    expect(surah1.name).toBe("Al-Fatihah");
    expect(surah1.ayahs.length).toBe(7);
    expect(surah1.ayahs[0]?.arabic).toBe("بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ");
    expect(surah1.ayahs[0]?.number).toBe(1);
  });

  it("should fetch specific Ayah", async () => {
    const ayah = await getAyahUseCase.execute(2, 255); // Ayat Kursi
    expect(ayah.number).toBe(255);
    expect(ayah.surahName).toBe("Al-Baqarah");
    expect(ayah.arabic).toContain("لَآ اِلٰهَ اِلَّا هُوَ");
  });

  it("should throw NotFoundError for invalid surah number", async () => {
    try {
      await getSurahDetailUseCase.execute(999);
      expect.unreachable("Should have thrown NotFoundError");
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(NotFoundError);
      expect((err as NotFoundError).code).toBe("SURAH_NOT_FOUND");
    }
  });
});
