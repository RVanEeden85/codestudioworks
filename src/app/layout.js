import "./globals.css";
import Navbar from "./components/NavBar";
import Logo from "./components/Logo";
import { Toaster } from "react-hot-toast";
import CopyrightBar from "./components/Copyright-bar";
import WhatsAppButton from "./components/WaButton";
import { getSiteUrl } from "./_lib/siteUrl";

const siteUrl = getSiteUrl();

export const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "CodeStudioWorks | Web Design, Development & IT Support",
        template: "%s | CodeStudioWorks",
    },
    description:
        "CodeStudioWorks offers custom web development, web design, IT support, WordPress repairs, SEO, and remote computer assistance. Based in Michigan and serving clients across the USA and globally.",
    keywords: [
        "web development Michigan",
        "web design Michigan",
        "IT support Michigan",
        "remote IT support USA",
        "Next.js developer Michigan",
        "WordPress developer Michigan",
        "website maintenance Michigan",
        "custom web applications",
        "web developer near me",
        "software developer freelance",
    ],
    authors: [{ name: "Ryno van Eeden" }],
    creator: "CodeStudioWorks",
    publisher: "CodeStudioWorks",
    alternates: {
        canonical: siteUrl,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        title: "CodeStudioWorks — Web Development & IT Support in Michigan",
        description:
            "Professional web design, web development, WordPress fixes, IT support, and digital strategy for small businesses. Offering remote support and custom-coded solutions.",
        url: siteUrl,
        siteName: "CodeStudioWorks",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "CodeStudioWorks",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CodeStudioWorks — Web Development & IT Support",
        description:
            "Custom websites, software development, IT support & WordPress fixes. Based in Michigan, serving clients worldwide.",
        images: ["/twitter-image"],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "Organization",
                                    "@id": `${siteUrl}/#organization`,
                                    name: "CodeStudioWorks",
                                    url: siteUrl,
                                    logo: {
                                        "@type": "ImageObject",
                                        url: `${siteUrl}/icon.png`,
                                    },
                                },
                                {
                                    "@type": "WebSite",
                                    "@id": `${siteUrl}/#website`,
                                    url: siteUrl,
                                    name: "CodeStudioWorks",
                                    publisher: {
                                        "@id": `${siteUrl}/#organization`,
                                    },
                                },
                            ],
                        }),
                    }}
                />
            </head>
            <body className="antialiased">
                <Logo />
                <Navbar />
                {children}
                <Toaster position="top-right" />
                <CopyrightBar />
                <WhatsAppButton />
            </body>
        </html>
    );
}
