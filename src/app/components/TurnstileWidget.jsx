"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

const DEVELOPMENT_TEST_SITE_KEY = "1x00000000000000000000AA";
export const DEVELOPMENT_TURNSTILE_TOKEN = "XXXX.DUMMY.TOKEN.XXXX";

export function getInitialTurnstileToken() {
    return process.env.NODE_ENV !== "production" &&
        !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
        ? DEVELOPMENT_TURNSTILE_TOKEN
        : "";
}

export default function TurnstileWidget({ action, onVerify, resetSignal = 0 }) {
    const containerRef = useRef(null);
    const widgetIdRef = useRef(null);
    const onVerifyRef = useRef(onVerify);
    const [scriptReady, setScriptReady] = useState(false);
    const [message, setMessage] = useState("Security check loading…");
    const siteKey =
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
        (process.env.NODE_ENV !== "production" ? DEVELOPMENT_TEST_SITE_KEY : "");
    const isLocalTest =
        process.env.NODE_ENV !== "production" &&
        !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    const renderWidget = useCallback(() => {
        if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) return;

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            action,
            appearance: "interaction-only",
            theme: "dark",
            size: "flexible",
            callback(token) {
                setMessage("Security check complete.");
                onVerifyRef.current(token);
            },
            "expired-callback"() {
                setMessage("Security check expired. Please try again.");
                onVerifyRef.current("");
            },
            "error-callback"() {
                setMessage("Security check unavailable. Please refresh and try again.");
                onVerifyRef.current("");
                return true;
            },
        });
    }, [action, siteKey]);

    useEffect(() => {
        onVerifyRef.current = onVerify;
    }, [onVerify]);

    useEffect(() => {
        if (scriptReady) renderWidget();

        return () => {
            if (widgetIdRef.current && window.turnstile) {
                window.turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
            }
        };
    }, [renderWidget, scriptReady]);

    useEffect(() => {
        if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
        }
    }, [resetSignal]);

    if (isLocalTest) {
        return (
            <div className="mt-5 border border-accent/20 bg-accent/6 p-3 text-xs font-bold text-white/58">
                Local security test active. Production will use Cloudflare Turnstile.
            </div>
        );
    }

    if (!siteKey) {
        return (
            <p className="mt-5 border border-amber-400/30 bg-amber-400/10 p-3 text-sm font-bold text-amber-200" role="alert">
                Secure form verification is not configured yet.
            </p>
        );
    }

    return (
        <div className="mt-5">
            <Script
                id="cloudflare-turnstile-api"
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                strategy="afterInteractive"
                onLoad={() => setScriptReady(true)}
                onReady={() => setScriptReady(true)}
            />
            <div ref={containerRef} className="min-h-1 w-full overflow-hidden" />
            <p className="sr-only" aria-live="polite">{message}</p>
        </div>
    );
}
