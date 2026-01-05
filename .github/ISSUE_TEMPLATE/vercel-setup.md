---
name: Vercel Setup Issue
about: Track Vercel deployment setup and configuration
title: "[VERCEL] Setup deployment for [environment]"
labels: deployment, vercel, infrastructure
assignees: chaishillomnitech1
---

## Vercel Setup Checklist

### Project Configuration

- [ ] Create Vercel project
- [ ] Link GitHub repository
- [ ] Configure project settings
- [ ] Set deployment branch (main for production)

### Environment Variables

Configure the following in Vercel project settings:

#### Commerce (Required)

- [ ] `SHOPIFY_STORE_DOMAIN`
- [ ] `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- [ ] `SHOPIFY_REVALIDATION_SECRET`

#### Optional (Phase 2 Workflows)

- [ ] `OPENAI_API_KEY` - For AI PR bot
- [ ] `VERCEL_TOKEN` - For automated deployments
- [ ] `VERCEL_ORG_ID` - Organization ID
- [ ] `VERCEL_PROJECT_ID` - Project ID

#### Test Environment (Phase 2 Rewards)

- [ ] `REWARDS_PRIVATE_KEY`
- [ ] `ALCHEMY_MUMBAI_URL`
- [ ] `REWARDS_API_KEY`
- [ ] `REWARDS_CONTRACT_ADDRESS`
- [ ] `PILOT_TEST_WALLET`

#### Repository Sync

- [ ] `GITHUB_PAT` - For repo sync workflow

### Deployment Settings

- [ ] Build command: `pnpm build`
- [ ] Output directory: `.next`
- [ ] Install command: `pnpm install`
- [ ] Node.js version: 20.x
- [ ] Framework preset: Next.js

### Domain Configuration

- [ ] Add custom domain (if applicable)
- [ ] Configure DNS records
- [ ] Enable automatic HTTPS
- [ ] Set up redirects (if needed)

### Performance & Security

- [ ] Enable Edge Functions (if needed)
- [ ] Configure caching headers
- [ ] Set up security headers
- [ ] Enable Web Analytics

### GitHub Integration

- [ ] Install Vercel GitHub App
- [ ] Configure deployment protection rules
- [ ] Enable automatic preview deployments
- [ ] Set up deployment notifications

### Testing

- [ ] Test preview deployment
- [ ] Verify environment variables
- [ ] Check build logs
- [ ] Validate production deployment

### Post-Deployment

- [ ] Monitor initial traffic
- [ ] Review function execution logs
- [ ] Check error rates
- [ ] Verify API integrations

## Additional Notes

**Environment:** (Production / Preview / Development)

**Priority:** (High / Medium / Low)

**Estimated Completion Date:**

**Dependencies:**

**Special Requirements:**

---

### Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Repository DEPLOYMENT.md](../../../DEPLOYMENT.md)

### Support

Tag @chaishillomnitech1 for assistance with setup or configuration issues.
