export const projects = [
    {
        slug: "rolleston-tinting",
        name: "Rolleston Tinting",
        context: "Client website",
        headline:
            "A service-led website built to turn local interest into confident quote requests.",
        summary:
            "A modern website for a specialist automotive and architectural tinting business, with clear service journeys, trust-building content, completed-work galleries, and focused quote paths.",
        role:
            "Website strategy, interface design, full-stack development, content systems, local-search foundations, and ongoing technical improvements.",
        outcomes: [
            "Separate customer journeys for automotive, residential, and commercial services",
            "Structured quote and contact paths designed around real buying intent",
            "Editable content and media foundations for ongoing business updates",
            "Responsive presentation across desktop and mobile",
        ],
        capabilities: ["Next.js", "CMS", "Media delivery", "Local SEO", "Lead capture"],
        href: "https://www.rollestontinting.co.nz",
        hrefLabel: "Visit Rolleston Tinting",
    },
    {
        slug: "state-champs-network",
        name: "State Champs! Sports Network",
        context: "Professional software work",
        headline:
            "Full-stack work across a live sports platform serving fans, athletes, schools, and sponsors.",
        summary:
            "Ryno contributes as a full-stack developer to a connected web and mobile experience spanning editorial content, live events, athlete discovery, awards, voting, fan submissions, and sponsor experiences.",
        role:
            "Full-stack application development, platform features, administration workflows, integrations, release support, and cross-device product delivery.",
        outcomes: [
            "Connected content, video, awards, voting, and athlete experiences",
            "Public, administrative, API, and mobile workflows working as one platform",
            "Sponsor and partner presentation built into the product experience",
            "Ongoing feature delivery for an active media network",
        ],
        capabilities: ["Next.js", "React Native", "Node.js", "APIs", "MongoDB"],
        href: "https://www.statechampsnetwork.com",
        hrefLabel: "Visit State Champs",
    },
    {
        slug: "eventbookr",
        name: "EventBookr",
        context: "Independent product",
        headline:
            "A two-market event marketplace connecting customers with venues and service providers.",
        summary:
            "Product engineering across a marketplace and planning ecosystem with provider listings, customer discovery, enquiries, accounts, regional experiences, and event-planning tools.",
        role:
            "Product architecture, full-stack development, marketplace workflows, account experiences, payments and regional platform foundations.",
        outcomes: [
            "Marketplace discovery for venues, entertainers, and event services",
            "Provider listing and enquiry workflows",
            "Regional product foundations for South African and US audiences",
            "Connected planning tools and customer account experiences",
        ],
        capabilities: ["Marketplace", "Next.js", "Node.js", "Payments", "Product design"],
        href: "https://www.eventbookr.com",
        hrefLabel: "Visit EventBookr",
    },
];

export function getProjectBySlug(slug) {
    return projects.find((project) => project.slug === slug) || null;
}
