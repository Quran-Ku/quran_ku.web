import { DoaRepository } from "../../domain/repositories/doa.repository";
import { DoaResponseDto } from "../dto/doa-response.dto";
import { NotFoundError } from "@/server/shared/errors/app-error";

export class GetDoaDetailUseCase {
  constructor(private readonly repository: DoaRepository) {}

  async execute(slug: string): Promise<DoaResponseDto> {
    const doa = await this.repository.findBySlug(slug);
    if (!doa) {
      throw new NotFoundError(`Doa with slug "${slug}" not found`, "DOA_NOT_FOUND");
    }

    return {
      id: doa.id,
      slug: doa.slug,
      title: doa.title,
      arabic: doa.arabic,
      transliteration: doa.transliteration,
      translation: doa.translation,
      source: doa.source,
      notes: doa.notes,
      keywords: doa.keywords,
    };
  }
}
