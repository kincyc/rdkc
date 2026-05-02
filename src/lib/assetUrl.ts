export function assetUrl(path: string): string {
  if (!path) return path;

  // Leave fully-qualified and special protocol URLs untouched.
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path
    .replace(/^\.\//, "")
    .replace(/^\//, "");

  return `${normalizedBase}${normalizedPath}`;
}
