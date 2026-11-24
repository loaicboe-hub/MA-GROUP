import { useMemo } from "react";

type Dest = { x: number; y: number; label?: string; delay: number };

// Accurate geographic coordinate of Cairo / Egypt in 900x450 Miller projection
const HUB = { x: 528, y: 149 };

// Real-world export destinations from Egypt
const DESTS: Dest[] = [
  { x: 445, y: 88, delay: 0 },    // UK / London
  { x: 472, y: 88, delay: 0.5 },  // North-Central Europe / Rotterdam & Hamburg
  { x: 488, y: 118, delay: 1.0 }, // Southern Europe / Mediterranean
  { x: 585, y: 165, delay: 1.5 }, // Gulf / Middle East (Dubai & Riyadh)
  { x: 642, y: 195, delay: 2.0 }, // India / Mumbai
  { x: 750, y: 145, delay: 2.5 }, // East Asia / China
  { x: 710, y: 228, delay: 3.0 }, // Southeast Asia / Singapore
  { x: 545, y: 235, delay: 3.5 }, // East Africa / Kenya
  { x: 460, y: 215, delay: 4.0 }, // West Africa / Nigeria
  { x: 505, y: 320, delay: 4.5 }, // Southern Africa / South Africa
];

// Accurate geographic continent SVG path definitions (Equirectangular / Miller projection, 900x450)
const GEOGRAPHIC_LANDMASSES = [
  // North America
  "M 60.0,38.2 L 97.5,40.9 L 112.5,43.6 L 100.0,68.2 L 110.0,73.6 L 125.0,84.5 L 137.5,98.2 L 140.0,106.4 L 142.5,128.2 L 150.0,139.1 L 157.5,144.5 L 165.0,155.5 L 175.0,169.1 L 175.0,166.4 L 170.0,155.5 L 165.0,147.3 L 170.0,152.7 L 182.5,166.4 L 187.5,177.3 L 205.0,188.2 L 220.0,193.6 L 240.0,207.3 L 257.5,210.0 L 252.5,207.3 L 235.0,199.1 L 230.0,190.9 L 225.0,182.7 L 232.5,174.5 L 225.0,171.8 L 222.5,180.0 L 215.0,182.7 L 207.5,171.8 L 207.5,160.9 L 215.0,152.7 L 227.5,150.0 L 237.5,150.0 L 247.5,163.6 L 250.0,158.2 L 247.5,150.0 L 250.0,144.5 L 262.5,136.4 L 262.5,128.2 L 270.0,120.0 L 275.0,114.5 L 285.0,109.1 L 292.5,111.8 L 300.0,103.6 L 290.0,100.9 L 310.0,90.0 L 300.0,81.8 L 292.5,73.6 L 290.0,68.2 L 270.0,62.7 L 255.0,73.6 L 250.0,90.0 L 237.5,92.7 L 230.0,81.8 L 217.5,73.6 L 220.0,62.7 L 235.0,57.3 L 242.5,60.0 L 250.0,54.5 L 245.0,43.6 L 235.0,40.9 L 215.0,46.4 L 212.5,35.5 L 200.0,38.2 L 175.0,35.5 L 162.5,40.9 L 137.5,40.9 L 125.0,38.2 L 100.0,40.9 L 60.0,38.2 Z",
  // Greenland
  "M 375.0,5.5 L 405.0,10.9 L 402.5,24.5 L 395.0,40.9 L 355.0,54.5 L 342.5,68.2 L 337.5,68.2 L 317.5,54.5 L 315.0,40.9 L 280.0,24.5 L 267.5,19.1 L 300.0,8.2 L 375.0,5.5 Z",
  // South America
  "M 270.0,199.1 L 265.0,201.8 L 257.5,210.0 L 257.5,218.2 L 252.5,229.1 L 247.5,245.5 L 260.0,270.0 L 272.5,280.9 L 275.0,294.5 L 272.5,313.6 L 267.5,335.5 L 265.0,349.1 L 262.5,368.2 L 272.5,376.4 L 285.0,381.8 L 280.0,376.4 L 280.0,368.2 L 285.0,357.3 L 292.5,346.4 L 305.0,335.5 L 307.5,327.3 L 317.5,324.5 L 325.0,313.6 L 335.0,297.3 L 342.5,294.5 L 350.0,286.4 L 352.5,267.3 L 362.5,256.4 L 362.5,245.5 L 352.5,240.0 L 340.0,234.5 L 327.5,234.5 L 325.0,229.1 L 322.5,220.9 L 312.5,215.5 L 302.5,210.0 L 295.0,204.5 L 285.0,201.8 L 270.0,199.1 Z",
  // Africa
  "M 435.0,133.6 L 452.5,133.6 L 475.0,130.9 L 477.5,141.8 L 485.0,147.3 L 500.0,144.5 L 510.0,144.5 L 525.0,145.9 L 531.2,145.9 L 535.5,146.5 L 537.5,151.4 L 535.0,155.5 L 542.5,171.8 L 552.5,190.9 L 557.5,199.1 L 577.5,199.1 L 575.0,207.3 L 562.5,226.4 L 547.5,242.7 L 550.0,261.8 L 550.0,275.5 L 532.5,300.0 L 527.5,313.6 L 515.0,324.5 L 495.0,324.5 L 492.5,319.1 L 487.5,308.2 L 485.0,291.8 L 480.0,275.5 L 482.5,256.4 L 480.0,248.2 L 472.5,231.8 L 467.5,220.9 L 455.0,220.9 L 455.0,215.5 L 442.5,218.2 L 430.0,218.2 L 420.0,212.7 L 412.5,204.5 L 410.0,199.1 L 407.5,190.9 L 410.0,185.5 L 407.5,174.5 L 415.0,160.9 L 420.0,155.5 L 427.5,144.5 L 435.0,136.4 L 435.0,133.6 Z",
  // Madagascar
  "M 572.5,264.5 L 575.0,275.5 L 570.0,286.4 L 567.5,300.0 L 560.0,300.0 L 560.0,286.4 L 560.0,275.5 L 572.5,264.5 Z",
  // Europe
  "M 437.5,133.6 L 427.5,130.9 L 427.5,114.5 L 445.0,114.5 L 447.5,106.4 L 437.5,100.9 L 450.0,98.2 L 455.0,92.7 L 462.5,87.3 L 470.0,84.5 L 475.0,76.4 L 480.0,81.8 L 497.5,84.5 L 485.0,84.5 L 482.5,109.1 L 487.5,120.0 L 490.0,128.2 L 495.0,122.7 L 505.0,130.9 L 507.5,133.6 L 510.0,128.2 L 507.5,122.7 L 515.0,120.0 L 522.5,122.7 L 522.5,117.3 L 522.5,111.8 L 527.5,106.4 L 540.0,106.4 L 550.0,114.5 L 555.0,117.3 L 525.0,120.0 L 517.5,130.9 L 520.0,133.6 L 437.5,133.6 Z",
  // Scandinavia
  "M 480.0,79.1 L 477.5,73.6 L 477.5,68.2 L 462.5,62.7 L 480.0,54.5 L 485.0,46.4 L 510.0,38.2 L 520.0,38.2 L 527.5,43.6 L 512.5,54.5 L 502.5,65.5 L 495.0,70.9 L 490.0,79.1 L 480.0,79.1 Z",
  // British Isles (UK & Ireland)
  "M 437.5,95.5 L 452.5,92.7 L 450.0,87.3 L 447.5,81.8 L 442.5,73.6 L 442.5,70.9 L 435.0,76.4 L 437.5,81.8 L 440.0,87.3 L 440.0,92.7 L 437.5,95.5 Z",
  "M 425.0,90.0 L 425.0,84.5 L 432.5,81.8 L 435.0,87.3 L 427.5,92.7 L 425.0,90.0 Z",
  // Arabian Peninsula
  "M 536.2,145.9 L 537.5,155.5 L 542.5,163.6 L 550.0,177.3 L 557.5,190.9 L 562.5,196.4 L 582.5,193.6 L 587.5,185.5 L 600.0,171.8 L 592.5,163.6 L 590.0,160.9 L 577.5,166.4 L 572.5,155.5 L 570.0,150.0 L 536.2,145.9 Z",
  // Eurasia / Asia
  "M 520.0,38.2 L 550.0,40.9 L 600.0,40.9 L 637.5,32.7 L 725.0,24.5 L 800.0,32.7 L 870.0,40.9 L 875.0,51.8 L 850.0,68.2 L 855.0,81.8 L 842.5,92.7 L 825.0,70.9 L 800.0,84.5 L 787.5,100.9 L 785.0,114.5 L 777.5,117.3 L 765.0,125.5 L 745.0,128.2 L 747.5,136.4 L 755.0,147.3 L 747.5,160.9 L 735.0,171.8 L 720.0,174.5 L 720.0,188.2 L 715.0,201.8 L 700.0,207.3 L 705.0,215.5 L 710.0,229.1 L 707.5,218.2 L 697.5,204.5 L 690.0,188.2 L 680.0,174.5 L 672.5,171.8 L 657.5,185.5 L 650.0,196.4 L 642.5,210.0 L 635.0,190.9 L 625.0,174.5 L 617.5,163.6 L 605.0,163.6 L 592.5,163.6 L 585.0,130.9 L 570.0,128.2 L 570.0,120.0 L 550.0,120.0 L 532.5,117.3 L 525.0,122.7 L 540.0,106.4 L 550.0,95.5 L 550.0,81.8 L 550.0,68.2 L 532.5,49.1 L 525.0,40.9 L 520.0,38.2 Z",
  // Japan
  "M 777.5,147.3 L 780.0,141.8 L 787.5,136.4 L 800.0,133.6 L 805.0,122.7 L 812.5,114.5 L 805.0,109.1 L 802.5,117.3 L 795.0,128.2 L 780.0,139.1 L 777.5,147.3 Z",
  // Southeast Asia Islands (Sumatra & Borneo)
  "M 687.5,218.2 L 695.0,223.6 L 705.0,234.5 L 715.0,245.5 L 712.5,248.2 L 700.0,240.0 L 695.0,231.8 L 687.5,218.2 Z",
  "M 742.5,212.7 L 747.5,220.9 L 747.5,229.1 L 740.0,240.0 L 727.5,242.7 L 722.5,231.8 L 725.0,223.6 L 742.5,212.7 Z",
  // Australia
  "M 805.0,261.8 L 812.5,272.7 L 820.0,286.4 L 832.5,300.0 L 832.5,308.2 L 827.5,324.5 L 817.5,335.5 L 810.0,338.2 L 800.0,332.7 L 792.5,327.3 L 785.0,321.8 L 772.5,319.1 L 757.5,324.5 L 742.5,327.3 L 737.5,319.1 L 732.5,302.7 L 735.0,291.8 L 750.0,283.6 L 757.5,275.5 L 767.5,270.0 L 780.0,264.5 L 790.0,264.5 L 795.0,275.5 L 802.5,267.3 L 805.0,261.8 Z",
  // New Zealand
  "M 885.0,327.3 L 895.0,335.5 L 887.5,343.6 L 870.0,357.3 L 870.0,351.8 L 880.0,343.6 L 887.5,335.5 L 885.0,327.3 Z"
];

