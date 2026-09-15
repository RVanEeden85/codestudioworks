import Link from "next/link";
import {
    FiArrowRight,
    FiCheck,
    FiCheckCircle,
    FiGlobe,
    FiHelpCircle,
} from "react-icons/fi";

export const metadata = {
    title: "Starting a Business",
    description:
        "Get practical help planning, building, and launching the website and online tools your new business needs.",
    alternates: { canonical: "/start-a-business" },
};

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

export default function StartABusinessPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <section className="concrete-image-section architectural-light relative overflow-hidden border-b border-black/10 py-16 md:py-24">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(184,184,177,0.96),rgba(184,184,177,0.83)_60%,rgba(184,184,177,0.45))]" />
                <div className="section-shell relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
                    <div>
                        <p className="eyebrow">Starting a business</p>
                        <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[1.02] text-secondary md:text-7xl">
                            You bring the business idea. I&apos;ll help turn it into something real and working.
                        </h1>
                        <p className="mt-6 max-w-3xl text-xl font-medium leading-8 text-black/66">
                            You do not need to know the technical terms or arrive with a complete plan. Tell me what the business will do and what customers need—I can guide the website, online tools, launch, and support from there.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href="/contact?service=New%20business%20launch" className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-6 py-4 font-black text-white transition hover:bg-primary">
                                Tell Me About Your Business <FiArrowRight aria-hidden="true" />
                            </Link>
                            <Link href="/pricing" className="inline-flex items-center justify-center rounded-md border border-black/30 bg-white/50 px-6 py-4 font-black text-[#101211] backdrop-blur-sm transition hover:border-black/60 hover:bg-white/75">
                                See Starting Prices
                            </Link>
                        </div>
                    </div>

                    <aside className="architectural-slab p-6 text-white md:p-8">
                        <FiHelpCircle className="text-4xl text-accent" aria-hidden="true" />
                        <h2 className="mt-6 text-3xl font-black">Not sure what to ask for?</h2>
                        <p className="mt-4 font-medium leading-7 text-white/72">Start with these three things:</p>
                        <ul className="mt-5 grid gap-4">
                            {["What the business sells or provides", "Who the ideal customer is", "What customers should be able to do online"].map((item) => (
                                <li key={item} className="flex gap-3 rounded-md border border-white/10 bg-white/7 p-4 font-bold leading-6 text-white/80">
                                    <FiCheckCircle className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /> {item}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </section>

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

            <section className="architectural-light py-20 md:py-28">
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
