// About Us video storage for MA GROUP.
// Completely local and independent — zero external backend dependencies.

const CACHE_KEY = "magroup_about_video_v1";

export async function getAboutVideoUrl(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CACHE_KEY) || null;
  } catch {
    return null;
  }
}

export async function uploadAboutVideo(file: File): Promise<string | null> {
  if (!file.type.startsWith("video/")) return "Please choose an MP4 or WebM video file.";
  if (file.size > 50 * 1024 * 1024) return "Video is too large. Please keep it under 50 MB.";

  try {
    const url = URL.createObjectURL(file);
    if (typeof window !== "undefined") {
      localStorage.setItem(CACHE_KEY, url);
    }
    return null;
  } catch {
    return "Failed to upload video";
  }
}

export async function deleteAboutVideo(): Promise<string | null> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CACHE_KEY);
  }
  return null;
}