// Highlighted Egypt polygon
const EGYPT_PATH = "M 512.5,145.9 L 531.2,145.9 L 535.5,146.5 L 537.5,151.4 L 535.0,155.5 L 542.5,171.8 L 512.5,171.8 L 512.5,145.9 Z";

function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  // Curve perpendicular to line for authentic great-circle flight path
  const lift = Math.min(65, dist * 0.28);
  const nx = -dy / (dist || 1);
  const ny = dx / (dist || 1);
  const sign = b.x < a.x ? -1 : 1;
  return `M ${a.x} ${a.y} Q ${mx + nx * lift * sign} ${my + ny * lift * sign} ${b.x} ${b.y}`;
}

export default function WorldMapRoutes({ labels = [] as string[] }: { labels?: string[] }) {
  const allLandmassD = useMemo(() => GEOGRAPHIC_LANDMASSES.join(" "), []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#091C12]">
      <svg viewBox="0 0 900 450" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          {/* Oceanic depth gradient */}
          <linearGradient id="wm-ocean" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B2317" />
            <stop offset="50%" stopColor="#071910" />
            <stop offset="100%" stopColor="#04100A" />
          </linearGradient>

          {/* Trade route flowing beam gradient */}
          <linearGradient id="wm-arc-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22C55E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
          </linearGradient>

          {/* Precision data grid dots */}
          <pattern id="wm-dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.1" fill="#4ADE80" opacity="0.32" />
          </pattern>

          {/* Egypt glow aura */}
          <radialGradient id="wm-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#D4AF37" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0B2317" stopOpacity="0" />
          </radialGradient>

          {/* Continent landmass mask for dot-grid topography */}
          <mask id="wm-real-continents">
            <rect width="900" height="450" fill="black" />
            <path d={allLandmassD} fill="white" />
          </mask>
        </defs>

        {/* Ocean Background */}
        <rect width="900" height="450" fill="url(#wm-ocean)" />

        {/* Cartographic Coordinate Graticule (Lat/Lon) */}
        <g opacity="0.16" stroke="#4ADE80" strokeWidth="0.5" strokeDasharray="3 4">
          {/* Latitudes: Equator (232), Tropics (~170, ~295), 60N (68), 60S (395) */}
          <line x1="0" y1="68" x2="900" y2="68" />
          <line x1="0" y1="168" x2="900" y2="168" />
          <line x1="0" y1="232" x2="900" y2="232" strokeWidth="0.8" opacity="0.4" />
          <line x1="0" y1="295" x2="900" y2="295" />
          <line x1="0" y1="395" x2="900" y2="395" />

          {/* Longitudes */}
          {[150, 300, 450, 600, 750].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="450" />
          ))}
        </g>

        {/* Real Geographic Continents (Solid Fill + Coastline Strokes) */}
        <path
          d={allLandmassD}
          fill="#143A26"
          stroke="#2A734C"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />

        {/* Topographic Dot Pattern Overlay (Masked to real coastlines) */}
        <rect width="900" height="450" fill="url(#wm-dots)" mask="url(#wm-real-continents)" />

        {/* Highlighted Egypt Territory */}
        <path
          d={EGYPT_PATH}
          fill="#1F5739"
          stroke="#D4AF37"
          strokeWidth="1.6"
          className="filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        />

        {/* International Export Trade Routes */}
        {DESTS.map((d, i) => {
          const p = arcPath(HUB, d);
          return (
            <g key={i}>
              {/* Underlying path track */}
              <path
                d={p}
                fill="none"
                stroke="#22C55E"
                strokeWidth="1.1"
                opacity="0.25"
                strokeDasharray="4 4"
              />

              {/* Animated glowing beam */}
              <path
                d={p}
                fill="none"
                stroke="url(#wm-arc-glow)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="12 180"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="192"
                  to="0"
                  dur="3.2s"
                  begin={`${d.delay}s`}
                  repeatCount="indefinite"
                />
              </path>

              {/* Light Particle traversing the trade route */}
              <circle r="3.2" fill="#FDE047" className="filter drop-shadow-[0_0_6px_#FDE047]">
                <animateMotion dur="3.2s" begin={`${d.delay}s`} repeatCount="indefinite" path={p} />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="3.2s"
                  begin={`${d.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Destination Port/Market Node */}
              <circle cx={d.x} cy={d.y} r="3" fill="#86EFAC" />
              <circle
                cx={d.x}
                cy={d.y}
                r="6"
                fill="none"
                stroke="#22C55E"
                strokeWidth="1.2"
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values="3;10;3"
                  dur="3.2s"
                  begin={`${d.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;0;0.8"
                  dur="3.2s"
                  begin={`${d.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Egypt Export Hub (Pulsing Center) */}
        <circle cx={HUB.x} cy={HUB.y} r="55" fill="url(#wm-hub-glow)">
          <animate attributeName="r" values="38;64;38" dur="3.8s" repeatCount="indefinite" />
        </circle>

        {/* Concentric Radar Rings */}
        <circle cx={HUB.x} cy={HUB.y} r="18" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.7">
          <animate attributeName="r" values="10;28;10" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.4s" repeatCount="indefinite" />
        </circle>

        {/* Golden Central Hub Pin */}
        <circle cx={HUB.x} cy={HUB.y} r="5" fill="#D4AF37" className="filter drop-shadow-[0_0_8px_#D4AF37]" />
        <circle cx={HUB.x} cy={HUB.y} r="2" fill="#FFFFFF" />

        {/* EGYPT Badge */}
        <g transform={`translate(${HUB.x}, ${HUB.y + 24})`}>
          <rect
            x="-32"
            y="-10"
            width="64"
            height="18"
            rx="9"
            fill="#0E331F"
            stroke="#D4AF37"
            strokeWidth="1"
            className="filter drop-shadow-md"
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill="#FDE047"
            style={{ font: "700 10px Inter, sans-serif", letterSpacing: "0.15em" }}
          >
            EGYPT
          </text>
        </g>

        {/* Real Geographic Region Labels */}
        {labels.slice(0, 4).map((l, i) => {
          // Precise geographic centroids for the 4 primary regions
          const pos = [
            { x: 465, y: 72 },  // Europe
            { x: 595, y: 148 }, // Middle East
            { x: 470, y: 265 }, // Africa
            { x: 715, y: 105 }, // Asia
          ][i];
          if (!pos) return null;
          return (
            <g key={l} transform={`translate(${pos.x}, ${pos.y})`}>
              <rect
                x="-40"
                y="-10"
                width="80"
                height="18"
                rx="4"
                fill="#071910"
                fillOpacity="0.7"
                stroke="#2A734C"
                strokeWidth="0.6"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill="#E2E8F0"
                style={{ font: "600 10.5px Inter, sans-serif", letterSpacing: "0.08em" }}
              >
                {l}
              </text>
            </g>
          );
        })}

        {/* Legend / Info Pill */}
        <g transform="translate(24, 26)">
          <rect
            x="0"
            y="0"
            width="170"
            height="24"
            rx="12"
            fill="#06170E"
            fillOpacity="0.85"
            stroke="#1F5739"
            strokeWidth="0.8"
          />
          <circle cx="12" cy="12" r="3.5" fill="#22C55E" className="animate-pulse" />
          <text
            x="24"
            y="16"
            fill="#A7F3D0"
            style={{ font: "600 9.5px Inter, sans-serif", letterSpacing: "0.05em" }}
          >
            GLOBAL EXPORT ROUTES
          </text>
        </g>
      </svg>
    </div>
  );
}
