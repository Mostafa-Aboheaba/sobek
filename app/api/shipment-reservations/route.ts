import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ShipmentReservation from "@/models/ShipmentReservation";
import { Resend } from "resend";

// Lazy initialization to avoid build errors when API key is missing
const getResend = () => {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
};

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

    // Escape HTML for safe inclusion in emails
    const escapeHtml = (text: string) =>
      String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const preferredDateFormatted = new Date(preferredDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Styled HTML template for admin: New Shipment Reservation
    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#f0f0f0;">
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <div style="background: linear-gradient(135deg, #012C4E 0%, #2A478B 100%); padding: 28px 24px; text-align: center;">
      <p style="color: #ffffff; margin: 0 0 4px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">Sobek Shipping Agency</p>
      <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">New Cargo Reservation</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Reserve Your Cargo – submission received</p>
    </div>
    <div style="padding: 32px 28px;">
      <p style="color: #333; font-size: 15px; margin: 0 0 20px 0;">A new cargo space reservation has been submitted from your website.</p>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden;">
        <tr style="background-color: #f8f9fa;"><td style="padding: 12px 16px; font-weight: 600; color: #012C4E; width: 42%;">Booking number</td><td style="padding: 12px 16px; color: #333;">${escapeHtml(bookingNumber)}</td></tr>
        <tr><td style="padding: 12px 16px; font-weight: 600; color: #555;">Customer name</td><td style="padding: 12px 16px; color: #333;">${escapeHtml(customerName)}</td></tr>
        <tr style="background-color: #f8f9fa;"><td style="padding: 12px 16px; font-weight: 600; color: #555;">Email</td><td style="padding: 12px 16px;"><a href="mailto:${escapeHtml(customerEmail)}" style="color: #2A478B; text-decoration: none;">${escapeHtml(customerEmail)}</a></td></tr>
        <tr><td style="padding: 12px 16px; font-weight: 600; color: #555;">Phone</td><td style="padding: 12px 16px;"><a href="tel:${escapeHtml(customerPhone)}" style="color: #2A478B; text-decoration: none;">${escapeHtml(customerPhone)}</a></td></tr>
        <tr style="background-color: #f8f9fa;"><td style="padding: 12px 16px; font-weight: 600; color: #555;">Origin</td><td style="padding: 12px 16px; color: #333;">${escapeHtml(origin)}</td></tr>
        <tr><td style="padding: 12px 16px; font-weight: 600; color: #555;">Destination</td><td style="padding: 12px 16px; color: #333;">${escapeHtml(destination)}</td></tr>
        <tr style="background-color: #f8f9fa;"><td style="padding: 12px 16px; font-weight: 600; color: #555;">Cargo type</td><td style="padding: 12px 16px; color: #333;">${escapeHtml(cargoType)}</td></tr>
        ${cargoWeight ? `<tr><td style="padding: 12px 16px; font-weight: 600; color: #555;">Weight</td><td style="padding: 12px 16px; color: #333;">${escapeHtml(String(cargoWeight))}</td></tr>` : ""}
        ${cargoDescription ? `<tr style="background-color: #f8f9fa;"><td style="padding: 12px 16px; font-weight: 600; color: #555;">Description</td><td style="padding: 12px 16px; color: #333;">${escapeHtml(cargoDescription)}</td></tr>` : ""}
        <tr${!cargoDescription ? ' style="background-color: #f8f9fa;"' : ""}><td style="padding: 12px 16px; font-weight: 600; color: #555;">Preferred date</td><td style="padding: 12px 16px; color: #333;">${escapeHtml(preferredDateFormatted)}</td></tr>
      </table>
      <p style="color: #666; font-size: 13px; margin: 20px 0 0 0;">Please follow up with the customer to confirm the reservation and provide further details.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 16px 28px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="color: #999; font-size: 12px; margin: 0;">Sobek Shipping Agency · This email was sent from your website reservation form.</p>
    </div>
  </div>
</body>
</html>`;

    // Send email notification to admin
    const resend = getResend();
    if (process.env.ADMIN_EMAIL && resend) {
      try {
        await resend.emails.send({
          from: "noreply@sobek-egy.com",
          to: process.env.ADMIN_EMAIL,
          subject: `New Shipment Reservation - ${bookingNumber}`,
          html: adminEmailHtml,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request if email fails
      }
    }

    // Send styled confirmation email to customer
    if (resend && customerEmail) {
      try {
        const customerConfirmationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#f0f0f0;">
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <div style="background: linear-gradient(135deg, #2A478B 0%, #1a3366 100%); padding: 30px 20px; text-align: center;">
      <p style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">Sobek Shipping Agency</p>
    </div>
    <div style="padding: 40px 30px;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h1 style="color: #012C4E; margin: 0 0 10px 0; font-size: 26px; font-weight: 600;">Reservation Received</h1>
        <p style="color: #666; margin: 0; font-size: 16px;">Booking reference: ${escapeHtml(bookingNumber)}</p>
      </div>
      <div style="background-color: #FAF7F0; padding: 24px; border-radius: 8px; margin: 0 0 24px 0; border: 1px solid #e9ecef;">
        <p style="font-size: 16px; line-height: 1.7; color: #333; margin: 0 0 16px 0;">Dear ${escapeHtml(customerName)},</p>
        <p style="font-size: 16px; line-height: 1.7; color: #333; margin: 0 0 20px 0;">Thank you for reserving cargo space with Sobek Shipping Agency. We have received your reservation and will contact you shortly to confirm details and provide further information.</p>
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #A6823A; border-radius: 4px;">
          <p style="margin: 0 0 10px 0; font-weight: 600; color: #012C4E; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Reservation summary</p>
          <p style="margin: 6px 0; color: #333; font-size: 15px;"><strong>Booking number:</strong> ${escapeHtml(bookingNumber)}</p>
          <p style="margin: 6px 0; color: #333; font-size: 15px;"><strong>Route:</strong> ${escapeHtml(origin)} → ${escapeHtml(destination)}</p>
          <p style="margin: 6px 0; color: #333; font-size: 15px;"><strong>Cargo:</strong> ${escapeHtml(cargoType)}${cargoWeight ? ` · ${escapeHtml(String(cargoWeight))}` : ""}</p>
          <p style="margin: 6px 0; color: #333; font-size: 15px;"><strong>Preferred date:</strong> ${escapeHtml(preferredDateFormatted)}</p>
        </div>
        <p style="font-size: 15px; line-height: 1.7; color: #555; margin: 20px 0 0 0;">If you have any questions in the meantime, please contact us.</p>
      </div>
      <div style="border-top: 2px solid #e9ecef; padding-top: 24px;">
        <p style="margin: 0 0 8px 0; color: #333; font-size: 15px; font-weight: 600;">Best regards,</p>
        <p style="margin: 0 0 16px 0; color: #2A478B; font-size: 16px; font-weight: 600;">Sobek Shipping Agency</p>
        <div style="background-color: #f8f9fa; padding: 14px; border-radius: 6px;">
          <p style="margin: 6px 0; color: #555; font-size: 14px;"><strong>Phone:</strong> <a href="tel:+201016078688" style="color: #2A478B; text-decoration: none;">+20 10 1607 8688</a></p>
          <p style="margin: 6px 0; color: #555; font-size: 14px;"><strong>Email:</strong> <a href="mailto:info@sobek-egy.com" style="color: #2A478B; text-decoration: none;">info@sobek-egy.com</a></p>
        </div>
      </div>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="color: #999; font-size: 12px; margin: 0; line-height: 1.6;">This is an automated confirmation. For inquiries, contact <a href="mailto:info@sobek-egy.com" style="color: #2A478B; text-decoration: none;">info@sobek-egy.com</a></p>
    </div>
  </div>
</body>
</html>`;
        await resend.emails.send({
          from: "noreply@sobek-egy.com",
          to: customerEmail,
          subject: `Cargo reservation received – ${bookingNumber}`,
          html: customerConfirmationHtml,
        });
      } catch (customerEmailError) {
        console.error("Failed to send customer confirmation email:", customerEmailError);
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
    const { searchParams } = new URL(request.url);
    const bookingNumber = searchParams.get("bookingNumber");
    const contactInfo = searchParams.get("contactInfo"); // Email or phone

    if (!bookingNumber) {
      return NextResponse.json(
        { error: "Booking number is required" },
        { status: 400 }
      );
    }

    if (!contactInfo) {
      return NextResponse.json(
        { error: "Contact information (email or phone) is required" },
        { status: 400 }
      );
    }

    // Extract customer email from contactInfo
    const customerEmail = contactInfo.includes('@') ? contactInfo : null;
    const customerPhone = contactInfo.includes('@') ? null : contactInfo;

    const resend = getResend();
    const adminEmail = "info@sobek-egy.com";
    
    // Helper function to escape HTML
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const getFromEmail = () => {
      // Always use noreply@sobek-egy.com (fix any typos in env vars)
      const customEmail = process.env.RESEND_FROM_EMAIL;
      if (customEmail) {
        // Fix common typos: noreloy -> noreply, noreoly -> noreply
        const fixedEmail = customEmail.replace(/noreloy|noreoly/gi, 'noreply');
        if (fixedEmail.includes('noreply')) {
          return fixedEmail;
        }
      }
      // Default to correct email address
      return "noreply@sobek-egy.com";
    };

    // Email 1: Send confirmation to customer (only if email provided)
    if (resend && customerEmail) {
      try {
        let fromEmail = getFromEmail();
        console.log(`Sending customer email from: ${fromEmail}`);
        
        try {
          await resend.emails.send({
            from: fromEmail,
            to: customerEmail,
            subject: `Cargo Tracking Request Received - ${escapeHtml(bookingNumber)}`,
            html: `
              <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #2A478B 0%, #1a3366 100%); padding: 30px 20px; text-align: center;">
                  <p style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">Sobek Shipping Agency</p>
                </div>
                
                <!-- Main Content -->
                <div style="padding: 40px 30px;">
                  <div style="text-align: center; margin-bottom: 35px;">
                    <h1 style="color: #2A478B; margin: 0 0 10px 0; font-size: 28px; font-weight: 600;">Tracking Request Received</h1>
                    <p style="color: #666; margin: 0; font-size: 16px;">Booking Number: ${escapeHtml(bookingNumber)}</p>
                  </div>
                  
                  <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #e9ecef;">
                    <p style="font-size: 16px; line-height: 1.8; color: #333; margin: 0 0 15px 0;">
                      Dear Valued Customer,
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.8; color: #333; margin: 0 0 20px 0;">
                      Thank you for tracking your shipment with Sobek Shipping Agency. We have received your tracking request for booking number <strong>${escapeHtml(bookingNumber)}</strong>.
                    </p>
                    
                    <div style="background-color: #e8f4f8; padding: 20px; border-left: 4px solid #2A478B; border-radius: 4px; margin: 20px 0;">
                      <p style="margin: 0 0 12px 0; font-weight: 600; color: #2A478B; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Your Request</p>
                      <p style="margin: 8px 0; color: #333; font-size: 15px;"><strong>Booking Number:</strong> ${escapeHtml(bookingNumber)}</p>
                      ${customerPhone ? `<p style="margin: 8px 0; color: #333; font-size: 15px;"><strong>Contact Phone:</strong> ${escapeHtml(customerPhone)}</p>` : ""}
                    </div>
                    
                    <p style="font-size: 16px; line-height: 1.8; color: #333; margin: 20px 0 0 0;">
                      Our team is currently processing your tracking request and will send you the latest update on your shipment status shortly. We typically respond within 24 hours during business days.
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.8; color: #333; margin: 15px 0 0 0;">
                      If you have any urgent questions or concerns, please don't hesitate to contact us directly.
                    </p>
                  </div>
                  
                  <!-- Contact Information -->
                  <div style="border-top: 2px solid #e9ecef; padding-top: 25px; margin-top: 35px;">
                    <p style="margin: 0 0 12px 0; color: #333; font-size: 15px; font-weight: 600;">Best regards,</p>
                    <p style="margin: 0 0 20px 0; color: #2A478B; font-size: 16px; font-weight: 600;">Sobek Shipping Agency Team</p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 20px;">
                      <p style="margin: 8px 0; color: #555; font-size: 14px;">
                        <strong style="color: #333;">Phone:</strong> 
                        <a href="tel:+201016078688" style="color: #2A478B; text-decoration: none;">+20 10 1607 8688</a>
                      </p>
                      <p style="margin: 8px 0; color: #555; font-size: 14px;">
                        <strong style="color: #333;">Email:</strong> 
                        <a href="mailto:info@sobek-egy.com" style="color: #2A478B; text-decoration: none;">info@sobek-egy.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                  <p style="color: #999; font-size: 12px; margin: 0; line-height: 1.6;">
                    This is an automated confirmation email. Please do not reply to this message.<br/>
                    For inquiries, please contact us at <a href="mailto:info@sobek-egy.com" style="color: #2A478B; text-decoration: none;">info@sobek-egy.com</a>
                  </p>
                </div>
              </div>
            `,
          });
        } catch (domainError: any) {
          if (domainError.message?.includes('not verified') || domainError.error?.message?.includes('not verified')) {
            console.warn(`Domain ${fromEmail} not verified. Falling back to noreply@sobek-egy.com`);
            fromEmail = "noreply@sobek-egy.com";
            
            await resend.emails.send({
              from: fromEmail,
              to: customerEmail,
              subject: `Cargo Tracking Request Received - ${escapeHtml(bookingNumber)}`,
              html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">
                  <!-- Header -->
                  <div style="background: linear-gradient(135deg, #2A478B 0%, #1a3366 100%); padding: 30px 20px; text-align: center;">
                    <p style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">Sobek Shipping Agency</p>
                  </div>
                  
                  <!-- Main Content -->
                  <div style="padding: 40px 30px;">
                    <div style="text-align: center; margin-bottom: 35px;">
                      <h1 style="color: #2A478B; margin: 0 0 10px 0; font-size: 28px; font-weight: 600;">Tracking Request Received</h1>
                      <p style="color: #666; margin: 0; font-size: 16px;">Booking Number: ${escapeHtml(bookingNumber)}</p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #e9ecef;">
                      <p style="font-size: 16px; line-height: 1.8; color: #333; margin: 0 0 15px 0;">
                        Dear Valued Customer,
                      </p>
                      
                      <p style="font-size: 16px; line-height: 1.8; color: #333; margin: 0 0 20px 0;">
                        Thank you for tracking your shipment with Sobek Shipping Agency. We have received your tracking request for booking number <strong>${escapeHtml(bookingNumber)}</strong>.
                      </p>
                      
                      <div style="background-color: #e8f4f8; padding: 20px; border-left: 4px solid #2A478B; border-radius: 4px; margin: 20px 0;">
                        <p style="margin: 0 0 12px 0; font-weight: 600; color: #2A478B; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Your Request</p>
                        <p style="margin: 8px 0; color: #333; font-size: 15px;"><strong>Booking Number:</strong> ${escapeHtml(bookingNumber)}</p>
                        ${customerPhone ? `<p style="margin: 8px 0; color: #333; font-size: 15px;"><strong>Contact Phone:</strong> ${escapeHtml(customerPhone)}</p>` : ""}
                      </div>
                      
                      <p style="font-size: 16px; line-height: 1.8; color: #333; margin: 20px 0 0 0;">
                        Our team is currently processing your tracking request and will send you the latest update on your shipment status shortly. We typically respond within 24 hours during business days.
                      </p>
                      
                      <p style="font-size: 16px; line-height: 1.8; color: #333; margin: 15px 0 0 0;">
                        If you have any urgent questions or concerns, please don't hesitate to contact us directly.
                      </p>
                    </div>
                    
                    <!-- Contact Information -->
                    <div style="border-top: 2px solid #e9ecef; padding-top: 25px; margin-top: 35px;">
                      <p style="margin: 0 0 12px 0; color: #333; font-size: 15px; font-weight: 600;">Best regards,</p>
                      <p style="margin: 0 0 20px 0; color: #2A478B; font-size: 16px; font-weight: 600;">Sobek Shipping Agency Team</p>
                      
                      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 20px;">
                        <p style="margin: 8px 0; color: #555; font-size: 14px;">
                          <strong style="color: #333;">Phone:</strong> 
                          <a href="tel:+201016078688" style="color: #2A478B; text-decoration: none;">+20 10 1607 8688</a>
                        </p>
                        <p style="margin: 8px 0; color: #555; font-size: 14px;">
                          <strong style="color: #333;">Email:</strong> 
                          <a href="mailto:info@sobek-egy.com" style="color: #2A478B; text-decoration: none;">info@sobek-egy.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Footer -->
                  <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="color: #999; font-size: 12px; margin: 0; line-height: 1.6;">
                      This is an automated confirmation email. Please do not reply to this message.<br/>
                      For inquiries, please contact us at <a href="mailto:info@sobek-egy.com" style="color: #2A478B; text-decoration: none;">info@sobek-egy.com</a>
                    </p>
                  </div>
                </div>
              `,
            });
          } else {
            throw domainError;
          }
        }
      } catch (emailError) {
        console.error("Failed to send customer confirmation email:", emailError);
        // Don't fail the request if email fails
      }
    }

    // Email 2: Notify admin about tracking request
    if (resend) {
      try {
        await resend.emails.send({
          from: getFromEmail(),
          to: adminEmail,
          reply_to: customerEmail || undefined,
          subject: `Cargo Tracking Request - ${escapeHtml(bookingNumber)}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2A478B; border-bottom: 2px solid #2A478B; padding-bottom: 10px;">Cargo Tracking Request</h2>
              
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 8px 0;"><strong>Booking Number:</strong> ${escapeHtml(bookingNumber)}</p>
                ${customerEmail ? `<p style="margin: 8px 0;"><strong>Customer Email:</strong> <a href="mailto:${escapeHtml(customerEmail)}">${escapeHtml(customerEmail)}</a></p>` : ""}
                ${customerPhone ? `<p style="margin: 8px 0;"><strong>Customer Phone:</strong> <a href="tel:${escapeHtml(customerPhone)}">${escapeHtml(customerPhone)}</a></p>` : ""}
                <p style="margin: 8px 0;"><strong>Contact Info:</strong> ${escapeHtml(contactInfo)}</p>
              </div>
              
              <p style="color: #666; font-size: 12px; margin-top: 20px;">
                A customer has requested tracking information for booking number ${escapeHtml(bookingNumber)}. Please process this request and provide them with the latest shipment status.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send admin email:", emailError);
      }
    }

    // Return success response
    return NextResponse.json({
      message: "Tracking request received successfully",
      bookingNumber: bookingNumber,
      status: "pending",
      note: customerEmail 
        ? "Confirmation email sent to customer" 
        : "Admin notification sent. Customer will be contacted via phone."
    });
  } catch (error) {
    console.error("Error processing tracking request:", error);
    return NextResponse.json(
      { error: "Failed to process tracking request" },
      { status: 500 }
    );
  }
}
