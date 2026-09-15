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
        media: {
            src: "/images/work/rolleston-tinting-home.jpg",
            mobileSrc: "/images/work/rolleston-tinting-mobile.jpg",
            alt: "Rolleston Tinting homepage showing the company vehicles, navigation, service message, and quote call to action",
            mobileAlt: "Rolleston Tinting mobile homepage showing its compact navigation, service message, and quote call to action",
            domain: "rollestontinting.co.nz",
            position: "center 42%",
            detailPosition: "78% 35%",
            tone: "ember",
            evidence: {
                src: "/images/work/rolleston-tinting-detail.jpg",
                alt: "Rolleston Tinting website section introducing its Canterbury window tinting and vehicle wrapping expertise",
                title: "A service story built around trust",
                description: "The public experience moves from clear service choices into experience, workmanship, and direct paths to a quote.",
                focus: "Service clarity and local credibility",
                position: "center center",
                focusPosition: "18% center",
            },
        },
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
        media: {
            src: "/images/work/state-champs-home.jpg",
            mobileSrc: "/images/work/state-champs-mobile.jpg",
            alt: "State Champs Sports Network homepage showing its live high school sports broadcast experience",
            mobileAlt: "State Champs Sports Network mobile homepage showing its live high school sports content experience",
            domain: "statechampsnetwork.com",
            position: "center center",
            detailPosition: "82% 42%",
            tone: "signal",
            evidence: {
                src: "/images/work/state-champs-detail.jpg",
                alt: "State Champs Sports Network news interface with content filters and a featured Michigan high school football article",
                title: "A connected sports publishing system",
                description: "Live broadcasts, editorial content, events, awards, athletes, and sponsor experiences share one coherent public platform.",
                focus: "Editorial discovery and live content",
                position: "center 58%",
                focusPosition: "76% 68%",
            },
        },
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
        media: {
            src: "/images/work/eventbookr-home.jpg",
            mobileSrc: "/images/work/eventbookr-mobile.jpg",
            alt: "EventBookr South Africa homepage showing its event business marketplace, navigation, and discovery experience",
            mobileAlt: "EventBookr mobile homepage showing its event marketplace and mobile navigation experience",
            domain: "eventbookr.com",
            position: "center 38%",
            detailPosition: "72% 42%",
            tone: "aqua",
            evidence: {
                src: "/images/work/eventbookr-detail.jpg",
                alt: "EventBookr marketplace interface showing premium event venues and service-provider listing cards",
                title: "Marketplace discovery made visual",
                description: "Customers can browse real venues and providers while businesses gain structured, high-visibility listing and enquiry paths.",
                focus: "Listings, search, and provider discovery",
                position: "center 60%",
                focusPosition: "68% 72%",
            },
        },
    },
];

export function getProjectBySlug(slug) {
    return projects.find((project) => project.slug === slug) || null;
}
