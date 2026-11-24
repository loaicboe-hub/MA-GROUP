// Unified product system for MA GROUP.
// Manages products and categories with local persistence and initial catalog seed.

import { CATALOG, type ProductSpecs } from "@/lib/products-catalog";

// --- Fresh produce images ---
import mandarinsImg from "@/assets/mandarins.jpg";
import guavaImg from "@/assets/guava.jpg";
import watermelonImg from "@/assets/watermelon.jpg";
import freshDatesImg from "@/assets/fresh-dates.jpg";
import freshBlueberriesImg from "@/assets/fresh-blueberries.jpg";
import freshRaspberriesImg from "@/assets/fresh-raspberries.jpg";

import carrotsImg from "@/assets/carrots.jpg";
import tomatoesImg from "@/assets/tomatoes.jpg";
import icebergLettuceImg from "@/assets/iceberg-lettuce.jpg";
import eggplantImg from "@/assets/eggplant.jpg";
import whiteEggplantImg from "@/assets/white-eggplant.jpg";

// --- Frozen Fruits images (10) ---
import frozenStrawberriesImg from "@/assets/frozen-strawberries.jpg";
import frozenMangoImg from "@/assets/frozen-mango.jpg";
import frozenPomegranateImg from "@/assets/frozen-pomegranate.jpg";
import frozenGuavaImg from "@/assets/frozen-guava.jpg";
import frozenPeachesImg from "@/assets/frozen-peaches.jpg";
import frozenApricotsImg from "@/assets/frozen-apricots.jpg";
import frozenFigsImg from "@/assets/frozen-figs.jpg";
import frozenBlackberriesImg from "@/assets/frozen-blackberries.jpg";
import frozenCantaloupeImg from "@/assets/frozen-cantaloupe.jpg";

// --- Frozen Vegetables images (10) ---
import frozenGreenBeansImg from "@/assets/frozen-green-beans.jpg";
import frozenMolokhiaImg from "@/assets/frozen-molokhia.jpg";
import frozenOkraImg from "@/assets/frozen-okra.jpg";
import frozenPeasImg from "@/assets/frozen-peas.jpg";
import frozenPeasCarrotsImg from "@/assets/frozen-peas-carrots.jpg";
import frozenMixedVegImg from "@/assets/frozen-mixed-vegetables.jpg";
import frozenArtichokeImg from "@/assets/frozen-artichoke.jpg";
import frozenCauliflowerImg from "@/assets/frozen-cauliflower.jpg";
import frozenBroccoliImg from "@/assets/frozen-broccoli.jpg";
import frozenFrenchFriesImg from "@/assets/frozen-french-fries-iqf.jpg";

export type Trade = "export";

export type ProductCategory = {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  sort_order: number;
  active: boolean;
  trade: Trade;
};

export type ProductRow = {
  id: string;
  slug: string;
  trade: Trade;
  category_id: string | null;
  name_en: string;
  name_ar: string;
  intro_en: string;
  intro_ar: string;
  description_en: string;
  description_ar: string;
  specs_en: Partial<ProductSpecs>;
  specs_ar: Partial<ProductSpecs>;
  hidden_specs: string[];
  main_image: string;
  gallery: string[];
  published: boolean;
  sort_order: number;
};

