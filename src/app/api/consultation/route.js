import { NextResponse } from "next/server";
import * as postmark from "postmark";

export async function POST(req) {
    try {
        const body = await req.json();

        // Honeypot spam check
        if (body.taxNumber && body.taxNumber.trim() !== "") {
            return NextResponse.json({ success: true });
        }

        const {
            name,
            email,
            phone,
            projectType,
            preferredDay,
            preferredTime,
            message,
        } = body;

        if (!process.env.POSTMARK_API_KEY || !process.env.POSTMARK_FROM_EMAIL) {
            console.error("Missing Postmark environment variables");
            return NextResponse.json(
                { error: "Email service not configured" },
                { status: 500 }
            );
        }

        const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

        // Send email to you
        await client.sendEmail({
            From: process.env.POSTMARK_FROM_EMAIL,
            To: process.env.POSTMARK_TO_EMAIL,
            Subject: `Consultation Booking Request – ${name}`,
            HtmlBody: `
                <h2>New Consultation Booking Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <p><strong>Preferred Day:</strong> ${preferredDay}</p>
                <p><strong>Preferred Time:</strong> ${preferredTime}</p>
                <p><strong>Message:</strong><br>${message}</p>
            `,
        });

        // Auto-confirmation email to the user
        await client.sendEmail({
            From: "support@codestudioworks.com",
            To: email,
            Subject: "Your Consultation Request Has Been Received",
            HtmlBody: `
                <p>Hi ${name},</p>
                <p>Thank you for booking a consultation! I will confirm your selected date and time shortly.</p>
                <p>Looking forward to speaking with you.</p>
                <br>
                <p>— Ryno from CodeStudioWorks</p>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Consultation API Error:", err);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
