import oranges from "@/assets/oranges.jpg";
import grapes from "@/assets/grapes.jpg";
import mangoes from "@/assets/mangoes.jpg";
import pomegranates from "@/assets/pomegranates.jpg";
import strawberries from "@/assets/strawberries.jpg";
import lemons from "@/assets/lemons.jpg";
import potatoes from "@/assets/potatoes.jpg";
import onions from "@/assets/onions.jpg";
import garlic from "@/assets/garlic.jpg";
import sweetPotatoes from "@/assets/sweet-potatoes.jpg";
import greenBeans from "@/assets/green-beans.jpg";
import peppers from "@/assets/peppers.jpg";

import orangesB from "@/assets/gallery/oranges-2.jpg";
import grapesB from "@/assets/gallery/grapes-2.jpg";
import mangoesB from "@/assets/gallery/mangoes-2.jpg";
import pomegranatesB from "@/assets/gallery/pomegranates-2.jpg";
import strawberriesB from "@/assets/gallery/strawberries-2.jpg";
import lemonsB from "@/assets/gallery/lemons-2.jpg";
import potatoesB from "@/assets/gallery/potatoes-2.jpg";
import onionsB from "@/assets/gallery/onions-2.jpg";
import garlicB from "@/assets/gallery/garlic-2.jpg";
import sweetPotatoesB from "@/assets/gallery/sweet-potatoes-2.jpg";
import greenBeansB from "@/assets/gallery/green-beans-2.jpg";
import peppersB from "@/assets/gallery/peppers-2.jpg";

import farm from "@/assets/farm.jpg";
import packaging from "@/assets/packaging.jpg";
import coldStorage from "@/assets/cold-storage.jpg";
import shipping from "@/assets/shipping.jpg";
import loading from "@/assets/loading.jpg";
import hero from "@/assets/hero.jpg";

import type { Lang } from "./i18n";

/** Shared operational imagery appended to every product gallery. */
const SHARED = [farm, packaging, coldStorage, shipping, loading, hero];

export type ProductSpecs = {
  scientificName: string;
  origin: string;
  category: string;
  variety: string;
  season: string;
  sizes: string;
  color: string;
  taste: string;
  packaging: string;
  shelfLife: string;
  storageTemp: string;
  transportation: string;
  moq: string;
  loading: string;
  certifications: string;
};

export type CatalogProduct = {
  slug: string;
  group: "fruits" | "vegetables";
  main: string;
  gallery: string[];
  en: { name: string; intro: string; description: string; specs: ProductSpecs };
  ar: { name: string; intro: string; description: string; specs: ProductSpecs };
  zh?: { name: string; intro: string; description: string; specs: ProductSpecs };
};

const CERT_EN = "GLOBALG.A.P., Phytosanitary Certificate, Certificate of Origin";
const CERT_AR = "جلوبال جاب، الشهادة الزراعية، شهادة المنشأ";
const CERT_ZH = "GLOBALG.A.P. 全球良好农业规范认证, 动植物检验检疫证书, 原产地证书";

function build(
  slug: string,
  group: "fruits" | "vegetables",
  main: string,
  extra: string,
  en: { name: string; intro: string; description: string; specs: Omit<ProductSpecs, "origin" | "category" | "certifications"> },
  ar: { name: string; intro: string; description: string; specs: Omit<ProductSpecs, "origin" | "category" | "certifications"> },
): CatalogProduct {
  return {
    slug,
    group,
    main,
    gallery: [main, extra, ...SHARED],
    en: {
      name: en.name,
      intro: en.intro,
      description: en.description,
      specs: {
        ...en.specs,
        origin: "Egypt",
        category: group === "fruits" ? "Fresh Fruits" : "Fresh Vegetables",
        certifications: CERT_EN,
      },
    },
    ar: {
      name: ar.name,
      intro: ar.intro,
      description: ar.description,
      specs: {
        ...ar.specs,
        origin: "مصر",
        category: group === "fruits" ? "فواكه طازجة" : "خضروات طازجة",
        certifications: CERT_AR,
      },
    },
  };
}