export const EMPTY_SPECS: ProductSpecs = {
  scientificName: "",
  origin: "",
  category: "",
  variety: "",
  season: "",
  sizes: "",
  color: "",
  taste: "",
  packaging: "",
  shelfLife: "",
  storageTemp: "",
  transportation: "",
  moq: "",
  loading: "",
  certifications: "",
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const DEFAULT_CATEGORIES: ProductCategory[] = [
  { id: "cat-fruits", slug: "fresh-fruits", name_en: "Fresh Fruits", name_ar: "فواكه طازجة", sort_order: 1, active: true, trade: "export" },
  { id: "cat-vegetables", slug: "fresh-vegetables", name_en: "Fresh Vegetables", name_ar: "خضروات طازجة", sort_order: 2, active: true, trade: "export" },
  { id: "cat-frozen-fruits", slug: "frozen-fruits", name_en: "Frozen Fruits", name_ar: "فواكه مجمدة", sort_order: 3, active: true, trade: "export" },
  { id: "cat-frozen-vegetables", slug: "frozen-vegetables", name_en: "Frozen Vegetables", name_ar: "خضروات مجمدة", sort_order: 4, active: true, trade: "export" },
];

function seedProducts(): ProductRow[] {
  // 12 base catalog products (6 Fresh Fruits, 6 Fresh Vegetables)
  const baseFresh = CATALOG.map((p, idx) => ({
    id: `prod-${p.slug}`,
    slug: p.slug,
    trade: "export" as Trade,
    category_id: p.group === "fruits" ? "cat-fruits" : "cat-vegetables",
    name_en: p.en.name,
    name_ar: p.ar.name,
    intro_en: p.en.intro,
    intro_ar: p.ar.intro,
    description_en: p.en.description,
    description_ar: p.ar.description,
    specs_en: p.en.specs,
    specs_ar: p.ar.specs,
    hidden_specs: [],
    main_image: p.main,
    gallery: p.gallery,
    published: true,
    sort_order: p.group === "fruits" ? idx + 1 : idx + 5,
  }));

  // Separate base catalog into fruits & vegetables
  const baseFruits = baseFresh.filter((p) => p.category_id === "cat-fruits");
  const baseVeggies = baseFresh.filter((p) => p.category_id === "cat-vegetables");

  // 4 Additional Fresh Fruits (total: 10 Fresh Fruits)
  const moreFreshFruits: ProductRow[] = [
    {
      id: "prod-mandarins",
      slug: "mandarins",
      trade: "export",
      category_id: "cat-fruits",
      name_en: "Egyptian Mandarins & Clementines",
      name_ar: "يوسفي وكليمنتين مصري",
      intro_en: "Vibrant, easy-peeling Egyptian mandarins and clementines bursting with aromatic sweetness.",
      intro_ar: "يوسفي وكليمنتين مصري زاهي اللون سهل التقشير مفعم بالحلاوة والعصير العطري.",
      description_en: "Cultivated in Egypt's citrus heartlands under abundant sunshine. Known for intense aroma, thin smooth rind, and sweet seedless flesh. Graded, waxed, and packed in reefer containers.",
      description_ar: "يُزرع في بساتين الحمضيات المصرية تحت أشعة الشمس الساطعة، ويتميز بقشرة ملساء رقيقة ونكهة سكرية فواحة غنية بالعصير وخالية من البذور، معبأ بأعلى مواصفات التصدير العالمية.",
      specs_en: {
        scientificName: "Citrus reticulata",
        origin: "Egypt",
        category: "Fresh Fruits",
        variety: "Fremont, Murcott, Clementine",
        season: "November – April",
        sizes: "Caliber 1 to 5 (60–85mm)",
        color: "Deep glossy orange",
        taste: "Sweet, aromatic, highly juicy",
        packaging: "10kg / 15kg open-top or telescopic cartons",
        shelfLife: "30–45 days at recommended conditions",
        storageTemp: "4°C – 6°C, 85-90% RH",
        transportation: "Reefer container at 5°C",
        moq: "1 x 40ft Reefer Container (approx. 24 MT)",
        loading: "24 MT per 40ft HC reefer",
        certifications: "GLOBALG.A.P., ISO 22000, Phytosanitary Certificate",
      },
      specs_ar: {
        scientificName: "Citrus reticulata",
        origin: "مصر",
        category: "فواكه طازجة",
        variety: "فريمونت، موركوت، كليمنتين",
        season: "نوفمبر – أبريل",
        sizes: "عيار 1 إلى 5 (60–85 ملم)",
        color: "برتقالي داكن لامع",
        taste: "حلو غني بالعصير ونكهة عطرية فائقة",
        packaging: "كرتون 10 كجم / 15 كجم تلسكوبي أو مكشوف",
        shelfLife: "30–45 يومًا في الظروف الموصى بها",
        storageTemp: "4–6 درجات مئوية، رطوبة 85-90%",
        transportation: "حاويات ريفر مبردة عند 5 مئوية",
        moq: "حاوية مبردة 40 قدم (24 طن متري)",
        loading: "24 طن للحاوية 40 قدم",
        certifications: "جلوبال جاب، آيزو 22000، شهادة زراعية",
      },
      hidden_specs: [],
      main_image: mandarinsImg,
      gallery: [mandarinsImg],
      published: true,
      sort_order: 7,
    },
    {
      id: "prod-guava",
      slug: "guava",
      trade: "export",
      category_id: "cat-fruits",
      name_en: "Fresh Egyptian Guava",
      name_ar: "جوافة مصرية فاخرة",
      intro_en: "Fragrant, vitamin-C rich Egyptian white and pink guavas from coastal and delta groves.",
      intro_ar: "جوافة مصرية بيضاء ووردية زكية الرائحة غنية بفيتامين سي من مزارع الدلتا والساحل.",
      description_en: "Celebrated for their powerful tropical scent and sweet creamy pulp. Harvested firm-ripe, sorted by size, and packed into foam-netted export cartons for air and fast sea freight.",
      description_ar: "تتميز برائحتها الاستوائية العطرية النفاذة وقوامها اللحمي المتماسك الحلو، تُحصد في طور النضج المناسب وتُفرز وتُغلّف بشباك إسفنجية لحمايتها خلال الشحن الجوي والبحري السريع.",
      specs_en: {
        scientificName: "Psidium guajava",
        origin: "Egypt",
        category: "Fresh Fruits",
        variety: "Baladi White, Pink Guava",
        season: "August – December",
        sizes: "Small (60–80g), Medium (80–120g), Large (120–180g)",
        color: "Yellowish-green exterior, creamy white/pink pulp",
        taste: "Sweet, fragrant, intense tropical aroma",
        packaging: "2kg / 4kg / 5kg export cartons with foam netting",
        shelfLife: "14–21 days under cold chain",
        storageTemp: "8°C – 10°C, 90% RH",
        transportation: "Air freight or Reefer container",
        moq: "Air: 1,000 kg / Sea: 1 x 40ft Reefer",
        loading: "Up to 20 MT per 40ft reefer",
        certifications: "GLOBALG.A.P., Phytosanitary Certificate, ISO 22000",
      },
      specs_ar: {
        scientificName: "Psidium guajava",
        origin: "مصر",
        category: "فواكه طازجة",
        variety: "بلدي أبيض، جوافة وردية",
        season: "أغسطس – ديسمبر",
        sizes: "صغير (60–80 جم)، متوسط (80–120 جم)، كبير (120–180 جم)",
        color: "أخضر مصفر من الخارج، لحم أبيض كريمي أو وردي",
        taste: "حلو سكري ونكهة استوائية عطرية نفاذة",
        packaging: "كرتون 2 كجم / 4 كجم / 5 كجم بشباك حماية",
        shelfLife: "14–21 يومًا في سلسلة التبريد",
        storageTemp: "8–10 درجات مئوية، رطوبة 90%",
        transportation: "شحن جوي سريع أو بحري مبرد",
        moq: "جوي: 1000 كجم / بحري: حاوية 40 قدم",
        loading: "حتى 20 طن للحاوية 40 قدم",
        certifications: "جلوبال جاب، شهادة فحص زراعي، آيزو 22000",
      },
      hidden_specs: [],
      main_image: guavaImg,
      gallery: [guavaImg],
      published: true,
      sort_order: 8,
    },
    {
      id: "prod-watermelon",
      slug: "watermelon",
      trade: "export",
      category_id: "cat-fruits",
      name_en: "Egyptian Fresh Watermelon",
      name_ar: "بطيخ مصري أحمر فاخر",
      intro_en: "Crisp, deeply refreshing Egyptian watermelons with high sugar Brix and deep red flesh.",
      intro_ar: "بطيخ مصري مقرمش وفائق الانتعاش بنسبة سكريات عالية ولحم أحمر قانٍ.",
      description_en: "Grown in warm desert reclamations and Delta soils. Thick protective rind ensures exceptional sea shipping endurance. Packed in heavy-duty octabins or cartons.",
      description_ar: "يزرع في أراضي الاستصلاح والدلتا تحت شمس مصر الساطعة، قشرته المتينة تتحمل أطول رحلات الشحن البحري، بلحم أحمر متماسك ونسبة حلاوة استثنائية.",
      specs_en: {
        scientificName: "Citrullus lanatus",
        origin: "Egypt",
        category: "Fresh Fruits",
        variety: "Giza 1, Aswan, Crimson Sweet",
        season: "April – September",
        sizes: "Calibrated 5–7kg, 7–10kg, 10–14kg per fruit",
        color: "Striped or solid dark green rind, ruby-red flesh",
        taste: "Sweet, crisp, highly refreshing",
        packaging: "500kg heavy-duty carton bins or 20kg master cartons",
        shelfLife: "25–35 days under proper cooling",
        storageTemp: "10°C – 12°C, 85-90% RH",
        transportation: "Reefer container at 10°C",
        moq: "1 x 40ft Reefer Container (approx. 24 MT)",
        loading: "24 MT per 40ft container",
        certifications: "GLOBALG.A.P., Phytosanitary Certificate",
      },
      specs_ar: {
        scientificName: "Citrullus lanatus",
        origin: "مصر",
        category: "فواكه طازجة",
        variety: "جيزة 1، أسوان، كريمسون سويت",
        season: "أبريل – سبتمبر",
        sizes: "معاير 5–7 كجم، 7–10 كجم، 10–14 كجم للحبة",
        color: "قشرة مخططة أو خضراء داكنة ولحم أحمر ياقوتي",
        taste: "حلو سكري، مقرمش، منعش للغاية",
        packaging: "صناديق جامبو 500 كجم أو كراتين 20 كجم",
        shelfLife: "25–35 يومًا في التبريد المناسب",
        storageTemp: "10–12 درجة مئوية، رطوبة 85-90%",
        transportation: "حاوية مبردة ريفر عند 10 مئوية",
        moq: "حاوية مبردة 40 قدم (24 طن متري)",
        loading: "24 طن لكل حاوية 40 قدم",
        certifications: "جلوبال جاب، شهادة فحص زراعي",
      },
      hidden_specs: [],
      main_image: watermelonImg,
      gallery: [watermelonImg],
      published: true,
      sort_order: 9,
    },
    {
      id: "prod-fresh-dates",
      slug: "fresh-dates",
      trade: "export",
      category_id: "cat-fruits",
      name_en: "Fresh Barhi & Semi-Dry Dates",
      name_ar: "بلح وتمور برحي مصرية",
      intro_en: "Golden crunchy fresh Barhi dates and premium semi-dry export dates from Egyptian oases.",
      intro_ar: "بلح برحي أصفر ذهبي مقرمش وتمور نصف جافة فاخرة من واحات مصر الخصبة.",
      description_en: "Egypt is the world's leading date producer. Our fresh Barhi dates are hand-picked at the golden Khalal stage, crispy and naturally sweet with zero astringency.",
      description_ar: "تتصدر مصر الإنتاج العالمي للتمور. يُقطف بلح البرحي يدويًا في مرحلة الخلال الصفراء الزاهية بمذاق سكري مقرمش وقيمة غذائية وطاقة عالية خالية من أي مرارة.",
      specs_en: {
        scientificName: "Phoenix dactylifera",
        origin: "Egypt (Siwa & Toshka)",
        category: "Fresh Fruits",
        variety: "Barhi, Medjool, Siwi",
        season: "August – November (Fresh), Year-round (Semi-Dry)",
        sizes: "Jumbo (>22g), Large (18–22g), Medium (14–18g)",
        color: "Vibrant golden yellow / Amber brown",
        taste: "Crunchy, honey-sweet, rich in natural fructose",
        packaging: "4.5kg / 5kg export cartons, 500g punnets",
        shelfLife: "Fresh Barhi: 45 days at 0–1°C / Semi-Dry: 12 months",
        storageTemp: "0°C – 2°C for Fresh Barhi, -18°C for extended storage",
        transportation: "Reefer container at 0°C or Air Freight",
        moq: "1 x 40ft Reefer Container (approx. 20 MT)",
        loading: "4,000 cartons (5kg) per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, Halal, Phytosanitary",
      },
      specs_ar: {
        scientificName: "Phoenix dactylifera",
        origin: "مصر (سيوة وتوشكى)",
        category: "فواكه طازجة",
        variety: "برحي، مجدول، سيوي",
        season: "أغسطس – نوفمبر (طازج)، طوال العام (نصف جاف)",
        sizes: "جامبو (أكبر من 22 جم)، كبير (18–22 جم)، وسط (14–18 جم)",
        color: "أصفر ذهبي ساطع / بني عنبري",
        taste: "مقرمش وسكري عسلي وغني بالطاقة الطبيعية",
        packaging: "كرتون 4.5 كجم / 5 كجم أو عبوات 500 جم",
        shelfLife: "البرحي الطازج: 45 يومًا عند 0–1 مئوية / نصف جاف: 12 شهرًا",
        storageTemp: "0–2 درجة مئوية للبرحي الطازج، أو -18 للتخزين الممتد",
        transportation: "حاوية مبردة عند 0 مئوية أو شحن جوي",
        moq: "حاوية مبردة 40 قدم (20 طن متري)",
        loading: "4000 كرتونة (5 كجم) لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، حلال، شهادة زراعية",
      },
      hidden_specs: [],
      main_image: freshDatesImg,
      gallery: [freshDatesImg],
      published: true,
      sort_order: 10,
    },
    {
      id: "prod-fresh-blueberries",
      slug: "fresh-blueberries",
      trade: "export",
      category_id: "cat-fruits",
      name_en: "Fresh Egyptian Blueberries",
      name_ar: "توت أزرق طازج فاخر",
      intro_en: "Plump, antioxidant-rich Egyptian fresh blueberries with natural silvery bloom.",
      intro_ar: "حبات توت أزرق مصري طازج فاخر ممتلئة غنية بمضادات الأكسدة وبطبقة الشمع الطبيعية.",
      description_en: "Carefully hand-picked from state-of-the-art climate-controlled berry orchards in Egypt. Known for high brix sweetness, firm snap, and exceptional shelf life. Immediately pre-cooled and packaged into punnets for rapid express air freight and chilled maritime shipping.",
      description_ar: "يُقطف يدوياً بعناية فائقة من أحدث مزارع التوت المصرية المتطورة، ويتميز بحباته الجامبو المتماسكة ونكهته العصيرية الحلوة الغنية بالفيتامينات، يُبرّد فوراً بعد الحصاد ويُعبأ في عبوات بانيت مخصصة للتصدير الجوي والبحري السريع.",
      specs_en: {
        scientificName: "Vaccinium corymbosum",
        origin: "Egypt",
        category: "Fresh Fruits",
        variety: "Biloxi, Ventura, Emerald, Jewel",
        season: "January – May",
        sizes: "Jumbo (16–18mm+), Large (14–16mm)",
        color: "Deep indigo blue with natural silvery waxy bloom",
        taste: "Sweet, refreshing, bursting with natural berry juice",
        packaging: "125g / 250g punnets / clamshells (12 x 125g carton = 1.5kg net)",
        shelfLife: "14–21 days at 0°C – 1°C",
        storageTemp: "0°C – 1°C, 90–95% RH",
        transportation: "Reefer air freight / refrigerated container at 0°C",
        moq: "Air freight: 500 kg / Sea freight: 1 x 40ft Reefer",
        loading: "125g x 12 clamshells per carton, 3,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Phytosanitary Certificate",
      },
      specs_ar: {
        scientificName: "Vaccinium corymbosum",
        origin: "مصر",
        category: "فواكه طازجة",
        variety: "بيلوكسي، فينتورا، إميرالد، جويل",
        season: "يناير – مايو",
        sizes: "جامبو (16–18+ ملم)، كبير (14–16 ملم)",
        color: "أزرق نيلي داكن مع طبقة الشمع الفضية الطبيعية",
        taste: "حلو منعش مفعم بالعصير الطبيعي ومضادات الأكسدة",
        packaging: "بانيتات 125 جم / 250 جم (كرتون 12 × 125 جم = 1.5 كجم)",
        shelfLife: "14–21 يومًا عند 0–1 درجة مئوية",
        storageTemp: "0–1 درجة مئوية، رطوبة 90-95%",
        transportation: "شحن جوي مبرد سريع أو حاويات ريفر عند 0 مئوية",
        moq: "شحن جوي: 500 كجم / حاوية مبردة 40 قدم",
        loading: "3200 كرتونة لكل حاوية 40 قدم",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، شهادة زراعية",
      },
      hidden_specs: [],
      main_image: freshBlueberriesImg,
      gallery: [freshBlueberriesImg],
      published: true,
      sort_order: 11,
    },
    {
      id: "prod-fresh-raspberries",
      slug: "fresh-raspberries",
      trade: "export",
      category_id: "cat-fruits",
      name_en: "Fresh Egyptian Raspberries",
      name_ar: "توت العليق الأحمر طازج",
      intro_en: "Vibrant ruby-red Egyptian fresh raspberries, delicate, sweet and highly aromatic.",
      intro_ar: "توت عليق أحمر مصري طازج زاهي اللون، متماسك وفائق الحلاوة والعطرية.",
      description_en: "Cultivated in modern precision-farming shade tunnels, yielding firm, juicy, deep ruby-red drupelets with delicate velvet texture. Hand-harvested at dawn directly into export clamshells and hydrocooled under strict unbroken cold chain protocols.",
      description_ar: "يُزرع تحت صُوَب وأنظمة زراعة دقيقة وحديثة لضمان حبات متماسكة ياقوتية الحمرة ذات ملمس مخملي وقوام غني، تُجمع يدوياً عند الفجر مباشرة في عبوات التصدير وتُبرّد سريعاً للحفاظ على أعلى درجات الطزاجة.",
      specs_en: {
        scientificName: "Rubus idaeus",
        origin: "Egypt",
        category: "Fresh Fruits",
        variety: "Adelita, Maravilla, Heritage",
        season: "November – April",
        sizes: "Uniform large drupelets (18–22mm caliber)",
        color: "Bright radiant ruby red, velvety surface",
        taste: "Sweet-tangy balance, exquisitely aromatic and fresh",
        packaging: "125g breathable clamshells (12 punnets x 125g = 1.5kg carton)",
        shelfLife: "7–10 days with continuous cold chain (0–1°C)",
        storageTemp: "0°C – 0.5°C, 90–95% RH",
        transportation: "Express reefer air freight",
        moq: "Air shipment: 300 – 500 kg",
        loading: "Master cartons palletized for rapid airport clearance",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Phytosanitary Certificate",
      },
      specs_ar: {
        scientificName: "Rubus idaeus",
        origin: "مصر",
        category: "فواكه طازجة",
        variety: "أديلتا، مارافيلا، هيريتدج",
        season: "نوفمبر – أبريل",
        sizes: "حبات متناسقة كبيرة (عيار 18–22 ملم)",
        color: "أحمر ياقوتي نضر بسطح مخملي ناعم",
        taste: "توازن رائع بين الحلاوة والانتعاش بنكهة عطرية مميزة",
        packaging: "بانيتات مهواة 125 جم (12 بانيت × 125 جم = كرتون 1.5 كجم)",
        shelfLife: "7–10 أيام في سلسلة التبريد المتواصلة (0–1 مئوية)",
        storageTemp: "0–0.5 درجة مئوية، رطوبة 90-95%",
        transportation: "شحن جوي سريع مبرد",
        moq: "شحن جوي: 300 – 500 كجم",
        loading: "باليتات كراتين مجهزة للإفراج الجمركي السريع في المطارات",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، شهادة زراعية",
      },
      hidden_specs: [],
      main_image: freshRaspberriesImg,
      gallery: [freshRaspberriesImg],
      published: true,
      sort_order: 12,
    },
  ];

  // 4 Additional Fresh Vegetables (total: 10 Fresh Vegetables)
  const moreFreshVeggies: ProductRow[] = [
    {
      id: "prod-carrots",
      slug: "carrots",
      trade: "export",
      category_id: "cat-vegetables",
      name_en: "Fresh Egyptian Carrots",
      name_ar: "جزر مصري طازج",
      intro_en: "Crunchy, sweet bright orange Egyptian carrots, washed, polished and graded for export.",
      intro_ar: "جزر مصري برتقالي زاهي حلو المذاق ومقرمش، مغسول ومصقول ومصنف للتصدير الدولي.",
      description_en: "Grown in sandy reclaimed soils producing smooth, straight roots with high carotene and sugar content. Hydrocooled immediately post-harvest and packed in chilled cartons.",
      description_ar: "يُزرع في أراضي رملية حديثة تمنحه استقامة ونعومة فائقة ولونًا برتقاليًا غنيًا بالبيتا كاروتين، يُغسل ويُبرّد مائيًا على الفور للحفاظ على القرمشة والنضارة.",
      specs_en: {
        scientificName: "Daucus carota",
        origin: "Egypt",
        category: "Fresh Vegetables",
        variety: "Kuroda, Nantes, Chantenay",
        season: "December – June",
        sizes: "Small (100–150g), Medium (150–200g), Large (200–250g+)",
        color: "Vivid deep orange",
        taste: "Sweet, crisp, highly succulent",
        packaging: "5kg / 10kg poly bags inside master cartons or mesh bags",
        shelfLife: "60–90 days under controlled storage",
        storageTemp: "0°C – 1°C, 95% RH",
        transportation: "Reefer container at 0.5°C",
        moq: "1 x 40ft Reefer Container (approx. 24–26 MT)",
        loading: "2,400 cartons (10kg) per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, Phytosanitary",
      },
      specs_ar: {
        scientificName: "Daucus carota",
        origin: "مصر",
        category: "خضروات طازجة",
        variety: "كورودا، نانت، شانتناي",
        season: "ديسمبر – يونيو",
        sizes: "صغير (100–150 جم)، وسط (150–200 جم)، كبير (200–250 جم فما فوق)",
        color: "برتقالي ناصع وداكن",
        taste: "حلو المذاق ومقرمش وغني بالعصارة",
        packaging: "أكياس بولي إيثيلين 5 / 10 كجم داخل كراتين أو شبك",
        shelfLife: "60–90 يومًا في التخزين المبرد المتحكم به",
        storageTemp: "0–1 درجة مئوية، رطوبة 95%",
        transportation: "حاوية مبردة ريفر عند 0.5 مئوية",
        moq: "حاوية مبردة 40 قدم (24–26 طن متري)",
        loading: "2400 كرتونة (10 كجم) لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، شهادة فحص زراعي",
      },
      hidden_specs: [],
      main_image: carrotsImg,
      gallery: [carrotsImg],
      published: true,
      sort_order: 17,
    },
    {
      id: "prod-tomatoes",
      slug: "tomatoes",
      trade: "export",
      category_id: "cat-vegetables",
      name_en: "Fresh Vine & Round Tomatoes",
      name_ar: "طماطم مصرية طازجة وعناقيد",
      intro_en: "Firm, rich-red sun-ripened tomatoes, hand-selected for export shelf life and flavor.",
      intro_ar: "طماطم حمراء صلبة ناضجة تحت أشعة الشمس، منتقاة يدويًا لتحمل الشحن واكتمال النكهة.",
      description_en: "Cultivated under protected greenhouse structures and open sunny fields. Solid thick walls and balanced acid-Brix ratio guarantee outstanding freshness throughout transit.",
      description_ar: "تُزرع داخل بيوت محمية حديثة ومزارع مكشوفة تحت شمس مصر الدافئة، وتتميز بجدران ثمار سميكة وصلابة ممتازة ونسبة حموضة وسكريات متوازنة لتحمل الشحن.",
      specs_en: {
        scientificName: "Solanum lycopersicum",
        origin: "Egypt",
        category: "Fresh Vegetables",
        variety: "Round Salad, Roma Plum, Cherry on vine",
        season: "November – May",
        sizes: "Caliber M (47–57mm), L (57–67mm), XL (67–82mm)",
        color: "Stage 3 (turning) to Stage 5 (full red)",
        taste: "Rich tomato flavor, balanced sweetness and acidity",
        packaging: "5kg / 6kg telescopic export cartons with molded trays",
        shelfLife: "21–28 days at optimal cooling",
        storageTemp: "10°C – 12°C, 85-90% RH",
        transportation: "Reefer container at 11°C",
        moq: "1 x 40ft Reefer Container (approx. 20–22 MT)",
        loading: "3,600 cartons (5kg) per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, Phytosanitary",
      },
      specs_ar: {
        scientificName: "Solanum lycopersicum",
        origin: "مصر",
        category: "خضروات طازجة",
        variety: "مستديرة مائدة، روما بلح، شيري عناقيد",
        season: "نوفمبر – مايو",
        sizes: "عيار M (47–57 ملم)، L (57–67 ملم)، XL (67–82 ملم)",
        color: "درجة تلوين 3 إلى 5 (أحمر ناضج)",
        taste: "نكهة طماطم أصيلة وتوازن مثالي بين الحموضة والحلاوة",
        packaging: "كرتون 5 كجم / 6 كجم مع أطباق رص داخلية",
        shelfLife: "21–28 يومًا في التبريد المثالي",
        storageTemp: "10–12 درجة مئوية، رطوبة 85-90%",
        transportation: "حاوية مبردة ريفر عند 11 مئوية",
        moq: "حاوية مبردة 40 قدم (20–22 طن متري)",
        loading: "3600 كرتونة (5 كجم) لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، شهادة زراعية",
      },
      hidden_specs: [],
      main_image: tomatoesImg,
      gallery: [tomatoesImg],
      published: true,
      sort_order: 18,
    },
    {
      id: "prod-iceberg-lettuce",
      slug: "iceberg-lettuce",
      trade: "export",
      category_id: "cat-vegetables",
      name_en: "Fresh Iceberg Lettuce",
      name_ar: "خس كابوتشا مصري",
      intro_en: "Dense, crisp heads of Egyptian iceberg lettuce, individually wrapped and vacuum-cooled.",
      intro_ar: "رؤوس خس كابوتشا مصري متراصة ومقرمشة، مغلفة فرديًا ومبردة بالشفط الهوائي السريع.",
      description_en: "Harvested early in the morning, immediately vacuum cooled to 1°C within 30 minutes of field arrival. Each head is wrapped in micro-perforated film to guarantee field-fresh crispness.",
      description_ar: "يُحصد في الصباح الباكر ويخضع للتبريد الفراغي السريع حتى 1 درجة مئوية خلال 30 دقيقة فقط من الحصاد، وتُغلف كل رأس بغشاء مسامي يحافظ على القرمشة التامة.",
      specs_en: {
        scientificName: "Lactuca sativa var. capitata",
        origin: "Egypt",
        category: "Fresh Vegetables",
        variety: "Platinas, Silvinas",
        season: "November – April",
        sizes: "400–600g (Grade 12), 600–800g (Grade 10)",
        color: "Bright light green outer leaves, creamy white heart",
        taste: "Ultra-crisp, refreshing, mild",
        packaging: "10 or 12 heads per carton (approx. 6–8kg net)",
        shelfLife: "21–28 days at 1°C",
        storageTemp: "1°C – 2°C, 95% RH",
        transportation: "Reefer container at 1°C with controlled air flow",
        moq: "1 x 40ft Reefer Container (approx. 18–20 MT)",
        loading: "2,400 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, Phytosanitary",
      },
      specs_ar: {
        scientificName: "Lactuca sativa var. capitata",
        origin: "مصر",
        category: "خضروات طازجة",
        variety: "بلاتيناس، سيلفيناس",
        season: "نوفمبر – أبريل",
        sizes: "400–600 جم (نمرة 12)، 600–800 جم (نمرة 10)",
        color: "أخضر فاتح مشرق من الخارج وقلب أبيض كريمي",
        taste: "قرمشة فائقة، منعش وخفيف المذاق",
        packaging: "10 أو 12 رأس في الكرتونة (6–8 كجم صافي)",
        shelfLife: "21–28 يومًا عند 1 درجة مئوية",
        storageTemp: "1–2 درجة مئوية، رطوبة 95%",
        transportation: "حاوية مبردة ريفر عند 1 مئوية",
        moq: "حاوية مبردة 40 قدم (18–20 طن متري)",
        loading: "2400 كرتونة لكل حاوية 40 قدم",
        certifications: "جلوبال جاب، آيزو 22000، شهادة فحص زراعي",
      },
      hidden_specs: [],
      main_image: icebergLettuceImg,
      gallery: [icebergLettuceImg],
      published: true,
      sort_order: 19,
    },
    {
      id: "prod-eggplant",
      slug: "eggplant",
      trade: "export",
      category_id: "cat-vegetables",
      name_en: "Fresh Egyptian Eggplant",
      name_ar: "باذنجان مصري رومي وأسود",
      intro_en: "Glossy deep-purple Egyptian eggplants with firm white seedless pulp.",
      intro_ar: "باذنجان مصري أسود ولامع ذو قوام لحمي أبيض متماسك وخالٍ من البذور.",
      description_en: "Hand-harvested at optimal size, featuring a fresh green calyx and mirror-like glossy black skin. Known for its mild sweet taste and low water content ideal for roasting and stuffing.",
      description_ar: "يُحصد يدويًا بعناية عند الحجم المثالي بقمع أخضر نضر وقشرة سوداء لامعة، ويتميز بلحم أبيض إسفنجي متماسك خفيف البذور ونكهة ممتازة للطهي والشواء.",
      specs_en: {
        scientificName: "Solanum melongena",
        origin: "Egypt",
        category: "Fresh Vegetables",
        variety: "Black Beauty, Classic Globe, Long Black",
        season: "October – May",
        sizes: "Medium (250–350g), Large (350–500g)",
        color: "Deep jet black / glossy violet with green calyx",
        taste: "Mild, tender, non-bitter",
        packaging: "5kg / 6kg export cartons",
        shelfLife: "14–20 days under cold chain",
        storageTemp: "10°C – 12°C, 90% RH",
        transportation: "Reefer container at 11°C",
        moq: "1 x 40ft Reefer Container (approx. 20 MT)",
        loading: "3,500 cartons (5kg) per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, Phytosanitary",
      },
      specs_ar: {
        scientificName: "Solanum melongena",
        origin: "مصر",
        category: "خضروات طازجة",
        variety: "بلاك بيوتي، رومي كلاسيك، طويل أسود",
        season: "أكتوبر – مايو",
        sizes: "وسط (250–350 جم)، كبير (350–500 جم)",
        color: "أسود بنفسجي داكن براق مع قمع أخضر نضر",
        taste: "لحمي طري وخفيف المذاق بدون مرارة",
        packaging: "كرتون 5 كجم / 6 كجم مخصص للتصدير",
        shelfLife: "14–20 يومًا في سلسلة التبريد",
        storageTemp: "10–12 درجة مئوية، رطوبة 90%",
        transportation: "حاوية مبردة ريفر عند 11 مئوية",
        moq: "حاوية مبردة 40 قدم (20 طن متري)",
        loading: "3500 كرتونة (5 كجم) لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، شهادة فحص زراعي",
      },
      hidden_specs: [],
      main_image: eggplantImg,
      gallery: [eggplantImg],
      published: true,
      sort_order: 20,
    },
    {
      id: "prod-white-eggplant",
      slug: "white-eggplant",
      trade: "export",
      category_id: "cat-vegetables",
      name_en: "Fresh Egyptian White Eggplant",
      name_ar: "باذنجان أبيض مصري طازج",
      intro_en: "Slender, glossy pearl-white Egyptian eggplants with mild, sweet and tender flesh.",
      intro_ar: "باذنجان أبيض مصري عروس لؤلؤي لامع بقمع أخضر نضر وقوام سكري خفيف خالي من المرارة.",
      description_en: "Cultivated in Egypt's fertile Nile Delta and reclaimed agricultural lands. Characterized by its delicate, non-bitter tender white flesh and glossy ivory skin with vibrant green calyx. A highly sought-after gourmet crop across European and Middle Eastern markets for stuffing and Mediterranean grilling.",
      description_ar: "يُزرع في أراضي مصر الخصبة تحت أشعة شمس دافئة، ويتميز بثمار رفيعة ملساء ناصعة البياض اللؤلؤي وقمع أخضر قوي، خفيف البذور ولحمه أبيض طري ذو طعم سكري لا يشوبه أي مرارة، مطلوب بشدة في الأسواق العربية والأوروبية.",
      specs_en: {
        scientificName: "Solanum melongena var. esculentum",
        origin: "Egypt",
        category: "Fresh Vegetables",
        variety: "Egyptian White Arous, Baladi White",
        season: "October – June (Peak) / Available Year-Round",
        sizes: "Medium Slender (10–14 cm length, 2.5–3.5 cm diameter)",
        color: "Glossy porcelain / pearl white with fresh green calyx",
        taste: "Mild, delicately sweet, non-bitter with fine tender seeds",
        packaging: "4kg / 5kg / 8kg ventilated telescopic export cartons or crates",
        shelfLife: "14–20 days at optimal temperature",
        storageTemp: "10°C – 12°C, 90–95% RH",
        transportation: "Reefer container at 10°C / Express air freight",
        moq: "1 x 40ft Reefer Container (approx. 20 MT) / Air cargo available",
        loading: "4,000 cartons (5kg) per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, HACCP, Phytosanitary Certificate",
      },
      specs_ar: {
        scientificName: "Solanum melongena var. esculentum",
        origin: "مصر",
        category: "خضروات طازجة",
        variety: "عروس أبيض مصري، بلدي أبيض",
        season: "أكتوبر – يونيو (ذروة الإنتاج) / متوفر طوال العام",
        sizes: "أصابع متوسطة رفيعة (طول 10–14 سم، قطر 2.5–3.5 سم)",
        color: "أبيض لؤلؤي عاجي ناصع مع قمع أخضر نضر",
        taste: "حلو خفيف غير مر، لحم متماسك وبذور دقيقة طرية",
        packaging: "كرتون تصدير مهوى 4 كجم أو 5 كجم أو أقفاص بلاستيكية",
        shelfLife: "14–20 يومًا في درجات الحرارة المثالية",
        storageTemp: "10–12 درجة مئوية، رطوبة 90-95%",
        transportation: "حاويات ريفر مبردة عند 10 مئوية أو شحن جوي",
        moq: "حاوية مبردة 40 قدم (20 طن متري) / شحن جوي متاح",
        loading: "4000 كرتونة (5 كجم) لكل حاوية 40 قدم",
        certifications: "جلوبال جاب، آيزو 22000، هاسب، شهادة زراعية",
      },
      hidden_specs: [],
      main_image: whiteEggplantImg,
      gallery: [whiteEggplantImg],
      published: true,
      sort_order: 21,
    },
  ];

  // 10 Frozen Fruits
  const frozenFruits: ProductRow[] = [
    {
      id: "prod-iqf-strawberries",
      slug: "iqf-strawberries",
      trade: "export",
      category_id: "cat-frozen-fruits",
      name_en: "IQF Frozen Strawberries",
      name_ar: "فراولة مجمدة IQF",
      intro_en: "Grade A individually quick-frozen whole strawberries from Egyptian farms.",
      intro_ar: "فراولة مجمدة كاملة درجة أولى بتقنية IQF من المزارع المصرية.",
      description_en: "Harvested at peak maturity, washed, sorted and flash frozen at -40°C to lock in freshness, vibrant color, and sweet flavor.",
      description_ar: "تُحصد في ذروة النضج، وتُغسل وتُفرز وتُجمد بالتبريد السريع عند -40 درجة مئوية للاحتفاظ بالنضارة واللون الزاهي والطعم الحلو.",
      specs_en: {
        scientificName: "Fragaria × ananassa",
        origin: "Egypt",
        category: "Frozen Fruits",
        variety: "Festival, Fortuna, Sensation",
        season: "December – May (Harvest), Available Year-Round Frozen",
        sizes: "Calibrated 15–25mm, 25–35mm, or uncalibrated",
        color: "Deep uniform natural red",
        taste: "Naturally sweet and aromatic, no added sugar",
        packaging: "10kg bulk carton with blue PE liner, or 4x2.5kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22–24 MT)",
        loading: "2,200 – 2,400 cartons per 40ft HC reefer",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal, Phytosanitary",
      },
      specs_ar: {
        scientificName: "Fragaria × ananassa",
        origin: "مصر",
        category: "فواكه مجمدة",
        variety: "فيستيفال، فورتونا، سينسيشن",
        season: "ديسمبر – مايو (الحصاد)، متوفر طوال العام مجمد",
        sizes: "معاير 15–25 ملم، 25–35 ملم، أو غير معاير",
        color: "أحمر طبيعي موحد ناصع",
        taste: "طبيعي حلو وعطري، خالي من السكر المضاف",
        packaging: "كرتونة 10 كجم مع كيس داخلي أزرق، أو 4×2.5 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات مبردة ريفر عند -18 درجة مئوية",
        moq: "حاوية مبردة 40 قدم (حوالي 22–24 طن متري)",
        loading: "2200 – 2400 كرتونة لكل حاوية 40 قدم",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال، شهادة زراعية",
      },
      hidden_specs: [],
      main_image: frozenStrawberriesImg,
      gallery: [frozenStrawberriesImg],
      published: true,
      sort_order: 21,
    },
    {
      id: "prod-iqf-mango",
      slug: "iqf-mango-chunks",
      trade: "export",
      category_id: "cat-frozen-fruits",
      name_en: "IQF Frozen Mango Chunks",
      name_ar: "قطع مانجو مجمدة IQF",
      intro_en: "Sweet and aromatic Egyptian mango chunks, individually quick frozen.",
      intro_ar: "قطع مانجو مصرية حلوة المذاق وفواحة النكهة، مجمدة بتقنية التجميد السريع IQF.",
      description_en: "Hand-peeled, diced and frozen using IQF technology to maintain the luscious tropical sweetness and firm texture.",
      description_ar: "تُقشر وتُقطع يدويًا وتُجمد بتقنية IQF للحفاظ على الحلاوة الطبيعية والقوام المتماسك.",
      specs_en: {
        scientificName: "Mangifera indica",
        origin: "Egypt (Ismailia & Upper Egypt)",
        category: "Frozen Fruits",
        variety: "Zebda, Keitt, Kent",
        season: "July – November (Harvest), Available Year-Round Frozen",
        sizes: "Diced 10x10mm, 15x15mm, 20x20mm chunks",
        color: "Vibrant golden-yellow",
        taste: "Rich, luscious tropical sweetness, 100% natural",
        packaging: "10kg bulk carton with PE inner liner / 4x2.5kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal",
      },
      specs_ar: {
        scientificName: "Mangifera indica",
        origin: "مصر (الإسماعيلية وصعيد مصر)",
        category: "فواكه مجمدة",
        variety: "زبدة، كيت، كينت",
        season: "يوليو – نوفمبر (الحصاد)، متوفر طوال العام مجمد",
        sizes: "مكعبات 10×10 ملم، 15×15 ملم، 20×20 ملم",
        color: "أصفر ذهبي زاهٍ وطبيعي",
        taste: "حلاوة استوائية طبيعية ونكهة مانجو غنية",
        packaging: "كرتون 10 كجم مع كيس داخلي / 4×2.5 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر مبردة عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال",
      },
      hidden_specs: [],
      main_image: frozenMangoImg,
      gallery: [frozenMangoImg],
      published: true,
      sort_order: 22,
    },
    {
      id: "prod-iqf-pomegranate",
      slug: "iqf-pomegranate-arils",
      trade: "export",
      category_id: "cat-frozen-fruits",
      name_en: "IQF Pomegranate Arils",
      name_ar: "حبوب رمان مجمدة IQF",
      intro_en: "100% natural, deep ruby-red Wonderful pomegranate kernels, quick frozen.",
      intro_ar: "حبوب رمان وندرفول طبيعية 100% بلون ياقوتي مميز، مجمدة سريعًا.",
      description_en: "Premium pomegranate arils separated and frozen immediately after harvest, ideal for juice processing, salads, and culinary use.",
      description_ar: "حبوب رمان فاخرة تُفصل وتُجمد مباشرة بعد الحصاد، مثالية لصناعة العصائر والاستخدام الغذائي.",
      specs_en: {
        scientificName: "Punica granatum",
        origin: "Egypt (Asyut & Manfalut)",
        category: "Frozen Fruits",
        variety: "Wonderful, 116",
        season: "September – January (Harvest), Available Year-Round Frozen",
        sizes: "Whole intact ruby-red arils",
        color: "Deep ruby red",
        taste: "Sweet-tart, crisp and refreshing",
        packaging: "10kg carton with inner food-grade liner / 1kg retail packs",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, Halal, Phytosanitary",
      },
      specs_ar: {
        scientificName: "Punica granatum",
        origin: "مصر (أسيوط ومنفلوط)",
        category: "فواكه مجمدة",
        variety: "وندرفول، 116",
        season: "سبتمبر – يناير (الحصاد)، متوفر طوال العام مجمد",
        sizes: "حبوب كاملة سليمة ياقوتية",
        color: "أحمر ياقوتي داكن",
        taste: "طبيعي يجمع بين الحلاوة والحموضة الخفيفة المنعشة",
        packaging: "كرتون 10 كجم بكيس داخلي غذائي / أكياس 1 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، حلال، شهادة زراعية",
      },
      hidden_specs: [],
      main_image: frozenPomegranateImg,
      gallery: [frozenPomegranateImg],
      published: true,
      sort_order: 23,
    },
    {
      id: "prod-iqf-guava",
      slug: "iqf-guava",
      trade: "export",
      category_id: "cat-frozen-fruits",
      name_en: "IQF Frozen Guava Halves & Dices",
      name_ar: "جوافة مجمدة أنصاف ومكعبات IQF",
      intro_en: "De-seeded Egyptian white and pink guava halves and dices, individually quick frozen.",
      intro_ar: "أنصاف ومكعبات جوافة مصرية منزوعة البذور بيضاء ووردية، مجمدة بتقنية IQF السريعة.",
      description_en: "Produced from selected fragrant Egyptian guavas, scooped of core seeds, cut into uniform halves or 10x10mm dices, and flash frozen at -40°C.",
      description_ar: "مجهزة من أجود حبات الجوافة المصرية العطرية، منزوعة البذور ومقطعة إلى أنصاف متناسقة أو مكعبات 10×10 ملم ومجمدة بتقنية التجميد السريع.",
      specs_en: {
        scientificName: "Psidium guajava",
        origin: "Egypt",
        category: "Frozen Fruits",
        variety: "Egyptian Baladi White & Pink",
        season: "Available Year-Round Frozen",
        sizes: "Halves (calibrated) / Dices (10x10mm)",
        color: "Natural creamy white / light pink",
        taste: "Intense tropical aroma, sweet creamy flavor",
        packaging: "10kg bulk carton with PE liner / 4x2.5kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, Halal",
      },
      specs_ar: {
        scientificName: "Psidium guajava",
        origin: "مصر",
        category: "فواكه مجمدة",
        variety: "بلدي مصري أبيض ووردي",
        season: "متوفر طوال العام مجمد",
        sizes: "أنصاف معايرة / مكعبات 10×10 ملم",
        color: "أبيض كريمي طبيعي / وردي فاتح",
        taste: "نكهة استوائية عطرية فواحة وحلاوة طبيعية",
        packaging: "كرتون 10 كجم مع كيس داخلي / 4×2.5 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر مبردة عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، حلال",
      },
      hidden_specs: [],
      main_image: frozenGuavaImg,
      gallery: [frozenGuavaImg],
      published: true,
      sort_order: 24,
    },
    {
      id: "prod-iqf-peaches",
      slug: "iqf-peaches",
      trade: "export",
      category_id: "cat-frozen-fruits",
      name_en: "IQF Frozen Peach Slices",
      name_ar: "شرائح خوخ مجمدة IQF",
      intro_en: "Golden sun-ripened Egyptian peach halves and slices, blanched and quick frozen.",
      intro_ar: "شرائح وأنصاف خوخ مصري ذهبي ناضج، مقشر ومجمد بالتجميد السريع IQF.",
      description_en: "Made from firm-fleshed yellow clingstone peaches. Peeled, pitted, sliced into uniform crescents and flash-frozen with an ascorbic acid glaze to prevent browning.",
      description_ar: "مصنع من أجود ثمار الخوخ الأصفر المصري الصلب، مقشر ومنزوع النواة ومقطع إلى شرائح متناسقة ومجمد سريعًا مع طبقة حماية حمضية طبيعية ضد الأكسدة.",
      specs_en: {
        scientificName: "Prunus persica",
        origin: "Egypt (Sinai & Nile Valley)",
        category: "Frozen Fruits",
        variety: "Florida Prince, Swelling, Desert Red",
        season: "Available Year-Round Frozen",
        sizes: "Slices (thickness 12–15mm) / Halves",
        color: "Golden yellow with blush red highlights",
        taste: "Naturally sweet, floral, delicate tartness",
        packaging: "10kg carton with blue PE liner / 4x2.5kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal",
      },
      specs_ar: {
        scientificName: "Prunus persica",
        origin: "مصر (سيناء ووادي النيل)",
        category: "فواكه مجمدة",
        variety: "فلوريدا برينس، سويلنج، ديزرت ريد",
        season: "متوفر طوال العام مجمد",
        sizes: "شرائح (سمك 12–15 ملم) / أنصاف",
        color: "أصفر ذهبي مع لمسات حمراء خفيفة",
        taste: "حلو طبيعي بنكهة خوخ مميزة وحموضة منعشة",
        packaging: "كرتون 10 كجم مع كيس داخلي أزرق / 4×2.5 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال",
      },
      hidden_specs: [],
      main_image: frozenPeachesImg,
      gallery: [frozenPeachesImg],
      published: true,
      sort_order: 25,
    },
    {
      id: "prod-iqf-apricots",
      slug: "iqf-apricots",
      trade: "export",
      category_id: "cat-frozen-fruits",
      name_en: "IQF Frozen Apricot Halves",
      name_ar: "مشمش مجمد أنصاف IQF",
      intro_en: "Aromatic Egyptian Canino and Baladi apricot halves, pitted and IQF frozen.",
      intro_ar: "أنصاف مشمش مصري كانينو وبلدي عطرية منزوعة النواة ومجمدة بتقنية IQF.",
      description_en: "Hand-picked during the brief Egyptian summer apricot window. Mechanically halved, pitted and individually quick-frozen to preserve bright orange color and rich jam-making texture.",
      description_ar: "يُحصد يدويًا في ذروة الموسم الصيفي القصير للمشمش المصري، يُشطر ويُنزع نواه ويُجمد بالتبريد السريع لحفظ اللون البرتقالي المشرق والقوام الغني المناسب للتصنيع والمربى.",
      specs_en: {
        scientificName: "Prunus armeniaca",
        origin: "Egypt (Amar & Fayoum)",
        category: "Frozen Fruits",
        variety: "Canino, Baladi (Amar)",
        season: "Available Year-Round Frozen",
        sizes: "Halves (calibrated 25–35mm)",
        color: "Vivid deep orange / amber",
        taste: "Rich, tart-sweet, intensely aromatic",
        packaging: "10kg carton with inner liner / 4x2.5kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, Halal",
      },
      specs_ar: {
        scientificName: "Prunus armeniaca",
        origin: "مصر (العمار والفيوم)",
        category: "فواكه مجمدة",
        variety: "كانينو، بلدي عماري",
        season: "متوفر طوال العام مجمد",
        sizes: "أنصاف (معايرة 25–35 ملم)",
        color: "برتقالي عنبري مشرق",
        taste: "نكهة مشمش عطرية قوية تجمع الحلاوة والحموضة اللطيفة",
        packaging: "كرتون 10 كجم مع كيس داخلي / 4×2.5 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، حلال",
      },
      hidden_specs: [],
      main_image: frozenApricotsImg,
      gallery: [frozenApricotsImg],
      published: true,
      sort_order: 26,
    },
    {
      id: "prod-iqf-figs",
      slug: "iqf-figs",
      trade: "export",
      category_id: "cat-frozen-fruits",
      name_en: "IQF Frozen Whole & Halved Figs",
      name_ar: "تين مجمد أنصاف وكامل IQF",
      intro_en: "Sweet, honey-rich Egyptian Black Mission and Sultani figs, quick frozen.",
      intro_ar: "تين مصري سلطاني وأسود حلو المذاق كالعسل، مجمد بالتبريد السريع.",
      description_en: "Grown on Egypt's North Coast and delta orchards. Washed, sorted, stemmed and blast-frozen whole or halved to lock in natural sugars and exquisite seeded texture.",
      description_ar: "يزرع في بساتين الساحل الشمالي والدلتا، يُغسل ويُفرز وتُنزع أعناقه ويُجمد كاملًا أو أنصافًا بالتبريد السريع للحفاظ على السكريات العسلية وقوام البذور المقرمش.",
      specs_en: {
        scientificName: "Ficus carica",
        origin: "Egypt (North Coast & Fayoum)",
        category: "Frozen Fruits",
        variety: "Sultani (Green-Brown), Black Mission",
        season: "Available Year-Round Frozen",
        sizes: "Whole calibrated 25–35mm / Halved",
        color: "Deep purple-black or yellowish-green with red pulp",
        taste: "Honey-sweet, rich, succulent",
        packaging: "10kg carton with inner food liner / 4x2.5kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, Halal",
      },
      specs_ar: {
        scientificName: "Ficus carica",
        origin: "مصر (الساحل الشمالي والفيوم)",
        category: "فواكه مجمدة",
        variety: "سلطاني، أسود",
        season: "متوفر طوال العام مجمد",
        sizes: "كامل معاير 25–35 ملم / أنصاف",
        color: "بنفسجي داكن أو أخضر مصفر مع لب أحمر غني",
        taste: "حلو كالعسل، قوام غني وطري",
        packaging: "كرتون 10 كجم مع كيس داخلي / 4×2.5 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، حلال",
      },
      hidden_specs: [],
      main_image: frozenFigsImg,
      gallery: [frozenFigsImg],
      published: true,
      sort_order: 27,
    },
    {
      id: "prod-iqf-blackberries",
      slug: "iqf-blackberries",
      trade: "export",
      category_id: "cat-frozen-fruits",
      name_en: "IQF Frozen Blackberries",
      name_ar: "توت أسود مجمد IQF",
      intro_en: "Whole, plump cultivated blackberries, flash frozen to preserve tart-sweet antioxidant goodness.",
      intro_ar: "حبات توت أسود كاملة وممتلئة، مجمدة بتقنية الصعق الحراري السريع لحفظ مضادات الأكسدة.",
      description_en: "Carefully harvested at peak ripeness, washed in gentle ozone water, and individually quick frozen. Ideal for bakery, smoothies, fruit preparations and confectionery.",
      description_ar: "تُجمع الحبات بعناية فائقة عند ذروة النضج، وتُغسل بمياه معالجة بالأوزون وتُجمد سريعًا حبة بحبة، مثالية للمخابز والعصائر والحلويات الفاخرة.",
      specs_en: {
        scientificName: "Rubus fruticosus",
        origin: "Egypt",
        category: "Frozen Fruits",
        variety: "Thornless Evergreen, Chester",
        season: "Available Year-Round Frozen",
        sizes: "Whole calibrated 15–25mm drupelets",
        color: "Uniform glossy jet-black",
        taste: "Pleasantly tart-sweet, juicy",
        packaging: "10kg bulk carton / 4x2.5kg / 10x1kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal",
      },
      specs_ar: {
        scientificName: "Rubus fruticosus",
        origin: "مصر",
        category: "فواكه مجمدة",
        variety: "ثورنلس، تشيستر",
        season: "متوفر طوال العام مجمد",
        sizes: "حبات كاملة معايرة 15–25 ملم",
        color: "أسود لامع ناصع موحد",
        taste: "طعم يجمع بين الحلاوة والحموضة المنعشة والغنية",
        packaging: "كرتون 10 كجم / 4×2.5 كجم / 10×1 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال",
      },
      hidden_specs: [],
      main_image: frozenBlackberriesImg,
      gallery: [frozenBlackberriesImg],
      published: true,
      sort_order: 28,
    },
    {
      id: "prod-iqf-cantaloupe",
      slug: "iqf-cantaloupe",
      trade: "export",
      category_id: "cat-frozen-fruits",
      name_en: "IQF Frozen Cantaloupe Melon (Balls & Chunks)",
      name_ar: "كانتلوب مجمد كرات ومكعبات IQF",
      intro_en: "Sweet orange-fleshed Egyptian melon balls and dices, individually quick frozen.",
      intro_ar: "كرات ومكعبات كانتلوب مصري برتقالي حلو المذاق، مجمدة بتقنية IQF.",
      description_en: "Produced from Egyptian Galia and Charentais cantaloupes. Seeded, balled or diced into precision 15x15mm chunks and individually quick frozen for dessert and catering blends.",
      description_ar: "مصنع من أجود أصناف الكانتلوب المصري العسلي، منزوع البذور ومقور إلى كرات أو مكعبات 15×15 ملم ومجمد سريعًا للحفاظ على الانتعاش والحلاوة.",
      specs_en: {
        scientificName: "Cucumis melo var. cantalupensis",
        origin: "Egypt",
        category: "Frozen Fruits",
        variety: "Galia, Charentais, Ideal",
        season: "Available Year-Round Frozen",
        sizes: "Melon balls (dia. 22mm) / Chunks (15x15mm)",
        color: "Uniform salmon-orange",
        taste: "Sweet, fragrant, refreshing melon flavor",
        packaging: "10kg carton with inner liner / 4x2.5kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, Halal",
      },
      specs_ar: {
        scientificName: "Cucumis melo var. cantalupensis",
        origin: "مصر",
        category: "فواكه مجمدة",
        variety: "جاليا، شارنتيه، آيديال",
        season: "متوفر طوال العام مجمد",
        sizes: "كرات كانتلوب (قطر 22 ملم) / مكعبات (15×15 ملم)",
        color: "برتقالي سلموني جذاب موحد",
        taste: "حلو وعطري منعش بنكهة الكانتلوب الطبيعية",
        packaging: "كرتون 10 كجم مع كيس داخلي / 4×2.5 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، حلال",
      },
      hidden_specs: [],
      main_image: frozenCantaloupeImg,
      gallery: [frozenCantaloupeImg],
      published: true,
      sort_order: 29,
    },
  ];

  // 10 Frozen Vegetables
  const frozenVegetables: ProductRow[] = [
    {
      id: "prod-iqf-green-beans",
      slug: "iqf-green-beans",
      trade: "export",
      category_id: "cat-frozen-vegetables",
      name_en: "IQF Frozen Green Beans",
      name_ar: "فاصوليا خضراء مجمدة IQF",
      intro_en: "Tender, vibrant green cut beans, blanched and individually quick frozen.",
      intro_ar: "فاصوليا خضراء مقطعة طازجة ولينة، مسلوقة ومجمدة بتقنية التجميد السريع IQF.",
      description_en: "Freshly harvested Egyptian green beans, snipped, cut and blanched under strict temperature controls, freezing immediately to preserve nutrients and crisp bite.",
      description_ar: "فاصوليا خضراء مصرية طازجة مقطعة ومجهزة تحت رقابة حرارية صارمة للاحتفاظ بالقيمة الغذائية والنضارة والقرمشة الممتازة.",
      specs_en: {
        scientificName: "Phaseolus vulgaris",
        origin: "Egypt",
        category: "Frozen Vegetables",
        variety: "Paulista, Bronco",
        season: "November – May (Harvest), Available Year-Round Frozen",
        sizes: "Cut 2.5–4 cm / Whole fine (6.5–8mm) & medium (8–9mm)",
        color: "Uniform bright green",
        taste: "Fresh, tender, crisp natural green bean flavor",
        packaging: "10kg carton with inner PE liner / 20x400g retail bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal, Kosher",
      },
      specs_ar: {
        scientificName: "Phaseolus vulgaris",
        origin: "مصر",
        category: "خضروات مجمدة",
        variety: "بوليستا، برونكو",
        season: "نوفمبر – مايو (الحصاد)، متوفر طوال العام مجمد",
        sizes: "مقطعة 2.5–4 سم / كاملة رفيعة (6.5–8 ملم) ومتوسطة (8–9 ملم)",
        color: "أخضر نضر زاهٍ موحد",
        taste: "طبيعي طازج ومقرمش بطعم الفاصوليا الخضراء الغنية",
        packaging: "كرتون 10 كجم مع كيس داخلي / 20 كيس × 400 جم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال، كوشر",
      },
      hidden_specs: [],
      main_image: frozenGreenBeansImg,
      gallery: [frozenGreenBeansImg],
      published: true,
      sort_order: 31,
    },
    {
      id: "prod-frozen-molokhia",
      slug: "frozen-minced-molokhia",
      trade: "export",
      category_id: "cat-frozen-vegetables",
      name_en: "Frozen Minced Molokhia (Jute Leaves)",
      name_ar: "ملوخية مفرومة مجمدة",
      intro_en: "Authentic Egyptian minced jute leaves, freshly picked, washed, finely chopped and blast frozen.",
      intro_ar: "أوراق ملوخية مصرية أصيلة طازجة، مغسولة ومفرومة ناعمًا ومجمدة بالتبريد السريع.",
      description_en: "A hallmark of Egyptian culinary tradition. Pure, fragrant dark green leaves finely shredded and frozen to retain maximum viscosity, aroma, and essential vitamins.",
      description_ar: "أيقونة المطبخ المصري التراثي. أوراق خضراء داكنة طبيعية ناعمة ومفرومة ومجمدة للحفاظ على القوام اللزج المميز والرائحة الذكية والفيتامينات.",
      specs_en: {
        scientificName: "Corchorus olitorius",
        origin: "Egypt (Nile Delta)",
        category: "Frozen Vegetables",
        variety: "Egyptian Baladi / Eskandarani",
        season: "May – November (Harvest), Available Year-Round Frozen",
        sizes: "Finely minced / Chopped leaves",
        color: "Intense vibrant emerald green",
        taste: "Rich, authentic savory herbal flavor",
        packaging: "20x400g cartons (8kg net) / 10x1kg catering bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,750 cartons (8kg) per 40ft container",
        certifications: "ISO 22000, HACCP, Halal, Phytosanitary",
      },
      specs_ar: {
        scientificName: "Corchorus olitorius",
        origin: "مصر (دلتا النيل)",
        category: "خضروات مجمدة",
        variety: "بلدي مصري / إسكندراني",
        season: "مايو – نوفمبر (الحصاد)، متوفر طوال العام مجمد",
        sizes: "مفروم ناعم / أوراق مجزأة",
        color: "أخضر زمردي زاهٍ وغني",
        taste: "طبيعي غني ونكهة عشبية شهية مميزة",
        packaging: "كرتونة 20 كيس × 400 جم (8 كجم صافي) / 10×1 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2750 كرتونة (8 كجم) لكل حاوية",
        certifications: "آيزو 22000، هاسب، حلال، شهادة زراعية",
      },
      hidden_specs: [],
      main_image: frozenMolokhiaImg,
      gallery: [frozenMolokhiaImg],
      published: true,
      sort_order: 32,
    },
    {
      id: "prod-iqf-okra",
      slug: "iqf-okra",
      trade: "export",
      category_id: "cat-frozen-vegetables",
      name_en: "IQF Okra / Bamia (Zero & Extra)",
      name_ar: "بامية مجمدة ممتازة IQF (زيرو وإكسترا)",
      intro_en: "Selected young, tender Egyptian green lady fingers, cone-peeled, blanched and quick frozen.",
      intro_ar: "أقماع بامية خضراء طازجة صغيرة الحجم ومقمعة يدويًا بعناية، ومجمدة بتقنية IQF.",
      description_en: "Carefully graded by size (Zero, Extra, One), hand-trimmed in a conical shape without piercing the pod seed cavity, blanched and frozen via IQF.",
      description_ar: "مفروزة بدقة بالأحجام (زيرو، إكسترا، نمرة 1)، مقمعة يدويًا بشكل مخروطي احترافي دون ثقب حبة البامية، ومجمدة بالتبريد السريع.",
      specs_en: {
        scientificName: "Abelmoschus esculentus",
        origin: "Egypt",
        category: "Frozen Vegetables",
        variety: "Egyptian Baladi / Emerald",
        season: "June – October (Harvest), Available Year-Round Frozen",
        sizes: "Zero (<2cm), Extra (2–3cm), One (3–4cm)",
        color: "Natural bright green",
        taste: "Tender, succulent with natural okra flavor",
        packaging: "10kg bulk carton / 20x400g retail bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal",
      },
      specs_ar: {
        scientificName: "Abelmoschus esculentus",
        origin: "مصر",
        category: "خضروات مجمدة",
        variety: "بلدي مصري / إيميرالد",
        season: "يونيو – أكتوبر (الحصاد)، متوفر طوال العام مجمد",
        sizes: "زيرو (أقل من 2 سم)، إكسترا (2–3 سم)، نمرة 1 (3–4 سم)",
        color: "أخضر طبيعي ناصع",
        taste: "طري ولين بطعم البامية الطبيعية اللذيذة",
        packaging: "كرتون 10 كجم / 20 كيس × 400 جم تجزئة",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال",
      },
      hidden_specs: [],
      main_image: frozenOkraImg,
      gallery: [frozenOkraImg],
      published: true,
      sort_order: 33,
    },
    {
      id: "prod-iqf-peas",
      slug: "iqf-green-peas",
      trade: "export",
      category_id: "cat-frozen-vegetables",
      name_en: "IQF Green Peas",
      name_ar: "بسلة خضراء مجمدة IQF",
      intro_en: "Sweet, tender garden green peas, harvested at peak sweetness, sorted and individually quick frozen.",
      intro_ar: "بسلة خضراء سكرية طرية، تُحصد في ذروة النضج، مفروزة ومجمدة تجميدًا سريعًا IQF.",
      description_en: "Plump, uniformly sized sweet green peas, mechanically podded, washed, blanched and quick frozen within hours of picking to lock in tender sweetness and vibrant color.",
      description_ar: "حبات بسلة خضراء ممتلئة وسكرية متناسقة الحجم، تُفرط آليًا وتُغسل وتُسلق وتُجمد خلال ساعات من الحصاد لحفظ السكر الطبيعي والنضارة.",
      specs_en: {
        scientificName: "Pisum sativum",
        origin: "Egypt",
        category: "Frozen Vegetables",
        variety: "Master B, Sugar Peas",
        season: "December – April (Harvest), Available Year-Round Frozen",
        sizes: "Fine (7.5–8.2mm), Medium (8.2–10mm)",
        color: "Vibrant bright emerald green",
        taste: "Tender, sweet natural garden pea taste",
        packaging: "10kg carton / 20x400g retail bags / 4x2.5kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 24 MT)",
        loading: "2,400 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal, Kosher",
      },
      specs_ar: {
        scientificName: "Pisum sativum",
        origin: "مصر",
        category: "خضروات مجمدة",
        variety: "ماستر بي، بسلة سكرية",
        season: "ديسمبر – أبريل (الحصاد)، متوفر طوال العام مجمد",
        sizes: "رفيعة (7.5–8.2 ملم)، متوسطة (8.2–10 ملم)",
        color: "أخضر زمردي مشرق موحد",
        taste: "حلو سكري طبيعي وطري وسهل الطهي",
        packaging: "كرتون 10 كجم / 20 كيس × 400 جم / 4×2.5 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (24 طن متري)",
        loading: "2400 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال، كوشر",
      },
      hidden_specs: [],
      main_image: frozenPeasImg,
      gallery: [frozenPeasImg],
      published: true,
      sort_order: 34,
    },
    {
      id: "prod-iqf-peas-carrots",
      slug: "iqf-peas-carrots",
      trade: "export",
      category_id: "cat-frozen-vegetables",
      name_en: "IQF Peas & Diced Carrots",
      name_ar: "بسلة وجزر مكعبات مجمدة IQF",
      intro_en: "Harmonious blend of sweet green peas and uniform diced orange carrots, blanched and frozen.",
      intro_ar: "مزيج متناسق من البسلة الخضراء السكرية ومكعبات الجزر البرتقالي المتناسقة، مسلوقة ومجمدة.",
      description_en: "A balanced 50/50 classic culinary combination. Premium sweet peas and crisp Egyptian orange carrots diced into precision 10x10mm cubes, frozen together via IQF.",
      description_ar: "مزيج كلاسيكي متوازن بنسبة 50/50. بسلة خضراء سكرية وجزر برتقالي مصري مقطع إلى مكعبات متناسقة 10×10 ملم ومجمدة بتقنية IQF.",
      specs_en: {
        scientificName: "Pisum sativum & Daucus carota",
        origin: "Egypt",
        category: "Frozen Vegetables",
        variety: "Master B Peas & Kuroda / Nantes Carrots",
        season: "November – April (Harvest), Available Year-Round Frozen",
        sizes: "Diced 10x10mm carrots + calibrated peas",
        color: "Contrasting bright orange and vivid green",
        taste: "Naturally sweet, crisp texture",
        packaging: "10kg carton with PE liner / 20x400g retail bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 23 MT)",
        loading: "2,300 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal",
      },
      specs_ar: {
        scientificName: "Pisum sativum & Daucus carota",
        origin: "مصر",
        category: "خضروات مجمدة",
        variety: "بسلة ماستر بي وجزر كورودا / نانت",
        season: "نوفمبر – أبريل (الحصاد)، متوفر طوال العام مجمد",
        sizes: "مكعبات جزر 10×10 ملم + بسلة معايرة",
        color: "تباين لوني جذاب بين البرتقالي والأخضر النضر",
        taste: "مذاق حلو طبيعي وقوام مقرمش متماسك",
        packaging: "كرتون 10 كجم مع كيس داخلي / 20 كيس × 400 جم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (23 طن متري)",
        loading: "2300 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال",
      },
      hidden_specs: [],
      main_image: frozenPeasCarrotsImg,
      gallery: [frozenPeasCarrotsImg],
      published: true,
      sort_order: 35,
    },
    {
      id: "prod-iqf-mixed-vegetables",
      slug: "iqf-mixed-vegetables",
      trade: "export",
      category_id: "cat-frozen-vegetables",
      name_en: "IQF 4-Way Mixed Vegetables",
      name_ar: "خضار مشكل مجمد 4 أصناف IQF",
      intro_en: "Vibrant blend of sweet green peas, cut green beans, diced carrots and golden sweet corn.",
      intro_ar: "توليفة خضار رباعية زاهية من البسلة والفاصوليا الخضراء ومكعبات الجزر وحبوب الذرة السكرية.",
      description_en: "A colorful, nutritious 4-way mix containing 25% Green Peas, 25% Cut Green Beans, 25% Diced Carrots, and 25% Sweet Corn Kernels. Each vegetable is individually quick-frozen prior to blending.",
      description_ar: "مزيج متكامل من 4 خضروات بنسب متساوية 25% بسلة، 25% فاصوليا، 25% جزر، 25% ذرة حلوة. تُجمد كل خضرة على حدة قبل الخلط لحفظ الهيكل والنكهة.",
      specs_en: {
        scientificName: "Vegetable Medley Blend",
        origin: "Egypt",
        category: "Frozen Vegetables",
        variety: "25% Peas, 25% Beans, 25% Carrots, 25% Corn",
        season: "Available Year-Round Frozen",
        sizes: "Standard uniform mix (cuts and dices 10x10mm)",
        color: "Multicolor: green, orange, yellow",
        taste: "Fresh, garden-sweet flavor and crisp texture",
        packaging: "10kg bulk carton / 20x400g bags / 4x2.5kg food service",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 22 MT)",
        loading: "2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal",
      },
      specs_ar: {
        scientificName: "Vegetable Medley Blend",
        origin: "مصر",
        category: "خضروات مجمدة",
        variety: "25% بسلة، 25% فاصوليا، 25% جزر، 25% ذرة سكرية",
        season: "متوفر طوال العام مجمد",
        sizes: "خلطة موحدة ومكعبات 10×10 ملم",
        color: "متعدد الألوان: أخضر وبرتقالي وأصفر ذهبي",
        taste: "طعم خضار طازج سكري وقوام متماسك",
        packaging: "كرتون 10 كجم / 20 كيس × 400 جم / 4×2.5 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (22 طن متري)",
        loading: "2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال",
      },
      hidden_specs: [],
      main_image: frozenMixedVegImg,
      gallery: [frozenMixedVegImg],
      published: true,
      sort_order: 36,
    },
    {
      id: "prod-iqf-artichoke",
      slug: "iqf-artichoke-bottoms",
      trade: "export",
      category_id: "cat-frozen-vegetables",
      name_en: "IQF Artichoke Bottoms / Hearts",
      name_ar: "قلوب وقواعد خرشوف مجمدة IQF",
      intro_en: "Tender, meaty Egyptian artichoke bottoms, trimmed, acidulated in lemon bath and quick frozen.",
      intro_ar: "قلوب وقواعد خرشوف مصرية طازجة ممتازة، مقشرة ومجهزة ومعالجة بمحلول ليموني ومجمدة IQF.",
      description_en: "Sourced from fertile coastal farms. The tough outer bracts and choke fibers are peeled cleanly, leaving tender, meaty discs blanched with citric/ascorbic solution to prevent oxidation.",
      description_ar: "تُجلب من مزارع الساحل والدلتا الخصبة. تُقشر الأوراق الخارجية والخصلات بعناية فائقة للحصول على أقراص لحمية ناعمة تُعامل بمحلول حمضي طبيعي لمنع الأكسدة وتُجمد سريعًا.",
      specs_en: {
        scientificName: "Cynara cardunculus var. scolymus",
        origin: "Egypt",
        category: "Frozen Vegetables",
        variety: "French Artichoke / Baladi",
        season: "December – April (Harvest), Available Year-Round Frozen",
        sizes: "Calibrated: 3–5cm, 5–7cm, 7–9cm diameters",
        color: "Creamy light olive green / Pale yellowish",
        taste: "Delicate, nutty, classic artichoke heart flavor",
        packaging: "10kg carton with inner liner / 4x2.5kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 20–22 MT)",
        loading: "2,000 – 2,200 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal",
      },
      specs_ar: {
        scientificName: "Cynara cardunculus var. scolymus",
        origin: "مصر",
        category: "خضروات مجمدة",
        variety: "خرشوف فرنساوي / بلدي",
        season: "ديسمبر – أبريل (الحصاد)، متوفر طوال العام مجمد",
        sizes: "معاير: قطر 3–5 سم، 5–7 سم، 7–9 سم",
        color: "زيتوني فاتح كريمي / أصفر عاجي طبيعي",
        taste: "طعم قلوب الخرشوف الأصيل بقوام غني ولين",
        packaging: "كرتون 10 كجم بكيس داخلي / 4×2.5 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (20–22 طن متري)",
        loading: "2000 – 2200 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال",
      },
      hidden_specs: [],
      main_image: frozenArtichokeImg,
      gallery: [frozenArtichokeImg],
      published: true,
      sort_order: 37,
    },
    {
      id: "prod-iqf-cauliflower",
      slug: "iqf-cauliflower-florets",
      trade: "export",
      category_id: "cat-frozen-vegetables",
      name_en: "IQF Cauliflower Florets",
      name_ar: "قرنبيط زهرات مجمد IQF",
      intro_en: "Firm, snow-white cauliflower florets, hand-trimmed, blanched and individually quick frozen.",
      intro_ar: "زهرات قرنبيط بيضاء ناصعة ومتماسكة، مقطعة ومفرومة يدويًا ومسلوقة ومجمدة بتقنية IQF.",
      description_en: "Harvested in cool Egyptian winter months. Heads are broken down into uniform bite-sized florets, blanched to preserve crispness and color, and instantly blast frozen.",
      description_ar: "تُحصد في أشهر الشتاء المصرية المعتدلة. تُجزأ الرؤوس إلى زهرات متناسقة الحجم وتُسلق بخفة للحفاظ على اللون الأبيض الناصع والقوام المتماسك وتُجمد على الفور.",
      specs_en: {
        scientificName: "Brassica oleracea var. botrytis",
        origin: "Egypt",
        category: "Frozen Vegetables",
        variety: "Snow White, Baladi",
        season: "November – March (Harvest), Available Year-Round Frozen",
        sizes: "Florets 20–40mm / 40–60mm diameter",
        color: "Clean snow white to ivory",
        taste: "Mild, sweet, tender-crisp cruciferous taste",
        packaging: "10kg bulk carton / 4x2.5kg bags / 20x400g retail bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 20 MT)",
        loading: "2,000 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal",
      },
      specs_ar: {
        scientificName: "Brassica oleracea var. botrytis",
        origin: "مصر",
        category: "خضروات مجمدة",
        variety: "سنو وايت، بلدي",
        season: "نوفمبر – مارس (الحصاد)، متوفر طوال العام مجمد",
        sizes: "زهرات 20–40 ملم / 40–60 ملم قطر",
        color: "أبيض ثلجي ناصع إلى عاجي",
        taste: "طعم نقي وخفيف وقوام مقرمش ولذيذ",
        packaging: "كرتون 10 كجم / 4×2.5 كجم / 20 كيس × 400 جم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (20 طن متري)",
        loading: "2000 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال",
      },
      hidden_specs: [],
      main_image: frozenCauliflowerImg,
      gallery: [frozenCauliflowerImg],
      published: true,
      sort_order: 38,
    },
    {
      id: "prod-iqf-broccoli",
      slug: "iqf-broccoli-florets",
      trade: "export",
      category_id: "cat-frozen-vegetables",
      name_en: "IQF Broccoli Florets",
      name_ar: "بروكلي زهرات مجمد IQF",
      intro_en: "Deep green, compact broccoli florets with short stems, blanched and individually quick frozen.",
      intro_ar: "زهرات بروكلي خضراء داكنة متراصة بساق قصيرة، مسلوقة ومجمدة تجميدًا سريعًا IQF.",
      description_en: "Premium broccoli heads with tight, dense beads cut into neat florets with minimal stalk. Flash-blanched and IQF frozen to secure rich sulforaphane, antioxidants, and vibrant forest green color.",
      description_ar: "رؤوس بروكلي فاخرة ذات حبيبات متراصة وكثيفة تُقطع إلى زهرات بساق قصيرة جدًا. تُسلق بالبخار وتُجمد بتقنية IQF للحفاظ على مضادات الأكسدة واللون الأخضر الغابي الزاهي.",
      specs_en: {
        scientificName: "Brassica oleracea var. italica",
        origin: "Egypt",
        category: "Frozen Vegetables",
        variety: "Calabrese, Marathon",
        season: "November – April (Harvest), Available Year-Round Frozen",
        sizes: "Florets 20–40mm / 30–50mm / 40–60mm",
        color: "Vibrant deep forest green",
        taste: "Earthy, sweet, firm tender texture",
        packaging: "10kg bulk carton / 4x2.5kg bags / 20x400g bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 20 MT)",
        loading: "2,000 cartons per 40ft container",
        certifications: "GLOBALG.A.P., ISO 22000, BRC, Halal, Kosher",
      },
      specs_ar: {
        scientificName: "Brassica oleracea var. italica",
        origin: "مصر",
        category: "خضروات مجمدة",
        variety: "كالابريزي، ماراثون",
        season: "نوفمبر – أبريل (الحصاد)، متوفر طوال العام مجمد",
        sizes: "زهرات 20–40 ملم / 30–50 ملم / 40–60 ملم",
        color: "أخضر داكن غابي زاهٍ",
        taste: "طعم غني متوازن وقوام متماسك وشهي",
        packaging: "كرتون 10 كجم / 4×2.5 كجم / 20 كيس × 400 جم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (20 طن متري)",
        loading: "2000 كرتونة لكل حاوية",
        certifications: "جلوبال جاب، آيزو 22000، بي آر سي، حلال، كوشر",
      },
      hidden_specs: [],
      main_image: frozenBroccoliImg,
      gallery: [frozenBroccoliImg],
      published: true,
      sort_order: 39,
    },
    {
      id: "prod-iqf-french-fries",
      slug: "frozen-french-fries",
      trade: "export",
      category_id: "cat-frozen-vegetables",
      name_en: "Frozen French Fries (Pre-Fried)",
      name_ar: "بطاطس نصف مقلية مجمدة",
      intro_en: "Premium crispy golden French fries, pre-fried and quick frozen.",
      intro_ar: "أصابع بطاطس نصف مقلية مجمدة ذهبية ومقرمشة بأعلى جودة.",
      description_en: "Cut from high-solid Egyptian processing potatoes, blanched, pre-fried in pure vegetable oil and flash frozen. Ensures golden crisp exterior and fluffy interior upon finishing.",
      description_ar: "مقطعة من أجود أصناف بطاطس التصنيع المصرية، مقلية جزئيًا بزيوت نباتية ومجمدة بالتبريد السريع، لتمنح قرمشة ذهبية خارجية وطراوة داخلية هشة.",
      specs_en: {
        scientificName: "Solanum tuberosum",
        origin: "Egypt",
        category: "Frozen Vegetables",
        variety: "Spunta, Lady Rosetta, Innovator",
        season: "Available Year-Round",
        sizes: "6x6mm (Shoestring), 9x9mm, 10x10mm cut",
        color: "Light creamy yellow to golden",
        taste: "Crispy exterior, fluffy interior, natural potato flavor",
        packaging: "10kg carton (4x2.5kg bags) / 10x1kg bags",
        shelfLife: "24 months at -18°C",
        storageTemp: "-18°C or below",
        transportation: "Reefer container at -18°C",
        moq: "1 x 40ft Reefer Container (approx. 24 MT)",
        loading: "2,400 cartons (10kg) per 40ft container",
        certifications: "ISO 22000, HACCP, Halal, Phytosanitary",
      },
      specs_ar: {
        scientificName: "Solanum tuberosum",
        origin: "مصر",
        category: "خضروات مجمدة",
        variety: "سبونتا، ليدي روزيتا، إنوفيتور",
        season: "متوفر طوال العام",
        sizes: "6×6 ملم (رفيعة)، 9×9 ملم، 10×10 ملم (عادية)",
        color: "أصفر كريمي فاتح إلى ذهبي",
        taste: "مقرمشة من الخارج وهشة من الداخل بنكهة البطاطس الطبيعية",
        packaging: "كرتون 10 كجم (4 أكياس × 2.5 كجم) / 10×1 كجم",
        shelfLife: "24 شهرًا عند -18 درجة مئوية",
        storageTemp: "-18 درجة مئوية أو أقل",
        transportation: "حاويات ريفر عند -18 مئوية",
        moq: "حاوية مبردة 40 قدم (24 طن متري)",
        loading: "2400 كرتونة (10 كجم) لكل حاوية",
        certifications: "آيزو 22000، هاسب، حلال، شهادة زراعية",
      },
      hidden_specs: [],
      main_image: frozenFrenchFriesImg,
      gallery: [frozenFrenchFriesImg],
      published: true,
      sort_order: 40,
    },
  ];

  return [
    ...baseFruits,
    ...moreFreshFruits,
    ...baseVeggies,
    ...moreFreshVeggies,
    ...frozenFruits,
    ...frozenVegetables,
  ];
}

