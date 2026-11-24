// Company news / blog system for MA GROUP.
// Completely local and independent — zero external backend dependencies.

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  title_ar: string;
  title_zh?: string;
  excerpt: string;
  excerpt_ar: string;
  excerpt_zh?: string;
  content: string;
  content_ar: string;
  content_zh?: string;
  featured_image: string;
  gallery: string[];
  category: string;
  tags: string[];
  author: string;
  video_url: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
};

const DEFAULT_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    slug: "ma-group-expands-global-export-routes",
    title: "MA GROUP Expands Global Fresh Produce Export Routes",
    title_ar: "مجموعة إم إيه توسع مسارات تصدير الحاصلات الزراعية عالمياً",
    title_zh: "MA GROUP 拓展全球生鲜果蔬出口干线物流网络",
    excerpt: "New refrigerated logistics corridors established across Europe and the Middle East for ultra-fresh delivery.",
    excerpt_ar: "إنشاء مسارات لوجستية مبردة جديدة لربط أفضل المزارع بأكبر الأسواق الدولية بأعلى معايير الحفظ.",
    excerpt_zh: "设立覆盖欧洲与中东的全新冷藏运输通道，实现从优质农场至国际口岸的高效直达与极速温控交付。",
    content: "<p>MA GROUP continues to enhance its export network with modern cold-chain logistics. By partnering with leading maritime and air shipping lines, our fresh vegetables and fruits reach European and Middle Eastern destinations in peak condition.</p><p>Strict temperature controls, continuous container tracking, and expedited customs clearance ensure our commercial partners receive premium Egyptian produce with minimal transit times.</p>",
    content_ar: "<p>تواصل مجموعة إم إيه تعزيز شبكتها التصديرية بأحدث وسائل النقل المبرد والشحن الدولي. من خلال شراكات استراتيجية مع كبرى الخطوط الملاحية والجوية، تصل حاصلاتنا الزراعية من الخضار والفاكهة الطازجة إلى الأسواق الأوروبية والخليجية بأعلى درجات النضارة.</p><p>نعتمد رقابة دقيقة على درجات الحرارة طوال مسار الشحن مع تتبع لحظي للحاويات لضمان تسليم فائق الجودة والالتزام بأدق المواصفات القياسية الدولية.</p>",
    content_zh: "<p>MA GROUP 持续升级并深化其全球出口干线物流网络。通过与国际知名远洋船运公司及航空生鲜货运班机建立战略合作，确保我们高品质的新鲜果蔬以顶尖的冷链状态送抵欧洲与中东各大枢纽港口。</p><p>全程数字化温湿度双向监控、冷藏集装箱在途实时 GPS 追踪以及绿色快速海关通关报验体系，全力保障海外商业合作伙伴在最短交期内收到新鲜如初的特级埃及农产品。</p>",
    featured_image: "/news/export-logistics.jpg",
    gallery: [
      "/news/export-logistics.jpg",
      "/news/packaging-export.jpg",
      "/news/sustainable-farming.jpg",
    ],
    category: "Logistics",
    tags: ["Export", "Cold Chain", "Shipping", "Europe", "Middle East"],
    author: "MA GROUP Export Team",
    video_url: "",
    published: true,
    published_at: "2026-03-01T08:00:00.000Z",
    created_at: "2026-03-01T08:00:00.000Z",
    updated_at: "2026-03-01T08:00:00.000Z",
  },
  {
    id: "news-2",
    slug: "egyptian-fresh-strawberry-harvest-season",
    title: "Peak Harvest: Premium Egyptian Fresh & Frozen Strawberries Now Exporting",
    title_ar: "موسم الحصاد الذهبي: تصدير الفراولة المصرية الفاخرة طازجة ومجمدة لأسواق العالم",
    title_zh: "产季高峰：埃及特级新鲜与冷冻草莓开启全球大规模出口",
    excerpt: "Hand-picked Festival and Fortuna strawberry varieties ready for air freight and ocean cold containers worldwide.",
    excerpt_ar: "بدء موسم تصدير أجود أصناف الفراولة المصرية الفاخرة بحراً وجواً وفق أدق المواصفات التصديرية.",
    excerpt_zh: "手工精选 Festival 与 Fortuna 优质草莓品种，航空直飞与冷藏集装箱全面启运，服务全球各大生鲜商超。",
    content: "<p>The Egyptian strawberry harvest season is officially at its peak. MA GROUP is currently harvesting and packing top-tier Festival, Fortuna, and Sensation strawberry varieties sourced from Global G.A.P. certified partner farms.</p><p>Each batch undergoes rapid forced-air precooling within hours of picking to lock in sweetness, vibrant ruby color, and firm texture, serving major retail chains and food processors across the globe.</p>",
    content_ar: "<p>انطلق موسم حصاد الفراولة المصرية بقمة الإنتاجية والجودة. تعمل مجموعة إم إيه حالياً على جني وتعبئة أرقى أصناف الفراولة مثل فستيفال وفورتونا من مزارع معتمدة ومطابقة لشروط الجلوبال جاب.</p><p>تخضع الثمار لعمليات التبريد الأولي السريع فور القطف للحفاظ على نسبة السكر واللون الأحمر القاني والصلابة المثالية للشحن السريع جواً وبحراً لمختلف الأسواق العالمية.</p>",
    content_zh: "<p>埃及优质草莓产季已正式步入采收峰期。MA GROUP 目前正全面采收并包装源自 Global G.A.P. 认证示范农场的特级 Festival、Fortuna 及 Sensation 品种草莓。</p><p>清晨采摘后的新鲜浆果在数小时内迅速送入压差预冷通道，锁住馥郁的天然果香、纯正红润色泽与紧实脆爽质地，高效供应全球高端连锁零售超市与大型食品深加工企业。</p>",
    featured_image: "/news/strawberry-harvest.jpg",
    gallery: [
      "/news/strawberry-harvest.jpg",
      "/news/packaging-export.jpg",
      "/news/quality-certification.jpg",
    ],
    category: "Harvest",
    tags: ["Strawberries", "Fresh Produce", "Harvest Season", "Export"],
    author: "Agricultural Operations",
    video_url: "",
    published: true,
    published_at: "2026-02-18T10:30:00.000Z",
    created_at: "2026-02-18T10:30:00.000Z",
    updated_at: "2026-02-18T10:30:00.000Z",
  },
  {
    id: "news-3",
    slug: "advanced-iqf-freezing-facility-upgrade",
    title: "State-of-the-Art IQF Freezing Capacity Expanded for Vegetables and Fruits",
    title_ar: "تطوير خطوط التجميد السريع الفردي (IQF) للخضروات والفواكه بمواصفات عالمية",
    title_zh: "现代化 IQF 单体急冻生产线完成扩建升级，赋能果蔬深加工出口",
    excerpt: "Individually Quick-Frozen processing lines ensure garden-fresh nutrition, flavor, and texture for global buyers.",
    excerpt_ar: "خطوط تجميد فائق السرعة تعتمد تقنية IQF للحفاظ على القيمة الغذائية والنكهة الطبيعية لأسواق التصدير.",
    excerpt_zh: "采用国际先进的流化床单体极速急冻技术，完整保留天然果蔬的原生营养、新鲜风味与紧致口感。",
    content: "<p>To meet growing international demand, MA GROUP has expanded its IQF (Individually Quick Frozen) processing capacity. Our processing facilities feature fluid-bed blast freezing operating at -40°C, freezing produce individually within minutes.</p><p>This cutting-edge technology prevents cell damage and ice clustering, guaranteeing that our frozen okra, green beans, peas, mango chunks, and strawberries preserve 100% of their natural color, vitamins, and authentic taste.</p>",
    content_ar: "<p>استجابة للطلب الدولي المتزايد، قامت مجموعة إم إيه بتوسيع خطوط التجميد السريع الفردي IQF بأحدث تقنيات الأنفاق التبريدية عند -40 درجة مئوية لتجميد كل حبة على حدة خلال دقائق معدودة.</p><p>تمنع هذه التقنية تكسر الأنسجة وتكتل الثلج، مما يضمن احتفاظ البامية والفاصوليا الخضراء والبسلة وقطع المانجو والفراولة المجمدة بكامل قيمتها الغذائية ونضارتها وطعمها الطبيعي.</p>",
    content_zh: "<p>为满足日益增长的国际商业采购订单，MA GROUP 投资并扩建了其高标准 IQF（单体速冻）加工产业中心。新落成的流化床急冻隧道在 -40°C 超低温度下运作，能在数分钟内完成每一颗果蔬颗粒的均匀单体冻结。</p><p>这一先进工艺有效避免细胞壁结晶破损与出水冰聚，确保冷冻秋葵、青刀豆、甜豌豆、芒果块及草莓完整保留 100% 的天然色泽、维生素营养及纯正风味。</p>",
    featured_image: "/news/iqf-processing.jpg",
    gallery: [
      "/news/iqf-processing.jpg",
      "/news/export-logistics.jpg",
      "/news/quality-certification.jpg",
    ],
    category: "Processing",
    tags: ["IQF", "Frozen Vegetables", "Frozen Fruits", "Food Tech"],
    author: "Industrial Processing Division",
    video_url: "",
    published: true,
    published_at: "2026-01-25T14:00:00.000Z",
    created_at: "2026-01-25T14:00:00.000Z",
    updated_at: "2026-01-25T14:00:00.000Z",
  },
  {
    id: "news-4",
    slug: "global-gap-brcgs-food-safety-certifications",
    title: "MA GROUP Renews Global G.A.P. and BRCGS Food Safety Certifications",
    title_ar: "تجديد شهادات الجودة العالمية Global G.A.P و BRCGS لسلامة الغذاء والتصدير",
    title_zh: "MA GROUP 顺利通过并蝉联 Global G.A.P. 与 BRCGS 国际食品安全权威认证",
    excerpt: "Strict adherence to international compliance, pesticide residue monitoring, and end-to-end batch traceability.",
    excerpt_ar: "التزام كامل بأدق المعايير والمواصفات الأوروبية والدولية ومطابقة متبقيات المبيدات والتتبع الكامل.",
    excerpt_zh: "严格执行严苛的欧盟农残监测标准、全程数字化批次追溯系统与可持续良好农业操作规范。",
    content: "<p>Following comprehensive annual audits, MA GROUP has officially renewed its Global G.A.P. and BRCGS certifications. These international accreditations recognize our unwavering commitment to food safety, hygiene, worker welfare, and environmentally responsible farming.</p><p>Every export shipment is backed by accredited laboratory residue analysis (MRL compliance), giving our commercial partners complete peace of mind.</p>",
    content_ar: "<p>بعد تدقيق فني شامل ومطابقة ميدانية دقيقة، جددت مجموعة إم إيه اعتماد شهادات الجودة الدولية Global G.A.P و BRCGS بأعلى الدرجات، تأكيداً على التزامنا التام بسلامة الغذاء وتطبيق شروط السلامة الزراعية والبيئية.</p><p>تخضع جميع الشحنات المصدرة لفحوصات معملية دورية معتمدة لضمان مطابقة حدود متبقيات المبيدات (MRL) وتوفير نظام تتبع رقمي شامل من المزرعة للمستورد.</p>",
    content_zh: "<p>经国际独立权威认证机构的严格现场技术核查与全流程飞行检查，MA GROUP 官方获准续展 Global G.A.P. 与 BRCGS 高级认证。该荣誉充分体现了我们在食品安全、卫生溯源及环保农业运营上的行业领先水平。</p><p>每一批出口货运均附带权威认可的第三方实验室农药残留合规化验证书（MRL Compliance），让全球进口商合作伙伴倍感安心与信赖。</p>",
    featured_image: "/news/quality-certification.jpg",
    gallery: [
      "/news/quality-certification.jpg",
      "/news/packaging-export.jpg",
      "/news/sustainable-farming.jpg",
    ],
    category: "Quality",
    tags: ["Quality", "Global G.A.P.", "BRCGS", "Food Safety"],
    author: "Quality Assurance Department",
    video_url: "",
    published: true,
    published_at: "2026-01-10T09:15:00.000Z",
    created_at: "2026-01-10T09:15:00.000Z",
    updated_at: "2026-01-10T09:15:00.000Z",
  },
  {
    id: "news-5",
    slug: "sustainable-farming-nile-valley-alliances",
    title: "Expanding Sustainable Contract Farming Alliances Across Egyptian Lands",
    title_ar: "توسيع شراكات الزراعة التعاقدية المستدامة عبر أفضل المزارع المصرية",
    title_zh: "深化尼罗河沃土可持续农业种植战略同盟，保障全年平稳出口供应",
    excerpt: "Partnering with certified growers across the Nile Delta and reclaimed lands to guarantee continuous supply.",
    excerpt_ar: "التعاون مع مزارع معتمدة في الدلتا والأراضي المستصلحة لضمان وفرة الإنتاج واستمرارية التوريد على مدار العام.",
    excerpt_zh: "携手尼罗河三角洲及现代垦区规范化合作农场，推行精准节水滴灌，确保持续优质产出。",
    content: "<p>MA GROUP has inked new direct grower alliances across premier agricultural hubs in Egypt. Through modern drip irrigation, agronomy supervision, and sustainable soil stewardship, we empower local growers while ensuring reliable supply of top-grade citrus, grapes, pomegranates, and vegetables.</p><p>Our sustainable model ensures fair trade practices, minimized environmental impact, and steady export availability across all seasonal calendars.</p>",
    content_ar: "<p>أبرمت مجموعة إم إيه اتفاقيات جديدة للزراعة التعاقدية مع نخبة من كبار المزارعين في أهم المحافظات الزراعية في مصر. نوفر الدعم الزراعي والفني والإشراف على شبكات الري بالتنقيط والممارسات الصديقة للبيئة لضمان أعلى إنتاجية من الموالح والعنب والرمان والخضروات.</p><p>يضمن هذا النموذج المستدام توريداً موثوقاً ومستقراً لشركائنا التجاريين حول العالم طوال مواسم الحصاد.</p>",
    content_zh: "<p>MA GROUP 与埃及核心果蔬优势产区的众多认证种植大户签订了全新周期的可持续订单农业合作协议。通过推广现代精准滴灌水肥一体化技术、资深农艺师驻场技术指导以及绿色土壤养护方案，我们在扶持本地农户的同时，确保特级柑橘、鲜食葡萄、红石榴及优质蔬菜的稳定产能。</p><p>该可持续合作模式兼具公平贸易与低碳环保理念，为遍布欧洲、中东、非洲与亚洲的全球客商构筑了坚实可靠的全年出口供应链。</p>",
    featured_image: "/news/sustainable-farming.jpg",
    gallery: [
      "/news/sustainable-farming.jpg",
      "/news/strawberry-harvest.jpg",
      "/news/export-logistics.jpg",
    ],
    category: "Agriculture",
    tags: ["Agriculture", "Sustainability", "Growers", "Egypt"],
    author: "Agronomy Department",
    video_url: "",
    published: true,
    published_at: "2025-12-20T11:00:00.000Z",
    created_at: "2025-12-20T11:00:00.000Z",
    updated_at: "2025-12-20T11:00:00.000Z",
  },
];

