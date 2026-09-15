"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiArrowRight, FiCheck, FiSend } from "react-icons/fi";

const engagements = [
    {
        name: "Business Websites",
        price: "From $1,250 USD",
        range: "Many growth-focused builds fall between $2,500 and $5,200+.",
        timeline: "Typical timeline: 3–8 weeks",
        description:
            "For a professional launch, an established-business redesign, e-commerce foundations, or a stronger lead journey.",
        includes: [
            "Page and content strategy",
            "Responsive design and development",
            "Lead, quote, booking, or commerce paths",
            "A strong foundation for search engines",
        ],
    },
    {
        name: "Apps & Custom Business Tools",
        price: "From $7,500 USD",
        range: "Complex platforms are scoped in phases rather than given an artificial ceiling.",
        timeline: "Typical first release: 6–16+ weeks",
        description:
            "For customer apps, mobile products, portals, dashboards, booking systems, and tools that improve how a business operates.",
        includes: [
            "Planning the first useful release",
            "Clear screens and step-by-step workflows",
            "Database, accounts, roles, and APIs",
            "Launch plan and iteration roadmap",
        ],
    },
    {
        name: "Ongoing Development Support",
        price: "Tailored monthly scope",
        range: "Capacity is based on your backlog, response needs, and level of technical responsibility.",
        timeline: "Ongoing monthly engagement",
        description:
            "For companies that need dependable technical capacity, product improvements, integrations, and support.",
        includes: [
            "Agreed monthly capacity",
            "Prioritized delivery backlog",
            "Regular updates and review points",
            "Documentation and accountable ownership",
        ],
    },
];

const fieldClass =
    "w-full rounded-md border border-black/12 bg-background px-4 py-3 text-secondary outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/25";

