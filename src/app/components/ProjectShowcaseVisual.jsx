"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ProjectShowcaseVisual({ project, variant = "rail", priority = false }) {
    const visualRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: visualRef,
        offset: ["start end", "end start"],
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 95,
        damping: 30,
        mass: 0.35,
    });
    const detailY = useTransform(smoothProgress, [0, 1], ["5%", "-5%"]);

    return (
        <motion.figure
            ref={visualRef}
            className={`project-showcase project-showcase--${variant} project-showcase--${project.media.tone}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="project-showcase-void" aria-hidden="true" />
            <div className="project-showcase-frame project-showcase-frame--desktop">
                <div className="project-browser-bar" aria-hidden="true">
                    <span className="project-browser-dots"><i /><i /><i /></span>
                    <span className="project-browser-domain">{project.media.domain}</span>
                    <span className="project-browser-live">Live interface</span>
                </div>
                <div className="project-showcase-screen">
                    <div className="project-showcase-image">
                        <Image
                            src={project.media.src}
                            alt={project.media.alt}
                            fill
                            priority={priority}
                            unoptimized
                            sizes={variant === "case" ? "(max-width: 1023px) 100vw, 58vw" : "(max-width: 1023px) 100vw, 52vw"}
                            style={{ objectPosition: project.media.position }}
                        />
                    </div>
                    <span className="project-showcase-glass" aria-hidden="true" />
                </div>
            </div>

            <motion.div
                className="project-showcase-frame project-showcase-frame--detail"
                style={prefersReducedMotion ? undefined : { y: detailY }}
                aria-hidden="true"
            >
                <span className="project-phone-speaker" />
                <div className="project-showcase-screen">
                    <Image
                        src={project.media.mobileSrc}
                        alt=""
                        fill
                        unoptimized
                        sizes="180px"
                        style={{ objectPosition: "top center" }}
                    />
                </div>
            </motion.div>

            <figcaption className="project-showcase-caption">
                <span>Public project view</span>
                <span aria-hidden="true">↗</span>
            </figcaption>
        </motion.figure>
    );
}
