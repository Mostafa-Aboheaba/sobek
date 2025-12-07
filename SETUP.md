# Setup Guide for Sobek Website

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up MongoDB**
   
   Option A: Local MongoDB
   - Install MongoDB locally
   - Start MongoDB service
   - Use connection string: `mongodb://localhost:27017/sobek`

   Option B: MongoDB Atlas (Cloud)
   - Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string
   - Use format: `mongodb+srv://username:password@cluster.mongodb.net/sobek`

3. **Set up Resend for emails**
   - Sign up at [resend.com](https://resend.com)
   - Create API key
   - Add to `.env.local`

4. **Create `.env.local` file**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   RESEND_API_KEY=your_resend_api_key
   ADMIN_EMAIL=admin@sobekegy.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Adding Images

1. Copy images from `/Users/mac/development/freelance/Assets/images/` to `public/images/`

2. Recommended image names:
   - `hero-ship-sea.png` - Hero section background
   - `about-sobek-ship.png` - About Sobek section
   - `right-line-containers.png` - About Right Line section
   - `tracking-container-truck.png` - Tracking section
   - `industries-container.png` - Industries section

3. Update component files to use Next.js Image component:
   ```tsx
   import Image from "next/image";
   
   <Image
     src="/images/hero-ship-sea.png"
     alt="Cargo ship at sea"
     fill
     className="object-cover"
   />
   ```

## Color Scheme

The website uses these colors (defined in `tailwind.config.ts`):

- **Primary Blue**: `#0D47A1` - Main brand color
- **Accent Gold**: `#FFC107` - CTA buttons, highlights
- **Neutral Dark**: `#212121` - Text
- **Background**: `#FEFEFE` - Page background
- **Beige**: `#F5F5DC` - Service cards

## Font

The website uses **Poppins** font from Google Fonts, already configured in `app/layout.tsx`.

## Testing Forms

### Contact Form
- Navigate to the footer section (#contact)
- Fill out the form
- Submit - should receive success message
- Check MongoDB for new entry
- Check admin email for notification

### Shipment Reservation
- Navigate to `/reservation` page
- Fill out all required fields
- Submit - should receive success message
- Check MongoDB for new entry
- Check admin email for notification

### Cargo Tracking
- Navigate to #tracking section
- Enter a booking number from a previous reservation
- Submit - should show tracking information

## Production Deployment

### Environment Variables for Production

Make sure to set these in your hosting platform:

- `MONGODB_URI` - Production MongoDB connection
- `RESEND_API_KEY` - Resend API key
- `ADMIN_EMAIL` - Admin email for notifications
- `NEXT_PUBLIC_SITE_URL` - Your production URL

### Build Command

```bash
npm run build
npm start
```

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB is running (if local)
- Check connection string format
- Ensure network access (for Atlas)

### Email Not Sending
- Verify Resend API key is correct
- Check Resend dashboard for errors
- Ensure ADMIN_EMAIL is set

### Images Not Showing
- Verify images are in `public/images/` directory
- Check file paths in components
- Ensure Next.js Image component is used correctly

## Next Steps

1. Add actual images to `public/images/`
2. Update image paths in components
3. Customize content in components
4. Set up admin CMS panel (future enhancement)
5. Add authentication for admin access
6. Deploy to production

