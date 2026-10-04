import { QuranSurahApiModel, QuranAyahApiModel } from "../model/quran-api-model";
import { QuranSurah } from "@/client/domain/quran/entity/quran-surah";
import { QuranAyah } from "@/client/domain/quran/entity/quran-ayah";

export class QuranClientMapper {
  static toAyahEntity(model: QuranAyahApiModel): QuranAyah {
    return {
      number: model.number,
      arabic: model.arabic,
      translation: model.translation,
      audio: {
        alafasy: model.audio?.alafasy,
        ahmedajamy: model.audio?.ahmedajamy,
        husarymujawwad: model.audio?.husarymujawwad,
        minshawi: model.audio?.minshawi,
        muhammadayyoub: model.audio?.muhammadayyoub,
        muhammadjibreel: model.audio?.muhammadjibreel,
      },
      juz: model.juz,
      page: model.page,
      surahName: model.surahName,
    };
  }

  static toSurahEntity(model: QuranSurahApiModel): QuranSurah {
    return {
      number: model.number,
      numberOfAyahs: model.numberOfAyahs,
      name: model.name,
      arabicName: model.arabicName,
      translation: model.translation,
      revelation: model.revelation,
      fullAudioUrl: model.fullAudioUrl,
      ayahs: model.ayahs ? model.ayahs.map(this.toAyahEntity) : undefined,
    };
  }
}
