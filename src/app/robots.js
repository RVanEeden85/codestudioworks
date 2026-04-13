import { getSiteUrl } from "./_lib/siteUrl";

export default function robots() {
    const siteUrl = "https://codestudioworks.com";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
