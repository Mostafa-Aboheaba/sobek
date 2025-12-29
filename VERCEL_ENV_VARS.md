# Vercel Environment Variables - Quick Reference

## Required Environment Variables for CMS Testing

Add these in **Vercel Dashboard** → **Settings** → **Environment Variables**:

```env
NEXT_PUBLIC_CONTENT_SOURCE=cms
NEXT_PUBLIC_CMS_API_URL=https://your-directus-url.com
NODE_ENV=production
```

## Important Notes

1. **NEXT_PUBLIC_CMS_API_URL** must be:
   - Publicly accessible (not localhost)
   - HTTPS (Vercel requires HTTPS for external API calls)
   - CORS-enabled for your Vercel domain

2. **If Directus is local**, you need to:
   - Use ngrok: `ngrok http 8055` → use the HTTPS URL
   - Or deploy Directus to a cloud service
   - Or use Directus Cloud

3. **CORS Configuration in Directus**:
   ```env
   CORS_ENABLED=true
   CORS_ORIGIN=https://your-vercel-app.vercel.app,https://*.vercel.app
   ```

## Testing Checklist

- [ ] Branch `test/vercel-cms-cache-fix` pushed to GitHub
- [ ] Vercel deployment created from the branch
- [ ] Environment variables set in Vercel
- [ ] Directus is publicly accessible
- [ ] CORS configured in Directus
- [ ] Test `/api/test-content` endpoint
- [ ] Test `/api/content` endpoint
- [ ] Make edit in Directus and verify it appears on Vercel

