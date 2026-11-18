# ScrollVerse: Next.js Commerce Portal

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchaishillomnitech1%2Fnextjs-commerce&project-name=scrollverse-commerce&repo-name=nextjs-commerce)

**ALL IS LOVE. ALL IS LAW. ALL IS FLUID. KUN FAYAKŪN! 🕋♾️✨**

---

## 🌟 Overview

**The source is open. The scrolls are live.**

ScrollCommerce is a high-performance, server-rendered Next.js commerce application, coded with frequency and protected in light. This is the **official ScrollCommerce engine**, powering the ScrollVerse economy across realms, devices, and dimensions.

Built on Next.js 15 with React Server Components, Server Actions, and modern web technologies, this platform represents the fusion of divine intention and cutting-edge ecommerce infrastructure.

> **#ScrollProof #GitSigil #ChaisTheGreat**

---

## ✨ Features

- ⚡ **Next.js 15 App Router**: Modern React Server Components architecture
- 🛒 **Shopify Integration**: Full headless commerce capabilities
- 🎨 **Tailwind CSS**: Beautiful, responsive design system
- 🔒 **TypeScript**: Full type safety across the codebase
- 🚀 **Edge-Optimized**: Deployed on Vercel Edge Network
- 📱 **Responsive**: Mobile-first, works everywhere
- ♿ **Accessible**: WCAG 2.1 AA compliant
- 🧪 **Well-Tested**: Comprehensive testing infrastructure
- 🔄 **CI/CD**: Automated workflows with GitHub Actions
- 🌐 **DAO-Ready**: Integration hooks for decentralized governance (Phase 2)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- pnpm (recommended) or npm
- Shopify store with Storefront API access

### Installation

```bash
# Clone the repository
git clone https://github.com/chaishillomnitech1/nextjs-commerce.git
cd nextjs-commerce

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Shopify credentials

# Start development server
pnpm dev

# Open http://localhost:3000
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Required Shopify Configuration
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_REVALIDATION_SECRET=your-secret-key

# Optional: Site Configuration
COMPANY_NAME="ScrollVerse Commerce"
SITE_NAME="ScrollCommerce"
```

> ⚠️ **Never commit your `.env` file!** Keep your credentials secure.

---

## 📚 Documentation

| Document                                 | Description                          |
| ---------------------------------------- | ------------------------------------ |
| [CONTRIBUTING.md](./CONTRIBUTING.md)     | Contribution guidelines and workflow |
| [SECURITY.md](./SECURITY.md)             | Security policy and best practices   |
| [ONBOARDING.md](./ONBOARDING.md)         | New contributor onboarding guide     |
| [ARCHITECTURE.md](./ARCHITECTURE.md)     | System architecture and design       |
| [DEPLOYMENT.md](./DEPLOYMENT.md)         | Deployment instructions              |
| [DAO_AUTOMATION.md](./DAO_AUTOMATION.md) | DAO automation hooks (Phase 2)       |

---

## 🏗️ Project Structure

```
nextjs-commerce/
├── app/                    # Next.js App Router (pages, layouts, routes)
├── components/            # React components
│   ├── cart/             # Shopping cart components
│   ├── layout/           # Layout components (header, footer, etc.)
│   └── product/          # Product display components
├── lib/                   # Utilities and integrations
│   ├── shopify/          # Shopify API integration
│   └── constants.ts      # Configuration constants
├── .github/               # GitHub workflows and templates
│   ├── workflows/        # CI/CD automation
│   └── ISSUE_TEMPLATE/   # Issue templates
├── public/                # Static assets
└── fonts/                 # Custom fonts
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server with turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm prettier         # Format code
pnpm prettier:check   # Check formatting
pnpm test             # Run tests
```

### Tech Stack

| Technology                 | Purpose                           |
| -------------------------- | --------------------------------- |
| **Next.js 15**             | React framework with App Router   |
| **React 19**               | UI library with Server Components |
| **TypeScript**             | Type-safe development             |
| **Tailwind CSS**           | Utility-first styling             |
| **Shopify Storefront API** | Headless commerce backend         |
| **Vercel**                 | Hosting and deployment            |

---

## 🤝 Contributing

We welcome contributions from the ScrollVerse community!

