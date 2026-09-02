import { NextResponse } from "next/server";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid business email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = result.data;

    console.log("[FLUX Newsletter Subscription]", {
      email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to FLUX Solutions Brief! Check your inbox for our latest component catalog updates.",
    });
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json(
      { success: false, message: "Subscription failed. Please try again later." },
      { status: 500 }
    );
  }
}
