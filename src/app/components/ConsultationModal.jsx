"use client";

import { useState } from "react";

const ConsultationModal = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState("");

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const res = await fetch("/api/consultation", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            setStatus("success");
            e.target.reset();
        } else {
            setStatus("error");
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] p-3">
            <div className="bg-primary border border-white/20 rounded-3xl w-full max-w-lg p-8 shadow-xl relative animate-fadeIn text-white">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-white cursor-pointer"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-bold text-white mb-2">
                    Book a Free Consultation
                </h2>

                <p className="text-sm mb-3">
                    Choose your preferred date and time below. Once booked,
                    you’ll receive a confirmation email with your personalised
                    virtual meeting link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full p-3 rounded-xl bg-white/10"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full p-3 rounded-xl bg-white/10"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone Number"
                        className="w-full p-3 rounded-xl bg-white/10"
                    />

                    {/* TaxNumber */}
                    <div className="hidden">
                        <input
                            type="text"
                            name="taxNumber"
                            placeholder="Your Tax Number"
                            className="w-full p-3 rounded-xl bg-white/10"
                        />
                    </div>

                    <select
                        name="projectType"
                        className="w-full p-3 rounded-xl bg-white/10"
                    >
                        <option disabled selected>
                            Project Type
                        </option>
                        <option>Branding & Identity</option>
                        <option value="web design">Web Design</option>
                        <option>Custom Website Development</option>
                        <option value="maintenance">
                            Website Maintenance & Support
                        </option>
                        <option value="software">Software Development</option>
                        <option>Digital & Online Marketing</option>
                        <option>IT Support & Maintenance</option>
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                        <select
                            name="preferredDay"
                            className="p-3 rounded-xl bg-white/10"
                        >
                            <option disabled selected>
                                Preferred Day
                            </option>
                            <option value="today">Today</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>

                        <select
                            name="preferredTime"
                            className="p-3 rounded-xl bg-white/10"
                        >
                            <option disabled selected>
                                Preferred Time
                            </option>
                            <option value="now">Now</option>
                            <option value="asap">As soon as possible</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="20:00">8:00 PM</option>
                        </select>
                    </div>

                    <textarea
                        name="message"
                        placeholder="Tell me more about your project..."
                        className="w-full p-3 rounded-xl bg-white/10 h-28"
                    ></textarea>

                    {status === "success" && (
                        <p className="text-green-300 text-sm">
                            Your booking request has been sent! I’ll email you
                            shortly.
                        </p>
                    )}

                    {status === "error" && (
                        <p className="text-red-300 text-sm">
                            Something went wrong. Please try again.
                        </p>
                    )}

                    {status === "loading" && (
                        <p className="text-white/50 text-sm italic">
                            Sending your request...
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-white/20 text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#2a4343] transition-all duration-500"
                    >
                        Send Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConsultationModal;
