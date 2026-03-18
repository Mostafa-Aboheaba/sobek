# Complete CMS Features Guide

Your CMS now supports editing **everything** on your website! Here's what you can manage:

## 🎨 Theme & Design System

### Location: `/dashboard/theme`

Edit your entire design system including:

#### Colors
- **Primary Color** - Main brand color (buttons, links)
- **Primary Dark** - Darker variant for headings
- **Accent Color** - Highlight/emphasis color
- **Accent Dark** - Darker accent variant
- **Neutral Dark** - Text color
- **Neutral Light** - Secondary text color
- **Beige Background** - Background color

#### Fonts
- **Primary Font** - Main font family (headings, body)
- **Secondary Font** - Alternative font

#### Live Preview
- See changes in real-time before saving
- Preview button to test without saving
- Changes apply immediately to the website

### How It Works
1. Visit `/dashboard/theme`
2. Use color pickers or enter hex codes
3. Select fonts from dropdown
4. Preview changes in real-time
5. Save to apply to entire website

**Note**: Theme changes are stored in the database and applied via CSS variables, so they work across all pages instantly.

---

## 🖼️ Asset Manager

### Location: `/dashboard/assets`

Upload and manage all images, files, and media:

#### Features
- **Upload Images** - Drag & drop or click to upload
- **View All Assets** - Grid view with thumbnails
- **Copy URL** - One-click copy of asset URL
- **Delete Assets** - Remove unused assets
- **Image Info** - See dimensions, file size, type

#### Usage
1. Go to `/dashboard/assets`
2. Click "Upload Assets"
3. Select one or multiple images
4. Files are saved to `/public/uploads/`
5. Copy the URL to use in content

#### Asset URLs
After uploading, assets are available at:
- `/uploads/[filename]`
- Copy the URL and paste it into page sections or content

---

## 📝 Content Management

### Homepage Sections
**Location**: `/dashboard/homepage-sections`

Manage all editable sections on your homepage:
- Hero heading, tagline, paragraph
- About Sobek content
- Services section
- And more...

### Pages
**Location**: `/dashboard/pages`

- Create new pages
- Edit existing pages
- Add flexible content sections
- Markdown/HTML/Plain text support

---

## 🔧 How Everything Works Together

### 1. **Design System** (Theme)
- Stored as JSON in `SiteSettings` table
- Applied via CSS variables
- Changes affect entire website instantly

### 2. **Assets**
- Uploaded to `/public/uploads/`
- Stored in `Asset` database table
- URLs can be used anywhere in content

### 3. **Content**
- Pages with sections (flexible structure)
- Each section has a unique key
- Supports Markdown, HTML, or plain text
- Published/draft status

---

## 🚀 Quick Start Guide

### Step 1: Customize Theme
1. Go to `/dashboard/theme`
2. Adjust colors to match your brand
3. Choose fonts
4. Click "Save Theme"

### Step 2: Upload Assets
1. Go to `/dashboard/assets`
2. Upload logo, images, etc.
3. Copy URLs for use in content

### Step 3: Edit Content
1. Go to `/dashboard/homepage-sections`
2. Create homepage content page (slug: `home`)
3. Add sections with keys like `hero-heading`, `hero-tagline`
4. Publish to see changes

---

## 📋 Complete List of Editable Elements

### ✅ Currently Editable
- ✅ **All Colors** - Primary, accent, text colors
- ✅ **Fonts** - Primary and secondary font families
- ✅ **Images/Assets** - Upload and manage all media
- ✅ **Homepage Content** - Hero, about, services sections
- ✅ **Page Content** - Create/edit any page

### 🔄 Easy to Add More
The system is extensible - you can easily add:
- More color variables
- Font sizes and weights
- Spacing/sizing values
- Custom CSS classes
- And more...

Just add new fields to the theme editor and update the CSS variables!

---

## 💡 Tips & Best Practices

### Theme Customization
- Use color pickers for visual selection
- Test colors for accessibility (contrast)
- Preview changes before saving
- Save frequently to avoid losing work

### Asset Management
- Use descriptive filenames
- Optimize images before uploading (reduce file size)
- Delete unused assets to save space
- Use alt text for accessibility

### Content Management
- Use HTML for rich formatting
- Use Markdown for easy writing
- Keep section keys consistent
- Always publish pages to see changes live

---

## 🔐 Permissions

- **Admin**: Can edit everything (theme, assets, all content)
- **Editor**: Can edit content and upload assets, cannot edit theme

---

## 🎯 Next Steps

1. **Customize Your Theme** - Make it match your brand
2. **Upload Your Assets** - Add logo, images, icons
3. **Create Homepage Content** - Run `npm run cms:create-homepage`
4. **Edit Content** - Make it your own!

Everything is now editable from your dashboard! 🎉

