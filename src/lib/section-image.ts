// Section background images storage for MA GROUP.
// Completely local and independent — zero external backend dependencies.

const CACHE_KEY = "magroup_section_images_v1";

function getAll(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function getSectionImageUrl(key: string): Promise<string | null> {
  const all = getAll();
  return all[key] || null;
}

export async function uploadSectionImage(key: string, file: File): Promise<string | null> {
  if (!file.type.startsWith("image/")) return "Please choose an image file (PNG, JPG or WebP)";
  if (file.size > 8 * 1024 * 1024) return "Image must be smaller than 8 MB";

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const all = getAll();
      all[key] = dataUrl;
      if (typeof window !== "undefined") {
        localStorage.setItem(CACHE_KEY, JSON.stringify(all));
      }
      resolve(null);
    };
    reader.onerror = () => resolve("Failed to process image");
    reader.readAsDataURL(file);
  });
}

export async function deleteSectionImage(key: string): Promise<string | null> {
  const all = getAll();
  delete all[key];
  if (typeof window !== "undefined") {
    localStorage.setItem(CACHE_KEY, JSON.stringify(all));
  }
  return null;
}
