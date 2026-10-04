import { describe, it, expect } from "vitest";
import { createDoaModule } from "@/server/modules/doa/doa.module";
import { NotFoundError } from "@/server/shared/errors/app-error";

describe("Server Doa Module", () => {
  const { getDoaListUseCase, getDoaDetailUseCase } = createDoaModule();

  it("should fetch all daily prayers from doa.json", async () => {
    const doas = await getDoaListUseCase.execute();
    expect(doas.length).toBeGreaterThan(100);
    expect(doas[0]?.title).toBe("Doa Sebelum Tidur");
    expect(doas[0]?.slug).toBe("doa-sebelum-tidur");
  });

  it("should search Doas by keyword or name", async () => {
    const results = await getDoaListUseCase.execute({ search: "tidur" });
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(results.some((d) => d.title.includes("Tidur"))).toBe(true);
  });

  it("should retrieve specific Doa by slug", async () => {
    const doa = await getDoaDetailUseCase.execute("doa-sebelum-tidur");
    expect(doa.title).toBe("Doa Sebelum Tidur");
    expect(doa.arabic).toContain("بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا");
    expect(doa.source).toContain("HR. Bukhari");
  });

  it("should throw NotFoundError for invalid doa slug", async () => {
    try {
      await getDoaDetailUseCase.execute("doa-tidak-ada-xyz");
      expect.unreachable("Should have thrown NotFoundError");
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(NotFoundError);
      expect((err as NotFoundError).code).toBe("DOA_NOT_FOUND");
    }
  });
});
