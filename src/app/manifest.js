import { getSiteUrl } from "./_lib/siteUrl";

export default function manifest() {
    const siteUrl = getSiteUrl();

    return {
        name: "CodeStudioWorks",
        short_name: "CodeStudioWorks",
        description:
            "Independent websites, apps, custom software, and development support for growing businesses.",
        start_url: "/",
        display: "standalone",
        background_color: "#080909",
        theme_color: "#080909",
        categories: ["business", "technology"],
        id: siteUrl,
        icons: [
            {
                src: "/brand/csw/codestudioworks-csw-icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/brand/csw/codestudioworks-csw-icon-180.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "any",
            },
        ],
    };
}
