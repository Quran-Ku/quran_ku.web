export type ReciterId =
  | "alafasy"
  | "ahmedajamy"
  | "husarymujawwad"
  | "minshawi"
  | "muhammadayyoub"
  | "muhammadjibreel";

export interface ReciterInfo {
  readonly id: ReciterId;
  readonly name: string;
  readonly arabicName: string;
}

export const AVAILABLE_RECITERS: readonly ReciterInfo[] = [
  { id: "alafasy", name: "Mishari Rashid al-`Afasy", arabicName: "مشاري راشد العفاسي" },
  { id: "ahmedajamy", name: "Ahmed ibn Ali al-Ajamy", arabicName: "أحمد بن علي العجمي" },
  { id: "husarymujawwad", name: "Mahmoud Khalil Al-Husary", arabicName: "محمود خليل الحصري" },
  { id: "minshawi", name: "Mohamed Siddiq El-Minshawi", arabicName: "محمد صديق المنشاوي" },
  { id: "muhammadayyoub", name: "Muhammad Ayyub", arabicName: "محمد أيوب" },
  { id: "muhammadjibreel", name: "Muhammad Jibreel", arabicName: "محمد جبريل" },
] as const;
