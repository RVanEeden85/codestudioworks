import Contact from "../components/Contact";
import JsonLd from "../components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata, graphSchema } from "../_lib/seo";

export const metadata = buildMetadata({
    title: "Contact a Detroit Web & App Developer",
    description:
        "Tell CodeStudioWorks about your website, app, software, or development-support needs. Based in Detroit and available worldwide through online delivery.",
    path: "/contact",
});

const pageSchema = graphSchema([
    {
        "@type": "ContactPage",
        "@id": `${absoluteUrl("/contact")}#webpage`,
        url: absoluteUrl("/contact"),
        name: "Contact CodeStudioWorks",
        description:
            "Contact a Detroit-based web, app, and software developer for local or worldwide project delivery.",
        mainEntity: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-US",
    },
    breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
    ]),
]);

export default async function ContactPage({ searchParams }) {
    const params = await searchParams;

    return (
        <main id="main-content" className="architectural-page bg-background pt-[72px]">
            <JsonLd data={pageSchema} />
            <Contact initialService={params?.service || ""} />
        </main>
    );
}
