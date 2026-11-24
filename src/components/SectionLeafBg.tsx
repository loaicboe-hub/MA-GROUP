/** Soft subtle backdrop used across the main content sections.
 *  Scales cleanly and does not depend on external assets. */
export function SectionLeafBg({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`section-leaf-bg pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-fresh/[0.03] to-transparent ${className}`}
    >
      <div className="absolute inset-0 bg-background/85" />
    </div>
  );
}
