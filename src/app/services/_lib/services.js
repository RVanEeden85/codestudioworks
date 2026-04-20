export const services = [
    {
        slug: "web-development",
        name: "Web Development",
        summary: "Fast, modern websites and web apps built for performance.",
    },
    {
        slug: "paid-ads-management",
        name: "Paid Ads Management",
        summary: "Targeted advertising campaigns designed to maximize ROI.",
    },
    {
        slug: "seo-optimization",
        name: "SEO Optimization",
        summary: "Technical + on-page SEO to improve visibility and leads.",
    },
    {
        slug: "social-media-management",
        name: "Social Media Management",
        summary: "Consistent content and strategy to grow your brand.",
    },
    {
        slug: "mobile-app-development",
        name: "Mobile App Development",
        summary: "User-friendly apps with clear UX and solid engineering.",
    },
    {
        slug: "ui-ux-design",
        name: "UI/UX Design",
        summary: "Interfaces that look great and convert better.",
    },
];

export function getServiceBySlug(slug) {
    return services.find((service) => service.slug === slug) || null;
}

