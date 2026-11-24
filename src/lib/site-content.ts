// Website section text content storage for MA GROUP.
// Completely local and independent — zero external backend dependencies.

export type SectionContent = {
  id: string;
  title_en: string;
  title_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  paragraph_en: string;
  paragraph_ar: string;
  button_en: string;
  button_ar: string;
  extra_data?: Record<string, any>;
  image?: string;
};

const CACHE_KEY = "magroup_site_content_v2";

export const defaultSectionsContent: Record<string, SectionContent> = {
  home: {
    id: "home",
    title_en: "MA GROUP",
    title_ar: "مجموعة إم إيه",
    subtitle_en: "Premium Fresh & Frozen Produce Exported to Europe, Middle East, Africa & Asia",
    subtitle_ar: "فواكه وخضروات طازجة ومجمدة فاخرة تُصدَّر إلى أوروبا والشرق الأوسط وأفريقيا وآسيا",
    paragraph_en: "Delivering nature's finest harvest directly from fertile lands to European, Middle Eastern, African, and Asian markets with guaranteed certified quality.",
    paragraph_ar: "نقدم أجود محاصيل الطبيعة مباشرة من أخصب المزارع إلى أسواق أوروبا والشرق الأوسط وأفريقيا وآسيا بجودة معتمدة ومضمونة.",
    button_en: "Explore Products",
    button_ar: "استكشف المنتجات",
    image: "/placeholder.svg",
  },
  about: {
    id: "about",
    title_en: "About Us",
    title_ar: "من نحن",
    subtitle_en: "Rooted in Quality, Exporting Across Continents",
    subtitle_ar: "متجذرون في الجودة، نصدّر عبر القارات",
    paragraph_en: "At MA GROUP, we take pride in bridging fertile Egyptian lands with major markets in Europe, the Middle East, Africa, and Asia. We specialize in sourcing, grading, packing, and exporting the finest agricultural produce.",
    paragraph_ar: "في مجموعة إم إيه، نفخر بربط أخصب الأراضي الزراعية المصرية بكبرى الأسواق في أوروبا والشرق الأوسط وأفريقيا وآسيا. نتخصص في فرز وتعبئة وتصدير أرقى المحاصيل الزراعية الطازجة والمجمدة.",
    button_en: "Learn More",
    button_ar: "اعرف المزيد",
    image: "/placeholder.svg",
  },
  whyUs: {
    id: "whyUs",
    title_en: "Why Choose Us",
    title_ar: "لماذا تختارنا",
    subtitle_en: "Quality, reliability, and direct reach across 4 continents.",
    subtitle_ar: "الجودة، الموثوقية، والتوريد المباشر عبر 4 قارات.",
    paragraph_en: "We deliver excellence at every step — from farm inspection and precision grading to temperature-controlled refrigerated shipping across Europe, the Middle East, Africa, and Asia.",
    paragraph_ar: "نقدّم التميز في كل خطوة — من فحص المزارع والفرز الدقيق وحتى الشحن المبرّد المدار حرارياً إلى أسواق أوروبا والشرق الأوسط وأفريقيا وآسيا.",
    button_en: "See Reasons",
    button_ar: "شاهد المميزات",
    image: "/placeholder.svg",
  },
  process: {
    id: "process",
    title_en: "Our Export Process",
    title_ar: "مراحل التصدير",
    subtitle_en: "From farm to destination ports across 4 continents.",
    subtitle_ar: "من المزرعة إلى موانئ الوصول عبر 4 قارات رئيسية.",
    paragraph_en: "Every shipment follows our certified quality-controlled workflow to ensure freshness, timely delivery, and strict compliance with international standards.",
    paragraph_ar: "كل شحنة تمر برحلة معتمدة ومراقبة لضبط الجودة لضمان النضارة، الالتزام بمواعيد التسليم، والمطابقة الدقيقة للمعايير الدولية.",
    button_en: "View Process",
    button_ar: "عرض المراحل",
    image: "/placeholder.svg",
  },
  contact: {
    id: "contact",
    title_en: "Contact Us",
    title_ar: "تواصل معنا",
    subtitle_en: "Reach out for inquiries and quotations.",
    subtitle_ar: "تواصل معنا للاستفسارات وعروض الأسعار.",
    paragraph_en: "Ready to partner with us? Reach out for customized export quotations, seasonal availability schedules, or bulk produce orders.",
    paragraph_ar: "جاهز للشراكة معنا؟ تواصل معنا للحصول على عروض أسعار تصديرية مخصصة، جداول المواسم، أو طلبيات الحاصلات الزراعية بالجملة.",
    button_en: "Get In Touch",
    button_ar: "تواصل معنا",
    image: "/placeholder.svg",
  },
  products: {
    id: "products",
    title_en: "Products",
    title_ar: "المنتجات",
    subtitle_en: "Explore our premium export produce.",
    subtitle_ar: "استكشف محاصيلنا ومنتجاتنا التصديرية الفاخرة.",
    paragraph_en: "",
    paragraph_ar: "",
    button_en: "View Products",
    button_ar: "عرض المنتجات",
    image: "/placeholder.svg",
  },
  markets: {
    id: "markets",
    title_en: "Export Destinations",
    title_ar: "وجهات التصدير",
    subtitle_en: "Key markets across Europe, Middle East, Africa & Asia.",
    subtitle_ar: "الوجهات التصديرية الرئيسية عبر أوروبا والشرق الأوسط وأفريقيا وآسيا.",
    paragraph_en: "",
    paragraph_ar: "",
    button_en: "Learn More",
    button_ar: "اعرف المزيد",
    image: "/placeholder.svg",
  },
  certificate: {
    id: "certificate",
    title_en: "Certifications",
    title_ar: "الشهادات",
    subtitle_en: "Our quality standards and certifications.",
    subtitle_ar: "معايير الجودة وشهادات الاعتماد الخاصة بنا.",
    paragraph_en: "",
    paragraph_ar: "",
    button_en: "View Certificates",
    button_ar: "عرض الشهادات",
    image: "/placeholder.svg",
  },
  news: {
    id: "news",
    title_en: "Our News",
    title_ar: "أخبارنا",
    subtitle_en: "Latest company news and announcements.",
    subtitle_ar: "آخر أخبار وإعلانات الشركة.",
    paragraph_en: "",
    paragraph_ar: "",
    button_en: "Read More",
    button_ar: "اقرأ المزيد",
    image: "/placeholder.svg",
  },
};

