# Dynamic Content Management System

This document explains how to make **ALL content** on your website dynamic and editable through the CMS dashboard.

## Overview

The entire website now supports dynamic content through the CMS. Every text, heading, paragraph, image, list, and array can be edited from the dashboard without touching code.

## Architecture

### 1. Content Storage
- All content is stored in the `PageSection` table in the database
- Each section has a unique `key` identifier (e.g., `"hero-heading"`, `"services-list"`)
- Content can be TEXT, HTML, or MARKDOWN
- JSON arrays/objects are stored as TEXT and parsed by components

### 2. Content Flow

```
Database (PageSection) 
  → Public API (/api/cms/public/pages/home)
  → Server Component (app/page.tsx)
  → CMSContentProvider (React Context)
  → Client Components (Hero, AboutSobek, etc.)
```

### 3. Components Architecture

All homepage components:
- Import `useCMSContent()` hook from `CMSContentProvider`
- Use `getSectionWithFallback(key, defaultValue)` to get content
- Parse JSON content when needed for arrays/lists
- Fall back to default values if CMS content is missing

## Setup Instructions

### 1. Initialize Database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 2. Create Homepage Content

Run the script to create all editable sections:

```bash
npm run cms:create-homepage
```

This creates a "home" page with **all** content sections pre-populated.

### 3. Access Dashboard

1. Visit: `http://localhost:3000/dashboard/login`
2. Login with: `admin@sobek.com` / `admin123`
3. Navigate to: **Homepage Sections** or **Pages > home > Edit**

## Editable Content Sections

### Hero Section
- `hero-heading` - Main heading (HTML supported)
- `hero-tagline` - Tagline text
- `hero-paragraph` - Description paragraph
- `hero-image` - Background image URL

### About Sobek Section
- `about-sobek-label` - Section label
- `about-sobek-title` - Main heading (HTML with highlights)
- `about-sobek-text` - Description text
- `about-sobek-button` - Button text
- `about-sobek-image` - Image URL

### Why Choose Sobek Section
- `why-choose-label` - Section label
- `why-choose-heading` - Main heading (HTML)
- `why-choose-features` - **JSON array** of features:
  ```json
  [
    {
      "title": "Feature Title",
      "description": "Feature description"
    }
  ]
  ```

### About Right Line Section
- `about-right-line-label` - Section label
- `about-right-line-title` - Main heading (HTML)
- `about-right-line-text` - Description text
- `about-right-line-button` - Button text
- `about-right-line-image` - Image URL
- `about-right-line-features` - **JSON array** of feature strings:
  ```json
  ["Feature 1", "Feature 2", "Feature 3"]
  ```

### Services Section
- `services-label` - Section label
- `services-heading` - Main heading (HTML)
- `services-list` - **JSON array** of service objects:
  ```json
  [
    {
      "number": "1",
      "title": "Service Title",
      "description": "Service description"
    }
  ]
  ```

### Industries Section
- `industries-label` - Section label
- `industries-heading` - Main heading
- `industries-image` - Image URL
- `industries-list` - **JSON array** of industry strings:
  ```json
  ["Industry 1", "Industry 2", "Industry 3"]
  ```

### Testimonials Section
- `testimonials-label` - Section label
- `testimonials-heading` - Main heading
- `testimonials-list` - **JSON array** of testimonial objects:
  ```json
  [
    {
      "rating": 4.7,
      "quote": "Testimonial quote",
      "name": "Client Name",
      "title": "Client Title"
    }
  ]
  ```

### Tracking/Find Your Cargo Section
- `tracking-label` - Section label
- `tracking-heading` - Main heading (HTML)
- `tracking-booking-label` - Booking input label
- `tracking-booking-placeholder` - Booking input placeholder
- `tracking-contact-label` - Contact input label
- `tracking-contact-placeholder` - Contact input placeholder
- `tracking-button` - Button text
- `tracking-image` - Image URL

## Editing Content

### Method 1: Homepage Sections Page
1. Go to: `/dashboard/homepage-sections`
2. Click **Edit Section** for any section
3. Update content and save
4. Changes appear immediately on the homepage

