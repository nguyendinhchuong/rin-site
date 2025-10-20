# Quick Deployment Reference 🚀

## TL;DR - Deploy in 5 Minutes

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set Environment Variables in Vercel

```
PUBLIC_SANITY_PROJECT_ID = [Your Sanity Project ID]
PUBLIC_SANITY_DATASET = production
SANITY_API_TOKEN = [Create in Sanity → API → Tokens]
SANITY_PREVIEW_SECRET = [Generate: openssl rand -base64 32]
PUBLIC_SITE_URL = https://vinhson.com.vn
```

### 3. Deploy
```bash
# Push to GitHub/GitLab
git push origin main

# Or use Vercel CLI
vercel --prod
```

### 4. Configure Sanity Webhook (Optional but Recommended)

**URL:** `https://vinhson.com.vn/api/revalidate`

**Payload for Posts:**
```json
{
  "secret": "[YOUR_SANITY_PREVIEW_SECRET]",
  "type": "post",
  "slug": slug.current
}
```

**Payload for Products:**
```json
{
  "secret": "[YOUR_SANITY_PREVIEW_SECRET]",
  "type": "product",
  "slug": slug.current
}
```

---

## Configuration Summary

| Setting | Value | Location |
|---------|-------|----------|
| Output Mode | `server` | `astro.config.mjs` |
| Adapter | Vercel ISR | `astro.config.mjs` |
| Cache Duration | 1 hour (3600s) | `astro.config.mjs` |
| Dynamic Pages | Blog, Products | `prerender = false` |
| Static Pages | Home, About, Contact | Default |

---

## Key Files Changed

### ✅ `astro.config.mjs`
- Changed `output: 'static'` → `output: 'server'`
- Added Vercel adapter with ISR configuration
- Cache expiration: 3600 seconds (1 hour)

### ✅ `package.json`
- Added `@astrojs/vercel` dependency

### ✅ `src/pages/api/revalidate.ts`
- Updated to handle webhook payloads
- Validates secret token
- Logs revalidation paths

### ✅ All dynamic pages already have:
- `export const prerender = false;`

---

## Environment Variables Template

Create `.env` file for local development:

```env
PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
SANITY_PREVIEW_SECRET=your_random_secret_string
PUBLIC_SITE_URL=http://localhost:4321
```

**For production (Vercel):**
- Use same variables
- Change `PUBLIC_SITE_URL` to `https://vinhson.com.vn`

---

## How It Works

```
┌─────────────────┐
│  User visits    │
│  /blog/my-post  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Is cached?      │ YES →│ Serve from      │
│ (< 1 hour old?) │     │ CDN (instant)   │
└────────┬────────┘     └─────────────────┘
         │ NO
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Fetch from      │  →  │ Cache for       │
│ Sanity CMS      │     │ 1 hour          │
└─────────────────┘     └─────────────────┘
```

---

## When Content Updates in Sanity

```
┌─────────────────┐
│ Editor updates  │
│ content in      │
│ Sanity CMS      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Webhook fires   │
│ to /api/        │
│ revalidate      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Cache marked    │
│ as stale        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Next visitor    │
│ triggers        │
│ regeneration    │
└─────────────────┘
```

---

## Testing Checklist

### After Deployment

- [ ] Visit homepage - should load instantly
- [ ] Visit a blog post - first load may be slow, second load fast
- [ ] Update content in Sanity
- [ ] Wait 5 minutes
- [ ] Reload page - should show new content
- [ ] Check Vercel function logs for webhook

### Verify ISR is Working

1. **Visit a page twice:**
   - First visit: May see slight delay (generating)
   - Second visit: Should be instant (cached)

2. **Check Response Headers:**
   ```bash
   curl -I https://vinhson.com.vn/en/blog/some-post
   ```
   Look for: `x-vercel-cache: HIT` (cached) or `MISS` (generated)

3. **Update content in Sanity:**
   - Wait for webhook
   - Check Vercel logs
   - Reload page after cache expires

---

## Troubleshooting Quick Fixes

### Content not updating?
```bash
# Check webhook logs in Sanity Dashboard → API → Webhooks
# Check function logs in Vercel Dashboard → Functions

# Manual cache clear: Redeploy
vercel --prod --force
```

### Build failing?
```bash
# Ensure adapter is installed
pnpm add @astrojs/vercel

# Rebuild
pnpm build
```

### Slow page loads?
```bash
# Check Sanity CDN is enabled
# src/lib/sanity.ts should have: useCdn: true

# Reduce cache time in astro.config.mjs
expiration: 1800 // 30 minutes instead of 1 hour
```

---

## Performance Benchmarks

| Page Type | First Load | Cached Load | Cache Duration |
|-----------|-----------|-------------|----------------|
| Homepage | 200-500ms | <100ms | Prerendered |
| Blog List | 500-1000ms | <100ms | 1 hour |
| Blog Post | 500-1500ms | <100ms | 1 hour |
| Product | 500-1500ms | <100ms | 1 hour |

---

## Cost Estimate (Vercel)

### Hobby Plan (Free)
- ✅ 100 GB bandwidth
- ✅ 100 deployments/day
- ✅ Unlimited function executions
- ✅ Perfect for most sites

### Pro Plan ($20/month)
- Higher limits
- Analytics included
- Custom domains
- Priority support

**Expected usage for typical site:**
- ~5,000 page views/month: **FREE**
- ~50,000 page views/month: **FREE**
- ~500,000 page views/month: **$20**

---

## Commands Reference

```bash
# Development
pnpm dev                 # Start dev server
pnpm build              # Build for production
pnpm preview            # Preview build locally

# Sanity
pnpm sanity             # Start Sanity Studio locally
pnpm sanity:deploy      # Deploy Sanity Studio

# Deployment
git push origin main    # Auto-deploy to Vercel
vercel --prod           # Manual deploy via CLI
vercel logs             # View deployment logs
```

---

## Support & Documentation

- 📖 **Full Guide:** See `SANITY_DEPLOYMENT_GUIDE.md`
- 🔧 **Astro Docs:** https://docs.astro.build
- ⚡ **Vercel Docs:** https://vercel.com/docs
- 🎨 **Sanity Docs:** https://www.sanity.io/docs

---

## What's Next?

1. ✅ Deploy to Vercel
2. ✅ Set up environment variables
3. ✅ Configure Sanity webhooks
4. 🎯 Monitor performance in Vercel dashboard
5. 🎯 Optimize cache duration based on your needs
6. 🎯 Set up custom domain (if not done)

---

**Current Configuration:** ✅ Server Mode with ISR (Astro 5.x)
**Platform:** ✅ Vercel
**CMS:** ✅ Sanity
**Status:** 🚀 Ready to Deploy

