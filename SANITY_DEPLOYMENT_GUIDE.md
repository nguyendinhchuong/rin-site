# Sanity CMS + Astro Deployment Guide

## 🎯 Overview

This project uses **Server Mode with Incremental Static Regeneration (ISR)** on Vercel for optimal performance with Sanity CMS.

### What This Means:
- **Static pages** (home, about, contact) are built once and cached
- **Dynamic pages** (blog posts, products) are generated on-demand and cached for 1 hour
- Content updates automatically refresh after cache expiration
- No full rebuilds needed for content changes

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. ✅ **Vercel Account** - [Sign up here](https://vercel.com)
2. ✅ **Sanity Project** - Already set up in `/sanity` folder
3. ✅ **Environment Variables** ready

---

## 🚀 Deployment Steps

### Step 1: Install Dependencies

```bash
pnpm install
```

This will install the new `@astrojs/vercel` adapter.

### Step 2: Configure Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `PUBLIC_SANITY_PROJECT_ID` | Your project ID | Found in `sanity/sanity.config.ts` |
| `PUBLIC_SANITY_DATASET` | `production` | Your Sanity dataset name |
| `SANITY_API_TOKEN` | Your read token | Create in Sanity Dashboard → API → Tokens |
| `SANITY_PREVIEW_SECRET` | Random string | Generate: `openssl rand -base64 32` |
| `PUBLIC_SITE_URL` | `https://vinhson.com.vn` | Your production URL |

### Step 3: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Vercel will auto-detect Astro
5. Add environment variables
6. Click **Deploy**

#### Option B: Via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Step 4: Configure Sanity Webhooks (Recommended)

This ensures your site updates when content changes in Sanity:

1. **Get Your Revalidate Endpoint URL:**
   ```
   https://vinhson.com.vn/api/revalidate
   ```

2. **In Sanity Dashboard:**
   - Go to **API** → **Webhooks**
   - Click **Create webhook**

3. **Create Webhooks for Each Content Type:**

   **For Blog Posts:**
   - Name: `Revalidate Blog Posts`
   - URL: `https://vinhson.com.vn/api/revalidate`
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
   - Filter: `_type == "post"`
   - Projection:
     ```json
     {
       "secret": "[YOUR_SANITY_PREVIEW_SECRET]",
       "type": "post",
       "slug": slug.current,
       "_id": _id
     }
     ```
   - HTTP Method: `POST`
   - HTTP Headers:
     ```
     Content-Type: application/json
     ```

   **For Products:**
   - Name: `Revalidate Products`
   - URL: `https://vinhson.com.vn/api/revalidate`
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
   - Filter: `_type == "product"`
   - Projection:
     ```json
     {
       "secret": "[YOUR_SANITY_PREVIEW_SECRET]",
       "type": "product",
       "slug": slug.current,
       "_id": _id
     }
     ```
   - HTTP Method: `POST`

   **For Pages:**
   - Name: `Revalidate Pages`
   - URL: `https://vinhson.com.vn/api/revalidate`
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
   - Filter: `_type == "page"`
   - Projection:
     ```json
     {
       "secret": "[YOUR_SANITY_PREVIEW_SECRET]",
       "type": "page",
       "slug": slug.current,
       "_id": _id
     }
     ```
   - HTTP Method: `POST`

4. **Test Your Webhook:**
   - Save the webhook
   - Click **Test webhook**
   - Should return: `{"revalidated": true, ...}`

---

## ⚙️ How It Works

### Server Mode with ISR Explained

```
User Request
     ↓
Is page cached? → YES → Serve from cache (instant)
     ↓ NO
Generate page → Cache for 1 hour → Serve to user
```

### Cache Behavior

- **First request:** Page is generated on-demand (may take 1-2 seconds)
- **Subsequent requests:** Served from cache (instant)
- **After 1 hour:** Next request triggers background regeneration
- **Content updates:** Webhook notifies, cache is marked stale

### Pages Configuration

| Page Type | Mode | Behavior |
|-----------|------|----------|
| Home (`/`) | Static | Built at deploy time |
| About, Contact | Static | Built at deploy time |
| Blog List | Dynamic | Cached 1 hour |
| Blog Post | Dynamic | Cached 1 hour |
| Products List | Dynamic | Cached 1 hour |
| Product Detail | Dynamic | Cached 1 hour |

---

## 🔧 Configuration Files

### `astro.config.mjs`
```javascript
export default defineConfig({
  output: 'hybrid', // Enables hybrid mode
  adapter: vercel({
    isr: {
      expiration: 3600, // 1 hour cache
    },
  }),
  // ... rest of config
});
```

### Dynamic Pages with ISR (default in server mode)
```astro
---
export const prerender = false; // Optional - false is default in server mode
// ... fetch from Sanity
---
```

### Static Pages (prerendered at build time)
```astro
---
export const prerender = true; // Marks page to be prerendered at build
---
```

---

## 📊 Performance Benefits

| Metric | Static | Server+ISR | SSR (No Cache) |
|--------|--------|-----------|----------------|
| First Load | ⚡ Fast | ⚡ Fast | 🐢 Slow |
| Content Freshness | ❌ Manual | ✅ Automatic | ✅ Real-time |
| Build Time | 🐢 Long | ⚡ Quick | ⚡ None |
| Server Cost | 💰 None | 💰 Low | 💰💰 High |
| **Recommended** | Small sites | **Most sites** | Real-time apps |

---

## 🎨 Best Practices

### 1. **Optimize Cache Duration**

Current: 1 hour (`3600` seconds)

- **News sites:** 300 seconds (5 minutes)
- **E-commerce:** 1800 seconds (30 minutes)
- **Blogs:** 3600 seconds (1 hour)
- **Marketing pages:** 86400 seconds (24 hours)

Change in `astro.config.mjs`:
```javascript
adapter: vercel({
  isr: {
    expiration: 3600, // Adjust this value
  },
}),
```

### 2. **Use Sanity CDN**

Already configured in `src/lib/sanity.ts`:
```typescript
export const sanityClient = createClient({
  useCdn: true, // ✅ Good for production
  // ...
});
```

### 3. **Optimize Images**

Using `SanityImage` component automatically optimizes:
```tsx
<SanityImage
  image={product.images[0]}
  width={800}
  height={800}
  priority={true} // For above-the-fold images
/>
```

### 4. **Monitor Build & Cache**

In Vercel Dashboard:
- **Functions** → Check serverless function logs
- **Speed Insights** → Monitor page performance
- **Analytics** → Track cache hit rates

### 5. **Content Preview (Optional)**

For content editors to preview unpublished content:
```
https://vinhson.com.vn/api/preview?secret=[SECRET]&slug=[SLUG]
```

---

## 🐛 Troubleshooting

### Issue: Content not updating

**Solutions:**
1. Check webhook is configured correctly in Sanity
2. Verify `SANITY_PREVIEW_SECRET` matches in both Vercel and Sanity
3. Check Vercel function logs for errors
4. Wait for cache expiration (1 hour)

### Issue: Build fails

**Solutions:**
1. Run `pnpm install` to ensure `@astrojs/vercel` is installed
2. Check environment variables are set in Vercel
3. Verify Sanity credentials are correct
4. Check build logs in Vercel dashboard

### Issue: Slow page loads

**Solutions:**
1. Verify Sanity CDN is enabled (`useCdn: true`)
2. Optimize images with `SanityImage` component
3. Check cache is working (should be fast after first load)
4. Consider increasing cache duration

### Issue: ISR not working

**Solutions:**
1. Ensure `output: 'hybrid'` in `astro.config.mjs`
2. Check `prerender = false` on dynamic pages
3. Verify Vercel adapter is properly installed
4. Check Vercel region matches your target audience

---

## 🔄 Development Workflow

### Local Development
```bash
pnpm dev
```
- Runs on `http://localhost:4321`
- Hot reload enabled
- Fetches from Sanity production dataset

### Preview Deployment
```bash
git push origin feature-branch
```
- Auto-deploys to Vercel preview URL
- Each PR gets unique URL
- Safe for testing before production

### Production Deployment
```bash
git push origin main
```
- Auto-deploys to production
- ISR cache is cleared
- DNS updates automatically

---

## 📈 Monitoring & Analytics

### Essential Metrics to Track:

1. **Cache Hit Rate**
   - Target: >90%
   - View in: Vercel Analytics

2. **Page Load Time**
   - Target: <1s for cached pages
   - View in: Vercel Speed Insights

3. **Function Executions**
   - Monitor for spikes
   - View in: Vercel Functions tab

4. **Build Duration**
   - Should be <2 minutes
   - View in: Vercel Deployments

---

## 🚀 Alternative Deployment Options

### Option 1: Full Static (SSG) with Webhooks

**When to use:** Infrequent content updates, very high traffic

**Changes needed:**
```javascript
// astro.config.mjs
output: 'static', // Change from 'hybrid'
adapter: vercel(), // Remove ISR config
```

**Setup Vercel Deploy Hook:**
1. Vercel Settings → Git → Deploy Hooks
2. Create hook, get URL: `https://api.vercel.com/v1/integrations/deploy/...`
3. In Sanity webhooks, use this URL instead
4. On content change → Full rebuild (1-3 minutes)

**Pros:** Simple, very fast, lowest cost
**Cons:** 1-3 min delay on updates, longer builds

---

### Option 2: Full Server-Side Rendering (SSR)

**When to use:** Real-time content, user authentication, personalization

**Changes needed:**
```javascript
// astro.config.mjs
output: 'server', // Change from 'hybrid'
adapter: vercel(), // No ISR config
```

Remove `prerender = false` from all pages.

**Pros:** Always fresh content, no cache issues
**Cons:** Slower, more expensive, higher API usage

---

## 📝 Summary

### Current Setup (Hybrid ISR) ⭐ Recommended

✅ **Pros:**
- Fast page loads (cached)
- Automatic content updates
- No manual rebuilds needed
- Cost-effective
- Scales well

⚠️ **Considerations:**
- Small delay on first page load
- Cache can be stale (max 1 hour)
- Requires Vercel adapter

### Quick Commands

```bash
# Install dependencies
pnpm install

# Local development
pnpm dev

# Build for production
pnpm build

# Preview build locally
pnpm preview

# Deploy to Vercel
vercel --prod
```

---

## 🆘 Support

- **Astro Docs:** https://docs.astro.build
- **Vercel Docs:** https://vercel.com/docs
- **Sanity Docs:** https://www.sanity.io/docs
- **ISR Guide:** https://vercel.com/docs/incremental-static-regeneration

---

**Last Updated:** October 2025
**Configuration:** Server Mode with ISR (Astro 5.x)
**Platform:** Vercel

