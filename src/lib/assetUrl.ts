// src/lib/assetUrl.ts
// export function assetUrl(path: string): string {
//   // Handles "/images/..." or "images/..."
//   const clean = path.replace(/^\//, "");
//   return new URL(clean, import.meta.env.BASE_URL).toString();
// }

// src/lib/assetUrl.ts
export function assetUrl(path: string): string {
    const base = import.meta.env.BASE_URL || "/";
    const b = base.endsWith("/") ? base.slice(0, -1) : base;     // "/rdkc"
    const p = path.startsWith("/") ? path : `/${path}`;          // "/images/..."
    return `${b}${p}`;                                           // "/rdkc/images/..."
  }