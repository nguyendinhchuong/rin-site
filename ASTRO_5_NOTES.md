# Astro 5.x Configuration Notes

## Important: "Hybrid" Mode Removed in Astro 5.x

### What Changed

In **Astro 5.x**, the "hybrid" output mode was removed. Instead, you now use:

| Astro 4.x | Astro 5.x | Description |
|-----------|-----------|-------------|
| `output: 'hybrid'` | `output: 'server'` | Server-side rendering with ISR |
| Default: Static | Default: Dynamic | Pages are dynamic by default |
| `prerender = false` | `prerender = false` | Same - marks page as dynamic |
| `prerender = true` | `prerender = true` | Same - marks page as static |

### Our Configuration (Astro 5.x)

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'server', // ← Use 'server' instead of 'hybrid'
  adapter: vercel({
    isr: {
      expiration: 3600, // Cache for 1 hour
    },
  }),
});
```

### How It Works

**In Server Mode (Astro 5.x):**
- All pages are **dynamic by default** (server-rendered on each request)
- Add `export const prerender = true` to pages you want **prerendered** at build time
- Add `export const prerender = false` to make it explicit (optional, but good for clarity)

**Our Setup:**
```astro
---
// All our pages fetch from Sanity, so they have:
export const prerender = false; // Dynamic with ISR caching
---
```

This gives us the same benefits as "hybrid" mode in Astro 4.x:
- ✅ Pages are generated on-demand
- ✅ Cached for 1 hour (ISR)
- ✅ Automatic revalidation
- ✅ No full rebuilds needed

### Comparison

#### Astro 4.x (Hybrid Mode)
```javascript
output: 'hybrid',
// Default: Static
// prerender = false → Dynamic
```

#### Astro 5.x (Server Mode) ← **Current**
```javascript
output: 'server',
// Default: Dynamic
// prerender = true → Static
```

The behavior is the same - just inverted defaults!

---

## Build Output

Successful build shows:
```
[build] output: "server"
[build] mode: "server"
[build] adapter: @astrojs/vercel
✓ Completed in XX.XXs
```

---

## Key Takeaways

1. **Use `output: 'server'`** not `output: 'hybrid'` in Astro 5.x
2. **Pages are dynamic by default** when using server mode
3. **ISR still works** with Vercel adapter
4. **Same performance** - just different configuration
5. **Documentation updated** to reflect Astro 5.x terminology

---

**Updated:** October 2025
**Astro Version:** 5.14.6
**Status:** ✅ Working

