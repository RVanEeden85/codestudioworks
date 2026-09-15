import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { getServiceBySlug, services } from "../_lib/services";

export function generateStaticParams() {
    return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) return { title: "Service", alternates: { canonical: "/services" } };

    return {
        title: service.name,
        description: service.summary,
        alternates: { canonical: `/services/${service.slug}` },
        openGraph: {
            title: `${service.name} | CodeStudioWorks`,
            description: service.summary,
            url: `/services/${service.slug}`,
        },
    };
}

export default async function ServiceDetailPage({ params }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) notFound();

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.summary,
        provider: {
            "@type": "ProfessionalService",
            name: "CodeStudioWorks",
            url: "https://www.codestudioworks.com",
        },
        areaServed: "Worldwide",
    };

    return (
        <main className="architectural-page bg-background pt-[72px]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
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
                                Discuss This Service
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
                            <p className="text-sm font-black uppercase text-accent">Engagement</p>
                            <h2 className="mt-3 text-3xl font-black">A clear working model before development starts.</h2>
                            <p className="mt-4 max-w-3xl font-medium leading-7 text-white/74">{service.engagement}</p>
                        </section>

                        <section className="mt-10">
                            <p className="eyebrow">Common questions</p>
                            <h2 className="mt-3 text-3xl font-black text-secondary">Before we scope the work</h2>
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
