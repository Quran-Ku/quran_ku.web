import { NextRequest } from "next/server";
import { createQuranModule } from "@/server/modules/quran/quran.module";
import { SurahParamSchema } from "@/server/shared/validation/zod-schemas";
import { createSuccessResponse, createErrorResponse } from "@/server/shared/http/api-response-helper";

interface RouteContext {
  params: {
    surah: string;
  };
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const validatedParams = SurahParamSchema.parse({
      surah: context.params.surah,
    });

    const { getSurahDetailUseCase } = createQuranModule();
    const data = await getSurahDetailUseCase.execute(validatedParams.surah);

    return createSuccessResponse(data);
  } catch (error: unknown) {
    return createErrorResponse(error);
  }
}
