# Deployment & Testing Guide: Schedules Feature

This guide walks you through **testing the schedules feature locally** and **deploying it to production** on Vercel.

---

## Part 1: Test locally first

### 1. Install and run the app

```bash
cd /Users/mac/development/freelance/sobek_v2
npm install
```

### 2. Set up environment variables

Create a file named `.env.local` in the project root (same folder as `package.json`):

```env
# Required for schedules (and contact/reservations)
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/sobek?retryWrites=true&w=majority

# Required for admin CRUD (create/edit/delete schedules)
ADMIN_SECRET=your_secret_password_here

# Optional (for contact form emails)
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL=your@email.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- **MONGODB_URI**: Get this from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier is enough). Create a cluster → Database Access → Add user → Network Access → Add IP (or 0.0.0.0 for dev) → Connect → copy the connection string and replace password.
- **ADMIN_SECRET**: Choose any strong password. You’ll use it to unlock the admin page and to run the seed script.

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Seed sample schedules (optional)

In a **new terminal** (keep `npm run dev` running):

```bash
cd /Users/mac/development/freelance/sobek_v2
ADMIN_SECRET=your_secret_password_here node scripts/seed-schedules.js
```

Use the same value as `ADMIN_SECRET` in `.env.local`. You should see “Row 1 created”, etc.

### 5. Test the public schedule page

1. Go to [http://localhost:3000/schedule/](http://localhost:3000/schedule/).
2. You should see **Tracking** and **Schedules** tabs.
3. Click **Schedules**, leave filters empty, and click **Search** (or fill From: `EGDEK`, To: `RUNVS` then Search).
4. You should see a table with vessel, POL, POD, ETA, ETD.

### 6. Test the admin page

1. Go to [http://localhost:3000/admin/schedules/](http://localhost:3000/admin/schedules/).
2. Enter the same value as `ADMIN_SECRET` and click **Unlock**.
3. You should see the list of schedules and the “Add schedule” form.
4. Try:
   - **Create**: Fill the form and click **Create**.
   - **Edit**: Click **Edit** on a row, change something, click **Update**.
   - **Delete**: Click **Delete** on a row, then **Confirm**.
5. Click **Re-enter secret** to lock again.

If all of this works, you’re ready for production.

---

## Part 2: Deploy to production (Vercel)

### 1. Push your branch

```bash
git add .
git status
git commit -m "feat: add admin schedules page and deployment guide"
git push -u origin feature/schedules-tracking
```

(If the branch already exists on the remote, use `git push`.)

### 2. Create / use a Vercel project

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. Click **Add New** → **Project**.
3. Import your GitHub repo (`sobek_v2` or whatever it’s named).
4. Select the branch you want to deploy (e.g. `feature/schedules-tracking` or `main` after merge).
5. **Do not click Deploy yet** — add environment variables first.

### 3. Add environment variables in Vercel

In the project settings (or during “Import” when it asks for env vars):

1. Open **Settings** → **Environment Variables**.
2. Add:

| Name            | Value                    | Notes                                      |
|-----------------|--------------------------|--------------------------------------------|
| `MONGODB_URI`   | `mongodb+srv://...`      | Same as in `.env.local` (Atlas connection) |
| `ADMIN_SECRET`  | Your strong secret       | Same as local; keep it private             |
| `RESEND_API_KEY`| (optional)               | If you use contact form emails             |
| `ADMIN_EMAIL`   | (optional)               | For contact form notifications             |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Your production URL (e.g. sobek.vercel.app) |

3. Save. Vercel will use these for the next build.

### 4. Deploy

1. Trigger a deploy: **Deployments** → **Redeploy** the latest, or push a new commit.
2. Wait for the build to finish. The first time may take 1–2 minutes.
3. Open the deployment URL (e.g. `https://sobek-v2-xxx.vercel.app`).

### 5. Test production

- **Public schedules**:  
  `https://your-app.vercel.app/schedule/`  
  Use the Schedules tab and search. It should show data from your MongoDB.

- **Admin**:  
  `https://your-app.vercel.app/admin/schedules/`  
  Enter your `ADMIN_SECRET`. You should see the same CRUD UI and be able to add/edit/delete.

### 6. (Optional) Seed production data

If the production database is empty and you want to add the same sample rows:

```bash
BASE_URL=https://your-app.vercel.app ADMIN_SECRET=your_secret node scripts/seed-schedules.js
```

Use your **production** URL and **production** `ADMIN_SECRET`.

---

## Summary checklist

**Local**

- [ ] `.env.local` has `MONGODB_URI` and `ADMIN_SECRET`
- [ ] `npm run dev` runs without errors
- [ ] `/schedule/` shows the Schedules tab and search works
- [ ] `/admin/schedules/` unlocks with `ADMIN_SECRET` and CRUD works
- [ ] (Optional) `ADMIN_SECRET=xxx node scripts/seed-schedules.js` adds sample data

**Production (Vercel)**

- [ ] Repo is connected to Vercel and branch is selected
- [ ] `MONGODB_URI` and `ADMIN_SECRET` (and any others) are set in Vercel
- [ ] Deploy succeeds and `/schedule/` and `/admin/schedules/` work as expected

---

## Troubleshooting

- **“Database unavailable”**  
  Check `MONGODB_URI` in `.env.local` (local) or in Vercel (production). In Atlas, ensure the IP is allowed (0.0.0.0/0 for “allow from anywhere” if needed).

- **401 Unauthorized on Create/Update/Delete**  
  The request must send header `x-admin-secret` with the same value as `ADMIN_SECRET`. On the admin page, unlock with that exact value. For the seed script, set `ADMIN_SECRET` in the environment.

- **No schedules in production**  
  Production uses a different database (or empty DB). Add data via the admin page or run the seed script with `BASE_URL` and `ADMIN_SECRET` for production.

- **Build fails on Vercel**  
  Ensure you’re not using `output: 'export'` when deploying to Vercel (this project turns that off when `VERCEL` is set). Check the build logs for missing env vars or TypeScript errors.

If you hit another error, check the Vercel function logs (Dashboard → Project → Logs) and the browser Network tab for failed API calls.
