import { describe, it, expect } from "vitest";
import { createDeepLinkModule } from "@/server/modules/deeplink/deeplink.module";
import { InvalidDeepLinkError } from "@/server/shared/errors/app-error";

describe("Server DeepLink Module", () => {
  const { resolveDeepLinkUseCase } = createDeepLinkModule();

  it("should resolve root home deep link", async () => {
    const res = await resolveDeepLinkUseCase.execute({ target: "/" });
    expect(res.targetType).toBe("home");
    expect(res.appSchemeUrl).toBe("quranku://quran-ku.com");
    expect(res.fallbackWebUrl).toBe("/");
  });

  it("should resolve Surah 2 deep link", async () => {
    const res = await resolveDeepLinkUseCase.execute({ target: "/quran/2" });
    expect(res.targetType).toBe("surah");
    expect(res.metadata.surahNumber).toBe(2);
    expect(res.appSchemeUrl).toBe("quranku://quran-ku.com/quran/2");
    expect(res.fallbackWebUrl).toBe("/quran/2");
  });

  it("should resolve Surah 2 Ayah 255 deep link", async () => {
    const res = await resolveDeepLinkUseCase.execute({ target: "/quran/2/255" });
    expect(res.targetType).toBe("ayah");
    expect(res.metadata.surahNumber).toBe(2);
    expect(res.metadata.ayahNumber).toBe(255);
    expect(res.appSchemeUrl).toBe("quranku://quran-ku.com/quran/2?ayah=255");
    expect(res.fallbackWebUrl).toBe("/quran/2?ayah=255");
  });

  it("should resolve Doa detail deep link", async () => {
    const res = await resolveDeepLinkUseCase.execute({ target: "/doa/doa-sebelum-tidur" });
    expect(res.targetType).toBe("doa_detail");
    expect(res.metadata.doaSlug).toBe("doa-sebelum-tidur");
    expect(res.appSchemeUrl).toBe("quranku://quran-ku.com/doa/doa-sebelum-tidur");
    expect(res.fallbackWebUrl).toBe("/doa/doa-sebelum-tidur");
  });

  it("should reject malicious javascript: deep link targets", async () => {
    try {
      await resolveDeepLinkUseCase.execute({ target: "javascript:alert(1)" });
      expect.unreachable("Should have thrown InvalidDeepLinkError");
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(InvalidDeepLinkError);
      expect((err as InvalidDeepLinkError).code).toBe("INVALID_DEEP_LINK");
    }
  });

  it("should reject foreign external domains to prevent open redirect", async () => {
    try {
      await resolveDeepLinkUseCase.execute({ target: "https://attacker.com/steal" });
      expect.unreachable("Should have thrown InvalidDeepLinkError");
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(InvalidDeepLinkError);
      expect((err as InvalidDeepLinkError).code).toBe("INVALID_DEEP_LINK");
    }
  });
});
