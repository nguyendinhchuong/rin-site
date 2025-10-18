# Documentation Index

Welcome to the Vinh Son Website documentation. This index will help you find the right documentation for your needs.

## 📚 Quick Links

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [QUICK_START.md](./QUICK_START.md) | Get running in 5 minutes | 5 min |
| [README.md](./README.md) | Project overview | 10 min |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Detailed setup instructions | 20 min |
| [FEATURES.md](./FEATURES.md) | Complete feature list | 15 min |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Project summary | 10 min |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Pre-deployment checklist | 15 min |

## 🎯 Start Here

### I'm a Developer Getting Started
👉 Start with: **[QUICK_START.md](./QUICK_START.md)**
- Get the project running locally in 5 minutes
- Quick environment setup
- First steps with Sanity

### I'm Setting Up for Production
👉 Start with: **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**
- Complete setup instructions
- Sanity configuration
- Deployment options
- Webhook setup

### I Want to Know What's Included
👉 Start with: **[FEATURES.md](./FEATURES.md)**
- Complete feature list
- Technical specifications
- Content schemas
- SEO implementation

### I'm Ready to Deploy
👉 Start with: **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)**
- Pre-deployment checks
- Environment verification
- Content review
- Quality assurance

### I Need a Project Overview
👉 Start with: **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**
- Architecture overview
- Technology stack
- Key features
- Project statistics

## 📖 Documentation Details

### 1. QUICK_START.md
**Best For:** Developers who want to get started immediately

**Contents:**
- Prerequisites
- 5-minute setup
- First steps in Sanity
- Common issues
- Quick deployment

**When to Use:**
- First time running the project
- Need quick setup
- Want to see it working fast

---

### 2. README.md
**Best For:** Understanding the project at a high level

**Contents:**
- Project overview
- Tech stack
- Project structure
- Basic commands
- Features summary
- License info

**When to Use:**
- Initial project review
- Understanding architecture
- Learning about features
- Getting context

---

### 3. SETUP_GUIDE.md
**Best For:** Complete, production-ready setup

**Contents:**
- Detailed installation steps
- Sanity account creation
- Environment configuration
- Content setup
- Deployment instructions
- Webhook configuration
- Troubleshooting

**When to Use:**
- Production setup
- Team onboarding
- Complete configuration
- Problem solving

---

### 4. FEATURES.md
**Best For:** Understanding all capabilities

**Contents:**
- Core features
- Content management
- SEO implementation
- i18n support
- Preview mode
- Technical details
- Future enhancements

**When to Use:**
- Feature discovery
- Technical specifications
- Client presentations
- Planning customizations

---

### 5. PROJECT_SUMMARY.md
**Best For:** High-level project overview

**Contents:**
- Technology stack
- Project structure
- Content schemas
- Routes and pages
- SEO implementation
- Performance metrics
- Next steps

**When to Use:**
- Project handoff
- Team briefings
- Client presentations
- Documentation reference

---

### 6. DEPLOYMENT_CHECKLIST.md
**Best For:** Pre-deployment verification

**Contents:**
- Pre-deployment tasks
- Environment checks
- Content verification
- Testing checklist
- SEO verification
- Post-deployment steps
- Maintenance schedule

**When to Use:**
- Before going live
- Quality assurance
- Launch preparation
- Post-launch verification

---

## 🛠️ Technical Documentation

### Code Structure

```
src/
├── components/        # React & Astro components
│   ├── ui/           # shadcn/ui components
│   ├── SEO.astro     # SEO meta tags
│   ├── Header.astro  # Site header
│   ├── Footer.astro  # Site footer
│   └── ...
├── layouts/          # Page layouts
├── lib/              # Utilities
│   ├── sanity.ts     # Sanity client
│   ├── queries.ts    # GROQ queries
│   ├── seo.ts        # SEO helpers
│   └── utils.ts
├── pages/            # Routes
│   ├── api/          # API endpoints
│   ├── vi/           # Vietnamese
│   └── en/           # English
└── styles/           # Global styles
```

