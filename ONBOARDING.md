# Onboarding Guide

**Welcome to the ScrollVerse Next.js Commerce Project! 🕋♾️✨**

**ALL IS LOVE. ALL IS LAW. ALL IS FLUID. KUN FAYAKŪN!**

## Overview

This guide will help you get started with the Next.js Commerce project, whether you're a new contributor, developer, or team member.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Development Environment](#development-environment)
4. [Key Concepts](#key-concepts)
5. [Common Tasks](#common-tasks)
6. [Resources](#resources)
7. [Getting Help](#getting-help)

---

## Quick Start

### For Contributors (5 minutes)

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/nextjs-commerce.git
cd nextjs-commerce

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Start development server
pnpm dev

# 5. Open in browser
# Visit http://localhost:3000
```

### For Reviewers

1. Review the [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
2. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
3. Review [CODEOWNERS](./CODEOWNERS) for ownership structure

---

## Project Structure

```
nextjs-commerce/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── ...                # Other routes
├── components/            # React components
│   ├── cart/             # Shopping cart components
│   ├── layout/           # Layout components
│   ├── product/          # Product display components
│   └── ...               # Other components
├── lib/                   # Utility functions and integrations
│   ├── shopify/          # Shopify API integration
│   └── ...               # Other utilities
├── .github/               # GitHub configurations
│   ├── workflows/        # CI/CD workflows
│   └── ISSUE_TEMPLATE/   # Issue templates
├── CONTRIBUTING.md        # Contribution guidelines
├── SECURITY.md           # Security policy
└── README.md             # Project documentation
```

### Key Directories Explained

- **`app/`**: Next.js 15 App Router - file-based routing, layouts, and pages
- **`components/`**: Reusable React components organized by feature
- **`lib/`**: Business logic, API integrations, and utility functions
- **`.github/`**: GitHub Actions workflows and templates

---

## Development Environment

### Prerequisites

| Tool    | Version | Purpose             |
| ------- | ------- | ------------------- |
| Node.js | 20.x+   | Runtime environment |
| pnpm    | 10.x+   | Package manager     |
| Git     | Latest  | Version control     |
| VS Code | Latest  | Recommended editor  |

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Environment Variables

Required environment variables (see `.env.example`):

```env
# Shopify Configuration (Required)
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
SHOPIFY_REVALIDATION_SECRET=your-secret-here

# Optional: Site Configuration
COMPANY_NAME="ScrollVerse Commerce"
SITE_NAME="ScrollCommerce"
TWITTER_CREATOR="@chaishillomni"
TWITTER_SITE="@scrollverse"
```

**⚠️ Security Note**: Never commit `.env` files! They contain sensitive credentials.

---

## Key Concepts

### 1. Next.js App Router

This project uses Next.js 15's App Router with:

- **Server Components**: Default rendering mode (faster, SEO-friendly)
- **Client Components**: Use `'use client'` directive for interactivity
- **Server Actions**: Handle form submissions and mutations
- **Streaming**: Progressive rendering with Suspense

### 2. Shopify Integration

The project integrates with Shopify via:

- **Storefront API**: GraphQL API for products, collections, cart
- **Webhooks**: Real-time updates from Shopify
- **Revalidation**: On-demand cache invalidation

### 3. Styling with Tailwind CSS

- Utility-first CSS framework
- Responsive design with mobile-first approach
- Dark mode support ready
- Custom configuration in `tailwind.config.ts`

### 4. TypeScript

- Full type safety across the codebase
- Interfaces for data models
- Type inference where possible
- Strict mode enabled

---

## Common Tasks

### Running Development Server

```bash
# Standard development mode
pnpm dev

# With turbopack (faster)
pnpm dev --turbopack

# Production build locally
pnpm build && pnpm start
```

### Code Quality

```bash
# Format code with Prettier
pnpm prettier

# Check formatting
pnpm prettier:check

# Run tests
pnpm test
```

### Working with Git

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Stage changes
git add .

# Commit with ScrollSigil convention
git commit -m "feat(component): add new feature

Detailed description of changes.

#ScrollProof"

# Push to your fork
git push origin feature/your-feature-name
```

### Creating a Pull Request

1. Push your branch to GitHub
2. Navigate to the repository
3. Click "New Pull Request"
4. Fill out the PR template completely
5. Tag @chaishillomnitech1 for review
6. Address any review feedback

### Adding a New Feature

1. **Plan**: Review requirements and design
2. **Branch**: Create feature branch
3. **Implement**: Write code following standards
4. **Test**: Add tests and verify functionality
5. **Document**: Update docs if needed
6. **Submit**: Create PR with detailed description

### Fixing a Bug

1. **Reproduce**: Verify the bug exists
2. **Diagnose**: Identify root cause
3. **Fix**: Implement minimal fix
4. **Test**: Verify fix works
5. **Prevent**: Add test to prevent regression
6. **Submit**: Create PR referencing issue

---

## Resources

### Documentation

- [README.md](./README.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [SECURITY.md](./SECURITY.md) - Security policy

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Shopify Storefront API](https://shopify.dev/api/storefront)

### Learning Paths

#### New to Next.js?

1. Complete the [Next.js Tutorial](https://nextjs.org/learn)
2. Read about [App Router](https://nextjs.org/docs/app)
3. Understand [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
4. Practice with [Examples](https://github.com/vercel/next.js/tree/canary/examples)

#### New to TypeScript?

1. Try the [TypeScript Playground](https://www.typescriptlang.org/play)
2. Read [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
3. Explore type definitions in this project

#### New to Tailwind CSS?

1. Review [Tailwind Basics](https://tailwindcss.com/docs/utility-first)
2. Practice with [Tailwind Play](https://play.tailwindcss.com/)
3. Learn [Responsive Design](https://tailwindcss.com/docs/responsive-design)

---

## Getting Help

### When You're Stuck

1. **Search Documentation**: Check project docs and external resources
2. **Search Issues**: Look for similar issues on GitHub
3. **Ask Questions**: Create an issue with the `question` label
4. **Tag Maintainers**: @chaishillomnitech1 for guidance

### Common Issues

#### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use different port
pnpm dev -- -p 3001
```

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Rebuild
pnpm build
```

#### Environment Variables Not Loading

- Ensure `.env` file is in root directory
- Restart dev server after changing `.env`
- Check variable names match exactly
- For Vercel deployment, set in Vercel dashboard

---

## ScrollVerse Mission

### Our Philosophy

- **Open Source**: Transparent, collaborative development
- **Divine Intention**: Code with purpose and frequency
- **Community First**: Support and uplift contributors
- **Quality Standards**: Excellence in every commit

### DAO Contribution Model

ScrollVerse operates with DAO-inspired principles:

1. **Decentralized Contribution**: Anyone can contribute
2. **Transparent Review**: Public code review process
3. **Merit-Based Recognition**: Quality contributions recognized
4. **Community Governance**: Direction guided by community
5. **ScrollProof Certification**: Accepted contributions archived forever

### Phase 2 Features (Coming Soon)

- DAO token rewards for contributors
- On-chain contribution tracking
- Community voting on features
- NFT certification for major contributions
- ScrollTV integration for broadcasts

---

## Next Steps

### Your First Week

- [ ] Set up local development environment
- [ ] Read all documentation files
- [ ] Explore the codebase
- [ ] Run the application locally
- [ ] Review open issues
- [ ] Join discussions
- [ ] Make your first contribution!

### Your First Contribution

Start with:

- Documentation improvements
- Bug fixes (labeled `good first issue`)
- Code formatting or comments
- Test coverage improvements
- UI/UX enhancements

### Long-Term Growth

- Become familiar with architecture
- Review and comment on PRs
- Help other contributors
- Propose new features
- Become a code owner

---

## Welcome to the ScrollVerse! 🌟

You're now part of a community building open-source commerce infrastructure with divine intention. Every line of code, every PR, every contribution matters.

**Join the mission. Fork the scroll. Confirm the proof.**

#ScrollProof #ScrollDAO #GitSigil #ChaisTheGreat

**ALL IS LOVE. ALL IS LAW. ALL IS FLUID. KUN FAYAKŪN! 🕋♾️✨**

---

## Questions?

If you have any questions not covered in this guide:

1. Check the [FAQ in README](./README.md)
2. Review [Contributing Guidelines](./CONTRIBUTING.md)
3. Search [GitHub Issues](https://github.com/chaishillomnitech1/nextjs-commerce/issues)
4. Create a new issue with `question` label
5. Tag @chaishillomnitech1

**Welcome aboard! Let's build something amazing together.** 🚀
