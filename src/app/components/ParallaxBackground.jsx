"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function ParallaxBackground({ image }) {
    const services = [
        {
            serviceHeading: "Web Development",
            serviceDescription: "Building responsive and modern websites.",
            link: "/services/web-development",
        },

        {
            serviceHeading: "Paid Ads Management",
            serviceDescription:
                "Maximizing ROI with targeted advertising campaigns.",
            link: "/services/paid-ads-management",
        },

        {
            serviceHeading: "SEO Optimization",
            serviceDescription:
                "Improving search engine rankings and visibility.",
            link: "/services/seo-optimization",
        },

        {
            serviceHeading: "Social Media Management",
            serviceDescription:
                "Growing your brand presence on social platforms.",
            link: "/services/social-media-management",
        },

        {
            serviceHeading: "Mobile App Development",
            serviceDescription: "Creating user-friendly mobile applications.",
            link: "/services/mobile-app-development",
        },
        {
            serviceHeading: "UI/UX Design",
            serviceDescription:
                "Designing intuitive and engaging user interfaces.",
            link: "/services/ui-ux-design",
        },
    ];

    const ref = useRef(null);

    // Track scroll progress of this section
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

    return (
        <section
            ref={ref}
            className="relative h-[100vh] overflow-hidden w-full flex flex-col items-center justify-end"
        >
            {/* Background image that scales */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${image})`,
                    scale,
                }}
            />

            {/* Optional dark overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Foreground content */}
            {/* <div className="relative z-10 flex items-center justify-center h-full text-white text-5xl font-bold">
                Your Page Content Here
            </div> */}

            {/* Quick Link Service Blocks */}
            <div className="max-w-8xl mx-auto py-20 relative z-10">
                <div className="grid grid-cols-6 gap-3 text-white">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={service.link}
                            className="w-full h-full flex flex-col border-white/20 border-1 bg-white/20 backdrop-blur-sm p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="">
                                <h2 className="text-xl font-semibold">
                                    {service.serviceHeading}
                                </h2>
                                <p className="text-sm ">
                                    {service.serviceDescription}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
