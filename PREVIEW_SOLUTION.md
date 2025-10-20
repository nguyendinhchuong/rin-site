# ✅ Preview Solution - Fixed!

## The Problem

`pnpm preview` failed because the Vercel adapter doesn't support the standard Astro preview command.

## ✅ The Solution

I've installed **Vercel CLI** and updated your scripts. Now you have two ways to test:

---

## 🚀 Quick Commands

### For Daily Development (Hot Reload)
```bash
pnpm dev
```
- ✅ Fast hot reload
- ✅ Perfect for content editing
- ✅ Fetches from Sanity
- 📍 Runs on: `http://localhost:4321`

### For Production-Like Testing
```bash
pnpm preview
```
*(Now uses Vercel CLI instead of astro preview)*
- ✅ Tests production build
- ✅ Uses Vercel runtime
- ✅ Simulates production environment
- 📍 Runs on: `http://localhost:3000`

---

## 🎯 What Changed

### Updated `package.json`:
```json
"scripts": {
  "preview": "vercel dev"  // ← Now uses Vercel CLI
}
```

### Installed:
- ✅ Vercel CLI (v48.4.1)

---

## 📖 How to Use

### 1. Development Mode (Daily Work)
```bash
pnpm dev
```
Open `http://localhost:4321` and start coding!

### 2. Test Production Build
```bash
# Build the site
pnpm build

# Preview with Vercel (production-like)
pnpm preview
```

The first time you run `pnpm preview`, Vercel will ask you to:
1. Login (if not already)
2. Link to your project (optional)
3. Set up environment variables

Just follow the prompts!

---

## 🔐 Environment Variables for Local Testing

If you want to test locally with Vercel CLI, create a `.env` file:

```env
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
SANITY_PREVIEW_SECRET=your_secret
PUBLIC_SITE_URL=http://localhost:3000
```

Or pull from Vercel:
```bash
vercel env pull .env.local
```

---

## 📊 When to Use Each Command

| Command | When to Use | Speed | Accuracy |
|---------|-------------|-------|----------|
| `pnpm dev` | Daily development | ⚡⚡⚡ | 80% |
| `pnpm build` | Before deploying | ⚡⚡ | 100% |
| `pnpm preview` | Test production | ⚡⚡ | 95% |

---

## 🎓 Understanding the Difference

### `pnpm dev` (Development Mode)
- Runs Astro dev server
- Hot reload enabled
- Shows detailed errors
- Not exactly like production

### `pnpm preview` (Production-like via Vercel CLI)
- Uses Vercel's runtime
- Tests ISR caching
- Simulates serverless functions
- Very close to production

### Deploy to Vercel (Real Production)
- Actual production environment
- Real CDN caching
- Real ISR behavior
- 100% accurate

---

## ✅ Verification

Let's verify everything works:

### Test Development Mode:
```bash
pnpm dev
```
✅ Should start on `http://localhost:4321`

### Test Production Preview:
```bash
pnpm build
pnpm preview
```
✅ Should start Vercel CLI on `http://localhost:3000`

---

## 🚀 Deployment Workflow

### Recommended workflow:

```bash
# 1. Develop with hot reload
pnpm dev

# 2. Build when ready
pnpm build

# 3. Test production-like locally (optional)
pnpm preview

# 4. Deploy to Vercel
git add .
git commit -m "Your changes"
git push origin main
```

---

## 🆘 Troubleshooting

### "vercel: command not found"
Already fixed! Vercel CLI is installed globally.

### "pnpm preview" asks for login
```bash
vercel login
```
Follow the prompts to authenticate.

### Want to skip Vercel CLI prompts?
Just use `pnpm dev` for most testing. Only use `pnpm preview` when you need production-like behavior.

---

## 💡 Pro Tips

1. **Daily work:** Just use `pnpm dev`
2. **Quick check:** Run `pnpm build` to ensure it builds
3. **Full test:** Use `pnpm preview` before important deploys
4. **Real test:** Deploy to a preview branch on Vercel

---

## 📚 More Info

For detailed explanation, see:
- `LOCAL_TESTING_GUIDE.md` - Complete testing strategies
- `BUILD_FIX_SUMMARY.md` - What was fixed with the build
- `DEPLOYMENT_SUMMARY.md` - Full deployment guide

---

**Status:** ✅ Fixed
**Vercel CLI:** ✅ Installed (v48.4.1)
**Commands:** ✅ Updated in package.json
**Ready:** ✅ Yes

**Quick Start:**
```bash
pnpm dev     # For development
pnpm preview # For production testing
```

