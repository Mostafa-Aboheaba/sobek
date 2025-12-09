# GoDaddy Web Hosting Deployment Guide

## ⚠️ Important Notes

**GoDaddy Web Hosting Plans:**
- **Economy/Deluxe/Ultimate/Maximum** - Shared hosting (cPanel)
- ✅ Supports static files (HTML, CSS, JS)
- ✅ Supports PHP and MySQL databases
- ❌ Does NOT support Node.js/Next.js API routes natively
- ✅ Perfect for static site deployment NOW
- ✅ Can upgrade to VPS later for API functionality

**Current Setup (Static Hosting):**
- ✅ Website will be fully visible and functional
- ✅ All pages, images, and styling will work
- ❌ Contact form submissions won't work (no API backend)
- ❌ Tracking feature won't work (no API backend)
- ✅ You can upgrade later to enable these features

**Later Upgrade Path:**
- Option 1: Upgrade to GoDaddy VPS (~$5-10/month) - Full Node.js support
- Option 2: Use Vercel (FREE) + point GoDaddy domain - Easiest & best option
- Option 3: Use GoDaddy shared hosting + external API service

---

## Step 1: Build Your Static Site

Run this command in your terminal:

```bash
npm run build
```

This will create an `out` folder with all your static files.

---

## Step 2: Upload to GoDaddy

### Option A: Using cPanel File Manager

1. **Login to GoDaddy:**
   - Go to [godaddy.com](https://godaddy.com)
   - Login to your account
   - Go to "My Products" → "Web Hosting" → "Manage"

2. **Access File Manager:**
   - Click "cPanel Admin"
   - Find "File Manager" and click it
   - Navigate to `public_html` folder

3. **Upload Files:**
   - Delete any existing files in `public_html` (or backup first)
   - Upload ALL contents from the `out` folder
   - **Important:** Upload the CONTENTS of `out` folder, not the folder itself
   - Files should be directly in `public_html`:
     - `index.html`
     - `_next/` folder
     - `images/` folder
     - `fonts/` folder
     - etc.

### Option B: Using FTP

1. **Get FTP Credentials:**
   - In cPanel, go to "FTP Accounts"
   - Note your FTP hostname, username, and password

2. **Connect via FTP Client:**
   - Use FileZilla, Cyberduck, or any FTP client
   - Connect to your server
   - Navigate to `public_html`
   - Upload all contents from `out` folder

---

## Step 3: Verify Deployment

1. Visit your domain: `https://yourdomain.com`
2. Check all pages load correctly
3. Test navigation
4. **Note:** Contact form and tracking will show but won't submit (expected)

---

## Step 4: When Ready to Upgrade

### Option 1: Use Vercel (Free, Recommended - Easiest)

**Why Vercel:**
- ✅ 100% FREE for your needs
- ✅ Perfect Next.js support (made by Next.js creators)
- ✅ API routes work automatically
- ✅ Automatic SSL certificates
- ✅ Easy deployments
- ✅ Use your existing GoDaddy domain

**Steps:**
1. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub/GitLab/Bitbucket
   - Click "Import Project"
   - Select your repository
   - Vercel auto-detects Next.js

2. **Add Environment Variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add:
     ```
     MONGODB_URI=your_mongodb_connection_string
     RESEND_API_KEY=your_resend_api_key
     ADMIN_EMAIL=your_email@example.com
     ```

3. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live on Vercel domain

4. **Connect GoDaddy Domain:**
   - In Vercel → Settings → Domains
   - Add your GoDaddy domain (e.g., `sobekegy.com`)
   - Vercel shows DNS instructions

5. **Update GoDaddy DNS:**
   - Login to GoDaddy → DNS Management
   - Add CNAME record:
     - Type: CNAME
     - Name: @ (or leave blank for root domain)
     - Value: `cname.vercel-dns.com`
   - For www subdomain, add another CNAME:
     - Name: www
     - Value: `cname.vercel-dns.com`
   - Wait 5-10 minutes for DNS propagation

6. **Done!** Your site now has full API functionality

### Option 2: Upgrade to GoDaddy VPS

1. **Purchase GoDaddy VPS Plan:**
   - Go to GoDaddy → Hosting → VPS Hosting
   - Choose a plan (starts around $5-10/month)

2. **Follow Full Deployment Guide:**
   - See `GODADDY_DEPLOYMENT.md` for complete instructions
   - Install Node.js, MongoDB, and configure server
   - API routes will work immediately

### Option 3: Use External API Services (Keep Shared Hosting)

If you want to keep GoDaddy shared hosting but enable forms:

1. **Use Formspree or FormSubmit:**
   - Replace contact form API calls with Formspree endpoint
   - Free tier available
   - No server needed

2. **Use MongoDB Atlas + Serverless Functions:**
   - Keep static site on GoDaddy
   - Use Vercel/Netlify functions for API routes only
   - Point API calls to serverless functions

1. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Add environment variables:
     ```
     MONGODB_URI=your_mongodb_uri
     RESEND_API_KEY=your_resend_key
     ADMIN_EMAIL=your_email@example.com
     ```
   - Deploy (takes 2 minutes)

2. **Point GoDaddy Domain to Vercel:**
   - In Vercel: Add your GoDaddy domain
   - In GoDaddy DNS: Add CNAME record:
     - Type: CNAME
     - Name: @ (or www)
     - Value: cname.vercel-dns.com
   - Wait 5-10 minutes for DNS propagation

3. **Done!** Your site now has full API functionality

---

## Quick Commands Reference

```bash
# Build static site
npm run build

# The 'out' folder contains your deployable files
# Upload everything inside 'out' to public_html
```

---

## Troubleshooting

### Files Not Loading
- Make sure you uploaded files directly to `public_html`, not in a subfolder
- Check file permissions (should be 644 for files, 755 for folders)

### Images Not Showing
- Verify `images` and `fonts` folders were uploaded
- Check file paths are correct

### 404 Errors
- Ensure `index.html` is in `public_html` root
- Check `.htaccess` file if needed (Next.js creates this automatically)

### Contact Form Not Working
- This is expected with static hosting
- Upgrade to VPS or Vercel to enable API routes

---

## What Works Now (Free):
✅ All pages and navigation
✅ Images and styling
✅ Responsive design
✅ All visual features

## What Needs Upgrade:
❌ Contact form submissions
❌ Tracking feature
❌ Any API functionality

---

## Next Steps After Free Deployment:

1. ✅ Site is live and visible
2. ⏳ Test everything works visually
3. ⏳ When ready, upgrade to enable forms
4. ✅ No code changes needed for upgrade!

