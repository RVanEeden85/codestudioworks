export const services = [
    {
        slug: "business-website-launch",
        name: "Business websites",
        shortName: "Websites",
        category: "Core service",
        summary:
            "Websites that explain what you do and make it easy for customers to enquire, book or buy.",
        bestFor:
            "Local businesses, professional services, established companies replacing an outdated site, and teams launching a new offer.",
        outcomes: [
            "Page planning and content guidance",
            "Responsive design for phones, tablets, and desktops",
            "Enquiry forms, bookings, quotes or online payments",
            "Search-friendly pages and local business information",
            "Visitor statistics and enquiry tracking",
            "Launch support and access to your code and accounts",
        ],
        engagement:
            "We agree on the pages, features, content, revisions and launch date before work begins. Ongoing maintenance is optional.",
        typicalTimeline: "Typically 3–8 weeks, depending on content and complexity.",
        priceGuide: "Projects currently start from $1,250 USD.",
        faqs: [
            {
                question: "Can you redesign an existing website?",
                answer:
                    "Yes. I can keep useful content and your existing branding while improving the design, speed and ease of use.",
            },
            {
                question: "Will I be able to update the site?",
                answer:
                    "Yes, if editing tools are included in the project. I’ll show you how to update your pages and content.",
            },
        ],
    },
    {
        slug: "custom-web-apps",
        name: "Web and mobile apps",
        shortName: "Web and mobile apps",
        category: "Core service",
        summary:
            "Web and mobile apps for customers and staff, including booking systems, portals and tools that reduce manual work.",
        bestFor:
            "Entrepreneurs building a first usable product, businesses replacing spreadsheets or manual work, and companies creating a customer-facing application.",
        outcomes: [
            "Planning what the first useful version should include",
            "Clear screens and steps for the people using it",
            "Secure data, accounts, permissions, and business rules",
            "Administration screens and useful reporting",
            "Payments and connections to other business services",
            "Documented code that can be updated as your product grows",
        ],
        engagement:
            "We plan the first version around the most useful features. Further features can be added in separately agreed stages.",
        typicalTimeline: "Most first releases require 6–16+ weeks.",
        priceGuide: "App projects start from $7,500 USD.",
        faqs: [
            {
                question: "Can you help shape an idea before development?",
                answer:
                    "Yes. We’ll work out who will use the app, what they need to do and which features to build first.",
            },
            {
                question: "Do you build mobile apps?",
                answer:
                    "Yes. Mobile work can include React Native applications as well as mobile-first web experiences, depending on the product and distribution needs.",
            },
        ],
    },
    {
        slug: "fractional-development-partner",
        name: "Ongoing development",
        shortName: "Development Support",
        category: "Ongoing service",
        summary:
            "New features, fixes and integrations for your existing website or app, with regular time set aside for your business.",
        bestFor:
            "Growing companies, founder-led teams, agencies needing implementation help, and organizations with a continuing list of digital improvements.",
        outcomes: [
            "An agreed list of tasks in priority order",
            "Regular development help without a full-time hire",
            "Feature delivery, fixes, integrations, and improvements",
            "Plain-English technical guidance for business decisions",
            "Documented code, version history and a clear handover",
            "Flexible coordination with your team and other suppliers",
        ],
        engagement:
            "We agree on development time each month, priorities, response times and regular progress reviews. Extra work is discussed before it is added.",
        typicalTimeline: "Available as an ongoing monthly engagement.",
        priceGuide: "Monthly plans are quoted according to the time and support you need.",
        faqs: [
            {
                question: "Is this the same as hiring an employee?",
                answer:
                    "No. It is an independent service engagement with an agreed scope or capacity, while giving your team consistent access to the same developer.",
            },
            {
                question: "Can you work with our existing tools or vendors?",
                answer:
                    "Yes. The working model can include an existing codebase, agency, designer, hosting provider, or internal project owner after an initial technical review.",
            },
        ],
    },
    {
        slug: "care-maintenance",
        name: "Website maintenance",
        shortName: "Technical Support",
        category: "Supporting service",
        summary:
            "Keep your website up to date with routine updates, fixes, backups and technical checks.",
        bestFor:
            "Businesses that need reliable help keeping an existing website working and up to date.",
        outcomes: [
            "Routine updates and small fixes",
            "Performance, security, and dependency checks",
            "Backups, hosting, domain, and deployment guidance",
            "Connections to CRM, payment, email, and other services",
            "Checks for search and local business information",
            "Support during the hours agreed in your plan",
        ],
        engagement:
            "After reviewing your website, we agree on the checks, updates, support hours and backup responsibilities included in your plan. Larger changes are quoted separately.",
        typicalTimeline: "Available monthly or as a defined improvement project.",
        priceGuide: "Care plans currently start from $150 USD per month.",
        faqs: [
            {
                question: "Can you take over a website you did not build?",
                answer:
                    "Usually. I first review the technology, hosting, access, risks, and current condition before recommending a support arrangement.",
            },
            {
                question: "Does this include digital marketing?",
                answer:
                    "It can include technical SEO, analytics, landing pages, and implementation support. Ongoing advertising and social-media management are scoped separately when appropriate.",
            },
        ],
    },
];

export function getServiceBySlug(slug) {
    return services.find((service) => service.slug === slug) || null;
}
