import About from "../components/About";

export const metadata = {
    title: "About",
    description:
        "Meet Ryno van Eeden, the founder and full-stack developer behind CodeStudioWorks and its independent web, app, and software services.",
    alternates: { canonical: "/about" },
};

export default function AboutPage() {
    return (
        <main className="architectural-page bg-background pt-[72px]">
            <About />
        </main>
    );
}
