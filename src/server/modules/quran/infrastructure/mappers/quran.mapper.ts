import { RawQuranSurah, RawQuranAyah } from "../datasource/quran-json.data-source";
import { QuranSurahEntity } from "../../domain/entities/quran-surah.entity";
import { QuranAyahEntity } from "../../domain/entities/quran-ayah.entity";

export class QuranMapper {
  static toAyahEntity(raw: RawQuranAyah, index: number, surahName: string): QuranAyahEntity {
    return {
      number: raw.adv?.ayah ?? index + 1,
      arabic: raw.arab,
      translation: raw.translation,
      audio: {
        alafasy: raw.audio?.alafasy,
        ahmedajamy: raw.audio?.ahmedajamy,
        husarymujawwad: raw.audio?.husarymujawwad,
        minshawi: raw.audio?.minshawi,
        muhammadayyoub: raw.audio?.muhammadayyoub,
        muhammadjibreel: raw.audio?.muhammadjibreel,
      },
      juz: raw.meta?.juz ?? 1,
      page: raw.meta?.page ?? 1,
      surahName: raw.adv?.id ?? surahName,
    };
  }

  static toSurahEntity(raw: RawQuranSurah, includeAyahs: boolean = true): QuranSurahEntity {
    const ayahs = includeAyahs && raw.ayahs
      ? raw.ayahs.map((a, i) => this.toAyahEntity(a, i, raw.name))
      : undefined;

    return {
      number: raw.number,
      numberOfAyahs: raw.numberOfAyahs,
      name: raw.name,
      arabicName: raw.arab ?? (raw.ayahs?.[0]?.adv?.arab ?? ""),
      translation: raw.translation,
      revelation: raw.revelation,
      fullAudioUrl: raw.audio,
      ayahs,
    };
  }
}
