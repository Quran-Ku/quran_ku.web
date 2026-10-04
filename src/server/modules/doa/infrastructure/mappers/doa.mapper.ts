import { RawDoaItem } from "../datasource/doa-json.data-source";
import { DoaEntity } from "../../domain/entities/doa.entity";
import { slugify } from "@/core/utils/slug";

export class DoaMapper {
  static toEntity(raw: RawDoaItem, index: number): DoaEntity {
    const rawSlug = slugify(raw.nama);
    const slug = rawSlug || `doa-${index + 1}`;

    return {
      id: index + 1,
      slug,
      title: raw.nama,
      arabic: raw.lafal,
      transliteration: raw.transliterasi,
      translation: raw.arti,
      source: raw.riwayat,
      notes: raw.keterangan,
      keywords: raw.kata_kunci,
    };
  }
}
