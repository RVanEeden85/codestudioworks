import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { services } from "./_lib/services";

export const metadata = {
    title: "Services",
    description:
        "Explore website, app, custom business tool, ongoing development, and technical support services from CodeStudioWorks.",
    alternates: { canonical: "/services" },
};

export default function ServicesPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <section className="concrete-image-section architectural-light border-b border-black/10 py-20 md:py-28">
                <div className="section-shell">
                    <p className="eyebrow">Services</p>
                    <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight text-secondary md:text-7xl">
                        Development services that meet the business where it is.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-black/64">
                        From a credible first website to a custom platform or
                        ongoing product backlog, each engagement is shaped around
                        the outcome, team, and operating reality—not a generic package.
                    </p>
                </div>
            </section>

            <section className="bg-[#101211] py-20 md:py-28">
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
