import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "../../../../../_lib/adminAuth";
import { isSameOriginRequest } from "../../../../../_lib/formSecurity";
import { updateLeadProgress } from "../../../../../_lib/requestSubmissions";

const statuses = ["new", "qualified", "consultation_held", "proposal_sent", "won", "closed"];
export async function POST(request, { params }) {
    const session = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
    if (!isValidAdminSession(session) || !isSameOriginRequest(request)) return new NextResponse("Forbidden", { status: 403 });
    const { id } = await params;
    const body = await request.formData();
    const status = body.get("status");
    const revenue = Number(body.get("revenue") || 0);
    if (!/^[a-f\d]{24}$/i.test(id) || !statuses.includes(status) || !Number.isFinite(revenue) || revenue < 0 || revenue > 100000000) {
        return new NextResponse("Invalid lead details", { status: 400 });
    }
    try {
        const result = await updateLeadProgress(id, status, Math.round(revenue * 100) / 100);
        if (!result.matchedCount) return new NextResponse("Lead not found", { status: 404 });
        return NextResponse.redirect(new URL("/admin", request.url), 303);
    } catch {
        return new NextResponse("Could not save the update. Please try again.", { status: 500 });
    }
}
