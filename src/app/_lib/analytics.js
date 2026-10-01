export const ANALYTICS_CONSENT_KEY = "csw-analytics-consent";

export function validMeasurementId(value) {
    return /^G-[A-Z0-9]+$/.test(value || "") ? value : "";
}

export function analyticsConsentGranted(storage) {
    try { return storage?.getItem(ANALYTICS_CONSENT_KEY) === "granted"; }
    catch { return false; }
}

export function browserAnalyticsConsentGranted() {
    try { return typeof window !== "undefined" && analyticsConsentGranted(window.localStorage); }
    catch { return false; }
}

// Only send the kind of enquiry; never send form contents or contact details.
export function trackLead(form) {
    if (typeof window === "undefined" || !window.__cswAnalyticsReady ||
        !browserAnalyticsConsentGranted() || typeof window.gtag !== "function") return;
    if (!["contact", "consultation", "project_planner"].includes(form)) return;
    window.gtag("event", "generate_lead", { form_type: form });
}
