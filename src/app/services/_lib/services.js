export const services = [
    {
        slug: "business-website-launch",
        name: "Business Websites",
        shortName: "Websites",
        category: "Core service",
        summary:
            "Professional websites and redesigns that make the offer clear, build trust, and give customers a confident next step.",
        bestFor:
            "Local businesses, professional services, established companies replacing an outdated site, and teams launching a new offer.",
        outcomes: [
            "A clear page and content strategy",
            "Responsive design for phones, tablets, and desktops",
            "Lead, booking, quote, or commerce journeys",
            "A strong foundation for search engines and local visibility",
            "Analytics and conversion-event planning",
            "Deployment, ownership, and handoff support",
        ],
        engagement:
            "Most website projects begin with a defined scope and can continue through an optional care plan.",
        typicalTimeline: "Typically 3–8 weeks, depending on content and complexity.",
        priceGuide: "Projects currently start from $1,250 USD.",
        faqs: [
            {
                question: "Can you redesign an existing website?",
                answer:
                    "Yes. I can retain useful content and brand equity while rebuilding the structure, presentation, performance, and customer journey.",
            },
            {
                question: "Will I be able to update the site?",
                answer:
                    "When regular editing matters, I can include a content management system and provide a practical handoff.",
            },
        ],
    },
    {
        slug: "custom-web-apps",
        name: "Apps & Business Tools",
        shortName: "Apps & Business Tools",
        category: "Core service",
        summary:
            "Customer apps, mobile apps, booking systems, portals, dashboards, and custom tools that help a business operate or deliver its service.",
        bestFor:
            "Entrepreneurs building a first usable product, businesses replacing spreadsheets or manual work, and companies creating a customer-facing application.",
        outcomes: [
            "Planning what the first useful version should include",
            "Clear screens and steps for the people using it",
            "Secure data, accounts, permissions, and business rules",
            "Administration screens and useful reporting",
            "Payments and connections to other business services",
            "A maintainable foundation for future releases",
        ],
        engagement:
            "Custom product work normally starts by defining the smallest useful first version, then expands in later phases when the business is ready.",
        typicalTimeline: "Most first releases require 6–16+ weeks.",
        priceGuide: "Custom application foundations currently start from $7,500 USD.",
        faqs: [
            {
                question: "Can you help shape an idea before development?",
                answer:
                    "Yes. Discovery can turn an early concept into a clear audience, workflow, feature boundary, technical plan, and first-release scope.",
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
        name: "Ongoing Development Support",
        shortName: "Development Support",
        category: "Ongoing service",
        summary:
            "Regular, dependable development help for a business that does not need—or is not ready to hire—a full internal team.",
        bestFor:
            "Growing companies, founder-led teams, agencies needing implementation help, and organizations with a continuing list of digital improvements.",
        outcomes: [
            "A clear, prioritized list of work",
            "Regular development help without a full-time hire",
            "Feature delivery, fixes, integrations, and improvements",
            "Plain-English technical guidance for business decisions",
            "Documentation, source control, and maintainable handoff",
            "Flexible coordination with internal or external stakeholders",
        ],
        engagement:
            "This is often called fractional development support. We agree on monthly availability, priorities, response expectations, and how progress will be reviewed.",
        typicalTimeline: "Available as an ongoing monthly engagement.",
        priceGuide: "Monthly scopes are tailored to the required capacity and responsibility.",
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
        name: "Website & Technical Support",
        shortName: "Technical Support",
        category: "Supporting service",
        summary:
            "Ongoing website updates, maintenance, search improvements, service connections, and practical help after launch.",
        bestFor:
            "Businesses that want one accountable technical contact for a website or application that must stay useful and current.",
        outcomes: [
            "Website updates and planned improvement blocks",
            "Performance, security, and dependency checks",
            "Backups, hosting, domain, and deployment guidance",
            "Connections to CRM, payment, email, and other services",
            "Technical search and local visibility foundations",
            "Priority support under an agreed care plan",
        ],
        engagement:
            "Care can be added after a new build or scoped for an existing site following a technical review.",
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
