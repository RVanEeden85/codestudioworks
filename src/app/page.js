"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Services from "./components/Services";
import Process from "./components/Process";
import InfoSection from "./components/Info";
import InstantQuote from "./components/Quote";
import About from "./components/About";
import Contact from "./components/Contact";
import Technologies from "./components/Technologies";
import ConsultationModal from "./components/ConsultationModal";
import ParallaxBackground from "./components/ParallaxBackground";

export default function Home() {
    const { scrollYProgress } = useScroll();

    const x = useTransform(scrollYProgress, [0, 0.2], ["0vw", "-40vw"]);
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);

    return (
        <main className="overflow-hidden">
            <ParallaxBackground image={"/images/bg.jpg"} />

            <About />
            <Services />
            <Process setIsConsultationOpen={setIsConsultationOpen} />
            <Technologies />
            <InfoSection setIsConsultationOpen={setIsConsultationOpen} />
            {/* <InstantQuote /> */}
            <Contact />
            <ConsultationModal
                isOpen={isConsultationOpen}
                onClose={() => setIsConsultationOpen(false)}
            />
        </main>
    );
}
