"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const Logo = () => {
    const { scrollYProgress } = useScroll();

    const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.25]);
    const x = useTransform(scrollYProgress, [0, 0.1], ["0vw", "-43vw"]);
    const y = useTransform(scrollYProgress, [0, 0.1], ["0vh", "66vh"]);

    return (
        <motion.div
            style={{
                position: "fixed",
                top: "30%",
                left: "50%",
                translateX: "-50%",
                translateY: "-50%",
                scale,
                x,
                y,
                zIndex: 50,
            }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <Image
                src="/images/Logo.webp"
                alt="Website design and web development services in Westland Michigan – CodeStudioWorks"
                width={600}
                height={200}
                priority
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 600px"
                className="w-auto h-auto"
            />
        </motion.div>
    );
};

export default Logo;
