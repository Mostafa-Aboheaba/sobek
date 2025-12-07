import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ShipmentReservation from "@/models/ShipmentReservation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      bookingNumber,
      customerName,
      customerEmail,
      customerPhone,
      origin,
      destination,
      cargoType,
      cargoWeight,
      cargoDescription,
      preferredDate,
    } = body;

    // Validate required fields
    if (
      !bookingNumber ||
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !origin ||
      !destination ||
      !cargoType ||
      !preferredDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create reservation
    const reservation = await ShipmentReservation.create({
      bookingNumber,
      customerName,
      customerEmail,
      customerPhone,
      origin,
      destination,
      cargoType,
      cargoWeight,
      cargoDescription,
      preferredDate: new Date(preferredDate),
      status: "pending",
    });

    // Send email notification to admin
    if (process.env.ADMIN_EMAIL && resend) {
      try {
        await resend.emails.send({
          from: "noreply@sobekegy.com",
          to: process.env.ADMIN_EMAIL,
          subject: `New Shipment Reservation - ${bookingNumber}`,
          html: `
            <h2>New Shipment Reservation</h2>
            <p><strong>Booking Number:</strong> ${bookingNumber}</p>
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Phone:</strong> ${customerPhone}</p>
            <p><strong>Origin:</strong> ${origin}</p>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Cargo Type:</strong> ${cargoType}</p>
            ${cargoWeight ? `<p><strong>Weight:</strong> ${cargoWeight}</p>` : ""}
            ${cargoDescription ? `<p><strong>Description:</strong> ${cargoDescription}</p>` : ""}
            <p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { message: "Reservation created successfully", reservation },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating reservation:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Booking number already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const bookingNumber = searchParams.get("bookingNumber");

    if (bookingNumber) {
      const reservation = await ShipmentReservation.findOne({ bookingNumber });
      if (!reservation) {
        return NextResponse.json(
          { error: "Reservation not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(reservation);
    }

    // For admin: get all reservations (should be protected in production)
    const reservations = await ShipmentReservation.find()
      .sort({ createdAt: -1 })
      .limit(100);
    
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}

