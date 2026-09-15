import { getSiteUrl } from "./_lib/siteUrl";

export default function robots() {
    const siteUrl = getSiteUrl();

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/api"],
        },
        sitemap: `${siteUrl}/sitemap.xml`,
        host: siteUrl,
    };
}
