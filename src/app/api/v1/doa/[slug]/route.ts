import { NextRequest } from "next/server";
import { createDoaModule } from "@/server/modules/doa/doa.module";
import { DoaSlugParamSchema } from "@/server/shared/validation/zod-schemas";
import { createSuccessResponse, createErrorResponse } from "@/server/shared/http/api-response-helper";

interface RouteContext {
  params: {
    slug: string;
  };
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const validatedParams = DoaSlugParamSchema.parse({
      slug: context.params.slug,
    });

    const { getDoaDetailUseCase } = createDoaModule();
    const data = await getDoaDetailUseCase.execute(validatedParams.slug);

    return createSuccessResponse(data);
  } catch (error: unknown) {
    return createErrorResponse(error);
  }
}
