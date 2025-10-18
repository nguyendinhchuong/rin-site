# Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ or 20+
- pnpm (or npm)
- A Sanity account (free at [sanity.io](https://www.sanity.io))

## Quick Setup

### 1. Install Dependencies (1 min)

```bash
pnpm install
```

### 2. Configure Environment (2 min)

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your Sanity credentials:

```env
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
SANITY_PREVIEW_SECRET=any_random_string
PUBLIC_SITE_URL=http://localhost:4321
```

**Get your Sanity credentials:**
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project or use existing
3. Copy Project ID from project settings
4. Create API token in Settings → API → Tokens (Editor permissions)

### 3. Run Development Server (1 min)

```bash
# Start Astro
pnpm dev
```

Visit: `http://localhost:4321`

### 4. Run Sanity Studio (1 min)

In a new terminal:

```bash
cd sanity
pnpm install
sanity start
```

Visit: `http://localhost:3333`

## First Steps in Sanity Studio

### 1. Create Site Settings (Both Languages)

1. Click "Site Settings" in Sanity Studio
2. Create settings for Vietnamese (`vi`)
   - Site name: "Vinh Son"
   - Description, contact info, etc.
3. Create settings for English (`en`)
   - Translate content

### 2. Create a Hero Banner (Optional)

1. Click "Hero Banner"
2. Create new document
3. Set language to `vi`
4. Add title, subtitle, image
5. Set order to `0`
6. Mark as Active
7. Publish
8. Repeat for English (`en`)

### 3. Create a Product (Optional)

1. Click "Product"
2. Create new document
3. Set language to `vi`
4. Fill in product details
5. Set status to "published"
6. Publish
7. Repeat for English (`en`)

### 4. View Your Site

Go to `http://localhost:4321/vi` to see your Vietnamese site!

## Next Steps

- Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
- Read [FEATURES.md](./FEATURES.md) for full feature list
- Read [README.md](./README.md) for project overview

## Common Issues

**"Cannot connect to Sanity"**
- Check your `.env` file has correct credentials
- Ensure `SANITY_API_TOKEN` has Editor permissions

**"No content showing"**
- Make sure content is published (not draft)
- Check language matches (`vi` or `en`)
- Verify status is set to "published"

**"Module not found"**
```bash
rm -rf node_modules
pnpm install
```

## Deploy to Production

### Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard!

## Support

Check the documentation files for detailed information:
- `README.md` - Overview
- `SETUP_GUIDE.md` - Complete setup
- `FEATURES.md` - All features

Happy coding! 🚀

