import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="min-h-screen flex">
            <div className="w-2/3 p-3 md:p-20 flex flex-col items-center justify-center min-h-screen bg-[#1B3A34] relative">
                {/* Text Content Left */}
                <div className="max-w-xl mx-auto">
                    <h2 className="absolute left-0 top-0 p-10 bg-black/30 w-full text-white/30 uppercase font-bold text-3xl xl:text-4xl 2xl:text-5xl">
                        Where ideas become digital reality
                    </h2>

                    <div className="text-white/60">
                        <h3 className="xl:text-2xl 2xl:text-4xl text-white/80 font-bold mb-3">
                            Hi, I’m Ryno van Eeden — the full-stack developer
                            and founder behind Code Studio Works
                        </h3>

                        <div className="text-sm xl:text-lg 2xl:text-xl space-y-5">
                            <p>
                                I run a small virtual studio that helps new,
                                small, and medium-sized businesses build and
                                grow their online presence. From developing your
                                first digital footprint strategy to web design,
                                SEO, branding, and digital marketing, I provide
                                an all-in-one suite of online services designed
                                to make your business stand out in the digital
                                space.
                            </p>

                            <p>
                                I’m based in Michigan, USA, and work with
                                clients around the world through virtual
                                meetings and secure online payments.
                            </p>

                            <p>
                                As a professional freelancer, I’m passionate
                                about helping businesses grow and achieve
                                lasting success. If you’re looking for a
                                personal, one-on-one approach to your online
                                marketing, let’s connect — and if you already
                                have a project in mind, let’s make it happen!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo */}
            <div className="w-1/3 relative">
                {/* Overlay */}
                <div className="inset-0 absolute left-0 top-0 w-full h-full bg-[#1B3A34] opacity-40"></div>

                {/* Photo Caption */}
                <div className="absolute left-0 bottom-0 p-10 bg-[#142824] text-white/70 font-bold w-full text-center">
                    <p>
                        Ryno van Eeden — Full-Stack Developer & Owner of
                        CodeStudioWorks
                    </p>
                </div>

                <img
                    className=" w-full h-full object-cover"
                    src="/images/ryno.png"
                    alt="Full stack web app and website development studio in Westland, Michigan, USA - CodeStudioWorks"
                />
            </div>
        </section>
    );
};

export default About;
