import { NextRequest } from "next/server";
import { createQuranModule } from "@/server/modules/quran/quran.module";
import { QuranQuerySchema } from "@/server/shared/validation/zod-schemas";
import { createSuccessResponse, createErrorResponse } from "@/server/shared/http/api-response-helper";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const validatedQuery = QuranQuerySchema.parse({
      search: searchParams.get("search") || undefined,
      juz: searchParams.get("juz") || undefined,
    });

    const { getSurahListUseCase } = createQuranModule();
    const data = await getSurahListUseCase.execute({
      search: validatedQuery.search,
      juz: validatedQuery.juz,
    });

    return createSuccessResponse(data);
  } catch (error: unknown) {
    return createErrorResponse(error);
  }
}
