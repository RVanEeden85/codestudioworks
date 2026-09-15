import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiCode, FiMessageSquare, FiShield } from "react-icons/fi";

const values = [
    {
        icon: <FiMessageSquare />,
        title: "Direct communication",
        text: "You work with the person planning and building the project, so decisions stay clear and practical.",
    },
    {
        icon: <FiCode />,
        title: "Custom where it matters",
        text: "The site or app is shaped around your business goals instead of forcing your offer into a generic template.",
    },
    {
        icon: <FiShield />,
        title: "Long-term mindset",
        text: "Launch is only the start. The build should be maintainable, understandable, and ready for future improvements.",
    },
];

const About = () => {
    return (
        <section className="bg-[#101211] py-20 md:py-28">
            <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="relative overflow-hidden border border-white/12 bg-black">
                    <Image
                        src="/images/ryno.webp"
                        className="aspect-[4/5] w-full object-cover grayscale contrast-[1.08]"
                        alt="Ryno van Eeden, founder and full-stack developer at CodeStudioWorks"
                        width={900}
                        height={1000}
                        sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <p className="text-sm font-black uppercase text-accent">
                            CodeStudioWorks founder
                        </p>
                        <p className="mt-2 text-2xl font-black text-white">
                            Ryno van Eeden
                        </p>
                    </div>
                </div>

                <div>
                    <p className="eyebrow">About the studio</p>
                    <h1 className="mt-4 text-5xl font-black leading-tight text-secondary md:text-7xl">
                        An independent studio for businesses that want a real
                        developer in their corner.
                    </h1>
                    <div className="mt-6 space-y-5 text-lg font-medium leading-8 text-black/64">
                        <p>
                            CodeStudioWorks is my independent development studio,
                            based in Detroit, Michigan. I work with businesses
                            across Metro Detroit and worldwide through online
                            meetings and digital delivery. I bring more than 15
                            years in software to websites, applications, and
                            online business tools for small businesses, startups,
                            and established teams.
                        </p>
                        <p>
                            My background spans international software work and
                            modern full-stack delivery. I can lead a focused
                            build, turn an early idea into a practical first
                            release, or join an existing company as dependable
                            freelance development help.
                        </p>
                        <p>
                            You speak directly with me from scoping through
                            launch. When specialist support or third-party tools
                            are useful, I explain that clearly and keep ownership
                            and responsibility visible.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-3">
                        {[
                            "15+ years of professional software experience",
                            "Detroit based, with worldwide online delivery",
                            "Web, mobile, integrations, and operational systems",
                            "Clear scope, regular communication, and launch support",
                        ].map((item) => (
                            <div
                                key={item}
                                className="architectural-rule flex items-center gap-3 py-4 text-sm font-black text-white"
                            >
                                <FiCheck className="text-primary" />
                                {item}
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-4 text-base font-black text-white transition hover:bg-primary"
                    >
                        Start a Project
                        <FiArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </div>

            <div className="section-shell mt-16 grid gap-4 md:grid-cols-3">
                {values.map((item) => (
                    <article
                        key={item.title}
                        className="architectural-slab p-7"
                    >
                        <div className="text-3xl text-primary">{item.icon}</div>
                        <h2 className="mt-6 text-2xl font-black text-secondary">
                            {item.title}
                        </h2>
                        <p className="mt-3 font-medium leading-7 text-black/62">
                            {item.text}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default About;
