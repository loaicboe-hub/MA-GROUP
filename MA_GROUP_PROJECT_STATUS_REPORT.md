# MA GROUP — FULL PROJECT AUDIT & STATUS REPORT

**Project Name:** MA GROUP  
**Audit Date:** November 2026  
**Project Workspace Location:** `d:\PROJECTS\MA GROUP EXPORT`  
**Inner Codebase Directory:** `d:\PROJECTS\MA GROUP EXPORT\MA GROUP EXPORT`  
**Target Infrastructure:** Hostinger Server (Independent Deployment)  
**Status:** Audit Completed — Awaiting User Approval for Next Phase  

---

## EXECUTIVE SUMMARY

A comprehensive, non-destructive audit of the codebase copied into `d:\PROJECTS\MA GROUP EXPORT` was executed. The application is a full-stack, server-side rendered (SSR) web application with an administrative content management system (CMS) and commercial invoicing suite designed for an international agricultural import/export enterprise.

The codebase originates from a project generated and maintained via Lovable Cloud and GitHub (`[REDACTED_PREVIOUS_USER]/PREVIOUS_PROJECT.git`), previously branded under **"PREVIOUS_PROJECT Import and Export"** (with earlier traces of **"Fresh Diamond for Export"** and references to **"Adem"**).

### Primary Conclusions
1. **Application Architecture:** Modern, high-performance stack built with **TanStack Start (SSR)**, **React 19**, **Vite 8**, **Tailwind CSS v4**, **TanStack Router**, and **Radix UI**.
2. **Current Backend Coupling:** The application is tightly coupled to an external, pre-existing Supabase Cloud instance (`xmdjqckwspmwwgyugbep.supabase.co`). Even if environment variables are stripped, fallback URLs and API keys are hardcoded in client and server source files.
3. **Critical Security Vulnerability:** Built-in hardcoded Super Admin master credentials (including plaintext email and password) are compiled directly into the client-facing JavaScript bundle (`src/lib/admin-auth.ts`).
4. **Discrepancy Between UI and Backend:** Several admin sections (Dashboard Metrics, Markets, Contact Requests, Media Library, and Invoicing) rely entirely on mock in-memory data or browser `localStorage`, rather than actual database tables. Furthermore, the public homepage contact and quotation forms do not persist submissions to any database.
5. **Hostinger Readiness:** The codebase contains a standalone self-hosting preparation kit in `selfhost/` (with a complete PostgreSQL schema `schema.sql`), but the Vite/Nitro build pipeline is currently configured to output for Cloudflare Workers rather than a standalone Node.js server required for Hostinger VPS / Docker hosting.
6. **Code Health:** TypeScript compilation (`tsc --noEmit`) currently fails with type errors in `src/lib/site-content.ts` due to referencing a non-existent database table. However, bundler compilation (`vite build`) succeeds.

Below is the detailed 17-part status report.

---

## 1. CURRENT PROJECT STRUCTURE

### Directory Nesting
The active workspace root is `d:\PROJECTS\MA GROUP EXPORT`. Within this directory, the entire project codebase is contained inside a nested sub-directory also named `MA GROUP EXPORT`:

