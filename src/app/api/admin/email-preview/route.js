import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "../../../_lib/adminAuth";
import {
    buildInternalSubmissionEmail,
    buildRequesterReceiptEmail,
} from "../../../_lib/emailTemplates";

const ALLOWED_TYPES = new Set(["contact", "project_planner", "consultation", "support"]);

export async function GET(request) {
    if (process.env.NODE_ENV === "production") {
        const cookieStore = await cookies();
        const sessionValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
        if (!isValidAdminSession(sessionValue)) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    const requestedType = request.nextUrl.searchParams.get("type") || "contact";
    const type = ALLOWED_TYPES.has(requestedType) ? requestedType : "contact";
    const audience = request.nextUrl.searchParams.get("audience") || "requester";
    const sample = {
        _id: new ObjectId("68c855a30000000000000001"),
        type,
        source: type === "project_planner" ? "pricing_planner" : `${type}_form`,
        name: "Alex Morgan",
        email: "alex@example.com",
        phone: "+1 313 555 0147",
        projectType: "Business website",
        clientOrProject: type === "support" ? "Example Company website" : "",
        urgency: type === "support" ? "Work is blocked" : "",
        affectedUrl: type === "support" ? "https://example.com/booking" : "",
        preferredTime: type === "consultation" ? "Weekday afternoon" : "",
        timeZone: type === "consultation" ? "Eastern Time" : "",
        message: type === "support"
            ? "Customers can reach the booking page, but the final confirmation is not being created."
            : "We need a confident online presence that explains our services and turns local interest into qualified enquiries.",
        estimate: type === "project_planner"
            ? "Project stage: Ready to build\nBudget: $5,000–$10,000 USD\nTimeline: Within 1–2 months"
            : "",
    };
    const template = audience === "owner"
        ? buildInternalSubmissionEmail(sample)
        : buildRequesterReceiptEmail(sample);

    return new NextResponse(template.html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Robots-Tag": "noindex, nofollow",
        },
    });
}
