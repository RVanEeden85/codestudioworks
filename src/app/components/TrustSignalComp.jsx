import { FaCheckCircle } from "react-icons/fa";

const TrustSignalComp = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-1 md:gap-3 max-w-7xl mx-auto mt-10">
            <div className="bg-white/10 backdrop-blur-md py-1 px-4 rounded-full font-bold text-white/80 text-sm  shadow-lg border border-white/10 flex gap-2 items-center md:justify-center">
                <span className="text-green-500">
                    <FaCheckCircle />
                </span>
                <p>No long-term contracts</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md py-1 px-4 rounded-full font-bold text-white/80 text-sm  shadow-lg border border-white/10 flex gap-2 items-center md:justify-center">
                <span className="text-green-500">
                    <FaCheckCircle />
                </span>
                <p>No hidden fees</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md py-1 px-4 rounded-full font-bold text-white/80 text-sm  shadow-lg border border-white/10 flex gap-2 items-center md:justify-center">
                <span className="text-green-500">
                    <FaCheckCircle />
                </span>
                <p>Fully transparent process</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md py-1 px-4 rounded-full font-bold text-white/80 text-sm  shadow-lg border border-white/10 flex gap-2 items-center md:justify-center">
                <span className="text-green-500">
                    <FaCheckCircle />
                </span>
                <p>Secure remote sessions</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md py-1 px-4 rounded-full font-bold text-white/80 text-sm  shadow-lg border border-white/10 flex gap-2 items-center md:justify-center">
                <span className="text-green-500">
                    <FaCheckCircle />
                </span>
                <p>Privacy Assured</p>
            </div>
        </div>
    );
};

export default TrustSignalComp;
