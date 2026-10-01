/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            { source: "/services/web-development", destination: "/services/business-website-launch", permanent: true },
            { source: "/services/mobile-app-development", destination: "/services/custom-web-apps", permanent: true },
            { source: "/services/ui-ux-design", destination: "/services/business-website-launch", permanent: true },
            { source: "/services/seo-optimization", destination: "/services/seo-local-presence", permanent: true },
            { source: "/services/paid-ads-management", destination: "/services/digital-marketing", permanent: true },
            { source: "/services/social-media-management", destination: "/services", permanent: true },
        ];
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "Content-Security-Policy", value: "default-src 'self'; base-uri 'self'; connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com; frame-src https://challenges.cloudflare.com; font-src 'self' data:; form-action 'self'; frame-ancestors 'none'; img-src 'self' data: blob: https:; object-src 'none'; script-src 'self' https://challenges.cloudflare.com https://www.googletagmanager.com 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                ],
            },
            { source: "/admin/:path*", headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }, { key: "X-Robots-Tag", value: "noindex, nofollow" }] },
            { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }, { key: "X-Robots-Tag", value: "noindex, nofollow" }] },
        ];
    },
};

export default nextConfig;
