import { getSiteUrl } from "./_lib/siteUrl";

export default function sitemap() {
    const siteUrl = "https://codestudioworks.com";
    const lastModified = new Date();

    return [
        {
            url: siteUrl,
            lastModified,
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
