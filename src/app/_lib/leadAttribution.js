const CAMPAIGN_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export function sanitizeAttribution(value) {
    if (!value || typeof value !== "object") return {};
    const result = {};
    for (const key of CAMPAIGN_FIELDS) {
        if (typeof value[key] === "string") result[key] = value[key].replace(/[\u0000-\u001f]/g, "").slice(0, 120);
    }
    if (typeof value.landingPage === "string" && /^\/(?!\/)/.test(value.landingPage)) {
        result.landingPage = value.landingPage.split(/[?#]/)[0].slice(0, 250);
    }
    return result;
}

export function captureAttribution() {
    if (typeof window === "undefined") return;
    try {
        const params = new URLSearchParams(window.location.search);
        const incoming = Object.fromEntries(CAMPAIGN_FIELDS.filter(key => params.has(key)).map(key => [key, params.get(key)]));
        const saved = sessionStorage.getItem("csw-campaign");
        if (Object.keys(incoming).length || !saved) {
            sessionStorage.setItem("csw-campaign", JSON.stringify(sanitizeAttribution({ ...incoming, landingPage: window.location.pathname })));
        }
    } catch { /* Contact forms continue to work when browser storage is unavailable. */ }
}

export function getLeadAttribution() {
    if (typeof window === "undefined") return {};
    captureAttribution();
    try { return sanitizeAttribution(JSON.parse(sessionStorage.getItem("csw-campaign") || "{}")); }
    catch { return {}; }
}
