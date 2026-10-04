import { DoaRepository, FindDoaListOptions } from "../../domain/repositories/doa.repository";
import { DoaEntity } from "../../domain/entities/doa.entity";
import { DoaJsonDataSource } from "../datasource/doa-json.data-source";
import { DoaMapper } from "../mappers/doa.mapper";

export class DoaJsonRepository implements DoaRepository {
  constructor(private readonly dataSource: DoaJsonDataSource) {}

  async findAllDoas(options?: FindDoaListOptions): Promise<readonly DoaEntity[]> {
    const rawList = await this.dataSource.loadAllDoas();
    let entities = rawList.map((raw, idx) => DoaMapper.toEntity(raw, idx));

    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      entities = entities.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.translation.toLowerCase().includes(q) ||
          d.transliteration.toLowerCase().includes(q) ||
          (d.keywords && d.keywords.some((k) => k.toLowerCase().includes(q)))
      );
    }

    if (options?.offset !== undefined || options?.limit !== undefined) {
      const offset = options.offset ?? 0;
      const limit = options.limit ?? entities.length;
      entities = entities.slice(offset, offset + limit);
    }

    return entities;
  }

  async findBySlug(slug: string): Promise<DoaEntity | null> {
    const all = await this.findAllDoas();
    const found = all.find((d) => d.slug === slug);
    return found ?? null;
  }

  async findById(id: number): Promise<DoaEntity | null> {
    const all = await this.findAllDoas();
    const found = all.find((d) => d.id === id);
    return found ?? null;
  }
}
