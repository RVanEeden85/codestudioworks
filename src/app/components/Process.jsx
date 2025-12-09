"use client";

import { motion } from "framer-motion";
import {
    FaHandshake,
    FaFileInvoiceDollar,
    FaRocket,
    FaCode,
    FaSyncAlt,
    FaCheckCircle,
    FaComments,
    FaArrowAltCircleDown,
} from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../../../public/lottie/leaf-dev.json";
import { useRef, useEffect } from "react";
import BookConsultationButton from "./BookConsultationButton";

// -----------------------------
// Content Arrays
// -----------------------------

const devSteps = [
    {
        icon: <FaHandshake />,
        title: "Free Consultation",
        text: "We begin with a friendly conversation to understand your goals, challenges, and vision.",
    },
    {
        icon: <FaFileInvoiceDollar />,
        title: "Project Scope & Quote",
        text: "You receive a clear proposal detailing timelines, features, deliverables, and pricing.",
    },
    {
        icon: <FaComments />,
        title: "Strategy & Planning",
        text: "We define structure, user experience, and technical requirements before development begins.",
    },
    {
        icon: <FaCode />,
        title: "Development Begins",
        text: "Your website or application is built with clean, scalable code and regular progress updates.",
    },
    {
        icon: <FaSyncAlt />,
        title: "Review & Feedback Cycles",
        text: "You receive two dedicated review rounds to refine and perfect the project.",
    },
    {
        icon: <FaCheckCircle />,
        title: "Final Touches & Optimisation",
        text: "I refine visuals, optimise performance, enhance accessibility, and prepare for launch.",
    },
    {
        icon: <FaRocket />,
        title: "Launch & Go Live",
        text: "Once approved, your project goes live — ready for customers and growth.",
    },
    {
        icon: <FaCheckCircle />,
        title: "Post-Launch Support",
        text: "I remain available for updates, maintenance, and ongoing improvements.",
    },
];

const supportSteps = [
    {
        icon: <FaHandshake />,
        title: "Free Consultation",
        text: "We start with a short conversation so you can explain the issue and I can understand what help you need.",
    },
    {
        icon: <FaComments />,
        title: "Initial Diagnosis & Clear Pricing",
        text: "Before any work begins, I provide a diagnosis and clearly explain the estimated time and pricing. No surprises — you know the cost upfront.",
    },
    {
        icon: <FaFileInvoiceDollar />,
        title: "Secure Payment Link",
        text: "You’ll receive a secure payment link to confirm your booking and reserve your support session.",
    },
    {
        icon: <FaCode />,
        title: "Start Remote Support Session",
        text: "We connect via trusted tools like AnyDesk, Zoho Assist, or TeamViewer — you stay in full control and can see everything I do.",
    },
    {
        icon: <FaSyncAlt />,
        title: "Troubleshooting & Fixes",
        text: "I diagnose the issue fully, apply fixes, optimize performance, and answer any questions along the way.",
    },
    {
        icon: <FaCheckCircle />,
        title: "Testing & Confirmation",
        text: "We test everything together to ensure the problem has been fully resolved and your system is working smoothly.",
    },
    {
        icon: <FaFileInvoiceDollar />,
        title: "Final Invoice & Recommendations",
        text: "Once the support session is complete, you receive your invoice along with optional recommendations to help prevent future issues.",
    },
];

// -----------------------------
// Component
// -----------------------------

export default function Process({ setIsConsultationOpen }) {
    const lottieRef = useRef();

    useEffect(() => {
        lottieRef.current?.setSpeed(0.4);
    }, []);

    return (
        <section
            id="process"
            className="relative min-h-screen w-full bg-primary text-white py-20 px-6 flex flex-col items-center"
        >
            {/* Lottie Background */}
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                className="absolute top-0 right-0 opacity-10 rotate-12 pointer-events-none select-none"
            />

            {/* Title */}
            <div className="text-center mb-8 relative z-10">
                <h2 className="text-white/40 font-bold text-4xl md:text-6xl mb-6">
                    Simple and Transparent Process
                </h2>
                <p className="text-gray-200 text-lg md:text-xl">
                    Whether you're building a new website, developing software,
                    or needing IT support — here’s exactly how we work together.
                </p>
            </div>

            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 w-full max-w-6xl">
                {/* Development Process */}
                <div className="space-y-1">
                    <h3 className="text-white/60 font-bold text-2xl mb-4 flex gap-2 items-center">
                        <FaArrowAltCircleDown />
                        Web Design & Software Development
                    </h3>

                    {devSteps.map((step, i) => (
                        <div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white/10 py-3 px-10 rounded hover:bg-white/20 transition h-26"
                        >
                            <div className="flex items-center gap-4 mb-1">
                                <div className="text-white/30 text-3xl">
                                    {step.icon}
                                </div>
                                <h4 className="font-semibold text-xl">
                                    {step.title}
                                </h4>
                            </div>
                            <p className="text-white/70 text-sm">{step.text}</p>
                        </div>
                    ))}
                </div>

                {/* IT Support Process */}
                <div className="space-y-1">
                    <h3 className="text-white/60 font-bold text-2xl mb-4 flex gap-2 items-center">
                        <FaArrowAltCircleDown /> IT Support & Remote Assistance
                    </h3>

                    {supportSteps.map((step, i) => (
                        <div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white/10 py-3 px-10 rounded hover:bg-white/20 transition h-26"
                        >
                            <div className="flex items-center gap-4 mb-1">
                                <div className="text-white/30 text-3xl">
                                    {step.icon}
                                </div>
                                <h4 className="font-semibold text-xl">
                                    {step.title}
                                </h4>
                            </div>
                            <p className="text-white/70 text-sm">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Consultation Button */}
            <div className="relative z-10">
                <BookConsultationButton
                    setIsConsultationOpen={setIsConsultationOpen}
                />
            </div>
        </section>
    );
}
