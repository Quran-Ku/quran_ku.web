import { QuranReciterAudio } from "../../domain/entities/quran-ayah.entity";

export interface QuranAyahResponseDto {
  readonly number: number;
  readonly arabic: string;
  readonly translation: string;
  readonly audio: QuranReciterAudio;
  readonly juz: number;
  readonly page: number;
  readonly surahName: string;
}

export interface QuranSurahSummaryResponseDto {
  readonly number: number;
  readonly numberOfAyahs: number;
  readonly name: string;
  readonly arabicName: string;
  readonly translation: string;
  readonly revelation: string;
  readonly fullAudioUrl?: string;
}

export interface QuranSurahDetailResponseDto extends QuranSurahSummaryResponseDto {
  readonly ayahs: readonly QuranAyahResponseDto[];
}
