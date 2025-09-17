# Vercel Deployment Guide for Secret Speed Stakes

This guide provides step-by-step instructions for deploying the Secret Speed Stakes application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Project repository pushed to GitHub
- Environment variables configured

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your project is pushed to GitHub with all necessary files:

```bash
git add .
git commit -m "Initial commit: Secret Speed Stakes with FHE integration"
git push origin main
```

### 2. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### 3. Import Project

1. **Click "New Project"** on your Vercel dashboard
2. **Import Git Repository**: Select your `secret-speed-stakes` repository
3. **Configure Project**:
   - **Project Name**: `secret-speed-stakes` (or your preferred name)
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 4. Configure Environment Variables

In the Vercel project settings, add the following environment variables:

#### Required Environment Variables

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_sepolia_rpc_url
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
```

#### Optional Environment Variables

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_APP_NAME=RacingWagers
NEXT_PUBLIC_APP_DESCRIPTION=Encrypted racing bets platform
```

### 5. Deploy

1. **Click "Deploy"** to start the deployment process
2. **Wait for Build**: Vercel will install dependencies and build your project
3. **Monitor Build Logs**: Check for any build errors in the deployment logs

### 6. Configure Custom Domain (Optional)

1. **Go to Project Settings** → **Domains**
2. **Add Domain**: Enter your custom domain
3. **Configure DNS**: Update your domain's DNS records as instructed
4. **SSL Certificate**: Vercel automatically provides SSL certificates

### 7. Configure Build Settings

In your project settings, ensure these build configurations:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

## Environment Variables Configuration

### In Vercel Dashboard

1. **Go to Project Settings** → **Environment Variables**
2. **Add each variable** with the following settings:
   - **Name**: Variable name (e.g., `NEXT_PUBLIC_CHAIN_ID`)
   - **Value**: Variable value (e.g., `11155111`)
   - **Environment**: Select all environments (Production, Preview, Development)

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Ethereum Sepolia chain ID |
| `NEXT_PUBLIC_RPC_URL` | `your_sepolia_rpc_url` | Sepolia RPC endpoint |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `your_wallet_connect_project_id` | WalletConnect project ID |
| `NEXT_PUBLIC_INFURA_API_KEY` | `your_infura_api_key` | Infura API key |

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel account created and connected
- [ ] Project imported to Vercel
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Application accessible via URL

## Troubleshooting

### Common Issues

#### Build Failures
- **Check Node.js version**: Ensure compatibility with Vite and React 18
- **Verify dependencies**: All packages should be compatible
- **Check build logs**: Look for specific error messages

#### Environment Variables
- **Prefix with NEXT_PUBLIC_**: Required for client-side access
- **No sensitive data**: Never expose private keys or secrets
- **Redeploy after changes**: Environment variable changes require redeployment

#### Network Issues
- **Check RPC endpoints**: Ensure Sepolia RPC is accessible
- **Verify chain ID**: Must match Sepolia testnet (11155111)
- **Wallet connection**: Test with MetaMask or compatible wallets

### Build Optimization

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm ci",
  "devCommand": "npm run dev"
}
```

## Post-Deployment

### 1. Test Application
- **Connect wallet**: Test wallet connection functionality
- **Create race**: Verify race creation works
- **Place stakes**: Test encrypted betting functionality
- **Check performance**: Ensure FHE operations work correctly

### 2. Monitor Performance
- **Vercel Analytics**: Enable analytics for performance monitoring
- **Error tracking**: Monitor for runtime errors
- **User feedback**: Collect feedback on user experience

### 3. Update Documentation
- **Update README**: Include live deployment URL
- **Update links**: Ensure all links point to production
- **Add badges**: Include deployment status badges

## Security Considerations

### Environment Variables
- **Never commit secrets**: Use Vercel's environment variable system
- **Rotate keys**: Regularly update API keys and secrets
- **Monitor access**: Review who has access to environment variables

### HTTPS
- **SSL certificates**: Vercel provides automatic SSL
- **Secure headers**: Configure security headers in vercel.json
- **CSP policies**: Implement Content Security Policy

## Maintenance

### Regular Updates
- **Dependencies**: Keep packages updated
- **Security patches**: Apply security updates promptly
- **Performance**: Monitor and optimize performance

### Monitoring
- **Uptime**: Monitor application availability
- **Performance**: Track loading times and user experience
- **Errors**: Monitor and fix runtime errors

## Support

For deployment issues:
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Create issues in your repository
- **Community**: Join Vercel community for support

---

**Deployment URL**: Your application will be available at `https://your-project-name.vercel.app`

**Last Updated**: September 2024
