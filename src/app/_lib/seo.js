import { getSiteUrl } from "./siteUrl";

export const SITE_NAME = "CodeStudioWorks";
export const SITE_URL = getSiteUrl();
export const FOUNDER_NAME = "Ryno van Eeden";
export const BUSINESS_PHONE = "+1-313-213-5404";
export const DEFAULT_SOCIAL_IMAGE = "/opengraph-image";

export const SERVICE_AREAS = [
    { "@type": "City", name: "Detroit" },
    { "@type": "AdministrativeArea", name: "Metro Detroit" },
    { "@type": "AdministrativeArea", name: "Michigan" },
    { "@type": "Country", name: "United States" },
    { "@type": "Place", name: "Worldwide" },
];

export function absoluteUrl(path = "/") {
    if (/^https?:\/\//i.test(path)) return path;
    return `${SITE_URL}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({ title, description, path = "/", image = DEFAULT_SOCIAL_IMAGE }) {
    const url = absoluteUrl(path);

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            locale: "en_US",
            type: "website",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: `${SITE_NAME} — Detroit-based web, app, and software development`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

export function breadcrumbSchema(items) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

export function faqSchema(items) {
    return {
        "@type": "FAQPage",
        mainEntity: items.map((item) => {
            const question = Array.isArray(item) ? item[0] : item.question;
            const answer = Array.isArray(item) ? item[1] : item.answer;

            return {
                "@type": "Question",
                name: question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: answer,
                },
            };
        }),
    };
}

export function graphSchema(items) {
    return {
        "@context": "https://schema.org",
        "@graph": items,
    };
}
