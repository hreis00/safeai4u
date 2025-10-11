import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your project"),
  newsletter: z.boolean().default(false),
  consultation: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate random error for testing (remove in production)
    if (Math.random() < 0.2) {
      return NextResponse.json(
        { error: "Internal server error occurred" },
        { status: 500 }
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. etc.

    console.log("Contact form submission:", validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your inquiry. We'll respond within 24 hours.",
        id: `inquiry-${Date.now()}`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
