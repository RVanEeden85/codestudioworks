import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import JsonLd from "../../components/JsonLd";
import {
    SERVICE_AREAS,
    absoluteUrl,
    breadcrumbSchema,
    buildMetadata,
    faqSchema,
    graphSchema,
} from "../../_lib/seo";
import { getServiceBySlug, services } from "../_lib/services";

const seoTitles = {
    "business-website-launch": "Small Business Website Design & Development",
    "custom-web-apps": "Custom Web & Mobile App Development",
    "fractional-development-partner": "Fractional & Freelance Development Support",
    "care-maintenance": "Website Maintenance & Technical SEO Support",
};

const seoDescriptions = {
    "business-website-launch":
        "Professional small business website design and development for Detroit, Metro Detroit, Michigan, and worldwide—built for trust, leads, bookings, and sales.",
    "custom-web-apps":
        "Custom web and mobile app development for startups and businesses in Detroit and worldwide, including portals, dashboards, booking systems, and business tools.",
    "fractional-development-partner":
        "Fractional and freelance development support for Detroit and worldwide teams needing reliable feature delivery, integrations, fixes, and technical guidance.",
    "care-maintenance":
        "Website maintenance, technical SEO, updates, integrations, and support from a Detroit-based developer serving businesses locally and worldwide.",
};

export function generateStaticParams() {
    return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) return buildMetadata({
        title: "Development Services",
        description: "Explore web, app, software, and ongoing development services from CodeStudioWorks.",
        path: "/services",
    });

    return buildMetadata({
        title: seoTitles[service.slug] || service.name,
        description: seoDescriptions[service.slug] || service.summary,
        path: `/services/${service.slug}`,
    });
}

export default async function ServiceDetailPage({ params }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) notFound();

    const path = `/services/${service.slug}`;
    const serviceSchema = graphSchema([
        {
            "@type": "Service",
            "@id": `${absoluteUrl(path)}#service`,
            name: seoTitles[service.slug] || service.name,
            alternateName: service.name,
            description: service.summary,
            url: absoluteUrl(path),
            provider: { "@id": `${absoluteUrl("/")}#organization` },
            areaServed: SERVICE_AREAS,
            serviceType: service.name,
            audience: {
                "@type": "Audience",
                audienceType: service.bestFor,
            },
        },
        {
            "@type": "WebPage",
            "@id": `${absoluteUrl(path)}#webpage`,
            url: absoluteUrl(path),
            name: seoTitles[service.slug] || service.name,
            mainEntity: { "@id": `${absoluteUrl(path)}#service` },
            about: { "@id": `${absoluteUrl("/")}#organization` },
            inLanguage: "en-US",
        },
        breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path },
        ]),
        faqSchema(service.faqs),
    ]);

    return (
        <main id="main-content" className="architectural-page bg-background pt-[72px]">
            <JsonLd data={serviceSchema} />
            <section className="concrete-image-section architectural-light border-b border-black/10 py-16 md:py-24">
                <div className="section-shell">
                    <nav aria-label="Breadcrumb" className="text-sm font-bold text-black/55">
                        <Link href="/" className="hover:text-secondary">Home</Link>{" / "}
                        <Link href="/services" className="hover:text-secondary">Services</Link>{" / "}
                        <span className="text-secondary">{service.name}</span>
                    </nav>
                    <p className="eyebrow mt-10">{service.category}</p>
                    <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[1.02] text-secondary md:text-7xl">
                        {service.name}
                    </h1>
                    <p className="mt-6 max-w-3xl text-xl font-medium leading-8 text-black/64">
                        {service.summary}
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="section-shell grid gap-8 lg:grid-cols-[0.76fr_1.24fr]">
                    <aside className="lg:sticky lg:top-28 lg:self-start">
                        <div className="architectural-slab p-6 text-white">
                            <p className="text-sm font-black uppercase text-accent">Best for</p>
                            <p className="mt-4 text-2xl font-black leading-tight">{service.bestFor}</p>
                            <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm font-semibold leading-6 text-white/66">
                                <p>{service.typicalTimeline}</p>
                                <p>{service.priceGuide}</p>
                            </div>
                            <Link
                                href={`/contact?service=${encodeURIComponent(service.name)}`}
                                className="mt-7 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-black text-secondary transition hover:bg-white"
                            >
                                Discuss this service
                                <FiArrowRight aria-hidden="true" />
                            </Link>
                        </div>
                    </aside>

                    <div>
                        <section className="architectural-slab p-6 md:p-8">
                            <h2 className="text-3xl font-black text-secondary">What this can include</h2>
                            <div className="mt-7 grid gap-4 md:grid-cols-2">
                                {service.outcomes.map((item) => (
                                    <div key={item} className="border-t border-white/14 py-5">
                                        <FiCheck className="text-2xl text-primary" aria-hidden="true" />
                                        <p className="mt-4 text-lg font-black text-secondary">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="project-monolith-hero mt-6 border border-white/10 p-6 text-white md:p-8">
                            <p className="text-sm font-black uppercase text-accent">Working together</p>
                            <h2 className="mt-3 text-3xl font-black">How we’ll work together.</h2>
                            <p className="mt-4 max-w-3xl font-medium leading-7 text-white/74">{service.engagement}</p>
                        </section>

                        <section className="mt-10">
                            <p className="eyebrow">Common questions</p>
                            <h2 className="mt-3 text-3xl font-black text-secondary">Common questions</h2>
                            <div className="mt-6 grid gap-4">
                                {service.faqs.map((faq) => (
                                    <article key={faq.question} className="border-t border-white/16 py-6">
                                        <h3 className="text-xl font-black text-secondary">{faq.question}</h3>
                                        <p className="mt-3 font-medium leading-7 text-black/64">{faq.answer}</p>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
