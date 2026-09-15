"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { projects } from "../work/_lib/projects";
import ProjectShowcaseVisual from "./ProjectShowcaseVisual";

export default function ProjectRail() {
    const sectionRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });
    const trackX = useTransform(scrollYProgress, [0.16, 0.86], ["0%", "-58%"]);
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        mass: 0.25,
    });

    return (
        <section ref={sectionRef} id="work" className="home-project-rail bg-[#080909] text-white">
            <div className="section-shell py-20 lg:sticky lg:top-[72px] lg:flex lg:h-[calc(100svh-72px)] lg:flex-col lg:justify-center lg:overflow-hidden lg:py-12">
                <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <p className="text-sm font-black uppercase text-accent">Proof, not promises</p>
                        <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Real websites, apps, and platforms I have helped build.</h2>
                    </div>
                    <Link href="/work" className="inline-flex items-center gap-2 font-black text-accent hover:text-white">View all work <FiArrowRight aria-hidden="true" /></Link>
                </div>

                <motion.div
                    className="home-project-track mt-9 grid gap-5 lg:flex lg:w-max"
                    style={prefersReducedMotion ? undefined : { x: trackX }}
                >
                    {projects.map((project, index) => (
                        <article
                            key={project.slug}
                            className="architectural-slab project-rail-card min-h-[560px] overflow-hidden p-6 md:p-8 lg:h-[480px] lg:min-h-0 lg:w-[min(76vw,960px)]"
                        >
                            <div className="project-card-layout relative z-[3] grid h-full gap-7 lg:grid-cols-[0.76fr_1.24fr] lg:items-stretch">
                                <div className="flex min-w-0 flex-col justify-between">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.14em] text-accent">0{index + 1} · {project.context}</p>
                                        <h3 className="mt-5 text-4xl font-black leading-[0.95] md:text-5xl">{project.name}</h3>
                                    </div>
                                    <div className="mt-8">
                                        <p className="text-base font-semibold leading-7 text-white/72">{project.headline}</p>
                                        <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-white/20 pt-5">
                                            <Link href={`/work/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-black text-white hover:text-accent">Case details <FiArrowRight aria-hidden="true" /></Link>
                                            <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} website`} className="inline-flex items-center gap-2 text-sm font-bold text-white/55 hover:text-accent">Live site <FiExternalLink aria-hidden="true" /></a>
                                        </div>
                                    </div>
                                </div>
                                <ProjectShowcaseVisual project={project} priority={index === 0} />
                            </div>
                        </article>
                    ))}
                </motion.div>

                <div className="mt-7 hidden h-px overflow-hidden bg-white/12 lg:block">
                    <motion.div className="h-full origin-left bg-accent" style={{ scaleX: smoothProgress }} />
                </div>
            </div>
        </section>
    );
}
