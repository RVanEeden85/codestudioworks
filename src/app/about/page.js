import About from "../components/About";
import JsonLd from "../components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata, graphSchema } from "../_lib/seo";

export const metadata = buildMetadata({
    title: "About Ryno van Eeden, Detroit Full-Stack Developer",
    description:
        "Meet Ryno van Eeden, a Detroit-based full-stack developer with 15+ years of experience building websites, apps, software, and business systems.",
    path: "/about",
});

const pageSchema = graphSchema([
    {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl("/about")}#webpage`,
        url: absoluteUrl("/about"),
        name: "About Ryno van Eeden, Detroit Full-Stack Developer",
        mainEntity: { "@id": `${absoluteUrl("/")}#ryno-van-eeden` },
        about: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-US",
    },
    breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
    ]),
]);

export default function AboutPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <JsonLd data={pageSchema} />
            <About />
        </main>
    );
}
