// Website section text content storage for MA GROUP.
// Completely local and independent — zero external backend dependencies.

export type SectionContent = {
  id: string;
  title_en: string;
  title_ar: string;
  title_zh?: string;
  subtitle_en: string;
  subtitle_ar: string;
  subtitle_zh?: string;
  paragraph_en: string;
  paragraph_ar: string;
  paragraph_zh?: string;
  button_en: string;
  button_ar: string;
  button_zh?: string;
  extra_data?: Record<string, any>;
  image?: string;
};

const CACHE_KEY = "magroup_site_content_v3";

export const defaultSectionsContent: Record<string, SectionContent> = {
  home: {
    id: "home",
    title_en: "MA GROUP",
    title_ar: "مجموعة إم إيه",
    title_zh: "MA GROUP",
    subtitle_en: "Premium Fresh & Frozen Produce Exported to Europe, Middle East, Africa & Asia",
    subtitle_ar: "فواكه وخضروات طازجة ومجمدة فاخرة تُصدَّر إلى أوروبا والشرق الأوسط وأفريقيا وآسيا",
    subtitle_zh: "直航欧洲、中东、非洲与亚洲的特级新鲜与冷冻果蔬出口",
    paragraph_en: "Delivering nature's finest harvest directly from fertile lands to European, Middle Eastern, African, and Asian markets with guaranteed certified quality.",
    paragraph_ar: "نقدم أجود محاصيل الطبيعة مباشرة من أخصب المزارع إلى أسواق أوروبا والشرق الأوسط وأفريقيا وآسيا بجودة معتمدة ومضمونة.",
    paragraph_zh: "将尼罗河畔肥沃沃土孕育的大自然至臻丰收，以全程认证的卓越品质，直供欧洲、中东、非洲及亚洲主要国际市场。",
    button_en: "Explore Products",
    button_ar: "استكشف المنتجات",
    button_zh: "浏览产品中心",
    image: "/placeholder.svg",
  },
  about: {
    id: "about",
    title_en: "About Us",
    title_ar: "من نحن",
    title_zh: "关于我们",
    subtitle_en: "Rooted in Quality, Exporting Across Continents",
    subtitle_ar: "متجذرون في الجودة، نصدّر عبر القارات",
    subtitle_zh: "深耕卓越品质 · 贯通四大洲贸易",
    paragraph_en: "At MA GROUP, we are committed to delivering Egyptian produce of the highest quality standards, honoring its prestigious standing and fulfilling the aspirations of our clients worldwide. We believe in sustainable partnerships built on trust and credibility, and we strive to fulfill our clients' requirements with efficiency and professionalism.",
    paragraph_ar: "في MA GROUP، نحرص على تقديم منتجات مصرية بأعلى معايير الجودة، بما يليق بمكانتها ويلبي تطلعات عملائنا حول العالم. نؤمن بالشراكات المستدامة القائمة على الثقة والمصداقية، ونعمل على تلبية طلبات عملائنا بكفاءة واحترافية.",
    paragraph_zh: "在 MA GROUP，我们致力于提供符合最高质量标准的埃及优质农产品，彰显其卓越地位，满足全球客户的期望。我们坚信建立在信任与诚信基础上的可持续合作伙伴关系，并以高效与专业的水准竭诚满足客户的各项采购需求。",
    button_en: "Learn More",
    button_ar: "اعرف المزيد",
    button_zh: "了解详情",
    image: "/placeholder.svg",
  },
  whyUs: {
    id: "whyUs",
    title_en: "Why Choose Us",
    title_ar: "لماذا تختارنا",
    title_zh: "为什么选择我们",
    subtitle_en: "Quality, reliability, and direct reach across 4 continents.",
    subtitle_ar: "الجودة، الموثوقية، والتوريد المباشر عبر 4 قارات.",
    subtitle_zh: "卓越品质、坚实信赖，直通全球四大洲。",
    paragraph_en: "We deliver excellence at every step — from farm inspection and precision grading to temperature-controlled refrigerated shipping across Europe, the Middle East, Africa, and Asia.",
    paragraph_ar: "نقدّم التميز في كل خطوة — من فحص المزارع والفرز الدقيق وحتى الشحن المبرّد المدار حرارياً إلى أسواق أوروبا والشرق الأوسط وأفريقيا وآسيا.",
    paragraph_zh: "从严选种植基地、多道精密质检，到全程温控冷藏运输，我们在每一个环节都坚持国际最高出口标准。",
    button_en: "See Reasons",
    button_ar: "شاهد المميزات",
    button_zh: "查看优势",
    image: "/placeholder.svg",
  },
  process: {
    id: "process",
    title_en: "Our Export Process",
    title_ar: "مراحل التصدير",
    title_zh: "我们的出口流程",
    subtitle_en: "From farm to destination ports across 4 continents.",
    subtitle_ar: "من المزرعة إلى موانئ الوصول عبر 4 قارات رئيسية.",
    subtitle_zh: "从优质种植基地到全球四大洲各大目的港口。",
    paragraph_en: "Every shipment follows our certified quality-controlled workflow to ensure freshness, timely delivery, and strict compliance with international standards.",
    paragraph_ar: "كل شحنة تمر برحلة معتمدة ومراقبة لضبط الجودة لضمان النضارة، الالتزام بمواعيد التسليم، والمطابقة الدقيقة للمعايير الدولية.",
    paragraph_zh: "每一批出运货物均严格遵循全流程认证质控体系，确保极佳新鲜度、精准交货期以及对国际标准的严密合规。",
    button_en: "View Process",
    button_ar: "عرض المراحل",
    button_zh: "查看流程",
    image: "/placeholder.svg",
  },
  contact: {
    id: "contact",
    title_en: "Contact Us",
    title_ar: "تواصل معنا",
    title_zh: "联系我们",
    subtitle_en: "Reach out for inquiries and quotations.",
    subtitle_ar: "تواصل معنا للاستفسارات وعروض الأسعار.",
    subtitle_zh: "欢迎随时洽谈商务咨询与正式报价。",
    paragraph_en: "Ready to partner with us? Reach out for customized export quotations, seasonal availability schedules, or bulk produce orders.",
    paragraph_ar: "جاهز للشراكة معنا؟ تواصل معنا للحصول على عروض أسعار تصديرية مخصصة، جداول المواسم، أو طلبيات الحاصلات الزراعية بالجملة.",
    paragraph_zh: "期待与您携手共赢！欢迎咨询定制化出口报价方案、季节性供应周期表或大宗农产品采购订单。",
    button_en: "Get In Touch",
    button_ar: "تواصل معنا",
    button_zh: "即刻联络",
    image: "/placeholder.svg",
  },
  products: {
    id: "products",
    title_en: "Products",
    title_ar: "المنتجات",
    title_zh: "出口产品",
    subtitle_en: "Explore our premium export produce.",
    subtitle_ar: "استكشف محاصيلنا ومنتجاتنا التصديرية الفاخرة.",
    subtitle_zh: "探索我们的特级出口新鲜与冷冻农产品。",
    paragraph_en: "",
    paragraph_ar: "",
    paragraph_zh: "",
    button_en: "View Products",
    button_ar: "عرض المنتجات",
    button_zh: "查看产品",
    image: "/placeholder.svg",
  },
  markets: {
    id: "markets",
    title_en: "Export Destinations",
    title_ar: "وجهات التصدير",
    title_zh: "出口目的地",
    subtitle_en: "Key markets across Europe, Middle East, Africa & Asia.",
    subtitle_ar: "الوجهات التصديرية الرئيسية عبر أوروبا والشرق الأوسط وأفريقيا وآسيا.",
    subtitle_zh: "畅销欧洲、中东、非洲与亚洲重点国际市场。",
    paragraph_en: "",
    paragraph_ar: "",
    paragraph_zh: "",
    button_en: "Learn More",
    button_ar: "اعرف المزيد",
    button_zh: "了解详情",
    image: "/placeholder.svg",
  },
  certificate: {
    id: "certificate",
    title_en: "Certifications",
    title_ar: "الشهادات",
    title_zh: "品质认证",
    subtitle_en: "Our quality standards and certifications.",
    subtitle_ar: "معايير الجودة وشهادات الاعتماد الخاصة بنا.",
    subtitle_zh: "我们恪守的国际品质标准与权威体系认证。",
    paragraph_en: "",
    paragraph_ar: "",
    paragraph_zh: "",
    button_en: "View Certificates",
    button_ar: "عرض الشهادات",
    button_zh: "查看认证",
    image: "/placeholder.svg",
  },
  news: {
    id: "news",
    title_en: "Our News",
    title_ar: "أخبارنا",
    title_zh: "公司动态",
    subtitle_en: "Latest company news and announcements.",
    subtitle_ar: "آخر أخبار وإعلانات الشركة.",
    subtitle_zh: "MA GROUP 公司最新资讯、全球贸易动态与产季公告。",
    paragraph_en: "",
    paragraph_ar: "",
    paragraph_zh: "",
    button_en: "Read More",
    button_ar: "اقرأ المزيد",
    button_zh: "阅读更多",
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
  lang: "en" | "ar" | "zh",
) {
  const s = contentMap[sectionKey] || defaultSectionsContent[sectionKey];
  if (!s) {
    return { title: "", subtitle: "", paragraph: "", button: "" };
  }

  if (lang === "ar") {
    return {
      title: s.title_ar || s.title_en,
      subtitle: s.subtitle_ar || s.subtitle_en,
      paragraph: s.paragraph_ar || s.paragraph_en,
      button: s.button_ar || s.button_en,
    };
  }
  if (lang === "zh") {
    const def = defaultSectionsContent[sectionKey];
    return {
      title: s.title_zh || def?.title_zh || s.title_en,
      subtitle: s.subtitle_zh || def?.subtitle_zh || s.subtitle_en,
      paragraph: s.paragraph_zh || def?.paragraph_zh || s.paragraph_en,
      button: s.button_zh || def?.button_zh || s.button_en,
    };
  }
  return {
    title: s.title_en,
    subtitle: s.subtitle_en,
    paragraph: s.paragraph_en,
    button: s.button_en,
  };
}
