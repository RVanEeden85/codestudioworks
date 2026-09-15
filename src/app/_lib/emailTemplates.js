import { getSiteUrl } from "./siteUrl";

const COLORS = {
    background: "#080909",
    panel: "#141715",
    panelSoft: "#1b1f1c",
    text: "#eeece5",
    muted: "#adb5af",
    accent: "#d7f45d",
    line: "#343a35",
};

const TYPE_LABELS = {
    contact: "Project enquiry",
    project_planner: "Project planner",
    consultation: "Consultation request",
    support: "Support request",
};

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function valueOrFallback(value, fallback = "Not provided") {
    const normalized = String(value ?? "").trim();
    return normalized || fallback;
}

function referenceFor(submission) {
    return String(submission._id ?? submission.id ?? "pending");
}

function typeLabel(type) {
    return TYPE_LABELS[type] || "Website request";
}

function renderRows(rows) {
    return rows
        .filter((row) => row.value !== undefined && row.value !== null && row.value !== "")
        .map(
            ({ label, value, multiline = false }) => `
                <tr>
                    <td class="detail-label" style="padding:12px 16px;border-bottom:1px solid ${COLORS.line};color:${COLORS.muted};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;vertical-align:top;width:34%;">${escapeHtml(label)}</td>
                    <td style="padding:12px 16px;border-bottom:1px solid ${COLORS.line};color:${COLORS.text};font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;line-height:1.6;vertical-align:top;word-break:break-word;">${multiline ? escapeHtml(value).replaceAll("\n", "<br>") : escapeHtml(value)}</td>
                </tr>`
        )
        .join("");
}

function renderLayout({ preheader, eyebrow, heading, intro, body, action, reference }) {
    const siteUrl = getSiteUrl();
    const actionMarkup = action
        ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0 0;"><tr><td bgcolor="${COLORS.accent}" style="border-radius:2px;"><a href="${escapeHtml(action.href)}" style="display:inline-block;padding:14px 20px;color:#071312;font-size:14px;font-weight:800;text-decoration:none;">${escapeHtml(action.label)} &nbsp;→</a></td></tr></table>`
        : "";

    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title>${escapeHtml(heading)}</title>
    <style>
        body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
        table,td{mso-table-lspace:0;mso-table-rspace:0}
        table{border-collapse:collapse!important}
        body{height:100%!important;margin:0!important;padding:0!important;width:100%!important;background:${COLORS.background}}
        a{color:${COLORS.accent}}
        @media screen and (max-width:620px){.email-shell{width:100%!important}.email-pad{padding-left:22px!important;padding-right:22px!important}.detail-label{display:block!important;width:auto!important;padding-bottom:2px!important;border-bottom:0!important}.detail-value{display:block!important;width:auto!important;padding-top:2px!important}}
        @media (prefers-color-scheme:dark){body,.email-bg{background:${COLORS.background}!important}.email-card{background:${COLORS.panel}!important}.email-text{color:${COLORS.text}!important}}
    </style>
</head>
<body>
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-bg" style="background:${COLORS.background};">
        <tr><td align="center" style="padding:28px 12px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" class="email-shell" style="width:600px;max-width:600px;">
                <tr><td style="height:3px;background:${COLORS.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
                <tr><td class="email-card email-pad" style="background:${COLORS.panel};padding:32px 38px 10px;border-left:1px solid ${COLORS.line};border-right:1px solid ${COLORS.line};">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
                        <td style="color:${COLORS.text};font-family:Arial,Helvetica,sans-serif;font-size:23px;font-weight:900;letter-spacing:-1px;">CodeStudioWorks<span style="color:${COLORS.accent};">.</span></td>
                        <td align="right" style="color:${COLORS.muted};font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Detroit · Worldwide</td>
                    </tr></table>
                </td></tr>
                <tr><td class="email-card email-pad" style="background:${COLORS.panel};padding:34px 38px 38px;border-left:1px solid ${COLORS.line};border-right:1px solid ${COLORS.line};">
                    <p style="margin:0 0 14px;color:${COLORS.accent};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;">${escapeHtml(eyebrow)}</p>
                    <h1 class="email-text" style="margin:0;color:${COLORS.text};font-family:Arial,Helvetica,sans-serif;font-size:38px;line-height:1.08;letter-spacing:-1.7px;">${escapeHtml(heading)}</h1>
                    <p style="margin:22px 0 0;color:${COLORS.muted};font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;">${escapeHtml(intro)}</p>
                    ${body}
                    ${actionMarkup}
                </td></tr>
                <tr><td class="email-pad" style="background:${COLORS.panelSoft};padding:22px 38px;border:1px solid ${COLORS.line};">
                    <p style="margin:0;color:${COLORS.muted};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.65;">Reference <strong style="color:${COLORS.text};">${escapeHtml(reference)}</strong></p>
                    <p style="margin:8px 0 0;color:${COLORS.muted};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.65;">CodeStudioWorks is an independent Detroit development studio working with clients locally and worldwide.</p>
                    <p style="margin:8px 0 0;color:${COLORS.muted};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.65;"><a href="${siteUrl}" style="color:${COLORS.accent};text-decoration:none;">codestudioworks.com</a> &nbsp;·&nbsp; <a href="${siteUrl}/privacy" style="color:${COLORS.muted};">Privacy</a> &nbsp;·&nbsp; <a href="${siteUrl}/support" style="color:${COLORS.muted};">Support</a></p>
                </td></tr>
            </table>
        </td></tr>
    </table>
</body>
</html>`;
}

function submissionRows(submission) {
    const submittedAt = submission.createdAt instanceof Date
        ? submission.createdAt.toISOString()
        : submission.createdAt || new Date().toISOString();

    return [
        { label: "Request type", value: typeLabel(submission.type) },
        { label: "Source", value: valueOrFallback(submission.source) },
        { label: "Submitted", value: submittedAt },
        { label: "Name", value: submission.name },
        { label: "Email", value: submission.email },
        { label: "Phone", value: valueOrFallback(submission.phone || submission.tel) },
        { label: "Project type", value: submission.projectType },
        { label: "Client / project", value: submission.clientOrProject },
        { label: "Urgency", value: submission.urgency },
        { label: "Affected URL", value: submission.affectedUrl },
        { label: "Preferred window", value: submission.preferredTime },
        { label: "Timezone", value: submission.timeZone },
        { label: "Message", value: submission.message, multiline: true },
        { label: "Planner details", value: submission.estimate, multiline: true },
    ];
}

export function buildInternalSubmissionEmail(submission) {
    const label = typeLabel(submission.type);
    const reference = referenceFor(submission);
    const siteUrl = getSiteUrl();
    const body = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;background:${COLORS.panelSoft};border:1px solid ${COLORS.line};">${renderRows(submissionRows(submission))}</table>`;

    return {
        subject: `[CSW] ${label}: ${valueOrFallback(submission.name, "New request")}`,
        html: renderLayout({
            preheader: `${label} from ${valueOrFallback(submission.name, "a prospective client")}`,
            eyebrow: "New website request",
            heading: label,
            intro: "A new request has been safely stored in the CodeStudioWorks request inbox.",
            body,
            action: { href: `${siteUrl}/admin`, label: "Open request inbox" },
            reference,
        }),
        text: [
            `NEW ${label.toUpperCase()}`,
            "",
            ...submissionRows(submission)
                .filter((row) => row.value !== undefined && row.value !== null && row.value !== "")
                .map((row) => `${row.label}: ${row.value}`),
            "",
            `Reference: ${reference}`,
            `Request inbox: ${siteUrl}/admin`,
        ].join("\n"),
    };
}