```
d:\PROJECTS\MA GROUP EXPORT\
└── MA GROUP EXPORT\
    ├── .git\                       # Existing Git repository (points to external GitHub remote)
    ├── .lovable\                   # Lovable project metadata and historical migration plans
    ├── .output\                    # Nitro / Vite SSR build output artifacts
    ├── .tanstack\                  # TanStack Start framework cache
    ├── .wrangler\                  # Cloudflare Wrangler deployment configuration
    ├── node_modules\               # Installed npm/bun dependencies
    ├── public\                     # Static public assets (favicon.png, logo.jpeg)
    ├── selfhost\                   # Self-hosting migration scripts & PostgreSQL schema
    │   ├── README.md               # Guide for VPS migration
    │   ├── env.example             # Example environment variables
    │   ├── migrate.mjs             # Data migration script from old Supabase to new VPS
    │   └── schema.sql              # Complete PostgreSQL schema (tables, RLS, functions)
    ├── src\                        # Core application source code
    │   ├── assets\                 # Produce photography, gallery images, operational art
    │   ├── components\             # React components
    │   │   ├── admin\              # Admin panel components (Sidebar, PageHeader, RichTextEditor, etc.)
    │   │   └── ui\                 # Shadcn / Radix UI component library (40+ components)
    │   ├── hooks\                  # Custom React hooks (use-mobile, etc.)
    │   ├── integrations\
    │   │   └── supabase\           # Supabase client, server client, types, auth middleware
    │   ├── lib\                    # Business logic, state stores, i18n, PDF generation
    │   ├── routes\                 # File-based TanStack Router route tree
    │   │   ├── admin.index.tsx
    │   │   ├── admin.login.tsx
    │   │   ├── admin._authed.tsx   # Authenticated admin layout & permission guard
    │   │   ├── admin._authed.*.tsx # 15 admin module routes
    │   │   ├── index.tsx           # Public homepage (bilingual, 1170 lines)
    │   │   ├── products.$slug.tsx  # Public product specification & detail page
    │   │   ├── news.index.tsx      # Public news / blog index
    │   │   ├── news.$slug.tsx      # Public single article page
    │   │   ├── reset-password.tsx  # Password reset page
    │   │   └── __root.tsx          # Root shell layout with pre-hydration splash script
    │   ├── router.tsx              # Router initialization
    │   ├── server.ts               # Nitro server entry & SSR error normalizer
    │   ├── start.ts                # TanStack Start server instance & CSRF middleware
    │   └── styles.css              # Tailwind v4 stylesheet, brand theme variables, RTL rules
    ├── .env                        # Live environment variables pointing to old Supabase
    ├── .prettierrc / .prettierignore
    ├── AGENTS.md                   # Lovable instructions & warning against history rewrites
    ├── bunfig.toml / bun.lock      # Bun configuration and lockfile
    ├── components.json             # Shadcn UI configuration
    ├── eslint.config.js            # ESLint flat config
    ├── package.json / package-lock.json
    ├── README.md                   # Legacy project specifications ("Fresh Diamond for Export")
    ├── tsconfig.json               # TypeScript configuration with bundler module resolution
    └── vite.config.ts              # Vite & Lovable TanStack plugin configuration
```

---

## 2. TECHNOLOGIES AND FRAMEWORKS USED

| Layer | Technology | Version | Purpose / Status |
| :--- | :--- | :--- | :--- |
| **Language** | TypeScript | `^5.8.3` | Full-stack type safety across client and server. |
| **Runtime & Core** | React | `^19.2.0` | UI framework with concurrent rendering and Server Functions. |
| **Fullstack Framework**| TanStack Start | `^1.168.26` | SSR framework with server function RPCs and server middleware. |
| **Routing** | TanStack Router | `^1.170.16` | Type-safe file-based client/server routing. |
| **Server Engine** | Nitro / h3 | `3.0.260603-beta` | SSR server engine bundled within TanStack Start. |
| **Build Tooling** | Vite | `^8.0.16` | Fast bundling with `@tailwindcss/vite` and `@vitejs/plugin-react`. |
| **Styling** | Tailwind CSS | `^4.2.1` | Utility-first CSS using modern CSS variables and OKLCH color spaces. |
| **UI Components** | Radix UI / Shadcn | Various | Comprehensive set of accessible unstyled primitives (Dialog, Select, Tabs, etc.). |
| **Icons** | Lucide React | `^0.575.0` | Vector icon set. |
| **Animations** | Framer Motion | `^12.43.0` | Motion graphics and page splash screen. |
| **Data Fetching** | TanStack React Query| `^5.101.1` | Client-side query caching and mutations. |
| **Validation** | Zod | `^3.24.2` | Schema parsing and validation. |
| **Forms** | React Hook Form | `^7.71.2` | Form management with `@hookform/resolvers`. |
| **PDF Generation** | jsPDF + AutoTable | `^4.2.1` / `^5.0.8`| Client-side generation of commercial export invoices. |
| **Data & Auth** | Supabase JS | `^2.111.0` | Client library for PostgreSQL data, Auth, and Storage. |
| **Configuration Wrapper**| Lovable TanStack Config| `2.13.1` | Custom Vite plugin wrapper tying together devtools and Nitro presets. |

---

## 3. FRONTEND STATUS

