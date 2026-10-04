export interface Doa {
  readonly id: number;
  readonly slug: string;
  readonly title: string;
  readonly arabic: string;
  readonly transliteration: string;
  readonly translation: string;
  readonly source: string;
  readonly notes?: readonly string[];
  readonly keywords?: readonly string[];
}
