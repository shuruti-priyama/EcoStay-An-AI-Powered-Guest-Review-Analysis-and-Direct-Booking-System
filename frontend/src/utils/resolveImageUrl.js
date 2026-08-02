export function resolveImageUrl(path) {
  if (!path) return path;
  if (/^(https?:|blob:|data:)/i.test(path)) return path;

  const base = import.meta.env.VITE_API_URL || '';
  return `${base}${path}`;
}