import JsonLd from "../components/JsonLd";
import SupportForm from "../components/SupportForm";
import { absoluteUrl, breadcrumbSchema, buildMetadata, graphSchema } from "../_lib/seo";

export const metadata = buildMetadata({
    title: "Client Website & Software Support",
    description:
        "Request support for an existing CodeStudioWorks website, app, or software project. Secure intake for Detroit and worldwide clients.",
    path: "/support",
});

const pageSchema = graphSchema([
    {
        "@type": "ContactPage",
        "@id": `${absoluteUrl("/support")}#webpage`,
        url: absoluteUrl("/support"),
        name: "CodeStudioWorks client support",
        description: "Secure support intake for existing CodeStudioWorks clients and projects.",
        mainEntity: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-US",
    },
    breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Support", path: "/support" },
    ]),
]);

export default function SupportPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <JsonLd data={pageSchema} />
            <SupportForm />
        </main>
    );
}
