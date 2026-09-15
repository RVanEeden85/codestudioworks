import { getSiteUrl } from "./_lib/siteUrl";
import { services } from "./services/_lib/services";
import { projects } from "./work/_lib/projects";

export default function sitemap() {
    const siteUrl = getSiteUrl();
    const lastModified = new Date("2026-09-15T00:00:00.000Z");

    const staticRoutes = [
        {
            url: siteUrl,
            lastModified,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${siteUrl}/start-a-business`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/detroit-web-development`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/services`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/work`,
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
        {
            url: `${siteUrl}/privacy`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${siteUrl}/terms`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.2,
        },
    ];

    const serviceRoutes = services.map((service) => ({
        url: `${siteUrl}/services/${service.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    const projectRoutes = projects.map((project) => ({
        url: `${siteUrl}/work/${project.slug}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.5,
    }));

    return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
