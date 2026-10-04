import { z } from "zod";

export const SurahParamSchema = z.object({
  surah: z.coerce.number().int().min(1, "Surah must be between 1 and 114").max(114, "Surah must be between 1 and 114"),
});

export const AyahParamSchema = z.object({
  surah: z.coerce.number().int().min(1, "Surah must be between 1 and 114").max(114, "Surah must be between 1 and 114"),
  ayah: z.coerce.number().int().min(1, "Ayah must be a positive integer"),
});

export const QuranQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  juz: z.coerce.number().int().min(1).max(30).optional(),
});

export const DoaSlugParamSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(120, "Slug too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only alphanumeric characters and hyphens"),
});

export const DoaQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
});

export const ResolveDeepLinkSchema = z.object({
  target: z.string().trim().min(1, "Target is required").max(500, "Target too long"),
  ayah: z.coerce.number().int().positive().optional(),
});
