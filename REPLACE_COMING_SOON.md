# Replace GoDaddy Coming Soon Page with Your Next.js Site

## Current Situation
- ✅ You have a "Coming Soon" page published at `sobek-egy.com`
- ✅ You want to replace it with your full Next.js website
- ✅ Your site is already built and ready to deploy

---

## Step-by-Step Instructions

### Step 1: Build Your Next.js Site

In your terminal, run:
```bash
npm run build
```

This creates an `out` folder with all your static files.

---

### Step 2: Access GoDaddy File Manager

1. **Login to GoDaddy:**
   - Go to [godaddy.com](https://godaddy.com)
   - Login to your account

2. **Access Your Hosting:**
   - Go to "My Products"
   - Find "Web Hosting" or "Website"
   - Click "Manage" next to your hosting plan

3. **Open cPanel:**
   - Look for "cPanel Admin" or "File Manager" button
   - Click it to open cPanel

---

### Step 3: Replace Coming Soon Page

**Option A: Using File Manager (Easiest)**

1. **Navigate to public_html:**
   - In File Manager, go to `public_html` folder
   - This is where your Coming Soon page files are located

2. **Backup Current Files (Optional but Recommended):**
   - Select all files in `public_html`
   - Right-click → "Compress" → Create a ZIP backup
   - Or rename the folder to `coming-soon-backup`

3. **Delete Coming Soon Files:**
   - Select all files in `public_html`
   - Delete them (or move to backup folder)

4. **Upload Your Next.js Site:**
   - Click "Upload" button in File Manager
   - Select ALL files from your `out` folder
   - **Important:** Upload the CONTENTS of `out` folder, not the folder itself
   - Files should go directly into `public_html`:
     - `index.html`
     - `_next/` folder
     - `images/` folder
     - `fonts/` folder
     - `icons/` folder
     - `logo/` folder
     - etc.

**Option B: Using FTP**

1. **Get FTP Credentials:**
   - In cPanel → "FTP Accounts"
   - Note: FTP hostname, username, password

2. **Connect with FTP Client:**
   - Use FileZilla, Cyberduck, or any FTP client
   - Connect to your server
   - Navigate to `public_html`

3. **Replace Files:**
   - Delete all existing files in `public_html`
   - Upload all contents from `out` folder

---

### Step 4: Verify Deployment

1. **Visit Your Site:**
   - Go to `https://sobek-egy.com`
   - Your Next.js site should now be live!

2. **Check All Pages:**
   - Test navigation
   - Verify images load
   - Check responsive design

3. **Note About Forms:**
   - Contact form will show but won't submit (expected with static hosting)
   - Tracking feature will show but won't work
   - This is normal - you can upgrade later to enable these features

---

### Step 5: Clear Browser Cache (If Needed)

If you still see the Coming Soon page:
1. Clear your browser cache
2. Try incognito/private browsing mode
3. Wait 5-10 minutes for DNS propagation

---

## Troubleshooting

### Still Seeing Coming Soon Page

**Check File Locations:**
- Make sure `index.html` is in `public_html` root (not in a subfolder)
- Verify all `_next`, `images`, `fonts` folders are uploaded

**Check File Permissions:**
- Files should be 644
- Folders should be 755
- Right-click files → "Change Permissions" in File Manager

**Check .htaccess:**
- Next.js creates `.htaccess` automatically
- If missing, create one with:
  ```
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

### Files Not Loading

- Verify all folders (`_next`, `images`, `fonts`, `icons`, `logo`) were uploaded
- Check file paths in browser console (F12 → Console)
- Ensure no files are in subfolders incorrectly

---

## What Works Now:
✅ Full website replaces Coming Soon page
✅ All pages and navigation
✅ Images and styling
✅ Responsive design
✅ Professional look

## What Needs Upgrade Later:
❌ Contact form submissions (will show but won't submit)
❌ Tracking feature (will show but won't work)

---

## Next Steps:

1. ✅ Replace Coming Soon page (you're doing this now)
2. ✅ Site is live and visible
3. ⏳ Test everything works
4. ⏳ When ready, upgrade to enable forms (see `GODADDY_FREE_DEPLOYMENT.md`)

---

## Quick Reference:

```bash
# Build your site
npm run build

# Upload everything from 'out' folder to public_html
# Make sure files are directly in public_html, not in a subfolder
```

