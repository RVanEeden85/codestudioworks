import { getSiteUrl } from "./_lib/siteUrl";

export default function manifest() {
    const siteUrl = getSiteUrl();

    return {
        name: "CodeStudioWorks",
        short_name: "CodeStudioWorks",
        description:
            "Web design, web development, WordPress repairs, SEO, and IT support.",
        start_url: "/",
        display: "standalone",
        background_color: "#f9f9f9",
        theme_color: "#1b3a34",
        categories: ["business", "technology"],
        id: siteUrl,
        icons: [
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/apple-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "any",
            },
        ],
    };
}

