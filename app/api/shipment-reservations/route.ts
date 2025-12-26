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

    // Send email notification to admin
    const resend = getResend();
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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sobekegy.com';
    const logoUrl = `${siteUrl}/logo/sobek.png`;
    
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
      const customEmail = process.env.RESEND_FROM_EMAIL;
      if (customEmail) {
        return customEmail;
      }
      return "noreply@sobek-egy.com";
    };

    // Email 1: Send confirmation to customer (only if email provided)
    if (resend && customerEmail) {
      try {
        let fromEmail = getFromEmail();
        
        try {
          await resend.emails.send({
            from: fromEmail,
            to: customerEmail,
            subject: `Cargo Tracking Request Received - ${escapeHtml(bookingNumber)}`,
            html: `
              <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">
                <!-- Header with Logo -->
                <div style="background: linear-gradient(135deg, #2A478B 0%, #1a3366 100%); padding: 30px 20px; text-align: center;">
                  <img src="${logoUrl}" alt="Sobek Shipping Agency" style="max-width: 200px; height: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto;" />
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
                  <!-- Header with Logo -->
                  <div style="background: linear-gradient(135deg, #2A478B 0%, #1a3366 100%); padding: 30px 20px; text-align: center;">
                    <img src="${logoUrl}" alt="Sobek Shipping Agency" style="max-width: 200px; height: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto;" />
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