### Method 2: Direct Page Edit
1. Go to: `/dashboard/pages/home/edit`
2. Scroll through all sections
3. Edit any section inline
4. Save changes

## JSON Content Formatting

For sections that store JSON (lists, arrays, objects):

### Services List
```json
[
  {
    "number": "1",
    "title": "Service Name",
    "description": "Service description here"
  },
  {
    "number": "2",
    "title": "Another Service",
    "description": "Description here"
  }
]
```

### Features List
```json
[
  {
    "title": "Feature Title",
    "description": "Feature description"
  }
]
```

### Testimonials List
```json
[
  {
    "rating": 4.7,
    "quote": "Client quote here",
    "name": "Client Name",
    "title": "Client Job Title"
  }
]
```

### Simple String Arrays
```json
["Item 1", "Item 2", "Item 3"]
```

**Important**: Ensure valid JSON syntax. Use a JSON validator if unsure.

## Images

### Uploading Images
1. Go to: `/dashboard/assets`
2. Click **Upload Asset**
3. Select image file
4. Copy the file path (e.g., `/uploads/filename.jpg`)

### Using Images in Content
Update image sections with the full path:
- `/uploads/your-image.jpg` (for uploaded assets)
- `/images/existing-image.png` (for existing public images)

## HTML Content

Some sections support HTML formatting:

```html
Main text with <span class="text-highlight">highlighted text</span>
```

Available HTML tags:
- `<span class="text-highlight">` - Highlighted text
- `<br />` - Line breaks
- `<strong>`, `<em>` - Bold/italic

## Component Updates

All homepage components have been updated to:
- ✅ Fetch content from CMS
- ✅ Support fallback values (if CMS content is missing)
- ✅ Parse JSON for arrays/lists
- ✅ Support HTML formatting where needed
- ✅ Allow image URL customization

### Components Updated
- `Hero` - Hero section with heading, tagline, paragraph, image
- `AboutSobek` - About section with title, text, button, image
- `WhyChooseSobek` - Features section with dynamic features list
- `AboutRightLine` - About Right Line with features list
- `OurServices` - Services grid with dynamic services list
- `IndustriesWeServe` - Industries list with image
- `Testimonials` - Testimonials carousel with dynamic testimonials
- `FindYourCargo` - Tracking form with customizable labels and image

## Troubleshooting

### Content Not Updating
1. Check if section exists in database
2. Verify page status is "PUBLISHED"
3. Clear browser cache
4. Check browser console for errors

### JSON Parsing Errors
1. Validate JSON syntax using a JSON validator
2. Ensure proper quotes (double quotes, not single)
3. Check for trailing commas
4. Verify array/object structure matches expected format

### Images Not Loading
1. Verify image path starts with `/` (absolute path)
2. Check file exists in `public/` directory
3. For uploaded assets, verify path in `/dashboard/assets`

### Missing Sections
Run the initialization script again:
```bash
npm run cms:create-homepage
```

## Best Practices

1. **Always validate JSON** before saving JSON sections
2. **Test changes** on the homepage after editing
3. **Keep backups** of important content (export JSON)
4. **Use descriptive section keys** when adding new sections
5. **Maintain consistent formatting** across similar sections

## Adding New Editable Sections

To add a new editable section:

1. **Update the component** to use `useCMSContent()`:
   ```tsx
   const { getSectionWithFallback } = useCMSContent();
   const myContent = getSectionWithFallback("my-section-key", "Default value");
   ```

2. **Add section to seed script** (`scripts/create-homepage-content.ts`):
   ```typescript
   {
     key: "my-section-key",
     title: "My Section Title",
     content: "Default content",
     contentType: ContentType.TEXT,
     order: 1000,
   }
   ```

3. **Run the script** to create the section:
   ```bash
   npm run cms:create-homepage
   ```

4. **Edit in dashboard** at `/dashboard/homepage-sections`

## Support

For issues or questions:
1. Check this documentation
2. Review component code comments
3. Check browser console for errors
4. Verify database connection and schema

