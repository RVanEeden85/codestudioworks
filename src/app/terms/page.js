import Link from "next/link";

export const metadata = {
    title: "Website Terms",
    description: "Terms for using the CodeStudioWorks website and its project information.",
    alternates: { canonical: "/terms" },
};

const sections = [
    ["Website use", "You may use this website to learn about CodeStudioWorks and make a genuine business enquiry. Do not attempt to disrupt the site, gain unauthorized access, submit unlawful material, or misuse its forms and content."],
    ["Information, prices, and estimates", "Website content is general information, not a binding offer. Published prices are starting guides in U.S. dollars unless stated otherwise. Timelines, availability, scope, and final fees are confirmed in a written proposal or agreement after the project is understood."],
    ["Project engagements", "Any paid work is governed by the proposal, statement of work, or service agreement accepted for that project. That document will define deliverables, responsibilities, payment terms, revisions, ownership, support, and any third-party costs."],
    ["Intellectual property", "CodeStudioWorks owns this website's original branding, text, design, and code except for third-party material and identified client or platform brands. Project ownership and licensing are determined by the applicable client agreement, not by these website terms."],
    ["Third-party services and links", "This website may link to client work, communication services, or other third-party websites. CodeStudioWorks does not control their availability, security, content, or privacy practices and is not responsible for your use of those services."],
    ["Availability and liability", "I aim to keep website information accurate and available, but it is provided without a guarantee that it will always be complete, current, uninterrupted, or error-free. To the extent allowed by law, CodeStudioWorks is not liable for indirect loss resulting solely from use of this informational website."],
    ["Changes and governing law", "These terms may change as the website or studio services evolve. The current version is shown here. Unless a project agreement states otherwise, these website terms are governed by the laws applicable in Michigan, United States."],
];

export default function TermsPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <section className="concrete-image-section architectural-light border-b border-black/10 py-16 md:py-24">
                <div className="section-shell max-w-4xl">
                    <p className="eyebrow">Terms</p>
                    <h1 className="mt-4 text-5xl font-black leading-tight text-secondary md:text-7xl">Website Terms</h1>
                    <p className="mt-5 text-sm font-bold text-black/50">Effective September 14, 2026</p>
                    <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-black/64">These terms cover use of the public CodeStudioWorks website. A signed project agreement takes priority for any paid engagement.</p>
                </div>
            </section>
            <section className="py-16 md:py-20">
                <div className="section-shell max-w-4xl space-y-5">
                    {sections.map(([title, content]) => (
                        <article key={title} className="border-t border-white/16 py-7 md:py-9">
                            <h2 className="text-2xl font-black text-secondary">{title}</h2>
                            <p className="mt-4 font-medium leading-7 text-black/64">{content}</p>
                        </article>
                    ))}
                    <div className="architectural-slab p-6 text-white md:p-8">
                        <h2 className="text-2xl font-black">Questions about these terms?</h2>
                        <Link href="/contact" className="mt-6 inline-flex rounded-md bg-accent px-5 py-3 font-black text-secondary">Contact CodeStudioWorks</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
