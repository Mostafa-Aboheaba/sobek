# Sobek Shipping Agency Website

A modern, full-stack website for Sobek Shipping Agency, the exclusive agent of Right Line - Russian Shipping Line. Built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB.

## Features

- 🚢 **Company Website**: Beautiful, responsive design matching the Figma design
- 📦 **Shipment Reservations**: Customers can reserve cargo space on ships
- 📧 **Contact Forms**: Contact form with email notifications
- 🔍 **Cargo Tracking**: Track shipments by booking number
- 📅 **Vessel Schedules**: Maersk/MSC-style schedule search — filter by origin/destination port and date; view sailings (Vessel, POL, POD, ETA, ETD). Admin CRUD via API.
- 🎨 **CMS Ready**: Database structure for dynamic content management
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Email**: Resend API
- **Font**: Poppins (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud like MongoDB Atlas)
- Resend API key (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mostafa-Aboheaba/sobek.git
   cd sobek
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory.  
   **Need a database?** Follow **[MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)** to get a free MongoDB Atlas connection string, then add it below.

   ```env
   MONGODB_URI=mongodb://localhost:27017/sobek
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sobek

   RESEND_API_KEY=your_resend_api_key_here
   ADMIN_EMAIL=admin@sobekegy.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Required for vessel schedules (Vercel): MongoDB must be set so API can store/fetch schedules.
   # For admin CRUD (POST/PUT/DELETE schedules), set a secret and send it in the x-admin-secret header.
   ADMIN_SECRET=your_admin_secret_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Testing the Schedules feature locally

1. Ensure `.env.local` has `MONGODB_URI` and `ADMIN_SECRET` (see [DEPLOYMENT.md](./DEPLOYMENT.md) for details).
2. Run `npm run dev`, then open [http://localhost:3000/schedule/](http://localhost:3000/schedule/) — use the **Schedules** tab to filter and view sailings.
3. Open [http://localhost:3000/admin/schedules/](http://localhost:3000/admin/schedules/) — enter your `ADMIN_SECRET` to create, edit, and delete schedules.
4. Optional: seed sample data with `ADMIN_SECRET=your_secret npm run seed:schedules` (with the dev server running).

For full step-by-step local testing and **production deployment (Vercel + MongoDB Atlas)**, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

## Project Structure

```
sobek_v2/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form endpoint
│   │   ├── schedules/     # Vessel schedules (GET list/filter, POST/PUT/DELETE admin)
│   │   └── shipment-reservations/  # Reservation endpoints
│   ├── reservation/       # Reservation page
│   ├── admin/
│   │   └── schedules/     # Admin CRUD for vessel schedules (secret-protected)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── AboutSobek.tsx
│   ├── WhyChooseSobek.tsx
│   ├── AboutRightLine.tsx
│   ├── OurServices.tsx
│   ├── FindYourCargo.tsx
│   ├── IndustriesWeServe.tsx
│   ├── Testimonials.tsx
│   ├── GetInTouch.tsx
│   ├── ShipmentReservationForm.tsx
│   └── ScheduleSearchCard.tsx   # Tracking & Schedules search (Maersk/MSC style)
├── lib/                   # Utility libraries
│   └── mongodb.ts         # MongoDB connection
├── models/                # Mongoose models
│   ├── ShipmentReservation.ts
│   ├── VesselSchedule.ts
│   ├── ContactSubmission.ts
│   └── Content.ts
└── public/                # Static assets
```

## API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contact` - Get all submissions (admin)

### Shipment Reservations
- **POST** `/api/shipment-reservations` - Create new reservation
- **GET** `/api/shipment-reservations` - Get all reservations (admin)
- **GET** `/api/shipment-reservations?bookingNumber=XXX` - Track by booking number

### Vessel Schedules (tracking & schedules module)
- **GET** `/api/schedules` - List/filter schedules (public). Query: `pol`, `pod`, `vesselName`, `dateFrom`, `dateTo`
- **POST** `/api/schedules` - Create schedule (admin: header `x-admin-secret`)
- **GET** `/api/schedules/[id]` - Get one schedule (public)
- **PUT** `/api/schedules/[id]` - Update schedule (admin: header `x-admin-secret`)
- **DELETE** `/api/schedules/[id]` - Delete schedule (admin: header `x-admin-secret`)

To seed sample data (dev server running): `ADMIN_SECRET=your_secret node scripts/seed-schedules.js`

## Database Models

### ShipmentReservation
- Booking number, customer info, origin/destination, cargo details, preferred date, status

### ContactSubmission
- Name, email, phone, address, requests, help options, status

### Content
- CMS model for dynamic content management (section, key, content, type)

### VesselSchedule
- Vessel name, POL (port of loading), POD (port of discharge), ETA, ETD (dates)
- Used by the Tracking & Schedules section on `/schedule`

## Adding Images

Place your images in the `public/images/` directory. The design expects:
- Hero section background image
- About Sobek ship image
- Right Line containers image
- Tracking section image
- Industries section image

Update the image paths in the respective components.

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for:

- Local testing steps for the schedules feature
- Production deployment on Vercel (env vars, MongoDB Atlas, and testing)

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - **MONGODB_URI** (required for vessel schedules and other DB features)
   - **ADMIN_SECRET** (optional; required for creating/editing/deleting schedules via API)
   - RESEND_API_KEY, ADMIN_EMAIL, etc. as needed
4. Deploy! Vercel does not use static export, so API routes (including `/api/schedules`) work. A small MongoDB database (e.g. MongoDB Atlas free tier) is enough for schedules and existing collections.

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Future Enhancements

- [ ] Admin CMS panel for content management
- [ ] User authentication for admin access
- [ ] Email templates for reservations
- [ ] Advanced tracking with real-time updates
- [ ] Multi-language support (RUS/EN)
- [ ] Blog/news section

## License

Private - Sobek Shipping Agency

## Contact

For questions or support, contact: info@sobek-egy.com
