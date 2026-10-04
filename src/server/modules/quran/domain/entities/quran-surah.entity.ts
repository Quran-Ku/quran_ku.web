import { QuranAyahEntity } from "./quran-ayah.entity";

export interface QuranSurahEntity {
  readonly number: number;
  readonly numberOfAyahs: number;
  readonly name: string;
  readonly arabicName: string;
  readonly translation: string;
  readonly revelation: "Makkiyah" | "Madaniyah" | string;
  readonly fullAudioUrl?: string;
  readonly ayahs?: readonly QuranAyahEntity[];
}
