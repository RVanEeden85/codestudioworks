/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            { source: "/services/web-development", destination: "/services/business-website-launch", permanent: true },
            { source: "/services/mobile-app-development", destination: "/services/custom-web-apps", permanent: true },
            { source: "/services/ui-ux-design", destination: "/services/business-website-launch", permanent: true },
            { source: "/services/seo-optimization", destination: "/services/care-maintenance", permanent: true },
            { source: "/services/seo-local-presence", destination: "/services/care-maintenance", permanent: true },
            { source: "/services/paid-ads-management", destination: "/services", permanent: true },
            { source: "/services/social-media-management", destination: "/services", permanent: true },
        ];
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "Content-Security-Policy", value: "default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self' data:; form-action 'self'; frame-ancestors 'none'; img-src 'self' data: blob: https:; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                ],
            },
        ];
    },
};

export default nextConfig;
