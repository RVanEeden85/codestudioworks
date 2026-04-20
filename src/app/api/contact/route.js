import { NextResponse } from "next/server";
import * as postmark from "postmark";

export async function POST(request) {
    try {
        const { name, email, tel, message } = await request.json();

        // Validate fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (
            !process.env.POSTMARK_API_KEY ||
            !process.env.POSTMARK_FROM_EMAIL ||
            !process.env.POSTMARK_TO_EMAIL
        ) {
            console.error("Missing Postmark environment variables");
            return NextResponse.json(
                { error: "Email service not configured" },
                { status: 500 }
            );
        }

        // Postmark client
        const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

        // Send email
        await client.sendEmail({
            From: process.env.POSTMARK_FROM_EMAIL,
            To: process.env.POSTMARK_TO_EMAIL,
            Subject: `New Contact Form Submission from ${name}`,
            TextBody: `
A new message was submitted through the CodeStudioWorks contact form:

Name: ${name}
Email: ${email}
Phone: ${tel || "Not provided"}

Message:
${message}
            `,
            MessageStream: "outbound",
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Postmark error:", err);
        return NextResponse.json(
            { error: "Email failed to send" },
            { status: 500 }
        );
    }
}
