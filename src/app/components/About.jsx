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
        title: "Built for your business",
        text: "I choose the design and tools to fit your customers, your budget and the way you work.",
    },
    {
        icon: <FiShield />,
        title: "Support after launch",
        text: "You receive documented work and a clear handover, with ongoing support available when you need it.",
    },
];

const About = () => {
    return (
        <section className="bg-[#101211] py-20 md:py-28">
            <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="about-portrait relative overflow-hidden border border-white/12 bg-black">
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
                        Meet Ryno, your full-stack developer.
                    </h1>
                    <div className="mt-6 space-y-5 text-lg leading-relaxed text-white/85">
                        <p>I’m Ryno van Eeden, the developer behind CodeStudioWorks. I’m based in Detroit and work with businesses locally and worldwide.</p>
                        <p>I bring more than 15 years of software experience to websites, web and mobile apps, and business tools. My work includes a service-business website for Rolleston Tinting, full-stack contributions to State Champs! Sports Network and my independent product, EventBookr.</p>
                        <p>I can build a new project or join your team to improve an existing one. We’ll agree on priorities, review progress together and keep your code and accounts organised for the future.</p>
                        <Link href="/work" className="inline-flex font-bold text-accent underline">Explore my work</Link>
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
                        Discuss your project
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