### Overview
The frontend is visually rich, modern, responsive, and completely bilingual (English and Arabic with native Right-to-Left `dir="rtl"` support).

| Feature / Page | Status | Details |
| :--- | :--- | :--- |
| **Root Shell (`__root.tsx`)** | **Verified working** | Implements pre-hydration white cover, meta tags, Google Fonts (Inter, Cairo, Playfair Display), and global error boundary. |
| **Splash Screen (`SplashScreen.tsx`)** | **Verified working** | Animated Framer Motion SVG brand mark with auto-sampling of background colors. Stored in session to show once per visit. |
| **Homepage (`/`)** | **Verified working** | Contains 11 sections: Hero with dynamic background, About Us with inline video, Why Choose Us, Export Process timeline, Interactive SVG Global Markets Map, Product Catalog tabs, News teaser, Partners Carousel, Contact Form, and Footer. |
| **Product Details (`/products/$slug`)** | **Verified working** | Dynamic slug resolution, bilingual product specification tables (scientific name, packaging, variety, container loading, temperatures), image galleries, and inquiry modal. |
| **Newsroom (`/news/`)** | **Verified working** | Searchable and filterable grid of news articles with pagination/load more functionality. |
| **Article Page (`/news/$slug`)** | **Verified working** | Long-form news article view with responsive video embedding (YouTube/Vimeo), photo gallery, social share buttons, and related articles. |
| **Password Reset (`/reset-password`)** | **Verified working** | Token validation and password confirmation interface. |
| **Bilingual Internationalization (`i18n.ts`)**| **Verified working** | Seamless client-side switching between English (`LTR`) and Arabic (`RTL`), persisted in `localStorage`. |
| **Theme & Typography** | **Verified working** | Premium agricultural luxury aesthetic: Deep Forest Green (`#1E5631`), Fresh Green (`#4CAF50`), Gold Accents (`#D4AF37`), Cream, and Mint backgrounds. |

---

## 4. BACKEND STATUS

### Overview
The backend uses **TanStack Start Server Functions** running on **Nitro**, combined with an external Supabase BaaS (Postgres + Auth + Storage).

| Component | Status | Details |
| :--- | :--- | :--- |
| **Nitro Server (`src/server.ts`)** | **Verified working** | Normalizes server-side rendering errors and catches unhandled h3 exceptions to output a clean fallback error page. |
| **Start Middleware (`src/start.ts`)** | **Verified working** | Injects CSRF protection for Server Function RPCs and executes `attachSupabaseAuth`. |
| **Server Functions (`admin-users.functions.ts`)**| **Present in code but not verified** | Server-side RPC handlers: `listAdminUsersFn`, `createAdminUser`, `deleteAdminUser`, `setAdminUserPassword`, `setSuperAdmin`. Uses Supabase Service Role key. |
| **Admin Bootstrap (`admin-bootstrap.functions.ts`)**| **Present in code but not verified** | Server-side one-time setup: grants `admin` and `super_admin` role to first user when no admin exists in the database. |
| **Build Target Configuration** | **Incomplete for Hostinger** | Currently builds using Nitro's Cloudflare Worker preset (`.wrangler/deploy/config.json`) instead of a standalone Node.js server. |

---

## 5. DATABASE ARCHITECTURE AND CURRENT CONFIGURATION

### Overview
The database architecture is designed for PostgreSQL with Supabase extensions (Row-Level Security, Auth schema, and Storage schema).

### Schema Tables (`selfhost/schema.sql` & `src/integrations/supabase/types.ts`)
1. **`public.profiles`**: Stores user ID, email, full name, and timestamps.
2. **`public.user_roles`**: Links `user_id` to `app_role` enum (`'admin' | 'user' | 'super_admin'`).
3. **`public.user_permissions`**: Granular per-module permissions (`module_key`, `can_view`, `can_create`, `can_edit`, `can_delete`).
4. **`public.product_categories`**: Product categories (`name_en`, `name_ar`, `slug`, `trade`, `sort_order`, `active`).
5. **`public.products`**: Products catalog (`name_en`, `name_ar`, `intro_en`, `intro_ar`, `description_en`, `description_ar`, `specs_en`, `specs_ar`, `hidden_specs`, `main_image`, `gallery`, `trade`, `published`, `sort_order`).
6. **`public.news`**: Blog and company news articles (`title`, `title_ar`, `content`, `content_ar`, `excerpt`, `excerpt_ar`, `featured_image`, `gallery`, `video_url`, `tags`, `category`, `published`, `published_at`).
7. **`public.partners`**: Partner logos and links (`name`, `logo_url`, `logo_path`, `url`, `sort_order`, `enabled`).
8. **`public.site_settings`**: Global contact information, company name, social media links, and SEO metadata.
9. **`public.quote_requests`**: Stores quote inquiries submitted by prospective buyers.