function EstimateBuilder() {
    const [status, setStatus] = useState("idle");

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus("sending");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const details = {
            projectType: formData.get("projectType"),
            projectStage: formData.get("projectStage"),
            budget: formData.get("budget"),
            timeline: formData.get("timeline"),
            needs: formData.getAll("needs"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: "pricing_planner",
                    name: formData.get("name"),
                    email: formData.get("email"),
                    tel: formData.get("tel"),
                    message:
                        formData.get("message") ||
                        "I completed the project planner and would like to discuss the next step.",
                    estimate: JSON.stringify(details, null, 2),
                    privacyAccepted: formData.get("privacyAccepted") === "on",
                    website: formData.get("website"),
                }),
            });

            if (!response.ok) throw new Error("Request failed");

            form.reset();
            setStatus("sent");
            toast.success("Project details received");
        } catch {
            setStatus("error");
            toast.error("Something went wrong. Please try again.");
        }
    }

    return (
        <section id="pricing-options" className="bg-[#101211] py-20 md:py-28">
            <div className="section-shell">
                <div className="max-w-4xl">
                    <p className="eyebrow">Starting points</p>
                    <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-6xl">
                        Clear starting prices without pretending every project is the same.
                    </h2>
                    <p className="mt-5 text-lg font-medium leading-8 text-black/64">
                        These figures are starting guides, not automatic quotes. Your proposal will clearly confirm what is included, what each of us is responsible for, the timeline, project total, and any optional monthly support.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                    {engagements.map((item) => (
                        <article key={item.name} className="architectural-slab flex flex-col p-7">
                            <h3 className="text-2xl font-black text-secondary">{item.name}</h3>
                            <p className="mt-6 text-3xl font-black text-primary">{item.price}</p>
                            <p className="mt-2 text-sm font-bold leading-6 text-black/52">{item.range}</p>
                            <p className="mt-5 font-medium leading-7 text-black/64">{item.description}</p>
                            <ul className="mt-6 grid flex-1 gap-3">
                                {item.includes.map((included) => (
                                    <li key={included} className="flex gap-2 text-sm font-bold leading-6 text-secondary/76">
                                        <FiCheck className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                                        {included}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 border-t border-black/10 pt-5 text-sm font-black text-secondary">{item.timeline}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-6 border border-accent/25 bg-accent/6 p-5 text-white md:flex md:items-center md:justify-between md:gap-6">
                    <div>
                        <p className="font-black">Care plans currently start from $150 USD per month.</p>
                        <p className="mt-1 text-sm font-medium leading-6 text-black/60">Care is optional and quoted separately from the project build.</p>
                    </div>
                    <Link href="/services/care-maintenance" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary hover:text-secondary md:mt-0">
                        Explore Care & Growth <FiArrowRight aria-hidden="true" />
                    </Link>
                </div>

                <div id="project-planner" className="mt-16 grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                    <div>
                        <p className="eyebrow">Tell me about the project</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-secondary md:text-5xl">Share the shape of the work.</h2>
                        <p className="mt-5 text-lg font-medium leading-8 text-black/64">
                            This is not an automated quote. It gives me enough context to recommend the right next conversation or discovery step.
                        </p>
                        <div className="architectural-slab mt-7 p-6 text-white">
                            <p className="text-sm font-black uppercase text-accent">What happens next</p>
                            <ol className="mt-5 grid gap-4">
                                {["I personally review the request.", "I reply with questions or the recommended next step.", "You receive a clear scope before committing to development."].map((item, index) => (
                                    <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-white/72">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-black text-secondary">{index + 1}</span>
                                        {item}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="architectural-slab p-6 md:p-8">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="grid gap-2 text-sm font-black text-secondary">
                                Your name
                                <input className={fieldClass} name="name" autoComplete="name" required />
                            </label>
                            <label className="grid gap-2 text-sm font-black text-secondary">
                                Email address
                                <input className={fieldClass} name="email" type="email" autoComplete="email" required />
                            </label>
                            <label className="grid gap-2 text-sm font-black text-secondary">
                                Phone number <span className="font-medium text-black/45">Optional</span>
                                <input className={fieldClass} name="tel" type="tel" autoComplete="tel" />
                            </label>
                            <label className="grid gap-2 text-sm font-black text-secondary">
                                Project type
                                <select className={fieldClass} name="projectType" required defaultValue="">
                                    <option value="" disabled>Select one</option>
                                    <option>Business website</option>
                                    <option>Website redesign</option>
                                    <option>E-commerce</option>
                                    <option>New business launch</option>
                                    <option>App or custom business tool</option>
                                    <option>Mobile application</option>
                                    <option>Ongoing development support</option>
                                    <option>Website support or takeover</option>
                                </select>
                            </label>
                            <label className="grid gap-2 text-sm font-black text-secondary">
                                Current stage
                                <select className={fieldClass} name="projectStage" required defaultValue="">
                                    <option value="" disabled>Select one</option>
                                    <option>Early idea</option>
                                    <option>Requirements in progress</option>
                                    <option>Ready to build</option>
                                    <option>Existing website or product</option>
                                </select>
                            </label>
                            <label className="grid gap-2 text-sm font-black text-secondary">
                                Working budget
                                <select className={fieldClass} name="budget" required defaultValue="">
                                    <option value="" disabled>Select a range</option>
                                    <option>Under $2,500 USD</option>
                                    <option>$2,500–$5,000 USD</option>
                                    <option>$5,000–$10,000 USD</option>
                                    <option>$10,000–$25,000 USD</option>
                                    <option>$25,000+ USD</option>
                                    <option>Not established yet</option>
                                </select>
                            </label>
                            <label className="grid gap-2 text-sm font-black text-secondary sm:col-span-2">
                                Desired timeline
                                <select className={fieldClass} name="timeline" required defaultValue="">
                                    <option value="" disabled>Select one</option>
                                    <option>As soon as practical</option>
                                    <option>Within 1–2 months</option>
                                    <option>Within 3–6 months</option>
                                    <option>Flexible or exploratory</option>
                                    <option>Ongoing monthly work</option>
                                </select>
                            </label>
                        </div>

                        <fieldset className="mt-6">
                            <legend className="text-sm font-black text-secondary">What might you need? <span className="font-medium text-black/45">Select any</span></legend>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                {["Strategy and scope", "Design and UX", "Development", "Content or SEO foundations", "Integrations", "Ongoing support"].map((need) => (
                                    <label key={need} className="flex items-center gap-3 rounded-md border border-white/14 bg-black/20 p-3 text-sm font-bold text-white">
                                        <input type="checkbox" name="needs" value={need} className="h-4 w-4 accent-[#163f38]" />
                                        {need}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <label className="mt-6 grid gap-2 text-sm font-black text-secondary">
                            Project context <span className="font-medium text-black/45">Optional</span>
                            <textarea className={`${fieldClass} min-h-32`} name="message" placeholder="What should the finished project help the business achieve?" />
                        </label>

                        <div className="sr-only" aria-hidden="true">
                            <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                        </div>

                        <label className="mt-5 flex items-start gap-3 text-sm font-medium leading-6 text-black/64">
                            <input type="checkbox" name="privacyAccepted" required className="mt-1 h-4 w-4 shrink-0 accent-[#163f38]" />
                            <span>I agree that CodeStudioWorks may use these details to respond to my enquiry. See the <Link href="/privacy" className="font-black text-primary underline">Privacy Policy</Link>.</span>
                        </label>

                        <div aria-live="polite" className="mt-4 min-h-6 text-sm font-bold">
                            {status === "sent" && <p className="text-primary">Your project details were received. I&apos;ll follow up directly.</p>}
                            {status === "error" && <p className="text-red-700">The request could not be sent. Please try again or use the contact page.</p>}
                        </div>

                        <button type="submit" disabled={status === "sending"} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 py-4 font-black text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60">
                            {status === "sending" ? "Sending..." : "Send Project Details"}
                            <FiSend aria-hidden="true" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default EstimateBuilder;
