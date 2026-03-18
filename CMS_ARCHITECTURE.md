# CMS Architecture Documentation

## Overview

The CMS dashboard is integrated into the existing Next.js application, providing a secure, role-based content management system without disrupting the public website.

## Architecture Decisions

### 1. Database Choice

**Decision**: Prisma with SQLite for MVP, upgradeable to Postgres

**Rationale**:
- SQLite requires no setup, perfect for MVP and development
- Prisma makes migration to Postgres seamless
- Existing MongoDB remains for legacy data (contact forms, reservations)
- Can run both databases in parallel

### 2. Authentication Strategy

**Decision**: NextAuth.js (Auth.js) with Credentials Provider

**Rationale**:
- Industry standard for Next.js authentication
- Built-in session management
- Easy to extend with OAuth providers later
- Server-side session validation
- JWT-based for simplicity (can upgrade to database sessions)

### 3. Route Protection

**Decision**: Multi-layer protection (Middleware + Server Components)

**Rationale**:
- Middleware provides first-line defense at the edge
- Server Components add additional validation
- Defense in depth principle
- Middleware can be extended for subdomain routing

### 4. Folder Structure

```
app/
  dashboard/          # CMS routes (protected)
    layout.tsx       # Authenticated layout
    login/           # Login page (public)
    pages/           # Pages management
    settings/        # Site settings (admin only)
  api/
    auth/[...nextauth]/  # NextAuth routes
    cms/            # Protected CMS APIs
      pages/
      settings/
    cms/public/     # Public CMS APIs (no auth)
```

**Rationale**:
- Clear separation of concerns
- Easy to identify CMS routes
- Follows Next.js App Router conventions
- Can easily extract to separate app if needed

### 5. Content Model

**Decision**: Flexible Page + PageSection structure

**Rationale**:
- Pages represent website pages (About, Services, etc.)
- PageSections allow flexible content organization
- Each section has a unique key within a page
- Supports different content types (Markdown, HTML, Text)
- Easy to add new sections without schema changes

### 6. Role-Based Access Control

**Decision**: Simple role system (ADMIN, EDITOR)

**Rationale**:
- ADMIN: Full access (delete, settings)
- EDITOR: Content creation/editing only
- Can easily extend with more roles if needed
- Checked at both API and UI levels

### 7. Security Considerations

**Implemented**:
- All write operations are server-side only
- Password hashing with bcrypt (10 rounds)
- API routes check authentication and authorization
- Middleware protects routes at edge
- No sensitive logic in client components
- JWT tokens with 30-day expiration

**Future Enhancements**:
- Rate limiting on API routes
- CSRF protection
- Content versioning
- Audit logging

### 8. Public Content Consumption

**Decision**: Separate public API endpoint

**Rationale**:
- `/api/cms/public/pages/[slug]` - No auth required
- Only returns published content
- Clean separation from admin APIs
- Public site can fetch content dynamically
- Supports ISR for performance

## Data Flow

### Content Creation Flow

1. Admin/Editor logs in → NextAuth creates session
2. Navigates to `/dashboard/pages/new`
3. Fills form → Client component
4. Submits → POST to `/api/cms/pages`
5. API validates auth + role → Prisma creates page
6. Response → Redirect to edit page

### Public Content Fetch Flow

1. Public page loads (e.g., `/about`)
2. Server Component fetches → `/api/cms/public/pages/about`
3. API queries Prisma for published page
4. Returns content → Renders in component
5. Can use ISR to cache content

## Deployment Strategy

### Option 1: Same App, Path-Based Routing (Current)

- Public site: `yoursite.com`
- CMS: `yoursite.com/dashboard`
- Single Next.js app
- Middleware handles protection

### Option 2: Same App, Subdomain Routing

- Public site: `yoursite.com`
- CMS: `dashboard.yoursite.com`
- Single Next.js app
- Configure DNS/hosting to route subdomain
- Update middleware for subdomain detection

### Option 3: Separate Apps (Future)

- Public app: `yoursite.com`
- CMS app: `dashboard.yoursite.com`
- Shared database (Prisma)
- Separate deployments
- Requires API communication or shared DB

## Migration Path

### From MongoDB to Prisma

Current state: MongoDB for contact forms, reservations
Future: Can migrate gradually

1. Keep MongoDB for existing data
2. Use Prisma for new CMS content
3. Gradually migrate other models if needed
4. Both databases can coexist

### From SQLite to Postgres

1. Update `schema.prisma` datasource
2. Update `DATABASE_URL` environment variable
3. Run `prisma migrate dev` to create migrations
4. Deploy with new connection string
5. Run migrations in production

## Performance Considerations

### Current Implementation

- Server Components for initial render
- API routes for dynamic operations
- Prisma connection pooling
- JWT-based sessions (stateless)

### Optimization Opportunities

- Implement ISR for public pages
- Add Redis for session storage (if needed)
- Cache public API responses
- Add database indexes for queries
- Use Prisma's `select` to limit fields

## Extensibility

### Adding New Content Types

1. Create new model in `schema.prisma`
2. Generate Prisma client: `npm run db:generate`
3. Create API routes in `/api/cms/`
4. Create UI components in `/dashboard/`
5. Update sidebar navigation

### Adding OAuth Providers

1. Install provider package (e.g., `@auth/google-provider`)
2. Add provider to `lib/auth.ts`
3. Update `authOptions.providers`
4. Configure environment variables
5. Test authentication flow

### Adding Rich Text Editor

1. Install editor (e.g., TipTap, Lexical)
2. Create editor component
3. Replace textarea in `PageForm`
4. Handle content serialization
5. Store in `PageSection.content`

## Testing Strategy

### Recommended Tests

1. **Authentication**
   - Login/logout flows
   - Session persistence
   - Role-based access

2. **API Routes**
   - Auth middleware
   - CRUD operations
   - Validation

3. **Components**
   - Form validation
   - Error handling
   - Loading states

4. **Integration**
   - End-to-end content creation
   - Public content fetching
   - Permission checks

## Monitoring & Logging

### Current

- Console logging for errors
- Prisma query logging (dev mode)

### Recommended

- Structured logging (Winston, Pino)
- Error tracking (Sentry)
- Performance monitoring
- Database query monitoring
- Authentication event logging

## Conclusion

The CMS architecture is designed to be:
- **Secure**: Multi-layer protection, server-side validation
- **Scalable**: Easy to migrate to Postgres, add features
- **Maintainable**: Clear structure, separation of concerns
- **Extensible**: Simple to add new content types, features
- **Non-intrusive**: Doesn't affect existing public site

