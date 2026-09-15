import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    ADMIN_COOKIE_NAME,
    isAdminAuthConfigured,
    isValidAdminSession,
} from "../_lib/adminAuth";
import {
    isRequestStorageConfigured,
    listRequestSubmissions,
    serializeRequestSubmission,
} from "../_lib/requestSubmissions";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Admin",
    robots: {
        index: false,
        follow: false,
    },
};

function formatDate(value) {
    if (!value) {
        return "Unknown";
    }

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

function badgeClass(status) {
    if (status === "sent") {
        return "border-primary/20 bg-primary/10 text-primary";
    }

    if (status === "failed") {
        return "border-red-600/20 bg-red-50 text-red-700";
    }

    if (status === "not_configured" || status === "partial") {
        return "border-amber-600/20 bg-amber-50 text-amber-700";
    }

    return "border-black/10 bg-white text-secondary/70";
}

export default async function AdminPage({ searchParams }) {
    const params = await searchParams;
    const cookieStore = await cookies();
    const sessionValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!isAdminAuthConfigured()) {
        return (
            <main className="min-h-screen bg-background px-5 py-12">
                <section className="mx-auto max-w-3xl rounded-lg border border-black/10 bg-[#fffdf7] p-6">
                    <p className="eyebrow">Admin setup</p>
                    <h1 className="mt-3 text-4xl font-black text-secondary">
                        Admin auth is not configured yet.
                    </h1>
                    <p className="mt-4 font-semibold leading-7 text-black/64">
                        Add `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` to your
                        local and production environment variables before using
                        this dashboard.
                    </p>
                </section>
            </main>
        );
    }

    if (!isValidAdminSession(sessionValue)) {
        redirect("/admin/login");
    }

    if (!isRequestStorageConfigured()) {
        return (
            <main className="min-h-screen bg-background px-5 py-12">
                <section className="mx-auto max-w-3xl rounded-lg border border-black/10 bg-[#fffdf7] p-6">
                    <p className="eyebrow">Admin setup</p>
                    <h1 className="mt-3 text-4xl font-black text-secondary">
                        MongoDB is not configured yet.
                    </h1>
                    <p className="mt-4 font-semibold leading-7 text-black/64">
                        Add `MONGODB_URI` and optionally `MONGODB_DB` to your
                        environment variables so requests can be stored and
                        shown here.
                    </p>
                </section>
            </main>
        );
    }

    const requests = (await listRequestSubmissions()).map(
        serializeRequestSubmission
    );

    return (
        <main className="min-h-screen bg-background px-5 py-10">
            <section className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-4 border-b border-black/10 pb-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow">CodeStudioWorks admin</p>
                        <h1 className="mt-3 text-4xl font-black text-secondary md:text-5xl">
                            Request inbox
                        </h1>
                        <p className="mt-3 max-w-2xl font-semibold leading-7 text-black/60">
                            Contact messages and consultation requests are
                            stored here before email delivery is attempted.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <a href="/api/admin/email-preview?type=contact&audience=requester" target="_blank" className="rounded-md border border-black/10 bg-white px-4 py-3 text-sm font-black text-secondary transition hover:border-primary">
                            Preview email design
                        </a>
                        <form action="/api/admin/logout" method="post">
                            <button type="submit" className="rounded-md border border-black/10 bg-white px-4 py-3 text-sm font-black text-secondary transition hover:border-primary">
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>

                {params?.email && (
                    <p className="mt-5 border border-primary/20 bg-primary/10 p-4 text-sm font-bold text-primary">
                        Email delivery update: {String(params.email).replaceAll("-", " ")}.
                    </p>
                )}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border border-black/10 bg-[#fffdf7] p-5">
                        <p className="text-sm font-black uppercase text-black/45">
                            Total requests
                        </p>
                        <p className="mt-2 text-4xl font-black text-secondary">
                            {requests.length}
                        </p>
                    </div>
                    <div className="rounded-lg border border-black/10 bg-[#fffdf7] p-5">
                        <p className="text-sm font-black uppercase text-black/45">
                            Consultations
                        </p>
                        <p className="mt-2 text-4xl font-black text-secondary">
                            {
                                requests.filter(
                                    (request) =>
                                        request.type === "consultation"
                                ).length
                            }
                        </p>
                    </div>
                    <div className="rounded-lg border border-black/10 bg-[#fffdf7] p-5">
                        <p className="text-sm font-black uppercase text-black/45">
                            Project enquiries
                        </p>
                        <p className="mt-2 text-4xl font-black text-secondary">
                            {
                                requests.filter(
                                    (request) => ["contact", "project_planner"].includes(request.type)
                                ).length
                            }
                        </p>
                    </div>
                    <div className="rounded-lg border border-black/10 bg-[#fffdf7] p-5">
                        <p className="text-sm font-black uppercase text-black/45">Support requests</p>
                        <p className="mt-2 text-4xl font-black text-secondary">
                            {requests.filter((request) => request.type === "support").length}
                        </p>
                    </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border border-black/10 bg-[#fffdf7]">
                    {requests.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-xl font-black text-secondary">
                                No requests yet.
                            </p>
                            <p className="mt-2 font-semibold text-black/55">
                                New form submissions will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-black/10">
                            {requests.map((request) => (
                                <article
                                    key={request.id}
                                    className="grid gap-4 p-5 lg:grid-cols-[1fr_190px]"
                                >
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-black uppercase text-white">
                                                {request.type}
                                            </span>
                                            <span
                                                className={`rounded-md border px-2.5 py-1 text-xs font-black uppercase ${badgeClass(
                                                    request.emailStatus
                                                )}`}
                                            >
                                                Email {request.emailStatus}
                                            </span>
                                            <span className="text-sm font-bold text-black/45">
                                                {formatDate(request.createdAt)}
                                            </span>
                                            {request.emailDelivery && (
                                                <span className="text-xs font-bold text-black/45">
                                                    Owner: {request.emailDelivery.owner?.status || "unknown"} · Receipt: {request.emailDelivery.requester?.status || "unknown"}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="mt-3 text-2xl font-black text-secondary">
                                            {request.name || "Unnamed request"}
                                        </h2>

                                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm font-bold text-black/60">
                                            {request.email && (
                                                <a
                                                    href={`mailto:${request.email}`}
                                                    className="hover:text-primary"
                                                >
                                                    {request.email}
                                                </a>
                                            )}
                                            {request.phone && (
                                                <a
                                                    href={`tel:${request.phone}`}
                                                    className="hover:text-primary"
                                                >
                                                    {request.phone}
                                                </a>
                                            )}
                                            {request.projectType && (
                                                <span>
                                                    {request.projectType}
                                                </span>
                                            )}
                                            {request.clientOrProject && <span>{request.clientOrProject}</span>}
                                            {request.urgency && <span className="font-black text-primary">{request.urgency}</span>}
                                        </div>

                                        {request.affectedUrl && (
                                            <a href={request.affectedUrl} target="_blank" rel="noreferrer" className="mt-3 block break-all text-sm font-bold text-primary underline">
                                                {request.affectedUrl}
                                            </a>
                                        )}

                                        {(request.preferredDay ||
                                            request.preferredTime ||
                                            request.timeZone) && (
                                            <p className="mt-3 text-sm font-bold text-secondary/70">
                                                Preferred:{" "}
                                                {[
                                                    request.preferredDay,
                                                    request.preferredTime,
                                                    request.timeZone,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" / ")}
                                            </p>
                                        )}

                                        {request.message && (
                                            <p className="mt-4 whitespace-pre-wrap text-sm font-medium leading-6 text-black/68">
                                                {request.message}
                                            </p>
                                        )}

                                        {request.estimate && (
                                            <pre className="mt-4 overflow-auto rounded-md bg-background p-4 text-xs font-semibold leading-5 text-secondary">
                                                {request.estimate}
                                            </pre>
                                        )}
                                    </div>

                                    <div className="text-sm font-semibold text-black/45 lg:text-right">
                                        <p>ID</p>
                                        <p className="mt-1 break-all font-mono text-xs">
                                            {request.id}
                                        </p>
                                        {["failed", "partial", "not_configured"].includes(request.emailStatus) && (
                                            <form action={`/api/admin/requests/${request.id}/retry-email`} method="post" className="mt-4">
                                                <button type="submit" className="rounded-sm bg-secondary px-4 py-2 text-xs font-black text-white hover:bg-primary">
                                                    Retry email
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
