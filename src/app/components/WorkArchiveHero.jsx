"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";

export default function WorkArchiveHero() {
    const heroRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.025, 1.115]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -48]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.86], [1, 0.14]);
    const lightX = useTransform(scrollYProgress, [0, 1], ["-20%", "24%"]);

    return (
        <section
            ref={heroRef}
            className="work-archive-hero relative overflow-hidden border-b border-white/10 text-white"
        >
            <motion.div
                aria-hidden="true"
                className="work-archive-image"
                style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
            >
                <Image
                    src="/images/work-archive-hero.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[50%_center]"
                />
            </motion.div>
            <motion.div
                aria-hidden="true"
                className="work-archive-light"
                style={prefersReducedMotion ? undefined : { x: lightX }}
            />
            <div aria-hidden="true" className="work-archive-wash" />
            <div aria-hidden="true" className="work-archive-horizon" />

            <motion.div
                className="section-shell work-archive-content relative flex min-h-[720px] items-center py-20 lg:min-h-[calc(100svh-72px)] lg:py-16"
                style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
            >
                <div className="max-w-[820px]">
                    <motion.p
                        className="eyebrow"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.65 }}
                    >
                        Selected work
                    </motion.p>
                    <motion.h1
                        className="mt-4 text-balance text-5xl font-black leading-[0.94] text-white md:text-7xl lg:text-[5rem]"
                        initial={
                            prefersReducedMotion
                                ? false
                                : { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 44 }
                        }
                        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        Real websites and software, with my role clearly explained.
                    </motion.h1>
                    <motion.p
                        className="work-archive-copy mt-7 max-w-2xl border-l border-accent/70 pl-5 text-lg font-medium leading-8 text-white/68"
                        initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.62, duration: 0.75 }}
                    >
                        These examples include a client website, professional software work,
                        and an independently developed product. Each one explains what I
                        contributed without overstating results or ownership.
                    </motion.p>
                    <motion.div
                        className="mt-8"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.65 }}
                    >
                        <Link
                            href="#selected-work"
                            className="motion-magnetic inline-flex items-center gap-3 border border-white/22 bg-black/28 px-5 py-4 text-sm font-black text-white backdrop-blur-sm transition hover:border-accent hover:text-accent"
                        >
                            Explore the selected work <FiArrowDownRight aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            <div aria-hidden="true" className="work-archive-index">
                <span>03</span>
                <div>
                    <strong>Selected builds</strong>
                    <small>Clearly attributed</small>
                </div>
            </div>
        </section>
    );
}
