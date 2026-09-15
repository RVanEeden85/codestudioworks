"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";

export default function ServicesGalleryHero() {
    const heroRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -52]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.86], [1, 0.16]);
    const lightX = useTransform(scrollYProgress, [0, 1], ["-18%", "22%"]);

    return (
        <section ref={heroRef} className="services-gallery-hero relative overflow-hidden border-b border-white/10 text-white">
            <motion.div
                aria-hidden="true"
                className="services-gallery-image"
                style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
            >
                <Image
                    src="/images/services-gallery-hero.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[50%_center]"
                />
            </motion.div>
            <motion.div
                aria-hidden="true"
                className="services-gallery-light"
                style={prefersReducedMotion ? undefined : { x: lightX }}
            />
            <div aria-hidden="true" className="services-gallery-wash" />
            <div aria-hidden="true" className="services-gallery-horizon" />

            <motion.div
                className="section-shell services-gallery-content relative flex min-h-[720px] items-center py-20 lg:min-h-[calc(100svh-72px)] lg:py-16"
                style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
            >
                <div className="max-w-[790px]">
                    <motion.p
                        className="eyebrow"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.65 }}
                    >
                        Services
                    </motion.p>
                    <motion.h1
                        className="mt-4 text-balance text-5xl font-black leading-[0.94] text-white md:text-7xl lg:text-[5rem]"
                        initial={prefersReducedMotion ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 44 }}
                        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Development services that meet the business where it is.
                    </motion.h1>
                    <motion.p
                        className="services-gallery-copy mt-7 max-w-2xl border-l border-accent/70 pl-5 text-lg font-medium leading-8 text-white/68"
                        initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.62, duration: 0.75 }}
                    >
                        From a credible first website to a custom platform or ongoing product backlog, each engagement is shaped around the outcome, team, and operating reality—not a generic package.
                    </motion.p>
                    <motion.div
                        className="mt-8"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.65 }}
                    >
                        <Link href="#service-catalog" className="motion-magnetic inline-flex items-center gap-3 border border-white/22 bg-black/28 px-5 py-4 text-sm font-black text-white backdrop-blur-sm transition hover:border-accent hover:text-accent">
                            Explore the service paths <FiArrowDownRight aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            <div aria-hidden="true" className="services-gallery-index">
                <span>04</span>
                <div>
                    <strong>Focused paths</strong>
                    <small>One accountable partner</small>
                </div>
            </div>
        </section>
    );
}
