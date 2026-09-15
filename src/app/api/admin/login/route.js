import { NextResponse } from "next/server";
import {
    ADMIN_COOKIE_NAME,
    ADMIN_SESSION_MAX_AGE_SECONDS,
    createAdminSessionValue,
    isAdminAuthConfigured,
    isValidAdminPassword,
} from "../../../_lib/adminAuth";
import {
    consumeRateLimit,
    getRequestIp,
    isSameOriginRequest,
} from "../../../_lib/formSecurity";

export async function POST(request) {
    if (!isSameOriginRequest(request)) {
        return new NextResponse("Forbidden", { status: 403 });
    }

    if (!isAdminAuthConfigured()) {
        return NextResponse.redirect(
            new URL("/admin/login?setup=missing", request.url)
        );
    }

    const formData = await request.formData();
    const password = formData.get("password");
    const rateLimit = consumeRateLimit("admin-login", getRequestIp(request), {
        limit: 8,
        windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.allowed || !isValidAdminPassword(password)) {
        return NextResponse.redirect(
            new URL("/admin/login?error=invalid", request.url)
        );
    }

    const response = NextResponse.redirect(new URL("/admin", request.url));

    response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionValue(), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
        path: "/",
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
}
