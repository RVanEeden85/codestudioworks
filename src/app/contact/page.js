import { Suspense } from "react";
import ContactFromQuery from "../components/ContactFromQuery";
import JsonLd from "../components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata, graphSchema } from "../_lib/seo";

export const metadata = buildMetadata({
    title: "Request a Website, Software or SEO Quote",
    description:
        "Request a quote for website design, apps, custom software, SEO or digital marketing. Westland-based, serving Metro Detroit and clients worldwide.",
    path: "/contact",
});

const pageSchema = graphSchema([
    {
        "@type": "ContactPage",
        "@id": `${absoluteUrl("/contact")}#webpage`,
        url: absoluteUrl("/contact"),
        name: "Contact CodeStudioWorks",
        description:
            "Contact a Westland-based website and software developer serving Metro Detroit and clients worldwide.",
        mainEntity: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-US",
    },
    breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
    ]),
]);

export default function ContactPage() {
    return (
        <main id="main-content" className="architectural-page bg-background pt-[72px]">
            <JsonLd data={pageSchema} />
            <Suspense fallback={<section className="section-shell py-20"><h1 className="text-4xl font-bold">Request a project quote</h1><p className="mt-6">Loading the enquiry form. You can also <a href="mailto:info@codestudioworks.com" className="text-accent underline">email info@codestudioworks.com</a> or <a href="tel:+13132135404" className="text-accent underline">call +1 (313) 213-5404</a>.</p></section>}><ContactFromQuery /></Suspense>
        </main>
    );
}
