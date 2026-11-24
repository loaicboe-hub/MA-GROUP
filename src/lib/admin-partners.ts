// Partners storage for MA GROUP.
// Completely local and independent — zero external backend dependencies.

export type Partner = {
  id: string;
  name: string;
  logo: string;
  logoPath: string;
  url?: string;
  enabled: boolean;
  sortOrder: number;
};

export const PARTNERS_EVENT = "magroup:partners";

export function blankPartner(sortOrder = 1): Partner {
  return {
    id: "",
    name: "",
    logo: "",
    logoPath: "",
    url: "",
    enabled: true,
    sortOrder,
  };
}

function notify() {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(PARTNERS_EVENT));
}

const PARTNERS_KEY = "magroup_partners_v1";

function getStoredPartners(): Partner[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PARTNERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredPartners(partners: Partner[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PARTNERS_KEY, JSON.stringify(partners));
  } catch {
    // Ignore quota errors
  }
}

export async function listPartners(onlyEnabled = false): Promise<Partner[]> {
  const list = getStoredPartners().sort((a, b) => a.sortOrder - b.sortOrder);
  return onlyEnabled ? list.filter((p) => p.enabled) : list;
}

export async function savePartner(p: Partner): Promise<string | null> {
  const list = getStoredPartners();
  const payload: Partner = {
    ...p,
    id: p.id || `partner-${Date.now()}`,
  };

  const idx = list.findIndex((x) => x.id === payload.id);
  if (idx !== -1) {
    list[idx] = payload;
  } else {
    list.push(payload);
  }
  saveStoredPartners(list);
  notify();
  return null;
}

export async function deletePartner(id: string): Promise<string | null> {
  const list = getStoredPartners().filter((p) => p.id !== id);
  saveStoredPartners(list);
  notify();
  return null;
}

export async function setPartnerEnabled(id: string, enabled: boolean): Promise<string | null> {
  const list = getStoredPartners();
  const found = list.find((p) => p.id === id);
  if (found) {
    found.enabled = enabled;
    saveStoredPartners(list);
    notify();
  }
  return null;
}

export async function savePartnerOrder(rows: { id: string; sortOrder: number }[]): Promise<void> {
  const list = getStoredPartners();
  rows.forEach((r) => {
    const found = list.find((p) => p.id === r.id);
    if (found) found.sortOrder = r.sortOrder;
  });
  saveStoredPartners(list);
  notify();
}

/** Converts an image file to a data URL for client storage. */
export async function uploadPartnerLogo(
  file: File,
): Promise<{ path?: string; url?: string; error?: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      resolve({ path: "", url });
    };
    reader.onerror = () => resolve({ error: "Failed to read image" });
    reader.readAsDataURL(file);
  });
}