### Storage Bucket
- **`site-media`**: Storage bucket containing organized folders:
  - `branding/`: Brand logos (PNG, JPG, SVG).
  - `partners/`: Partner and client corporate logos.
  - `about/`: About Us video (MP4/WebM, up to 50MB).
  - `hero/`: High-resolution homepage hero background images.
  - `products/`: Product imagery and photo galleries.
  - `news/`: News article thumbnails and photo galleries.
  - `sections/`: Section-specific background imagery and `content_data.json`.

### Database Functions & Triggers
- `public.update_updated_at_column()`: Automatically updates `updated_at` timestamps on row updates.
- `public.has_role(_user_id, _role)`: Security definer function checking role assignment under RLS.
- `public.is_super_admin(_user_id)`: Checks whether a given user holds the `super_admin` role.
- `public.claim_first_admin()`: Allows auto-elevating the initial user to `super_admin` if the roles table is empty.

---

## 6. AUTHENTICATION AND USER MANAGEMENT

### Dual-Layer Authentication Architecture
The application implements an unusual hybrid authentication architecture:

```
[User Login Attempt]
         │
         ├──> 1. Check Hardcoded Master Admin Credentials
         │       (Email: mahmoudfouad@yahoo.com / Password: hardcoded)
         │       └── If match: Store session in localStorage (bypasses all backend)
         │
         ├──> 2. Check Local Browser Storage Store
         │       (Key: fd_admin_users_store_v1)
         │       └── If match: Store session in localStorage
         │
         └──> 3. Fallback to Supabase Cloud Auth
                 (Calls supabase.auth.signInWithPassword)
                 └── If match: Store session in localStorage
```

### Roles and Permissions
- **Super Admin**: Has unrestricted access to all modules, can create/delete users, and assign permissions.
- **Admin**: Access restricted according to permissions configured in `user_permissions` table (or local storage fallback).
- **Module Permissions**: Granular toggles for `can_view`, `can_create`, `can_edit`, and `can_delete` across all admin routes.

---

## 7. ADMIN DASHBOARD FUNCTIONALITY

The administration portal is located under `/admin` and protected by `admin._authed.tsx`. The status of each administrative page is as follows:

| Admin Module | Route | Underlying Storage | Operational Status |
| :--- | :--- | :--- | :--- |
| **Login** | `/admin/login` | Local Store + Supabase Auth | **Verified working** |
| **Layout & Guard** | `/admin/_authed` | Session + Role + Permissions | **Verified working** |
| **Dashboard** | `/admin/_authed/dashboard` | Static Mock Data (`admin-mock-data.ts`) | **Incomplete** (Uses static fake numbers; does not query database) |
| **Products** | `/admin/_authed/products` | Supabase `products` table | **Present in code but not verified** |
| **Categories** | `/admin/_authed/categories`| Supabase `product_categories` table | **Present in code but not verified** |
| **Quote Requests** | `/admin/_authed/quote-requests`| Supabase `quote_requests` table | **Incomplete** (Table queried, but frontend does not insert into it) |
| **Contact Requests**| `/admin/_authed/contact-requests`| Local React State (`admin-mock-data.ts`) | **Incomplete / Fake** (Changes reset on page refresh) |
| **Billing & Invoices**| `/admin/_authed/invoices` | Browser `localStorage` (`fd_invoices`) | **Verified working locally** (Fully functional invoice builder & PDF generator, but local storage only) |
| **Invoice Detail** | `/admin/_authed/invoices/$id`| Browser `localStorage` (`fd_invoices`) | **Verified working locally** |
| **Markets** | `/admin/_authed/markets` | Local React State (`admin-mock-data.ts`) | **Incomplete / Fake** (Edits not persisted anywhere) |
| **Partners** | `/admin/_authed/partners` | Supabase `partners` table + Storage | **Present in code but not verified** |
| **About Video** | `/admin/_authed/about-video`| Supabase Storage (`site-media/about/`) | **Present in code but not verified** |
| **News** | `/admin/_authed/news` | Supabase `news` table + Storage | **Present in code but not verified** |
| **Website Content** | `/admin/_authed/content` | Supabase Storage (`content_data.json`) | **Present in code but not verified** |
| **Media Library** | `/admin/_authed/media` | Local React State (`URL.createObjectURL`) | **Incomplete / Fake** (8 placeholder images; uploads not saved) |
| **Branding & Logo** | `/admin/_authed/branding`| Supabase Storage (`branding/logo.*`) | **Present in code but not verified** |
| **SEO Settings** | `/admin/_authed/seo` | Supabase `site_settings` table | **Present in code but not verified** |
| **General Settings**| `/admin/_authed/settings` | Supabase `site_settings` table | **Present in code but not verified** |
| **Users & Permissions**| `/admin/_authed/users` | Local Store + Supabase RPC | **Verified working locally** |

