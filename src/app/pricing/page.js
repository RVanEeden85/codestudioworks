import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import EstimateBuilder from "../components/EstimateBuilder";

export const metadata = {
    title: "Pricing & Engagements",
    description:
        "Explore CodeStudioWorks starting prices for business websites, custom applications, ongoing development partnerships, and website care.",
    alternates: { canonical: "/pricing" },
};

const notes = [
    "All public figures are starting guides in USD.",
    "Optional monthly support is planned and priced separately.",
    "A written proposal confirms what is included, ownership, timeline, and price.",
];

export default function PricingPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <section className="concrete-image-section architectural-light border-b border-black/10 py-20 md:py-28">
                <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
                    <div>
                        <p className="eyebrow">Pricing and engagements</p>
                        <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight text-secondary md:text-7xl">
                            Clear starting prices. A plan based on what you
                            actually need.
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-black/64">
                            Compare the common ways to work with CodeStudioWorks,
                            then share the shape of your project. You will receive
                            a tailored next step instead of a misleading automatic
                            quote.
                        </p>
                        <Link
                            href="#pricing-options"
                            className="mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-4 text-base font-black text-white transition hover:bg-primary"
                        >
                            Explore Starting Prices
                            <FiArrowRight aria-hidden="true" />
                        </Link>
                    </div>

                    <div className="architectural-slab p-6 text-white">
                        <p className="text-sm font-black uppercase text-accent">
                            How pricing works
                        </p>
                        <div className="mt-5 grid gap-4">
                            {notes.map((note) => (
                                <div
                                    key={note}
                                    className="flex gap-3 rounded-md border border-white/10 bg-white/8 p-4 text-sm font-bold leading-6 text-white/72"
                                >
                                    <FiCheckCircle className="mt-0.5 shrink-0 text-accent" />
                                    {note}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <EstimateBuilder />
        </main>
    );
}
