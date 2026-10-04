import { NextRequest } from "next/server";
import { createQuranModule } from "@/server/modules/quran/quran.module";
import { AyahParamSchema } from "@/server/shared/validation/zod-schemas";
import { createSuccessResponse, createErrorResponse } from "@/server/shared/http/api-response-helper";

interface RouteContext {
  params: {
    surah: string;
    ayah: string;
  };
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const validatedParams = AyahParamSchema.parse({
      surah: context.params.surah,
      ayah: context.params.ayah,
    });

    const { getAyahUseCase } = createQuranModule();
    const data = await getAyahUseCase.execute(validatedParams.surah, validatedParams.ayah);

    return createSuccessResponse(data);
  } catch (error: unknown) {
    return createErrorResponse(error);
  }
}
