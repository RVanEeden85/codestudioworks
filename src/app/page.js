"use client";

import ProcessDrawing from "./components/ProcessDrawing";
import CourtyardWall from "./components/CourtyardWall";
import DaylightWall from "./components/DaylightWall";
import SpotlightPortrait from "./components/SpotlightPortrait";
import Link from "next/link";
import { useState } from "react";
import CountUp from "./components/CountUp";
import {
    FiArrowRight,
    FiCheck,
    FiCode,
    FiLayers,
    FiMonitor,
    FiRefreshCw,
    FiSmartphone,
} from "react-icons/fi";
import ConsultationModal from "./components/ConsultationModal";
import StudioWalkthrough from "./components/StudioWalkthrough";
import ProjectRail from "./components/ProjectRail";
import JsonLd from "./components/JsonLd";
import { absoluteUrl, faqSchema, graphSchema } from "./_lib/seo";

const offers = [
    {
        icon: <FiMonitor aria-hidden="true" />,
        title: "Business websites",
        text: "New websites, redesigns and online stores that help customers understand your business and get in touch.",
        href: "/services/business-website-launch",
    },
    {
        icon: <FiLayers aria-hidden="true" />,
        title: "Web and mobile apps",
        text: "Customer apps, mobile apps, booking systems, portals, dashboards, and tools that replace repetitive manual work.",
        href: "/services/custom-web-apps",
    },
    {
        icon: <FiCode aria-hidden="true" />,
        title: "Ongoing development",
        text: "Regular development time for new features, fixes and connections to other tools.",
        href: "/services/fractional-development-partner",
    },
    {
        icon: <FiRefreshCw aria-hidden="true" />,
        title: "Website maintenance",
        text: "Routine updates, fixes, backups and technical checks to keep your website working.",
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
            "Yes. I’ll review your website or code, the tools you use and the work you need before recommending a plan.",
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

const homeSchema = graphSchema([
    {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/")}#webpage`,
        url: absoluteUrl("/"),
        name: "Detroit Web Developer & Software Studio | CodeStudioWorks",
        description:
            "Detroit-based web, app, and software development for small businesses, startups, and established teams worldwide.",
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        about: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-US",
    },
    faqSchema(faqs),
]);

export default function Home() {
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);
    return (
        <main id="main-content" className="architectural-page overflow-x-clip bg-background pt-[72px]">
            <JsonLd data={homeSchema} />
            <StudioWalkthrough />

            <section aria-label="Studio facts" className="border-b border-white/10 bg-[#080909]">
                <div className="section-shell grid divide-y divide-white/10 py-2 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                    {[
                        [<><CountUp key="experience" end={15} />+ years</>, "Professional software experience"],
                        ["1:1", "Direct access to the developer"],
                        ["Detroit based", "Serving Metro Detroit and Michigan"],
                        ["Worldwide", "Online meetings and digital delivery"],
                    ].map(([value, label]) => (
                        <div key={label} className="motion-reveal-item px-4 py-5 text-center">
                            <p className="text-2xl font-black text-white">{value}</p>
                            <p className="mt-1 text-sm font-bold text-white/50">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <ProjectRail />

            <section id="services" className="daylight-section daylight-morning courtyard-section architectural-light py-20 md:py-28">
                <CourtyardWall/>
                <div className="section-shell">
                    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
                        <div>
                            <p className="eyebrow">Services</p>
                            <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-6xl">How I can help.</h2>
                        </div>
                        <p className="max-w-2xl text-lg font-medium leading-8 text-black/62 lg:justify-self-end">
                            Choose a service below, or tell me what you need and I’ll help you decide.
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
                    <SpotlightPortrait />
                    <div>
                        <p className="eyebrow">Meet your developer</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-6xl">Work directly with me.</h2>
                        <p className="mt-6 text-lg font-medium leading-8 text-black/64">
                            I bring more than 15 years of software experience to your project. I plan the work, build it and keep you updated. You’ll know who to contact and what happens next.
                        </p>
                        <ul className="mt-7 grid gap-3">
                            {["Agree on the work, price and ownership before we begin", "Review progress together with clear, regular updates", "Documented code, launch support and a clear handover", "Work alongside your team and other suppliers"].map((item) => (
                                <li key={item} className="architectural-rule flex items-center gap-3 py-4 text-sm font-black text-white">
                                    <FiCheck className="shrink-0 text-primary" aria-hidden="true" /> {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/about" className="mt-7 inline-flex items-center gap-2 font-black text-primary hover:text-secondary">More About Ryno <FiArrowRight aria-hidden="true" /></Link>
                    </div>
                </div>
            </section>

            <section id="process" className="drafting-process py-20 md:py-28">
                <div className="section-shell">
                    <div className="drafting-heading">
                        <p className="eyebrow">The process</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-6xl">How your project works.</h2>
                    </div>
                    <div className="drafting-stages mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {process.map(([title, text], index) => (
                            <article key={title} className="drafting-card motion-reveal-item">
                                <div className="drafting-number"><span>0{index + 1}</span><span aria-hidden="true">{["Sketch", "Plan", "Build", "Launch"][index]}</span></div>
                                <ProcessDrawing stage={index}/>
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
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-5xl">Questions before we start?</h2>
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

            <section className="drafting-process py-16"><div className="section-shell"><p className="eyebrow">Before you build</p><h2 className="mt-4 text-3xl md:text-5xl font-bold text-secondary">Make your next decision with confidence.</h2><p className="mt-5 max-w-2xl leading-7 text-white/75">Explore practical guides to website costs, choosing between a website and an app, and preparing your project brief.</p><Link href="/guides" className="studio-primary mt-7">Explore the planning guides <FiArrowRight aria-hidden="true"/></Link></div></section>

            <section className="daylight-section daylight-evening border-t border-white/10 py-20 text-white md:py-28">
                <DaylightWall mood="evening"/>
                <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <p className="text-sm font-black uppercase text-accent">Ready to get started?</p>
                        <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Let&apos;s discuss your project.</h2>
                    </div>
                    <div className="flex flex-col gap-3 lg:pr-10">
                        <button type="button" onClick={() => setIsConsultationOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 font-black text-secondary transition hover:bg-white">
                            Request a Consultation <FiArrowRight aria-hidden="true" />
                        </button>
                        <Link href="/pricing" className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-4 font-black text-white transition hover:bg-white/10">View pricing</Link>
                    </div>
                </div>
            </section>

            <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
        </main>
    );
}
