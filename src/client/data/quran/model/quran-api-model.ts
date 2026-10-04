export interface QuranAyahApiModel {
  readonly number: number;
  readonly arabic: string;
  readonly translation: string;
  readonly audio: {
    readonly alafasy?: string;
    readonly ahmedajamy?: string;
    readonly husarymujawwad?: string;
    readonly minshawi?: string;
    readonly muhammadayyoub?: string;
    readonly muhammadjibreel?: string;
  };
  readonly juz: number;
  readonly page: number;
  readonly surahName: string;
}

export interface QuranSurahApiModel {
  readonly number: number;
  readonly numberOfAyahs: number;
  readonly name: string;
  readonly arabicName: string;
  readonly translation: string;
  readonly revelation: string;
  readonly fullAudioUrl?: string;
  readonly ayahs?: readonly QuranAyahApiModel[];
}