---

## 8. EXISTING PAGES AND FEATURES

### Public Pages
1. **Homepage (`/`)**:
   - Navigation bar with smooth scroll anchors, language switcher (English/Arabic), and mobile drawer.
   - Dynamic Hero section with customizable background image, headline, and call-to-action buttons.
   - Company presentation ("About Us") featuring an integrated inline video player.
   - "Why Choose Us" feature cards with icons and trust points.
   - "Export Process" 7-stage visual pipeline from farm selection to worldwide delivery.
   - "Global Markets" interactive SVG world map showing export destinations (Europe, Middle East, Africa, Asia).
   - "Products" catalog with category tabs (Fresh Fruits, Vegetables) and individual product modal/links.
   - News preview section highlighting recent publications.
   - Continuous animated infinite-scroll partners marquee carousel.
   - Contact & inquiry section with interactive inquiry and quotation buttons.
   - Multi-column footer with social links, localized copyright, and "Back to Top" floating button.
2. **Product Page (`/products/$slug`)**:
   - Static catalog fallback featuring 12 agricultural products (Oranges, Grapes, Mangoes, Pomegranates, Strawberries, Lemons, Potatoes, Onions, Garlic, Sweet Potatoes, Green Beans, Peppers).
   - Detailed specification table: Scientific Name, Variety, Origin, Seasonality, Sizing/Grades, Packaging Types, Shelf Life, Optimal Storage Temperatures, Reefer Transportation Specifications, Minimum Order Quantity (MOQ), and International Certifications.
   - High-definition image gallery with operational farm and cold-chain photography.
3. **News Index (`/news/`)**:
   - Company blog and press release hub with category filtering and load-more pagination.
4. **News Article (`/news/$slug`)**:
   - Dedicated reading layout with featured hero image, rich text content, embedded video support, and social share links.
5. **Password Reset (`/reset-password`)**:
   - Client-side token authentication and password update form.

---

## 9. API ENDPOINTS AND INTEGRATIONS

### Internal Endpoints & Server Functions
- `claimFirstAdmin`: Server Function (`POST`) under `/admin` bootstrap.
- `listAdminUsersFn`: Server Function (`POST`) fetching user profiles and roles.
- `createAdminUser`: Server Function (`POST`) provisioning Supabase auth users and profiles.
- `deleteAdminUser`: Server Function (`POST`) deleting administrative users.
- `setAdminUserPassword`: Server Function (`POST`) updating credentials.
- `setSuperAdmin`: Server Function (`POST`) toggling `super_admin` role assignment.

### External Integrations
- **Supabase Cloud**: Authenticated REST API and Storage API at `https://xmdjqckwspmwwgyugbep.supabase.co`.
- **Google Fonts CDN**: Pre-connected to Google Fonts for `Inter`, `Cairo`, and `Playfair Display`.
- **Lovable Telemetry / Error Reporting**: `src/lib/lovable-error-reporting.ts` attempts to post errors to window object `__lovableEvents` / `__lovableReportRuntimeError`.

---

## 10. ENVIRONMENT CONFIGURATION STATUS

