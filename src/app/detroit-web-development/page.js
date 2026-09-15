import Link from "next/link";
import {
    FiArrowRight,
    FiCheck,
    FiGlobe,
    FiMapPin,
    FiMonitor,
    FiTool,
} from "react-icons/fi";
import JsonLd from "../components/JsonLd";
import {
    SERVICE_AREAS,
    absoluteUrl,
    breadcrumbSchema,
    buildMetadata,
    faqSchema,
    graphSchema,
} from "../_lib/seo";

export const metadata = buildMetadata({
    title: "Detroit Web Developer for Websites, Apps & Software",
    description:
        "Detroit web developer building business websites, web and mobile apps, and custom software for Metro Detroit, Michigan, and clients worldwide.",
    path: "/detroit-web-development",
});

const services = [
    {
        icon: FiMonitor,
        title: "Business websites",
        text: "Clear, fast websites and redesigns built to explain the offer, earn trust, and turn local or online interest into enquiries, bookings, sales, or quote requests.",
        href: "/services/business-website-launch",
    },
    {
        icon: FiGlobe,
        title: "Web and mobile apps",
        text: "Customer portals, booking systems, dashboards, marketplaces, mobile products, and practical first releases shaped around what the business actually needs.",
        href: "/services/custom-web-apps",
    },
    {
        icon: FiTool,
        title: "Ongoing development",
        text: "A reliable freelance development partner for existing websites, products, integrations, technical improvements, maintenance, and prioritized feature work.",
        href: "/services/fractional-development-partner",
    },
];

const process = [
    ["Meet online and define the outcome", "We discuss the business, audience, existing setup, and what a successful result should make easier or more valuable."],
    ["Receive a clear written plan", "I recommend the right scope, responsibilities, timeline, and price in plain language before development begins."],
    ["Review progress as it takes shape", "You see the design and working product at useful checkpoints, with decisions and next steps kept visible."],
    ["Launch with ownership and support", "The work is tested and deployed, access is handed over appropriately, and ongoing help remains available if useful."],
];

const faqs = [
    {
        question: "Do you work with businesses outside Detroit?",
        answer:
            "Yes. CodeStudioWorks is based in Detroit and serves businesses across Metro Detroit and Michigan, but projects can be delivered worldwide through online meetings, shared reviews, documented decisions, and digital delivery.",
    },
    {
        question: "What kinds of Detroit businesses do you work with?",
        answer:
            "I work with new and established small businesses, professional services, startups, growing companies, and larger organizations that need a focused project or development capacity without a full internal team.",
    },
    {
        question: "Can you help a local business appear in search results?",
        answer:
            "Yes. Website projects can include technical SEO, crawlable page structure, useful local content, metadata, structured data, analytics, and local-search foundations. Visibility also depends on competition, reputation, ongoing content, business listings, and time.",
    },
    {
        question: "Can you guarantee a first-place Google ranking?",
        answer:
            "No ethical developer or SEO specialist can guarantee a particular organic ranking. I build a strong, measurable search foundation and explain what should be improved next without selling false certainty.",
    },
    {
        question: "Do we need to meet in person?",
        answer:
            "No. The working model is designed for efficient online collaboration. Detroit-area clients receive the same direct access, clear reviews, and documented delivery as clients elsewhere in the United States or internationally.",
    },
];

const path = "/detroit-web-development";
const pageSchema = graphSchema([
    {
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: "Detroit Web Developer for Websites, Apps and Software",
        description:
            "Detroit-based website, app, custom software, and ongoing development services for Metro Detroit, Michigan, and businesses worldwide.",
        mainEntity: { "@id": `${absoluteUrl(path)}#service` },
        about: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-US",
    },
    {
        "@type": "Service",
        "@id": `${absoluteUrl(path)}#service`,
        name: "Detroit Web, App and Software Development",
        description:
            "Founder-led website, app, custom software, and ongoing development services based in Detroit and delivered locally or worldwide.",
        url: absoluteUrl(path),
        provider: { "@id": `${absoluteUrl("/")}#organization` },
        areaServed: SERVICE_AREAS,
        serviceType: [
            "Website design and development",
            "Web application development",
            "Mobile application development",
            "Custom software development",
            "Fractional development support",
        ],
    },
    breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Detroit Web Development", path },
    ]),
    faqSchema(faqs),
]);

