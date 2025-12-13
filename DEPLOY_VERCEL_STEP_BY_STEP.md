# Deploy to Vercel - Step by Step Guide

## ✅ Why Vercel?

- ✅ **Professional emails** - Using your Resend API with custom templates
- ✅ **API routes work** - Contact form works perfectly
- ✅ **Free hosting** - No cost
- ✅ **Use your domain** - Keep `sobek-egy.com`
- ✅ **Automatic SSL** - HTTPS included
- ✅ **Fast global CDN** - Better performance

---

## Step 1: Prepare Your Code

### Update next.config.js for Vercel

We need to remove `output: 'export'` for Vercel (so API routes work):

```javascript
const nextConfig = {
  // Remove: output: 'export', ← Remove this line
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

**OR** create a separate config for Vercel.

---

## Step 2: Push Code to GitHub

Make sure your code is on GitHub:

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

## Step 3: Sign Up for Vercel

1. Go to: https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (easiest)
4. Authorize Vercel to access your repositories

---

## Step 4: Import Project

1. In Vercel dashboard, click **"Add New Project"**
2. Select your repository: `sobek_v2` (or your repo name)
3. Click **"Import"**

---

## Step 5: Configure Project

Vercel will auto-detect Next.js. Configure:

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (default)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default) ← **Important: Don't change this!**

**Install Command:** `npm install` (default)

---

## Step 6: Add Environment Variables

Click **"Environment Variables"** and add:

```
RESEND_API_KEY=re_your_resend_api_key_here
ADMIN_EMAIL=info@sobek-egy.com
MONGODB_URI=your_mongodb_uri (optional)
NODE_ENV=production
```

**Important:** Make sure to add these for:
- ✅ Production
- ✅ Preview  
- ✅ Development (optional)

---

## Step 7: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your site will be live at: `your-project.vercel.app`

---

## Step 8: Add Custom Domain

1. Go to **Settings** → **Domains**
2. Add domain: `sobek-egy.com`
3. Vercel will show DNS records to add

---

## Step 9: Update DNS in GoDaddy

1. Go to GoDaddy → DNS Management
2. Add/modify DNS records Vercel shows:
   - **A Record** or **CNAME** pointing to Vercel
3. Wait 5-30 minutes for DNS propagation

---

## Step 10: SSL Certificate

Vercel automatically provisions SSL certificate. No action needed!

---

## After Deployment

### Test Your Form

1. Visit: `https://sobek-egy.com`
2. Fill out contact form
3. Submit
4. Check emails:
   - Admin email (info@sobek-egy.com) ✅
   - Customer confirmation email ✅

### Professional Emails

With Vercel + Resend API:
- ✅ Beautiful HTML emails
- ✅ Custom templates
- ✅ Professional design
- ✅ Both admin and customer emails

---

## Benefits

### Before (FormSubmit):
- ❌ Basic email format
- ❌ Not professional
- ❌ Limited customization

### After (Vercel + Resend):
- ✅ Professional HTML emails
- ✅ Custom templates
- ✅ Beautiful design
- ✅ Full control

---

## Cost

**Vercel Free Tier:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Serverless functions (API routes)
- ✅ Custom domains
- ✅ SSL certificates

**Total Cost:** FREE! 🎉

---

## Troubleshooting

### Build Fails?

1. Check Vercel → Deployments → Logs
2. Verify all dependencies in `package.json`
3. Check environment variables are set

### Form Not Working?

1. Check Vercel → Functions → Logs
2. Verify `RESEND_API_KEY` is set
3. Check Resend dashboard for email status

### Domain Not Working?

1. Check DNS records in GoDaddy
2. Wait 30 minutes for propagation
3. Use https://dnschecker.org to verify

---

## Next Steps

1. ✅ Deploy to Vercel (10 minutes)
2. ✅ Add custom domain
3. ✅ Update DNS
4. ✅ Test form
5. ✅ Enjoy professional emails! 🎉

---

## Ready to Deploy?

Follow the steps above and your site will be live on Vercel with professional emails!
