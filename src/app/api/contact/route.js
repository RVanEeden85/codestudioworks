import crypto from "crypto";
import { NextResponse } from "next/server";
import { sendSubmissionEmails } from "../../_lib/emailService";
import {
    createRequestSubmission,
    isRequestStorageConfigured,
    updateRequestSubmissionEmailStatus,
} from "../../_lib/requestSubmissions";
import { consumeDurableRateLimit } from "../../_lib/requestRateLimit";
import {
    cleanText,
    getRequestIp,
    isSameOriginRequest,
    isValidEmail,
} from "../../_lib/formSecurity";
import { verifyTurnstileToken } from "../../_lib/turnstile";

function errorResponse(message, status, headers) {
    return NextResponse.json({ error: message }, { status, headers });
}

export async function POST(request) {
    try {
        if (!isSameOriginRequest(request)) {
            return errorResponse("Request origin not allowed", 403);
        }

        if (!isRequestStorageConfigured()) {
            console.error("Contact storage is not configured");
            return errorResponse("Request storage not configured", 503);
        }

        const requestIp = getRequestIp(request);
        const rateLimit = await consumeDurableRateLimit("contact", requestIp, {
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

        const source = cleanText(body.source, 80) || "contact_form";
        const type = source === "pricing_planner" ? "project_planner" : "contact";
        const turnstile = await verifyTurnstileToken({
            token: body.turnstileToken,
            remoteIp: requestIp,
            expectedAction: type,
        });

        if (!turnstile.success) {
            console.warn("Turnstile rejected contact request:", turnstile.errorCodes);
            return errorResponse("Please complete the security check and try again.", 400);
        }

        const name = cleanText(body.name, 100);
        const email = cleanText(body.email, 254).toLowerCase();
        const phone = cleanText(body.tel || body.phone, 50);
        const message = cleanText(body.message, 5000, { multiline: true });
        const estimate = cleanText(body.estimate, 5000, { multiline: true });
        const submittedId = cleanText(body.submissionId, 100);
        const submissionId = /^[a-zA-Z0-9-]{8,100}$/.test(submittedId)
            ? submittedId
            : crypto.randomUUID();

        if (!name || !isValidEmail(email) || !message || body.privacyAccepted !== true) {
            return errorResponse("Please complete all required fields.", 400);
        }

        const submission = await createRequestSubmission({
            submissionId,
            type,
            source,
            status: "new",
            name,
            email,
            phone,
            message,
            estimate,
            privacyAcceptedAt: new Date(),
            consentVersion: "2026-09-15",
            emailStatus: "pending",
        });

        if (!submission.created) {
            return NextResponse.json({
                success: true,
                requestId: submission._id.toString(),
                duplicate: true,
            });
        }

        const delivery = await sendSubmissionEmails(submission);
        await updateRequestSubmissionEmailStatus(submission._id, delivery.status, delivery);

        return NextResponse.json({
            success: true,
            requestId: submission._id.toString(),
        });
    } catch (error) {
        console.error("Contact request failed:", error?.message || error);
        return errorResponse("Request failed to submit", 500);
    }
}
