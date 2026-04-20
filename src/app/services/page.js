import Link from "next/link";
import { services } from "./_lib/services";

export const metadata = {
    title: "Services",
    description:
        "Explore CodeStudioWorks services: web development, web design, SEO, paid ads, social media, mobile apps, and UI/UX.",
    alternates: { canonical: "/services" },
};

export default function ServicesPage() {
    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-16">
            <header className="mb-10">
                <h1 className="text-4xl md:text-6xl font-bold text-primary">
                    Services
                </h1>
                <p className="mt-4 text-lg text-black/70">
                    Clear deliverables, transparent communication, and a focus
                    on results.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                    <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="rounded-xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-2xl font-semibold text-primary">
                            {service.name}
                        </h2>
                        <p className="mt-2 text-black/70">{service.summary}</p>
                        <p className="mt-4 text-primary font-semibold">
                            View details →
                        </p>
                    </Link>
                ))}
            </section>
        </main>
    );
}

