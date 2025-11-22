const Services = () => {
    return (
        <section
            id="services"
            className="p-3 py-20 min-h-screen bg-[#3A6050] flex flex-col items-center justify-center relative space-y-8"
        >
            <h2 className="text-white/30 font-bold text-3xl xl:text-5xl 2xl:text-7xl xl:mb-6 2xl:mb-12 z-10">
                Services to get you up and running
            </h2>

            <div className="grid grid-cols-1 space-y-3 md:grid-cols-2 max-w-6xl mx-auto xl:gap-3 2xl:gap-3 z-10">
                <div className="p-3 rounded-2xl flex flex-col">
                    <div className="">
                        <h2 className="font-bold xl:text-xl 2xl:text-3xl text-white/70  text-center">
                            Branding & Visual Identity
                        </h2>
                        <div className="text-gray-300 xl:text-lg 2xl:text-xl font-medium grid grid-cols-2 gap-2">
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Logo Design
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Brand Guidelines
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Business Cards & Stationery
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Social Media Branding
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-3 rounded-2xl flex flex-col">
                    <div className="">
                        <h2 className="font-bold xl:text-xl 2xl:text-3xl text-white/70  text-center">
                            Web & App Development
                        </h2>
                        <div className="text-gray-300 xl:text-lg 2xl:text-xl font-medium grid grid-cols-2 items-center justify-center gap-2">
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Website Design & Development
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Web Applications (Custom Solutions)
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                E-Commerce Sites
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                API & Backend Development
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-3 rounded-2xl flex flex-col">
                    <div className="">
                        <h2 className="font-bold xl:text-xl 2xl:text-3xl text-white/70  text-center">
                            Digital Marketing & SEO
                        </h2>
                        <div className="text-gray-300 xl:text-lg 2xl:text-xl font-medium grid grid-cols-2 items-center justify-center gap-2">
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                SEO Optimisation
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Paid Ads (Meta, Google)
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Email Marketing
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Social Media Strategy & Content
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-3 rounded-2xl flex flex-col">
                    <div className="">
                        <h2 className="font-bold xl:text-xl 2xl:text-3xl text-white/70  text-center">
                            Support & Maintenance
                        </h2>
                        <div className="text-gray-300 xl:text-lg 2xl:text-xl font-medium grid grid-cols-2 items-center justify-center gap-2">
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Website Hosting & Updates
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Performance Monitoring
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Security & Backups
                            </span>
                            <span className="rounded-lg min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-white/10 flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Content Updates & Management
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 p-5 xl:p-8 2xl:p-10 rounded-tl-3xl bg-white/10 max-w-[340px] xl:max-w-2xl 2xl:max-w-4xl flex items-center z-10">
                <p className="text-white/50 font-semibold text-sm xl:text-xl 2xl:text-2xl leading-snug">
                    Based in{" "}
                    <span className="font-bold text-white/80">
                        Michigan, USA
                    </span>{" "}
                    —{" "}
                    <span className="font-bold text-white/80">
                        delivering projects worldwide
                    </span>{" "}
                    through seamless online collaboration and virtual meetings.
                </p>
            </div>
        </section>
    );
};

export default Services;