export default function DetroitWebDevelopmentPage() {
    return (
        <main id="main-content" className="architectural-page overflow-x-clip bg-background pt-[72px]">
            <JsonLd data={pageSchema} />

            <section className="project-monolith-hero relative overflow-hidden border-b border-white/10 py-20 text-white md:py-28">
                <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[42%] border-l border-white/10 bg-[linear-gradient(135deg,transparent_0_35%,rgba(205,255,62,0.08)_35%_36%,transparent_36%_100%)] lg:block" />
                <div className="section-shell relative">
                    <div className="max-w-5xl">
                        <p className="eyebrow flex items-center gap-2">
                            <FiMapPin aria-hidden="true" /> Detroit web development
                        </p>
                        <h1 className="mt-5 text-5xl font-black leading-[1.02] md:text-7xl">
                            A Detroit web developer for websites, apps and business software.
                        </h1>
                        <p className="mt-7 max-w-3xl text-xl font-medium leading-9 text-white/72">
                            CodeStudioWorks is based in Detroit and works directly with small businesses, startups, and established teams across Metro Detroit, Michigan, and worldwide. Tell me the business outcome; I&apos;ll help shape, build, and launch the right digital solution.
                        </p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link href="/contact?service=Business%20website" className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 font-black text-secondary transition hover:bg-white">
                                Discuss your project <FiArrowRight aria-hidden="true" />
                            </Link>
                            <Link href="/services" className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-4 font-black text-white transition hover:border-accent hover:text-accent">
                                Explore Development Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section aria-label="Service area" className="border-b border-white/10 bg-[#080909] text-white">
                <div className="section-shell grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {[
                        ["Detroit based", "Direct, founder-led development"],
                        ["Metro Detroit + Michigan", "Local-market focus and support"],
                        ["Worldwide delivery", "Online meetings and shared reviews"],
                    ].map(([title, text]) => (
                        <div key={title} className="px-5 py-7 text-center">
                            <p className="text-xl font-black">{title}</p>
                            <p className="mt-2 text-sm font-bold text-white/50">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="concrete-panel-wall architectural-light py-20 md:py-28">
                <div aria-hidden="true" className="concrete-cast-shadows" />
                <div className="section-shell">
                    <div className="max-w-4xl">
                        <p className="eyebrow">What I build</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-6xl">
                            One technical partner from the first plan to the working result.
                        </h2>
                        <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-black/64">
                            You do not need to arrive with a feature list or know which technology to choose. Start with what the business needs customers or staff to accomplish.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-4 lg:grid-cols-3">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <article key={service.title} className="architectural-slab flex flex-col p-7 text-white">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-2xl text-secondary">
                                        <Icon aria-hidden="true" />
                                    </span>
                                    <h3 className="mt-7 text-2xl font-black">{service.title}</h3>
                                    <p className="mt-4 flex-1 font-medium leading-7 text-white/66">{service.text}</p>
                                    <Link href={service.href} className="mt-7 inline-flex items-center gap-2 border-t border-white/14 pt-5 text-sm font-black text-accent hover:text-white">
                                        See service details <FiArrowRight aria-hidden="true" />
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-[#101211] py-20 text-white md:py-28">
                <div className="section-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
                    <div>
                        <p className="eyebrow">Local focus, global delivery</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                            Close to Detroit businesses. Built to work across distance.
                        </h2>
                        <p className="mt-6 font-medium leading-8 text-white/66">
                            Being Detroit based creates useful local context, but it does not limit the work. Planning, demonstrations, feedback, source control, account handoff, and launch can all happen securely online.
                        </p>
                        <Link href="/about" className="mt-7 inline-flex items-center gap-2 font-black text-accent hover:text-white">
                            Meet the developer <FiArrowRight aria-hidden="true" />
                        </Link>
                    </div>
                    <ol className="grid gap-px overflow-hidden border border-white/12 bg-white/10 sm:grid-cols-2">
                        {process.map(([title, text], index) => (
                            <li key={title} className="bg-[#121513] p-7">
                                <span className="text-sm font-black text-accent">0{index + 1}</span>
                                <h3 className="mt-6 text-xl font-black">{title}</h3>
                                <p className="mt-3 font-medium leading-7 text-white/62">{text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="concrete-panel-wall architectural-light py-20 md:py-28">
                <div aria-hidden="true" className="concrete-cast-shadows" />
                <div className="section-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
                    <div>
                        <p className="eyebrow">Detroit development FAQs</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-5xl">
                            Clear answers about location, delivery, and search visibility.
                        </h2>
                    </div>
                    <div className="grid gap-3">
                        {faqs.map((faq) => (
                            <details key={faq.question} className="border-t border-black/20 py-6">
                                <summary className="cursor-pointer list-none pr-8 text-lg font-black text-secondary marker:hidden">
                                    {faq.question}
                                </summary>
                                <p className="mt-4 max-w-3xl font-medium leading-7 text-black/64">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="monolith-cta border-t border-white/10 py-20 text-white md:py-28">
                <div className="section-shell grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <p className="text-sm font-black uppercase text-accent">Detroit based. Available worldwide.</p>
                        <h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                            Bring the business goal. I&apos;ll help define the right digital next step.
                        </h2>
                    </div>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 font-black text-secondary transition hover:bg-white">
                        Start a Conversation <FiArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
