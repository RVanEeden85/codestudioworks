import Link from "next/link";
import {
    FiArrowRight,
    FiCheck,
    FiGlobe,
} from "react-icons/fi";
import BusinessThresholdHero from "../components/BusinessThresholdHero";
import JsonLd from "../components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata, faqSchema, graphSchema } from "../_lib/seo";

export const metadata = buildMetadata({
    title: "Small Business Website & Online Launch Help",
    description:
        "Launch a new business with a professional website, bookings, payments, email, and online tools from a Detroit-based developer serving clients worldwide.",
    path: "/start-a-business",
});

const launchSteps = [
    ["Tell me about the idea", "You explain the business, the customer, what you plan to sell, and what success should look like. No technical document is required."],
    ["Work out what is actually needed", "I recommend the simplest useful combination of website pages, customer actions, business tools, and third-party services."],
    ["Confirm the plan", "You receive a written project plan covering the work, price, timeline, responsibilities, and costs that sit outside the project."],
    ["Review the design", "I shape the structure and visual direction so you can see how customers will understand and use the business online."],
    ["Build and connect everything", "I develop the approved experience and connect the agreed forms, bookings, payments, email, hosting, visitor measurement, or other services."],
    ["Test and go live", "We check the important journeys, launch the finished project, confirm your access, and decide what support is useful afterward."],
];

const buildingBlocks = [
    "A professional website that clearly explains the business",
    "Domain and hosting setup or guidance",
    "Enquiry, quote, appointment, or booking forms",
    "Online payments, products, or service deposits",
    "Professional email and customer-notification setup",
    "Search, local visibility, and visitor measurement",
    "Customer portals, dashboards, or custom business tools",
    "Ongoing updates and technical support after launch",
];

const faqs = [
    ["What if I only have an idea?", "That is enough to begin a first conversation. I will ask practical questions and help turn the idea into a sensible first scope."],
    ["Do I need to know whether I need a website or an app?", "No. Explain what the customer and the business need to accomplish. I will recommend the simplest suitable solution and explain why."],
    ["Do I need a logo and written content already?", "No. We will identify what exists and what is missing. Page structure and content guidance can be included; larger branding, copywriting, or photography needs can be scoped separately."],
    ["Are hosting and other subscriptions included?", "Third-party costs such as domains, hosting, professional email, booking software, and payment fees are identified separately. Wherever practical, those accounts remain in your business's name."],
    ["Will I be able to update the website?", "If regular editing is important, I can include suitable website editing tools and show you how to use them."],
];

const pageSchema = graphSchema([
    {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/start-a-business")}#webpage`,
        url: absoluteUrl("/start-a-business"),
        name: "Small Business Website and Online Launch Help",
        description:
            "Practical planning, website development, and online launch help for new businesses in Detroit, Michigan, and worldwide.",
        about: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-US",
    },
    breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Starting a Business", path: "/start-a-business" },
    ]),
    faqSchema(faqs),
]);

export default function StartABusinessPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <JsonLd data={pageSchema} />
            <BusinessThresholdHero />

            <section className="bg-[#101211] py-20 md:py-28">
                <div className="section-shell">
                    <div className="max-w-4xl">
                        <p className="eyebrow">What I can help put in place</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-6xl">The online foundation your business actually needs.</h2>
                        <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-black/64">Not every business needs every item. I recommend the useful pieces and leave out complexity that does not support the launch.</p>
                    </div>
                    <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {buildingBlocks.map((item) => (
                            <div key={item} className="architectural-slab p-5">
                                <FiCheck className="text-2xl text-primary" aria-hidden="true" />
                                <p className="mt-4 font-black leading-6 text-secondary">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="concrete-panel-wall architectural-light py-20 md:py-28">
                <div aria-hidden="true" className="concrete-cast-shadows" />
                <div className="section-shell grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
                    <div>
                        <p className="eyebrow">From idea to launch</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-5xl">A guided process, one understandable step at a time.</h2>
                        <div className="architectural-slab mt-7 p-6 text-white">
                            <FiGlobe className="text-3xl text-accent" aria-hidden="true" />
                            <p className="mt-4 font-bold leading-7 text-white/76">The goal is not simply to deliver files. It is to leave you with a functioning live result, the right account access, and a clear next step.</p>
                        </div>
                    </div>
                    <ol className="grid gap-4 md:grid-cols-2">
                        {launchSteps.map(([title, text], index) => (
                            <li key={title} className="border-t border-black/20 bg-[#cbc8c0] p-6">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#101211] text-sm font-black text-accent">{index + 1}</span>
                                <h3 className="mt-5 text-xl font-black text-secondary">{title}</h3>
                                <p className="mt-3 font-medium leading-7 text-black/62">{text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="bg-[#101211] py-20 md:py-28">
                <div className="section-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                    <div>
                        <p className="eyebrow">Common questions</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-5xl">You are not expected to know all of this already.</h2>
                    </div>
                    <div className="grid gap-3">
                        {faqs.map(([question, answer]) => (
                            <details key={question} className="border-t border-white/16 py-6">
                                <summary className="cursor-pointer list-none text-lg font-black text-secondary marker:hidden">{question}</summary>
                                <p className="mt-4 font-medium leading-7 text-black/64">{answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="monolith-cta border-t border-white/10 py-20 text-white md:py-28">
                <div className="section-shell grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <p className="text-sm font-black uppercase text-accent">Ready when the idea is</p>
                        <h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-5xl">Tell me about the business in your own words.</h2>
                        <p className="mt-4 max-w-2xl font-medium leading-7 text-white/72">I&apos;ll help translate it into a practical digital plan.</p>
                    </div>
                    <Link href="/contact?service=New%20business%20launch" className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 font-black text-secondary transition hover:bg-white">
                        Start the Conversation <FiArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
