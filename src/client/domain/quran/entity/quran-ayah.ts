import { ReciterId } from "./reciter";

export interface QuranAyah {
  readonly number: number;
  readonly arabic: string;
  readonly translation: string;
  readonly audio: Partial<Record<ReciterId, string>>;
  readonly juz: number;
  readonly page: number;
  readonly surahName: string;
}
