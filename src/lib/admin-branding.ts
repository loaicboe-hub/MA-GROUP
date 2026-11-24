// Brand logo and favicon management for MA GROUP.
// Completely local and independent — zero external backend dependencies.

const CACHE_KEY = "magroup_logo_cache_v3";
export const DEFAULT_LOGO_URL = "/logo.png";

type LogoCache = { src: string | null; ts: number };

function readCache(): LogoCache | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as LogoCache) : null;
  } catch {
    return null;
  }
}

/** Last known logo (data URL or path) for instant first paint. */
export function getCachedLogoUrl(): string | null {
  const cached = readCache()?.src;
  return cached ?? DEFAULT_LOGO_URL;
}

/** Dynamically sync browser tab favicon */
export function updateFavicon(url?: string | null) {
  if (typeof document === "undefined") return;
  const targetHref = url || "/favicon.png";
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    document.head.appendChild(link);
  }
  if (link.href !== targetHref) {
    link.href = targetHref;
  }
}

function setCachedLogoUrl(src: string | null) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ src, ts: Date.now() }));
    updateFavicon(src);
  } catch {
    /* ignore quota errors */
  }
}

/** Get current brand logo URL */
export async function getLogoUrl(_force = false): Promise<string | null> {
  return getCachedLogoUrl();
}

/** Convert file to base64 Data URL */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/** Upload (or replace) the brand logo. */
export async function uploadLogo(file: File): Promise<string | null> {
  if (!file.type.startsWith("image/")) return "Please choose an image file (PNG, JPG or SVG)";
  if (file.size > 2 * 1024 * 1024) return "Logo must be smaller than 2 MB";

  try {
    const dataUrl = await readFileAsDataUrl(file);
    setCachedLogoUrl(dataUrl);
    return null;
  } catch {
    return "Failed to process logo file";
  }
}

/** Remove the stored brand logo. */
export async function deleteLogo(): Promise<string | null> {
  setCachedLogoUrl(null);
  return null;
}

/** Fetch stored logo as data URL (used for invoice PDFs). */
export async function getLogoDataUrl(): Promise<string | null> {
  return getCachedLogoUrl();
}
