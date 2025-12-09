"use client";

import { motion } from "framer-motion";
import {
    FaCode,
    FaServer,
    FaDatabase,
    FaTools,
    FaPaintBrush,
    FaBullhorn,
    FaMoneyCheckAlt,
    FaCogs,
    FaDesktop,
} from "react-icons/fa";
import { TiCloudStorage } from "react-icons/ti";
import { HiDocumentReport } from "react-icons/hi";
import { MdDesignServices } from "react-icons/md";

const Technologies = () => {
    const categories = [
        {
            title: "Programming Languages",
            icon: <FaCode />,
            items: ["HTML5", "CSS3", "Javascript (ES6+)", "JSON", "Markdown"],
        },
        {
            title: "Frontend Development",
            icon: <FaDesktop />,
            items: [
                "Next.js",
                "React.js",
                "React Native",
                "Tailwind CSS",
                "Framer Motion",
                "Axios",
            ],
        },
        {
            title: "Backend Development",
            icon: <FaServer />,
            items: [
                "Node.js",
                "Express.js",
                "Next.js API Routes",
                "REST API Development",
                "Authentication (JWT/OAuth)",
            ],
        },
        {
            title: "Databases",
            icon: <FaDatabase />,
            items: ["MongoDB", "MongoDB Atlas", "Mongoose", "SQL"],
        },
        {
            title: "CMS Platforms",
            icon: <FaTools />,
            items: [
                "WordPress",
                "WooCommerce",
                "Shopify",
                "Wix",
                "Drupal",
                "Joomla",
            ],
        },
        {
            title: "Hosting & Deployment",
            icon: <FaCogs />,
            items: [
                "Vercel",
                "Heroku",
                "Shared Hosting",
                "cPanel",
                "GIT / GitHub",
                "Domain & DNS Setup",
                "Environment Variables Management",
            ],
        },
        {
            title: "UI / UX & Design",
            icon: <FaPaintBrush />,
            items: [
                "Figma",
                "Canva",
                "Responsive Design",
                "Layout Design",
                "Component Driven Design",
                "UX/UI",
            ],
        },
        {
            title: "Digital Marketing",
            icon: <FaBullhorn />,
            items: [
                "SEO Setup",
                "Technical SEO",
                "On-page SEO",
                "Local SEO (GBP optimisation)",
                "SEO Reporting and Audits",
                "Facebook Ads",
                "Google Ads",
                "Instagram Ads",
                "Tik Tok Ads",
                "Nextdoor Ads",
                "Email Marketing",
            ],
        },
        {
            title: "Payment Integration",
            icon: <FaMoneyCheckAlt />,
            items: [
                "PayPal",
                "Stripe",
                "PayFast",
                "Online Payment Integration",
                "Online Quote Requests",
                "Secure Checkouts",
            ],
        },
        {
            title: "IT & Support Services",
            icon: <FaTools />,
            items: [
                "Remote IT Support (AnyDesk / Teamviewer)",
                "IT Support (Callout)",
                "Debugging",
                "Hardware & Software Troubleshooting",
                "System Optimisation",
                "Virus & Malware Removal",
                "Software Installations",
                "Technical Support",
                "Website Audits",
                "Website Optimizations",
                "Website Repairs",
                "Website Maintenance",
            ],
        },
        {
            title: "Storage",
            icon: <TiCloudStorage />,
            items: [
                "ImageKit",
                "Cloudinary",
                "Dropbox",
                "Google Drive",
                "iCloud",
            ],
        },
        {
            title: "Reporting Tools",
            icon: <HiDocumentReport />,
            items: [
                "Google Analytics",
                "Google Search Console",
                "Meta Business Suite",
                "SERanking",
                "AhRefs",
            ],
        },
        {
            title: "Design",
            icon: <MdDesignServices />,
            items: [
                "Graphic Design",
                "Logo Design",
                "Business Cards",
                "Digital Design",
                "Print Design",
            ],
        },
    ];

    return (
        <section className="py-20 bg-secondary text-white">
            <div className="mx-auto px-10 text-center mb-14">
                <h2 className="text-4xl md:text-6xl font-bold text-white/80">
                    Skills & Technologies
                </h2>
                <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
                    A complete overview of the tools, technologies, and
                    platforms I use to design, develop, deploy, and support
                    professional websites and applications.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2 mx-auto px-5">
                {categories.map((cat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        className="bg-white/10 p-5 rounded-md shadow-lg hover:bg-white/20 transition-all duration-300 border border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-4 text-2xl text-white/70">
                            {cat.icon}
                            <h3 className="text-xl font-semibold">
                                {cat.title}
                            </h3>
                        </div>

                        <ul className="space-y-1 text-gray-200 text-sm">
                            {cat.items.map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="text-white/40">•</span>{" "}
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
export default Technologies;
