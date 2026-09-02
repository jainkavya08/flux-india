import { NextResponse } from "next/server";
import { z } from "zod";

const bomSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid business email"),
  phone: z.string().min(8, "Phone number is required"),
  company: z.string().min(2, "Company / Panel shop name is required"),
  projectType: z.string().optional(),
  targetDate: z.string().optional(),
  partNumbers: z.string().min(5, "Please list at least a few component part numbers or specifications"),
  specialInstructions: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = bomSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const bomData = result.data;
    const refNumber = `BOM-${Date.now().toString().slice(-6)}`;

    console.log("[FLUX BOM Intake Received]", {
      refNumber,
      ...bomData,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      referenceNumber: refNumber,
      message: `Your BOM has been successfully queued for technical review. Ref: #${refNumber}. A consolidated line-item quote will be delivered to ${bomData.email} within 24 hours.`,
    });
  } catch (error) {
    console.error("BOM API error:", error);
    return NextResponse.json(
      { success: false, message: "Could not process BOM request. Please retry or WhatsApp your Excel sheet directly." },
      { status: 500 }
    );
  }
}
