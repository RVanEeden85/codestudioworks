import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "../../../_lib/adminAuth";

export async function POST(request) {
    const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
    );

    response.cookies.set(ADMIN_COOKIE_NAME, "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
}
