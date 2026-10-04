import { NextRequest } from "next/server";
import { createDeepLinkModule } from "@/server/modules/deeplink/deeplink.module";
import { ResolveDeepLinkSchema } from "@/server/shared/validation/zod-schemas";
import { createSuccessResponse, createErrorResponse } from "@/server/shared/http/api-response-helper";

export async function POST(request: NextRequest) {
  try {
    const json = (await request.json()) as unknown;
    const validatedBody = ResolveDeepLinkSchema.parse(json);

    const { resolveDeepLinkUseCase } = createDeepLinkModule();
    const data = await resolveDeepLinkUseCase.execute({
      target: validatedBody.target,
      ayah: validatedBody.ayah,
    });

    return createSuccessResponse(data);
  } catch (error: unknown) {
    return createErrorResponse(error);
  }
}
