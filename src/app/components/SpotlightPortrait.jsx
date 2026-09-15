"use client";

import Image from "next/image";
import { useRef } from "react";

export default function SpotlightPortrait() {
    const portrait = useRef(null);
    function moveLight(event) {
        if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const bounds = portrait.current.getBoundingClientRect();
        portrait.current.style.setProperty("--portrait-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
        portrait.current.style.setProperty("--portrait-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
        portrait.current.dataset.following = "true";
    }
    function resetLight() {
        portrait.current.removeAttribute("data-following");
        portrait.current.style.removeProperty("--portrait-x");
        portrait.current.style.removeProperty("--portrait-y");
    }
    return <figure className="spotlight-portrait">
        <div ref={portrait} className="spotlight-portrait-stage" onPointerMove={moveLight} onPointerLeave={resetLight}>
            <div className="portrait-light-halo" aria-hidden="true" />
            <div className="portrait-light-beam" aria-hidden="true" />
            <Image src="/images/ryno-cutout.png" alt="Ryno van Eeden, founder and full-stack developer at CodeStudioWorks" width={1110} height={1417} sizes="(max-width: 1024px) 90vw, 42vw" className="portrait-monochrome" />
            <Image src="/images/ryno-cutout.png" alt="" aria-hidden="true" fill sizes="(max-width: 1024px) 90vw, 42vw" className="portrait-colour" />
            <div className="portrait-floor-fade" aria-hidden="true" />
        </div>
        <figcaption className="portrait-signature"><span>Your developer</span><strong>Ryno van Eeden</strong></figcaption>
    </figure>;
}
