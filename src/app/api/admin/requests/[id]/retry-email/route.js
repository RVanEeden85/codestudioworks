import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
    ADMIN_COOKIE_NAME,
    isValidAdminSession,
} from "../../../../../_lib/adminAuth";
import { sendSubmissionEmails } from "../../../../../_lib/emailService";
import { isSameOriginRequest } from "../../../../../_lib/formSecurity";
import {
    getRequestSubmissionById,
    isRequestStorageConfigured,
    updateRequestSubmissionEmailStatus,
} from "../../../../../_lib/requestSubmissions";

export async function POST(request, { params }) {
    const cookieStore = await cookies();
    const sessionValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!isValidAdminSession(sessionValue) || !isSameOriginRequest(request)) {
        return new NextResponse("Forbidden", { status: 403 });
    }
    if (!isRequestStorageConfigured()) {
        return NextResponse.redirect(new URL("/admin?email=storage-missing", request.url), 303);
    }

    try {
        const { id } = await params;
        const submission = await getRequestSubmissionById(id);
        if (!submission) {
            return NextResponse.redirect(new URL("/admin?email=not-found", request.url), 303);
        }

        const only = ["owner", "requester"].filter(
            (key) => submission.emailDelivery?.[key]?.status !== "sent"
        );
        if (only.length === 0) {
            return NextResponse.redirect(new URL("/admin?email=sent", request.url), 303);
        }
        const delivery = await sendSubmissionEmails(submission, {
            only,
        });
        await updateRequestSubmissionEmailStatus(submission._id, delivery.status, delivery);

        return NextResponse.redirect(
            new URL(`/admin?email=${delivery.status}`, request.url),
            303
        );
    } catch (error) {
        console.error("Email retry failed:", error?.message || error);
        return NextResponse.redirect(new URL("/admin?email=failed", request.url), 303);
    }
}
