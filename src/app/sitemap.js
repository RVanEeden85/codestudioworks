import { getSiteUrl } from "./_lib/siteUrl";
import { services } from "./services/_lib/services";

export default function sitemap() {
    const siteUrl = getSiteUrl();
    const lastModified = new Date();

    const staticRoutes = [
        {
            url: siteUrl,
            lastModified,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${siteUrl}/services`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/pricing`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteUrl}/about`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${siteUrl}/contact`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.6,
        },
    ];

    const serviceRoutes = services.map((service) => ({
        url: `${siteUrl}/services/${service.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...staticRoutes, ...serviceRoutes];
}
