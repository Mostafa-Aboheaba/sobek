# Sobek Shipping Agency Website

A modern, full-stack website for Sobek Shipping Agency, the exclusive agent of Right Line - Russian Shipping Line. Built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB.

## Features

- 🚢 **Company Website**: Beautiful, responsive design matching the Figma design
- 📦 **Shipment Reservations**: Customers can reserve cargo space on ships
- 📧 **Contact Forms**: Contact form with email notifications
- 🔍 **Cargo Tracking**: Track shipments by booking number
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
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/sobek
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sobek

   RESEND_API_KEY=your_resend_api_key_here
   ADMIN_EMAIL=admin@sobekegy.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
sobek_v2/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form endpoint
│   │   └── shipment-reservations/  # Reservation endpoints
│   ├── reservation/       # Reservation page
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
│   └── ShipmentReservationForm.tsx
├── lib/                   # Utility libraries
│   └── mongodb.ts         # MongoDB connection
├── models/                # Mongoose models
│   ├── ShipmentReservation.ts
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

## Database Models

### ShipmentReservation
- Booking number, customer info, origin/destination, cargo details, preferred date, status

### ContactSubmission
- Name, email, phone, address, requests, help options, status

### Content
- CMS model for dynamic content management (section, key, content, type)

## Adding Images

Place your images in the `public/images/` directory. The design expects:
- Hero section background image
- About Sobek ship image
- Right Line containers image
- Tracking section image
- Industries section image

Update the image paths in the respective components.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

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

For questions or support, contact: info@sobekegy.com
