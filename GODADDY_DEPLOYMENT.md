# GoDaddy Deployment Guide

## Important Notes

⚠️ **Your website has API routes** (contact form, tracking) that require:
- Node.js runtime
- MongoDB database connection
- Environment variables

## Deployment Options

### Option 1: GoDaddy cPanel Hosting (Static Only - Limited)

**Limitations:**
- ❌ API routes will NOT work (contact form, tracking won't function)
- ✅ Only static files (HTML, CSS, JS)
- ✅ Cheapest option

**Steps:**
1. Build static export:
   ```bash
   npm run build
   ```
2. Upload the `out` folder contents to GoDaddy via FTP/cPanel File Manager
3. Upload to `public_html` directory
4. **Note:** Contact form and tracking features will be disabled

---

### Option 2: GoDaddy VPS/Dedicated Server (Recommended for Full Functionality)

**Requirements:**
- GoDaddy VPS or Dedicated Server plan
- Node.js installed
- MongoDB database (can use MongoDB Atlas - free tier available)

**Steps:**

#### 1. Prepare Your Server

SSH into your GoDaddy server and install:
```bash
# Install Node.js (v20 recommended)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

#### 2. Upload Your Code

Upload your project files to the server (via FTP/SFTP or Git):
```bash
# On your server
cd /var/www
git clone your-repo-url sobek-website
cd sobek-website
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file on your server:
```bash
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_admin_email@example.com
NODE_ENV=production
```

#### 4. Update next.config.js

Remove the static export configuration for production:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' for Node.js hosting
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

#### 5. Build and Start

```bash
npm run build
pm2 start npm --name "sobek-website" -- start
pm2 save
pm2 startup
```

#### 6. Configure Nginx (Reverse Proxy)

Create `/etc/nginx/sites-available/sobek`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/sobek /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 7. Setup SSL Certificate

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### Option 3: Hybrid Approach (Recommended)

**Use GoDaddy for domain only, host elsewhere:**

1. **Host on Vercel** (Free, best for Next.js):
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically
   - **Point GoDaddy domain to Vercel:**
     - In Vercel: Add your domain
     - In GoDaddy DNS: Add CNAME record pointing to Vercel

2. **Host on Netlify** (Alternative):
   - Similar process to Vercel
   - Free tier available
   - Good Next.js support

3. **Host on Railway/Render** (Paid but affordable):
   - Better for Node.js apps
   - Easy MongoDB integration

---

## Environment Variables Needed

Create these in your hosting platform:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sobek?retryWrites=true&w=majority
RESEND_API_KEY=re_your_resend_api_key_here
ADMIN_EMAIL=admin@sobekegy.com
NODE_ENV=production
```

---

## MongoDB Setup

### Option A: MongoDB Atlas (Free Tier)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Add to environment variables

### Option B: Install MongoDB on GoDaddy VPS
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

---

## Quick Start Commands

### For Static Export (cPanel):
```bash
npm run build
# Upload 'out' folder contents to public_html
```

### For Node.js Hosting (VPS):
```bash
npm install
npm run build
npm start
# Or use PM2: pm2 start npm --name "sobek" -- start
```

---

## Troubleshooting

### API Routes Not Working
- Ensure you're NOT using `output: 'export'` in next.config.js
- Check Node.js version (should be 18+)
- Verify environment variables are set

### MongoDB Connection Issues
- Check MongoDB URI format
- Verify network access (IP whitelist for Atlas)
- Test connection string separately

### Domain Not Loading
- Check DNS settings in GoDaddy
- Verify A/CNAME records point correctly
- Wait for DNS propagation (up to 48 hours)

---

## Recommended: Use Vercel + GoDaddy Domain

**Why:**
- ✅ Free hosting
- ✅ Automatic SSL
- ✅ API routes work perfectly
- ✅ Easy deployments
- ✅ Use GoDaddy domain you already own

**Steps:**
1. Deploy to Vercel (5 minutes)
2. Add GoDaddy domain in Vercel
3. Update GoDaddy DNS records
4. Done!


