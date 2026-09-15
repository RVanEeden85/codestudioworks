import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCheck, FiExternalLink } from "react-icons/fi";
import { getProjectBySlug, projects } from "../_lib/projects";

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) return { title: "Selected Work" };

    return {
        title: project.name,
        description: project.summary,
        alternates: { canonical: `/work/${project.slug}` },
        openGraph: {
            title: `${project.name} | CodeStudioWorks Selected Work`,
            description: project.summary,
            url: `/work/${project.slug}`,
        },
    };
}

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) notFound();

    return (
        <main className="architectural-page bg-background pt-[72px]">
            <section className="project-monolith-hero border-b border-white/10 py-16 text-white md:py-24">
                <div className="section-shell">
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
                    <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[1.02] md:text-7xl">
                        {project.name}
                    </h1>
                    <p className="mt-6 max-w-4xl text-2xl font-bold leading-9 text-white/78">
                        {project.headline}
                    </p>
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
