"use client";

import Link from "next/link";
import { useState } from "react";
import { FiAlertTriangle, FiArrowRight, FiCheckCircle, FiLifeBuoy } from "react-icons/fi";
import TurnstileWidget, { getInitialTurnstileToken } from "./TurnstileWidget";

const fieldClass =
    "w-full rounded-md border border-black/12 bg-background px-4 py-3 text-secondary outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/25";

export default function SupportForm() {
    const [status, setStatus] = useState("idle");
    const [turnstileToken, setTurnstileToken] = useState(getInitialTurnstileToken);
    const [turnstileReset, setTurnstileReset] = useState(0);
    const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
    const [requestReference, setRequestReference] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus("sending");
        setErrorMessage("");
        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    phone: formData.get("phone"),
                    clientOrProject: formData.get("clientOrProject"),
                    affectedUrl: formData.get("affectedUrl"),
                    urgency: formData.get("urgency"),
                    message: formData.get("message"),
                    privacyAccepted: formData.get("privacyAccepted") === "on",
                    website: formData.get("website"),
                    turnstileToken,
                    submissionId,
                }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Request failed");

            setStatus("success");
            setRequestReference(result.requestId || "");
            form.reset();
            setSubmissionId(crypto.randomUUID());
            setTurnstileToken(getInitialTurnstileToken());
            setTurnstileReset((value) => value + 1);
        } catch (error) {
            setStatus("error");
            setErrorMessage(error.message || "The request could not be sent.");
            setTurnstileToken(getInitialTurnstileToken());
            setTurnstileReset((value) => value + 1);
        }
    }

    return (
        <section className="support-void-hero min-h-[calc(100svh-72px)] py-20 md:py-28">
            <div className="section-shell grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div className="lg:sticky lg:top-28">
                    <p className="eyebrow">Existing client support</p>
                    <h1 className="mt-4 text-5xl font-black leading-[0.98] text-secondary md:text-7xl">
                        Give the issue a clear path forward.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-black/64">
                        Tell me what changed, what is affected, and how urgent it is. Your request is stored first, given a reference, and reviewed personally.
                    </p>

                    <div className="mt-9 grid gap-px overflow-hidden border border-white/14 bg-white/14">
                        {[
                            [FiCheckCircle, "Stored before email delivery", "The request remains available even if an email provider is delayed."],
                            [FiLifeBuoy, "One accountable contact", "You deal directly with the developer who understands the work."],
                            [FiAlertTriangle, "Urgency without false promises", "Choose the impact level; response time follows the active support agreement."],
                        ].map(([Icon, title, copy]) => (
                            <div key={title} className="bg-[#111412]/92 p-5 backdrop-blur-md">
                                <div className="flex gap-4">
                                    <Icon className="mt-1 shrink-0 text-xl text-accent" aria-hidden="true" />
                                    <div>
                                        <h2 className="font-black text-white">{title}</h2>
                                        <p className="mt-1 text-sm font-medium leading-6 text-white/58">{copy}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 border-l-2 border-accent pl-4 text-sm font-semibold leading-6 text-white/58">
                        This form is not a guaranteed 24/7 emergency channel. Critical-response commitments are governed by your current support agreement.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="architectural-slab bg-[#111412]/96 p-6 backdrop-blur-xl md:p-9">
                    <div className="border-b border-white/12 pb-6">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-accent">Support intake</p>
                        <h2 className="mt-3 text-3xl font-black text-white">What needs attention?</h2>
                        <p className="mt-2 text-sm font-medium leading-6 text-white/58">Required fields help me assess impact without a long back-and-forth.</p>
                    </div>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                        <label className="grid gap-2 text-sm font-black text-white">
                            Your name
                            <input className={fieldClass} name="name" autoComplete="name" required />
                        </label>
                        <label className="grid gap-2 text-sm font-black text-white">
                            Email address
                            <input className={fieldClass} name="email" type="email" autoComplete="email" required />
                        </label>
                        <label className="grid gap-2 text-sm font-black text-white">
                            Phone number <span className="font-medium text-white/42">Optional</span>
                            <input className={fieldClass} name="phone" type="tel" autoComplete="tel" />
                        </label>
                        <label className="grid gap-2 text-sm font-black text-white">
                            Client or project name
                            <input className={fieldClass} name="clientOrProject" required />
                        </label>
                        <label className="grid gap-2 text-sm font-black text-white sm:col-span-2">
                            Affected website or app URL <span className="font-medium text-white/42">Optional</span>
                            <input className={fieldClass} name="affectedUrl" type="url" inputMode="url" placeholder="https://" />
                        </label>
                        <label className="grid gap-2 text-sm font-black text-white sm:col-span-2">
                            Business impact
                            <select className={fieldClass} name="urgency" defaultValue="" required>
                                <option value="" disabled>Select the current impact</option>
                                <option>Standard request</option>
                                <option>Work is blocked</option>
                                <option>Live service unavailable</option>
                            </select>
                        </label>
                        <label className="grid gap-2 text-sm font-black text-white sm:col-span-2">
                            What happened, and what should be happening instead?
                            <textarea className={`${fieldClass} min-h-44`} name="message" required />
                        </label>
                    </div>

                    <div className="sr-only" aria-hidden="true">
                        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                    </div>

                    <label className="mt-5 flex items-start gap-3 text-sm font-medium leading-6 text-white/62">
                        <input type="checkbox" name="privacyAccepted" required className="mt-1 h-4 w-4 shrink-0 accent-[#d7f45d]" />
                        <span>I agree that CodeStudioWorks may use these details to handle this request. See the <Link href="/privacy" className="font-black text-accent underline">Privacy Policy</Link>.</span>
                    </label>

                    <TurnstileWidget action="support" onVerify={setTurnstileToken} resetSignal={turnstileReset} />

                    <div aria-live="polite" className="mt-4 min-h-6 text-sm font-bold">
                        {status === "success" && (
                            <p className="text-accent">Your support request is stored.{requestReference && <> Reference: {requestReference}</>}</p>
                        )}
                        {status === "error" && <p className="text-red-300">{errorMessage} Please try again or use WhatsApp.</p>}
                    </div>

                    <button type="submit" disabled={status === "sending" || !turnstileToken} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-6 py-4 font-black text-[#071312] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50">
                        {status === "sending" ? "Storing Request…" : "Submit Support Request"}
                        <FiArrowRight aria-hidden="true" />
                    </button>

                    <p className="mt-5 text-center text-xs font-semibold leading-5 text-white/42">
                        Starting something new? Use the <Link href="/contact" className="text-accent underline">project enquiry</Link> instead.
                    </p>
                </form>
            </div>
        </section>
    );
}
