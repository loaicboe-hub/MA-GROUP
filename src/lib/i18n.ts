import { useCallback, useSyncExternalStore } from "react";

export type Lang = "en" | "ar" | "zh";

const KEY = "fd_lang";

/* ---------------------------------- store --------------------------------- */

let current: Lang = "en";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function applyDocument(lang: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

export function initLang() {
  if (typeof window === "undefined") return;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(KEY);
  } catch {
    stored = null;
  }
  const lang: Lang = stored === "ar" ? "ar" : stored === "zh" ? "zh" : "en";
  current = lang;
  applyDocument(lang);
  emit();
}

export function setLang(lang: Lang) {
  current = lang;
  try {
    window.localStorage.setItem(KEY, lang);
  } catch {
    /* ignore */
  }
  applyDocument(lang);
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): Lang {
  return current;
}

function getServerSnapshot(): Lang {
  return "en";
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const change = useCallback((l: Lang) => setLang(l), []);
  return {
    lang,
    setLang: change,
    dir: (lang === "ar" ? "rtl" : "ltr") as "rtl" | "ltr",
    c: content[lang],
  };
}

/* -------------------------------- content --------------------------------- */

export type SiteContent = {
  brand: string;
  brandSub: string;
  nav: { href: string; label: string }[];
  ui: Record<string, string>;
  stats: { n: string; l: string }[];
  badges: string[];
  fruits: { name: string; desc: string }[];
  vegetables: { name: string; desc: string }[];
  whyUs: { title: string; desc: string }[];
  process: { title: string; desc: string }[];
  regions: string[];
  certs: { title: string; sub: string }[];
  contact: string[];
};

