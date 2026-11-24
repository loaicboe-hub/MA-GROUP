import { useState, useEffect } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useLang } from "@/lib/i18n";

export function FloatingWhatsApp() {
  const { lang, dir } = useLang();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(window.location.pathname.startsWith("/admin"));
    }
    // Show a gentle greeting tooltip after 2.5s to invite interaction
    const t = window.setTimeout(() => setShowTooltip(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  if (isAdmin) return null;

  const phoneDigits = "201030185757";
  const defaultMessage =
    lang === "ar"
      ? "مرحباً MA GROUP، أود الاستفسار عن تصدير الحاصلات الزراعية الطازجة والمجمدة."
      : "Hello MA GROUP, I am interested in inquiring about exporting fresh and frozen agricultural produce.";

  const href = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label={lang === "ar" ? "تواصل معنا عبر واتساب" : "Chat on WhatsApp"}
      className="fixed z-50 flex items-center gap-2 pointer-events-auto"
      style={{
        bottom: "max(1.25rem, calc(1.25rem + env(safe-area-inset-bottom)))",
        right: dir === "rtl" ? "auto" : "max(1.25rem, calc(1.25rem + env(safe-area-inset-right)))",
        left: dir === "rtl" ? "max(1.25rem, calc(1.25rem + env(safe-area-inset-left)))" : "auto",
      }}
    >
      {/* Friendly Tooltip / Greeting bubble */}
      {showTooltip && (
        <div
          className={`hidden sm:flex items-center gap-2 rounded-2xl bg-white/95 px-3.5 py-2 text-xs font-semibold text-foreground shadow-xl border border-[#25D366]/30 backdrop-blur-md transition-all animate-fade-up ${
            dir === "rtl" ? "order-2" : "order-1"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
          </span>
          <span>{lang === "ar" ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp"}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Close message"
            className="text-muted-foreground hover:text-foreground ml-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Main floating button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat"
        className={`group relative flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] p-3.5 sm:px-4 sm:py-3.5 text-white shadow-[0_6px_25px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] ${
          dir === "rtl" ? "order-1" : "order-2"
        }`}
      >
        {/* Pulsing halo wave */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none" />

        {/* Official WhatsApp icon */}
        <WhatsAppIcon className="relative h-7 w-7 sm:h-6 sm:w-6 fill-current transition-transform duration-300 group-hover:rotate-6" />

        {/* Text visible on tablets/desktop, clean compact icon on small mobile */}
        <span className="relative hidden font-bold text-sm tracking-wide sm:inline">
          {lang === "ar" ? "واتساب" : "WhatsApp"}
        </span>

        {/* Mobile online notification dot */}
        <span className="sm:hidden absolute top-0.5 right-0.5 h-3 w-3 rounded-full bg-white p-0.5 shadow-sm">
          <span className="block h-full w-full rounded-full bg-[#128C7E]" />
        </span>
      </a>
    </aside>
  );
}

