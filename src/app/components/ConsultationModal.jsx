"use client";

import Link from "next/link";
import { projectTypes } from "../_lib/projectTypes";
import { getLeadAttribution } from "../_lib/leadAttribution";
import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import TurnstileWidget, { getInitialTurnstileToken } from "./TurnstileWidget";

const fieldClass =
    "w-full rounded-md border border-black/12 bg-background px-4 py-3 text-secondary outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/25";

const ConsultationModal = ({ isOpen, onClose }) => {
    const dialogRef = useRef(null);
    const firstFieldRef = useRef(null);
    const [status, setStatus] = useState("idle");
    const [turnstileToken, setTurnstileToken] = useState(getInitialTurnstileToken);
    const [turnstileReset, setTurnstileReset] = useState(0);
    const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
    const [requestReference, setRequestReference] = useState("");

    useEffect(() => {
        if (!isOpen) return undefined;

        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        firstFieldRef.current?.focus();

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key !== "Tab" || !dialogRef.current) return;

            const focusable = Array.from(
                dialogRef.current.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled])'
                )
            );
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previousFocus?.focus?.();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus("sending");

        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        data.privacyAccepted = data.privacyAccepted === "on";
        data.turnstileToken = turnstileToken;
        data.submissionId = submissionId;
        data.attribution = getLeadAttribution();

        try {
            const response = await fetch("/api/consultation", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Request failed");

            setStatus("success");
            setRequestReference(result.requestId || "");
            form.reset();
            setSubmissionId(crypto.randomUUID());
            setTurnstileToken(getInitialTurnstileToken());
            setTurnstileReset((value) => value + 1);
        } catch {
            setStatus("error");
            setTurnstileToken(getInitialTurnstileToken());
            setTurnstileReset((value) => value + 1);
        }
    }

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/65 p-3 backdrop-blur-sm md:items-center"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="consultation-title"
                aria-describedby="consultation-description"
                className="architectural-slab relative my-3 w-full max-w-2xl border border-white/14 bg-[#111412] p-5 text-white shadow-2xl md:p-8"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-xl text-white"
                    aria-label="Close consultation request"
                >
                    <FiX aria-hidden="true" />
                </button>

                <p className="eyebrow pr-14">Project consultation</p>
                <h2 id="consultation-title" className="mt-3 pr-14 text-3xl font-black text-secondary">
                    Request a Free Consultation
                </h2>
                <p id="consultation-description" className="mb-6 mt-3 max-w-xl text-sm font-medium leading-6 text-black/60">
                    Share the business goal and your preferred availability. This sends a consultation request; the appointment is confirmed after I reply.
                </p>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="grid gap-2 text-sm font-black">
                            Your name
                            <input ref={firstFieldRef} type="text" name="name" autoComplete="name" className={fieldClass} required />
                        </label>
                        <label className="grid gap-2 text-sm font-black">
                            Email address
                            <input type="email" name="email" autoComplete="email" className={fieldClass} required />
                        </label>
                        <label className="grid gap-2 text-sm font-black">
                            Phone number <span className="font-medium text-black/45">Optional</span>
                            <input type="tel" name="phone" autoComplete="tel" className={fieldClass} />
                        </label>
                        <label className="grid gap-2 text-sm font-black">
                            Project type
                            <select name="projectType" defaultValue="" className={fieldClass} required>
                                    <option value="" disabled>Select one</option>
                                    {projectTypes.map(type => <option key={type}>{type}</option>)}
                                </select>
                        </label>
                        <label className="grid gap-2 text-sm font-black">
                            Preferred time (optional)
                            <select name="preferredTime" defaultValue="" className={fieldClass}>
                                <option value="" disabled>Select one</option>
                                <option>Weekday morning</option>
                                <option>Weekday afternoon</option>
                                <option>Weekday evening</option>
                                <option>Flexible</option>
                            </select>
                        </label>
                        <label className="grid gap-2 text-sm font-black">
                            Your timezone (optional)
                            <input name="timeZone" placeholder="Example: Eastern Time" className={fieldClass} />
                        </label>
                    </div>

                    <label className="grid gap-2 text-sm font-black">
                        What would you like help with?
                        <textarea name="message" className={`${fieldClass} min-h-28`} required />
                    </label>

                    <div className="sr-only" aria-hidden="true">
                        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
                    </div>

                    <label className="flex items-start gap-3 text-sm font-medium leading-6 text-black/64">
                        <input type="checkbox" name="privacyAccepted" required className="mt-1 h-4 w-4 shrink-0 accent-[#163f38]" />
                        <span>I agree that CodeStudioWorks may use these details to respond to my enquiry. See the <Link href="/privacy" className="font-black text-primary underline">Privacy Policy</Link>.</span>
                    </label>

                    <TurnstileWidget
                        action="consultation"
                        onVerify={setTurnstileToken}
                        resetSignal={turnstileReset}
                    />

                    <div aria-live="polite" className="min-h-6 text-sm font-bold">
                        {status === "success" && <p className="text-primary">Your consultation request was received. I&apos;ll reply to confirm the next step.{requestReference && <> Reference: {requestReference}</>}</p>}
                        {status === "error" && <p className="text-red-700">The request could not be sent. Please try again or use the contact page.</p>}
                    </div>

                    <button type="submit" disabled={status === "sending" || !turnstileToken} className="w-full rounded-md bg-secondary py-3 text-lg font-black text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60">
                        {status === "sending" ? "Sending Request..." : "Send Consultation Request"}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default ConsultationModal;