### Quick Contribution Guide

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes following our [coding standards](./CONTRIBUTING.md)
5. **Test** your changes (`pnpm test && pnpm build`)
6. **Commit** with ScrollSigil convention (`feat: add amazing feature #ScrollProof`)
7. **Push** to your fork (`git push origin feature/amazing-feature`)
8. **Open** a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### Code of Conduct

This project operates with respect, inclusivity, and divine intention. Be kind, be constructive, and help build something amazing together.

---

## 🔒 Security

Security is paramount in the ScrollVerse.

- 🚨 **Report vulnerabilities** privately to @chaishillomnitech1
- 📖 Read our [Security Policy](./SECURITY.md)
- ✅ Follow our [security best practices](./SECURITY.md#security-best-practices)
- 🔐 Never commit secrets or credentials

---

## 🌍 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchaishillomnitech1%2Fnextjs-commerce)

1. Click the deploy button above
2. Connect your GitHub account
3. Configure environment variables
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Branch Protection

Recommended branch protection rules for `main`:

- ✅ Require pull request reviews (1+)
- ✅ Require status checks to pass
- ✅ Require conversation resolution
- ✅ Require linear history
- ✅ Include administrators

---

## 🏆 ScrollVerse DAO (Phase 2)

This project is DAO-ready with automation hooks for community governance.

### Coming Soon

- 🪙 **Token Rewards**: Earn DAO tokens for contributions
- 🎨 **NFT Certificates**: On-chain proof of contributions
- 🗳️ **Governance**: Vote on proposals and features
- 📊 **Analytics**: Community dashboard and metrics
- ⚡ **Automation**: Smart contract integration

See [DAO_AUTOMATION.md](./DAO_AUTOMATION.md) for details.

---

## 📊 Project Stats

- **Language**: TypeScript
- **Framework**: Next.js 15
- **License**: MIT with ScrollProof clause
- **Maintainer**: [@chaishillomnitech1](https://github.com/chaishillomnitech1)
- **Status**: Active Development

---

## 🔗 Links

- **GitHub**: [github.com/chaishillomnitech1/nextjs-commerce](https://github.com/chaishillomnitech1/nextjs-commerce)
- **Documentation**: See docs folder
- **Issues**: [Report bugs or request features](https://github.com/chaishillomnitech1/nextjs-commerce/issues)
- **Discussions**: [Join the conversation](https://github.com/chaishillomnitech1/nextjs-commerce/discussions)

---

## 🙏 Acknowledgments

Built on the foundation of [Vercel's Next.js Commerce](https://github.com/vercel/commerce) and enhanced with ScrollVerse frequency.

### Commerce Providers

This template is compatible with multiple commerce providers:

- **Shopify** (this implementation)
- [BigCommerce](https://github.com/bigcommerce/nextjs-commerce)
- [Medusa](https://github.com/medusajs/vercel-commerce)
- [Saleor](https://github.com/saleor/nextjs-commerce)
- [And more...](https://github.com/vercel/commerce#providers)

---

## 📜 License

MIT License with ScrollProof Clause

Copyright (c) 2025 Chais Hill

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

**ScrollProof Clause**: All public forks must retain a link to the original repository. Every accepted PR becomes a scroll in the public archive.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 🌟 Join the Frequency

This is commerce, coded with divine intention.  
Open-source sovereignty lives here.

**Join the mission. Fork the scroll. Confirm the proof.**

**ALL IS LOVE. ALL IS LAW. ALL IS FLUID. KUN FAYAKŪN! 🕋♾️✨**

---

### ScrollBroadcast Signature

**#ScrollProof #ScrollDAO #GitSigil #NextJS #OpenSourceKing**

_The source is open. The scrolls are live._  
_ScrollGit Repo — Anchored in Frequency | Code | Sovereignty_

---

**Made with 🕋 by the ScrollVerse Community**

---

## 🔗 Every door, one click

Every site and artifact we built, attached to every repo. Only live destinations are linked.

**Sites and artifacts**

- [Early Coins — the record before the drop](https://muse.ai/s/early-coins-rxl6xtx0xryfxyjj/495VrnZsIG3LZKsyazM5bfhDPznJ9T_0Te3L7fRyJvw)
- [ScrollVerse Atlas](https://muse.ai/s/super-scrollverse-2-xtd6xtxncxwxuxj5z/0N8UONNtjBhZ0rrNB49dBusGU7KmQf1RYP59B4tVdS8)
- [Super ScrollVerse — the merged super website](https://muse.ai/s/super-scrollverse-3-xkxk6xu1xt22nxixq/CWc_SMPiSlXDL4raCdX9LkNEIz5wFfefW3H_Z9QvcJo)
- [ScrollVerse Master File](https://muse.ai/s/scrollverse-master-file-transferable-xbt6xtxng3z33t/iIVzIAufSld8cTi3enBho59DpoyjrVJrzboCt3HYcIc)
- [XLVIIIblocks Vault](https://muse.ai/s/xlviiiblocks-vault-axh6xtxnhxe94yxm/5WdPM9alAuJ8cQijBhdCSVvcYJgnqB7IdjPWeG1vUeI)
- [Omnitech1 AI Infrastructure — Enhanced edition](https://muse.ai/s/omnitech1-ai-infrastructure-xmu6xu1k53xjxpxa/dszkPVExIya3ctorjtqwB9TW7oKGVHLgXhamr-ZjKKw)
- [Omnitech1 AI Infrastructure — the original Gamma document](https://gamma.app/docs/Omnitech1-AI-Infrastructure-for-Content-Protection-and-Monetizati-m8bf7mn9b0ezvzu)
- [VEILSCRIPT — the Shielded Transmission Language](https://muse.ai/s/shielded-transmission-language-xgxk6xu1xt4xkdy4/vfge7AxhCat8SnYJdii3cHpMWABRvPlCpYZFNce34us)
- [Direct Exchange — creator to customer](https://muse.ai/s/direct-exchange-xpxk6xu1xsxyxexarj/pWDVKUFAHHY1g2WOeUsjltRZV8nsTajzLDyvFqSh7z4)
- [Tory Lanez Crypto Music Playbook](https://muse.ai/s/tory-lanez-crypto-music-playbook-bxj6xtxnexsxvs3f/2iBGhDyKE1eLBHwpZityoqDcnkJxT3b4aWV6aGxD-nQ)
- [Validate All Systems](https://muse.ai/s/validate-all-systems-gg6xu3xvxoxnxsxlxi/ltedX8qqpVLceZIhbWxvskluLtl6RNX50MPMkgU7YUc)
- [Join the AI Legion](https://muse.ai/s/join-the-ai-legion-xqxe6xu45xc54s2/9NROIskMKMBp_hKk2Bswfk7dUd9KEcJ43E_4DZC1r9U)
- [Video and Music DSP](https://muse.ai/s/video-and-music-dsp-xsxq6xu47xw0lxzxs/1b5CWLy0CJHrPmyXoYlSytrS1LaHTs1AWojQyyInByA)
- [Verse NFT Marketplace](https://muse.ai/s/verse-nft-marketplace-gz6xu4axtxddqm/MUlPMUMoQW20mGJCE07za-8Ylmh-ssY2Ghj7ywSFdyI)

**Shop and Web3**

- [Shopify storefront](https://juv8tg-1n.myshopify.com)
- [Pump.fun — @DuneSimpleSock](https://pump.fun/profile/FpxkpRuL6RT5a4P48Wy4FVsRSLdAFsMABMjYKsWvZr64)
- [Coinbase](https://www.coinbase.com)
- [Solana](https://solana.com)
- [OpenTimestamps](https://opentimestamps.org)

**Music**

- [Spotify — Chais the great](https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr)
- [YouTube — @chaishill-u1z](https://www.youtube.com/@chaishill-u1z)

**Socials**

- [Facebook — Chais Hill](https://www.facebook.com/100077435951053)
- [Instagram — @chaisthegreat_mrwalk](https://www.instagram.com/chaisthegreat_mrwalk)
- [Instagram — @chaishill](https://www.instagram.com/chaishill)
- [Instagram — @chasedreamz_management](https://www.instagram.com/chasedreamz_management)

**GitHub**

- [Profile — chaishillomnitech1](https://github.com/chaishillomnitech1)
- [Early Coins repo](https://github.com/chaishillomnitech1/early-coins)
- [Ask Chais a question — the Question Box](https://github.com/chaishillomnitech1/early-coins/discussions)
