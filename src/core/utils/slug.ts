/**
 * Convert any string title to a URL-safe, lowercase slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with single dash
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing dashes
}

/**
 * Validate that a slug contains only safe characters
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== "string") return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
