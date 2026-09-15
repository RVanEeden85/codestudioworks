import "./globals.css";
import Navbar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import CopyrightBar from "./components/Copyright-bar";
import WhatsAppButton from "./components/WaButton";
import { getSiteUrl } from "./_lib/siteUrl";

const siteUrl = getSiteUrl();

export const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "CodeStudioWorks | Websites, Web Apps & Digital Systems",
        template: "%s | CodeStudioWorks",
    },
    description:
        "CodeStudioWorks is an independent development studio for professional websites, web and mobile apps, custom software, integrations, and ongoing technical support.",
    keywords: [
        "web development Michigan",
        "web design Michigan",
        "Next.js developer Michigan",
        "website maintenance Michigan",
        "custom web applications",
        "web developer near me",
        "freelance software developer",
        "fractional development partner",
        "small business website design",
        "custom business software",
        "founder led web studio",
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
        title: "CodeStudioWorks - Websites, Web Apps & Digital Systems",
        description:
            "Independent web, app, and software development for small businesses, startups, and companies that need reliable technical capacity.",
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
        title: "CodeStudioWorks - Websites, Web Apps & Digital Systems",
        description:
            "Professional websites, apps, custom software, and ongoing development support.",
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
                                    "@type": "ProfessionalService",
                                    "@id": `${siteUrl}/#organization`,
                                    name: "CodeStudioWorks",
                                    url: siteUrl,
                                    logo: {
                                        "@type": "ImageObject",
                                        url: `${siteUrl}/brand/csw/codestudioworks-csw-icon-512.png`,
                                    },
                                    founder: {
                                        "@id": `${siteUrl}/#ryno-van-eeden`,
                                    },
                                    areaServed: "Worldwide",
                                    serviceType: [
                                        "Web development",
                                        "Mobile app development",
                                        "Custom software development",
                                        "Fractional development support",
                                    ],
                                },
                                {
                                    "@type": "Person",
                                    "@id": `${siteUrl}/#ryno-van-eeden`,
                                    name: "Ryno van Eeden",
                                    jobTitle: "Founder and Full-Stack Developer",
                                    worksFor: {
                                        "@id": `${siteUrl}/#organization`,
                                    },
                                    url: `${siteUrl}/about`,
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
                <Navbar />
                {children}
                <Toaster position="top-right" />
                <CopyrightBar />
                <WhatsAppButton />
            </body>
        </html>
    );
}
