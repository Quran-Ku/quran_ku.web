/**
 * Formats a number into eastern Arabic-Indic numerals (e.g. 1 -> ١)
 */
export function toArabicDigits(num: number | string): string {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num).replace(/[0-9]/g, (w) => arabicDigits[+w] ?? w);
}

/**
 * Format Ayah number with ornamental circle or standard format
 */
export function formatAyahNumber(num: number | string): string {
  return String(num).padStart(2, "0");
}
