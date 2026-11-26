import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  defaultFooterConfig,
  loadFooterConfig,
  type FooterConfig,
  localizeFooterConfig,
  type FooterLink,
} from "@/lib/admin-footer";
import { PartnersCarousel } from "@/components/PartnersCarousel";
import { SectionWave } from "@/components/SectionWave";
import { SectionLeafBg } from "@/components/SectionLeafBg";
import WorldMapRoutes from "@/components/WorldMapRoutes";

import { getCachedLogoUrl, getLogoUrl } from "@/lib/admin-branding";
import {
  categoryName,
  listCategories,
  listPublishedProducts,
  localized,
  productImage,
  type ProductCategory,
  type ProductRow,
} from "@/lib/products-db";

import { defaultSiteSettings, loadSiteSettings, type SiteSettings } from "@/lib/site-settings";
import {
  defaultSectionsContent,
  loadSiteContent,
  getSectionText,
  type SectionContent,
} from "@/lib/site-content";
import { getAboutVideoUrl } from "@/lib/about-video";
import { getSectionImageUrl } from "@/lib/section-image";
import { useTransparentLogo } from "@/lib/transparent-image";
import { BrandMark, BrandWatermark } from "@/components/BrandMark";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useLang, initLang } from "@/lib/i18n";
import {
  Award,
  ShieldCheck,
  Sprout,
  Truck,
  Snowflake,
  Globe2,
  Clock,
  BadgeCheck,
  HeartHandshake,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Star,
  Leaf,
} from "lucide-react";

import heroFallbackImg from "@/assets/hero.jpg";
const heroBgUrl = heroFallbackImg;
import { getCachedHeroImageUrl, getHeroImageUrl } from "@/lib/hero-image";
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
import farm from "@/assets/farm.jpg";
import qualityInspection from "@/assets/quality-inspection.jpg";
import packaging from "@/assets/packaging.jpg";
import coldStorage from "@/assets/cold-storage.jpg";
import loading from "@/assets/loading.jpg";
import shipping from "@/assets/shipping.jpg";
import delivery from "@/assets/delivery.jpg";
import whyPremiumQuality from "@/assets/why-premium-quality.jpg";
import whyCertifiedQuality from "@/assets/why-certified-quality.jpg";
import whyCompetitivePricing from "@/assets/why-competitive-pricing.jpg";
import whyCustomerFirst from "@/assets/why-customer-first.jpg";

const whyImages = [
  whyPremiumQuality,
  whyCertifiedQuality,
  farm,
  qualityInspection,
  whyCompetitivePricing,
  shipping,
  delivery,
  coldStorage,
  whyCustomerFirst,
];

const processStepImages = [
  farm,
  qualityInspection,
  packaging,
  coldStorage,
  loading,
  shipping,
  delivery,
];

export const Route = createFileRoute("/")({
  component: Index,
});

