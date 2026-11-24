export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };
export type FooterConfig = {
  tagline: string;
  columns: FooterColumn[];
  social: { facebook: string; instagram: string; linkedin: string };
};

const KEY = "magroup_footer_config_v2";

export const defaultFooterConfig: FooterConfig = {
  tagline:
    "Premium fresh & frozen produce exported to Europe, the Middle East, Africa & Asia. Certified quality you can rely on.",
  columns: [
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Why Us", href: "#why" },
        { label: "Export Process", href: "#process" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Fresh Fruits", href: "#products" },
        { label: "Vegetables", href: "#products" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Contact", href: "#contact" },
        { label: "Request Quote", href: "#contact" },
        { label: "Back to Top", href: "#top" },
      ],
    },
  ],
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
};

const REMOVED_LABELS = new Set(["Certifications", "Seasonal", "Packaging", "Global Markets"]);

export function loadFooterConfig(): FooterConfig {
  if (typeof window === "undefined") return defaultFooterConfig;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultFooterConfig;
    const parsed = JSON.parse(raw) as FooterConfig;
    const columns = (parsed.columns?.length ? parsed.columns : defaultFooterConfig.columns).map(
      (c) => ({ ...c, links: (c.links ?? []).filter((l) => !REMOVED_LABELS.has(l.label)) }),
    );
    return {
      ...defaultFooterConfig,
      ...parsed,
      social: { ...defaultFooterConfig.social, ...(parsed.social ?? {}) },
      columns,
    };
  } catch {
    return defaultFooterConfig;
  }
}

export function saveFooterConfig(cfg: FooterConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(cfg));
}

/* ------------------------------ Arabic labels ----------------------------- */

const AR_TEXT: Record<string, string> = {
  // tagline
  [defaultFooterConfig.tagline]:
    "حاصلات زراعية طازجة ومجمدة فاخرة تُصدَّر إلى أوروبا والشرق الأوسط وأفريقيا وآسيا. جودة معتمدة يمكنكم الاعتماد عليها.",
  // column titles
  Company: "الشركة",
  Products: "المنتجات",
  More: "المزيد",
  // links
  About: "من نحن",
  "Why Us": "لماذا نحن",
  "Export Process": "مراحل التصدير",
  "Global Markets": "الأسواق العالمية",
  "Fresh Fruits": "فواكه طازجة",
  Vegetables: "خضروات",
  Seasonal: "منتجات موسمية",
  Packaging: "التعبئة والتغليف",
  Certifications: "الشهادات",
  Contact: "تواصل معنا",
  "Request Quote": "اطلب عرض سعر",
  "Back to Top": "العودة إلى الأعلى",
};

/* ------------------------------ Chinese labels ---------------------------- */

const ZH_TEXT: Record<string, string> = {
  // tagline
  [defaultFooterConfig.tagline]:
    "出口至欧洲、中东、非洲与亚洲的特级新鲜与冷冻农产品，国际权威认证，品质值得信赖。",
  // column titles
  Company: "关于公司",
  Products: "出口产品",
  More: "更多服务",
  // links
  About: "关于我们",
  "Why Us": "核心优势",
  "Export Process": "出口流程",
  "Global Markets": "全球市场",
  "Fresh Fruits": "新鲜水果",
  Vegetables: "新鲜蔬菜",
  Seasonal: "时令产品",
  Packaging: "包装标准",
  Certifications: "国际认证",
  Contact: "联系我们",
  "Request Quote": "索取报价",
  "Back to Top": "返回顶部",
};

export function localizeFooterConfig(cfg: FooterConfig, lang: "en" | "ar" | "zh"): FooterConfig {
  if (lang === "en") return cfg;
  const dict = lang === "ar" ? AR_TEXT : ZH_TEXT;
  const t = (s: string) => dict[s] ?? s;
  return {
    ...cfg,
    tagline: t(cfg.tagline),
    columns: cfg.columns.map((col) => ({
      title: t(col.title),
      links: col.links.map((l) => ({ ...l, label: t(l.label) })),
    })),
  };
}

