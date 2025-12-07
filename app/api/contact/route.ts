import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, phone, email, company, subject, message, helpOption } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create contact submission
    const submission = await ContactSubmission.create({
      name,
      phone,
      email,
      address: company || "",
      requests: message || subject || "",
      helpOptions: helpOption ? [helpOption] : [],
      status: "new",
    });

    // Send email notification to admin
    if (process.env.ADMIN_EMAIL && resend) {
      try {
        await resend.emails.send({
          from: "noreply@sobekegy.com",
          to: process.env.ADMIN_EMAIL,
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
            ${helpOption ? `<p><strong>Help Option:</strong> ${helpOption}</p>` : ""}
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { message: "Contact submission received successfully", submission },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
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