### Existing Environment File (`.env`)
The `.env` file exists in `MA GROUP EXPORT/.env` and currently defines:
- `SUPABASE_PROJECT_ID`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

All 6 keys are currently configured to connect to the external Supabase instance `xmdjqckwspmwwgyugbep.supabase.co`.

### Fallback Environment Example (`selfhost/env.example`)
A template file exists illustrating the target variables needed for an independent VPS:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 11. DEPENDENCIES AND TECHNICAL REQUIREMENTS

### Package Manager
The project includes both `package-lock.json` (npm) and `bun.lock` / `bunfig.toml` (Bun). Dependencies are fully installed in `node_modules`.

### Dependency Health
- **React**: Modern version `19.2.0`.
- **Vite**: Modern version `8.0.16`.
- **Tailwind**: Next-generation `v4.2.1` using `@tailwindcss/vite`.
- **Deprecation Warning**: `createServerFn().inputValidator()` in `src/lib/admin-users.functions.ts` is deprecated by `@tanstack/react-start` in favor of `.validator()`.
- **Compiler Issue**: TypeScript check (`npx tsc --noEmit`) fails with type errors in `src/lib/site-content.ts` (lines 186-189).

---

## 12. BROKEN, INCOMPLETE, OR MISSING FUNCTIONALITY

### 1. Incomplete / Fake Admin Sections
- **Contact Requests (`admin._authed.contact-requests.tsx`)**: The entire page operates on static dummy data (`admin-mock-data.ts`). There is no `contact_requests` table in the database schema, and submissions made on the public website contact form are NOT saved here.
- **Admin Dashboard Metrics (`admin._authed.dashboard.tsx`)**: Displays hardcoded numbers (e.g., 7 products, 5 contacts, 3 quotes, 6 markets) instead of querying actual database counts.
- **Markets Management (`admin._authed.markets.tsx`)**: Edits are kept only in temporary React component state; refreshing the browser resets the data.
- **Media Library (`admin._authed.media.tsx`)**: Displays 8 placeholder image cards. File uploads generate temporary browser blob URLs (`URL.createObjectURL`) that disappear on reload. No integration with the `site-media` bucket exists.

### 2. Disconnected Public Forms
- **Public Contact Form (`src/routes/index.tsx`)**: When a user submits the contact form, JavaScript merely validates the fields, resets the form, and displays a success toast. The submitted data is never transmitted to an API, stored in a database, or emailed to administrators.
- **Public Quotation Request Button (`src/routes/index.tsx`)**: Clicking "Request Quotation" displays an alert message without gathering input or creating a record in `quote_requests`.

### 3. Local-Storage-Bound Invoicing
- **Commercial Invoices (`src/lib/admin-invoices.ts`)**: The PDF invoice generator and invoice editor work, but all invoices are stored exclusively in the user's browser `localStorage` (`fd_invoices`). If the admin clears their browser cache or switches devices, all invoices are lost.

### 4. TypeScript Compiler Failure
- **`src/lib/site-content.ts`**: Contains invalid typings attempting to query `site_content` table (which is not part of the Supabase schema types), causing `npx tsc --noEmit` to fail.

---

## 13. PREVIOUS PROJECT/COMPANY REFERENCES FOUND

A search of the entire project identified old brand and business identities that must be rebranded to **MA GROUP**:

| Term / Identifier | Files Found | Details |
| :--- | :--- | :--- |
| **"PREVIOUS_PROJECT" / "PREVIOUS_PROJECT Import and Export"** | **35+ files** | Found in `README.md`, `__root.tsx`, `index.tsx`, `products.$slug.tsx`, `news.index.tsx`, `news.$slug.tsx`, `reset-password.tsx`, `admin.login.tsx`, `admin._authed.*.tsx`, `AdminSidebar.tsx`, `BrandMark.tsx`, `SplashScreen.tsx`, `site-settings.ts`, `site-content.ts`, `i18n.ts`, `admin-footer.ts`, `admin-invoices.ts`, `migrate.mjs`, and `schema.sql`. |
| **"Fresh Diamond for Export" / "Fresh Diamond"** | `README.md` (lines 3, 7, 77, 81, 345, 349, 387) | The original specifications in `README.md` describe "Fresh Diamond for Export" established in 2011. |
| **`fd_` Storage & Event Prefix** | Multiple files in `src/lib/` | `fd_admin_session_v1`, `fd_admin_users_store_v1`, `fd_user_permissions_v1`, `fd_site_content_v1`, `fd_invoices`, `fd_footer_config`, `fd_lang`, `fd_admin_lang`, `fd:partners`. |
| **`nv_` Storage Prefix** | `src/routes/__root.tsx`, `admin-branding.ts`, `hero-image.ts`, `SplashScreen.tsx` | `nv_splash_seen`, `nv_logo_cache_v2`, `nv_hero_image_cache_v1`. |
| **"Adem"** | Flagged in user brief | No active source occurrences found in current code, but must remain purged from all metadata, content, and documentation. |

