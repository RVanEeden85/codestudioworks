"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import BrandMark from "./BrandMark";

const links = [
    { href: "/start-a-business", label: "New Business" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/#process", label: "Process" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function closeOnEscape(event) {
            if (event.key === "Escape") setIsOpen(false);
        }

        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, []);

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#080909]/92 text-white backdrop-blur-xl">
            <nav aria-label="Primary navigation" className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex shrink-0 items-center" aria-label="CodeStudioWorks home">
                    <BrandMark inverted className="h-12 w-auto sm:h-[58px]" />
                </Link>

                <div className="hidden items-center gap-7 text-sm font-bold text-white/62 lg:flex">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Link href="/contact" className="hidden items-center gap-2 rounded-sm bg-accent px-4 py-3 text-sm font-black text-[#080909] transition hover:bg-white sm:inline-flex">
                        Start a Project
                        <FiArrowUpRight aria-hidden="true" />
                    </Link>
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-white/5 text-xl text-white lg:hidden"
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setIsOpen((current) => !current)}
                    >
                        {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div id="mobile-navigation" className="border-t border-white/10 bg-[#0b0d0c] px-4 py-4 shadow-2xl lg:hidden">
                    <div className="mx-auto grid max-w-7xl gap-2">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-sm border-t border-white/12 px-4 py-3 font-black text-white">
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/contact" onClick={() => setIsOpen(false)} className="mt-2 inline-flex items-center justify-between rounded-sm bg-accent px-4 py-3 font-black text-[#080909] sm:hidden">
                            Start a Project
                            <FiArrowUpRight aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
