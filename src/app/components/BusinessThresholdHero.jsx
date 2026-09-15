"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiHelpCircle } from "react-icons/fi";

const startingPoints = [
    "What the business sells or provides",
    "Who the ideal customer is",
    "What customers should be able to do online",
];

export default function BusinessThresholdHero() {
    const heroRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.13]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -46]);
    const lightX = useTransform(scrollYProgress, [0, 1], ["-22%", "18%"]);

    return (
        <section
            ref={heroRef}
            className="business-threshold-hero architectural-light relative overflow-hidden border-b border-black/10"
        >
            <motion.div
                aria-hidden="true"
                className="business-threshold-image"
                style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
            >
                <Image
                    src="/images/start-business-threshold.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[50%_center]"
                />
            </motion.div>

            <motion.div
                aria-hidden="true"
                className="business-threshold-light"
                style={prefersReducedMotion ? undefined : { x: lightX }}
            />
            <div aria-hidden="true" className="business-threshold-wash" />
            <div aria-hidden="true" className="business-threshold-depth-line" />

            <motion.div
                className="section-shell business-threshold-content relative grid gap-12 py-16 md:py-24 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.08fr_0.78fr] lg:items-center lg:py-16"
                style={prefersReducedMotion ? undefined : { y: contentY }}
            >
                <div className="max-w-4xl">
                    <motion.p
                        className="eyebrow"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22, duration: 0.65 }}
                    >
                        Starting a business
                    </motion.p>
                    <motion.h1
                        className="mt-4 max-w-5xl text-balance text-5xl font-black leading-[0.96] text-secondary md:text-7xl"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.32, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        You bring the business idea. I&apos;ll help turn it into something real and working.
                    </motion.h1>
                    <motion.p
                        className="business-threshold-copy mt-6 max-w-3xl border-l border-black/30 pl-5 text-xl font-medium leading-8 text-black/66"
                        initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.58, duration: 0.7 }}
                    >
                        You do not need to know the technical terms or arrive with a complete plan. Tell me what the business will do and what customers need—I can guide the website, online tools, launch, and support from there.
                    </motion.p>
                    <motion.div
                        className="mt-8 flex flex-col gap-3 sm:flex-row"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.72, duration: 0.7 }}
                    >
                        <Link href="/contact?service=New%20business%20launch" className="motion-magnetic inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-6 py-4 font-black text-white transition hover:bg-primary">
                            Tell Me About Your Business <FiArrowRight aria-hidden="true" />
                        </Link>
                        <Link href="/pricing" className="inline-flex items-center justify-center rounded-md border border-black/30 bg-white/60 px-6 py-4 font-black text-[#101211] backdrop-blur-md transition hover:border-black/60 hover:bg-white/85">
                            See Starting Prices
                        </Link>
                    </motion.div>
                </div>

                <motion.aside
                    className="business-threshold-card architectural-slab p-6 text-white md:p-8"
                    initial={prefersReducedMotion ? false : { opacity: 0, x: 34, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.52, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                >
                    <FiHelpCircle className="text-4xl text-accent" aria-hidden="true" />
                    <h2 className="mt-6 text-3xl font-black">Not sure what to ask for?</h2>
                    <p className="mt-4 font-medium leading-7 text-white/72">Start with these three things:</p>
                    <ul className="mt-5 grid gap-4">
                        {startingPoints.map((item, index) => (
                            <motion.li
                                key={item}
                                className="business-threshold-item flex gap-3 border border-white/10 bg-white/7 p-4 font-bold leading-6 text-white/80"
                                initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.76 + index * 0.1, duration: 0.55 }}
                            >
                                <FiCheckCircle className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /> {item}
                            </motion.li>
                        ))}
                    </ul>
                </motion.aside>
            </motion.div>

            <div aria-hidden="true" className="business-threshold-scroll-cue">
                <span>Enter the build</span>
                <i />
            </div>
        </section>
    );
}
