// Persistent About Us video management for MA GROUP.
// Fully connected to Hostinger server storage and MySQL database.

const API_ENDPOINT = "/api/about-video.php";

export async function getAboutVideoUrl(): Promise<string | null> {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url || null;
  } catch (err) {
    console.warn("Could not fetch about video from server:", err);
    return null;
  }
}

export async function uploadAboutVideo(file: File): Promise<string | null> {
  if (!file.type.startsWith("video/")) {
    return "Please choose an MP4 or WebM video file.";
  }
  if (file.size > 100 * 1024 * 1024) {
    return "Video is too large. Please keep it under 100 MB.";
  }

  try {
    const formData = new FormData();
    formData.append("video", file);

    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      return `Server returned error (${res.status})`;
    }

    const data = await res.json();
    if (!data.success) {
      return data.error || "Failed to upload video to server.";
    }

    return null;
  } catch (err) {
    return `Upload failed: ${err instanceof Error ? err.message : "network error"}`;
  }
}

export async function deleteAboutVideo(): Promise<string | null> {
  try {
    const res = await fetch(`${API_ENDPOINT}?action=delete`, {
      method: "POST",
    });
    if (!res.ok) return "Failed to delete video from server";
    const data = await res.json();
    if (!data.success) return data.error || "Failed to delete video";
    return null;
  } catch (err) {
    return "Network error deleting video";
  }
}
