import Contact from "../components/Contact";

export const metadata = {
    title: "Contact",
    description:
        "Contact CodeStudioWorks to plan a small business website, custom web app, digital system, or ongoing website support.",
    alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }) {
    const params = await searchParams;

    return (
        <main className="architectural-page bg-background pt-[72px]">
            <Contact initialService={params?.service || ""} />
        </main>
    );
}
