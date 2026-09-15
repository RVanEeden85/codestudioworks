"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiArrowRight, FiClock, FiMapPin, FiMessageSquare } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const fieldClass =
    "w-full rounded-md border border-black/12 bg-background px-4 py-3 text-secondary outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/25";

const serviceOptions = [
    "New business launch",
    "Business website",
    "Website redesign",
    "E-commerce",
    "App or custom business tool",
    "Mobile application",
    "Ongoing development support",
    "Website support or takeover",
    "Not sure yet",
];

export default function Contact({ initialService = "" }) {
    const [status, setStatus] = useState("idle");
    const serviceAliases = {
        "Business Websites": "Business website",
        "Apps & Business Tools": "App or custom business tool",
        "Ongoing Development Support": "Ongoing development support",
        "Website & Technical Support": "Website support or takeover",
    };
    const selectedService = serviceAliases[initialService] || initialService;

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus("sending");

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: "contact_form",
                    name: formData.get("name"),
                    email: formData.get("email"),
                    tel: formData.get("tel"),
                    message: [
                        `Project type: ${formData.get("projectType")}`,
                        `Working budget: ${formData.get("budget") || "Not provided"}`,
                        "",
                        formData.get("message"),
                    ].join("\n"),
                    privacyAccepted: formData.get("privacyAccepted") === "on",
                    website: formData.get("website"),
                }),
            });

            if (!response.ok) throw new Error("Request failed");

            setStatus("success");
            toast.success("Your enquiry was received");
            form.reset();
        } catch {
            setStatus("error");
            toast.error("Something went wrong. Please try again.");
        }
    }

    return (
        <section className="project-monolith-hero min-h-[calc(100svh-72px)] py-20 md:py-28">
            <div className="section-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
                <div>
                    <p className="eyebrow">Start a project</p>
                    <h1 className="mt-4 text-5xl font-black leading-tight text-secondary md:text-7xl">
                        Tell me what the business needs next.
                    </h1>
                    <p className="mt-6 text-lg font-medium leading-8 text-black/64">
                        Share the goal, current situation, and any timing or budget context you already have. I&apos;ll review it personally and recommend the most useful next step.
                    </p>

                    <div className="mt-8 grid gap-3">
                        <a
                            href="https://wa.me/13132135404?text=Hi%20Ryno%20at%20CodeStudioWorks!%20I%E2%80%99d%20love%20to%20chat%20about%20a%20project%20or%20your%20services."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="architectural-slab flex items-center gap-3 p-4 font-black text-white transition hover:border-accent"
                        >
                            <FaWhatsapp className="text-2xl text-[#168a3f]" aria-hidden="true" />
                            Message on WhatsApp
                        </a>
                        <div className="architectural-rule flex items-center gap-3 py-4 font-bold text-white/76">
                            <FiMapPin className="text-2xl text-primary" aria-hidden="true" />
                            Michigan based, working remotely
                        </div>
                        <div className="architectural-rule flex items-center gap-3 py-4 font-bold text-white/76">
                            <FiClock className="text-2xl text-primary" aria-hidden="true" />
                            Replies are personal, not automated sales handoffs
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="architectural-slab bg-[#111412]/95 p-6 backdrop-blur-md md:p-8">
                    <div className="mb-8 flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-2xl text-white">
                            <FiMessageSquare aria-hidden="true" />
                        </span>
                        <div>
                            <h2 className="text-2xl font-black text-secondary">Project enquiry</h2>
                            <p className="text-sm font-semibold text-black/55">A few useful details are enough to start.</p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="grid gap-2 text-sm font-black text-secondary">
                            Your name
                            <input className={fieldClass} name="name" autoComplete="name" required />
                        </label>
                        <label className="grid gap-2 text-sm font-black text-secondary">
                            Email address
                            <input className={fieldClass} type="email" name="email" autoComplete="email" required />
                        </label>
                        <label className="grid gap-2 text-sm font-black text-secondary">
                            Phone number <span className="font-medium text-black/45">Optional</span>
                            <input className={fieldClass} type="tel" name="tel" autoComplete="tel" />
                        </label>
                        <label className="grid gap-2 text-sm font-black text-secondary">
                            Project type
                            <select className={fieldClass} name="projectType" defaultValue={serviceOptions.includes(selectedService) ? selectedService : ""} required>
                                <option value="" disabled>Select one</option>
                                {serviceOptions.map((option) => <option key={option}>{option}</option>)}
                            </select>
                        </label>
                        <label className="grid gap-2 text-sm font-black text-secondary sm:col-span-2">
                            Working budget <span className="font-medium text-black/45">Optional</span>
                            <select className={fieldClass} name="budget" defaultValue="">
                                <option value="">Not established yet</option>
                                <option>Under $2,500 USD</option>
                                <option>$2,500–$5,000 USD</option>
                                <option>$5,000–$10,000 USD</option>
                                <option>$10,000–$25,000 USD</option>
                                <option>$25,000+ USD</option>
                            </select>
                        </label>
                        <label className="grid gap-2 text-sm font-black text-secondary sm:col-span-2">
                            What should the finished project help you achieve?
                            <textarea className={`${fieldClass} min-h-44`} name="message" required />
                        </label>
                    </div>

                    <div className="sr-only" aria-hidden="true">
                        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                    </div>

                    <label className="mt-5 flex items-start gap-3 text-sm font-medium leading-6 text-black/64">
                        <input type="checkbox" name="privacyAccepted" required className="mt-1 h-4 w-4 shrink-0 accent-[#163f38]" />
                        <span>I agree that CodeStudioWorks may use these details to respond to my enquiry. See the <Link href="/privacy" className="font-black text-primary underline">Privacy Policy</Link>.</span>
                    </label>

                    <div aria-live="polite" className="mt-4 min-h-6 text-sm font-bold">
                        {status === "success" && <p className="text-primary">Your enquiry was received. I&apos;ll reply personally with the next step.</p>}
                        {status === "error" && <p className="text-red-700">The request could not be sent. Please try again or message me on WhatsApp.</p>}
                    </div>

                    <button disabled={status === "sending"} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 py-4 text-base font-black text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60" type="submit">
                        {status === "sending" ? "Sending..." : "Send Enquiry"}
                        <FiArrowRight aria-hidden="true" />
                    </button>
                </form>
            </div>
        </section>
    );
}
