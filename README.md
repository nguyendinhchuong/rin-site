# Vinh Son Website

A modern, multilingual website built with Astro, Sanity CMS, and shadcn/ui.

## Features

- 🚀 **Astro Framework** - Fast, modern static site generation with hybrid rendering
- 🎨 **shadcn/ui** - Beautiful, accessible UI components
- 📝 **Sanity CMS** - Powerful headless CMS for content management
- 🌐 **i18n Support** - Vietnamese and English language support with proper routing
- 🔍 **SEO Optimized** - Structured data, sitemap, robots.txt, and proper meta tags
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 👁️ **Preview Mode** - Draft content preview for editors
- ⚡ **ISR Ready** - Webhook integration for content revalidation

## Tech Stack

- **Framework**: Astro 5.x
- **UI Components**: shadcn/ui with Tailwind CSS v4
- **CMS**: Sanity 4.x
- **Styling**: Tailwind CSS
- **TypeScript**: Strict mode enabled
- **i18n**: astro-i18next

## Project Structure

```
/
├── public/                 # Static assets
├── sanity/                 # Sanity studio configuration
│   ├── schemas/           # Content schemas
│   │   ├── page.ts
│   │   ├── post.ts
│   │   ├── product.ts
│   │   ├── heroBanner.ts
│   │   ├── category.ts
│   │   └── siteSettings.ts
│   └── sanity.config.ts
├── src/
│   ├── components/        # React & Astro components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── SEO.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── ProductCard.tsx
│   │   └── BlogCard.tsx
│   ├── layouts/          # Page layouts
│   │   └── Layout.astro
│   ├── lib/              # Utility functions
│   │   ├── sanity.ts     # Sanity client
│   │   ├── queries.ts    # GROQ queries
│   │   ├── seo.ts        # SEO helpers
│   │   └── utils.ts      # General utilities
│   ├── pages/            # Route pages
│   │   ├── api/          # API endpoints
│   │   ├── vi/           # Vietnamese pages
│   │   ├── en/           # English pages
│   │   ├── index.astro   # Root redirect
│   │   └── robots.txt.ts
│   └── styles/
│       └── global.css    # Global styles
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Setup

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Environment Variables

Create a `.env` file in the root directory:

```env
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
SANITY_PREVIEW_SECRET=your_preview_secret
PUBLIC_SITE_URL=https://vinhson.com.vn
```

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Sanity Studio

To set up and run Sanity Studio:

```bash
# Navigate to sanity directory
cd sanity

# Install Sanity CLI globally (if not already installed)
npm install -g sanity

# Initialize Sanity project (if needed)
sanity init

# Start Sanity Studio
sanity start
```

## Content Management

### Schemas

The CMS includes the following content types:

- **Pages**: General pages with custom content
- **Blog Posts**: Articles with categories and rich content
- **Products**: Product listings with images, specs, and pricing
- **Hero Banners**: Homepage carousel banners
- **Categories**: Product and blog categories
- **Site Settings**: Global site configuration

### Preview Mode

Editors can preview draft content using a secret URL:

```
/api/preview?secret=YOUR_SECRET&type=product&slug=product-slug&locale=vi
```

### ISR & Webhooks

Set up a webhook in Sanity to trigger revalidation:

**Webhook URL**: `https://your-domain.com/api/revalidate`

**Payload**:
```json
{
  "secret": "YOUR_SECRET",
  "type": "product",
  "slug": "product-slug"
}
```

## i18n Configuration

The site supports Vietnamese (vi) and English (en):

- Default language: Vietnamese (`/vi`)
- Routes are automatically translated based on `astro-i18next.config.mjs`
- Each page includes proper `hreflang` tags
- Language switcher in the header

## SEO Features

### Structured Data (JSON-LD)

- Organization schema
- WebSite schema with Sitelinks Search Box
- Product schema for product pages
- Article schema for blog posts
- Breadcrumb schema for all inner pages

### Meta Tags

- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs
- Alternate language links (hreflang)
- Proper title and description tags

### Sitemap

Automatically generated sitemap with i18n support at `/sitemap-index.xml`

### Robots.txt

Dynamic robots.txt file with sitemap reference

## Performance

- **Hybrid Rendering**: SSR for dynamic pages, SSG for static content
- **Image Optimization**: Sanity CDN with automatic image optimization
- **Code Splitting**: Automatic component-level code splitting
- **Prefetching**: Link prefetching for faster navigation

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Environment Variables

Don't forget to set all environment variables in your deployment platform.

## Development

### Adding New Pages

1. Create page in `src/pages/vi/` for Vietnamese
2. Create corresponding page in `src/pages/en/` for English
3. Update navigation in `src/components/Navigation.tsx`

### Adding New UI Components

```bash
# Add shadcn/ui component
npx shadcn@latest add [component-name]
```

### Customizing Theme

Edit `src/styles/global.css` to customize Tailwind theme and CSS variables.

## License

Copyright © 2025 Vinh Son. All rights reserved.

## Support

For support, email your-email@example.com or visit our contact page.
