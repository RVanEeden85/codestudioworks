import About from "../components/About";

export const metadata = {
    title: "About",
    description:
        "Learn about CodeStudioWorks: web development, IT support, and practical digital strategy for small businesses.",
    alternates: { canonical: "/about" },
};

export default function AboutPage() {
    return (
        <main className="overflow-hidden">
            <About />
        </main>
    );
}