---

## 14. PREVIOUS GITHUB AND SUPABASE REFERENCES FOUND

### Previous GitHub Remote
- **Remote Origin URL:** `https://github.com/[REDACTED_PREVIOUS_USER]/PREVIOUS_PROJECT.git`
- **Git Commit History:** 770+ commits referencing GitHub user `[REDACTED_PREVIOUS_USER]` and bot `gpt-engineer-app[bot]`.
- **Nitro Worker Default Name:** `[REDACTED_PREVIOUS_USER]-PREVIOUS_PROJECT` (auto-derived by Nitro during build).

### Previous Supabase Cloud References
- **Supabase Cloud Project ID:** `xmdjqckwspmwwgyugbep`
- **Live Supabase Host:** `https://xmdjqckwspmwwgyugbep.supabase.co`
- **Hardcoded Fallbacks in Code:**
  - `src/integrations/supabase/client.ts` (lines 30-31)
  - `src/integrations/supabase/client.server.ts` (lines 33-37)
  - `src/integrations/supabase/auth-middleware.ts` (lines 36-37)
- **Active Environment File:** `MA GROUP EXPORT/.env` contains active credentials pointing to `xmdjqckwspmwwgyugbep`.

### Lovable References
- Dependency `@lovable.dev/vite-tanstack-config` in `package.json`.
- Configuration files: `AGENTS.md`, `bunfig.toml`, `.lovable/project.json`, `.lovable/plan/*`.
- Source code: `src/lib/lovable-error-reporting.ts`, `src/routes/index.tsx` (asset path `/__l5e/assets-v1/...`).

---

## 15. POTENTIAL SECURITY ISSUES & CONFIGURATION RISKS

> [!CAUTION]
> **1. Hardcoded Super Admin Credentials in Source Code**  
> In `src/lib/admin-auth.ts` (lines 24-31), a master super admin user (`mahmoudfouad@yahoo.com`) is declared with its full plaintext password in code! Because this file is imported by both client routes and server functions, these plaintext administrative credentials are baked into the compiled client JavaScript bundles (`.output/public/assets/*.js`). Any user can inspect network assets and gain unrestricted super admin access.

> [!WARNING]
> **2. Hardcoded Supabase Project Credentials as Code Fallbacks**  
> `src/integrations/supabase/client.ts`, `client.server.ts`, and `auth-middleware.ts` embed default fallbacks pointing to the external `xmdjqckwspmwwgyugbep.supabase.co` instance. If `.env` is omitted or stripped, the application will silently continue attempting to connect to the previous project's infrastructure.

> [!WARNING]
> **3. Client-Side Authentication Bypass**  
> `src/lib/admin-auth.ts` allows any user whose credentials match the hardcoded master admin or the browser's `localStorage` to be treated as authenticated, bypassing real backend authorization tokens.

> [!NOTE]
> **4. Active Remote Git Pointer**  
> The local `.git` repository maintains an active remote link to `https://github.com/[REDACTED_PREVIOUS_USER]/PREVIOUS_PROJECT.git`. Any uncareful `git push` or sync command would attempt to transmit local code to that external repository.

---

## 16. CURRENT OPERATIONAL STATUS: WHAT IS WORKING VS NOT WORKING

