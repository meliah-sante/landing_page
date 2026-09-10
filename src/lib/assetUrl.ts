export function assetUrl(path: string, baseUrl = import.meta.env?.BASE_URL ?? "/"): string {
  const normalizedBase = `${baseUrl.replace(/\/+$/, "")}/`;
  const normalizedPath = path.replace(/^\/+/, "");

  return `${normalizedBase}${normalizedPath}`;
}
