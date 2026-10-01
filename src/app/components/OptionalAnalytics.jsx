"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ANALYTICS_CONSENT_KEY, validMeasurementId, browserAnalyticsConsentGranted } from "../_lib/analytics";

const measurementId = validMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

export default function OptionalAnalytics() {
    const pathname = usePathname();
    const [consent, setConsent] = useState("loading");
    const [loaded, setLoaded] = useState(false);
    const [showChoice, setShowChoice] = useState(false);

    useEffect(() => {
        if (!measurementId) return;
        function sync() {
            let choice = "unknown";
            try { choice = localStorage.getItem(ANALYTICS_CONSENT_KEY) || "unknown"; } catch {}
            setConsent(choice);
            setShowChoice(choice === "unknown");
            window.__cswAnalyticsReady = choice === "granted" && !pathname.startsWith("/admin") && typeof window.gtag === "function";
            window[`ga-disable-${measurementId}`] = choice !== "granted" || pathname.startsWith("/admin");
        }
        sync();
        window.addEventListener("storage", sync);
        return () => window.removeEventListener("storage", sync);
    }, [pathname]);

    useEffect(() => {
        if (!loaded || consent !== "granted" || pathname.startsWith("/admin") || !browserAnalyticsConsentGranted()) return;
        window.__cswAnalyticsReady = true;
        window.gtag("event", "page_view", {
            page_location: window.location.origin + pathname,
            page_title: document.title,
            page_referrer: document.referrer ? new URL(document.referrer).origin : "",
        });
    }, [pathname, loaded, consent]);

    useEffect(() => {
        function onClick(event) {
            if (pathname.startsWith("/admin") || !window.__cswAnalyticsReady || !browserAnalyticsConsentGranted()) return;
            const link = event.target.closest?.("a[href]");
            if (!link) return;
            const href = link.getAttribute("href") || "";
            const channel = href.startsWith("mailto:") ? "email" : href.startsWith("tel:") ? "phone" : href.startsWith("https://wa.me/") ? "whatsapp" : href.startsWith("/contact") ? "quote_page" : "";
            if (channel) window.gtag("event", "contact_click", { contact_channel: channel });
        }
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [pathname]);

    function choose(value) {
        try { localStorage.setItem(ANALYTICS_CONSENT_KEY, value); } catch { return; }
        setConsent(value); setShowChoice(false);
        window[`ga-disable-${measurementId}`] = value !== "granted";
        window.__cswAnalyticsReady = value === "granted" && loaded;
        if (value === "denied" && typeof window.gtag === "function") {
            window.gtag("consent", "update", { analytics_storage: "denied" });
        } else if (loaded && value === "granted") {
            window.gtag("consent", "update", { analytics_storage: "granted" });
        }
    }

    function initialize() {
        if (!browserAnalyticsConsentGranted()) return;
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
        window.gtag("js", new Date());
        window.gtag("config", measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: window.location.origin + window.location.pathname });
        setLoaded(true);
    }

    if (!measurementId || pathname.startsWith("/admin")) return null;
    return <>
        {consent === "granted" && <Script id="csw-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" onReady={initialize} />}
        {showChoice ? <aside aria-label="Optional analytics" className="fixed bottom-4 left-4 z-[100] max-w-sm rounded-md border border-white/20 bg-[#101412] p-5 text-sm text-white shadow-xl">
            <p className="font-bold">Help improve this website</p><p className="mt-2 leading-6 text-white/80">With your permission, Google Analytics measures visits and enquiries. Your form contents are not sent to analytics. <Link href="/privacy" className="text-accent underline">Privacy details</Link></p>
            <div className="mt-4 flex gap-3"><button onClick={() => choose("granted")} className="rounded bg-accent px-4 py-3 font-bold text-black">Allow analytics</button><button onClick={() => choose("denied")} className="rounded border border-white/40 px-4 py-3 font-bold">No thanks</button></div>
        </aside> : <button type="button" onClick={() => setShowChoice(true)} className="fixed bottom-2 left-2 z-40 rounded bg-[#101412] px-3 py-2 text-xs text-white/80">Analytics preferences</button>}
    </>;
}
