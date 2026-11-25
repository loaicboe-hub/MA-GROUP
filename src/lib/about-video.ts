// Persistent about video storage for MA GROUP.
// Connects to Hostinger server storage and MySQL database via /api/about-video.php.
// Removes temporary blob URL and localStorage dependencies so it works across all devices and incognito mode.

const API_ENDPOINT = '/api/about-video.php';
const DEFAULT_VIDEO_URL = '/uploads/videos/about-video-1795535555.mp4';

export async function getAboutVideoUrl(): Promise<string | null> {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    if (!res.ok) return DEFAULT_VIDEO_URL;
    const data = await res.json();
    return data && data.success && data.url ? data.url : DEFAULT_VIDEO_URL;
  } catch (err) {
    console.warn('Failed to fetch persistent about video URL:', err);
    return DEFAULT_VIDEO_URL;
  }
}

export async function uploadAboutVideo(file: File): Promise<string | null> {
  if (!file.type.startsWith('video/')) {
    return 'Please choose a valid video file (MP4, WebM, OGG, MOV)';
  }
  if (file.size > 100 * 1024 * 1024) {
    return 'Video must be smaller than 100 MB';
  }

  const formData = new FormData();
  formData.append('video', file);

  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return data.error || 'Failed to upload video to server';
    }

    return null;
  } catch (err) {
    console.error('Video upload request failed:', err);
    return 'Network error while uploading video to server';
  }
}

export async function deleteAboutVideo(): Promise<string | null> {
  try {
    const res = await fetch(`${API_ENDPOINT}?action=delete`, {
      method: 'POST',
      headers: { 'Accept': 'application/json' }
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return data.error || 'Failed to remove video from server';
    }
    return null;
  } catch (err) {
    console.error('Failed to delete video:', err);
    return 'Network error while removing video';
  }
}