| Feature / System | Operational Status | Finding Classification |
| :--- | :--- | :--- |
| **Vite / Nitro Production Build** | **Compiles successfully** into `.output/` | **Verified working** |
| **Public Landing Page & UI** | Fully renders with smooth animations, bilingual toggle, responsive layout | **Verified working** |
| **Product Specification Pages** | Detailed tables, product gallery, and bilingual content | **Verified working** |
| **News & Article Reader** | Grid, single post view, video embedding | **Verified working** |
| **Commercial Invoice Generator** | Full calculation engine, tax modes, and PDF export | **Verified working locally** |
| **Splash Screen & Branding** | Animated SVG logo presentation with local caching | **Verified working** |
| **TypeScript Typecheck (`tsc`)** | Fails due to invalid table type in `site-content.ts` | **Broken** |
| **Public Contact Submission** | Does not send emails or save to database | **Incomplete** |
| **Public Quote Request** | Does not submit to database | **Incomplete** |
| **Admin Dashboard Stats** | Shows static placeholder data | **Incomplete** |
| **Admin Contact Requests** | In-memory mock data only; edits lost on reload | **Incomplete** |
| **Admin Markets Management** | In-memory mock data only; edits lost on reload | **Incomplete** |
| **Admin Media Library** | In-memory mock cards; uploads not stored | **Incomplete** |
| **Admin Invoice Persistence** | Stored only in browser `localStorage`, not in database | **Incomplete** |
| **Backend Independence** | Tied to old Supabase project URL and keys | **Broken / Unsafe** |
| **Super Admin Security** | Hardcoded credentials in source code | **Critical Security Flaw** |

---

## 17. READINESS FOR INDEPENDENT DEPLOYMENT ON HOSTINGER

### Assessment: **NOT READY FOR PRODUCTION DEPLOYMENT YET**

To achieve full independence on a Hostinger VPS or container environment under the **MA GROUP** identity, the following prerequisites must be addressed:

### Required Action Items Prior to Hostinger Deployment:

1. **Purge Git Remotes & Previous Git Identity:**
   - Remove the `origin` remote pointing to `[REDACTED_PREVIOUS_USER]/PREVIOUS_PROJECT.git`.
   - Initialize a completely fresh Git history or configure a new, independent private repository.
2. **Sever All Supabase Cloud Connections:**
   - Remove hardcoded URLs and keys from `client.ts`, `client.server.ts`, and `auth-middleware.ts`.
   - Clear the existing `.env` file of old Supabase references.
   - Configure the application to read backend connections strictly from runtime environment variables.
3. **Eliminate Hardcoded Credentials:**
   - Remove the plaintext `MASTER_ADMIN` credentials and mock user stores from `src/lib/admin-auth.ts`.
   - Ensure all admin authentication relies exclusively on the independent backend.
4. **Complete Rebranding to MA GROUP:**
   - Replace all occurrences of "PREVIOUS_PROJECT", "Fresh Diamond", and related references with **MA GROUP**.
   - Update metadata, titles, OpenGraph tags, Arabic translations, footers, invoice headers, and splash screens.
   - Update `public/logo.jpeg` and `favicon.png` with official MA GROUP branding.
   - Rebrand local storage keys (`fd_*` and `nv_*`) to clean `magroup_*` namespace.
5. **Adjust Nitro Build Preset for Hostinger:**
   - Configure the Vite/Nitro build preset to target `node-server` (or Docker container) rather than Cloudflare Pages/Workers so it can run reliably under Node.js on Hostinger.
6. **Fix TypeScript Compiler Defects:**
   - Fix the typing in `src/lib/site-content.ts` so `npx tsc --noEmit` passes cleanly.
   - Update deprecated `.inputValidator()` calls in `admin-users.functions.ts` to `.validator()`.
7. **Complete Incomplete Features:**
   - Connect the public contact form and quote request form to database tables and/or email notifications.
   - Wire the Admin Dashboard, Contact Requests, Markets, Media Library, and Invoicing into database persistence.
8. **Hostinger Database & Backend Setup:**
   - Execute `selfhost/schema.sql` on the Hostinger VPS PostgreSQL instance.
   - Configure Hostinger SMTP for transactional emails and admin password resets.

---

## AUDIT SIGN-OFF

The project codebase has been thoroughly audited and preserved in its existing state without any modifications. **No changes have been made to files, UI, or configuration.**

**Next Action:** Awaiting user review and authorization before proceeding with any rebranding, cleanup, or development phases.

