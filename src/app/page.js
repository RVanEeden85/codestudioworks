"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import {
    FiArrowRight,
    FiBriefcase,
    FiCheck,
    FiCode,
    FiLayers,
    FiMonitor,
    FiRefreshCw,
    FiSmartphone,
} from "react-icons/fi";
import ConsultationModal from "./components/ConsultationModal";
import CountUp from "./components/CountUp";
import ProjectRail from "./components/ProjectRail";

const audiences = [
    {
        icon: <FiMonitor aria-hidden="true" />,
        label: "Starting a business",
        title: "Go from an idea to a professional online business.",
        text: "I help you decide what you need, then build and launch the website, forms, bookings, payments, or online tools that make it work.",
        href: "/start-a-business",
    },
    {
        icon: <FiSmartphone aria-hidden="true" />,
        label: "For startups",
        title: "Turn a product idea into a useful first version.",
        text: "We decide which features matter first, avoid unnecessary costs, and build a web or mobile app that real customers can use.",
        href: "/services/custom-web-apps",
    },
    {
        icon: <FiBriefcase aria-hidden="true" />,
        label: "For growing teams",
        title: "Get ongoing development help without hiring a full team.",
        text: "I can work through improvements, integrations, fixes, and new features while giving your company one accountable technical partner.",
        href: "/services/fractional-development-partner",
    },
];

const offers = [
    {
        icon: <FiMonitor aria-hidden="true" />,
        title: "Business Websites",
        text: "Professional websites, redesigns, e-commerce foundations, and conversion-focused customer journeys.",
        href: "/services/business-website-launch",
    },
    {
        icon: <FiLayers aria-hidden="true" />,
        title: "Apps & Business Tools",
        text: "Customer apps, mobile apps, booking systems, portals, dashboards, and tools that replace repetitive manual work.",
        href: "/services/custom-web-apps",
    },
    {
        icon: <FiCode aria-hidden="true" />,
        title: "Ongoing Development Support",
        text: "Regular help for companies that need new features, improvements, integrations, and one accountable developer.",
        href: "/services/fractional-development-partner",
    },
    {
        icon: <FiRefreshCw aria-hidden="true" />,
        title: "Website & Technical Support",
        text: "Updates, maintenance, hosting guidance, search improvements, integrations, and help with existing websites or systems.",
        href: "/services/care-maintenance",
    },
];

const process = [
    ["Tell me about the business", "Explain what you sell, who you want to reach, and what customers should be able to do online."],
    ["Decide what you need", "I turn that goal into a clear recommendation and written plan covering the work, price, timeline, and responsibilities."],
    ["Design, build & connect", "I create the experience and connect agreed essentials such as forms, bookings, payments, email, or other tools."],
    ["Test, launch & support", "I make sure it works, help take it live, give you the right access, and remain available after launch."],
];

const faqs = [
    {
        question: "What if I am starting a business and do not know what I need?",
        answer:
            "That is completely fine. Start by explaining the business, your customers, and what you want them to do. I will help identify whether you need a straightforward website, bookings, payments, an online store, a custom tool, or a phased combination.",
    },
    {
        question: "Can you help with the domain, hosting, business email, forms, and payments?",
        answer:
            "Yes. These can be included or coordinated when they are relevant to the project. Your proposal will clearly separate my work from third-party subscriptions such as hosting, email, payment processing, or booking platforms.",
    },
    {
        question: "Do I need a finished logo and all my content before contacting you?",
        answer:
            "No. We can identify what is missing during planning. I can structure the pages and guide the content needed; substantial branding, professional copywriting, or photography can be scoped separately or coordinated with a specialist.",
    },
    {
        question: "Do you work only with small businesses?",
        answer:
            "No. I work with small businesses, startups, and established teams that need a focused project or reliable ongoing development help without building a full internal team.",
    },
    {
        question: "Can you join an existing project?",
        answer:
            "Yes. I can review an existing codebase, website, vendor setup, or backlog and recommend the safest way to take responsibility for the next stage.",
    },
    {
        question: "Do you build mobile applications?",
        answer:
            "Yes. Depending on the product, I can build React Native applications or recommend a responsive web application when that is the more practical route.",
    },
    {
        question: "Who will I communicate with?",
        answer:
            "You work directly with me, Ryno—the person scoping, designing, developing, and supporting the work. Specialist partners are discussed before they are involved.",
    },
    {
        question: "What happens after launch?",
        answer:
            "You receive a clear handoff and can choose ongoing care, a monthly development partnership, or request future improvements as separate work.",
    },
];

