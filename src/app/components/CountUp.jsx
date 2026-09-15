"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ end, suffix = "", duration = 1200 }) {
    const [value, setValue] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return undefined;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const frame = requestAnimationFrame(() => setValue(end));
            return () => cancelAnimationFrame(frame);
        }

        let animationFrame = 0;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                const startedAt = performance.now();

                function animate(now) {
                    const progress = Math.min(1, (now - startedAt) / duration);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setValue(Math.round(end * eased));
                    if (progress < 1) animationFrame = requestAnimationFrame(animate);
                }

                animationFrame = requestAnimationFrame(animate);
                observer.disconnect();
            },
            { threshold: 0.5 }
        );

        observer.observe(element);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrame);
        };
    }, [duration, end]);

    return <span ref={ref}>{value}{suffix}</span>;
}
