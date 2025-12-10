import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    return (
        <a
            className="fixed bottom-5 right-5 z-50 rounded-full border border-white border-2 bg-green-500 text-White text-2xl p-2"
            href="https://wa.me/13132135404?text=Hi%20Ryno%20at%20CodeStudioWorks!%20I%E2%80%99d%20love%20to%20chat%20about%20a%20project%20or%20your%20services."
        >
            <span className="text-white">
                <FaWhatsapp />
            </span>
        </a>
    );
};

export default WhatsAppButton;
