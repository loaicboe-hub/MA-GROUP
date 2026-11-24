// Hero background image storage for MA GROUP.
// Completely local and independent — zero external backend dependencies.

import heroFallback from "@/assets/hero.jpg";

const CACHE_KEY = "magroup_hero_image_cache_v2";

export function getCachedHeroImageUrl(): string | null {
  if (typeof window === "undefined") return heroFallback;
  try {
    return window.localStorage.getItem(CACHE_KEY) || heroFallback;
  } catch {
    return heroFallback;
  }
}

export async function getHeroImageUrl(): Promise<string | null> {
  return getCachedHeroImageUrl();
}

export async function uploadHeroImage(file: File): Promise<string | null> {
  if (!file.type.startsWith("image/")) return "Please choose an image file (PNG, JPG or WebP)";
  if (file.size > 8 * 1024 * 1024) return "Image must be smaller than 8 MB";

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(CACHE_KEY, dataUrl);
      }
      resolve(null);
    };
    reader.onerror = () => resolve("Failed to process image");
    reader.readAsDataURL(file);
  });
}

export async function deleteHeroImage(): Promise<string | null> {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CACHE_KEY);
  }
  return null;
}