const whyIcons = [Award, BadgeCheck, Sprout, ShieldCheck, HeartHandshake, Globe2, Clock, Snowflake, Star];
const certIcons = [BadgeCheck, ShieldCheck, Globe2, Award];
const badgeIcons = [Award, BadgeCheck, Globe2];
const contactIcons = [Mail, Phone, MapPin];

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, c } = useLang();
  return (
    <div
      aria-label={c.ui.language}
      className={`inline-flex items-center gap-1 rounded-full border p-1 ${
        compact
          ? "border-border bg-white"
          : "border-white/25 bg-white/10 backdrop-blur-md"
      }`}
    >
      {(["en", "ar", "zh"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            lang === l
              ? "bg-gold text-gold-foreground shadow"
              : compact
                ? "text-muted-foreground hover:text-primary"
                : "text-white/80 hover:text-white"
          }`}
        >
          {l === "en" ? "EN" : l === "ar" ? "ع" : "中文"}
        </button>
      ))}
    </div>
  );
}

const BLANK_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function Index() {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string>("all");

  const [showTop, setShowTop] = useState(false);
  const [footerRaw, setFooter] = useState<FooterConfig>(defaultFooterConfig);
  const [logo, setLogo] = useState<string | null>(null);

  const [site, setSite] = useState<SiteSettings>(defaultSiteSettings);
  const [siteContent, setSiteContent] = useState<Record<string, SectionContent>>(defaultSectionsContent);
  const [formMsg, setFormMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [aboutVideo, setAboutVideo] = useState<string | null>(null);
  const [sectionImages, setSectionImages] = useState<Record<string, string>>({});
  const [heroBg, setHeroBg] = useState<string>(heroBgUrl);
  const [dbProducts, setDbProducts] = useState<ProductRow[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const heroLogo = useTransparentLogo(logo);
  const { lang, c } = useLang();
  const footer = localizeFooterConfig(footerRaw, lang);

  useLayoutEffect(() => {
    const cachedLogo = getCachedLogoUrl();
    if (cachedLogo) setLogo(cachedLogo);
    const cachedHero = getCachedHeroImageUrl();
    if (cachedHero) setHeroBg(cachedHero);
  }, []);

  useEffect(() => {
    initLang();
    setFooter(loadFooterConfig());
    loadSiteContent().then(setSiteContent).catch(() => undefined);
    getLogoUrl().then((u) => { if (u) setLogo(u); }).catch(() => undefined);
    loadSiteSettings().then(setSite);
    getAboutVideoUrl().then(setAboutVideo).catch(() => setAboutVideo(null));
    (["about", "whyUs", "process", "contact", "products", "markets", "certificate"] as const).forEach((k) => {
      getSectionImageUrl(k)
        .then((u) => { if (u) setSectionImages((m) => ({ ...m, [k]: u })); })
        .catch(() => undefined);
    });
    getHeroImageUrl().then((u) => { if (u) setHeroBg(u); }).catch(() => undefined);
    listPublishedProducts().then(setDbProducts).catch(() => setDbProducts([]));
    listCategories(true).then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setFormMsg(null);
    if (typeof document === "undefined") return;
    document.title = site.seoTitle || site.companyName;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", site.seoDescription);
    const kw = document.querySelector('meta[name="keywords"]');
    if (kw) kw.setAttribute("content", site.seoKeywords);
  }, [lang, site]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        // hysteresis avoids rapid toggling (flicker) right at the threshold
        setScrolled((prev) => (prev ? y > 20 : y > 60));
        setShowTop((prev) => (prev ? y > 500 : y > 600));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const heroText = getSectionText(siteContent, "home", lang);
  const aboutText = getSectionText(siteContent, "about", lang);
  const whyText = getSectionText(siteContent, "whyUs", lang);
  const processText = getSectionText(siteContent, "process", lang);
  const contactText = getSectionText(siteContent, "contact", lang);

  const nav = c.nav;


  return (
    <div className="min-h-screen bg-background text-foreground">




      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-[0_4px_30px_-10px_oklch(0.3_0.08_150/0.15)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3.5 py-3 sm:px-6 sm:py-4 lg:gap-6 lg:px-10">
          <a href="#top" className="flex shrink-0 items-center gap-2.5 sm:gap-3.5 group min-w-0">
            <div className="flex h-11 w-auto shrink-0 items-center justify-center sm:h-14 lg:h-16">
              {logo ? (
                <img
                  data-brand-logo
                  suppressHydrationWarning
                  src={logo}
                  alt="MA GROUP logo"
                  className={`h-full w-auto max-h-full object-contain transition-all duration-300 group-hover:scale-105 ${
                    scrolled
                      ? "drop-shadow-sm"
                      : "drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
                  }`}
                />
              ) : (
                <span className="font-display font-extrabold text-primary text-lg sm:text-xl tracking-wider">MA</span>
              )}
            </div>


            <div className="min-w-0">
              <div
                className={`whitespace-nowrap font-display text-lg sm:text-2xl lg:text-3xl font-bold leading-none ${
                  scrolled ? "text-primary" : "text-white"
                }`}
              >
                MA GROUP
              </div>
              <div
                className={`whitespace-nowrap text-[9px] sm:text-[10px] uppercase tracking-[0.2em] ${
                  scrolled ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                {c.brandSub}
              </div>
            </div>
          </a>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 md:flex lg:gap-6 xl:gap-8">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`whitespace-nowrap text-[13px] font-bold transition-colors lg:text-sm ${
                  scrolled
                    ? "text-foreground hover:text-fresh"
                    : "text-white/90 hover:text-gold"
                }`}
              >
                {n.label}
              </a>
            ))}
            <Link
              to="/news"
              className={`whitespace-nowrap text-[13px] font-bold transition-colors lg:text-sm ${
                scrolled ? "text-foreground hover:text-fresh" : "text-white/90 hover:text-gold"
              }`}
            >
              {lang === "ar" ? "أخبارنا" : lang === "zh" ? "公司动态" : "Our News"}
            </Link>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 md:flex lg:gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gold px-3 py-2 text-[13px] font-semibold lg:py-2.5 lg:text-sm lg:px-5 text-gold-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              {c.ui.requestQuote} <ArrowRight className="h-4 w-4" />
            </a>
            <LanguageSwitcher compact={scrolled} />
          </div>

          <div className="ml-auto flex items-center gap-3 md:hidden">
            <LanguageSwitcher compact={scrolled} />
            <button
              aria-label={c.ui.toggleMenu}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`${scrolled ? "text-foreground" : "text-white"}`}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="bg-background/98 border-b border-border shadow-2xl backdrop-blur-2xl md:hidden animate-fade-up">
            <nav className="flex flex-col gap-1 p-5">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-foreground transition-colors hover:bg-fresh/10"
                >
                  {n.label}
                </a>
              ))}
              <Link
                to="/news"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-foreground transition-colors hover:bg-fresh/10"
              >
                {lang === "ar" ? "أخبارنا" : lang === "zh" ? "公司动态" : "Our News"}
              </Link>

              {/* Direct Quick Contact for Mobile Users */}
              <div className="mt-3 pt-3 border-t border-border/60 flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/201030185757?text=${encodeURIComponent(
                    lang === "ar"
                      ? "مرحباً MA GROUP، أود الاستفسار عن تصدير الحاصلات الزراعية."
                      : lang === "zh"
                        ? "您好 MA GROUP，我想咨询农产品出口采购。"
                        : "Hello MA GROUP, I would like to inquire about agricultural export."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-5 py-3.5 text-center font-bold text-white shadow-md active:scale-95 transition-transform"
                >
                  <WhatsAppIcon className="h-5 w-5 fill-current" />
                  <span>
                    {lang === "ar"
                      ? "محادثة واتساب مباشرة"
                      : lang === "zh"
                        ? "WhatsApp 在线沟通"
                        : "Chat on WhatsApp"}
                  </span>
                </a>
                <a
                  href="tel:+201030185757"
                  className="flex items-center justify-center gap-2.5 rounded-xl border border-primary/25 bg-primary/5 px-5 py-3 text-center font-semibold text-primary active:scale-95 transition-transform"
                >
                  <Phone className="h-4 w-4" />
                  <span dir="ltr">+20 103 018 5757</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-gold px-5 py-3 text-center font-bold text-gold-foreground shadow-md transition-all active:scale-95"
                >
                  {c.ui.requestQuote}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-screen overflow-hidden bg-primary">
        <img
          data-hero-background
          suppressHydrationWarning
          src={heroBg}
          alt="MA GROUP strawberry farm harvest and fresh produce export"
          width={1920}
          height={1920}
          className="absolute inset-0 h-full w-full object-cover object-center md:object-top"
        />

        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />

        <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-5 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:grid-cols-12 lg:px-10">
          <div className="max-w-3xl animate-fade-up lg:col-span-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white sm:mb-6 sm:px-4 sm:py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              {heroText.subtitle || c.ui.heroBadge}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] text-white">
              {heroText.title ? (
                heroText.title
              ) : (
                <>
                  {c.ui.heroTitle1}{" "}
                  <span className="text-gradient-gold">{c.ui.heroTitleGold}</span>
                  <br />
                  {c.ui.heroTitle2}
                </>
              )}
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-lg text-white/85 sm:mt-6">
              {heroText.paragraph || heroText.subtitle || c.ui.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
              <a
                href="#products"
                className="inline-flex justify-center items-center gap-2 rounded-full glass-dark px-7 py-3.5 text-sm sm:text-base font-semibold text-white transition-all hover:bg-white/20 sm:px-8 sm:py-4 text-center"
              >
                {heroText.button || c.ui.exploreProducts}
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-2 sm:mt-14 sm:gap-4">
              {c.badges.map((label, bi) => {
                const BIcon = badgeIcons[bi];
                return (
                <div
                  key={label}
                  className="glass-dark flex items-center gap-2 rounded-xl p-2.5 text-white sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3"
                >
                  <BIcon className="h-4 w-4 shrink-0 text-gold sm:h-5 sm:w-5" />
                  <span className="truncate text-xs font-medium sm:text-sm">{label}</span>
                </div>
                );
              })}
            </div>
          </div>

        </div>


        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-[0.3em] animate-float">
          {c.ui.scroll}
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative overflow-hidden py-24 lg:py-32">
        <SectionLeafBg />
        <SectionWave />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">

              <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-fresh">
                <span className="h-px w-8 bg-fresh" /> {aboutText.subtitle || c.ui.aboutEyebrow}
              </div>
              <h2 className="font-display text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
                {aboutText.title ? (
                  aboutText.title
                ) : (
                  <>
                    {c.ui.aboutTitle1} <span className="text-gradient-gold">{c.ui.aboutTitleGold}</span>
                  </>
                )}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {aboutText.paragraph || c.ui.aboutP1}
              </p>
              {!aboutText.paragraph && (
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {c.ui.aboutP2}
                </p>
              )}

              <div className="mt-10 grid grid-cols-2 gap-4">
                {c.stats.map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-fresh/50"
                  >
                    <div className="font-display text-3xl font-bold text-primary">{s.n}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:col-span-7 lg:-mr-6 xl:-mr-16">
              <div className="absolute -inset-4 rounded-3xl gradient-primary opacity-20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]">
                {aboutVideo ? (
                  <video
                    key={aboutVideo}
                    src={aboutVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    poster={sectionImages.about || farm}
                    aria-label="About MA GROUP"
                    className="aspect-video h-full w-full bg-black object-cover"
                    onError={() => {
                      const fallback = "/uploads/videos/about-video-1795535555.mp4";
                      if (aboutVideo !== fallback) {
                        setAboutVideo(fallback);
                      }
                    }}
                  />
                ) : sectionImages.about ? (
                  <img
                    src={sectionImages.about}
                    alt="About MA GROUP"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <img
                    src={farm}
                    alt="Vast farm fields"
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="relative overflow-hidden py-24 lg:py-32"
        style={
          sectionImages.products
            ? {
                backgroundImage: `url("${sectionImages.products}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "100% 100%",
                filter: "none",
                opacity: 1,
              }
            : undefined
        }
      >
        {!sectionImages.products && <SectionLeafBg />}
        <SectionWave />
        {!sectionImages.products && <BrandWatermark position="right" />}

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-fresh">
              <span className="h-px w-8 bg-fresh" /> {c.ui.productsEyebrow}{" "}
              <span className="h-px w-8 bg-fresh" />
            </div>
            <h2 className="font-display text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
              {c.ui.productsTitle}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.ui.productsSub}
            </p>
          </div>

          {(() => {
            const list = dbProducts;
            const activeCategories = categories.filter((cat) => cat.active);

            const tabs: { id: string; label: string; items: ProductRow[] }[] = [];
            for (const cat of activeCategories) {
              const catItems = list.filter((p) => p.category_id === cat.id);
              tabs.push({
                id: cat.id,
                label: categoryName(cat, lang),
                items: catItems,
              });
            }
            const ungrouped = list.filter((p) => !activeCategories.some((cat) => cat.id === p.category_id));
            if (ungrouped.length)
              tabs.push({
                id: "other",
                label: lang === "ar" ? "أخرى" : lang === "zh" ? "其他" : "Other",
                items: ungrouped,
              });

            const allTabs =
              tabs.length > 1
                ? [
                    {
                      id: "all",
                      label: lang === "ar" ? "الكل" : lang === "zh" ? "全部" : "All",
                      items: list,
                    },
                    ...tabs,
                  ]
                : tabs;
            const current = allTabs.find((t) => t.id === activeCat) ?? allTabs[0];

            return (
              <>
                {allTabs.length > 1 && (
                  <div className="mt-10 flex flex-wrap justify-center gap-2.5">
                    {allTabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveCat(tab.id)}
                        className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all ${
                          current?.id === tab.id
                            ? "border-fresh bg-fresh text-white shadow-md scale-105"
                            : "border-border/70 bg-card text-muted-foreground hover:border-fresh/60 hover:text-primary"
                        }`}
                      >
                        {tab.label}
                        <span className="ml-1.5 text-xs opacity-80">({tab.items.length})</span>
                      </button>
                    ))}
                  </div>
                )}
                <div
                  key={current?.id}
                  className="animate-fade-up mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {(current?.items ?? []).map((p) => {
                    const l = localized(p, lang);
                    return (
                      <ProductCard
                        key={p.id}
                        name={l.name}
                        desc={l.intro}
                        img={productImage(p)}
                        slug={p.slug}
                        premium={c.ui.premium}
                        learnMore={c.ui.learnMore}
                      />
                    );
                  })}
                </div>
              </>
            );
          })()}

        </div>
      </section>

      {/* Why Us */}
      <section
        id="why"
        className="relative overflow-hidden py-24 lg:py-32"
        style={
          sectionImages.whyUs
            ? {
                backgroundImage: `url("${sectionImages.whyUs}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "100% 100%",
                filter: "none",
                opacity: 1,
              }
            : undefined
        }
      >
        {!sectionImages.whyUs && <SectionLeafBg />}
        <SectionWave />
        {!sectionImages.whyUs && (
          <BrandWatermark position="center" className="w-[46rem] opacity-[0.07]" />
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <BrandMark showName={false} markClassName="h-24 sm:h-28 md:h-32 w-auto" />
            <div>
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-fresh">
                <span className="h-px w-8 bg-fresh" /> {whyText.subtitle || c.ui.whyEyebrow}{" "}
                <span className="h-px w-8 bg-fresh" />
              </div>
              <h2 className="font-display text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
                {whyText.title || c.ui.whyTitle}
              </h2>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.whyUs.map((w, wi) => {
              const WIcon = whyIcons[wi];
              return (
                <div
                  key={w.title}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-fresh/50 hover:shadow-xl"
                >
                  {/* Card Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={whyImages[wi] || whyImages[0]}
                      alt={w.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                    {/* Floating Icon badge */}
                    <div className="absolute top-3 left-3 grid h-10 w-10 place-items-center rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md transition-colors group-hover:bg-fresh">
                      <WIcon className="h-5 w-5" />
                    </div>

                    {/* Numbering tag */}
                    <span className="absolute bottom-2 right-3 font-display text-3xl font-extrabold text-white/30 tracking-tight">
                      0{wi + 1}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="relative flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-primary transition-colors group-hover:text-fresh">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                      {w.desc}
                    </p>
                  </div>

                  {/* Bottom accent glow bar */}
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-fresh via-gold to-fresh transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        className="relative overflow-hidden py-24 lg:py-32"
        style={
          sectionImages.process
            ? {
                backgroundImage: `url("${sectionImages.process}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "100% 100%",
                filter: "none",
                opacity: 1,
              }
            : undefined
        }
      >
        {!sectionImages.process && <SectionLeafBg />}
        <SectionWave />
        {!sectionImages.process && <BrandWatermark position="center" />}

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-fresh">
              <span className="h-px w-8 bg-fresh" /> {processText.subtitle || c.ui.processEyebrow}{" "}
              <span className="h-px w-8 bg-fresh" />
            </div>
            <h2 className="font-display text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
              {processText.title ? (
                processText.title
              ) : (
                <>
                  {c.ui.processTitle1} <span className="text-gradient-gold">{c.ui.processTitleGold}</span>
                </>
              )}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {processText.paragraph || c.ui.processSub}
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {c.process.map((step, i) => (
              <div
                key={step.title}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-fresh/50 hover:shadow-xl ${
                  i === 6 ? "sm:col-span-2 lg:col-span-3 xl:col-span-2" : ""
                }`}
              >
                {/* Process Step Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={processStepImages[i] || processStepImages[0]}
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Step Pill */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/20 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-fresh animate-pulse" />
                    Step {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Watermark Number */}
                  <span className="absolute bottom-2 right-3 font-display text-4xl font-extrabold text-white/40 tracking-tight">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Card Content */}
                <div className="relative flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-primary transition-colors group-hover:text-fresh">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom accent glow bar */}
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-fresh via-gold to-fresh transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Certifications */}
      <section
        id="certificate"
        className="relative overflow-hidden py-24 lg:py-32"
        style={
          sectionImages.certificate
            ? {
                backgroundImage: `url("${sectionImages.certificate}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "100% 100%",
                filter: "none",
                opacity: 1,
              }
            : undefined
        }
      >
        {!sectionImages.certificate && <SectionLeafBg />}
        <SectionWave />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-fresh">
              <span className="h-px w-8 bg-fresh" /> {c.ui.certsEyebrow}{" "}
              <span className="h-px w-8 bg-fresh" />
            </div>
            <h2 className="font-display text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
              {c.ui.certsTitle}
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.certs.map((cert, ci) => {
              const CIcon = certIcons[ci];
              return (
              <div
                key={cert.title}
                className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-card to-cream p-8 text-center transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold to-[oklch(0.68_0.14_75)] text-gold-foreground shadow-lg transition-transform group-hover:scale-110">
                  <CIcon className="h-8 w-8" />
                </div>
                <div className="mt-5 font-display text-xl font-bold text-primary">
                  {cert.title}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{cert.sub}</div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Markets */}
      <section
        id="markets"
        className="relative overflow-hidden py-24 lg:py-32"
        style={
          sectionImages.markets
            ? {
                backgroundImage: `url("${sectionImages.markets}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "100% 100%",
                filter: "none",
                opacity: 1,
              }
            : undefined
        }
      >
        {!sectionImages.markets && <SectionLeafBg />}
        <SectionWave />
        {!sectionImages.markets && <BrandWatermark position="right" />}

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-fresh">
                <span className="h-px w-8 bg-fresh" /> {c.ui.marketsEyebrow}
              </div>
              <div className="flex items-center gap-4">
                <BrandMark showName={false} className="shrink-0" markClassName="h-20 sm:h-24 md:h-28 w-auto" />
                <h2 className="font-display text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
                  {c.ui.marketsTitle1} <span className="text-gradient-gold">{c.ui.marketsTitleGold}</span>
                </h2>
              </div>
              <p className="mt-6 text-lg text-muted-foreground">
                {c.ui.marketsSub}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {c.regions.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center gap-2 rounded-full border border-fresh/30 bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm"
                  >
                    <span className="h-2 w-2 rounded-full bg-fresh animate-pulse" /> {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl gradient-primary opacity-20 blur-3xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-fresh/20 shadow-[var(--shadow-soft)]">
                <WorldMapRoutes labels={c.regions} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative overflow-hidden py-24 lg:py-32"
        style={
          sectionImages.contact
            ? {
                backgroundImage: `url("${sectionImages.contact}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "100% 100%",
                filter: "none",
                opacity: 1,
              }
            : undefined
        }
      >
        {!sectionImages.contact && <SectionLeafBg />}
        <SectionWave />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-5 lg:items-start">
            <div className="lg:col-span-2">
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-fresh">
                <span className="h-px w-8 bg-fresh" /> {contactText.subtitle || c.ui.contactEyebrow}
              </div>
              <h2 className="font-display text-4xl font-bold text-primary sm:text-5xl">
                {contactText.title ? (
                  contactText.title
                ) : (
                  <>
                    {c.ui.contactTitle1} <span className="text-gradient-gold">{c.ui.contactTitleGold}</span> {c.ui.contactTitle2}
                  </>
                )}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {contactText.paragraph || c.ui.contactSub}
              </p>

              <div className="mt-8 space-y-3">
                {/* Direct Phone */}
                <a
                  href={`tel:${(site.phone || "+201030185757").replace(/\s+/g, "")}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl border border-border/60 bg-card hover:border-fresh/50 hover:bg-fresh/5 transition-all group shadow-sm"
                  dir="ltr"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-primary text-white shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-muted-foreground">
                      {lang === "ar"
                        ? "الهاتف المباشر"
                        : lang === "zh"
                          ? "出口直拨电话"
                          : "Direct Phone"}
                    </div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors text-base sm:text-lg">
                      {site.phone || "+20 103 018 5757"}
                    </div>
                  </div>
                </a>

                {/* Direct Email */}
                <a
                  href={`mailto:${site.email || "info@magroupexport.com"}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl border border-border/60 bg-card hover:border-fresh/50 hover:bg-fresh/5 transition-all group shadow-sm"
                  dir="ltr"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-primary text-white shadow-sm group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-muted-foreground">
                      {lang === "ar"
                        ? "البريد الإلكتروني"
                        : lang === "zh"
                          ? "出口业务邮箱"
                          : "Email Address"}
                    </div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                      {site.email || "info@magroupexport.com"}
                    </div>
                  </div>
                </a>

                {/* Export Hub Address */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl border border-border/60 bg-card shadow-sm" dir="ltr">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-primary text-white shadow-sm">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-muted-foreground">
                      {lang === "ar"
                        ? "المقر الرئيسي للتصدير"
                        : lang === "zh"
                          ? "出口运营总部"
                          : "Export Hub"}
                    </div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">
                      {site.address ||
                        (lang === "ar"
                          ? "جمهورية مصر العربية"
                          : lang === "zh"
                            ? "埃及开罗"
                            : "Cairo, Egypt")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const name = String(fd.get("name") ?? "").trim();
                const email = String(fd.get("email") ?? "").trim();
                const message = String(fd.get("message") ?? "").trim();
                if (!name || !email || !message) {
                  setFormMsg({ type: "error", text: c.ui.errRequired });
                  return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  setFormMsg({ type: "error", text: c.ui.errEmail });
                  return;
                }
                setFormMsg({ type: "success", text: c.ui.okSent });
                e.currentTarget.reset();
              }}
              className="lg:col-span-3 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] lg:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={c.ui.fName} type="text" name="name" />
                <Field label={c.ui.fCompany} type="text" name="company" />
                <Field label={c.ui.fCountry} type="text" name="country" />
                <Field label={c.ui.fEmail} type="email" name="email" />
                <Field label={c.ui.fPhone} type="tel" name="phone" />
                <Field label={c.ui.fProduct} type="text" name="product" />
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {c.ui.fMessage}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-all focus:border-fresh focus:ring-2 focus:ring-fresh/20"
                  placeholder={c.ui.fMessagePlaceholder}
                />
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="group inline-flex justify-center items-center gap-2 rounded-full gradient-primary px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-xl w-full sm:w-auto"
                >
                  {contactText.button || c.ui.sendInquiry} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => setFormMsg({ type: "success", text: c.ui.okQuote })}
                  className="inline-flex justify-center items-center gap-2 rounded-full border border-gold bg-gold/10 px-7 py-3.5 font-semibold text-primary transition-all hover:bg-gold hover:text-gold-foreground w-full sm:w-auto"
                >
                  {c.ui.requestQuotation}
                </button>
              </div>
              {formMsg && (
                <div
                  role="status"
                  className={`mt-5 rounded-xl border px-4 py-3 text-sm font-medium ${
                    formMsg.type === "error"
                      ? "border-destructive/30 bg-destructive/10 text-destructive"
                      : "border-fresh/40 bg-fresh/10 text-primary"
                  }`}
                >
                  {formMsg.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <PartnersCarousel
        title={lang === "ar" ? "شركاؤنا" : lang === "zh" ? "全球合作伙伴" : "Our Partners"}
        subtitle={
          lang === "ar"
            ? "نفخر بالتعاون مع شركاء ومستوردين في أوروبا والشرق الأوسط وأفريقيا وآسيا"
            : lang === "zh"
              ? "为欧洲、中东、非洲与亚洲的全球信赖进口商提供高标准合作"
              : "Proudly partnering with trusted importers across Europe, the Middle East, Africa, and Asia"
        }
      />

      {/* Soft mint wave leading into the footer */}
      <div className="relative overflow-hidden bg-mint">
        <SectionWave gradient />
        <div className="h-24 md:h-32" />
      </div>

      {/* Footer */}
      <footer className="relative bg-primary text-primary-foreground">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-auto shrink-0 items-center justify-center sm:h-16">
                  {logo ? (
                    <img
                      src={logo}
                      alt="MA GROUP logo"
                      className="h-full w-auto max-h-full object-contain filter drop-shadow-[0_0_14px_rgba(255,255,255,0.35)] brightness-105"
                      suppressHydrationWarning
                    />
                  ) : (
                    <span className="font-display font-extrabold text-white text-xl tracking-wider">MA</span>
                  )}
                </div>


                <div>
                  <div className="font-display text-xl font-bold">{site.companyName || c.brand}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">
                    {c.brandSub}
                  </div>
                </div>
              </div>
              <p className="mt-5 max-w-md text-primary-foreground/70">{footer.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${(site.whatsapp || "201030185757").replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white transition-all hover:scale-110 shadow-md"
                >
                  <WhatsAppIcon className="h-5 w-5 fill-current" />
                </a>
                {(
                  [
                    [Facebook, site.facebook || footer.social.facebook],
                    [Instagram, site.instagram || footer.social.instagram],
                    [Linkedin, site.linkedin || footer.social.linkedin],
                  ] as const
                ).map(([I, href], i) => (
                  <a
                    key={i}
                    href={href || "#top"}
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label="Social"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-primary-foreground/80 transition-all hover:border-gold hover:bg-gold hover:text-gold-foreground"
                  >
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {footer.columns.map((col) => (
              <FooterCol key={col.title} title={col.title} links={col.links} />
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-primary-foreground/60 sm:flex-row">
            <div>
              © {new Date().getFullYear()} {site.companyName || c.brand}. {c.ui.rights}
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-gold" /> {c.ui.footerBadge}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={c.ui.backToTop}
          className="fixed bottom-24 right-5 sm:bottom-24 sm:right-6 z-40 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full gradient-primary text-white shadow-xl transition-all hover:scale-110 active:scale-95"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}


function ProductCard({
  name,
  desc,
  img,
  premium,
  learnMore,
  slug,
}: {
  name: string;
  desc: string;
  img: string;
  premium: string;
  learnMore: string;
  slug: string;
}) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug }}
      className="group relative block overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-2">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={img}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-60" />
        <div className="absolute right-4 top-4 rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
          {premium}
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-display text-2xl font-semibold text-primary">{name}</h4>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-fresh transition-all group-hover:gap-3">
          {learnMore} <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

function Field({
  label,
  type,
  name,
}: {
  label: string;
  type: string;
  name: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-all focus:border-fresh focus:ring-2 focus:ring-fresh/20"
      />
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <div className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href || "#top"}
              target={l.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-primary-foreground/70 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
