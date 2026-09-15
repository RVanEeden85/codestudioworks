import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCheck, FiExternalLink } from "react-icons/fi";
import JsonLd from "../../components/JsonLd";
import ProjectShowcaseVisual from "../../components/ProjectShowcaseVisual";
import { absoluteUrl, breadcrumbSchema, buildMetadata, graphSchema } from "../../_lib/seo";
import { getProjectBySlug, projects } from "../_lib/projects";

const seoDescriptions = {
    "rolleston-tinting":
        "A service-led website for Rolleston Tinting, with clear automotive and architectural tinting journeys, local SEO foundations, galleries, and quote paths.",
    "state-champs-network":
        "Full-stack web and mobile development for State Champs! Sports Network across content, live events, athletes, awards, voting, fan, and sponsor experiences.",
    eventbookr:
        "Full-stack product engineering for EventBookr, an event marketplace with provider listings, customer discovery, enquiries, accounts, and planning tools.",
};

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) return buildMetadata({
        title: "Selected Development Work",
        description: "Explore selected website, application, and software work by CodeStudioWorks.",
        path: "/work",
    });

    return buildMetadata({
        title: `${project.name} Web Development Case Study`,
        description: seoDescriptions[project.slug] || project.summary,
        path: `/work/${project.slug}`,
    });
}

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) notFound();

    const path = `/work/${project.slug}`;
    const pageSchema = graphSchema([
        {
            "@type": "CreativeWork",
            "@id": `${absoluteUrl(path)}#project`,
            name: project.name,
            headline: project.headline,
            description: project.summary,
            url: absoluteUrl(path),
            image: absoluteUrl(project.media.src),
            creator: { "@id": `${absoluteUrl("/")}#ryno-van-eeden` },
            provider: { "@id": `${absoluteUrl("/")}#organization` },
            keywords: project.capabilities.join(", "),
        },
        {
            "@type": "WebPage",
            "@id": `${absoluteUrl(path)}#webpage`,
            url: absoluteUrl(path),
            name: `${project.name} Web Development Case Study`,
            mainEntity: { "@id": `${absoluteUrl(path)}#project` },
            inLanguage: "en-US",
        },
        breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Selected Work", path: "/work" },
            { name: project.name, path },
        ]),
    ]);

    return (
        <main className="architectural-page bg-background pt-[72px]">
            <JsonLd data={pageSchema} />
            <section className="project-case-hero border-b border-white/10 py-12 text-white md:py-20">
                <div className="section-shell grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                    <div className="relative z-[2]">
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 text-sm font-black text-white/70 transition hover:text-accent"
                        >
                            <FiArrowLeft aria-hidden="true" />
                            Back to Selected Work
                        </Link>
                        <p className="mt-12 text-sm font-black uppercase text-accent">
                            {project.context}
                        </p>
                        <h1 className="mt-4 text-5xl font-black leading-[1.02] md:text-7xl">
                            {project.name}
                        </h1>
                        <p className="mt-6 max-w-3xl text-xl font-bold leading-8 text-white/78 md:text-2xl md:leading-9">
                            {project.headline}
                        </p>
                    </div>
                    <ProjectShowcaseVisual project={project} variant="case" priority />
                </div>
            </section>

            <section className="project-evidence-section border-b border-white/10 py-14 md:py-20">
                <div className="section-shell">
                    <div className="grid gap-5 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.14em] text-accent">
                                Inside the project
                            </p>
                            <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
                                {project.media.evidence.title}
                            </h2>
                        </div>
                        <p className="max-w-3xl text-base font-medium leading-7 text-white/62 lg:justify-self-end">
                            {project.media.evidence.description}
                        </p>
                    </div>

                    <div className="project-evidence-grid mt-9 grid gap-4 lg:grid-cols-[1.42fr_0.58fr]">
                        <figure className="project-evidence-panel project-evidence-panel--wide">
                            <Image
                                src={project.media.evidence.src}
                                alt={project.media.evidence.alt}
                                fill
                                unoptimized
                                sizes="(max-width: 1023px) 100vw, 70vw"
                                style={{ objectPosition: project.media.evidence.position }}
                            />
                            <span className="project-evidence-wash" aria-hidden="true" />
                            <figcaption>
                                <span>Public interface view</span>
                                <strong>{project.media.evidence.focus}</strong>
                            </figcaption>
                        </figure>
                        <figure className="project-evidence-panel project-evidence-panel--crop" aria-hidden="true">
                            <Image
                                src={project.media.evidence.src}
                                alt=""
                                fill
                                unoptimized
                                sizes="(max-width: 1023px) 100vw, 30vw"
                                style={{ objectPosition: project.media.evidence.focusPosition }}
                            />
                            <span className="project-evidence-wash" aria-hidden="true" />
                            <figcaption>
                                <span>Closer look</span>
                                <strong>Focused content detail</strong>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="section-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                    <aside className="lg:sticky lg:top-28 lg:self-start">
                        <div className="architectural-slab p-6">
                            <p className="eyebrow">Nature of the work</p>
                            <p className="mt-4 font-bold leading-7 text-secondary/76">
                                {project.role}
                            </p>
                            <a
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-primary hover:text-secondary"
                            >
                                {project.hrefLabel}
                                <FiExternalLink aria-hidden="true" />
                            </a>
                        </div>
                    </aside>

                    <div>
                        <p className="text-lg font-medium leading-8 text-black/66">
                            {project.summary}
                        </p>
                        <h2 className="mt-10 text-3xl font-black text-secondary">
                            What the work includes
                        </h2>
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {project.outcomes.map((item) => (
                                <div
                                    key={item}
                                    className="architectural-slab p-5"
                                >
                                    <FiCheck className="text-2xl text-primary" />
                                    <p className="mt-4 font-black leading-6 text-secondary">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="monolith-cta mt-10 border border-white/10 p-6 text-white md:p-8">
                            <p className="text-sm font-black uppercase text-accent">
                                Your project will be different
                            </p>
                            <h2 className="mt-3 text-3xl font-black">
                                Start with the business problem, not a technical feature list.
                            </h2>
                            <p className="mt-4 max-w-3xl font-medium leading-7 text-white/72">
                                I&apos;ll help define the right scope, identify the
                                riskiest assumptions, and shape a practical path
                                from first release to ongoing improvement.
                            </p>
                            <Link
                                href="/contact"
                                className="mt-6 inline-flex rounded-md bg-accent px-5 py-3 text-sm font-black text-secondary transition hover:bg-white"
                            >
                                Discuss Your Project
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
