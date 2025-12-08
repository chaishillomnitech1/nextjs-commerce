# Deployment Guide

This document outlines the deployment process for Next.js Commerce using Vercel.

## Prerequisites

- Vercel account with appropriate permissions
- GitHub repository access
- Shopify store credentials (if using Shopify integration)

## Vercel Setup

### 1. Environment Variables

Configure the following environment variables in your Vercel project:

#### Required for Commerce
- `SHOPIFY_STORE_DOMAIN` - Your Shopify store domain (e.g., `yourstore.myshopify.com`)
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Shopify Storefront API access token
- `SHOPIFY_REVALIDATION_SECRET` - Secret for webhook revalidation

#### Required for Phase 2 Workflows
- `OPENAI_API_KEY` - OpenAI API key for AI PR bot
- `VERCEL_TOKEN` - Vercel API token for deployments
- `REWARDS_PRIVATE_KEY` - Private key for rewards contract (test environment)
- `ALCHEMY_MUMBAI_URL` - Alchemy Mumbai testnet RPC URL
- `REWARDS_API_KEY` - API key for rewards service
- `REWARDS_CONTRACT_ADDRESS` - Smart contract address for rewards
- `GITHUB_PAT` - GitHub Personal Access Token for repo-sync
- `PILOT_TEST_WALLET` - Test wallet address for pilot

### 2. Vercel Configuration

The project includes a `.vercel.json` file with optimized settings for:
- Build configuration
- Deployment regions
- Caching strategies
- Serverless function configuration

### 3. Deployment Process

#### Automatic Deployments
- **Production**: Pushes to `main` branch trigger production deployments
- **Preview**: Pull requests automatically create preview deployments
- **Branch**: Feature branches can be configured for preview deployments

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 4. GitHub Integration

The repository is integrated with Vercel through:
- `.github/workflows/vercel-deploy.yml` - Automated deployment workflow
- Vercel GitHub App - Automatic preview deployments for PRs

## Monitoring and Debugging

### Vercel Dashboard
- View deployment logs
- Monitor function execution
- Check environment variables
- Review analytics

### Build Logs
Access build logs through:
- Vercel dashboard
- GitHub Actions workflow runs
- Vercel CLI: `vercel logs [deployment-url]`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables are set correctly
   - Verify Node.js version (requires Node 20+)
   - Review build logs for specific errors

2. **API Connection Issues**
   - Verify Shopify credentials
   - Check API rate limits
   - Ensure webhooks are properly configured

3. **Deployment Timeouts**
   - Review function bundle sizes
   - Check for infinite loops in serverless functions
   - Optimize build process

## Rollback

To rollback a deployment:
1. Navigate to Vercel dashboard
2. Select the project
3. Go to "Deployments"
4. Find the previous stable deployment
5. Click "Promote to Production"

Alternatively, use Vercel CLI:
```bash
vercel rollback [deployment-url]
```

## Support

For deployment issues:
- Review Vercel documentation: https://vercel.com/docs
- Check GitHub workflow logs
- Contact repository maintainers: @chaishillomnitech1

## Next Steps After Deployment

1. Verify all environment variables are set in Vercel
2. Test the deployment URL
3. Configure custom domain (if applicable)
4. Set up monitoring and alerts
5. Run E2E tests against deployed environment
