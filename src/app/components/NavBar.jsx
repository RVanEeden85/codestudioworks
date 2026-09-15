"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FiArrowUpRight, FiHome, FiMenu, FiX } from "react-icons/fi";
import BrandMark from "./BrandMark";

const links = [
    { href: "/", label: "Home", iconOnly: true },
    { href: "/start-a-business", label: "New Business" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/#process", label: "Process" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    function isActive(href) {
        if (href.includes("#")) return false;
        const cleanHref = href.split("#")[0];
        if (cleanHref === "/") return pathname === "/";
        return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
    }

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
                <Link href="/" className="brand-motion flex shrink-0 items-center" aria-label="CodeStudioWorks home">
                    <BrandMark inverted className="h-12 w-auto sm:h-[58px]" />
                </Link>

                <div className="hidden items-center gap-7 text-sm font-bold text-white/62 lg:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            aria-label={link.iconOnly ? link.label : undefined}
                            title={link.iconOnly ? link.label : undefined}
                            className={`nav-link transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${link.iconOnly ? "inline-flex items-center text-base" : ""}`}
                        >
                            {link.iconOnly ? (
                                <>
                                    <FiHome aria-hidden="true" />
                                    <span className="sr-only">{link.label}</span>
                                </>
                            ) : link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Link href="/contact" className="hidden items-center gap-2 rounded-sm bg-accent px-4 py-3 text-sm font-black text-[#080909] transition hover:bg-white sm:inline-flex">
                        Discuss your project
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

            <AnimatePresence>
                {isOpen && (
                <motion.div
                    id="mobile-navigation"
                    className="border-t border-white/10 bg-[#0b0d0c] px-4 py-4 shadow-2xl lg:hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="mx-auto grid max-w-7xl gap-2">
                        {links.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: -18 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.045 }}
                            >
                            <Link href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-sm border-t border-white/12 px-4 py-3 font-black text-white">
                                {link.iconOnly && <FiHome aria-hidden="true" className="text-accent" />}
                                {link.label}
                            </Link>
                            </motion.div>
                        ))}
                        <Link href="/contact" onClick={() => setIsOpen(false)} className="mt-2 inline-flex items-center justify-between rounded-sm bg-accent px-4 py-3 font-black text-[#080909] sm:hidden">
                            Discuss your project
                            <FiArrowUpRight aria-hidden="true" />
                        </Link>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
