import { describe, it, expect } from "vitest";
import {
  SurahParamSchema,
  AyahParamSchema,
  DoaSlugParamSchema,
  ResolveDeepLinkSchema,
} from "@/server/shared/validation/zod-schemas";

describe("Server Zod Validation Schemas", () => {
  it("should validate valid surah range (1-114)", () => {
    expect(SurahParamSchema.safeParse({ surah: 1 }).success).toBe(true);
    expect(SurahParamSchema.safeParse({ surah: 114 }).success).toBe(true);
    expect(SurahParamSchema.safeParse({ surah: "55" }).success).toBe(true);

    expect(SurahParamSchema.safeParse({ surah: 0 }).success).toBe(false);
    expect(SurahParamSchema.safeParse({ surah: 115 }).success).toBe(false);
    expect(SurahParamSchema.safeParse({ surah: "abc" }).success).toBe(false);
  });

  it("should validate valid ayah range", () => {
    expect(AyahParamSchema.safeParse({ surah: 2, ayah: 255 }).success).toBe(true);
    expect(AyahParamSchema.safeParse({ surah: 1, ayah: 7 }).success).toBe(true);

    expect(AyahParamSchema.safeParse({ surah: 1, ayah: 0 }).success).toBe(false);
    expect(AyahParamSchema.safeParse({ surah: 1, ayah: -5 }).success).toBe(false);
  });

  it("should validate clean doa slugs", () => {
    expect(DoaSlugParamSchema.safeParse({ slug: "doa-sebelum-tidur" }).success).toBe(true);
    expect(DoaSlugParamSchema.safeParse({ slug: "doa-123" }).success).toBe(true);

    expect(DoaSlugParamSchema.safeParse({ slug: "invalid slug with spaces" }).success).toBe(false);
    expect(DoaSlugParamSchema.safeParse({ slug: "../path/traversal" }).success).toBe(false);
  });

  it("should validate deep link resolution payload", () => {
    expect(ResolveDeepLinkSchema.safeParse({ target: "/quran/1" }).success).toBe(true);
    expect(ResolveDeepLinkSchema.safeParse({ target: "" }).success).toBe(false);
  });
});
