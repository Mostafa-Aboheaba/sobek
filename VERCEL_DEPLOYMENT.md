# Vercel Deployment Guide for CMS Cache Fix

## Step 1: Push the Branch to GitHub

The branch `test/vercel-cms-cache-fix` has been created and committed locally. Push it to GitHub:

```bash
git push -u origin test/vercel-cms-cache-fix
```

If you encounter certificate issues, you can:
- Use SSH instead: `git remote set-url origin git@github.com:Mostafa-Aboheaba/sobek.git`
- Or push manually through GitHub Desktop or your IDE

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or import if not already connected)
3. Go to **Settings** → **Git**
4. Under **Production Branch**, you can temporarily set it to `test/vercel-cms-cache-fix` OR
5. Go to **Deployments** tab
6. Click **Create Deployment**
7. Select branch: `test/vercel-cms-cache-fix`
8. Click **Deploy**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy the branch
vercel --prod
```

## Step 3: Configure Environment Variables

**CRITICAL**: Make sure these environment variables are set in Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add/Verify these variables:

### Required Variables:

```env
# CMS Configuration
NEXT_PUBLIC_CONTENT_SOURCE=cms
NEXT_PUBLIC_CMS_API_URL=https://your-directus-instance.com

# Node Environment (important for cache behavior)
NODE_ENV=production
```

### Important Notes:

- **NEXT_PUBLIC_CMS_API_URL**: This should be your **publicly accessible** Directus URL
  - If Directus is running locally, you'll need to:
    - Use a service like ngrok: `ngrok http 8055`
    - Or deploy Directus to a cloud service
    - Or use a tunnel service
  
- **NODE_ENV**: Should be `production` in Vercel (it's set automatically, but verify)

## Step 4: Test the Deployment

Once deployed, you'll get a preview URL like:
`https://sobek-v2-xxx.vercel.app`

### Test Steps:

1. **Check the API endpoint**:
   - Visit: `https://your-deployment.vercel.app/api/test-content`
   - Should show content matching between provider and cache

2. **Check content endpoint**:
   - Visit: `https://your-deployment.vercel.app/api/content`
   - Should return the full content JSON from Directus

3. **Test content updates**:
   - Make an edit in Directus
   - Wait a few seconds
   - Hard refresh the preview URL (Cmd+Shift+R / Ctrl+Shift+R)
   - Check if the new content appears

## Step 5: Monitor Logs

In Vercel Dashboard:
1. Go to **Deployments**
2. Click on your deployment
3. Click **Functions** tab
4. Check the logs for:
   - `[ContentProvider]` messages
   - `[Content]` messages
   - Cache version numbers

## Troubleshooting

### Content not updating?

1. **Check Directus URL**: Ensure `NEXT_PUBLIC_CMS_API_URL` is correct and publicly accessible
2. **Check CORS**: Directus must allow requests from your Vercel domain
3. **Check Directus Permissions**: Ensure the `site_content` collection is publicly readable
4. **Check Cache**: In production, cache TTL is 5 minutes. Wait or clear cache
5. **Check Logs**: Look for errors in Vercel function logs

### Directus not accessible?

If Directus is running locally, you have options:

1. **Use ngrok** (for testing):
   ```bash
   ngrok http 8055
   # Use the https URL in NEXT_PUBLIC_CMS_API_URL
   ```

2. **Deploy Directus** to a cloud service:
   - Railway
   - Render
   - DigitalOcean
   - AWS/GCP/Azure

3. **Use Directus Cloud**: Sign up for Directus Cloud

### CORS Issues?

Add to your Directus `config/env` or environment:
```env
CORS_ENABLED=true
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

## Next Steps After Testing

If the fix works on Vercel:

1. Merge the branch to `main` or your production branch
2. Update production environment variables if needed
3. Monitor the production deployment

If it still doesn't work:

1. Check Vercel function logs for specific errors
2. Verify Directus is accessible from Vercel's servers
3. Consider using ISR (Incremental Static Regeneration) with revalidation
4. May need to implement a different caching strategy

