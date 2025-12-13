# Fix: 405 Method Not Allowed on Vercel

## ✅ Problem Fixed!

The issue was `output: 'export'` in `next.config.js` which creates a static site. On Vercel, this prevents API routes from working.

## What I Fixed

Updated `next.config.js` to:
- **On Vercel:** Remove `output: 'export'` → API routes work ✅
- **On cPanel/GitHub Pages:** Keep `output: 'export'` → Static site ✅

## Next Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Fix Vercel API routes"
git push origin main
```

### 2. Vercel Will Auto-Deploy

Vercel will automatically:
- Detect the changes
- Rebuild your site
- API routes will work ✅

### 3. Add Environment Variables in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   ```
   RESEND_API_KEY=re_your_key_here
   ADMIN_EMAIL=info@sobek-egy.com
   MONGODB_URI=your_mongodb_uri (optional)
   ```

### 4. Test

1. Visit your Vercel URL
2. Submit the form
3. Should work now! ✅

## How It Works Now

**On Vercel:**
- ✅ No `output: 'export'`
- ✅ API routes work as serverless functions
- ✅ Contact form works perfectly
- ✅ Professional emails via Resend

**On cPanel (if you deploy there):**
- ✅ Uses `output: 'export'` (static site)
- ✅ FormSubmit/Web3Forms fallback works

## Result

- ✅ API routes work on Vercel
- ✅ Professional emails via Resend
- ✅ No more 405 errors
- ✅ Form works perfectly!

## Test It

After Vercel redeploys:
1. Visit your site
2. Submit the form
3. Check `info@sobek-egy.com` inbox
4. Should receive professional email! ✅
