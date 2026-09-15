import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    ADMIN_COOKIE_NAME,
    isAdminAuthConfigured,
    isValidAdminSession,
} from "../../_lib/adminAuth";

export const metadata = {
    title: "Admin Login",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminLoginPage({ searchParams }) {
    const cookieStore = await cookies();
    const sessionValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const params = await searchParams;

    if (isAdminAuthConfigured() && isValidAdminSession(sessionValue)) {
        redirect("/admin");
    }

    const hasInvalidLogin = params?.error === "invalid";
    const isMissingSetup =
        params?.setup === "missing" || !isAdminAuthConfigured();

    return (
        <main className="min-h-screen bg-dark px-5 py-16 text-white">
            <section className="mx-auto max-w-md rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl">
                <p className="text-xs font-black uppercase text-accent">
                    CodeStudioWorks
                </p>
                <h1 className="mt-3 text-3xl font-black">Admin login</h1>

                {isMissingSetup && (
                    <div className="mt-5 rounded-md border border-amber-300/30 bg-amber-300/10 p-4 text-sm font-semibold leading-6 text-amber-100">
                        Add `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` to your
                        environment before using the admin portal.
                    </div>
                )}

                {hasInvalidLogin && (
                    <div className="mt-5 rounded-md border border-red-300/30 bg-red-300/10 p-4 text-sm font-semibold text-red-100">
                        That password did not match.
                    </div>
                )}

                <form
                    action="/api/admin/login"
                    method="post"
                    className="mt-6 grid gap-4"
                >
                    <label className="grid gap-2 text-sm font-bold text-white/78">
                        Password
                        <input
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="rounded-md border border-white/14 bg-white px-4 py-3 text-secondary outline-none focus:border-accent"
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="rounded-md bg-accent px-5 py-3 font-black text-dark transition hover:bg-white"
                    >
                        Sign in
                    </button>
                </form>
            </section>
        </main>
    );
}