export const CATALOG: CatalogProduct[] = [
  build(
    "oranges",
    "fruits",
    oranges,
    orangesB,
    {
      name: "Oranges",
      intro: "Sun-ripened Egyptian citrus with vibrant sweetness and outstanding juice content.",
      description:
        "Egyptian Navel and Valencia oranges are among the most sought-after citrus varieties in the world, prized for their deep orange colour, high Brix level and excellent shipping performance. Grown in the fertile soils of the Nile Delta and Upper Egypt, our oranges are hand-picked at optimum maturity, washed, waxed, graded by weight and packed the same day under strict quality control. Every consignment is pre-cooled and shipped in temperature-controlled reefer containers, guaranteeing arrival in perfect condition for supermarkets, wholesalers and juice processors worldwide.",
      specs: {
        scientificName: "Citrus sinensis",
        variety: "Navel, Valencia, Baladi",
        season: "December – May (Navel) / March – July (Valencia)",
        sizes: "48 / 56 / 64 / 72 / 80 / 88 / 100 / 113 count",
        color: "Bright deep orange",
        taste: "Sweet with a balanced citrus acidity",
        packaging: "15 kg / 7 kg telescopic carton, mesh bags, or as required",
        shelfLife: "Up to 45 days under recommended conditions",
        storageTemp: "3 – 5 °C, 85–90% RH",
        transportation: "Reefer container 40' HC, temperature 4.0 °C, ventilation 15 m³/h",
        moq: "1 x 40' HC container",
        loading: "24 – 27 tons per 40' HC container",
      },
    },
    {
      name: "برتقال",
      intro: "حمضيات مصرية ناضجة تحت الشمس بحلاوة مميزة ونسبة عصير عالية.",
      description:
        "يعد البرتقال المصري من أشهر أنواع الحمضيات في العالم بفضل لونه الغني ونسبة السكر المرتفعة وقدرته الممتازة على تحمل الشحن الطويل. يزرع في أراضي الدلتا وصعيد مصر، ويُقطف يدويًا في ذروة النضج ثم يُغسل ويُدرّج ويُعبأ في نفس اليوم تحت رقابة جودة صارمة، ويُشحن مبردًا في حاويات مبردة لضمان وصوله بحالة مثالية إلى الأسواق العالمية.",
      specs: {
        scientificName: "Citrus sinensis",
        variety: "نافل، فالنسيا، بلدي",
        season: "ديسمبر – مايو (نافل) / مارس – يوليو (فالنسيا)",
        sizes: "48 / 56 / 64 / 72 / 80 / 88 / 100 / 113",
        color: "برتقالي زاهي",
        taste: "حلو مع حموضة متوازنة",
        packaging: "كرتون 15 كجم / 7 كجم أو شبكات حسب الطلب",
        shelfLife: "حتى 45 يومًا في الظروف الموصى بها",
        storageTemp: "3 – 5 °م، رطوبة 85–90%",
        transportation: "حاوية مبردة 40 قدم، درجة حرارة 4.0 °م، تهوية 15 م³/س",
        moq: "حاوية واحدة 40 قدم",
        loading: "24 – 27 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "grapes",
    "fruits",
    grapes,
    grapesB,
    {
      name: "Grapes",
      intro: "Hand-picked table grapes, plump, crisp and cold-chain fresh.",
      description:
        "Our seedless table grapes are cultivated on selected farms in Egypt's early-season regions, allowing us to supply European and Gulf markets weeks ahead of most origins. Bunches are field-packed into punnets with SO₂ pads, rapidly pre-cooled and stored in dedicated grape chambers. Strict residue monitoring and GLOBALG.A.P. traceability make our grapes a reliable programme item for retail chains.",
      specs: {
        scientificName: "Vitis vinifera",
        variety: "Early Sweet, Flame Seedless, Superior, Crimson",
        season: "May – August",
        sizes: "Bunch weight 400 – 800 g, berry 17 – 22 mm",
        color: "Golden green, red or dark crimson",
        taste: "Very sweet, crisp, seedless",
        packaging: "4.5 / 5 kg carton with 500 g punnets, SO₂ pad",
        shelfLife: "30 – 45 days under recommended conditions",
        storageTemp: "0 – 1 °C, 90–95% RH",
        transportation: "Reefer container, temperature 0.5 °C, controlled humidity",
        moq: "1 x 40' HC container",
        loading: "18 – 20 tons per 40' HC container",
      },
    },
    {
      name: "عنب",
      intro: "عنب مائدة مقطوف يدويًا، ممتلئ ومقرمش ومحفوظ بسلسلة تبريد كاملة.",
      description:
        "يُزرع العنب اللاذري في مزارع مختارة بمناطق التبكير في مصر، مما يتيح تزويد أسواق أوروبا والخليج قبل معظم المناشئ الأخرى. يُعبأ في الحقل داخل عبوات مع وسائد ثاني أكسيد الكبريت ويُبرد سريعًا ويُخزن في غرف مخصصة، مع متابعة صارمة للمتبقيات وتتبع كامل.",
      specs: {
        scientificName: "Vitis vinifera",
        variety: "إيرلي سويت، فليم، سوبيريور، كريمسون",
        season: "مايو – أغسطس",
        sizes: "وزن العنقود 400 – 800 جم، حبة 17 – 22 مم",
        color: "أخضر ذهبي أو أحمر أو قرمزي",
        taste: "حلو جدًا ومقرمش وبدون بذور",
        packaging: "كرتون 4.5 / 5 كجم بعبوات 500 جم مع وسادة SO₂",
        shelfLife: "30 – 45 يومًا",
        storageTemp: "0 – 1 °م، رطوبة 90–95%",
        transportation: "حاوية مبردة، 0.5 °م، رطوبة مضبوطة",
        moq: "حاوية واحدة 40 قدم",
        loading: "18 – 20 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "mangoes",
    "fruits",
    mangoes,
    mangoesB,
    {
      name: "Mangoes",
      intro: "Fragrant, honey-sweet tropical mangoes from Ismailia and Sharkia farms.",
      description:
        "Egyptian mangoes are famous for their intense aroma, fiberless flesh and exceptional sweetness. We export premium varieties selected for export firmness and shelf life, harvested at the correct dry-matter level and hot-water treated where the destination market requires it. Careful single-layer packing protects the fruit during transit by sea or air.",
      specs: {
        scientificName: "Mangifera indica",
        variety: "Keitt, Kent, Naomi, Zebda, Fajr Kelan",
        season: "June – October",
        sizes: "250 – 400 g / 400 – 600 g / 600 – 900 g",
        color: "Green to golden yellow with red blush",
        taste: "Rich, honey-sweet, aromatic, fiberless",
        packaging: "4 kg / 5 kg single-layer carton with trays",
        shelfLife: "21 – 28 days under recommended conditions",
        storageTemp: "10 – 12 °C, 85–90% RH",
        transportation: "Reefer container 11 °C, or air freight for premium orders",
        moq: "1 x 40' HC container or 1 ton by air",
        loading: "16 – 18 tons per 40' HC container",
      },
    },
    {
      name: "مانجو",
      intro: "مانجو استوائية عطرة بحلاوة العسل من مزارع الإسماعيلية والشرقية.",
      description:
        "تشتهر المانجو المصرية برائحتها القوية ولبها الخالي من الألياف وحلاوتها الاستثنائية. نصدّر أصنافًا فاخرة مختارة لصلابتها وعمرها التخزيني، ويتم الحصاد عند النضج المناسب مع المعالجة الحرارية عند الحاجة، والتعبئة بطبقة واحدة لحماية الثمار أثناء الشحن.",
      specs: {
        scientificName: "Mangifera indica",
        variety: "كيت، كنت، نعومي، زبدة، فجر كلان",
        season: "يونيو – أكتوبر",
        sizes: "250 – 400 جم / 400 – 600 جم / 600 – 900 جم",
        color: "أخضر إلى أصفر ذهبي مع احمرار",
        taste: "غني وحلو وعطري بدون ألياف",
        packaging: "كرتون 4 / 5 كجم بطبقة واحدة",
        shelfLife: "21 – 28 يومًا",
        storageTemp: "10 – 12 °م، رطوبة 85–90%",
        transportation: "حاوية مبردة 11 °م أو شحن جوي للطلبات المميزة",
        moq: "حاوية 40 قدم أو طن واحد جوًا",
        loading: "16 – 18 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "pomegranates",
    "fruits",
    pomegranates,
    pomegranatesB,
    {
      name: "Pomegranates",
      intro: "Ruby-red arils bursting with flavour and antioxidants.",
      description:
        "Egyptian Wonderful pomegranates offer deep red arils, thin skin and a superb sweet-tart balance. Each fruit is inspected for crown damage and sunburn, brushed, graded and packed in protective trays. With a long natural shelf life, pomegranates travel exceptionally well to Europe, Russia, the Gulf and Far East markets.",
      specs: {
        scientificName: "Punica granatum",
        variety: "Wonderful, 116, Early Foreign",
        season: "September – December",
        sizes: "6 / 8 / 10 / 12 pcs per 4 kg or 300 – 700 g each",
        color: "Deep ruby red",
        taste: "Sweet-tart, juicy, richly aromatic",
        packaging: "4 kg / 5 kg carton with trays or open-top carton",
        shelfLife: "60 – 90 days under recommended conditions",
        storageTemp: "5 – 7 °C, 90% RH",
        transportation: "Reefer container 6 °C, ventilation 20 m³/h",
        moq: "1 x 40' HC container",
        loading: "22 – 24 tons per 40' HC container",
      },
    },
    {
      name: "رمان",
      intro: "حبات ياقوتية غنية بالنكهة ومضادات الأكسدة.",
      description:
        "يتميز الرمان المصري صنف وندرفول بحبات حمراء داكنة وقشرة رفيعة وتوازن مثالي بين الحلاوة والحموضة. يتم فحص كل ثمرة وتنظيفها وتدريجها وتعبئتها في أطباق واقية، ويتحمل الشحن الطويل إلى أوروبا وروسيا والخليج والشرق الأقصى.",
      specs: {
        scientificName: "Punica granatum",
        variety: "وندرفول، 116، مبكر أجنبي",
        season: "سبتمبر – ديسمبر",
        sizes: "6 / 8 / 10 / 12 حبة لكل 4 كجم",
        color: "أحمر ياقوتي غامق",
        taste: "حلو حامض وعصيري وعطري",
        packaging: "كرتون 4 / 5 كجم بأطباق",
        shelfLife: "60 – 90 يومًا",
        storageTemp: "5 – 7 °م، رطوبة 90%",
        transportation: "حاوية مبردة 6 °م، تهوية 20 م³/س",
        moq: "حاوية واحدة 40 قدم",
        loading: "22 – 24 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "strawberries",
    "fruits",
    strawberries,
    strawberriesB,
    {
      name: "Strawberries",
      intro: "Aromatic winter berries harvested and cooled within hours.",
      description:
        "Egypt's mild winter produces intensely coloured, highly aromatic strawberries from November through April. Fruit is field-packed, force-air cooled within two hours of harvest and moved through an unbroken cold chain. We supply fresh berries by air freight and IQF-grade fruit by sea for processors and retailers.",
      specs: {
        scientificName: "Fragaria × ananassa",
        variety: "Fortuna, Festival, Sensation, Winter Star",
        season: "November – April",
        sizes: "25 – 45 g per berry, calibrated",
        color: "Glossy bright red",
        taste: "Sweet, highly aromatic, firm flesh",
        packaging: "250 / 500 g punnets in 2 kg carton, or IQF 10 kg",
        shelfLife: "7 – 10 days fresh, 24 months IQF",
        storageTemp: "0 – 2 °C fresh, -18 °C IQF",
        transportation: "Air freight at 1 °C or reefer container at -18 °C for IQF",
        moq: "500 kg air freight / 1 x 40' HC for IQF",
        loading: "Up to 22 tons per 40' HC container (IQF)",
      },
    },
    {
      name: "فراولة",
      intro: "ثمار شتوية عطرة تُحصد وتُبرَّد خلال ساعات.",
      description:
        "ينتج الشتاء المصري المعتدل فراولة عالية اللون والرائحة من نوفمبر حتى أبريل. تُعبأ في الحقل وتُبرد خلال ساعتين من الحصاد ضمن سلسلة تبريد متصلة، ونوفر الفراولة الطازجة جوًا والمجمدة IQF بحرًا للمصانع وسلاسل التجزئة.",
      specs: {
        scientificName: "Fragaria × ananassa",
        variety: "فورتونا، فستيفال، سنسيشن، وينتر ستار",
        season: "نوفمبر – أبريل",
        sizes: "25 – 45 جم للثمرة",
        color: "أحمر لامع",
        taste: "حلو وعطري ولب متماسك",
        packaging: "عبوات 250 / 500 جم في كرتون 2 كجم أو IQF 10 كجم",
        shelfLife: "7 – 10 أيام طازجة، 24 شهرًا مجمدة",
        storageTemp: "0 – 2 °م طازجة، -18 °م مجمدة",
        transportation: "شحن جوي عند 1 °م أو حاوية مبردة -18 °م",
        moq: "500 كجم جوًا / حاوية 40 قدم للمجمد",
        loading: "حتى 22 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "lemons",
    "fruits",
    lemons,
    lemonsB,
    {
      name: "Lemons",
      intro: "Zesty, thin-skinned premium lemons with high juice yield.",
      description:
        "Our Adalia and Baladi lemons deliver strong acidity, aromatic peel oil and consistent size grading. Fruit is degreened where required, waxed with food-grade wax and packed to buyer specification. Lemons are a year-round staple in our programme thanks to Egypt's extended production window.",
      specs: {
        scientificName: "Citrus limon",
        variety: "Adalia (Interdonato), Baladi, Eureka",
        season: "August – March (peak) / year-round availability",
        sizes: "80 – 100 g / 100 – 130 g / 130 – 180 g",
        color: "Bright yellow to light green",
        taste: "Sharp, fresh acidity with aromatic peel",
        packaging: "15 kg carton, 10 kg carton, or mesh bags",
        shelfLife: "45 – 60 days under recommended conditions",
        storageTemp: "8 – 10 °C, 85–90% RH",
        transportation: "Reefer container 9 °C, ventilation 15 m³/h",
        moq: "1 x 40' HC container",
        loading: "24 – 27 tons per 40' HC container",
      },
    },
    {
      name: "ليمون",
      intro: "ليمون فاخر رقيق القشرة وغني بالعصير.",
      description:
        "يوفر الليمون الأضاليا والبلدي حموضة قوية وزيوت قشرة عطرية وتدريجًا ثابتًا للأحجام. تُعالج الثمار وتُشمّع بشمع غذائي وتُعبأ حسب مواصفات المشتري، وهو منتج متاح على مدار العام تقريبًا.",
      specs: {
        scientificName: "Citrus limon",
        variety: "أضاليا، بلدي، يوريكا",
        season: "أغسطس – مارس (الذروة) ومتاح طوال العام",
        sizes: "80 – 100 جم / 100 – 130 جم / 130 – 180 جم",
        color: "أصفر زاهي إلى أخضر فاتح",
        taste: "حموضة منعشة وقشرة عطرية",
        packaging: "كرتون 15 كجم أو 10 كجم أو شبكات",
        shelfLife: "45 – 60 يومًا",
        storageTemp: "8 – 10 °م، رطوبة 85–90%",
        transportation: "حاوية مبردة 9 °م، تهوية 15 م³/س",
        moq: "حاوية واحدة 40 قدم",
        loading: "24 – 27 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "potatoes",
    "vegetables",
    potatoes,
    potatoesB,
    {
      name: "Potatoes",
      intro: "Firm, versatile export-grade potatoes for retail and processing.",
      description:
        "Egyptian potatoes are grown in sandy, virus-free land and are approved for demanding markets including the EU and Russia. We supply table and processing varieties with consistent dry matter, low reducing sugars and excellent frying colour. Every lot is washed or brushed, graded and inspected for brown-rot compliance before shipment.",
      specs: {
        scientificName: "Solanum tuberosum",
        variety: "Spunta, Cara, Hermes, Lady Rosetta, Diamond",
        season: "January – May and October – December",
        sizes: "35/55, 45/65, 50/70, 60/80, 70+ mm",
        color: "Yellow to light brown skin, cream flesh",
        taste: "Mild, earthy, firm texture after cooking",
        packaging: "25 kg mesh/jute bags, 10 kg or 5 kg bags, big bags",
        shelfLife: "3 – 6 months under recommended conditions",
        storageTemp: "6 – 8 °C table / 8 – 10 °C processing, 90% RH",
        transportation: "Reefer or ventilated container at 7 °C, ventilation 25 m³/h",
        moq: "1 x 40' HC container",
        loading: "26 – 28 tons per 40' HC container",
      },
    },
    {
      name: "بطاطس",
      intro: "بطاطس متماسكة بدرجة تصديرية للتجزئة والتصنيع.",
      description:
        "تُزرع البطاطس المصرية في أراضٍ رملية خالية من الأمراض ومعتمدة لأسواق صارمة مثل الاتحاد الأوروبي وروسيا. نوفر أصناف المائدة والتصنيع بمحتوى مادة جافة ثابت ولون قلي ممتاز، مع الغسل والتدريج والفحص قبل الشحن.",
      specs: {
        scientificName: "Solanum tuberosum",
        variety: "سبونتا، كارا، هيرمز، ليدي روزيتا، دياموند",
        season: "يناير – مايو وأكتوبر – ديسمبر",
        sizes: "35/55، 45/65، 50/70، 60/80، 70+ مم",
        color: "قشرة صفراء إلى بنية فاتحة ولب كريمي",
        taste: "طعم معتدل وقوام متماسك",
        packaging: "شكائر 25 كجم أو أكياس 10 / 5 كجم",
        shelfLife: "3 – 6 أشهر",
        storageTemp: "6 – 10 °م، رطوبة 90%",
        transportation: "حاوية مبردة أو مهواة عند 7 °م، تهوية 25 م³/س",
        moq: "حاوية واحدة 40 قدم",
        loading: "26 – 28 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "onions",
    "vegetables",
    onions,
    onionsB,
    {
      name: "Onions",
      intro: "Golden and red bulbs with long shelf life and firm necks.",
      description:
        "Egyptian onions are known worldwide for their high dry matter, strong pungency and outstanding storability. We supply fresh and cured golden, red and white onions in bulk or retail packaging, all machine-graded, hand-sorted and cured to ensure tight skins and minimal transit losses.",
      specs: {
        scientificName: "Allium cepa",
        variety: "Giza 6, Golden Yellow, Red Star, White",
        season: "March – August (fresh) / year-round (stored)",
        sizes: "40/60, 50/70, 60/80, 70/90 mm",
        color: "Golden brown, deep red or white",
        taste: "Pungent, sweet after cooking",
        packaging: "25 kg / 20 kg / 10 kg mesh bags, 5 kg retail bags",
        shelfLife: "4 – 6 months under recommended conditions",
        storageTemp: "0 – 2 °C cured, 65–70% RH",
        transportation: "Ventilated or reefer container at 1 °C, ventilation 30 m³/h",
        moq: "1 x 40' HC container",
        loading: "26 – 28 tons per 40' HC container",
      },
    },
    {
      name: "بصل",
      intro: "بصل ذهبي وأحمر بعمر تخزيني طويل وأعناق متماسكة.",
      description:
        "يشتهر البصل المصري بمحتواه العالي من المادة الجافة ونفاذته القوية وقدرته الممتازة على التخزين. نوفر البصل الذهبي والأحمر والأبيض معالجًا ومدرجًا آليًا ومفرزًا يدويًا لضمان قشرة محكمة وأقل فاقد أثناء الشحن.",
      specs: {
        scientificName: "Allium cepa",
        variety: "جيزة 6، ذهبي، أحمر، أبيض",
        season: "مارس – أغسطس (طازج) وعلى مدار العام (مخزن)",
        sizes: "40/60، 50/70، 60/80، 70/90 مم",
        color: "ذهبي أو أحمر داكن أو أبيض",
        taste: "نفاذ ويتحول لحلو بعد الطهي",
        packaging: "شبكات 25 / 20 / 10 كجم وأكياس تجزئة 5 كجم",
        shelfLife: "4 – 6 أشهر",
        storageTemp: "0 – 2 °م، رطوبة 65–70%",
        transportation: "حاوية مهواة أو مبردة عند 1 °م، تهوية 30 م³/س",
        moq: "حاوية واحدة 40 قدم",
        loading: "26 – 28 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "garlic",
    "vegetables",
    garlic,
    garlicB,
    {
      name: "Garlic",
      intro: "Robust flavour, uniform premium bulbs with tight white skin.",
      description:
        "Egyptian garlic combines strong aroma with excellent bulb uniformity. Bulbs are field-cured, cleaned, root-cut and graded by diameter. Available as fresh, dried or peeled cloves, our garlic serves both retail packers and industrial buyers in Europe, the Gulf and Africa.",
      specs: {
        scientificName: "Allium sativum",
        variety: "Egyptian White, Chinese White, Red Baladi",
        season: "March – July (fresh) / year-round (dried)",
        sizes: "4.5 – 5.5 cm / 5.5 – 6.5 cm / 6.5 cm+",
        color: "Pure white to light purple",
        taste: "Strong, pungent, richly aromatic",
        packaging: "10 kg carton, 20 kg mesh bag, 500 g retail nets",
        shelfLife: "6 – 8 months under recommended conditions",
        storageTemp: "-1 – 0 °C, 60–70% RH",
        transportation: "Reefer container at 0 °C, ventilation 20 m³/h",
        moq: "1 x 40' HC container",
        loading: "22 – 25 tons per 40' HC container",
      },
    },
    {
      name: "ثوم",
      intro: "نكهة قوية ورؤوس متجانسة فاخرة بقشرة بيضاء محكمة.",
      description:
        "يجمع الثوم المصري بين الرائحة القوية والتجانس الممتاز في حجم الرؤوس. تُجفف الرؤوس حقليًا وتُنظف وتُقص جذورها وتُدرج حسب القطر، ويتوفر طازجًا أو مجففًا أو فصوصًا مقشرة للأسواق الأوروبية والخليجية والأفريقية.",
      specs: {
        scientificName: "Allium sativum",
        variety: "أبيض مصري، أبيض صيني، بلدي أحمر",
        season: "مارس – يوليو (طازج) وطوال العام (مجفف)",
        sizes: "4.5 – 5.5 سم / 5.5 – 6.5 سم / أكبر من 6.5 سم",
        color: "أبيض ناصع إلى بنفسجي فاتح",
        taste: "قوي ونفاذ وعطري",
        packaging: "كرتون 10 كجم، شبكة 20 كجم، عبوات تجزئة 500 جم",
        shelfLife: "6 – 8 أشهر",
        storageTemp: "-1 – 0 °م، رطوبة 60–70%",
        transportation: "حاوية مبردة عند 0 °م، تهوية 20 م³/س",
        moq: "حاوية واحدة 40 قدم",
        loading: "22 – 25 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "sweet-potatoes",
    "vegetables",
    sweetPotatoes,
    sweetPotatoesB,
    {
      name: "Sweet Potatoes",
      intro: "Naturally sweet roots with rich orange flesh and smooth skin.",
      description:
        "Our Beauregard sweet potatoes are cured for seven days to set the skin and develop sugars, then graded for shape and calibre. They deliver deep orange flesh, high beta-carotene and a clean, sweet flavour that performs well in retail packs and food service across Europe and the Gulf.",
      specs: {
        scientificName: "Ipomoea batatas",
        variety: "Beauregard, Covington, Japanese Purple",
        season: "September – March",
        sizes: "200 – 400 g / 400 – 600 g / 100 – 200 g (baby)",
        color: "Copper-orange skin, deep orange flesh",
        taste: "Sweet, creamy, smooth texture",
        packaging: "5 kg / 6 kg carton, 10 kg carton, big bags",
        shelfLife: "4 – 6 months after curing",
        storageTemp: "12 – 14 °C, 85–90% RH",
        transportation: "Reefer container at 13 °C, ventilation 20 m³/h",
        moq: "1 x 40' HC container",
        loading: "24 – 26 tons per 40' HC container",
      },
    },
    {
      name: "بطاطا حلوة",
      intro: "جذور حلوة طبيعيًا بلب برتقالي غني وقشرة ناعمة.",
      description:
        "تُعالج البطاطا الحلوة صنف بوريجارد لمدة سبعة أيام لتثبيت القشرة وتطوير السكريات، ثم تُدرج حسب الشكل والحجم. تتميز بلب برتقالي غني بالبيتا كاروتين ونكهة حلوة نظيفة مناسبة للتجزئة والمطاعم.",
      specs: {
        scientificName: "Ipomoea batatas",
        variety: "بوريجارد، كوفينجتون، بنفسجية يابانية",
        season: "سبتمبر – مارس",
        sizes: "200 – 400 جم / 400 – 600 جم / 100 – 200 جم",
        color: "قشرة نحاسية ولب برتقالي غامق",
        taste: "حلو وكريمي وناعم",
        packaging: "كرتون 5 / 6 / 10 كجم أو عبوات كبيرة",
        shelfLife: "4 – 6 أشهر بعد المعالجة",
        storageTemp: "12 – 14 °م، رطوبة 85–90%",
        transportation: "حاوية مبردة عند 13 °م، تهوية 20 م³/س",
        moq: "حاوية واحدة 40 قدم",
        loading: "24 – 26 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "green-beans",
    "vegetables",
    greenBeans,
    greenBeansB,
    {
      name: "Green Beans",
      intro: "Crisp, tender pods harvested young and cooled immediately.",
      description:
        "Fine and extra-fine green beans are hand-picked daily, sorted for straightness and colour, and hydro-cooled within hours to preserve their snap. They are shipped fresh by air to Europe or frozen IQF by sea, and are one of our most consistent winter programme lines.",
      specs: {
        scientificName: "Phaseolus vulgaris",
        variety: "Paulista, Nomad, Serengeti (fine & extra fine)",
        season: "October – May",
        sizes: "Extra fine 6 mm, fine 6 – 9 mm, bobby 9 – 12 mm",
        color: "Uniform vivid green",
        taste: "Sweet, crisp, tender with no strings",
        packaging: "250 / 500 g punnets in 3 kg carton, 5 kg bulk, IQF 10 kg",
        shelfLife: "10 – 14 days fresh, 24 months IQF",
        storageTemp: "5 – 7 °C fresh, -18 °C IQF",
        transportation: "Air freight at 6 °C or reefer container for IQF",
        moq: "500 kg air freight / 1 x 40' HC for IQF",
        loading: "Up to 22 tons per 40' HC container (IQF)",
      },
    },
    {
      name: "فاصوليا خضراء",
      intro: "قرون طرية مقرمشة تُقطف مبكرًا وتُبرد فورًا.",
      description:
        "تُقطف الفاصوليا الرفيعة وفائقة الرفع يدويًا يوميًا وتُفرز حسب الاستقامة واللون وتُبرد مائيًا خلال ساعات للحفاظ على قرمشتها. تُشحن طازجة جوًا إلى أوروبا أو مجمدة IQF بحرًا، وهي من أثبت خطوط برنامجنا الشتوي.",
      specs: {
        scientificName: "Phaseolus vulgaris",
        variety: "بوليستا، نوماد، سيرينجيتي",
        season: "أكتوبر – مايو",
        sizes: "فائق الرفع 6 مم، رفيع 6 – 9 مم، عادي 9 – 12 مم",
        color: "أخضر زاهٍ متجانس",
        taste: "حلو ومقرمش وطري بدون ألياف",
        packaging: "عبوات 250 / 500 جم في كرتون 3 كجم أو 5 كجم سائب",
        shelfLife: "10 – 14 يومًا طازجة، 24 شهرًا مجمدة",
        storageTemp: "5 – 7 °م طازجة، -18 °م مجمدة",
        transportation: "شحن جوي عند 6 °م أو حاوية مبردة للمجمد",
        moq: "500 كجم جوًا / حاوية 40 قدم للمجمد",
        loading: "حتى 22 طن للحاوية 40 قدم",
      },
    },
  ),
  build(
    "peppers",
    "vegetables",
    peppers,
    peppersB,
    {
      name: "Peppers",
      intro: "Colourful thick-walled bell peppers grown under protected cultivation.",
      description:
        "Our bell peppers are grown in greenhouses and net houses for blemish-free skin, uniform blocky shape and thick walls that hold up in transit. Available in red, yellow, green and orange, they are graded by colour and calibre and packed in ventilated cartons for fresh export or supplied IQF for processors.",
      specs: {
        scientificName: "Capsicum annuum",
        variety: "Blocky bell (red, yellow, orange, green), chili on request",
        season: "October – June",
        sizes: "150 – 200 g / 200 – 250 g / 250 g+",
        color: "Red, yellow, orange, green",
        taste: "Sweet, crisp, mild and juicy",
        packaging: "5 kg carton, 3 kg punnet carton, IQF 10 kg",
        shelfLife: "18 – 25 days under recommended conditions",
        storageTemp: "7 – 9 °C, 90–95% RH",
        transportation: "Reefer container at 8 °C, ventilation 20 m³/h",
        moq: "1 x 40' HC container",
        loading: "18 – 20 tons per 40' HC container",
      },
    },
    {
      name: "فلفل ألوان",
      intro: "فلفل رومي ملوّن سميك اللب مزروع في بيوت محمية.",
      description:
        "يُزرع الفلفل الرومي في صوب وبيوت شبكية للحصول على قشرة نظيفة وشكل متجانس وجدران سميكة تتحمل الشحن. يتوفر بالأحمر والأصفر والأخضر والبرتقالي مدرجًا حسب اللون والحجم ومعبأ في كراتين مهواة أو مجمدًا للمصانع.",
      specs: {
        scientificName: "Capsicum annuum",
        variety: "فلفل رومي (أحمر، أصفر، برتقالي، أخضر)",
        season: "أكتوبر – يونيو",
        sizes: "150 – 200 جم / 200 – 250 جم / أكثر من 250 جم",
        color: "أحمر، أصفر، برتقالي، أخضر",
        taste: "حلو ومقرمش وعصيري",
        packaging: "كرتون 5 كجم أو 3 كجم أو مجمد 10 كجم",
        shelfLife: "18 – 25 يومًا",
        storageTemp: "7 – 9 °م، رطوبة 90–95%",
        transportation: "حاوية مبردة عند 8 °م، تهوية 20 م³/س",
        moq: "حاوية واحدة 40 قدم",
        loading: "18 – 20 طن للحاوية 40 قدم",
      },
    },
  ),
];

const BASE_CATALOG_ZH: Record<
  string,
  { name: string; intro: string; description: string; specs: Omit<ProductSpecs, "origin" | "category" | "certifications"> }
> = {
  oranges: {
    name: "埃及特级鲜橙",
    intro: "阳光孕育的埃及出口鲜橙，汁水充沛，风味浓郁酸甜适口。",
    description:
      "埃及是全球最大的鲜橙出口国之一。我们的鲜橙种植于尼罗河三角洲及肥沃的沙漠灌溉农场，沐浴全年充沛阳光。主要出口品种包括脐橙与晚熟夏橙，糖度高、出汁率极高，经先进光学选果线清洗、分级打蜡，全程温控冷藏海运至全球主要口岸。",
    specs: {
      scientificName: "Citrus sinensis",
      variety: "瓦伦西亚夏橙 (Valencia), 脐橙 (Navel), 巴拉迪橙 (Baladi)",
      season: "11月 – 次年6月",
      sizes: "40, 48, 56, 64, 72, 80, 88, 100, 113, 125 (口径 64–100mm)",
      color: "亮橙色至深橙色，果面光洁",
      taste: "多汁甘甜，芳香浓郁 (Brix 11–13°)",
      packaging: "15公斤标准开口/伸缩纸箱，或8公斤礼盒",
      shelfLife: "冷藏环境下 60–90 天",
      storageTemp: "2°C – 4°C, 相对湿度 85%–90%",
      transportation: "40英尺高柜海运冷藏集装箱",
      moq: "1 个 40英尺冷藏集装箱 (约 24–26 吨)",
      loading: "20个托盘 (约1,600箱 / 24–25.6公吨)",
    },
  },
  grapes: {
    name: "优质埃及鲜食葡萄",
    intro: "手工精选无籽鲜食葡萄，果粒圆润饱满，清甜脆嫩多汁。",
    description:
      "得益于埃及早熟气候优势，埃及鲜食葡萄在全球市场具备突出的供应早市优势。精选白无籽、红无籽及黑无籽等高端品种。手工采收后数小时内迅速进行压差预冷，严格锁住果粉与新鲜果蒂，保证长途海空运后的脆甜口感。",
    specs: {
      scientificName: "Vitis vinifera",
      variety: "早期甜白 (Early Sweet), 苏必利尔 (Superior), 红焰无籽 (Flame), 克瑞森 (Crimson)",
      season: "5月 – 9月",
      sizes: "粒径 16–22mm+，单串重 350g–800g",
      color: "金绿透亮 (白葡萄) / 鲜艳宝石红 (红葡萄)",
      taste: "脆爽爆汁，甜度极佳 (Brix 16–20°)，无核薄皮",
      packaging: "4.5公斤纸箱 (含保鲜袋或500克小盒)，5公斤散装箱",
      shelfLife: "标准冷藏结合保鲜垫 45–60 天",
      storageTemp: "-0.5°C – 0°C, 相对湿度 90%–95%",
      transportation: "冷链海运 (40ft 冷藏柜) 或高品质生鲜航空冷运",
      moq: "海运: 1 个40尺冷藏柜 (约 12–13 吨)；空运: 1,500 公斤",
      loading: "每40尺冷藏柜装载约 2,400 箱 (4.5kg装) / 约 11.5–13 公吨",
    },
  },
  mangoes: {
    name: "埃及特级热带芒果",
    intro: "香甜浓郁的尼罗河畔精选芒果，纤维细腻，汁丰蜜甜。",
    description:
      "埃及芒果享誉国际市场，得益于砂质土壤与充足的热带光照，形成了独特的芳香与蜜甜风味。主栽名品涵盖凯特、肯特、纳奥米。严格按出口成熟度手工采收，经过温水清洗杀菌与严格分选，外形匀称、果肉如丝般顺滑。",
    specs: {
      scientificName: "Mangifera indica",
      variety: "凯特 (Keitt), 肯特 (Kent), 纳奥米 (Naomi), 泽比迪亚 (Zebdeya)",
      season: "7月 – 11月",
      sizes: "单果重 350g – 800g (每箱6至12粒)",
      color: "成熟时绿底透金黄或带有诱人红晕",
      taste: "香气极度馥郁，细腻少丝，甘甜爆汁 (Brix 15–18°)",
      packaging: "4公斤 / 5公斤平铺出口纸箱 (附防震发泡果网)",
      shelfLife: "冷链环境下 21–28 天",
      storageTemp: "10°C – 12°C, 相对湿度 85%–90%",
      transportation: "空运直航或近洋快线冷藏集装箱",
      moq: "海运: 1 个40尺冷藏柜；空运: 1,000 公斤",
      loading: "40尺冷藏柜约装 4,000–4,500 箱 (约 18–20 公吨)",
    },
  },
  pomegranates: {
    name: "埃及优质红石榴",
    intro: "色泽如红宝石般艳丽的特级红石榴，籽软汁浓，多酚抗氧化丰富。",
    description:
      "埃及是地中海地区最重要的石榴出产国之一。我们的汪德福品种石榴以个头饱满、果皮鲜红光亮、籽粒深红多汁闻名。富含天然抗氧化物质与维生素，果实外壳厚实坚韧，非常耐受跨洲长途海运，深得欧洲与中东生鲜超市与果汁加工商的青睐。",
    specs: {
      scientificName: "Punica granatum",
      variety: "汪德福 (Wonderful), 曼法鲁提 (Manfalouti), 巴拉迪 (Baladi)",
      season: "8月 – 12月",
      sizes: "规格 6, 7, 8, 9, 10, 12, 14 粒/箱 (单果 250g–600g+)",
      color: "鲜艳深红色至紫红色外皮，红宝石色内籽",
      taste: "甜酸平衡，浓醇多汁，籽粒柔软可嚼",
      packaging: "4公斤 / 4.5公斤标准平铺开口纸箱",
      shelfLife: "60–90 天 (冷库控温储存)",
      storageTemp: "5°C – 7°C, 相对湿度 90%–95%",
      transportation: "40英尺冷藏集装箱",
      moq: "1 个 40英尺冷藏柜 (约 18–20 吨)",
      loading: "每40尺柜约装 4,400 箱 (4.5kg) / 约 20 公吨",
    },
  },
  strawberries: {
    name: "埃及新鲜草莓",
    intro: "香气扑鼻的新鲜草莓，色泽纯正鲜红，果肉紧致耐运。",
    description:
      "埃及得天独厚的冬季温和气候造就了全球知名的鲜草莓出口优势。主供名品 Festival、Fortuna 与 Sensation，种植于具备全球良好农业规范认证的专属基地。每日清晨手工采摘，随即送入强制压差冷风库预冷，主要通过直飞空运或快船直航出口至欧洲、海湾及东亚高端超市。",
    specs: {
      scientificName: "Fragaria × ananassa",
      variety: "节日 (Festival), 幸运 (Fortuna), 感觉 (Sensation), 佛罗里达璀璨 (Florida Brilliance)",
      season: "11月 – 次年4月 (冬春反季主力供应)",
      sizes: "大果直径 25–35mm+，单果重 18–35g",
      color: "通体纯正鲜红色，亮泽无青头",
      taste: "香甜浓醇，果肉紧实不空心，酸甜均衡 (Brix 8–11°)",
      packaging: "2公斤或2.5公斤纸箱 (内含10个×250克透明带盖小盒)",
      shelfLife: "严格 0°C–2°C 冷链下 10–14 天",
      storageTemp: "0°C – 2°C, 相对湿度 90%–95%",
      transportation: "直航航空货运或快速近洋冷藏船",
      moq: "空运: 1,000 公斤；海运: 1 个40尺冷藏柜",
      loading: "根据航班舱位定制板载，或海运整柜约 11–13 吨",
    },
  },
  lemons: {
    name: "埃及优质鲜柠檬",
    intro: "薄皮多汁、酸香馥郁的特级埃及柠檬与青柠。",
    description:
      "埃及种植的 Eureka 与 Adalia 柠檬色泽金黄、皮薄肉厚，出汁率高于普通品种。此外还常年出口小果浓香型埃及青柠。果实蜡质均匀、无农残超标，广泛应用于鲜食零售、高档餐饮及饮品深加工行业。",
    specs: {
      scientificName: "Citrus limon",
      variety: "尤力克 (Eureka), 阿达利亚 (Adalia), 埃及小青柠 (Banzahir Lime)",
      season: "全年供应 (主产季: 10月 – 次年5月)",
      sizes: "口径 64, 75, 88, 100, 113, 125, 138 (单果 80g–150g)",
      color: "亮丽柠檬黄 (黄柠檬) / 翡翠鲜绿 (青柠)",
      taste: "酸烈纯正，香气持久，出汁率在40%以上",
      packaging: "15公斤伸缩纸箱，或10公斤/4.5公斤纸箱",
      shelfLife: "在 8°C–10°C 条件下可保存 60–90 天",
      storageTemp: "8°C – 10°C, 相对湿度 85%–90%",
      transportation: "40英尺冷藏海运集装箱",
      moq: "1 个 40英尺海运冷藏柜 (约 24 吨)",
      loading: "每40尺冷藏柜装载约 1,600 箱 (15kg) / 约 24 公吨",
    },
  },
  potatoes: {
    name: "埃及特级出口土豆",
    intro: "表面光滑平整、干物质含量高的优质埃及马铃薯。",
    description:
      "埃及是欧洲及全球市场首屈一指的早春马铃薯出口大国。种植于纯净无褐腐病的沙漠新垦荒地，采用深层地下水滴灌。品种涵盖 Spunta、Hermes、Lady Rosetta 等，涵盖鲜食烹饪与薯片薯条加工两大主流用途。果形匀称光洁，耐长途航运。",
    specs: {
      scientificName: "Solanum tuberosum",
      variety: "斯朋塔 (Spunta), 赫尔墨斯 (Hermes), 罗塞塔夫人 (Lady Rosetta), 卡拉 (Cara)",
      season: "1月 – 6月 (早春土豆优势显著)",
      sizes: "直径 40–55mm, 55–65mm, 65mm+ 以上",
      color: "淡黄至金黄表皮，浅黄细腻薯肉",
      taste: "口感绵密扎实，油炸着色均匀，干物质含量 20%–24%",
      packaging: "10kg / 25kg 聚丙烯网眼袋，或1250kg巨型大吨袋",
      shelfLife: "常温通风或冷库储存可达 3–6 个月",
      storageTemp: "6°C – 8°C (鲜食) / 8°C – 10°C (加工薯), 湿度 85%–90%",
      transportation: "40英尺通风冷藏集装箱或散装温控船",
      moq: "1 个 40英尺海运集装箱 (约 26–28 吨)",
      loading: "每40尺柜约装 26–28 公吨",
    },
  },
  onions: {
    name: "埃及优质黄洋葱与红洋葱",
    intro: "质地紧实、干皮完整、耐长久储运的特级埃及洋葱。",
    description:
      "埃及洋葱凭借其耐储性、浓郁的风味和坚硬的球茎结构享誉欧洲、远东及美洲。精选金黄洋葱和深红紫洋葱，经过田间自然晾晒与人工严格剔选，外皮干燥多层，紧实不松散，能轻松抵御跨大洋远洋船运。",
    specs: {
      scientificName: "Allium cepa",
      variety: "金黄洋葱 (Golden/Giza 6), 埃及深红洋葱 (Red Onion)",
      season: "2月 – 9月 (黄洋葱: 2月-6月, 红洋葱: 4月-9月)",
      sizes: "40–60mm, 50–70mm, 70–90mm, 90mm+ (小/中/大号)",
      color: "金铜黄色干皮或深紫色光亮干皮，内部层次紧密",
      taste: "辛香浓烈，烹调后清甜回甘，固形物高",
      packaging: "10kg / 15kg / 25kg 透气网袋，1250kg 大吨袋",
      shelfLife: "通风良好干燥环境下可达 4–6 个月",
      storageTemp: "0°C – 2°C 或通风干爽阴凉处，相对湿度 65%–70%",
      transportation: "40英尺海运通风冷藏集装箱",
      moq: "1 个 40英尺海运集装箱 (约 26–28 吨)",
      loading: "每40尺集装箱装载约 26–28 公吨",
    },
  },
  garlic: {
    name: "埃及特级白蒜与紫皮蒜",
    intro: "蒜瓣肥厚饱满、蒜味辛辣浓郁的优质埃及出口大蒜。",
    description:
      "埃及是地中海地区历史悠久的大蒜原产地之一。出产的埃及纯白蒜和紫皮蒜蒜头紧致，不易散瓣或发芽。富含大蒜素，香味浓郁，深受国际农贸批发市场与调味品加工厂欢迎。",
    specs: {
      scientificName: "Allium sativum",
      variety: "埃及白蒜 (Baladi White), 西兹紫皮大蒜 (Chinese/Sids-40 Red)",
      season: "新鲜湿蒜: 2月 – 4月; 干燥干蒜: 4月 – 9月",
      sizes: "蒜头横径 40mm, 45mm, 50mm, 55mm, 60mm+",
      color: "雪白表皮或带有亮丽紫色斑纹，蒜瓣洁白坚挺",
      taste: "辛辣强劲，蒜香扑鼻，大蒜素活性成分高",
      packaging: "5kg / 10kg 网袋、纸箱或竹筐",
      shelfLife: "干燥干蒜在规范仓储下可存放 6–9 个月",
      storageTemp: "-1°C – 0°C, 相对湿度 65%–70%",
      transportation: "40英尺冷藏海运集装箱",
      moq: "1 个 40英尺海运冷藏柜 (约 24–26 吨)",
      loading: "每40尺冷藏柜装载约 24–26 公吨",
    },
  },
  "sweet-potatoes": {
    name: "埃及优质红薯（地瓜）",
    intro: "果肉橙红温润、天然高糖香甜的特级博雷加德红薯。",
    description:
      "埃及是欧洲市场最大、最受欢迎的红薯供应国之一。主栽品种为博雷加德与贝尔维尤。经过规范化采后愈伤处理，使表皮硬化形成保护层，同时促进淀粉转化为糖分，果形优美匀称，耐受长期货架陈列。",
    specs: {
      scientificName: "Ipomoea batatas",
      variety: "博雷加德 (Beauregard), 贝尔维尤 (Bellevue)",
      season: "7月 – 次年3月 (供应期长达9个月)",
      sizes: "S (150–250g), M (250–450g), L (450–650g), XL (650–900g)",
      color: "红铜色外皮，内部深橙红色细腻果肉",
      taste: "极其香甜软糯，富含胡萝卜素和膳食纤维",
      packaging: "6kg / 10kg / 14kg 出口纸箱，打托缠膜",
      shelfLife: "经愈伤处理后在规范环境下可达 4–6 个月",
      storageTemp: "13°C – 15°C, 相对湿度 85%–90%",
      transportation: "40英尺恒温冷藏集装箱 (13°C-15°C)",
      moq: "1 个 40英尺海运冷藏柜 (约 22–24 吨)",
      loading: "每40尺冷藏柜装载 2,200 箱 (10kg装) / 约 22–24 公吨",
    },
  },
  "green-beans": {
    name: "埃及特选细圆青刀豆",
    intro: "条形笔直匀称、鲜嫩无筋脆绿的特级出口菜豆。",
    description:
      "埃及出产的细圆青刀豆专供欧洲高档超市与连锁餐饮。每日清晨露水未干前精细手工采摘，剔除弯曲豆与过粗豆，色泽深绿幼嫩，经过快速水冷降温，保持鲜亮挺拔与绝佳脆度。",
    specs: {
      scientificName: "Phaseolus vulgaris",
      variety: "细圆青刀豆 (Fine), 特细青刀豆 (Extra Fine), 鲍比豆 (Bobby Beans)",
      season: "10月 – 次年5月 (地中海冬季最佳采收期)",
      sizes: "直径 6–8mm (特细), 8–9mm (细), 长度 10–14cm",
      color: "鲜艳翠绿，无斑点、无褐变",
      taste: "脆嫩多汁，无硬筋无木质纤维，清甜爽口",
      packaging: "4公斤 / 5公斤散装纸箱，或每盒250克/500克气调保鲜小包装",
      shelfLife: "冷链管控下 14–21 天",
      storageTemp: "4°C – 7°C, 相对湿度 95%",
      transportation: "空运直航或快速海运冷藏班轮",
      moq: "空运: 1,000 公斤；海运: 1 个40尺冷藏柜",
      loading: "海运整柜约装 10–12 公吨",
    },
  },
  peppers: {
    name: "埃及特级彩色甜椒与尖椒",
    intro: "果壁厚实饱满、色泽艳丽如画的特级出口温室彩椒。",
    description:
      "在现代化温室与受控大棚中精心培育，埃及甜彩椒具备肉质肥厚、耐碰压、保鲜期长等鲜明特色。涵盖红色彩椒、金黄彩椒、翠绿甜椒以及热辣尖椒，采摘后根据国际零售商标准进行克重与果径分级，完美契合商超预包装与餐饮采购标准。",
    specs: {
      scientificName: "Capsicum annuum",
      variety: "红色彩椒 (Red Blocky), 黄色彩椒 (Yellow), 绿色甜椒, 尖辣椒 (Hot Chili)",
      season: "11月 – 次年5月",
      sizes: "果径: 70–90mm, 90–110mm (单果重 180g–300g+)",
      color: "亮丽纯正红、亮黄、橙色或翠绿，果皮光洁",
      taste: "肉厚脆嫩，清甜爽口汁水多，富含维生素C",
      packaging: "5公斤纸箱 (散装或三色彩椒袋 flow-pack 包装)",
      shelfLife: "冷藏储存下 21–28 天",
      storageTemp: "7°C – 9°C, 相对湿度 90%–95%",
      transportation: "40英尺冷藏海运集装箱或快速生鲜空运",
      moq: "海运: 1 个40尺冷藏柜；空运: 1,500 公斤",
      loading: "每40尺冷藏柜约装 2,200 箱 (5kg装) / 约 11–12 公吨",
    },
  },
};

// Enrich CATALOG with Chinese entries
for (const p of CATALOG) {
  const zhEntry = BASE_CATALOG_ZH[p.slug];
  if (zhEntry) {
    p.zh = {
      name: zhEntry.name,
      intro: zhEntry.intro,
      description: zhEntry.description,
      specs: {
        ...zhEntry.specs,
        origin: "埃及",
        category: p.group === "fruits" ? "新鲜水果" : "新鲜蔬菜",
        certifications: CERT_ZH,
      },
    };
  }
}

export function getProduct(slug: string) {
  return CATALOG.find((p) => p.slug === slug);
}

export const SPEC_LABELS: Record<Lang, Record<keyof ProductSpecs, string>> = {
  en: {
    scientificName: "Scientific Name",
    origin: "Origin",
    category: "Category",
    variety: "Variety",
    season: "Season Availability",
    sizes: "Sizes",
    color: "Color",
    taste: "Taste",
    packaging: "Packaging",
    shelfLife: "Shelf Life",
    storageTemp: "Storage Temperature",
    transportation: "Transportation",
    moq: "MOQ",
    loading: "Loading Capacity",
    certifications: "Certifications",
  },
  ar: {
    scientificName: "الاسم العلمي",
    origin: "بلد المنشأ",
    category: "الفئة",
    variety: "الأصناف",
    season: "موسم التوافر",
    sizes: "الأحجام",
    color: "اللون",
    taste: "المذاق",
    packaging: "التعبئة",
    shelfLife: "العمر التخزيني",
    storageTemp: "درجة حرارة التخزين",
    transportation: "النقل",
    moq: "أقل كمية للطلب",
    loading: "سعة التحميل",
    certifications: "الشهادات",
  },
  zh: {
    scientificName: "学名",
    origin: "原产国",
    category: "类别",
    variety: "品种",
    season: "供应产季",
    sizes: "规格尺寸",
    color: "外观色泽",
    taste: "口感风味",
    packaging: "包装形式",
    shelfLife: "保质期",
    storageTemp: "储藏温度",
    transportation: "运输方式",
    moq: "起订量 (MOQ)",
    loading: "装载量",
    certifications: "品质认证",
  },
};

export const PAGE_UI = {
  en: {
    home: "Home",
    products: "Products",
    premium: "Premium Export Grade",
    requestQuote: "Request Quote",
    gallery: "Product Gallery",
    info: "Product Information",
    description: "Description",
    related: "Other Products",
    back: "Back to Products",
    viewProduct: "View Product",
  },
  ar: {
    home: "الرئيسية",
    products: "المنتجات",
    premium: "درجة تصدير فاخرة",
    requestQuote: "اطلب عرض سعر",
    gallery: "معرض صور المنتج",
    info: "معلومات المنتج",
    description: "الوصف",
    related: "منتجات أخرى",
    back: "العودة للمنتجات",
    viewProduct: "عرض المنتج",
  },
  zh: {
    home: "首页",
    products: "产品列表",
    premium: "特级出口等级",
    requestQuote: "索取报价",
    gallery: "产品图集",
    info: "产品规格参数",
    description: "详细说明",
    related: "推荐相关产品",
    back: "返回产品列表",
    viewProduct: "查看产品",
  },
} as const;
