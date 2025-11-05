# Cloudflare Pages Deployment

This Next.js project is configured for Cloudflare Pages deployment using static export.

## Deployment Steps

1. **Connect your repository to Cloudflare Pages:**
   - Go to Cloudflare Dashboard → Pages → Create a project
   - Connect your Git repository
   - Select the branch you want to deploy

2. **Build Configuration:**
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `/` (leave empty or set to root)

3. **Environment Variables:**
   - No environment variables required for this static site

4. **Node Version:**
   - Cloudflare Pages will use Node.js 20 (specified in `.nvmrc`)

## Build Output

The build process generates a static site in the `out` directory that can be deployed directly to Cloudflare Pages.

## Notes

- This project uses static export (`output: 'export'` in `next.config.ts`)
- Images are unoptimized for static export compatibility
- Trailing slashes are enabled for better Cloudflare Pages compatibility

