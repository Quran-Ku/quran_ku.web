import { NextRequest } from "next/server";
import { createDoaModule } from "@/server/modules/doa/doa.module";
import { DoaQuerySchema } from "@/server/shared/validation/zod-schemas";
import { createSuccessResponse, createErrorResponse } from "@/server/shared/http/api-response-helper";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const validatedQuery = DoaQuerySchema.parse({
      search: searchParams.get("search") || undefined,
    });

    const { getDoaListUseCase } = createDoaModule();
    const data = await getDoaListUseCase.execute({
      search: validatedQuery.search,
    });

    return createSuccessResponse(data);
  } catch (error: unknown) {
    return createErrorResponse(error);
  }
}
