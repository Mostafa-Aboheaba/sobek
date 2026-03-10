# MongoDB Atlas Setup Guide

MongoDB Atlas is a free cloud database. You use **one** Atlas cluster for both **local development** and **production** (Vercel). This guide walks you through creating it and getting your connection string.

---

## Step 1: Create an Atlas account

1. Go to **[https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)**.
2. Click **Try Free** (or **Sign In** if you have an account).
3. Sign up with **Google**, **GitHub**, or **Email**.
4. Complete the short survey (you can skip or choose "Explore" / "Side project") and click **Finish**.

---

## Step 2: Create a cluster (free tier)

1. You should see **Create a deployment** or **Build a database**.
2. Choose **M0 FREE** (Shared) — $0/month. Click **Create**.
3. **Cloud Provider & Region**: Pick one close to you (e.g. **AWS** → **N. Virginia** or **EU**). Click **Create Deployment**.
4. Wait 1–2 minutes until the cluster status is **Active** (green).

---

## Step 3: Create a database user (username + password)

Atlas will prompt you to create the first user:

1. **Username**: e.g. `sobekadmin` (remember it).
2. **Password**: Click **Autogenerate Secure Password** and **Copy** it, or choose your own strong password. **Save it somewhere safe** — you'll need it for the connection string.
3. Click **Create Database User**.

If you skipped that step:

- In the left sidebar click **Database Access** → **Add New Database User**.
- **Authentication**: Password.
- **Username** and **Password** (use Autogenerate and copy it).
- **Database User Privileges**: **Atlas admin** (or **Read and write to any database**).
- Click **Add User**.

---

## Step 4: Allow network access (so your app can connect)

Your app (local and Vercel) must be allowed to connect to Atlas.

1. In the left sidebar click **Network Access** (under Security).
2. Click **Add IP Address**.
3. For **both local and Vercel** (simplest):
   - Click **Allow Access from Anywhere**.
   - This sets the IP to `0.0.0.0/0` (any IP). Atlas will show a warning; for a small app with auth on the app side it's acceptable.
4. Optionally add a **Comment** like `Sobek app (local + Vercel)`.
5. Click **Confirm**.

If you prefer to restrict IPs later, you can add your home IP for local and Vercel's IP ranges for production — but starting with "Anywhere" is easiest.

---

## Step 5: Get your connection string (MONGODB_URI)

1. In the left sidebar click **Database** (or **Overview**).
2. On your cluster, click **Connect**.
3. Choose **Drivers** (or **Connect your application**).
4. **Driver**: Node.js. **Version**: 5.5 or later (or default).
5. You'll see a connection string like:
   ```
   mongodb+srv://sobekadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Click **Copy**.
7. Replace **`<password>`** with your **database user password** (from Step 3).  
   Example: if password is `MyPass123`, the URI becomes:
   ```
   mongodb+srv://sobekadmin:MyPass123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   If the password has special characters (e.g. `#`, `@`, `%`), they must be **URL-encoded** (e.g. `#` → `%23`, `@` → `%40`). Or change the password in Atlas to one without special characters.
8. (Optional but recommended) Add a database name so your app uses a dedicated DB. Add it **before** the `?`:
   ```
   mongodb+srv://sobekadmin:MyPass123@cluster0.xxxxx.mongodb.net/sobek?retryWrites=true&w=majority
   ```
   So the full value is: **MONGODB_URI** = that string.

You now have your **MONGODB_URI** for both local and production.

---

## Step 6: Use it locally (.env.local)

1. In your project root (same folder as `package.json`) create or open **`.env.local`**.
2. Add (use your real URI and a strong admin secret):
   ```env
   MONGODB_URI=mongodb+srv://sobekadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sobek?retryWrites=true&w=majority
   ADMIN_SECRET=your_admin_secret_here
   ```
3. Save the file. **Do not commit `.env.local`** (it should be in `.gitignore`).
4. Restart your dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000/schedule/](http://localhost:3000/schedule/), go to **Schedules** tab, click **Search**. If you see "No sailings" or a table (after seeding), the app is talking to Atlas.

---

## Step 7: Use it in production (Vercel)

1. Open your project on **[vercel.com](https://vercel.com)** → **Settings** → **Environment Variables**.
2. Add:
   - **Name**: `MONGODB_URI`  
     **Value**: paste the same connection string (with the same password and `/sobek` if you added it).  
     **Environment**: Production (and Preview if you want).
   - **Name**: `ADMIN_SECRET`  
     **Value**: same (or different) secret you use for the admin page.  
     **Environment**: Production (and Preview if you want).
3. Save and **redeploy** the project (Deployments → ⋮ on latest → Redeploy).

Your production app will use the **same** Atlas cluster and database. Data you add locally will appear in production and vice versa (same DB). If you want a separate database for production later, you can create another user or another database name in the same cluster (e.g. `sobek_prod`).

---

## Quick checklist

- [ ] Atlas account created
- [ ] M0 FREE cluster created and **Active**
- [ ] Database user created (username + password saved)
- [ ] Network Access: **Allow from anywhere** (or specific IPs)
- [ ] Connection string copied, `<password>` replaced, optional `/sobek` added
- [ ] `.env.local` has `MONGODB_URI` and `ADMIN_SECRET` (local)
- [ ] Vercel env vars have `MONGODB_URI` and `ADMIN_SECRET` (production)
- [ ] Dev server restarted; `/schedule/` and `/admin/schedules/` work locally
- [ ] Vercel redeployed; same URLs work on your production domain

---

## Troubleshooting

- **"Database unavailable" or connection errors**
  - Check that the password in the URI has no typos and that special characters are URL-encoded.
  - In Atlas → **Network Access**, ensure your IP (or `0.0.0.0/0`) is allowed.
  - In Atlas → **Database Access**, ensure the user has at least "Read and write to any database".

- **Password has `#`, `@`, `%`, etc.**
  - Either set a new password in Atlas (Database Access → Edit user) without those characters, or encode them: `#` → `%23`, `@` → `%40`, `%` → `%25`.

- **Want a separate DB for production?**
  - Use a different path in the URI, e.g. `/sobek_prod` instead of `/sobek` for production, and set that only in Vercel's `MONGODB_URI`.

Once this is done, you have MongoDB Atlas for both local and production. For deploying the app itself, see [DEPLOYMENT.md](./DEPLOYMENT.md).
