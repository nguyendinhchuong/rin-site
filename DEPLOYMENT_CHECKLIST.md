# Deployment Checklist

Use this checklist to ensure everything is properly configured before deploying to production.

## 📋 Pre-Deployment

### 1. Sanity Configuration

- [ ] Sanity project created at [sanity.io](https://www.sanity.io)
- [ ] Project ID obtained
- [ ] API token created (Editor permissions)
- [ ] Dataset created (usually "production")
- [ ] Sanity Studio deployed or accessible locally

### 2. Environment Variables

- [ ] `.env` file created (copy from `.env.example`)
- [ ] `PUBLIC_SANITY_PROJECT_ID` set
- [ ] `PUBLIC_SANITY_DATASET` set
- [ ] `SANITY_API_TOKEN` set
- [ ] `SANITY_PREVIEW_SECRET` generated (use random string)
- [ ] `PUBLIC_SITE_URL` updated to production URL

### 3. Content Creation

**Site Settings (Both Languages)**
- [ ] Vietnamese site settings created (`vi`)
- [ ] English site settings created (`en`)
- [ ] Logo uploaded
- [ ] Contact information added
- [ ] Social media links configured

**Content (At Least One Item Each)**
- [ ] At least 1 hero banner (both languages)
- [ ] At least 1 product (both languages)
- [ ] At least 1 blog post (both languages)
- [ ] Categories created (both languages)

### 4. Code Review

- [ ] All environment variables are in `.env` (not committed)
- [ ] `.gitignore` includes `.env`
- [ ] No console.log statements in production code
- [ ] All TODO comments addressed
- [ ] TypeScript compiles without errors

### 5. Testing

**Local Testing**
- [ ] Development server runs (`pnpm dev`)
- [ ] Sanity Studio runs (`pnpm sanity`)
- [ ] Vietnamese site loads (`/vi`)
- [ ] English site loads (`/en`)
- [ ] Language switcher works
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] No console errors

**Build Testing**
- [ ] Production build succeeds (`pnpm build`)
- [ ] Preview works (`pnpm preview`)
- [ ] No build warnings or errors
- [ ] All routes generate correctly

**Content Testing**
- [ ] Published content appears
- [ ] Draft content doesn't appear (without preview)
- [ ] Preview mode works
- [ ] Exit preview works
- [ ] Content updates reflect (if ISR configured)

