export interface QuranReciterAudio {
  readonly alafasy?: string;
  readonly ahmedajamy?: string;
  readonly husarymujawwad?: string;
  readonly minshawi?: string;
  readonly muhammadayyoub?: string;
  readonly muhammadjibreel?: string;
}

export interface QuranAyahEntity {
  readonly number: number;
  readonly arabic: string;
  readonly translation: string;
  readonly audio: QuranReciterAudio;
  readonly juz: number;
  readonly page: number;
  readonly surahName: string;
}
