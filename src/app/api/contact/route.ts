import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  requirement: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, company, requirement, message } = result.data;

    // Log the inquiry
    console.log("[FLUX Contact Form Submission]", {
      name,
      email,
      phone,
      company,
      requirement,
      message,
      timestamp: new Date().toISOString(),
    });

    // In production with Resend:
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        // dynamic import or fetch if key provided
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "FLUX Inquiries <onboarding@resend.dev>",
            to: ["sales@fluxindia.in"],
            subject: `New B2B Inquiry: ${company} (${name})`,
            html: `
              <h2>New Inquiry from FLUX Website</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Requirement:</strong> ${requirement || "General Inquiry"}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `,
          }),
        });
      } catch (err) {
        console.error("Resend delivery notice:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your inquiry has been received. Our engineering team will review and contact you within 24 hours.",
      referenceId: `FLX-INQ-${Date.now().toString().slice(-6)}`,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please reach out via WhatsApp or email directly." },
      { status: 500 }
    );
  }
}
