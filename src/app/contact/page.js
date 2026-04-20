import Contact from "../components/Contact";

export const metadata = {
    title: "Contact",
    description:
        "Contact CodeStudioWorks for web development, SEO, WordPress fixes, or remote IT support. Based in Michigan, serving clients worldwide.",
    alternates: { canonical: "/contact" },
};

export default function ContactPage() {
    return (
        <main className="overflow-hidden">
            <Contact />
        </main>
    );
}

