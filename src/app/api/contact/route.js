import { NextResponse } from "next/server";
import * as postmark from "postmark";
import {
    createRequestSubmission,
    isRequestStorageConfigured,
    updateRequestSubmissionEmailStatus,
} from "../../_lib/requestSubmissions";
import {
    cleanText,
    consumeRateLimit,
    getRequestIp,
    isSameOriginRequest,
    isValidEmail,
} from "../../_lib/formSecurity";

function getMissingPostmarkEnv() {
    return ["POSTMARK_API_KEY", "POSTMARK_FROM_EMAIL", "POSTMARK_TO_EMAIL"].filter(
        (key) => !process.env[key]
    );
}

function errorResponse(message, status, headers) {
    return NextResponse.json({ error: message }, { status, headers });
}

export async function POST(request) {
    try {
        if (!isSameOriginRequest(request)) {
            return errorResponse("Request origin not allowed", 403);
        }

        const rateLimit = consumeRateLimit("contact", getRequestIp(request), {
            limit: 6,
            windowMs: 10 * 60 * 1000,
        });

        if (!rateLimit.allowed) {
            return errorResponse("Too many requests. Please try again shortly.", 429, {
                "Retry-After": String(rateLimit.retryAfter),
            });
        }

        const body = await request.json();

        if (cleanText(body.website || body.taxNumber, 200)) {
            return NextResponse.json({ success: true });
        }

        const name = cleanText(body.name, 100);
        const email = cleanText(body.email, 254).toLowerCase();
        const tel = cleanText(body.tel || body.phone, 50);
        const message = cleanText(body.message, 5000, { multiline: true });
        const estimate = cleanText(body.estimate, 5000, { multiline: true });
        const source = cleanText(body.source, 80) || "contact_form";

        if (!name || !isValidEmail(email) || !message || body.privacyAccepted !== true) {
            return errorResponse("Please complete all required fields.", 400);
        }

        if (!isRequestStorageConfigured()) {
            console.error("Contact storage is not configured");
            return errorResponse("Request storage not configured", 503);
        }

        const submission = await createRequestSubmission({
            type: "contact",
            source,
            status: "new",
            name,
            email,
            phone: tel,
            message,
            estimate,
            privacyAcceptedAt: new Date(),
            consentVersion: "2026-09-14",
            emailStatus: "pending",
        });

        const missingEnv = getMissingPostmarkEnv();

        if (missingEnv.length > 0) {
            console.error(`Missing Postmark environment variables: ${missingEnv.join(", ")}`);
            await updateRequestSubmissionEmailStatus(submission._id, "not_configured");
            return NextResponse.json({ success: true, requestId: submission._id.toString() });
        }

        const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

        try {
            await client.sendEmail({
                From: process.env.POSTMARK_FROM_EMAIL,
                To: process.env.POSTMARK_TO_EMAIL,
                ReplyTo: email,
                Subject: `New CodeStudioWorks enquiry from ${name}`,
                TextBody: [
                    "A new enquiry was submitted through CodeStudioWorks.",
                    "",
                    `Source: ${source}`,
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Phone: ${tel || "Not provided"}`,
                    "",
                    "Message:",
                    message,
                    estimate ? `\nProject planner details:\n${estimate}` : "",
                ].join("\n"),
                MessageStream: "outbound",
            });

            await updateRequestSubmissionEmailStatus(submission._id, "sent");
        } catch (emailError) {
            console.error("Postmark contact notification failed:", emailError);
            await updateRequestSubmissionEmailStatus(submission._id, "failed");
        }

        return NextResponse.json({ success: true, requestId: submission._id.toString() });
    } catch (error) {
        console.error("Contact request failed:", error);
        return errorResponse("Request failed to submit", 500);
    }
}
