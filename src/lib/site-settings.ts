// Site-wide company settings for MA GROUP.
// Completely local and independent — zero external backend dependencies.

export type SiteSettings = {
  companyName: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  maps: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoOgImage: string;
};

export const defaultSiteSettings: SiteSettings = {
  companyName: "MA GROUP",
  phone: "+20 103 018 5757",
  email: "info@magroupexport.com",
  whatsapp: "+201030185757",
  address: "Egypt",
  maps: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  twitter: "",
  seoTitle: "MA GROUP | Premium Fresh & Frozen Produce Exporter",
  seoDescription:
    "MA GROUP is a leading international exporter of premium fresh and frozen fruits and vegetables to Europe, the Middle East, Africa, and Asia.",
  seoKeywords: "MA GROUP, Fresh Fruits Export, Fresh Vegetables Export, Frozen Produce, Europe, Middle East, Africa, Asia",
  seoOgImage: "",
};

const SETTINGS_KEY = "magroup_site_settings_v2";

export async function loadSiteSettings(): Promise<SiteSettings> {
  if (typeof window === "undefined") return defaultSiteSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      // Check legacy v1 key and migrate
      try {
        const v1Raw = localStorage.getItem("magroup_site_settings_v1");
        if (v1Raw) {
          const v1 = JSON.parse(v1Raw);
          return {
            ...defaultSiteSettings,
            ...v1,
            phone: v1.phone && v1.phone.trim() ? v1.phone : defaultSiteSettings.phone,
            whatsapp: v1.whatsapp && v1.whatsapp.trim() ? v1.whatsapp : defaultSiteSettings.whatsapp,
          };
        }
      } catch {
        /* ignore */
      }
      return defaultSiteSettings;
    }
    const parsed = JSON.parse(raw);
    return {
      ...defaultSiteSettings,
      ...parsed,
      phone: parsed.phone && parsed.phone.trim() ? parsed.phone : defaultSiteSettings.phone,
      whatsapp: parsed.whatsapp && parsed.whatsapp.trim() ? parsed.whatsapp : defaultSiteSettings.whatsapp,
    };
  } catch {
    return defaultSiteSettings;
  }
}

export async function saveSiteSettings(s: SiteSettings): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
    return null;
  } catch {
    return "Failed to save settings locally";
  }
}
