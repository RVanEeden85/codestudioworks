import Link from "next/link";
import { getServiceBySlug, services } from "../_lib/services";

export function generateStaticParams() {
    return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
    const service = getServiceBySlug(params.slug);
    if (!service) {
        return {
            title: "Service",
            alternates: { canonical: "/services" },
        };
    }

    return {
        title: service.name,
        description: service.summary,
        alternates: { canonical: `/services/${service.slug}` },
        openGraph: {
            title: `${service.name} | CodeStudioWorks`,
            description: service.summary,
            url: `/services/${service.slug}`,
            type: "article",
        },
    };
}

export default function ServiceDetailPage({ params }) {
    const service = getServiceBySlug(params.slug);

    if (!service) {
        return (
            <main className="mx-auto w-full max-w-4xl px-6 py-16">
                <h1 className="text-3xl font-bold text-primary">
                    Service not found
                </h1>
                <p className="mt-4 text-black/70">
                    Please choose a service from the list.
                </p>
                <Link
                    href="/services"
                    className="inline-block mt-6 text-primary font-semibold"
                >
                    Back to Services →
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-4xl px-6 py-16">
            <nav className="text-sm text-black/60">
                <Link href="/" className="hover:underline">
                    Home
                </Link>{" "}
                /{" "}
                <Link href="/services" className="hover:underline">
                    Services
                </Link>{" "}
                / <span className="text-black/80">{service.name}</span>
            </nav>

            <header className="mt-6">
                <h1 className="text-4xl md:text-6xl font-bold text-primary">
                    {service.name}
                </h1>
                <p className="mt-4 text-lg text-black/70">{service.summary}</p>
            </header>

            <section className="mt-10 space-y-4 text-black/80 leading-relaxed">
                <p>
                    If you&apos;re looking for{" "}
                    <strong className="text-black">{service.name}</strong>, I
                    focus on practical improvements that help you convert more
                    visitors into leads.
                </p>
                <p>
                    You&apos;ll get clear scope, realistic timelines, and
                    deliverables that are easy to maintain.
                </p>
            </section>

            <section className="mt-12 rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-primary">
                    Ready to get started?
                </h2>
                <p className="mt-2 text-black/70">
                    Send a message and I&apos;ll reply with next steps.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href="/contact"
                        className="rounded-lg bg-primary px-5 py-3 text-white font-semibold"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/pricing"
                        className="rounded-lg border border-primary px-5 py-3 text-primary font-semibold"
                    >
                        Pricing
                    </Link>
                </div>
            </section>
        </main>
    );
}