### Content Schemas

```
sanity/schemas/
├── page.ts           # Custom pages
├── post.ts           # Blog posts
├── product.ts        # Products
├── heroBanner.ts     # Hero banners
├── category.ts       # Categories
└── siteSettings.ts   # Site config
```

## 🎓 Learning Path

### For New Developers

1. **Day 1:** Read [QUICK_START.md](./QUICK_START.md) → Get it running
2. **Day 2:** Read [README.md](./README.md) → Understand the project
3. **Day 3:** Read [FEATURES.md](./FEATURES.md) → Learn all features
4. **Week 2:** Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) → Production setup

### For Project Managers

1. Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) → Overview
2. Read [FEATURES.md](./FEATURES.md) → Capabilities
3. Review [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) → Launch plan

### For Clients

1. Read [FEATURES.md](./FEATURES.md) → What's included
2. Read [QUICK_START.md](./QUICK_START.md) → How to use Sanity
3. Review [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) → Technical overview

## 📞 Getting Help

### Documentation Issues
- Check the specific document
- Review troubleshooting sections
- Search for error messages

### Technical Issues
- See SETUP_GUIDE.md troubleshooting section
- Check Astro documentation
- Check Sanity documentation

### Feature Questions
- See FEATURES.md for complete list
- Review PROJECT_SUMMARY.md for architecture
- Check code comments in source files

## 🔄 Documentation Updates

This documentation is maintained alongside the code. When updating:

1. Update relevant documentation files
2. Update this index if new docs added
3. Update version numbers if applicable
4. Keep examples current

## 📊 Project Stats

- **Total Files:** 34 TypeScript/Astro files
- **Sanity Schemas:** 7 content types
- **Pages:** 19 routes (9 per language + API)
- **Components:** 10+ reusable components
- **Languages:** 2 (Vietnamese, English)
- **Documentation:** 6 comprehensive guides

## ✅ Documentation Checklist

Use this to ensure you've read the right documentation:

**Before Starting Development:**
- [ ] Read QUICK_START.md
- [ ] Read README.md
- [ ] Skim FEATURES.md

**Before Production Deployment:**
- [ ] Read SETUP_GUIDE.md completely
- [ ] Review DEPLOYMENT_CHECKLIST.md
- [ ] Read PROJECT_SUMMARY.md

**For Team Onboarding:**
- [ ] Share README.md
- [ ] Share QUICK_START.md
- [ ] Share FEATURES.md
- [ ] Provide access to Sanity Studio

**For Client Handoff:**
- [ ] Share PROJECT_SUMMARY.md
- [ ] Share FEATURES.md
- [ ] Provide Sanity Studio training
- [ ] Share DEPLOYMENT_CHECKLIST.md

## 🎯 What to Read When

| Situation | Document |
|-----------|----------|
| Just cloned the repo | QUICK_START.md |
| Need to understand features | FEATURES.md |
| Setting up production | SETUP_GUIDE.md |
| About to deploy | DEPLOYMENT_CHECKLIST.md |
| Presenting to client | PROJECT_SUMMARY.md |
| General overview | README.md |
| All of the above | Read in order: README → QUICK_START → FEATURES → SETUP_GUIDE → DEPLOYMENT |

## 💡 Tips

1. **Start small** - Don't read everything at once
2. **Follow links** - Documents reference each other
3. **Keep docs open** - Useful during development
4. **Update as needed** - Keep documentation current
5. **Share freely** - Help your team

## 🌟 Document Quality

All documentation includes:
- Clear structure
- Table of contents
- Code examples
- Step-by-step instructions
- Troubleshooting tips
- Real-world examples

---

**Last Updated:** October 8, 2025

**Maintained By:** Development Team

**Questions?** Check the relevant document or contact the team.

---

*Happy coding! 🚀*