const NEWS_KEY = "magroup_news_v2";

function getStoredNews(): NewsArticle[] {
  if (typeof window === "undefined") return DEFAULT_NEWS;
  try {
    const raw = localStorage.getItem(NEWS_KEY);
    if (!raw) {
      try {
        localStorage.removeItem("magroup_news_v1");
      } catch {
        /* ignore */
      }
      return DEFAULT_NEWS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_NEWS;
    const defaultMap = new Map(DEFAULT_NEWS.map((d) => [d.id, d]));
    return parsed.map((item: NewsArticle) => {
      const match = defaultMap.get(item.id) || DEFAULT_NEWS.find((d) => d.slug === item.slug);
      return {
        ...item,
        title_zh: item.title_zh || match?.title_zh,
        excerpt_zh: item.excerpt_zh || match?.excerpt_zh,
        content_zh: item.content_zh || match?.content_zh,
        featured_image:
          !item.featured_image || item.featured_image.includes("placeholder")
            ? (match?.featured_image || "/news/export-logistics.jpg")
            : item.featured_image,
        gallery: match?.gallery?.length ? match.gallery : item.gallery,
      };
    });
  } catch {
    return DEFAULT_NEWS;
  }
}

function saveStoredNews(articles: NewsArticle[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NEWS_KEY, JSON.stringify(articles));
  } catch {
    // Ignore quota errors
  }
}

