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

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

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

        const rateLimit = consumeRateLimit("consultation", getRequestIp(request), {
            limit: 4,
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
        const phone = cleanText(body.phone, 50);
        const projectType = cleanText(body.projectType, 120);
        const preferredTime = cleanText(body.preferredTime, 120);
        const timeZone = cleanText(body.timeZone, 120);
        const message = cleanText(body.message, 5000, { multiline: true });

        if (
            !name ||
            !isValidEmail(email) ||
            !projectType ||
            !preferredTime ||
            !timeZone ||
            !message ||
            body.privacyAccepted !== true
        ) {
            return errorResponse("Please complete all required fields.", 400);
        }

        if (!isRequestStorageConfigured()) {
            console.error("Consultation storage is not configured");
            return errorResponse("Request storage not configured", 503);
        }

        const submission = await createRequestSubmission({
            type: "consultation",
            source: "consultation_modal",
            status: "new",
            name,
            email,
            phone,
            projectType,
            preferredTime,
            timeZone,
            message,
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
                Subject: `Consultation request from ${name}`,
                HtmlBody: `
                    <h2>New consultation request</h2>
                    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                    <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
                    <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
                    <p><strong>Preferred window:</strong> ${escapeHtml(preferredTime)}</p>
                    <p><strong>Timezone:</strong> ${escapeHtml(timeZone)}</p>
                    <p><strong>Project goal:</strong><br>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
                `,
                TextBody: [
                    "New consultation request",
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Phone: ${phone || "Not provided"}`,
                    `Project type: ${projectType}`,
                    `Preferred window: ${preferredTime}`,
                    `Timezone: ${timeZone}`,
                    "",
                    message,
                ].join("\n"),
                MessageStream: "outbound",
            });

            await client.sendEmail({
                From: process.env.POSTMARK_FROM_EMAIL,
                To: email,
                Subject: "CodeStudioWorks received your consultation request",
                HtmlBody: `<p>Hi ${escapeHtml(name)},</p><p>Thanks for getting in touch. I received your consultation request and will reply personally to confirm the next step.</p><p>— Ryno at CodeStudioWorks</p>`,
                TextBody: `Hi ${name},\n\nThanks for getting in touch. I received your consultation request and will reply personally to confirm the next step.\n\n— Ryno at CodeStudioWorks`,
                MessageStream: "outbound",
            });

            await updateRequestSubmissionEmailStatus(submission._id, "sent");
        } catch (emailError) {
            console.error("Postmark consultation notification failed:", emailError);
            await updateRequestSubmissionEmailStatus(submission._id, "failed");
        }

        return NextResponse.json({ success: true, requestId: submission._id.toString() });
    } catch (error) {
        console.error("Consultation request failed:", error);
        return errorResponse("Request failed to submit", 500);
    }
}
