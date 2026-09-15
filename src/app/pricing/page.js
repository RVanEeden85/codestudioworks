import EstimateBuilder from "../components/EstimateBuilder";
import PricingHorizonHero from "../components/PricingHorizonHero";
import JsonLd from "../components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata, graphSchema } from "../_lib/seo";

export const metadata = buildMetadata({
    title: "Web Development Pricing & Engagements",
    description:
        "Review starting prices for business websites, custom apps, ongoing development, and website care from a Detroit-based developer serving clients worldwide.",
    path: "/pricing",
});

const pageSchema = graphSchema([
    {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/pricing")}#webpage`,
        url: absoluteUrl("/pricing"),
        name: "Web Development Pricing and Engagements",
        description:
            "Starting prices and working models for business websites, custom applications, development support, and website care.",
        mainEntity: { "@id": `${absoluteUrl("/pricing")}#offer-catalog` },
        about: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-US",
    },
    {
        "@type": "OfferCatalog",
        "@id": `${absoluteUrl("/pricing")}#offer-catalog`,
        name: "CodeStudioWorks starting prices",
        itemListElement: [
            {
                "@type": "Offer",
                name: "Business Website",
                priceCurrency: "USD",
                price: "1250",
                url: absoluteUrl("/services/business-website-launch"),
                itemOffered: { "@type": "Service", name: "Business Website Design and Development" },
            },
            {
                "@type": "Offer",
                name: "Custom Application Foundation",
                priceCurrency: "USD",
                price: "7500",
                url: absoluteUrl("/services/custom-web-apps"),
                itemOffered: { "@type": "Service", name: "Custom Web and Mobile App Development" },
            },
            {
                "@type": "Offer",
                name: "Website Care Plan",
                priceCurrency: "USD",
                price: "150",
                url: absoluteUrl("/services/care-maintenance"),
                itemOffered: { "@type": "Service", name: "Website Maintenance and Technical Support" },
            },
        ],
    },
    breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/pricing" },
    ]),
]);

export default function PricingPage() {
    return (
        <main id="main-content" className="architectural-page bg-background pt-[72px]">
            <JsonLd data={pageSchema} />
            <PricingHorizonHero />

            <EstimateBuilder />
        </main>
    );
}
