import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    return (
        <a
            aria-label="Message CodeStudioWorks on WhatsApp"
            className="fixed bottom-5 right-5 z-50 hidden h-[52px] w-[52px] items-center justify-center rounded-sm border border-accent/60 bg-[#0b0d0c] text-2xl shadow-2xl shadow-black/40 transition hover:-translate-y-1 sm:inline-flex"
            href="https://wa.me/13132135404?text=Hi%20Ryno%20at%20CodeStudioWorks!%20I%E2%80%99d%20love%20to%20chat%20about%20a%20project%20or%20your%20services."
        >
            <span className="text-white">
                <FaWhatsapp />
            </span>
        </a>
    );
};

export default WhatsAppButton;
