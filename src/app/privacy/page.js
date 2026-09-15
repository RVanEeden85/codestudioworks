import Link from "next/link";

export const metadata = {
    title: "Privacy Policy",
    description: "How CodeStudioWorks collects, uses, and protects enquiry information.",
    alternates: { canonical: "/privacy" },
};

const sections = [
    {
        title: "Information I collect",
        content: "When you send an enquiry or request a consultation, I may collect your name, email address, phone number, business or project details, budget range, preferred availability, and any other information you choose to provide. Basic technical logs may also be processed by the website host for security and reliability.",
    },
    {
        title: "How I use it",
        content: "I use this information to respond to you, assess and plan potential work, prepare proposals, deliver agreed services, keep business records, protect the website, and meet legal obligations. I do not sell personal information or use enquiry details for unrelated bulk marketing.",
    },
    {
        title: "Services involved",
        content: "The website and enquiry process may use service providers for hosting, database storage, transactional email, and communications. These can include Vercel, MongoDB, Postmark, and WhatsApp when you choose to contact me there. Each provider processes information under its own terms and privacy practices.",
    },
    {
        title: "Retention and security",
        content: "I keep enquiry and project records only for as long as reasonably needed for follow-up, service delivery, recordkeeping, dispute prevention, or legal requirements. Reasonable technical and organizational safeguards are used, but no online service can promise absolute security.",
    },
    {
        title: "Your choices",
        content: "You may ask what personal information I hold about you, request a correction or deletion where applicable, or ask me to stop using it for a particular purpose. Some records may need to be retained when required for legitimate business or legal reasons.",
    },
    {
        title: "Children and changes",
        content: "This website is intended for businesses and adults and is not directed to children. This policy may be updated as the website, service providers, or legal requirements change; the effective date below will be revised when that happens.",
    },
];

export default function PrivacyPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <section className="concrete-image-section architectural-light border-b border-black/10 py-16 md:py-24">
                <div className="section-shell max-w-4xl">
                    <p className="eyebrow">Privacy</p>
                    <h1 className="mt-4 text-5xl font-black leading-tight text-secondary md:text-7xl">Privacy Policy</h1>
                    <p className="mt-5 text-sm font-bold text-black/50">Effective September 14, 2026</p>
                    <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-black/64">This policy explains how CodeStudioWorks, an independent studio operated by Ryno van Eeden, handles information submitted through this website.</p>
                </div>
            </section>
            <section className="py-16 md:py-20">
                <div className="section-shell max-w-4xl space-y-5">
                    {sections.map((section) => (
                        <article key={section.title} className="border-t border-white/16 py-7 md:py-9">
                            <h2 className="text-2xl font-black text-secondary">{section.title}</h2>
                            <p className="mt-4 font-medium leading-7 text-black/64">{section.content}</p>
                        </article>
                    ))}
                    <div className="architectural-slab p-6 text-white md:p-8">
                        <h2 className="text-2xl font-black">Privacy questions or requests</h2>
                        <p className="mt-3 max-w-2xl font-medium leading-7 text-white/70">Use the contact page and identify your message as a privacy request. I will reply directly and may need to confirm your identity before sharing or changing records.</p>
                        <Link href="/contact" className="mt-6 inline-flex rounded-md bg-accent px-5 py-3 font-black text-secondary">Contact CodeStudioWorks</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
