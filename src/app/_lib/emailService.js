import * as postmark from "postmark";
import {
    buildInternalSubmissionEmail,
    buildRequesterReceiptEmail,
} from "./emailTemplates";

const REQUIRED_ENV = ["POSTMARK_API_KEY", "POSTMARK_FROM_EMAIL", "POSTMARK_TO_EMAIL"];

function getMissingEnvironment() {
    return REQUIRED_ENV.filter((key) => !process.env[key]);
}

function safeError(error) {
    return {
        code: error?.code || error?.statusCode || "delivery_failed",
        message: "Email delivery failed",
    };
}

async function sendOne(client, message) {
    const result = await client.sendEmail({
        From: process.env.POSTMARK_FROM_EMAIL,
        MessageStream: process.env.POSTMARK_MESSAGE_STREAM || "outbound",
        ...message,
    });

    return { status: "sent", messageId: result.MessageID || "" };
}

export async function sendSubmissionEmails(submission, { only } = {}) {
    const missing = getMissingEnvironment();

    if (missing.length > 0) {
        console.error(`Transactional email is missing configuration: ${missing.join(", ")}`);
        return {
            status: "not_configured",
            owner: { status: "not_configured" },
            requester: { status: "not_configured" },
        };
    }

    const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
    const ownerTemplate = buildInternalSubmissionEmail(submission);
    const receiptTemplate = buildRequesterReceiptEmail(submission);
    const replyTo = process.env.POSTMARK_REPLY_TO_EMAIL || process.env.POSTMARK_TO_EMAIL;
    const jobs = [];

    if (!only || only.includes("owner")) {
        jobs.push({
            key: "owner",
            promise: sendOne(client, {
                To: process.env.POSTMARK_TO_EMAIL,
                ReplyTo: submission.email,
                Subject: ownerTemplate.subject,
                HtmlBody: ownerTemplate.html,
                TextBody: ownerTemplate.text,
                Tag: `website-${submission.type || "request"}`.slice(0, 1000),
            }),
        });
    }

    if ((!only || only.includes("requester")) && submission.email) {
        jobs.push({
            key: "requester",
            promise: sendOne(client, {
                To: submission.email,
                ReplyTo: replyTo,
                Subject: receiptTemplate.subject,
                HtmlBody: receiptTemplate.html,
                TextBody: receiptTemplate.text,
                Tag: `website-receipt-${submission.type || "request"}`.slice(0, 1000),
            }),
        });
    }

    const delivery = {
        owner: only && !only.includes("owner") ? submission.emailDelivery?.owner : undefined,
        requester:
            only && !only.includes("requester") ? submission.emailDelivery?.requester : undefined,
    };
    const results = await Promise.allSettled(jobs.map((job) => job.promise));

    results.forEach((result, index) => {
        const key = jobs[index].key;
        if (result.status === "fulfilled") {
            delivery[key] = result.value;
        } else {
            console.error(`Postmark ${key} email failed:`, result.reason?.code || "unknown");
            delivery[key] = { status: "failed", ...safeError(result.reason) };
        }
    });

    const statuses = [delivery.owner?.status, delivery.requester?.status].filter(Boolean);
    const sentCount = statuses.filter((status) => status === "sent").length;
    const status = sentCount === statuses.length ? "sent" : sentCount > 0 ? "partial" : "failed";

    return { status, ...delivery };
}
