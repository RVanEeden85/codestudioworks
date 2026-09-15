import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import ServicesGalleryHero from "../components/ServicesGalleryHero";
import JsonLd from "../components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata, graphSchema } from "../_lib/seo";
import { services } from "./_lib/services";

export const metadata = buildMetadata({
    title: "Web, App & Software Development Services",
    description:
        "Explore Detroit-based website, web and mobile app, custom software, technical SEO, and ongoing development services available to businesses worldwide.",
    path: "/services",
});

const pageSchema = graphSchema([
    {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/services")}#webpage`,
        url: absoluteUrl("/services"),
        name: "Web, App and Software Development Services",
        description:
            "Website, app, custom software, technical support, and fractional development services from a Detroit-based independent studio.",
        mainEntity: { "@id": `${absoluteUrl("/services")}#services` },
        about: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-US",
    },
    {
        "@type": "ItemList",
        "@id": `${absoluteUrl("/services")}#services`,
        itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.name,
            url: absoluteUrl(`/services/${service.slug}`),
        })),
    },
    breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
    ]),
]);

export default function ServicesPage() {
    return (
        <main id="main-content" className="architectural-page bg-background pt-[72px]">
            <JsonLd data={pageSchema} />
            <ServicesGalleryHero />

            <section id="service-catalog" className="bg-[#101211] py-20 md:py-28">
                <div className="section-shell grid gap-5 md:grid-cols-2">
                    {services.map((service) => (
                        <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="architectural-slab group p-7 text-white transition hover:-translate-y-1 hover:border-accent/50"
                        >
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <h2 className="text-3xl font-black text-white">
                                        {service.name}
                                    </h2>
                                    <p className="mt-3 text-base font-medium leading-7 text-white/64">
                                        {service.summary}
                                    </p>
                                </div>
                                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent text-[#080909] transition group-hover:bg-white">
                                    <FiArrowRight aria-hidden="true" />
                                </span>
                            </div>

                            <div className="mt-7 border-t border-black/10 pt-5">
                                <div className="mb-5 flex flex-wrap gap-2 text-xs font-black uppercase text-secondary/60">
                                    <span className="rounded-full bg-white/7 px-3 py-2 text-white/60">{service.typicalTimeline}</span>
                                    <span className="rounded-full bg-white/7 px-3 py-2 text-white/60">{service.priceGuide}</span>
                                </div>
                                <p className="text-sm font-black uppercase tracking-[0.14em] text-accent">
                                    Common outcomes
                                </p>
                                <ul className="mt-4 grid gap-2">
                                    {service.outcomes.slice(0, 3).map((item) => (
                                        <li
                                            key={item}
                                            className="flex gap-2 text-sm font-bold text-white/70"
                                        >
                                            <FiCheck className="mt-0.5 shrink-0 text-accent" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
