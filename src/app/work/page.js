import Link from "next/link";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import WorkArchiveHero from "../components/WorkArchiveHero";
import JsonLd from "../components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata, graphSchema } from "../_lib/seo";
import { projects } from "./_lib/projects";

export const metadata = buildMetadata({
    title: "Web Development Portfolio & Software Case Studies",
    description:
        "See selected website, web app, mobile, and platform work by CodeStudioWorks, a Detroit-based independent developer serving businesses worldwide.",
    path: "/work",
});

const pageSchema = graphSchema([
    {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/work")}#webpage`,
        url: absoluteUrl("/work"),
        name: "Web Development Portfolio and Software Case Studies",
        description:
            "Selected website, app, mobile, and platform work by CodeStudioWorks.",
        mainEntity: { "@id": `${absoluteUrl("/work")}#projects` },
        about: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-US",
    },
    {
        "@type": "ItemList",
        "@id": `${absoluteUrl("/work")}#projects`,
        itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.name,
            url: absoluteUrl(`/work/${project.slug}`),
        })),
    },
    breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Selected Work", path: "/work" },
    ]),
]);

export default function WorkPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <JsonLd data={pageSchema} />
            <WorkArchiveHero />

            <section id="selected-work" className="scroll-mt-24 py-16 md:py-20">
                <div className="work-gallery section-shell grid gap-8">
                    {projects.map((project, index) => (
                        <article
                            key={project.slug}
                            className="work-gallery-card architectural-slab grid overflow-hidden lg:grid-cols-[0.78fr_1.22fr]"
                        >
                            <div className="work-gallery-visual relative flex min-h-72 flex-col justify-between overflow-hidden bg-secondary p-6 text-white md:p-8 lg:sticky lg:top-[92px] lg:h-[calc(100vh-116px)] lg:max-h-[680px]">
                                <div className="noise-overlay absolute inset-0 opacity-30" />
                                <div className="relative">
                                    <p className="text-sm font-black uppercase text-accent">
                                        0{index + 1} · {project.context}
                                    </p>
                                    <p className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                                        {project.name}
                                    </p>
                                </div>
                                <div className="relative mt-12 flex flex-wrap gap-2">
                                    {project.capabilities.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs font-bold text-white/72"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 text-white md:p-8 lg:p-10">
                                <h2 className="max-w-3xl text-3xl font-black leading-tight text-secondary md:text-4xl">
                                    {project.headline}
                                </h2>
                                <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-black/64">
                                    {project.summary}
                                </p>
                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href={`/work/${project.slug}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-5 py-3 text-sm font-black text-white transition hover:bg-primary"
                                    >
                                        View Project Details
                                        <FiArrowRight aria-hidden="true" />
                                    </Link>
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-md border border-black/10 px-5 py-3 text-sm font-black text-secondary transition hover:border-primary"
                                    >
                                        {project.hrefLabel}
                                        <FiExternalLink aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="monolith-cta border-t border-white/10 py-20 text-white md:py-28">
                <div className="section-shell grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <p className="text-sm font-black uppercase text-accent">
                            Need something similar?
                        </p>
                        <h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-5xl">
                            Let&apos;s discuss the outcome your business needs.
                        </h2>
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 font-black text-secondary transition hover:bg-white"
                    >
                        Discuss Your Project
                        <FiArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
