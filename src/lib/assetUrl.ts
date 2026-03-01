// src/lib/assetUrl.ts
export function assetUrl(path: string): string {
  // Handles "/images/..." or "images/..."
  const clean = path.replace(/^\//, "");
  return new URL(clean, import.meta.env.BASE_URL).toString();
}