# Architecture Overview

Visual guide to understanding the Vinh Son Website architecture.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         End Users                            │
│                    (Vietnamese / English)                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                      Astro Website                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes                                              │   │
│  │  ├─ /vi/*    (Vietnamese)                           │   │
│  │  └─ /en/*    (English)                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│  ┌────────────────────────┼──────────────────────────────┐  │
│  │  Hybrid Rendering      │                             │  │
│  │  ├─ SSR (Dynamic)      │                             │  │
│  │  └─ SSG (Static)       │                             │  │
│  └────────────────────────┼──────────────────────────────┘  │
└─────────────────────────┬─┴──────────────────────────────────┘
                          │
                          ↓
          ┌───────────────────────────────┐
          │     Sanity CMS (Headless)     │
          │                               │
          │  ├─ Content API (GROQ)       │
          │  ├─ Image CDN                │
          │  ├─ Real-time Updates        │
          │  └─ Webhooks                 │
          └───────────────────────────────┘
```

## 📊 Data Flow

```
┌──────────────┐
│   Content    │
│   Editor     │
└──────┬───────┘
       │ Creates/Updates Content
       ↓
┌──────────────────────┐
│   Sanity Studio      │
│   (CMS Interface)    │
└──────┬───────────────┘
       │ Saves to
       ↓
┌──────────────────────┐        Webhook
│   Sanity Dataset     │──────────────────┐
│   (Content Lake)     │                  │
└──────┬───────────────┘                  │
       │ GROQ Query                       │
       ↓                                  ↓
┌──────────────────────┐        ┌─────────────────┐
│   Astro Server       │        │  /api/revalidate│
│   (Build/Runtime)    │←───────┤  (ISR Endpoint) │
└──────┬───────────────┘        └─────────────────┘
       │ Renders
       ↓
┌──────────────────────┐
│   Static/SSR Pages   │
│   (HTML + JS)        │
└──────┬───────────────┘
       │ Serves to
       ↓
┌──────────────────────┐
│     End User         │
└──────────────────────┘
```

## 🎯 Request Flow

### Standard Page Request

```
User Request
    ↓
┌─────────────────┐
│  CDN / Hosting  │
│   (Vercel)      │
└────────┬────────┘
         ↓
    Route Match?
    ├─ Static → Serve from cache
    └─ Dynamic ↓
         ┌──────────────┐
         │ Astro Server │
         └──────┬───────┘
                ↓
         Fetch from Sanity
                ↓
         ┌──────────────┐
         │ Sanity API   │
         └──────┬───────┘
                ↓
         Transform Data
                ↓
         Render HTML
                ↓
         Return to User
```

### Preview Mode Flow

```
Editor → Click Preview
    ↓
/api/preview?secret=XXX&slug=...
    ↓
Set Preview Cookie
    ↓
Redirect to Content
    ↓
┌──────────────────┐
│ Fetch Draft      │
│ Content from     │
│ Sanity           │
└────────┬─────────┘
         ↓
Render with Draft
         ↓
Show to Editor
```

## 🗂️ File Structure Flow

```
User visits /vi/products/product-slug
    ↓
Astro Router
    ↓
src/pages/vi/products/[slug].astro
    ↓
Imports
├─ Layout.astro (Main Layout)
├─ SEO.astro (Meta Tags)
└─ Components (UI Elements)
    ↓
Fetch Data
└─ lib/sanity.ts (Client)
   └─ lib/queries.ts (GROQ)
       ↓
Sanity API
    ↓
Transform & Render
    ↓
Return HTML
```

## 🌐 i18n Architecture

```
Domain: vinhson.com.vn
    │
    ├─ / ────────────→ Redirect to /vi
    │
    ├─ /vi/* ─────────→ Vietnamese Content
    │   ├─ /vi/products
    │   ├─ /vi/blog
    │   └─ /vi/about
    │
    └─ /en/* ─────────→ English Content
        ├─ /en/products
        ├─ /en/blog
        └─ /en/about

Each page includes:
├─ hreflang tags (vi-VN, en-US)
├─ Canonical URL
└─ Language switcher
```

## 🎨 Component Hierarchy

```
Layout.astro (Root)
    │
    ├─ SEO.astro
    │   ├─ Meta tags
    │   ├─ Structured data
    │   └─ Hreflang tags
    │
    ├─ Header.astro
    │   ├─ Logo
    │   ├─ Navigation.tsx (React)
    │   └─ Language switcher
    │
    ├─ Main Content (slot)
    │   ├─ Page-specific content
    │   └─ Reusable components
    │       ├─ HeroBanner.tsx
    │       ├─ ProductCard.tsx
    │       ├─ BlogCard.tsx
    │       └─ shadcn/ui components
    │
    └─ Footer.astro
        ├─ Site info
        ├─ Contact details
        └─ Social links
```

## 🔄 Content Update Flow

```
Editor Updates Content in Sanity
    ↓
Publishes Changes
    ↓
Webhook Triggered
    ↓
POST /api/revalidate
    ↓
┌────────────────────────┐
│ Verify Secret          │
│ Log Revalidation       │
│ (In production: clear  │
│  cache, trigger rebuild)│
└────────────────────────┘
    ↓
Next Request
    ↓
Fetch Fresh Content
    ↓
Render Updated Page
    ↓
Serve to User
```

## 🔐 Security Layers

```
┌─────────────────────────────┐
│  Environment Variables      │
│  (Server-side only)         │
└─────────────┬───────────────┘
              ↓
┌─────────────────────────────┐
│  API Token Authentication   │
│  (Sanity API)               │
└─────────────┬───────────────┘
              ↓
┌─────────────────────────────┐
│  Preview Secret             │
│  (Cookie-based)             │
└─────────────┬───────────────┘
              ↓
┌─────────────────────────────┐
│  HTTPS/SSL                  │
│  (Transport Security)       │
└─────────────────────────────┘
```

## 📦 Build Process

```
Developer: pnpm build
    ↓
┌────────────────────────┐
│  Astro Build Process   │
└─────────┬──────────────┘
          ↓
    Compile TypeScript
          ↓
    Process Pages
    ├─ Generate static HTML
    ├─ Optimize images
    ├─ Bundle JavaScript
    └─ Generate CSS
          ↓
    Create Sitemap
          ↓
    Generate robots.txt
          ↓
┌────────────────────────┐
│  dist/ Directory       │
│  (Ready to deploy)     │
└────────────────────────┘
```

## 🚀 Deployment Architecture

```
Git Repository (GitHub/GitLab)
    ↓
    Push to main branch
    ↓
┌────────────────────────────┐
│  CI/CD (Vercel/Netlify)    │
│  ├─ Install dependencies   │
│  ├─ Run build              │
│  ├─ Run tests (optional)   │
│  └─ Deploy                 │
└─────────┬──────────────────┘
          ↓
┌────────────────────────────┐
│  Edge Network (CDN)        │
│  ├─ Cache static assets    │
│  ├─ Distribute globally    │
│  └─ SSL termination        │
└─────────┬──────────────────┘
          ↓
     End Users
```

## 🔍 SEO Architecture

```
Page Request
    ↓
┌────────────────────────────┐
│  Server Response           │
│  └─ HTML with:             │
│     ├─ Title               │
│     ├─ Meta description    │
│     ├─ Open Graph tags     │
│     ├─ Twitter cards       │
│     ├─ Canonical URL       │
│     ├─ Hreflang tags       │
│     └─ JSON-LD Schema      │
│        ├─ Organization     │
│        ├─ WebSite          │
│        ├─ BreadcrumbList   │
│        └─ Product/Article  │
└────────────────────────────┘
    ↓
Search Engine Crawler
    ↓
┌────────────────────────────┐
│  Sitemap.xml               │
│  ├─ All pages listed       │
│  ├─ i18n variants          │
│  └─ Last modified dates    │
└────────────────────────────┘
    ↓
Better Search Rankings
```

## 📱 Responsive Breakpoints

```
Mobile (<768px)
├─ Single column
├─ Collapsed navigation
└─ Touch-optimized

Tablet (768px - 1024px)
├─ Two columns
├─ Expanded navigation
└─ Mixed interactions

Desktop (>1024px)
├─ Multi-column grids
├─ Full navigation
└─ Mouse-optimized
```

## 🎭 Rendering Strategy

```
┌─────────────────────────────────┐
│  Astro Pages (Hybrid Mode)      │
└────┬────────────────────────────┘
     │
     ├─ Static Pages (SSG)
     │  ├─ About
     │  └─ Contact
     │
     └─ Dynamic Pages (SSR)
        ├─ Homepage (fresh content)
        ├─ Product pages
        ├─ Blog posts
        └─ Product/Blog listings

React Components (Islands)
├─ HeroBanner (interactive)
├─ Navigation (interactive)
├─ ProductCard (interactive)
└─ BlogCard (interactive)
```

## 🔄 State Management

```
No Global State (Astro approach)

Per-Page:
├─ Data fetched at build/request time
├─ Props passed to components
└─ React state for interactive components
    ├─ HeroBanner (carousel state)
    └─ Navigation (menu state)

CMS State:
└─ Single source of truth: Sanity
```

## 🌟 Key Principles

1. **Content-First**: All content from Sanity CMS
2. **Performance**: Hybrid rendering for optimal speed
3. **SEO**: Built-in optimization at every level
4. **i18n**: Language as route prefix
5. **Accessibility**: ARIA compliant components
6. **Type Safety**: TypeScript throughout
7. **Modern**: Latest Astro, React, Tailwind

## 📊 Technology Stack Layers

```
┌─────────────────────────────────┐
│  Presentation Layer             │
│  ├─ Astro (Framework)           │
│  ├─ React (Interactivity)       │
│  └─ Tailwind CSS (Styling)      │
└─────────────┬───────────────────┘
              ↓
┌─────────────────────────────────┐
│  Component Layer                │
│  ├─ shadcn/ui (UI Library)      │
│  ├─ Radix UI (Primitives)       │
│  └─ Custom Components           │
└─────────────┬───────────────────┘
              ↓
┌─────────────────────────────────┐
│  Data Layer                     │
│  ├─ Sanity Client               │
│  ├─ GROQ Queries                │
│  └─ Image URL Builder           │
└─────────────┬───────────────────┘
              ↓
┌─────────────────────────────────┐
│  Content Layer                  │
│  ├─ Sanity CMS                  │
│  ├─ Content Schemas             │
│  └─ Asset CDN                   │
└─────────────────────────────────┘
```

---

**Last Updated:** October 8, 2025

**Architecture Version:** 1.0.0

This architecture is designed for:
- ✅ Performance
- ✅ Scalability
- ✅ Maintainability
- ✅ SEO
- ✅ Developer Experience

