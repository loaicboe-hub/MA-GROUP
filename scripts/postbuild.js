import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, ".output");
const outputPublicDir = path.join(outputDir, "public");
const outputServerDir = path.join(outputDir, "server");
const distDir = path.join(root, "dist");
const publicDir = path.join(root, "public");

function getAssetTags() {
  const assetsDir = path.join(outputPublicDir, "assets");
  let cssFile = null;
  let entryJsFile = null;
  const rootPreloads = [];

  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    // Find primary stylesheet
    cssFile =
      files.find((f) => f.startsWith("styles-") && f.endsWith(".css")) ||
      files.find((f) => f.endsWith(".css"));

    // Find main entry JS
    entryJsFile = files.find((f) => /^index-[A-Za-z0-9_-]+\.js$/.test(f));
  }

  // Check manifest if available for exact entry & preloads
  if (fs.existsSync(outputServerDir)) {
    try {
      const serverFiles = fs.readdirSync(outputServerDir);
      const manifestFile = serverFiles.find(
        (f) => f.startsWith("_tanstack-start-manifest") && f.endsWith(".mjs"),
      );
      if (manifestFile) {
        const manifestContent = fs.readFileSync(
          path.join(outputServerDir, manifestFile),
          "utf8",
        );
        const scriptMatch = manifestContent.match(/src:\s*["'](\/assets\/index-[^"']+)["']/);
        if (scriptMatch) {
          entryJsFile = path.basename(scriptMatch[1]);
        }
        const preloadMatches = manifestContent.match(
          /__root__:[\s\S]*?preloads:\s*(\[[^\]]+\])/,
        );
        if (preloadMatches) {
          const rawItems = preloadMatches[1].match(/\/assets\/[^"'\s,]+/g);
          if (rawItems) {
            rootPreloads.push(...rawItems);
          }
        }
      }
    } catch (e) {
      console.warn("Could not parse manifest, falling back to directory scan:", e.message);
    }
  }

  const cssTag = cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : "";
  const entryScriptTag = entryJsFile
    ? `<script type="module" async src="/assets/${entryJsFile}"></script>`
    : "";

  const preloadTags = rootPreloads
    .filter((href) => href.endsWith(".js") && (!entryJsFile || !href.endsWith(entryJsFile)))
    .slice(0, 15)
    .map((href) => `<link rel="modulepreload" href="${href}" />`)
    .join("\n    ");

  return { cssTag, entryScriptTag, preloadTags };
}

function generateIndexHtml() {
  const { cssTag, entryScriptTag, preloadTags } = getAssetTags();

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MA GROUP | Premium Fresh &amp; Frozen Produce Exporter</title>
    <meta
      name="description"
      content="MA GROUP is a leading Egyptian exporter of premium fresh and frozen fruits and vegetables to Europe, the Middle East, Africa, and Asia. Certified export quality and reliable logistics."
    />
    <meta
      name="keywords"
      content="Fresh Fruits Export, Fresh Vegetables Export, Frozen Fruits, Frozen Vegetables, IQF Egypt, Egypt Produce Exporter, Europe, Middle East, Africa, Asia"
    />
    <meta name="author" content="MA GROUP" />
    <meta property="og:title" content="MA GROUP | Premium Fresh &amp; Frozen Produce Exporter" />
    <meta
      property="og:description"
      content="Premium fresh &amp; frozen produce exported to Europe, the Middle East, Africa &amp; Asia with certified quality."
    />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/logo.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="/logo.png" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&amp;family=Inter:wght@300;400;500;600;700;800&amp;family=Playfair+Display:wght@500;600;700;800;900&amp;display=swap"
    />
    <script>
      window.$_TSR = window.$_TSR || {
        router: { manifest: { routes: {} }, matches: [] },
        buffer: [],
        h: function () { this.hydrated = true; },
        e: function () { this.streamEnded = true; },
        c: function () {},
        p: function (s) { if (!this.initialized && this.buffer) { this.buffer.push(s); } else { s(); } },
      };
    </script>
    ${cssTag}
    ${preloadTags}
  </head>
  <body>
    <!-- Pre-hydration cover: paints white before any page content is visible -->
    <div
      id="splash-cover"
      style="position: fixed; inset: 0; background: #ffffff; z-index: 300;"
    ></div>

    <script>
      (function(){try{if(window.location.pathname.indexOf('/admin')===0||sessionStorage.getItem('nv_splash_seen')==='1'){var c=document.getElementById('splash-cover');if(c)c.style.display='none';}var raw=localStorage.getItem('nv_logo_cache_v2');var cached=raw&&JSON.parse(raw);var logoSrc=cached&&cached.src;if(logoSrc){var fav=document.querySelector('link[rel~="icon"]');if(fav)fav.href=logoSrc;}var heroSrc=localStorage.getItem('nv_hero_image_cache_v1');var apply=function(root){if(root.nodeType!==1)return;var set=function(el,src){if(src&&el.src!==src)el.src=src;};if(root.matches){if(root.matches('[data-brand-logo]'))set(root,logoSrc);if(root.matches('[data-hero-background]'))set(root,heroSrc);}var logos=root.querySelectorAll?root.querySelectorAll('[data-brand-logo]'):[];for(var i=0;i<logos.length;i++)set(logos[i],logoSrc);var heroes=root.querySelectorAll?root.querySelectorAll('[data-hero-background]'):[];for(var j=0;j<heroes.length;j++)set(heroes[j],heroSrc);};if(logoSrc||heroSrc)new MutationObserver(function(records){for(var i=0;i<records.length;i++){if(records[i].type==='attributes')apply(records[i].target);for(var j=0;j<records[i].addedNodes.length;j++)apply(records[i].addedNodes[j]);}}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});}catch(e){}setTimeout(function(){var c=document.getElementById('splash-cover');if(c)c.style.display='none';},2100);})();
    </script>

    <div id="root"></div>

    ${entryScriptTag}
  </body>