const en: SiteContent = {
  brand: "MA GROUP",
  brandSub: "(Export)",
  nav: [
    { href: "#about", label: "About" },
    { href: "#products", label: "Products" },
    { href: "#why", label: "Why Us" },
    { href: "#process", label: "Process" },
    { href: "#markets", label: "Markets" },
  ],
  ui: {
    requestQuote: "Request Quote",
    requestAQuote: "Request a Quote",
    exploreProducts: "Explore Products",
    heroBadge: "Est. 2026 — Premium Export Quality",
    heroTitle1: "Premium Fresh Fruits &",
    heroTitleGold: "Vegetables",
    heroTitle2: "to Europe, Middle East, Africa, Asia & the Americas",
    heroSub:
      "Delivering exceptional quality, freshness, and reliable export supply to Europe, the Middle East, Africa, Asia, and the Americas.",
    scroll: "Scroll",
    aboutEyebrow: "About Us",
    aboutTitle1: "About",
    aboutTitleGold: "MA GROUP",
    aboutP1:
      "At MA GROUP, we are committed to delivering Egyptian produce of the highest quality standards, honoring its prestigious standing and fulfilling the aspirations of our clients worldwide. We believe in sustainable partnerships built on trust and credibility, and we strive to fulfill our clients' requirements with efficiency and professionalism.",
    aboutP2:
      "With years of experience and strict quality control standards, we ensure every shipment meets international export requirements.",
    iso: "Premium Quality",
    certifiedExcellence: "Certified Excellence",
    productsEyebrow: "Our Products",
    productsTitle: "A Harvest of Excellence",
    productsSub:
      "Export-grade fresh and frozen fruits and vegetables, selected for freshness, appearance, and shelf life.",
    freshFruits: "Fresh Fruits",
    freshVegetables: "Fresh Vegetables",
    frozenFruits: "Frozen Fruits",
    frozenVegetables: "Frozen Vegetables",
    exportProducts: "Export Products",
    allProducts: "All Products",

    premium: "Premium",
    learnMore: "Learn More",
    whyEyebrow: "Why Choose Us",
    whyTitle: "Built on Trust & Standards",
    processEyebrow: "Export Process",
    processTitle1: "From Farm to",
    processTitleGold: "5 Key Continents",
    processSub:
      "Seven controlled stages that keep every shipment fresh, traceable and on schedule to our export destinations.",
    certsEyebrow: "Certifications",
    certsTitle: "Standards You Can Trust",
    marketsEyebrow: "Export Destinations",
    marketsTitle1: "We Export to",
    marketsTitleGold: "5 Major Continents",
    marketsSub:
      "Direct refrigerated export corridors serving buyers across Europe, the Middle East, Africa, Asia, and the Americas.",
    contactEyebrow: "Contact",
    contactTitle1: "Let's Ship",
    contactTitleGold: "Freshness",
    contactTitle2: "Together",
    contactSub:
      "Reach out for quotations, product specifications, or partnership inquiries. Our team responds within one business day.",
    fName: "Name",
    fCompany: "Company",
    fCountry: "Country",
    fEmail: "Email",
    fPhone: "Phone",
    fProduct: "Interested Product",
    fMessage: "Message",
    fMessagePlaceholder: "Tell us about your requirements...",
    sendInquiry: "Send Inquiry",
    requestQuotation: "Request Quotation",
    errRequired: "Please fill in your name, email and message.",
    errEmail: "Please enter a valid email address.",
    okSent: "Thank you! Your inquiry has been received. We'll reply within one business day.",
    okQuote: "Quotation request received. Our export team will contact you shortly.",
    rights: "All rights reserved.",
    footerBadge: "Premium Export Quality · Since 2026",
    backToTop: "Back to top",
    toggleMenu: "Toggle menu",
    language: "Language",
  },
  stats: [
    { n: "14+", l: "Years of Experience" },
    { n: "50+", l: "Professional Team" },
    { n: "100%", l: "Quality Standards" },
    { n: "24/7", l: "Fast Delivery" },
  ],
  badges: ["Since 2026", "Premium Quality", "Global Export"],
  fruits: [
    { name: "Oranges", desc: "Sun-ripened citrus with vibrant sweetness." },
    { name: "Grapes", desc: "Hand-picked table grapes, plump and juicy." },
    { name: "Mangoes", desc: "Fragrant, honey-sweet tropical mangoes." },
    { name: "Pomegranates", desc: "Ruby seeds bursting with flavor." },
    { name: "Strawberries", desc: "Aromatic berries, cold-chain fresh." },
    { name: "Lemons", desc: "Zesty, thin-skinned premium lemons." },
  ],
  vegetables: [
    { name: "Potatoes", desc: "Firm, versatile export-grade potatoes." },
    { name: "Onions", desc: "Golden and red bulbs, long shelf life." },
    { name: "Garlic", desc: "Robust flavor, uniform premium bulbs." },
    { name: "Sweet Potatoes", desc: "Naturally sweet, rich orange flesh." },
    { name: "Green Beans", desc: "Crisp, tender pods harvested young." },
    { name: "Peppers", desc: "Colorful bell peppers, thick-walled." },
  ],
  whyUs: [
    { title: "Premium Quality", desc: "Only export-grade produce, hand-selected." },
    { title: "Certified Quality", desc: "Rigorous internationally recognized standards." },
    { title: "Selected Farms", desc: "Partnerships with trusted, vetted growers." },
    { title: "Strict Quality Control", desc: "Multi-stage inspection at every step." },
    { title: "Competitive Prices", desc: "Direct sourcing means best value." },
    { title: "Targeted Export", desc: "Specialized export routes to Europe, Middle East, Africa, Asia & the Americas." },
    { title: "On-Time Delivery", desc: "Reliable logistics you can plan around." },
    { title: "Cold Chain", desc: "Temperature controlled end-to-end." },
    { title: "Customer First", desc: "Long-term partnerships, not transactions." },
  ],
  process: [
    { title: "Farm Selection", desc: "Sourcing only from certified partner farms." },
    { title: "Quality Inspection", desc: "Field and lab checks for every batch." },
    { title: "Sorting & Packaging", desc: "Graded and packed to buyer specifications." },
    { title: "Cold Storage", desc: "Temperature and humidity controlled." },
    { title: "Container Loading", desc: "Refrigerated reefers loaded with care." },
    { title: "International Shipping", desc: "Ocean and air freight to Europe, Middle East, Africa, Asia & the Americas." },
    { title: "Delivery", desc: "Handed off fresh, on schedule." },
  ],
  regions: ["Europe", "Middle East", "Africa", "Asia", "Americas"],
  certs: [
    { title: "Quality Management", sub: "Consistent Standards" },
    { title: "Food Safety", sub: "Global Standards" },
    { title: "Export Ready", sub: "International Compliance" },
    { title: "Premium Grade", sub: "Quality Assurance" },
  ],
  contact: [
    "",
    "",
    "",
  ],
};

