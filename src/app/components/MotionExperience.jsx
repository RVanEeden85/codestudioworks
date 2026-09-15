"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";

export default function MotionExperience() {
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 28,
        mass: 0.28,
    });
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        if (pathname !== "/" || sessionStorage.getItem("csw-intro-seen")) {
            const frame = window.requestAnimationFrame(() => setShowIntro(false));
            return () => window.cancelAnimationFrame(frame);
        }

        sessionStorage.setItem("csw-intro-seen", "true");
        const timer = window.setTimeout(
            () => setShowIntro(false),
            prefersReducedMotion ? 120 : 1650
        );

        return () => window.clearTimeout(timer);
    }, [pathname, prefersReducedMotion]);

    useEffect(() => {
        const root = document.documentElement;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const revealTargets = Array.from(
            document.querySelectorAll(
                ".architectural-page section > .section-shell, .architectural-page .architectural-slab:not(.motion-static), .architectural-page details, .architectural-page .architectural-rule, .architectural-page .motion-reveal-item"
            )
        );

        revealTargets.forEach((element) => {
            element.classList.add("motion-reveal");
            const siblings = Array.from(element.parentElement?.children || []);
            const siblingIndex = Math.max(0, siblings.indexOf(element));
            element.style.setProperty("--reveal-delay", `${Math.min(siblingIndex, 5) * 70}ms`);
        });

        if (reduceMotion) {
            revealTargets.forEach((element) => element.classList.add("is-revealed"));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-revealed");
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
        );

        revealTargets.forEach((element) => observer.observe(element));
        root.dataset.motion = "ready";

        return () => observer.disconnect();
    }, [pathname]);

    useEffect(() => {
        const finePointer = window.matchMedia("(pointer: fine)").matches;
        if (!finePointer || prefersReducedMotion) return undefined;

        const root = document.documentElement;
        root.classList.add("fine-pointer-motion");
        let frame = 0;

        function updatePointer(event) {
            window.cancelAnimationFrame(frame);
            frame = window.requestAnimationFrame(() => {
                root.style.setProperty("--pointer-x", `${event.clientX}px`);
                root.style.setProperty("--pointer-y", `${event.clientY}px`);
            });
        }

        function updateInteractiveSurface(event) {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const slab = target.closest(".architectural-slab");
            if (slab && !slab.matches("form") && !slab.closest("[role='dialog']")) {
                const bounds = slab.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width;
                const y = (event.clientY - bounds.top) / bounds.height;
                slab.classList.add("motion-tilt", "is-interacting");
                slab.style.setProperty("--tilt-x", `${(0.5 - y) * 2.8}deg`);
                slab.style.setProperty("--tilt-y", `${(x - 0.5) * 3.2}deg`);
                slab.style.setProperty("--surface-x", `${x * 100}%`);
                slab.style.setProperty("--surface-y", `${y * 100}%`);
            }

            const magnetic = target.closest(".motion-magnetic");
            if (magnetic) {
                const bounds = magnetic.getBoundingClientRect();
                const x = event.clientX - (bounds.left + bounds.width / 2);
                const y = event.clientY - (bounds.top + bounds.height / 2);
                magnetic.style.setProperty("--magnetic-x", `${x * 0.12}px`);
                magnetic.style.setProperty("--magnetic-y", `${y * 0.12}px`);
            }
        }

        function clearInteractiveSurface(event) {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const slab = target.closest(".architectural-slab");
            if (slab && !slab.contains(event.relatedTarget)) {
                slab.classList.remove("is-interacting");
                slab.style.setProperty("--tilt-x", "0deg");
                slab.style.setProperty("--tilt-y", "0deg");
            }

            const magnetic = target.closest(".motion-magnetic");
            if (magnetic && !magnetic.contains(event.relatedTarget)) {
                magnetic.style.setProperty("--magnetic-x", "0px");
                magnetic.style.setProperty("--magnetic-y", "0px");
            }
        }

        const magneticTargets = document.querySelectorAll(
            "a[class*='bg-accent'], button[class*='bg-accent'], a[class*='bg-secondary'], button[class*='bg-secondary']"
        );
        magneticTargets.forEach((element) => element.classList.add("motion-magnetic"));

        document.addEventListener("pointermove", updatePointer, { passive: true });
        document.addEventListener("pointermove", updateInteractiveSurface, { passive: true });
        document.addEventListener("pointerout", clearInteractiveSurface, { passive: true });

        return () => {
            window.cancelAnimationFrame(frame);
            root.classList.remove("fine-pointer-motion");
            document.removeEventListener("pointermove", updatePointer);
            document.removeEventListener("pointermove", updateInteractiveSurface);
            document.removeEventListener("pointerout", clearInteractiveSurface);
        };
    }, [pathname, prefersReducedMotion]);

    useEffect(() => {
        const surfaces = Array.from(
            document.querySelectorAll(
                ".architectural-page .concrete-panel-wall, .architectural-page .concrete-image-section"
            )
        );

        if (!surfaces.length) return undefined;

        if (prefersReducedMotion) {
            surfaces.forEach((surface) => {
                surface.style.setProperty("--slab-shadow-length", "24px");
                surface.style.setProperty("--slab-shadow-opacity", "0.07");
                surface.style.setProperty("--slab-highlight-opacity", "0.06");
                surface.style.setProperty("--slab-light-x", "48%");
                surface.style.setProperty("--diagonal-shadow-x", "0px");
            });
            return undefined;
        }

        let frame = 0;

        function updateConcreteLight() {
            const viewportHeight = window.innerHeight;
            const mobile = window.innerWidth < 700;

            surfaces.forEach((surface) => {
                const bounds = surface.getBoundingClientRect();
                const progress = Math.min(
                    1,
                    Math.max(0, (viewportHeight - bounds.top) / (viewportHeight + bounds.height))
                );
                const intensity = Math.sin(progress * Math.PI);
                const shadowLength = 8 + intensity * (mobile ? 72 : 132);
                const shadowOpacity = 0.035 + intensity * 0.135;
                const highlightOpacity = 0.025 + intensity * 0.1;
                const lightX = -12 + progress * 124;
                const diagonalShadowX = (mobile ? -160 : -340) + progress * (mobile ? 320 : 680);

                surface.style.setProperty("--slab-shadow-length", `${shadowLength.toFixed(1)}px`);
                surface.style.setProperty("--slab-shadow-opacity", shadowOpacity.toFixed(3));
                surface.style.setProperty("--slab-highlight-opacity", highlightOpacity.toFixed(3));
                surface.style.setProperty("--slab-light-x", `${lightX.toFixed(1)}%`);
                surface.style.setProperty("--diagonal-shadow-x", `${diagonalShadowX.toFixed(1)}px`);
            });
        }

        function requestConcreteLightUpdate() {
            window.cancelAnimationFrame(frame);
            frame = window.requestAnimationFrame(updateConcreteLight);
        }

        updateConcreteLight();
        window.addEventListener("scroll", requestConcreteLightUpdate, { passive: true });
        window.addEventListener("resize", requestConcreteLightUpdate);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", requestConcreteLightUpdate);
            window.removeEventListener("resize", requestConcreteLightUpdate);
        };
    }, [pathname, prefersReducedMotion]);

    return (
        <>
            <motion.div
                aria-hidden="true"
                className="scroll-progress"
                style={{ scaleX: progress }}
            />
            <div aria-hidden="true" className="ambient-grain" />
            <div aria-hidden="true" className="cursor-light" />

            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        aria-hidden="true"
                        className="intro-curtain"
                        initial={{ clipPath: "inset(0 0 0 0)" }}
                        exit={{ clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.86, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <BrandMark inverted className="h-auto w-44 sm:w-56" />
                            <motion.span
                                className="intro-line"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.28, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
