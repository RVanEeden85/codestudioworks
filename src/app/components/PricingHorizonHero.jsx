"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiCheck } from "react-icons/fi";

const principles = [
    {
        number: "01",
        title: "Useful starting guides",
        detail: "All public figures are starting points in USD.",
    },
    {
        number: "02",
        title: "Support stays optional",
        detail: "Monthly support is planned and priced separately.",
    },
    {
        number: "03",
        title: "The proposal is precise",
        detail: "Scope, ownership, timeline, and price are confirmed in writing.",
    },
];

export default function PricingHorizonHero() {
    const heroRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -42]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.86], [1, 0.12]);
    const lightX = useTransform(scrollYProgress, [0, 1], ["-16%", "18%"]);

    return (
        <section
            ref={heroRef}
            className="pricing-horizon-hero relative overflow-hidden border-b border-white/10 text-white"
        >
            <motion.div
                aria-hidden="true"
                className="pricing-horizon-image"
                style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
            >
                <Image
                    src="/images/pricing-measured-horizon.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </motion.div>
            <motion.div
                aria-hidden="true"
                className="pricing-horizon-light"
                style={prefersReducedMotion ? undefined : { x: lightX }}
            />
            <div aria-hidden="true" className="pricing-horizon-wash" />

            <motion.div
                className="pricing-horizon-layout section-shell relative flex min-h-[800px] flex-col py-14 md:min-h-[calc(100svh-72px)] md:py-16"
                style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
            >
                <div className="pricing-horizon-copy mx-auto max-w-5xl pt-8 text-center md:pt-[5vh]">
                    <motion.div
                        className="pricing-horizon-eyebrow"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.65 }}
                    >
                        <i aria-hidden="true" />
                        <span>Pricing and engagements</span>
                        <i aria-hidden="true" />
                    </motion.div>
                    <motion.h1
                        className="mt-5 text-balance text-5xl font-black leading-[0.94] text-white md:text-7xl lg:text-[5.35rem]"
                        initial={
                            prefersReducedMotion
                                ? false
                                : { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 40 }
                        }
                        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        Clear starting prices.
                        <span className="block text-white/72">
                            A plan based on what you actually need.
                        </span>
                    </motion.h1>
                    <motion.p
                        className="mx-auto mt-7 max-w-2xl text-base font-medium leading-7 text-white/68 md:text-lg md:leading-8"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.62, duration: 0.75 }}
                    >
                        Compare the common ways to work with CodeStudioWorks, then share the
                        shape of your project. You will receive a tailored next step instead
                        of a misleading automatic quote.
                    </motion.p>
                    <motion.div
                        className="mt-8"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.78, duration: 0.65 }}
                    >
                        <Link
                            href="#pricing-options"
                            className="motion-magnetic inline-flex items-center gap-3 border border-white/22 bg-black/34 px-5 py-4 text-sm font-black text-white backdrop-blur-sm transition hover:border-accent hover:text-accent"
                        >
                            Explore starting prices <FiArrowDown aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    className="pricing-horizon-principles mt-auto grid border-y border-white/12 bg-black/42 backdrop-blur-md md:grid-cols-3"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                >
                    {principles.map((principle) => (
                        <div key={principle.number} className="pricing-horizon-principle">
                            <div className="flex items-center gap-3">
                                <span>{principle.number}</span>
                                <FiCheck aria-hidden="true" />
                            </div>
                            <div>
                                <strong>{principle.title}</strong>
                                <p>{principle.detail}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
