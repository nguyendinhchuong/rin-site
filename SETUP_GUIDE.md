# Setup Guide

This guide will help you set up the Vinh Son website from scratch.

## Step 1: Install Dependencies

```bash
# Install project dependencies
pnpm install

# Install Sanity dependencies
cd sanity
pnpm install
cd ..
```

## Step 2: Set Up Sanity Studio

### Create a Sanity Account

1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up for a free account
3. Create a new project

### Get Your Project Credentials

After creating your project, you'll receive:
- **Project ID**: Found in your project settings
- **Dataset**: Usually "production" (default)
- **API Token**: Create one in Settings → API → Tokens with "Editor" permissions

### Configure Environment Variables

You need to create **TWO** `.env` files:

#### 1. Root `.env` file (for Astro frontend)

Create a `.env` file in the **root directory**:

```env
PUBLIC_SANITY_PROJECT_ID=your_project_id_here
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
SANITY_PREVIEW_SECRET=your_random_secret_here
PUBLIC_SITE_URL=https://vinhson.com.vn
```

#### 2. Sanity `.env` file (for Sanity Studio)

Create a `.env` file in the **sanity directory** (`sanity/.env`):

```env
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

**Important Notes:**
- Replace all placeholder values with your actual Sanity credentials
- Use the **same** project ID and dataset in both files
- The `SANITY_STUDIO_` prefix is required for Sanity Studio v3 (uses Vite)
- The `PUBLIC_` prefix is required for Astro to expose variables to the browser

## Step 3: Deploy Sanity Studio

### Option A: Deploy to Sanity's Cloud

```bash
cd sanity
pnpm install -g sanity
sanity deploy
```

This will deploy your studio to `https://your-project.sanity.studio`

### Option B: Run Locally

```bash
# From the root directory
pnpm sanity

# Or from the sanity directory
cd sanity
sanity start
```

The studio will be available at `http://localhost:3333`

## Step 4: Add Content

Once your Sanity Studio is running:

1. **Site Settings** (Create for both `vi` and `en`)
   - Site name, description, logo
   - Contact information
   - Social media links
   - Default SEO settings

2. **Categories** (Create for both languages)
   - Product categories
   - Blog categories

3. **Hero Banners** (Optional, for both languages)
   - Homepage carousel images
   - CTA buttons and text

4. **Products** (Optional, for both languages)
   - Product name, description, images
   - Price, specifications, features
   - Link to categories

5. **Blog Posts** (Optional, for both languages)
   - Title, content, featured image
   - Author, publish date
   - Link to categories

6. **Pages** (Optional, for both languages)
   - Custom pages with flexible content

## Step 5: Run the Development Server

```bash
# Make sure you're in the root directory
pnpm dev
```

The site will be available at `http://localhost:4321`

## Step 6: Build for Production

```bash
pnpm build
```

This will create a production-ready build in the `dist` directory.

## Step 7: Deploy

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login and deploy:
```bash
vercel login
vercel
```

3. Add environment variables in Vercel dashboard:
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `SANITY_PREVIEW_SECRET`
   - `PUBLIC_SITE_URL`

### Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Login and deploy:
```bash
netlify login
netlify deploy --prod
```

3. Add environment variables in Netlify dashboard

## Step 8: Configure Webhooks (Optional)

For automatic content revalidation:

1. Go to Sanity project settings → API → Webhooks
2. Create a new webhook
3. URL: `https://your-domain.com/api/revalidate`
4. Dataset: `production`
5. Trigger on: Create, Update, Delete
6. HTTP method: POST
7. Add a secret header:
   - Name: `secret`
   - Value: Your `SANITY_PREVIEW_SECRET`

8. Projection (optional):
```json
{
  "secret": "YOUR_SANITY_PREVIEW_SECRET",
  "type": _type,
  "slug": slug.current
}
```

## Preview Mode

To preview draft content:

1. In Sanity Studio, create or edit content
2. Don't publish it (keep it as draft)
3. Use the preview URL:

```
https://your-domain.com/api/preview?secret=YOUR_SECRET&type=product&slug=product-slug&locale=vi
```

Parameters:
- `secret`: Your `SANITY_PREVIEW_SECRET`
- `type`: `page`, `post`, or `product`
- `slug`: The slug of the content
- `locale`: `vi` or `en`

## Troubleshooting

### "Cannot find module" errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Sanity client errors

- Check your `.env` file has the correct credentials
- Ensure `SANITY_API_TOKEN` has proper permissions
- Verify your project ID and dataset name

### Build errors

```bash
# Check TypeScript errors
pnpm astro check

# Rebuild
rm -rf dist .astro
pnpm build
```

### Styling issues

- Make sure `global.css` is imported in your layout
- Check Tailwind configuration
- Verify shadcn/ui components are properly installed

## Important Notes

1. **Content Language**: Always create content for both `vi` and `en` languages in Sanity
2. **Images**: Upload images to Sanity for automatic optimization via Sanity CDN
3. **Status Field**: Set `status` to "published" for content to appear on the site
4. **SEO**: Fill in SEO fields for better search engine visibility
5. **Performance**: Use Sanity's image CDN with proper width/height parameters

## Support

If you encounter any issues:
1. Check the [Astro Documentation](https://docs.astro.build)
2. Check the [Sanity Documentation](https://www.sanity.io/docs)
3. Review the project's README.md
4. Check the console for error messages

## Next Steps

- Customize the design in `src/styles/global.css`
- Add more pages as needed
- Configure analytics and tracking
- Set up contact form backend
- Add search functionality
- Optimize images and assets
- Configure CDN and caching
- Set up monitoring and error tracking