const CATS_KEY = "magroup_product_categories_v11";
const PRODS_KEY = "magroup_products_v11";

function getStoredCategories(): ProductCategory[] {
  if (typeof window === "undefined") return DEFAULT_CATEGORIES;
  try {
    const raw = localStorage.getItem(CATS_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

function saveStoredCategories(cats: ProductCategory[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CATS_KEY, JSON.stringify(cats));
  } catch {
    // Ignore quota errors
  }
}

function getStoredProducts(): ProductRow[] {
  if (typeof window === "undefined") return seedProducts();
  try {
    const raw = localStorage.getItem(PRODS_KEY);
    if (!raw) {
      const seeded = seedProducts();
      saveStoredProducts(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw) as ProductRow[];
    // Filter out stale frozen citrus & ensure french fries uses the new export image
    const cleaned = parsed
      .filter(
        (p) => p.id !== "prod-iqf-citrus-segments" && p.slug !== "iqf-citrus-segments",
      )
      .map((p) => {
        if (p.id === "prod-iqf-french-fries" || p.slug === "frozen-french-fries") {
          return {
            ...p,
            main_image: frozenFrenchFriesImg,
            gallery: [frozenFrenchFriesImg],
          };
        }
        return p;
      });

    // Ensure all fresh seed products (like blueberries & raspberries) are present
    const seeded = seedProducts();
    const existingIds = new Set(cleaned.map((p) => p.id));
    for (const sp of seeded) {
      if (!existingIds.has(sp.id)) {
        cleaned.push(sp);
      }
    }

    saveStoredProducts(cleaned);
    return cleaned;
  } catch {
    return seedProducts();
  }
}

function saveStoredProducts(prods: ProductRow[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRODS_KEY, JSON.stringify(prods));
  } catch {
    // Ignore quota errors
  }
}

/** Bundled artwork that ships with the original catalog, used when no image was uploaded. */
const FALLBACK = new Map(CATALOG.map((p) => [p.slug, { main: p.main, gallery: p.gallery }]));

export function productImage(p: Pick<ProductRow, "slug" | "main_image">) {
  return p.main_image || FALLBACK.get(p.slug)?.main || "/placeholder.svg";
}

export function productGallery(p: Pick<ProductRow, "slug" | "main_image" | "gallery">) {
  if (p.gallery && p.gallery.length) return p.gallery;
  const fallback = FALLBACK.get(p.slug)?.gallery;
  if (fallback?.length) return fallback;
  return [productImage(p)];
}

export function isSpecVisible(p: Pick<ProductRow, "hidden_specs">, key: keyof ProductSpecs) {
  return !p.hidden_specs || !p.hidden_specs.includes(key);
}

export function localized(p: ProductRow, lang: "en" | "ar") {
  return lang === "ar"
    ? {
        name: p.name_ar || p.name_en,
        intro: p.intro_ar || p.intro_en,
        description: p.description_ar || p.description_en,
        specs: { ...EMPTY_SPECS, ...(p.specs_ar ?? {}) },
      }
    : {
        name: p.name_en,
        intro: p.intro_en,
        description: p.description_en,
        specs: { ...EMPTY_SPECS, ...(p.specs_en ?? {}) },
      };
}

export function categoryName(c: ProductCategory | undefined, lang: "en" | "ar") {
  if (!c) return "";
  return lang === "ar" ? c.name_ar || c.name_en : c.name_en;
}

export function blankProduct(trade: Trade, categoryId: string | null): ProductRow {
  return {
    id: "",
    slug: "",
    trade,
    category_id: categoryId,
    name_en: "",
    name_ar: "",
    intro_en: "",
    intro_ar: "",
    description_en: "",
    description_ar: "",
    specs_en: { ...EMPTY_SPECS },
    specs_ar: { ...EMPTY_SPECS },
    hidden_specs: [],
    main_image: "",
    gallery: [],
    published: true,
    sort_order: 100,
  };
}

// ---------------- Public Async API ----------------

export async function listCategories(activeOnly = false): Promise<ProductCategory[]> {
  const cats = getStoredCategories();
  const sorted = [...cats].sort((a, b) => a.sort_order - b.sort_order);
  return activeOnly ? sorted.filter((c) => c.active) : sorted;
}

export async function saveCategory(category: ProductCategory): Promise<string | null> {
  try {
    const cats = getStoredCategories();
    const idx = cats.findIndex((c) => c.id === category.id);
    let updated: ProductCategory[];
    if (idx >= 0) {
      updated = [...cats];
      updated[idx] = category;
    } else {
      updated = [...cats, category];
    }
    saveStoredCategories(updated);
    return null;
  } catch (err: any) {
    return err?.message || "Failed to save category";
  }
}

export async function deleteCategory(id: string): Promise<string | null> {
  try {
    const cats = getStoredCategories().filter((c) => c.id !== id);
    saveStoredCategories(cats);
    const prods = getStoredProducts().map((p) =>
      p.category_id === id ? { ...p, category_id: null } : p,
    );
    saveStoredProducts(prods);
    return null;
  } catch (err: any) {
    return err?.message || "Failed to delete category";
  }
}

export async function listProducts(trade?: Trade): Promise<ProductRow[]> {
  const prods = getStoredProducts();
  const filtered = trade ? prods.filter((p) => p.trade === trade) : prods;
  return [...filtered].sort((a, b) => a.sort_order - b.sort_order);
}

export async function listAllProducts(): Promise<ProductRow[]> {
  return listProducts();
}

export async function listPublishedProducts(trade?: Trade): Promise<ProductRow[]> {
  const prods = await listProducts(trade);
  return prods.filter((p) => p.published);
}

export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  const prods = getStoredProducts();
  return prods.find((p) => p.slug === slug) ?? null;
}

export async function saveProduct(product: ProductRow): Promise<string | null> {
  try {
    const prods = getStoredProducts();
    const existingIdx = prods.findIndex((p) => p.id === product.id);
    let updated: ProductRow[];
    if (existingIdx >= 0) {
      updated = [...prods];
      updated[existingIdx] = product;
    } else {
      const newId = product.id || `prod-${Date.now()}`;
      updated = [...prods, { ...product, id: newId }];
    }
    saveStoredProducts(updated);
    return null;
  } catch (err: any) {
    return err?.message || "Failed to save product";
  }
}

export async function deleteProduct(id: string): Promise<string | null> {
  try {
    const prods = getStoredProducts().filter((p) => p.id !== id);
    saveStoredProducts(prods);
    return null;
  } catch (err: any) {
    return err?.message || "Failed to delete product";
  }
}

export async function saveOrder(items: { id: string; sort_order: number }[]): Promise<string | null> {
  try {
    const prods = getStoredProducts();
    const map = new Map(items.map((i) => [i.id, i.sort_order]));
    const updated = prods.map((p) => (map.has(p.id) ? { ...p, sort_order: map.get(p.id)! } : p));
    saveStoredProducts(updated);
    return null;
  } catch (err: any) {
    return err?.message || "Failed to save order";
  }
}

export async function setProductPublished(id: string, published: boolean): Promise<string | null> {
  try {
    const prods = getStoredProducts();
    const updated = prods.map((p) => (p.id === id ? { ...p, published } : p));
    saveStoredProducts(updated);
    return null;
  } catch (err: any) {
    return err?.message || "Failed to update status";
  }
}

export async function uploadProductImage(file: File): Promise<{ url: string | null; error?: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ url: reader.result as string });
    reader.onerror = () => resolve({ url: null, error: "Failed to read file" });
    reader.readAsDataURL(file);
  });
}

export async function resetCatalog(): Promise<void> {
  saveStoredCategories(DEFAULT_CATEGORIES);
  saveStoredProducts(seedProducts());
}
