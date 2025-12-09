const Services = () => {
    return (
        <section
            id="services"
            className="p-3 py-20 min-h-screen bg-[#1B3A34] flex flex-col items-center justify-center relative space-y-8"
        >
            {/* Background */}
            <div className="inset-0 w-full h-full object-cover absolute top-0 left-0 opacity-20">
                <img src="/images/bg2.webp" alt="" />
            </div>

            {/* Section Header */}
            <div className="absolute left-0 top-0 bg-[#142824] text-white/50 flex p-10">
                <h2 className=" uppercase  w-2/3 font-bold text-3xl xl:text-5xl 2xl:text-7xl xl:mb-6 2xl:mb-12 z-10">
                    Available Services
                </h2>
                <div className="w-1/3">
                    <p className="text-white/50 font-semibold text-sm xl:text-lg 2xl:text-xl leading-snug">
                        Based in{" "}
                        <span className="font-bold text-white/80">
                            Michigan, USA
                        </span>{" "}
                        —{" "}
                        <span className="font-bold text-white/80">
                            delivering projects worldwide
                        </span>{" "}
                        through seamless online collaboration and virtual
                        meetings.
                    </p>
                </div>
            </div>

            {/* Content */}

            <div className="grid grid-cols-1 space-y-3 md:grid-cols-2 max-w-6xl mx-auto xl:gap-3 2xl:gap-3 z-10">
                <div className="p-3 flex flex-col">
                    <div className="">
                        <h2 className="font-bold xl:text-xl 2xl:text-3xl text-white/70 uppercase mb-2 text-center">
                            Branding & Visual Identity
                        </h2>
                        <div className="text-gray-300 xl:text-lg 2xl:text-xl font-medium grid grid-cols-2 gap-1">
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Logo Design
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Brand Guidelines
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Business Cards & Stationery
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Social Media Branding
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-3 flex flex-col">
                    <div className="">
                        <h2 className="font-bold xl:text-xl 2xl:text-3xl text-white/70 uppercase mb-2 text-center">
                            Web & App Development
                        </h2>
                        <div className="text-gray-300 xl:text-lg 2xl:text-xl font-medium grid grid-cols-2 items-center justify-center gap-1">
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Website Design & Development
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Web Applications (Custom Solutions)
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                E-Commerce Sites
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                API & Backend Development
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-3 flex flex-col">
                    <div className="">
                        <h2 className="font-bold xl:text-xl 2xl:text-3xl text-white/70 uppercase mb-2 text-center">
                            Digital Marketing & SEO
                        </h2>
                        <div className="text-gray-300 xl:text-lg 2xl:text-xl font-medium grid grid-cols-2 items-center justify-center gap-1">
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                SEO Optimisation
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Paid Ads (Meta, Google)
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Email Marketing
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Social Media Strategy & Content
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-3 flex flex-col">
                    <div className="">
                        <h2 className="font-bold xl:text-xl 2xl:text-3xl text-white/70 uppercase mb-2 text-center">
                            Support & Maintenance
                        </h2>
                        <div className="text-gray-300 xl:text-lg 2xl:text-xl font-medium grid grid-cols-2 items-center justify-center gap-1">
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Website Hosting & Updates
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Performance Monitoring
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Security & Backups
                            </span>
                            <span className="min-h-18 xl:min-h-18 2xl:min-h-20 xl:max-h-20 2xl:max-h-20 text-center bg-[#1B3A34] flex items-center justify-center border border-white/10 px-4 py-2 shadow-md">
                                Content Updates & Management
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
