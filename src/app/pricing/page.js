import InstantQuote from "../components/Quote";

export const metadata = {
    title: "Pricing",
    description:
        "Get an instant estimate for your website or software project, plus transparent options for ongoing support and maintenance.",
    alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-16">
            <header className="mb-10">
                <h1 className="text-4xl md:text-6xl font-bold text-primary">
                    Pricing
                </h1>
                <p className="mt-4 text-lg text-black/70">
                    Transparent estimates and clear deliverables.
                </p>
            </header>

            <section className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-primary">
                    Instant quote
                </h2>
                <p className="mt-2 text-black/70">
                    Answer a few questions to get a starting estimate.
                </p>
                <div className="mt-6">
                    <InstantQuote />
                </div>
            </section>
        </main>
    );
}

