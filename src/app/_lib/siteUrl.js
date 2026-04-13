function normalizeSiteUrl(url) {
    if (!url) return null;
    const trimmed = String(url).trim();
    if (!trimmed) return null;
    return trimmed.replace(/\/+$/, "");
}

export function getSiteUrl() {
    const explicit =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.SITE_URL ||
        process.env.NEXT_SITE_URL;
    const normalizedExplicit = normalizeSiteUrl(explicit);
    if (normalizedExplicit) return normalizedExplicit;

    if (process.env.VERCEL_URL) {
        return normalizeSiteUrl(`https://${process.env.VERCEL_URL}`);
    }

    return "https://www.codestudioworks.com";
}
