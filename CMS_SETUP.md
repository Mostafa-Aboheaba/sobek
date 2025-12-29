# CMS Dashboard Setup Guide

This guide explains how to set up and use the CMS dashboard for managing website content.

## Architecture Overview

The CMS is integrated into the existing Next.js application with the following structure:

- **Database**: Prisma with SQLite (MVP) - easily upgradeable to Postgres
- **Authentication**: NextAuth.js with credentials provider
- **Route Protection**: Middleware + Server Components
- **Admin Routes**: `/dashboard/*`
- **API Routes**: `/api/cms/*`

## Initial Setup

### 1. Environment Variables

Add these to your `.env.local` file:

```env
# Database (SQLite for MVP)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

**Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

### 2. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Or use migrations (recommended for production)
npm run db:migrate
```

### 3. Seed Initial Data

Create the default admin user:

```bash
npm run db:seed
```

**Default Credentials:**
- Email: `admin@sobek.com`
- Password: `admin123`

**⚠️ IMPORTANT**: Change the password immediately after first login!

### 4. Start Development Server

```bash
npm run dev
```

Access the dashboard at: `http://localhost:3000/dashboard`

## Usage

### Accessing the Dashboard

1. Navigate to `/dashboard/login`
2. Sign in with admin credentials
3. You'll be redirected to the dashboard home

### Managing Pages

1. **View All Pages**: `/dashboard/pages`
2. **Create New Page**: Click "Create New Page" or go to `/dashboard/pages/new`
3. **Edit Page**: Click "Edit" on any page or go to `/dashboard/pages/[slug]/edit`
4. **Delete Page**: Click "Delete" (Admin only)

### Page Structure

Each page has:
- **Slug**: URL path (e.g., `/about-us`)
- **Title**: Page title
- **Description**: Optional description
- **Status**: Draft or Published
- **Sections**: Flexible content sections

### Page Sections

Sections allow flexible content management:
- Each section has a unique `key` within the page
- Supports Markdown, HTML, or Plain Text
- Can be ordered and organized

Example sections:
- `hero-title`: Hero section title
- `intro-text`: Introduction paragraph
- `features-list`: Feature list content

### Site Settings

Admin users can manage site-wide settings at `/dashboard/settings`:
- Site title
- Contact information
- Custom configuration values

## Database Schema

### Models

- **User**: Admin/Editor accounts with roles
- **Page**: Website pages with slugs
- **PageSection**: Flexible content sections within pages
- **SiteSettings**: Site-wide configuration
- **Post**: Optional blog/news posts (for future use)

### User Roles

- **ADMIN**: Full access, can delete pages and manage settings
- **EDITOR**: Can create and edit pages, cannot delete or manage settings

## API Routes

### Protected CMS Routes (Require Authentication)

- `GET /api/cms/pages` - List all pages
- `POST /api/cms/pages` - Create new page
- `GET /api/cms/pages/[slug]` - Get single page
- `PUT /api/cms/pages/[slug]` - Update page
- `DELETE /api/cms/pages/[slug]` - Delete page (Admin only)
- `GET /api/cms/settings` - Get all settings
- `POST /api/cms/settings` - Create/update setting (Admin only)

### Public API Routes (No Authentication Required)

- `GET /api/cms/public/pages/[slug]` - Get published page content (for public website)

Use the public API endpoint in your public website components to fetch dynamic content:

```typescript
// Example: Fetch page content in a Server Component
const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cms/public/pages/about`);
const page = await res.json();
```

## Security

- All write operations are server-side only
- API routes check authentication and authorization
- Middleware protects all `/dashboard/*` routes
- Passwords are hashed with bcrypt
- JWT-based sessions (30-day expiration)

## Production Deployment

### 1. Switch to Postgres (Recommended)

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Update `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/sobek_cms"
```

Run migrations:
```bash
npm run db:migrate
```

### 2. Environment Variables

Set in your hosting platform:
- `DATABASE_URL`
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET` (use a strong secret)

### 3. Subdomain Routing (Optional)

To use `dashboard.yoursite.com`:

1. Configure your DNS/hosting to route `dashboard.*` to your Next.js app
2. Update middleware if needed for subdomain detection
3. Update `NEXTAUTH_URL` accordingly

Or keep using `/dashboard` path routing.

## Troubleshooting

### Database Connection Issues

- Ensure `DATABASE_URL` is set correctly
- For SQLite, ensure write permissions in project directory
- Run `npm run db:push` to create tables

### Authentication Issues

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

### Permission Errors

- Ensure user has correct role (ADMIN or EDITOR)
- Check middleware is not blocking legitimate requests

## Next Steps

- Add rich text editor (e.g., TipTap, Lexical)
- Add image upload functionality
- Implement content versioning
- Add preview mode for draft pages
- Set up email notifications for content changes

## Support

For issues or questions, refer to:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)

