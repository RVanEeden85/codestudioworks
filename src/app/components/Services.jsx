import { FaCheck } from "react-icons/fa";
import TrustSignalComp from "./TrustSignalComp";

const Services = () => {
    return (
        <section
            id="services"
            className="p-3 py-20 min-h-screen bg-[#1B3A34] flex flex-col items-center justify-center relative"
        >
            {/* Background */}
            <div className="inset-0 w-full h-full object-cover absolute top-0 left-0 opacity-30">
                <img
                    className="w-full h-full object-cover"
                    src="/images/bg2.webp"
                    alt=""
                />
            </div>

            {/* Available Services Section Header */}
            <div className="text-white/50 flex mb-10 flex items-end justify-between max-w-7xl">
                <h2 className="uppercase font-bold text-3xl xl:text-5xl 2xl:text-7xl z-10">
                    Available Services
                </h2>
                <div className="w-1/3 bg-secondary z-10 p-5 border border-white/10">
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

            <div className="grid grid-cols-1 space-y-3 md:grid-cols-4 mx-auto xl:gap-2 2xl:gap-3 z-10 max-w-7xl">
                <div className="flex flex-col bg-primary p-6 border h-full border-white/10 shadow-lg">
                    <div className="">
                        <h2 className="font-bold xl:text-lg 2xl:text-xl text-white/70 uppercase mb-2 border-b-1 border-b-white/10 pb-5">
                            Branding & Visual Identity
                        </h2>
                        <div className="text-gray-300 text-md">
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Logo Design
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Brand Guidelines
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Business Cards & Stationery
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Social Media Branding
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-primary p-6 border h-full border-white/10 shadow-lg">
                    <div className="">
                        <h2 className="font-bold xl:text-lg 2xl:text-xl text-white/70 uppercase mb-2 border-b-1 border-b-white/10 pb-5">
                            Web & App Development
                        </h2>
                        <div className="text-gray-300 text-md">
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Website Design & Development
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Web Applications (Custom Solutions)
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                E-Commerce Sites
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                API & Backend Development
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-primary p-6 border h-full border-white/10 shadow-lg">
                    <div className="">
                        <h2 className="font-bold xl:text-lg 2xl:text-xl text-white/70 uppercase mb-2 border-b-1 border-b-white/10 pb-5">
                            Digital Marketing & SEO
                        </h2>
                        <div className="text-gray-300 text-md">
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                SEO Optimisation
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Paid Ads (Meta, Google)
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Email Marketing
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Social Media Strategy & Content
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-primary p-6 border h-full border-white/10 shadow-lg">
                    <div className="">
                        <h2 className="font-bold xl:text-lg 2xl:text-xl text-white/70 uppercase mb-2 border-b-1 border-b-white/10 pb-5">
                            Support & Maintenance
                        </h2>
                        <div className="text-gray-300 text-md">
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Website Hosting & Updates
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Performance Monitoring
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Security & Backups
                            </span>
                            <span className="flex items-start justify-start py-2 flex gap-3">
                                <FaCheck />
                                Content Updates & Management
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Signals */}
            <div className="">
                <TrustSignalComp />
            </div>
        </section>
    );
};

export default Services;