export default function Home() {
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);
    const heroRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const foregroundX = useSpring(pointerX, { stiffness: 45, damping: 20 });
    const foregroundY = useSpring(pointerY, { stiffness: 45, damping: 20 });
    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroScale = useTransform(heroScrollProgress, [0, 1], [1.03, 1.14]);
    const heroImageY = useTransform(heroScrollProgress, [0, 1], ["0%", "11%"]);
    const heroContentY = useTransform(heroScrollProgress, [0, 1], [0, -56]);
    const heroContentOpacity = useTransform(heroScrollProgress, [0, 0.82], [1, 0.12]);

    function handleHeroPointerMove(event) {
        if (prefersReducedMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        pointerX.set(x * 18);
        pointerY.set(y * 12);
    }

    function resetHeroPointer() {
        pointerX.set(0);
        pointerY.set(0);
    }

    return (
        <main className="architectural-page overflow-x-clip bg-background pt-[72px]">
            <section
                ref={heroRef}
                className="hero-architecture relative overflow-hidden border-b border-white/10 bg-black text-white"
                onPointerMove={handleHeroPointerMove}
                onPointerLeave={resetHeroPointer}
            >
                <motion.div
                    className="hero-depth-base"
                    style={prefersReducedMotion ? undefined : { y: heroImageY, scale: heroScale }}
                >
                    <Image
                        src="/images/architectural-hero.png"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[64%_center]"
                    />
                </motion.div>
                <motion.div
                    aria-hidden="true"
                    className="hero-depth-foreground"
                    style={prefersReducedMotion ? undefined : { x: foregroundX, y: foregroundY }}
                />
                <div aria-hidden="true" className="hero-light-sweep" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,9,0.98)_0%,rgba(8,9,9,0.9)_43%,rgba(8,9,9,0.18)_76%,rgba(8,9,9,0.05)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,9,0.08),rgba(8,9,9,0.42))]" />
                <motion.div
                    className="section-shell relative grid gap-12 py-20 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.14fr_0.7fr] lg:items-center lg:py-16"
                    style={prefersReducedMotion ? undefined : { y: heroContentY, opacity: heroContentOpacity }}
                >
                    <div className="max-w-4xl">
                        <motion.p
                            className="eyebrow mb-4"
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.28, duration: 0.7 }}
                        >Websites, apps and software—from idea to launch</motion.p>
                        <motion.h1
                            className="hero-heading-reveal text-balance text-5xl font-black leading-[0.9] text-white sm:text-6xl lg:text-[5.35rem]"
                            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 }}
                            transition={{ delay: 0.38, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                        >
                            I turn business ideas into working websites, apps and software.
                        </motion.h1>
                        <motion.p
                            className="mt-8 max-w-2xl border-l border-accent/70 pl-5 text-lg font-medium leading-8 text-white/68"
                            initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.72, duration: 0.75 }}
                        >
                            Starting from scratch? I can help you decide what you need, design and build it, connect the essential services, and take it live. Already established? I can improve an existing product or provide ongoing development support.
                        </motion.p>
                        <motion.div
                            className="mt-8 flex flex-col gap-3 sm:flex-row"
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.88, duration: 0.7 }}
                        >
                            <Link
                                href="/start-a-business"
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 text-base font-black text-[#080909] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            >
                                I&apos;m Starting a Business
                                <FiArrowRight aria-hidden="true" />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setIsConsultationOpen(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-black/35 px-6 py-4 text-base font-black text-white backdrop-blur-md transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            >
                                I Need Development Help
                            </button>
                        </motion.div>
                    </div>

                    <motion.div
                        className="motion-static architectural-slab self-end p-4 text-white sm:p-5 lg:mb-6"
                        initial={prefersReducedMotion ? false : { opacity: 0, x: 56, rotateY: -5 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ delay: 0.72, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="border border-white/10 bg-black/40 p-5 backdrop-blur-md">
                            <p className="text-xs font-black uppercase text-accent">From your first idea to a live result</p>
                            <p className="mt-2 text-2xl font-black">You do not need to arrive with a technical plan.</p>
                            <div className="mt-5 grid gap-3">
                                {["Explain the business and its goals", "Get a clear recommendation and written project plan", "Review the design and build as it takes shape", "Launch with the right access and ongoing support"].map((item, index) => (
                                    <motion.div
                                        key={item}
                                        className="hero-step-line flex items-start gap-3 border-t border-white/14 py-4 first:border-t-0"
                                        initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.7, x: 16 }}
                                        animate={{ opacity: 1, scaleX: 1, x: 0 }}
                                        transition={{ delay: 1 + index * 0.1, duration: 0.55 }}
                                    >
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-black text-[#080909]">{index + 1}</span>
                                        <p className="font-bold leading-6 text-white/78">{item}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            <section aria-label="Studio facts" className="border-b border-white/10 bg-[#080909]">
                <div className="section-shell grid divide-y divide-white/10 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {[
                        [<><CountUp key="experience" end={15} />+ years</>, "Professional software experience"],
                        ["1:1", "Direct access to the developer"],
                        ["Websites + apps", "Planning, building, and launch help"],
                    ].map(([value, label]) => (
                        <div key={label} className="motion-reveal-item px-4 py-5 text-center">
                            <p className="text-2xl font-black text-white">{value}</p>
                            <p className="mt-1 text-sm font-bold text-white/50">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="concrete-panel-wall architectural-light py-20 md:py-28">
                <div aria-hidden="true" className="concrete-cast-shadows" />
                <div className="section-shell">
                    <div className="max-w-3xl">
                        <p className="eyebrow">Choose the situation that sounds like yours</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-6xl">
                            Start with your business situation—not technical terminology.
                        </h2>
                    </div>
                    <div className="mt-10 grid gap-4 lg:grid-cols-3">
                        {audiences.map((item) => (
                            <article key={item.label} className="architectural-slab flex flex-col p-7 text-white">
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-2xl text-[#080909]">{item.icon}</div>
                                <p className="lime-index mt-8">{item.label}</p>
                                <h3 className="mt-3 text-2xl font-black leading-tight text-white">{item.title}</h3>
                                <p className="mt-4 flex-1 font-medium leading-7 text-white/62">{item.text}</p>
                                <Link href={item.href} className="mt-8 inline-flex items-center gap-2 border-t border-white/14 pt-5 text-sm font-black text-accent hover:text-white">
                                    Explore this option <FiArrowRight aria-hidden="true" />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <ProjectRail />

            <section id="services" className="concrete-image-section architectural-light py-20 md:py-28">
                <div className="section-shell">
                    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
                        <div>
                            <p className="eyebrow">Services</p>
                            <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-6xl">Clear ways I can help your business.</h2>
                        </div>
                        <p className="max-w-2xl text-lg font-medium leading-8 text-black/62 lg:justify-self-end">
                            You do not need to choose the technical solution yourself. Tell me the problem or goal and I will recommend the most practical service and next step.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                        {offers.map((offer) => (
                            <Link key={offer.title} href={offer.href} className="architectural-slab service-motion-card group p-7 text-white transition hover:border-accent/50">
                                <div className="flex items-start justify-between gap-6">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-2xl text-[#080909]">{offer.icon}</span>
                                    <FiArrowRight className="text-xl text-accent transition group-hover:translate-x-1" aria-hidden="true" />
                                </div>
                                <h3 className="mt-7 text-2xl font-black text-white">{offer.title}</h3>
                                <p className="mt-3 font-medium leading-7 text-white/62">{offer.text}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#101211] py-20 md:py-28">
                <div className="section-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                    <div className="founder-portrait relative overflow-hidden border border-white/12 bg-black">
                        <Image src="/images/ryno.webp" alt="Ryno van Eeden, founder and full-stack developer at CodeStudioWorks" width={900} height={1000} className="aspect-[4/5] w-full object-cover grayscale contrast-[1.08]" sizes="(max-width: 1024px) 100vw, 42vw" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/82 to-transparent p-6">
                            <p className="text-sm font-black uppercase text-accent">Founder-led delivery</p>
                            <p className="mt-2 text-2xl font-black text-white">Ryno van Eeden</p>
                        </div>
                    </div>
                    <div>
                        <p className="eyebrow">One accountable partner</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-6xl">Work directly with the person making the technical decisions.</h2>
                        <p className="mt-6 text-lg font-medium leading-8 text-black/64">
                            I bring 15 years of software experience across websites, applications, mobile products, integrations, and ongoing platform work. You get direct communication, visible progress, and a build shaped around the business—not an agency handoff chain.
                        </p>
                        <ul className="mt-7 grid gap-3">
                            {["Clear scope and ownership before work begins", "Regular review points and plain-English updates", "Documentation, deployment, and maintainable handoff", "Flexible collaboration with your team or existing partners"].map((item) => (
                                <li key={item} className="architectural-rule flex items-center gap-3 py-4 text-sm font-black text-white">
                                    <FiCheck className="shrink-0 text-primary" aria-hidden="true" /> {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/about" className="mt-7 inline-flex items-center gap-2 font-black text-primary hover:text-secondary">More About Ryno <FiArrowRight aria-hidden="true" /></Link>
                    </div>
                </div>
            </section>

            <section id="process" className="concrete-panel-wall architectural-light py-20 md:py-28">
                <div aria-hidden="true" className="concrete-cast-shadows" />
                <div className="section-shell">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="eyebrow">How the work moves</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-6xl">From conversation to something real and working.</h2>
                    </div>
                    <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-4">
                        {process.map(([title, text], index) => (
                            <article key={title} className="process-slab motion-reveal-item bg-[#cfccc4] p-7">
                                <p className="text-sm font-black text-[#263c33]">0{index + 1}</p>
                                <h3 className="mt-8 text-2xl font-black text-secondary">{title}</h3>
                                <p className="mt-3 font-medium leading-7 text-black/62">{text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#101211] py-20 md:py-28">
                <div className="section-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                    <div>
                        <p className="eyebrow">Common questions</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-5xl">Useful answers before the first conversation.</h2>
                    </div>
                    <div className="grid gap-3">
                        {faqs.map((faq) => (
                            <details key={faq.question} className="group border-t border-white/16 bg-transparent py-6">
                                <summary className="cursor-pointer list-none pr-8 text-lg font-black text-secondary marker:hidden">{faq.question}</summary>
                                <p className="mt-4 max-w-3xl font-medium leading-7 text-black/64">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="monolith-cta cinematic-cta border-t border-white/10 py-20 text-white md:py-28">
                <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <p className="text-sm font-black uppercase text-accent">Ready to define the right first step?</p>
                        <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Let&apos;s turn your idea or business problem into a practical plan.</h2>
                    </div>
                    <div className="flex flex-col gap-3 lg:pr-10">
                        <button type="button" onClick={() => setIsConsultationOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 font-black text-secondary transition hover:bg-white">
                            Request a Consultation <FiArrowRight aria-hidden="true" />
                        </button>
                        <Link href="/pricing" className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-4 font-black text-white transition hover:bg-white/10">Explore Pricing & Engagements</Link>
                    </div>
                </div>
            </section>

            <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
        </main>
    );
}
