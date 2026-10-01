import { guides } from "../../guides/guides";
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
import { getProjectBySlug } from "../../work/_lib/projects";

const seoTitles = {
    "business-website-launch": "Small Business Website Design & Development",
    "custom-web-apps": "Custom Web & Mobile App Development",
    "fractional-development-partner": "Fractional & Freelance Development Support",
    "care-maintenance": "Website Maintenance & Technical SEO Support",
    "custom-software-development": "Custom Software Development for Business Workflows",
    "seo-local-presence": "Westland & Metro Detroit Local SEO Services",
    "digital-marketing": "Digital Marketing Foundations & Campaign Support",
};

const seoDescriptions = {
    "business-website-launch":
        "Professional small business website design and development for Detroit, Metro Detroit, Michigan, and worldwide—built for trust, leads, bookings, and sales.",
    "custom-web-apps":
        "Custom web and mobile app development for startups and businesses in Detroit and worldwide, including portals, dashboards, booking systems, and business tools.",
    "fractional-development-partner":
        "Fractional and freelance development support for Detroit and worldwide teams needing reliable feature delivery, integrations, fixes, and technical guidance.",
    "care-maintenance":
        "Website maintenance, technical SEO, updates, integrations, and support from a Westland-based developer serving Metro Detroit and worldwide businesses.",
    "custom-software-development": "Custom software development for business workflows, internal tools, integrations, permissions, and reporting from a Westland-based developer.",
    "seo-local-presence": "Technical SEO, service pages, local search and measurement from a Westland-based developer serving Metro Detroit and businesses worldwide.",
    "digital-marketing": "Digital marketing planning, landing pages, campaign measurement, and implementation support, with advertising spend agreed separately.",
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
                    <p className="mt-4 text-sm font-bold text-white/70">Based in Westland, Michigan. Serving Metro Detroit and remote clients worldwide.</p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link href={`/contact?service=${encodeURIComponent(service.name)}`} className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-black text-secondary transition hover:bg-white">Discuss your project <FiArrowRight aria-hidden="true" /></Link>
                        <span className="text-sm font-bold text-black/55">{service.priceGuide}</span>
                    </div>
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

                        {service.workflow?.length > 0 && <section className="mt-10"><p className="eyebrow">A clear path</p><h2 className="mt-3 text-3xl font-black text-secondary">How the work is shaped.</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{service.workflow.map((step, index) => <div key={step} className="drafting-card"><p className="text-sm font-black text-accent">0{index + 1}</p><p className="mt-3 font-bold text-white">{step}</p></div>)}</div></section>}

                        {service.caseStudies?.map((slug) => getProjectBySlug(slug)).filter(Boolean).length > 0 && <section className="mt-10"><p className="eyebrow">Relevant experience</p><h2 className="mt-3 text-3xl font-black text-secondary">Related project context.</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{service.caseStudies.map((slug) => { const project = getProjectBySlug(slug); return project ? <Link key={project.slug} href={`/work/${project.slug}`} className="drafting-card block transition hover:border-accent"><p className="text-sm font-black text-accent">{project.context}</p><h3 className="mt-2 text-xl font-black text-secondary">{project.name}</h3><p className="mt-2 text-sm leading-6 text-white/70">{project.role}</p></Link> : null; })}</div></section>}

                        <section className="drafting-card mt-10"><h2 className="text-3xl font-bold text-secondary">Before we start</h2><p className="mt-4 leading-7 text-white/75">Bring your main business goal, any existing website or tools, and the date and budget you have in mind. We’ll confirm deliverables, content responsibilities, revisions and access before work begins.</p><h3 className="mt-6 text-xl font-bold text-secondary">What affects the quote?</h3><p className="mt-3 leading-7 text-white/75">Custom workflows, integrations, content preparation and migration can change the scope. Hosting, subscriptions and ongoing support are agreed separately. The written proposal confirms what is included.</p><Link href="/pricing" className="mt-5 inline-block text-accent underline">See pricing and engagement options</Link><div className="mt-5">{guides.filter(g=>g.service===service.slug || service.slug==="care-maintenance" && g.slug==="prepare-to-hire-a-freelance-developer").map(g=><Link key={g.slug} href={`/guides/${g.slug}`} className="block py-2 text-accent underline">{g.title} ↗</Link>)}</div></section>
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
                        <section className="mt-12 border-t border-white/15 pt-10 text-center"><h2 className="text-3xl font-black text-secondary">Ready to talk through the next step?</h2><p className="mx-auto mt-3 max-w-2xl text-white/70">Tell me what you are trying to improve and I’ll help shape an appropriate scope.</p><Link href={`/contact?service=${encodeURIComponent(service.name)}`} className="studio-primary mt-6 inline-flex">Start a conversation <FiArrowRight aria-hidden="true" /></Link></section>
                        <nav aria-label="Related services" className="mt-10 border-t border-white/15 pt-6"><h2 className="text-xl font-bold text-secondary">Explore other services</h2><div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">{services.filter(other => other.slug !== service.slug).map(other => <Link key={other.slug} href={`/services/${other.slug}`} className="text-accent underline">{other.shortName}</Link>)}</div></nav>
                    </div>
                </div>
            </section>
        </main>
    );
}
