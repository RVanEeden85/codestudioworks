import { useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import ConsultationModal from "./ConsultationModal";
import BookConsultationButton from "./BookConsultationButton";

const Info = ({ setIsConsultationOpen }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const topics = [
        {
            title: "What is Branding & Visual Identity?",
            text: "Your branding defines how people perceive your business — from your logo and colours to the tone of your website. A strong visual identity builds recognition and trust online.",
        },
        {
            title: "Web Design vs Web Development",
            text: "Web design focuses on your site’s look and feel, while web development handles functionality behind the scenes. Both work together to deliver a seamless user experience.",
        },
        {
            title: "Custom Coded Sites vs CMS Platforms",
            text: "A custom-coded site offers full flexibility and scalability. CMS platforms like WordPress or Wix are better for quick setup and easy editing but have limitations for advanced projects.",
        },
        {
            title: "What is a Web Application?",
            text: "Web apps are interactive websites that perform specific functions — such as booking systems, dashboards, or social platforms — built to handle user input and dynamic data.",
        },
        {
            title: "What is an E-Commerce Site?",
            text: "E-commerce sites allow you to sell products or services online, featuring shopping carts, payment gateways, and order management systems.",
        },
        {
            title: "What is API & Backend Development?",
            text: "APIs connect your website with other platforms or apps, while backend development powers your website’s logic, data, and server-side functionality.",
        },
        {
            title: "What is SEO?",
            text: "Search Engine Optimisation helps your site rank higher on Google by improving content, speed, and structure — bringing more organic visitors over time.",
        },
        {
            title: "What is Digital Marketing & Paid Ads?",
            text: "Digital marketing promotes your site through social media, email, and online ads. Paid ads accelerate your reach and help attract the right audience.",
        },
        {
            title: "What is Hosting?",
            text: "Hosting stores your website files online. Reliable hosting ensures fast load speeds and uptime so your visitors can access your site 24/7.",
        },
        {
            title: "What is Performance Monitoring?",
            text: "Performance monitoring keeps your site fast, secure, and stable — detecting issues early and maintaining smooth user experiences.",
        },
        {
            title: "What is Content Management & Updates?",
            text: "Content updates keep your site current and accurate. You can opt for a monthly care plan or simply pay-as-you-go for updates as needed.",
        },
    ];

    return (
        <section
            id="info"
            className="bg-primary min-h-screen flex flex-col items-center justify-center py-20 px-6 md:px-16 relative"
        >
            <div className="max-w-5xl mx-auto">
                <h2 className="text-white/30 font-bold text-3xl md:text-7xl mb-8">
                    Some Helpful Information
                </h2>

                <p className="text-left md:max-w-5xl mx-auto mb-12 text-white text-md md:text-xl font-medium">
                    If this is your first time ordering web development
                    services, you might have many questions or feel unsure about
                    what you really need. These explanations will help you
                    understand what each service means and how it benefits your
                    business online.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {topics.map((topic, index) => (
                        <div
                            key={index}
                            className="border border-white/10 bg-white/10 rounded-lg shadow-sm overflow-hidden transition-all"
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(
                                        openIndex === index ? null : index
                                    )
                                }
                                className="w-full h-18 md:h-18 flex justify-between items-center text-left pl-6 pr-2 py-2 font-bold lg:text-lg text-white/70 transition-colors"
                            >
                                {topic.title}
                                <FaChevronCircleDown
                                    className={`w-5 h-5 text-white/20 transform transition-transform ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            <div
                                className={`px-6 transition-all duration-300 overflow-hidden ${
                                    openIndex === index
                                        ? "max-h-40 pb-5"
                                        : "max-h-0"
                                }`}
                            >
                                <p className="text-gray-200 text-base leading-relaxed">
                                    {topic.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BookConsultationButton
                setIsConsultationOpen={setIsConsultationOpen}
            />
        </section>
    );
};

export default Info;
