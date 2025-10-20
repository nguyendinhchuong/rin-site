# Local Testing Guide

## ⚠️ Important: `pnpm preview` Doesn't Work with Vercel Adapter

When using `output: 'server'` with the Vercel adapter, the standard `astro preview` command doesn't work because it requires Vercel's serverless infrastructure.

**Error you'll see:**
```
The @astrojs/vercel adapter does not support the preview command.
```

---

## ✅ Solution: Use These Alternatives

### Option 1: Development Mode (Recommended for Local Testing)

**Best for:** Daily development and content testing

```bash
pnpm dev
```

This runs the site in development mode:
- ✅ Hot reload
- ✅ All features work
- ✅ Fetches from Sanity
- ✅ Fast iteration
- 📍 Runs on: `http://localhost:4321`

**Use this for:**
- Testing content changes
- Development work
- Quick previews
- Debugging

---

### Option 2: Vercel CLI (Recommended for Production-like Testing)

**Best for:** Testing the actual production build locally

#### Install Vercel CLI:
```bash
npm install -g vercel
# or
pnpm add -g vercel
```

#### Run local preview:
```bash
vercel dev
```

This simulates the Vercel production environment:
- ✅ Tests production build
- ✅ Uses Vercel's runtime
- ✅ Includes ISR caching
- ✅ Matches production behavior
- 📍 Runs on: `http://localhost:3000`

**Use this for:**
- Final testing before deployment
- Verifying ISR behavior
- Testing serverless functions
- Production-like environment

---

### Option 3: Deploy to Preview (Best for Staging)

**Best for:** Team reviews and client previews

#### Create a preview branch:
```bash
git checkout -b preview/my-feature
git push origin preview/my-feature
```

Vercel automatically creates a preview deployment:
- ✅ Full production environment
- ✅ Unique URL for testing
- ✅ Real Vercel infrastructure
- ✅ Shareable with team
- 📍 URL: `https://your-project-preview.vercel.app`

**Use this for:**
- Client previews
- Stakeholder reviews
- QA testing
- Integration testing

---

### Option 4: Temporary Static Mode (Not Recommended)

**Only use if you absolutely need `astro preview` to work**

#### Change to static temporarily:
```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static', // Temporarily change from 'server'
  // adapter: vercel({ ... }), // Comment out
});
```

#### Build and preview:
```bash
pnpm build
pnpm preview
```

#### Remember to change back:
```javascript
export default defineConfig({
  output: 'server', // Change back before deploying
  adapter: vercel({ isr: { expiration: 3600 } }),
});
```

**⚠️ Warning:** This doesn't test ISR behavior and requires changing config.

---

## 🎯 Recommended Workflow

### During Development:
```bash
pnpm dev
```
Fast iteration with hot reload.

### Before Pushing to Production:
```bash
# Option A: Use Vercel CLI
vercel dev

# Option B: Deploy to preview branch
git checkout -b preview/test
git push origin preview/test
# Test on Vercel's preview URL
```

### Final Production Deploy:
```bash
git checkout main
git merge preview/test
git push origin main
```

---

## 📊 Comparison

| Method | Speed | Accuracy | Setup | Best For |
|--------|-------|----------|-------|----------|
| `pnpm dev` | ⚡⚡⚡ | 80% | None | Daily development |
| `vercel dev` | ⚡⚡ | 95% | Install CLI | Pre-deployment testing |
| Preview Deploy | ⚡ | 100% | Git push | Staging/reviews |
| Static Mode | ⚡⚡ | 50% | Config change | Emergency only |

---

## 🔧 Setting Up Vercel CLI (Recommended)

### Install:
```bash
# Using npm
npm install -g vercel

# Using pnpm
pnpm add -g vercel

# Using yarn
yarn global add vercel
```

### Login:
```bash
vercel login
```

### Link Project (first time):
```bash
cd /Users/jhdev/Pets/freelance/rin-site
vercel link
```

### Run Development Server:
```bash
vercel dev
```

### Test with Environment Variables:
Create `.env` file:
```env
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
SANITY_PREVIEW_SECRET=your_secret
PUBLIC_SITE_URL=http://localhost:3000
```

Then run:
```bash
vercel dev
```

---

## 🐛 Troubleshooting

### "vercel: command not found"
```bash
# Install Vercel CLI
npm install -g vercel

# Verify installation
vercel --version
```

### "pnpm dev" works but "vercel dev" doesn't
```bash
# Make sure you're linked to project
vercel link

# Check environment variables
vercel env pull .env.local
```

### ISR not working in "vercel dev"
ISR works differently locally:
- Local: Cache is in-memory (resets on restart)
- Production: Cache is persistent on Vercel's CDN

For true ISR testing, deploy to a preview branch.

---

## 💡 Quick Reference

```bash
# Daily development (hot reload)
pnpm dev

# Production-like testing (after pnpm build)
vercel dev

# Deploy to preview
git push origin preview/branch-name

# Deploy to production
git push origin main
```

---

## ✅ Updated Scripts (Optional)

You can add these to `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "echo 'Use vercel dev instead' && vercel dev",
    "vercel:dev": "vercel dev",
    "vercel:deploy": "vercel --prod"
  }
}
```

Then use:
```bash
pnpm vercel:dev     # Local preview with Vercel
pnpm vercel:deploy  # Deploy to production
```

---

## 🎓 Why This Happens

The Vercel adapter generates code that:
- Uses Vercel's serverless functions
- Requires Vercel's runtime environment
- Implements ISR with Vercel's CDN
- Can't run with standard Node.js server

This is why `astro preview` (which uses a simple Node.js server) can't run the build.

**Solutions:**
1. Use `pnpm dev` for development
2. Use `vercel dev` for production-like testing
3. Deploy to Vercel for real testing

---

**Recommended for you:** Use `pnpm dev` for daily work, and deploy preview branches when you need real testing.

**Date:** October 20, 2025
**Status:** ✅ Solution Provided