export function slugifyNews(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function blankArticle(): NewsArticle {
  const now = new Date().toISOString();
  return {
    id: "",
    slug: "",
    title: "",
    title_ar: "",
    excerpt: "",
    excerpt_ar: "",
    content: "",
    content_ar: "",
    featured_image: "",
    gallery: [],
    category: "",
    tags: [],
    author: "MA GROUP",
    video_url: "",
    published: true,
    published_at: now,
    created_at: now,
    updated_at: now,
  };
}

/** Latest published articles first (public website). */
export async function listPublishedNews(): Promise<NewsArticle[]> {
  const articles = getStoredNews();
  return articles
    .filter((a) => a.published)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const articles = getStoredNews();
  return articles.find((a) => a.slug === slug) ?? null;
}

/** All articles including drafts (admin). */
export async function listAllNews(): Promise<NewsArticle[]> {
  const articles = getStoredNews();
  return [...articles].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  );
}

export async function saveNews(article: NewsArticle): Promise<string | null> {
  const articles = getStoredNews();
  const payload: NewsArticle = {
    ...article,
    id: article.id || `news-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    slug: article.slug || slugifyNews(article.title),
    updated_at: new Date().toISOString(),
  };

  const idx = articles.findIndex((x) => x.id === payload.id);
  if (idx !== -1) {
    articles[idx] = payload;
  } else {
    articles.unshift(payload);
  }
  saveStoredNews(articles);
  return null;
}

export async function deleteNews(id: string): Promise<string | null> {
  const articles = getStoredNews().filter((a) => a.id !== id);
  saveStoredNews(articles);
  return null;
}

/** Converts an image file to a data URL for client storage. */
export async function uploadNewsImage(file: File): Promise<{ url?: string; error?: string }> {
  if (!file.type.startsWith("image/")) return { error: "Please choose an image file." };
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ url: String(reader.result) });
    reader.onerror = () => resolve({ error: "Failed to read image" });
    reader.readAsDataURL(file);
  });
}

/** Converts a YouTube / Vimeo link to an embeddable URL (or null when unsupported). */
export function toEmbedUrl(url: string): string | null {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export function formatDate(value: string, lang: "en" | "ar" | "zh") {
  try {
    const locale = lang === "ar" ? "ar-EG" : lang === "zh" ? "zh-CN" : "en-GB";
    return new Date(value).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return value;
  }
}
