import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
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
    const body = await request.json();
    const { name, phone, email, address, company, subject, message, helpOption } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let submission = null;
    
    // Try to save to database (optional - don't fail if DB is not available)
    if (process.env.MONGODB_URI) {
      try {
        await connectDB();
        submission = await ContactSubmission.create({
          name,
          phone,
          email,
          address: address || company || "",
          requests: message || subject || "",
          helpOptions: helpOption ? (typeof helpOption === 'string' ? helpOption.split(',').map(s => s.trim()) : [helpOption]) : [],
          status: "new",
        });
      } catch (dbError: any) {
        // Silently continue - database is optional
        console.debug("Database not available (optional):", dbError.message);
      }
    }

    // Send TWO emails:
    // 1. Admin email (to Sobek) with customer details
    // 2. Confirmation email (to customer) thanking them
    
    const resend = getResend();
    const adminEmail = process.env.ADMIN_EMAIL || "mostafa.khalile.aboheaba@gmail.com";
    let adminEmailSent = false;
    let customerEmailSent = false;
    let emailError = null;
    
    // Helper function to escape HTML
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br/>') : '';
    const safeHelpOption = helpOption ? escapeHtml(helpOption) : '';
    
    // Get from email (with fallback)
    const getFromEmail = () => {
      const customEmail = process.env.RESEND_FROM_EMAIL;
      if (customEmail) {
        return customEmail;
      }
      return "onboarding@resend.dev";
    };
    
    if (resend) {
      // Email 1: Send to Sobek (Admin) with customer details
      try {
        let fromEmail = getFromEmail();
        console.log(`Sending admin email to: ${adminEmail}`);
        console.log(`From email: ${fromEmail}`);
        
        let adminResult;
        try {
          adminResult = await resend.emails.send({
            from: fromEmail,
            to: adminEmail,
            reply_to: email, // So Sobek can reply directly to customer
            subject: `New Contact Form Submission from ${escapeHtml(name)}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2A478B; border-bottom: 2px solid #2A478B; padding-bottom: 10px;">New Contact Form Submission</h2>
                
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 8px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                  <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
                  ${address || company ? `<p style="margin: 8px 0;"><strong>Address:</strong> ${escapeHtml(address || company || "")}</p>` : ""}
                  ${safeMessage ? `<p style="margin: 8px 0;"><strong>Message:</strong><br/>${safeMessage}</p>` : ""}
                  ${safeHelpOption ? `<p style="margin: 8px 0;"><strong>Help Needed With:</strong> ${safeHelpOption}</p>` : ""}
                </div>
                
                <p style="color: #666; font-size: 12px; margin-top: 20px;">
                  This email was sent from the Sobek Shipping Agency contact form.
                </p>
              </div>
            `,
          });
          
          if (adminResult.error) {
            throw new Error(adminResult.error.message || 'Admin email sending failed');
          }
          
          console.log("Admin email sent successfully");
          adminEmailSent = true;
        } catch (domainError: any) {
          if (domainError.message?.includes('not verified') || domainError.error?.message?.includes('not verified')) {
            console.warn(`Domain ${fromEmail} not verified. Falling back to onboarding@resend.dev`);
            fromEmail = "onboarding@resend.dev";
            
            adminResult = await resend.emails.send({
              from: fromEmail,
              to: adminEmail,
              reply_to: email,
              subject: `New Contact Form Submission from ${escapeHtml(name)}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #2A478B; border-bottom: 2px solid #2A478B; padding-bottom: 10px;">New Contact Form Submission</h2>
                  
                  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 8px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
                    <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                    <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
                    ${address || company ? `<p style="margin: 8px 0;"><strong>Address:</strong> ${escapeHtml(address || company || "")}</p>` : ""}
                    ${safeMessage ? `<p style="margin: 8px 0;"><strong>Message:</strong><br/>${safeMessage}</p>` : ""}
                    ${safeHelpOption ? `<p style="margin: 8px 0;"><strong>Help Needed With:</strong> ${safeHelpOption}</p>` : ""}
                  </div>
                  
                  <p style="color: #666; font-size: 12px; margin-top: 20px;">
                    This email was sent from the Sobek Shipping Agency contact form.
                  </p>
                </div>
              `,
            });
            
            console.log("Admin email sent successfully with fallback domain");
            adminEmailSent = true;
          } else {
            throw domainError;
          }
        }
      } catch (adminEmailError: any) {
        console.error("Failed to send admin email:", adminEmailError);
        emailError = adminEmailError.message || adminEmailError.toString();
      }

      // Email 2: Send confirmation email to customer
      try {
        let fromEmail = getFromEmail();
        console.log(`Sending confirmation email to customer: ${email}`);
        
        let customerResult;
        try {
          customerResult = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: `Thank You for Contacting Sobek Shipping Agency`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #2A478B; margin: 0;">Thank You, ${escapeHtml(name)}!</h1>
                </div>
                
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="font-size: 16px; line-height: 1.6; color: #333;">
                    We have received your message and appreciate you reaching out to Sobek Shipping Agency.
                  </p>
                  
                  <p style="font-size: 16px; line-height: 1.6; color: #333;">
                    Our team will review your inquiry and get back to you very soon. We typically respond within 24 hours.
                  </p>
                  
                  ${safeHelpOption ? `
                    <div style="margin: 20px 0; padding: 15px; background-color: #e8f4f8; border-left: 4px solid #2A478B; border-radius: 4px;">
                      <p style="margin: 0; font-weight: bold; color: #2A478B;">Your Inquiry:</p>
                      <p style="margin: 5px 0 0 0; color: #333;">${safeHelpOption}</p>
                    </div>
                  ` : ""}
                </div>
                
                <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
                  <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Best regards,</strong></p>
                  <p style="margin: 5px 0; color: #666; font-size: 14px;">Sobek Shipping Agency Team</p>
                  <p style="margin: 5px 0; color: #666; font-size: 14px;">Phone: +201016078688</p>
                  <p style="margin: 5px 0; color: #666; font-size: 14px;">Email: cs@sobekegy.com</p>
                </div>
                
                <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
                  This is an automated confirmation email. Please do not reply to this message.
                </p>
              </div>
            `,
          });
          
          if (customerResult.error) {
            throw new Error(customerResult.error.message || 'Customer email sending failed');
          }
          
          console.log("Customer confirmation email sent successfully");
          customerEmailSent = true;
        } catch (domainError: any) {
          if (domainError.message?.includes('not verified') || domainError.error?.message?.includes('not verified')) {
            console.warn(`Domain ${fromEmail} not verified. Falling back to onboarding@resend.dev`);
            fromEmail = "onboarding@resend.dev";
            
            customerResult = await resend.emails.send({
              from: fromEmail,
              to: email,
              subject: `Thank You for Contacting Sobek Shipping Agency`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2A478B; margin: 0;">Thank You, ${escapeHtml(name)}!</h1>
                  </div>
                  
                  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                      We have received your message and appreciate you reaching out to Sobek Shipping Agency.
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                      Our team will review your inquiry and get back to you very soon. We typically respond within 24 hours.
                    </p>
                    
                    ${safeHelpOption ? `
                      <div style="margin: 20px 0; padding: 15px; background-color: #e8f4f8; border-left: 4px solid #2A478B; border-radius: 4px;">
                        <p style="margin: 0; font-weight: bold; color: #2A478B;">Your Inquiry:</p>
                        <p style="margin: 5px 0 0 0; color: #333;">${safeHelpOption}</p>
                      </div>
                    ` : ""}
                  </div>
                  
                  <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
                    <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Best regards,</strong></p>
                    <p style="margin: 5px 0; color: #666; font-size: 14px;">Sobek Shipping Agency Team</p>
                    <p style="margin: 5px 0; color: #666; font-size: 14px;">Phone: +201016078688</p>
                    <p style="margin: 5px 0; color: #666; font-size: 14px;">Email: cs@sobekegy.com</p>
                  </div>
                  
                  <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
                    This is an automated confirmation email. Please do not reply to this message.
                  </p>
                </div>
              `,
            });
            
            console.log("Customer confirmation email sent successfully with fallback domain");
            customerEmailSent = true;
          } else {
            throw domainError;
          }
        }
      } catch (customerEmailError: any) {
        console.error("Failed to send customer confirmation email:", customerEmailError);
        // Don't fail if customer email fails, but log it
      }
    } else {
      console.warn("Resend API key not configured. Emails not sent.");
      emailError = "Resend API key not configured";
    }
    
    const emailSent = adminEmailSent || customerEmailSent;

    // Return success even if DB or email failed (at least we tried)
    return NextResponse.json(
      { 
        message: "Contact submission received successfully",
        submission,
        emailsSent: {
          admin: adminEmailSent,
          customer: customerEmailSent
        },
        emailError: emailError || null,
        note: adminEmailSent && customerEmailSent
          ? "Both emails sent successfully" 
          : adminEmailSent
            ? "Admin email sent, customer email failed"
            : customerEmailSent
              ? "Customer email sent, admin email failed"
              : emailError 
                ? `Emails not sent: ${emailError}` 
                : "Emails not sent (check configuration)"
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { 
        error: "Failed to submit contact form",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // For admin: get all submissions (should be protected in production)
    const submissions = await ContactSubmission.find()
      .sort({ createdAt: -1 })
      .limit(100);
    
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

