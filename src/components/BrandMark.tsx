// Shared brand logo pieces so every page shows the company logo consistently.
import { useEffect, useLayoutEffect, useState } from "react";
import { getCachedLogoUrl, getLogoUrl, updateFavicon } from "@/lib/admin-branding";
import { useTransparentLogo } from "@/lib/transparent-image";
import { cn } from "@/lib/utils";

const BLANK_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/** Brand logo, read synchronously from cache so the first paint already has it. */
export function useBrandLogo() {
  // Keep the server and hydration render identical, then restore the local cache before paint.
  const [logo, setLogo] = useState<string | null>(null);
  useLayoutEffect(() => {
    const cached = getCachedLogoUrl();
    if (cached) {
      setLogo(cached);
      updateFavicon(cached);
    }
  }, []);
  useEffect(() => {
    let alive = true;
    getLogoUrl()
      .then((url) => {
        if (alive && url) {
          setLogo(url);
          updateFavicon(url);
        }
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);
  return logo;
}


/** Logo mark used in page headers and sections. */
export function BrandMark({
  className,
  markClassName,
  showName = true,
  name = "MA GROUP",
}: {
  className?: string;
  /** Size / style overrides for the logo mark. */
  markClassName?: string;
  showName?: boolean;
  name?: string;
}) {
  const logo = useBrandLogo();

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative flex h-14 w-auto shrink-0 items-center justify-center",
          markClassName,
        )}
      >
        {logo ? (
          <img
            data-brand-logo
            src={logo}
            alt={`${name} logo`}
            suppressHydrationWarning
            className="h-full w-auto max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="font-display text-sm font-bold text-primary">MA</span>
        )}
      </span>
      {showName && (
        <span className="font-display text-xl font-bold leading-tight text-primary">{name}</span>
      )}
    </span>
  );
}

/** Faint logo watermark for section backgrounds. */
export function BrandWatermark({
  className,
  position = "right",
}: {
  className?: string;
  position?: "left" | "right" | "center";
}) {
  const logo = useBrandLogo();
  const clean = useTransparentLogo(logo);

  const place =
    position === "left"
      ? "-left-24 top-8"
      : position === "center"
        ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        : "-right-24 top-8";

  return (
    <img
      src={clean ?? logo ?? BLANK_PIXEL}
      alt=""
      aria-hidden
      suppressHydrationWarning
      className={cn(
        "pointer-events-none absolute z-0 w-[34rem] max-w-none select-none object-contain opacity-[0.07] mix-blend-multiply",
        place,
        className,
      )}
    />

  );
}