**SEO Testing**
- [ ] Meta tags present (view source)
- [ ] Open Graph tags present
- [ ] Structured data validates ([validator](https://validator.schema.org/))
- [ ] Sitemap generates (`/sitemap-index.xml`)
- [ ] Robots.txt accessible (`/robots.txt`)
- [ ] Canonical URLs correct
- [ ] Hreflang tags present

**Responsive Testing**
- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] Touch interactions work
- [ ] Navigation accessible on mobile

**Accessibility Testing**
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Alt text on images
- [ ] Screen reader friendly (test with tools)

## 🚀 Deployment

### Platform Selection

**Vercel (Recommended)**
- [ ] Vercel account created
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Connected to Git repository
- [ ] Environment variables added in Vercel dashboard
- [ ] Deploy triggered
- [ ] Deployment successful

**Netlify**
- [ ] Netlify account created
- [ ] Netlify CLI installed (`npm i -g netlify-cli`)
- [ ] Connected to Git repository
- [ ] Environment variables added in Netlify dashboard
- [ ] Build settings configured
- [ ] Deployment successful

### Post-Deployment

**Verify Deployment**
- [ ] Production URL accessible
- [ ] SSL/HTTPS working
- [ ] All pages load correctly
- [ ] Images load from Sanity CDN
- [ ] No 404 errors
- [ ] API routes working

**SEO Verification**
- [ ] Sitemap accessible at production URL
- [ ] Robots.txt accessible
- [ ] Meta tags correct (view source)
- [ ] Structured data validates
- [ ] Google Search Console configured (optional)

**Performance Check**
- [ ] Lighthouse score > 90 (all categories)
- [ ] Core Web Vitals pass
- [ ] Images optimized
- [ ] Page load time < 3s

## 🔧 Sanity Studio

### Local Studio

- [ ] Studio runs locally (`pnpm sanity`)
- [ ] Can create/edit content
- [ ] Changes sync to dataset

### Deployed Studio (Recommended)

- [ ] Studio deployed (`pnpm sanity:deploy`)
- [ ] Studio URL accessible (e.g., `your-project.sanity.studio`)
- [ ] Team members can access
- [ ] CORS origins configured in Sanity project settings

## 🔗 Integrations

### Webhooks (Optional but Recommended)

**Sanity Webhook for ISR**
- [ ] Webhook created in Sanity project settings
- [ ] Webhook URL: `https://your-domain.com/api/revalidate`
- [ ] HTTP method: POST
- [ ] Trigger on: Create, Update, Delete
- [ ] Secret added to request
- [ ] Test webhook (create/update content)
- [ ] Verify revalidation works

### Analytics (Optional)

- [ ] Google Analytics configured
- [ ] Google Tag Manager installed
- [ ] Facebook Pixel (if needed)
- [ ] Analytics tracking codes added

### Monitoring (Optional)

- [ ] Error tracking (Sentry, etc.)
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Log aggregation

## 📱 Domain & DNS

- [ ] Domain purchased
- [ ] DNS configured
- [ ] Domain pointed to deployment
- [ ] SSL certificate active
- [ ] WWW redirect configured (if needed)
- [ ] Custom domain verified on platform

## 🔐 Security

- [ ] Environment variables not committed to Git
- [ ] API tokens kept secret
- [ ] HTTPS enforced
- [ ] Security headers configured (optional)
- [ ] Content Security Policy (optional)

## 📧 Email & Forms

**Contact Form (if backend configured)**
- [ ] Form submission endpoint configured
- [ ] Email service configured (SendGrid, etc.)
- [ ] Spam protection added
- [ ] Test form submission
- [ ] Email delivery verified

## 🔍 SEO Submission

**Search Engines (Optional)**
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify ownership
- [ ] Request indexing

**Social Media (Optional)**
- [ ] Facebook sharing debugger tested
- [ ] Twitter card validator tested
- [ ] LinkedIn sharing tested

## 📊 Final Checks

### Quality Assurance

- [ ] All links work (no broken links)
- [ ] All images load
- [ ] Forms submit successfully
- [ ] Search functionality works (if implemented)
- [ ] Language switcher works
- [ ] Preview mode works
- [ ] Cross-browser testing completed

### Performance

- [ ] Page speed optimized
- [ ] Images compressed
- [ ] Lazy loading working
- [ ] Code splitting working
- [ ] Caching configured

### Content

- [ ] All placeholder content replaced
- [ ] Copyright year correct
- [ ] Privacy policy added (if needed)
- [ ] Terms of service added (if needed)
- [ ] Contact information accurate

## 📝 Documentation

- [ ] README.md updated with production info
- [ ] Team members trained on Sanity
- [ ] Deployment process documented
- [ ] Maintenance plan created
- [ ] Backup strategy documented

## 🎉 Launch

### Pre-Launch

- [ ] Final review with stakeholders
- [ ] Content approval
- [ ] Design approval
- [ ] Functionality testing complete

### Launch Day

- [ ] Deploy to production
- [ ] Verify all functionality
- [ ] Monitor for errors
- [ ] Check analytics setup
- [ ] Announce launch (social media, etc.)

### Post-Launch

- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Gather user feedback
- [ ] Address any issues
- [ ] Plan next iteration

## 🔄 Maintenance Schedule

### Daily
- [ ] Monitor error logs
- [ ] Check uptime

### Weekly
- [ ] Review analytics
- [ ] Check for broken links
- [ ] Update content as needed

### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance review
- [ ] Backup verification

### Quarterly
- [ ] Content audit
- [ ] SEO review
- [ ] User experience review
- [ ] Feature planning

## 📞 Emergency Contacts

**Technical Issues:**
- Hosting support: _______________
- Domain registrar: _______________
- Developer: _______________

**Content Issues:**
- Content manager: _______________
- Sanity support: support@sanity.io

## ✅ Sign-Off

- [ ] All items in checklist completed
- [ ] Project manager approval
- [ ] Client approval (if applicable)
- [ ] Ready for production launch

---

**Deployment Date:** _______________

**Deployed By:** _______________

**Production URL:** _______________

**Sanity Studio URL:** _______________

**Notes:**
_______________________________________________
_______________________________________________
_______________________________________________

---

**🎉 Congratulations on your deployment!**

