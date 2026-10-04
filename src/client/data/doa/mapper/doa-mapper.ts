import { DoaApiModel } from "../model/doa-api-model";
import { Doa } from "@/client/domain/doa/entity/doa";

export class DoaClientMapper {
  static toEntity(model: DoaApiModel): Doa {
    return {
      id: model.id,
      slug: model.slug,
      title: model.title,
      arabic: model.arabic,
      transliteration: model.transliteration,
      translation: model.translation,
      source: model.source,
      notes: model.notes,
      keywords: model.keywords,
    };
  }
}
