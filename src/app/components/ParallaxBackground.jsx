"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBackground({ image }) {
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
            className="relative h-[100vh] overflow-hidden w-full"
        >
            {/* Background image that scales */}
            <motion.div
                style={{ scale }}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${image})`,
                    scale: scale,
                }}
            />

            {/* Optional dark overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Foreground content */}
            {/* <div className="relative z-10 flex items-center justify-center h-full text-white text-5xl font-bold">
                Your Page Content Here
            </div> */}
        </section>
    );
}
