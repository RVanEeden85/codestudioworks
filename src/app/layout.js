import "./globals.css";
import Navbar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import CopyrightBar from "./components/Copyright-bar";
import WhatsAppButton from "./components/WaButton";
import MotionExperience from "./components/MotionExperience";
import CampaignAttribution from "./components/CampaignAttribution";
import JsonLd from "./components/JsonLd";
import {
    BUSINESS_PHONE,
    FOUNDER_NAME,
    SERVICE_AREAS,
    SITE_NAME,
    SITE_URL,
    absoluteUrl,
    graphSchema,
} from "./_lib/seo";

const verification = {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
        : undefined,
};

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Detroit Web Developer & Software Studio | CodeStudioWorks",
        template: "%s | CodeStudioWorks",
    },
    description:
        "Detroit-based web developer building professional websites, web and mobile apps, custom software, and digital systems for businesses in Michigan and worldwide.",
    applicationName: SITE_NAME,
    category: "technology",
    authors: [{ name: FOUNDER_NAME, url: absoluteUrl("/about") }],
    creator: FOUNDER_NAME,
    publisher: SITE_NAME,
    alternates: {
        canonical: "/",
    },
    verification,
    icons: {
        icon: [
            { url: "/icon.png", type: "image/png" },
            { url: "/favicon.ico", sizes: "any" },
        ],
        apple: "/apple-icon.png",
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
        title: "Detroit Web Developer & Software Studio | CodeStudioWorks",
        description:
            "Detroit-based, founder-led web, app, and software development for local businesses, startups, and companies worldwide.",
        url: SITE_URL,
        siteName: SITE_NAME,
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "CodeStudioWorks — Detroit-based web, app, and software development",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Detroit Web Developer & Software Studio | CodeStudioWorks",
        description:
            "Detroit-based, founder-led websites, apps, custom software, and ongoing development support—available worldwide.",
        images: ["/twitter-image"],
    },
};

const siteSchema = graphSchema([
    {
        "@type": ["ProfessionalService", "Organization"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description:
            "Detroit-based independent development studio delivering websites, web and mobile apps, custom business software, integrations, and ongoing technical support for clients locally and worldwide.",
        logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/brand/csw/codestudioworks-csw-icon-512.png"),
            width: 512,
            height: 512,
        },
        image: absoluteUrl("/opengraph-image"),
        telephone: BUSINESS_PHONE,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Detroit",
            addressRegion: "MI",
            addressCountry: "US",
        },
        areaServed: SERVICE_AREAS,
        serviceType: [
            "Website design and development",
            "Web application development",
            "Mobile application development",
            "Custom business software development",
            "Fractional development support",
            "Website maintenance and technical SEO",
        ],
        knowsAbout: [
            "Web development",
            "Software engineering",
            "Next.js",
            "React",
            "React Native",
            "Node.js",
            "Technical SEO",
            "Local search foundations",
        ],
        founder: { "@id": `${SITE_URL}/#ryno-van-eeden` },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: BUSINESS_PHONE,
            contactType: "sales",
            areaServed: "Worldwide",
            availableLanguage: ["English"],
        },
    },
    {
        "@type": "Person",
        "@id": `${SITE_URL}/#ryno-van-eeden`,
        name: FOUNDER_NAME,
        jobTitle: "Founder and Full-Stack Developer",
        description:
            "Detroit-based full-stack developer with more than 15 years of professional software experience.",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        url: absoluteUrl("/about"),
        image: absoluteUrl("/images/ryno.webp"),
        knowsAbout: [
            "Website development",
            "Web applications",
            "Mobile applications",
            "Custom software",
            "Product engineering",
            "Technical SEO",
        ],
    },
    {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
            "Websites, apps, and software from a Detroit-based independent development studio serving clients worldwide.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#organization` },
    },
]);

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <JsonLd data={siteSchema} />
            </head>
            <body className="antialiased">
                <a href="#main-content" className="skip-link">Skip to content</a>
                <CampaignAttribution />
                <MotionExperience />
                <Navbar />
                {children}
                <Toaster position="top-right" />
                <CopyrightBar />
                <WhatsAppButton />
            </body>
        </html>
    );
}