function receiptCopy(type) {
    if (type === "support") {
        return {
            eyebrow: "Support request received",
            heading: "Your request is safely in the queue.",
            intro: "Thanks for sending the details. I’ll review the issue personally and reply with the most useful next step.",
            steps: [
                "I’ll review the issue, urgency, and any affected link you supplied.",
                "I’ll reply by email if I need access, screenshots, or more context.",
                "Work begins only after scope, timing, and any cost are confirmed.",
            ],
            action: { label: "Visit support", path: "/support" },
        };
    }

    if (type === "consultation") {
        return {
            eyebrow: "Consultation request received",
            heading: "We have a starting point.",
            intro: "Thanks for sharing your preferred time and project goal. I’ll reply personally to confirm the conversation and next step.",
            steps: [
                "I’ll review the goal and the project type you selected.",
                "I’ll confirm a suitable meeting time by email.",
                "The appointment is not booked until you receive that confirmation.",
            ],
            action: { label: "Explore services", path: "/services" },
        };
    }

    return {
        eyebrow: type === "project_planner" ? "Project planner received" : "Project enquiry received",
        heading: "Your idea has reached a real person.",
        intro: "Thanks for sharing what the business needs. I’ll review the request personally and recommend a clear next step.",
        steps: [
            "I’ll review the goal, timing, and project context you provided.",
            "I’ll reply with useful questions or a recommended discovery step.",
            "You’ll receive a clear scope before committing to development.",
        ],
        action: { label: "View CodeStudioWorks", path: "/" },
    };
}

export function buildRequesterReceiptEmail(submission) {
    const reference = referenceFor(submission);
    const copy = receiptCopy(submission.type);
    const siteUrl = getSiteUrl();
    const steps = copy.steps
        .map(
            (step, index) => `<tr><td style="padding:10px 0;vertical-align:top;width:38px;"><span style="display:inline-block;width:25px;height:25px;border-radius:50%;background:${COLORS.accent};color:#071312;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:900;line-height:25px;text-align:center;">${index + 1}</span></td><td style="padding:10px 0;color:${COLORS.text};font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;line-height:1.65;">${escapeHtml(step)}</td></tr>`
        )
        .join("");
    const body = `
        <p style="margin:28px 0 0;color:${COLORS.text};font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;">Hi ${escapeHtml(valueOrFallback(submission.name, "there"))},</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;padding:10px 18px;background:${COLORS.panelSoft};border:1px solid ${COLORS.line};">${steps}</table>
        <p style="margin:24px 0 0;color:${COLORS.muted};font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;">For security, this receipt does not repeat the full message you submitted. If you did not send this request, no action is needed.</p>`;

    return {
        subject: `${typeLabel(submission.type)} received — CodeStudioWorks`,
        html: renderLayout({
            preheader: `Your ${typeLabel(submission.type).toLowerCase()} is safely stored. Reference ${reference}.`,
            eyebrow: copy.eyebrow,
            heading: copy.heading,
            intro: copy.intro,
            body,
            action: { href: `${siteUrl}${copy.action.path}`, label: copy.action.label },
            reference,
        }),
        text: [
            `Hi ${valueOrFallback(submission.name, "there")},`,
            "",
            copy.intro,
            "",
            "WHAT HAPPENS NEXT",
            ...copy.steps.map((step, index) => `${index + 1}. ${step}`),
            "",
            "For security, this receipt does not repeat the full message you submitted.",
            "If you did not send this request, no action is needed.",
            "",
            `Reference: ${reference}`,
            `Support: ${siteUrl}/support`,
            "",
            "CodeStudioWorks — Detroit-based, available worldwide",
        ].join("\n"),
    };
}
