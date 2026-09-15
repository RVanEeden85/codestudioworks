import EstimateBuilder from "../components/EstimateBuilder";
import PricingHorizonHero from "../components/PricingHorizonHero";

export const metadata = {
    title: "Pricing & Engagements",
    description:
        "Explore CodeStudioWorks starting prices for business websites, custom applications, ongoing development partnerships, and website care.",
    alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <PricingHorizonHero />

            <EstimateBuilder />
        </main>
    );
}