</html>
`;
}

const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Pass Authorization header to PHP
  RewriteCond %{HTTP:Authorization} ^(.*)
  RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]

  # 2. Block Malicious Automated Attack Scanners & Known Exploitation Bots
  RewriteCond %{HTTP_USER_AGENT} (sqlmap|nikto|wpscan|dirbuster|acunetix|masscan|zgrab|nmap|morfeus|nessus) [NC]
  RewriteRule .* - [F,L]

  # 3. Block Malicious Exploitation Patterns (SQLi, Directory Traversal, RCE)
  RewriteCond %{QUERY_STRING} (eval\(|base64_decode|exec\(|passthru\(|system\(|shell_exec|union.*select|concat\(|benchmark\(|sleep\() [NC,OR]
  RewriteCond %{QUERY_STRING} (\.\./|\.\.\\|proc/self/environ|etc/passwd) [NC]
  RewriteRule .* - [F,L]

  # 4. Block access to hidden and sensitive files
  RewriteRule (^|/)\.(git|env|htaccess|htpasswd|sql|log|bak|yml|yaml|ini|lock) - [F,L]

  # 5. Direct API routing
  RewriteRule ^api/about-video/?$ /api/about-video.php [L,QSA]
  RewriteRule ^api/auth/?$ /api/auth.php [L,QSA]

  # 6. Never rewrite physical files or directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # 7. Allow direct access to uploads directory
  RewriteRule ^uploads/ - [L]

  # 8. SPA fallback for all other routes
  RewriteRule ^ index.html [L]
</IfModule>

# Request body size limit (50MB: protects against buffer exhaustion / large upload DoS)
LimitRequestBody 52428800

<IfModule mod_mime.c>
  AddType video/mp4 .mp4
  AddType video/webm .webm
  AddType video/ogg .ogv
  AddType video/quicktime .mov
</IfModule>

<IfModule mod_headers.c>
  Header set Accept-Ranges bytes
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(), camera=(), microphone=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>
`;

try {
  // 1. Generate index.html and ensure .htaccess in .output/public
  if (fs.existsSync(outputPublicDir)) {
    const html = generateIndexHtml();
    fs.writeFileSync(path.join(outputPublicDir, "index.html"), html, "utf8");
    fs.writeFileSync(path.join(outputPublicDir, ".htaccess"), htaccessContent, "utf8");
    console.log("✓ Generated .output/public/index.html and .output/public/.htaccess");
  }

  // 2. Clean and ensure dist directory exists and copy .output/public to dist
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });

  if (fs.existsSync(outputPublicDir)) {
    fs.cpSync(outputPublicDir, distDir, { recursive: true });
    console.log("✓ Copied all assets from .output/public to dist directory.");
  }

  // 3. Ensure uploads and api directories are permanently preserved in dist and .output/public
  const publicUploads = path.join(publicDir, "uploads");
  const distUploads = path.join(distDir, "uploads");
  const outputUploads = path.join(outputPublicDir, "uploads");
  if (fs.existsSync(publicUploads)) {
    fs.cpSync(publicUploads, distUploads, { recursive: true });
    fs.cpSync(publicUploads, outputUploads, { recursive: true });
    console.log("✓ Copied public/uploads to dist/uploads and .output/public/uploads.");
  }

  const publicApi = path.join(publicDir, "api");
  const distApi = path.join(distDir, "api");
  const outputApi = path.join(outputPublicDir, "api");
  if (fs.existsSync(publicApi)) {
    fs.cpSync(publicApi, distApi, { recursive: true });
    fs.cpSync(publicApi, outputApi, { recursive: true });
    console.log("✓ Copied public/api to dist/api and .output/public/api.");
  }

  // 4. Ensure index.html and .htaccess also exist in dist directly
  const distHtmlPath = path.join(distDir, "index.html");
  if (!fs.existsSync(distHtmlPath)) {
    const html = generateIndexHtml();
    fs.writeFileSync(distHtmlPath, html, "utf8");
  }
  fs.writeFileSync(path.join(distDir, ".htaccess"), htaccessContent, "utf8");
  console.log("✓ Verified dist/index.html and dist/.htaccess are present.");

  // 5. Ensure public/.htaccess exists in repo source as well
  const publicHtaccess = path.join(publicDir, ".htaccess");
  if (!fs.existsSync(publicHtaccess)) {
    fs.writeFileSync(publicHtaccess, htaccessContent, "utf8");
  }

  // 6. Also mirror .output inside dist/.output in case platform looks for dist/.output
  const distOutputDir = path.join(distDir, ".output");
  if (fs.existsSync(outputDir) && !fs.existsSync(distOutputDir)) {
    fs.cpSync(outputDir, distOutputDir, { recursive: true });
    console.log("✓ Mirrored .output inside dist/.output.");
  }
} catch (err) {
  console.error("Postbuild error:", err);
  process.exit(1);
}