const ar: SiteContent = {
  brand: "MA GROUP",
  brandSub: "(تصدير)",
  nav: [
    { href: "#about", label: "من نحن" },
    { href: "#products", label: "منتجاتنا" },
    { href: "#why", label: "لماذا نحن" },
    { href: "#process", label: "مراحل التصدير" },
    { href: "#markets", label: "أسواقنا" },
  ],
  ui: {
    requestQuote: "اطلب عرض سعر",
    requestAQuote: "اطلب عرض سعر",
    exploreProducts: "استعرض المنتجات",
    heroBadge: "تأسست 2026 — جودة تصديرية فاخرة",
    heroTitle1: "فواكه وخضروات طازجة ومجمدة",
    heroTitleGold: "فاخرة",
    heroTitle2: "إلى أوروبا والشرق الأوسط وأفريقيا وآسيا والأمريكتين",
    heroSub:
      "نقدّم جودة استثنائية ونضارة دائمة وتوريداً موثوقاً للحاصلات الزراعية إلى أسواق أوروبا والشرق الأوسط وأفريقيا وآسيا والأمريكتين.",
    scroll: "مرّر للأسفل",
    aboutEyebrow: "من نحن",
    aboutTitle1: "عن",
    aboutTitleGold: "MA GROUP",
    aboutP1:
      "في MA GROUP، نحرص على تقديم منتجات مصرية بأعلى معايير الجودة، بما يليق بمكانتها ويلبي تطلعات عملائنا حول العالم. نؤمن بالشراكات المستدامة القائمة على الثقة والمصداقية، ونعمل على تلبية طلبات عملائنا بكفاءة واحترافية.",
    aboutP2:
      "وبفضل سنوات من الخبرة ومعايير صارمة لضبط الجودة، نضمن مطابقة كل شحنة لمتطلبات التصدير الدولية.",
    iso: "جودة فاخرة",
    certifiedExcellence: "تميّز معتمد",
    productsEyebrow: "منتجاتنا",
    productsTitle: "حصاد من التميّز",
    productsSub:
      "فواكه وخضروات طازجة ومجمدة بدرجة تصديرية، مختارة بعناية من حيث النضارة والمظهر ومدة الصلاحية.",
    freshFruits: "فواكه طازجة",
    freshVegetables: "خضروات طازجة",
    frozenFruits: "فواكه مجمدة",
    frozenVegetables: "خضروات مجمدة",
    exportProducts: "منتجات التصدير",
    allProducts: "جميع المنتجات",

    premium: "فاخر",
    learnMore: "اعرف المزيد",
    whyEyebrow: "لماذا تختارنا",
    whyTitle: "ثقة راسخة ومعايير عالمية",
    processEyebrow: "مراحل التصدير",
    processTitle1: "من المزرعة إلى",
    processTitleGold: "5 قارات رئيسية",
    processSub:
      "سبع مراحل محكمة تحافظ على نضارة كل شحنة وتتبّعها ووصولها إلى موانئ الاستقبال في الموعد المحدد.",
    certsEyebrow: "الشهادات",
    certsTitle: "معايير جديرة بثقتكم",
    marketsEyebrow: "وجهات التصدير",
    marketsTitle1: "نصدّر إلى",
    marketsTitleGold: "5 قارات رئيسية",
    marketsSub:
      "مسارات تصدير بحرية وجوية مبردة تصل محاصيلنا الطازجة والمجمدة إلى كبار المستوردين في أوروبا والشرق الأوسط وأفريقيا وآسيا وأمريكا بسلسلة تبريد موثوقة.",
    contactEyebrow: "تواصل معنا",
    contactTitle1: "لنصدّر",
    contactTitleGold: "النضارة",
    contactTitle2: "معًا",
    contactSub:
      "تواصلوا معنا لطلب عروض الأسعار أو مواصفات المنتجات أو فرص الشراكة. يردّ فريقنا خلال يوم عمل واحد.",
    fName: "الاسم",
    fCompany: "الشركة",
    fCountry: "الدولة",
    fEmail: "البريد الإلكتروني",
    fPhone: "رقم الهاتف",
    fProduct: "المنتج المطلوب",
    fMessage: "الرسالة",
    fMessagePlaceholder: "أخبرنا عن احتياجاتكم...",
    sendInquiry: "إرسال الطلب",
    requestQuotation: "طلب عرض سعر",
    errRequired: "يرجى إدخال الاسم والبريد الإلكتروني والرسالة.",
    errEmail: "يرجى إدخال بريد إلكتروني صحيح.",
    okSent: "شكرًا لكم! تم استلام طلبكم وسنرد خلال يوم عمل واحد.",
    okQuote: "تم استلام طلب عرض السعر، وسيتواصل معكم فريق التصدير قريبًا.",
    rights: "جميع الحقوق محفوظة.",
    footerBadge: "جودة تصديرية فاخرة · منذ 2026",
    backToTop: "العودة إلى الأعلى",
    toggleMenu: "فتح القائمة",
    language: "اللغة",
  },
  stats: [
    { n: "+14", l: "عامًا من الخبرة" },
    { n: "+50", l: "فريق محترف" },
    { n: "100%", l: "معايير الجودة" },
    { n: "24/7", l: "توصيل سريع" },
  ],
  badges: ["منذ 2026", "جودة فاخرة", "تصدير عالمي"],
  fruits: [
    { name: "برتقال", desc: "حمضيات ناضجة بطعم حلو ومنعش." },
    { name: "عنب", desc: "عنب مائدة مقطوف يدويًا، ممتلئ وعصيري." },
    { name: "مانجو", desc: "مانجو استوائية عطرة بحلاوة العسل." },
    { name: "رمان", desc: "حبات ياقوتية غنية بالنكهة." },
    { name: "فراولة", desc: "ثمار عطرة محفوظة بسلسلة تبريد كاملة." },
    { name: "ليمون", desc: "ليمون فاخر رقيق القشرة وغني بالحموضة." },
  ],
  vegetables: [
    { name: "بطاطس", desc: "بطاطس متماسكة بدرجة تصديرية ومتعددة الاستخدام." },
    { name: "بصل", desc: "بصل ذهبي وأحمر بعمر تخزيني طويل." },
    { name: "ثوم", desc: "نكهة قوية ورؤوس متجانسة فاخرة." },
    { name: "بطاطا حلوة", desc: "حلاوة طبيعية ولب برتقالي غني." },
    { name: "فاصوليا خضراء", desc: "قرون طرية مقطوفة في أوانها." },
    { name: "فلفل ألوان", desc: "فلفل رومي ملوّن سميك اللب." },
  ],
  whyUs: [
    { title: "جودة فاخرة", desc: "منتجات بدرجة تصديرية فقط، منتقاة يدويًا." },
    { title: "جودة معتمدة", desc: "معايير دولية صارمة ومعترف بها." },
    { title: "مزارع مختارة", desc: "شراكات مع مزارعين موثوقين ومعتمدين." },
    { title: "رقابة جودة صارمة", desc: "فحص متعدد المراحل في كل خطوة." },
    { title: "أسعار تنافسية", desc: "التوريد المباشر يعني أفضل قيمة." },
    { title: "تصدير متخصص", desc: "مسارات تصدير مباشرة ومنتظمة إلى أوروبا والشرق الأوسط وأفريقيا وآسيا وأمريكا." },
    { title: "التزام بالمواعيد", desc: "خدمات لوجستية يمكن الاعتماد عليها." },
    { title: "سلسلة تبريد", desc: "تحكم كامل في درجة الحرارة من البداية للنهاية." },
    { title: "العميل أولًا", desc: "شراكات طويلة الأمد لا مجرد صفقات." },
  ],
  process: [
    { title: "اختيار المزارع", desc: "التوريد من مزارع شريكة معتمدة فقط." },
    { title: "فحص الجودة", desc: "فحوصات حقلية ومعملية لكل دفعة." },
    { title: "الفرز والتعبئة", desc: "تدريج وتعبئة حسب مواصفات المشتري." },
    { title: "التخزين المبرد", desc: "تحكم دقيق في الحرارة والرطوبة." },
    { title: "تحميل الحاويات", desc: "حاويات مبردة يتم تحميلها بعناية." },
    { title: "الشحن الدولي", desc: "شحن بحري وجوي إلى موانئ الوصول في أوروبا والشرق الأوسط وأفريقيا وآسيا وأمريكا." },
    { title: "التسليم", desc: "تسليم طازج وفي الموعد المحدد." },
  ],
  regions: ["أوروبا", "الشرق الأوسط", "أفريقيا", "آسيا", "أمريكا"],
  certs: [
    { title: "إدارة الجودة", sub: "معايير ثابتة" },
    { title: "سلامة الغذاء", sub: "معايير عالمية" },
    { title: "جاهزية التصدير", sub: "امتثال دولي" },
    { title: "درجة فاخرة", sub: "ضمان الجودة" },
  ],
  contact: [
    "",
    "",
    "",
  ],
};

