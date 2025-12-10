import { Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
import Logo from "./components/Logo";
import { Toaster } from "react-hot-toast";
import CopyrightBar from "./components/Copyright-bar";
import WhatsAppButton from "./components/WaButton";

const caveat = Caveat({
    variable: "--font-caveat",
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata = {
    title: "Web Design, Web Development & IT Support | CodeStudioWorks Michigan",
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
        canonical: "https://www.codestudioworks.com",
    },
    openGraph: {
        title: "CodeStudioWorks — Web Development & IT Support in Michigan",
        description:
            "Professional web design, web development, WordPress fixes, IT support, and digital strategy for small businesses. Offering remote support and custom-coded solutions.",
        url: "https://www.codestudioworks.com",
        siteName: "CodeStudioWorks",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "CodeStudioWorks — Web Development & IT Support",
        description:
            "Custom websites, software development, IT support & WordPress fixes. Based in Michigan, serving clients worldwide.",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${caveat.variable} antialiased`}>
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
