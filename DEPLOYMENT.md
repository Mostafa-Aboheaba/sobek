# GitHub Pages Deployment Guide

## Important Notes

⚠️ **GitHub Pages Limitations:**
- GitHub Pages only serves static files (HTML, CSS, JS)
- **API Routes will NOT work** on GitHub Pages (contact form, tracking API)
- For API functionality, consider using:
  - [Vercel](https://vercel.com) (recommended for Next.js)
  - [Netlify](https://netlify.com)
  - [Formspree](https://formspree.io) for contact forms
  - External API services

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/Mostafa-Aboheaba/sobek`
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: `GitHub Actions`
4. Save the settings

### 2. Repository Name Configuration

If your repository name is **NOT** `sobek`, update the `next.config.js` file:

```javascript
const repoName = 'your-repo-name' // Change this line
```

**Important:**
- If your repo is `username.github.io`, set `repoName` to empty string `''`
- If your repo is `sobek`, keep it as `'sobek'`
- The site will be available at: `https://username.github.io/sobek/`

### 3. Deploy

The GitHub Actions workflow will automatically:
1. Build your Next.js app when you push to `main` branch
2. Deploy to GitHub Pages

**To deploy manually:**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 4. Check Deployment Status

1. Go to **Actions** tab in your GitHub repository
2. You'll see the deployment workflow running
3. Once complete, your site will be live at:
   - `https://mostafa-aboheaba.github.io/sobek/` (if repo name is `sobek`)
   - `https://mostafa-aboheaba.github.io/` (if repo is `username.github.io`)

## Troubleshooting

### Build Fails
- Check the Actions tab for error messages
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should be 20)

### 404 Errors
- Verify `basePath` in `next.config.js` matches your repo name
- Check that GitHub Pages is enabled in repository settings

### API Routes Not Working
- This is expected - GitHub Pages is static hosting
- Consider migrating to Vercel for full Next.js support
- Or use external services for forms/APIs

## Alternative: Deploy to Vercel (Recommended)

For full Next.js functionality including API routes:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect Next.js and deploy
4. API routes will work automatically
5. Free tier includes:
   - Automatic deployments
   - Custom domains
   - SSL certificates
   - Serverless functions (API routes)