function getLocalCache(): Record<string, SectionContent> {
  if (typeof window === "undefined") return defaultSectionsContent;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return defaultSectionsContent;
    const parsed = JSON.parse(raw);
    return { ...defaultSectionsContent, ...parsed };
  } catch {
    return defaultSectionsContent;
  }
}

function setLocalCache(data: Record<string, SectionContent>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export async function loadSiteContent(): Promise<Record<string, SectionContent>> {
  return getLocalCache();
}

export async function saveSectionContent(section: SectionContent): Promise<string | null> {
  const current = getLocalCache();
  current[section.id] = { ...(current[section.id] ?? defaultSectionsContent[section.id] ?? { id: section.id }), ...section };
  setLocalCache(current);
  return null;
}

export async function saveAllSectionsContent(all: Record<string, SectionContent>): Promise<string | null> {
  setLocalCache(all);
  return null;
}

export function getSectionText(
  contentMap: Record<string, SectionContent>,
  sectionKey: string,
  lang: "en" | "ar",
) {
  const s = contentMap[sectionKey] || defaultSectionsContent[sectionKey];
  if (!s) {
    return { title: "", subtitle: "", paragraph: "", button: "" };
  }

  return lang === "ar"
    ? {
        title: s.title_ar,
        subtitle: s.subtitle_ar,
        paragraph: s.paragraph_ar,
        button: s.button_ar,
      }
    : {
        title: s.title_en,
        subtitle: s.subtitle_en,
        paragraph: s.paragraph_en,
        button: s.button_en,
      };
}
