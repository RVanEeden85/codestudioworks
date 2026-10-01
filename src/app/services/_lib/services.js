export const services = [
    {
        slug: "business-website-launch",
        name: "Business websites",
        shortName: "Websites",
        category: "Core service",
        summary:
            "Website strategy, design and custom coded development that explains what you do and makes it easy for customers to enquire, book or buy.",
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
        workflow: ["Clarify the audience, offer and required customer actions", "Plan the page structure, content and technical approach", "Design, build and test the responsive experience", "Launch with handover, analytics and agreed follow-up support"],
        caseStudies: ["rolleston-tinting"],
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
        slug: "custom-software-development",
        name: "Custom software development",
        shortName: "Custom software",
        category: "Core service",
        summary: "Business software designed around your internal workflows, data and permissions when an off-the-shelf tool no longer fits.",
        bestFor: "Businesses with manual processes, connected systems or specialist workflows that need a purpose-built internal tool.",
        outcomes: ["Workflow and requirements mapping", "Secure accounts, roles and data rules", "Dashboards, administration and reporting", "Integrations with agreed business services", "Incremental delivery around the most useful first release", "Documented code, deployment and handover"],
        workflow: ["Map the current process and constraints", "Define the smallest useful release and data model", "Build and review the agreed workflows in stages", "Test permissions, integrations and handover requirements"],
        engagement: "We define the workflow, first release, integrations and responsibilities before development. Later capabilities can be added as separately agreed stages.",
        typicalTimeline: "Timeline depends on the workflows, integrations and release scope.",
        priceGuide: "Custom software is quoted after the workflow and first release are understood.",
        caseStudies: ["eventbookr", "state-champs-network"],
        faqs: [{ question: "Can this replace a spreadsheet or manual process?", answer: "Often. I first map the current process and risks, then recommend whether custom software, an existing tool, or a combination is the sensible route." }, { question: "Can you connect existing services?", answer: "Yes, when the service provides a suitable integration and the required access is available. The proposal identifies those connections and their assumptions." }],
    },
    {
        slug: "seo-local-presence",
        name: "Local SEO and search foundations",
        shortName: "Local SEO",
        category: "Visibility service",
        summary: "Practical technical SEO and local search foundations that help your business present accurate, useful information to customers and search engines.",
        bestFor: "Local businesses that need clearer service pages, crawlable structure and consistent business information.",
        outcomes: ["Search and customer journey review", "Page titles, descriptions and internal linking", "Structured data and crawlability checks", "Local business information and service area review", "Search Console and measurement setup guidance", "A prioritized implementation plan without ranking promises"],
        workflow: ["Review the site, audience and existing search foundations", "Prioritize technical and page-level changes", "Implement agreed improvements and validate them", "Document the next actions and measurement plan"],
        engagement: "Search work focuses on useful pages, technical foundations and clear measurement. Visibility depends on competition, reputation, content and time; rankings are never guaranteed.",
        typicalTimeline: "Scope and timing depend on the current website and number of pages.",
        priceGuide: "Local SEO work is quoted after a review of the site and priorities.",
        caseStudies: ["rolleston-tinting"],
        faqs: [{ question: "Do you guarantee rankings?", answer: "No. I can improve technical foundations and page usefulness, then help measure what changes. Search visibility depends on factors outside any one implementation." }, { question: "Can this be added to a website project?", answer: "Yes. Search-friendly structure and local business information can be included when they support the agreed website scope." }],
    },
    {
        slug: "digital-marketing",
        name: "Digital marketing foundations",
        shortName: "Digital marketing",
        category: "Visibility service",
        summary: "Planning, landing pages and measurement support for focused digital campaigns, with advertising spend and ongoing channel work agreed separately.",
        bestFor: "Businesses with a clear offer that need a focused campaign plan, a useful destination page or better enquiry measurement.",
        outcomes: ["Offer, audience and campaign planning", "Landing page structure and implementation", "Conversion and enquiry tracking plan", "Campaign link and attribution setup", "Review of the customer path from message to enquiry", "Practical next steps for agreed channels"],
        workflow: ["Clarify the offer, audience and campaign objective", "Plan the landing page, message and measurement", "Build or improve the agreed page and tracking", "Review evidence and decide the next experiment"],
        engagement: "Work can cover planning, landing pages and implementation support. Advertising budgets, media buying, social posting and ongoing campaign management are separate decisions agreed in writing.",
        typicalTimeline: "Timing depends on the campaign plan, page scope and measurement needs.",
        priceGuide: "Digital marketing support is quoted around the agreed planning, implementation and review scope.",
        caseStudies: ["rolleston-tinting", "eventbookr"],
        faqs: [{ question: "Do you include ad spend?", answer: "No. Any advertising budget is a separate third-party cost that you approve directly, alongside the agreed implementation work." }, { question: "Do you promise leads or sales?", answer: "No. I can improve the campaign path and measurement, but response depends on the offer, audience, competition and budget." }],
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
