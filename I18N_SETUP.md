# Internationalization (i18n) Setup Guide

This guide explains how internationalization (i18n) is implemented in the Sobek Shipping Agency website.

## Overview

The website now supports **multiple languages**:
- 🇬🇧 **English** (en) - Default
- 🇪🇬 **Arabic** (ar) - RTL support
- 🇷🇺 **Russian** (ru)

All content can be managed through the CMS dashboard in multiple languages.

## Architecture

### 1. Locale Routing

Using `next-intl` for App Router with locale-based routing:
- URLs: `/en/`, `/ar/`, `/ru/`
- Default locale: English (`/en/` → `/`)
- Automatic locale detection from browser

### 2. Database Schema

The `PageSection` model includes a `locale` field:
```prisma
model PageSection {
  locale  String  @default("en") // Language code
  // ... other fields
  @@unique([pageId, key, locale]) // Unique per locale
}
```

### 3. CMS Content by Locale

Each content section can have translations:
- `hero-heading` (en)
- `hero-heading` (ar)
- `hero-heading` (ru)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install next-intl
```

### 2. Database Migration

Update your database schema to include locale support:

```bash
npm run db:generate
npm run db:push
```

### 3. Initialize Content for All Locales

Run the homepage content creation script to create default content for English, then manually add translations for other languages through the CMS dashboard.

```bash
npm run cms:create-homepage
```

## Usage

### Editing Content in Multiple Languages

1. **Access Dashboard**: `/dashboard/homepage-sections` or `/dashboard/pages/home/edit`
2. **Select Language**: Choose the language dropdown (if implemented) or filter by locale
3. **Edit Content**: Update content for the selected language
4. **Save**: Changes are saved per locale

### Adding New Languages

1. Add locale to `i18n/config.ts`:
   ```typescript
   export const locales = ['en', 'ar', 'ru', 'fr'] as const;
   ```

2. Create translation file: `i18n/messages/fr.json`

3. Update Prisma schema if needed (locale field already supports any string)

4. Add locale-specific content through CMS dashboard

### Language Switcher

The `LanguageSwitcher` component is automatically added to the header. Users can:
- Click to see available languages
- Select a language to switch
- URL updates to include locale (e.g., `/ar/about`)

## File Structure

```
i18n/
├── config.ts          # Locale configuration (supported locales, RTL, etc.)
├── routing.ts         # next-intl routing configuration
├── request.ts         # Request configuration for server components
└── messages/
    ├── en.json        # English translations
    ├── ar.json        # Arabic translations
    └── ru.json        # Russian translations

app/
└── [locale]/          # Locale-based routes
    ├── layout.tsx     # Locale-aware layout (RTL support, messages)
    └── page.tsx       # Homepage with locale support
```

## RTL Support

Arabic (ar) is automatically rendered RTL:
- Layout direction: `dir="rtl"`
- CSS automatically handles RTL layouts
- Components use `next-intl` RTL detection

## CMS Integration

### Fetching Content by Locale

```typescript
// Server Component
import { getCMSSections } from "@/lib/cms-content";

const content = await getCMSSections("home", locale);
```

### Fallback Behavior

If content for a locale is missing:
1. Falls back to English (en)
2. If English is missing, components use hardcoded fallbacks

## Component Updates

### Using Translations

```typescript
"use client";
import { useTranslations } from "next-intl";

const MyComponent = () => {
  const t = useTranslations("common");
  
  return <button>{t("save")}</button>;
};
```

### Locale-Aware Navigation

```typescript
import { Link } from "@/i18n/routing";

<Link href="/about">About</Link> // Automatically includes locale
```

### CMS Content with Locale

Components using CMS content automatically get locale-specific content through `CMSContentProvider` which receives locale-aware content from the server.

## API Routes

### Public CMS API

The public CMS API supports locale:

```
GET /api/cms/public/pages/[slug]?locale=en
GET /api/cms/public/pages/[slug]?locale=ar
GET /api/cms/public/pages/[slug]?locale=ru
```

### Default Behavior

- If no locale specified, defaults to `en`
- Falls back to `en` if requested locale not found

## Dashboard Features

### Multi-Language Editing

The CMS dashboard allows:
- Editing content per language
- Viewing all languages side-by-side
- Copying content between languages
- Managing translations independently

### Language Filter

When editing pages/sections:
- Filter by language
- Edit content for specific language
- Preview in selected language

## Testing

### Test Different Locales

1. Visit: `http://localhost:3000/en` (English)
2. Visit: `http://localhost:3000/ar` (Arabic - RTL)
3. Visit: `http://localhost:3000/ru` (Russian)
4. Use language switcher to change languages

### Test CMS Content

1. Add content for English: `/dashboard/pages/home/edit`
2. Add content for Arabic: Same page, select Arabic locale
3. Add content for Russian: Same page, select Russian locale
4. View public site in each language to verify

## Best Practices

1. **Always provide English fallback**: English is the default, ensure it's complete
2. **Use consistent keys**: Same section keys across all locales
3. **Test RTL layouts**: Verify Arabic layout looks correct
4. **SEO considerations**: Each locale can have different meta tags
5. **Content sync**: Keep translations in sync (not just word-by-word, but contextually)

## Troubleshooting

### Locale not changing

- Check middleware configuration
- Verify `[locale]` folder structure
- Check browser console for errors

### Content not loading for locale

- Verify content exists in database for that locale
- Check locale code matches exactly (case-sensitive)
- Verify fallback to English works

### RTL not working

- Check `isRTL()` function in `i18n/config.ts`
- Verify `dir` attribute in layout
- Test with Arabic locale specifically

## Next Steps

1. ✅ Install next-intl
2. ✅ Update database schema
3. ✅ Create locale routing structure
4. ✅ Add language switcher
5. 🔄 Update CMS dashboard for multi-language editing
6. 🔄 Add more translation strings
7. 🔄 Configure SEO per locale

## Support

For issues:
1. Check `i18n/config.ts` for locale configuration
2. Verify database has locale column
3. Check middleware logs
4. Verify translation files exist in `i18n/messages/`

