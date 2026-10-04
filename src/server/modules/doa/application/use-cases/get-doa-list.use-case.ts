import { DoaRepository, FindDoaListOptions } from "../../domain/repositories/doa.repository";
import { DoaResponseDto } from "../dto/doa-response.dto";

export class GetDoaListUseCase {
  constructor(private readonly repository: DoaRepository) {}

  async execute(options?: FindDoaListOptions): Promise<DoaResponseDto[]> {
    const doas = await this.repository.findAllDoas(options);
    return doas.map((d) => ({
      id: d.id,
      slug: d.slug,
      title: d.title,
      arabic: d.arabic,
      transliteration: d.transliteration,
      translation: d.translation,
      source: d.source,
      notes: d.notes,
      keywords: d.keywords,
    }));
  }
}