const zh: SiteContent = {
  brand: "MA GROUP",
  brandSub: "(出口贸易)",
  nav: [
    { href: "#about", label: "关于我们" },
    { href: "#products", label: "出口产品" },
    { href: "#why", label: "核心优势" },
    { href: "#process", label: "出口流程" },
    { href: "#markets", label: "目标市场" },
  ],
  ui: {
    requestQuote: "索取报价",
    requestAQuote: "索取详细报价",
    exploreProducts: "浏览产品中心",
    heroBadge: "始于 2026 年 — 特级出口品质",
    heroTitle1: "特级新鲜与冷冻果蔬",
    heroTitleGold: "出口品质",
    heroTitle2: "直航欧洲、中东、非洲、亚洲与美洲市场",
    heroSub:
      "源自埃及天然优质种植基地，严格把控冷链管理与国际质量标准，为欧洲、中东、非洲、亚洲及美洲主要进口商提供卓越的鲜活与冷冻农产品直供服务。",
    scroll: "向下滚动",
    aboutEyebrow: "关于我们",
    aboutTitle1: "走进",
    aboutTitleGold: "MA GROUP",
    aboutP1:
      "在 MA GROUP，我们致力于提供符合最高质量标准的埃及优质农产品，彰显其卓越地位，满足全球客户的期望。我们坚信建立在信任与诚信基础上的可持续合作伙伴关系，并以高效与专业的水准竭诚满足客户的各项采购需求。",
    aboutP2:
      "依托多年农产品出口积淀与全流程质量控制体系，我们确保每一批出口货运均达到严苛的国际品质和装载标准。",
    iso: "特级品质",
    certifiedExcellence: "国际权威认证",
    productsEyebrow: "出口产品",
    productsTitle: "源自天然 · 卓越品质",
    productsSub:
      "严选达到国际出口标准的特级新鲜与冷冻果蔬，在新鲜度、色泽外观和保质期各维度表现卓越。",
    freshFruits: "新鲜水果",
    freshVegetables: "新鲜蔬菜",
    frozenFruits: "冷冻水果",
    frozenVegetables: "冷冻蔬菜",
    exportProducts: "出口产品",
    allProducts: "全部产品",

    premium: "特级",
    learnMore: "了解详情",
    whyEyebrow: "为什么选择我们",
    whyTitle: "深厚信赖 · 国际标准",
    processEyebrow: "出口流程",
    processTitle1: "从优质农场到",
    processTitleGold: "五大洲主要港口",
    processSub:
      "涵盖 7 大严格受控环节，全程温控追溯，确保每一柜货品新鲜准时交付至各大国际目的港。",
    certsEyebrow: "品质认证",
    certsTitle: "值得信赖的国际标准",
    marketsEyebrow: "出口目的地",
    marketsTitle1: "产品畅销",
    marketsTitleGold: "全球 5 大洲主要市场",
    marketsSub:
      "直通海运与空运冷藏干线，高效服务欧洲、中东、非洲、亚洲及美洲各地区的大型进口商与分销商。",
    contactEyebrow: "联系我们",
    contactTitle1: "携手共创",
    contactTitleGold: "新鲜与品质",
    contactTitle2: "合作共赢",
    contactSub:
      "欢迎咨询商业报价、产品规格书或全球合作伙伴计划。我们的出口销售团队将在 1 个工作日内及时答复。",
    fName: "姓名",
    fCompany: "公司名称",
    fCountry: "国家 / 地区",
    fEmail: "企业邮箱",
    fPhone: "联系电话",
    fProduct: "意向采购产品",
    fMessage: "采购需求留言",
    fMessagePlaceholder: "请详细说明您的采购规格、预计数量及目的港...",
    sendInquiry: "提交询盘",
    requestQuotation: "申请正式报价",
    errRequired: "请完整填写您的姓名、企业邮箱及采购需求留言。",
    errEmail: "请输入有效的电子邮箱地址。",
    okSent: "感谢您的咨询！我们已收到您的采购需求，出口业务团队将在 1 个工作日内与您联系。",
    okQuote: "报价请求已成功提交，我们的国际贸易团队将尽快联系您。",
    rights: "版权所有，保留一切权利。",
    footerBadge: "特级出口品质 · 始于 2026",
    backToTop: "返回顶部",
    toggleMenu: "展开菜单",
    language: "语言切换",
  },
  stats: [
    { n: "14+", l: "年专业出口经验" },
    { n: "50+", l: "专业运营团队" },
    { n: "100%", l: "出口合格标准" },
    { n: "24/7", l: "全天候极速交付" },
  ],
  badges: ["始于 2026 年", "特级品质保证", "全球干线出口"],
  fruits: [
    { name: "鲜橙", desc: "阳光孕育的优质柑橘，多汁甘甜，芳香浓郁。" },
    { name: "无籽鲜食葡萄", desc: "手工采摘鲜食葡萄，颗粒饱满，爽脆多汁。" },
    { name: "热带香芒", desc: "果香馥郁的热带芒果，蜜甜细腻，风味绝佳。" },
    { name: "红石榴", desc: "红宝石般剔透籽粒，汁水丰盈，酸甜适口。" },
    { name: "鲜草莓", desc: "果香扑鼻的高端草莓，全程冷链直通。" },
    { name: "鲜柠檬", desc: "皮薄汁多，酸香浓郁的特级出口柠檬。" },
  ],
  vegetables: [
    { name: "土豆", desc: "质地坚实、耐储运的特级出口马铃薯。" },
    { name: "洋葱", desc: "金黄及红紫洋葱，表皮光洁，耐长途海运。" },
    { name: "大蒜", desc: "蒜香浓烈，蒜头饱满均匀的高等级大蒜。" },
    { name: "红薯", desc: "天然甘甜，果肉橙红细腻的特选红薯。" },
    { name: "青刀豆", desc: "鲜嫩爽脆，幼嫩期采摘的特级青刀豆。" },
    { name: "彩椒", desc: "肉厚多汁、色泽鲜亮的特级出口甜彩椒。" },
  ],
  whyUs: [
    { title: "特级品质", desc: "仅精选符合严苛国际出口标准的特级农产品。" },
    { title: "国际认证", desc: "严格遵循全球公认的食品安全与农业良好规范。" },
    { title: "严选基地", desc: "与具备优质资质的认证专属种植农场长期深度合作。" },
    { title: "严格品控", desc: "田间采收、进厂分选、出运装柜多道全检把关。" },
    { title: "优势价格", desc: "产地直发减少中间环节，为采购商提供最优商业价值。" },
    { title: "定向出口", desc: "打造通达欧洲、中东、非洲、亚洲与美洲各主要港口的成熟航线。" },
    { title: "准时交期", desc: "稳定高效的物流承运保障，船期运期精准可靠。" },
    { title: "全程冷链", desc: "从采后预冷至目的港全程温湿度严密监控。" },
    { title: "客户至上", desc: "注重长期商业战略伙伴关系，提供定制化出口解决方案。" },
  ],
  process: [
    { title: "基地严选", desc: "严格遴选具备 Global G.A.P. 认证的专属规范农场。" },
    { title: "品质检验", desc: "对每一批次农产品进行田间采收与实验室双重化验。" },
    { title: "分级包装", desc: "依据采购商指定规格进行光学分选与出口级精美包装。" },
    { title: "预冷储藏", desc: "采用快速压差预冷系统，精准控制恒温恒湿储存环境。" },
    { title: "冷藏装柜", desc: "高规格冷藏集装箱专业打托码放与加固装运。" },
    { title: "国际海空运", desc: "开辟直达欧洲、中东、非洲、亚洲与美洲各大港口的高效运输航线。" },
    { title: "新鲜交付", desc: "按期准时通关送达，确保果蔬新鲜如同现采。" },
  ],
  regions: ["欧洲", "中东", "非洲", "亚洲", "美洲"],
  certs: [
    { title: "质量管理体系", sub: "国际统一标准" },
    { title: "食品安全标准", sub: "全球权威认证" },
    { title: "出口检验合规", sub: "海关顺畅通关" },
    { title: "特级出口等级", sub: "卓越品质保证" },
  ],
  contact: [
    "",
    "",
    "",
  ],
};

export const content: Record<Lang, SiteContent> = { en, ar, zh };
