export const projects = [
    {
        slug: "rolleston-tinting",
        name: "Rolleston Tinting",
        context: "Client website",
        headline:
            "A website that helps customers explore tinting services and request a quote.",
        summary:
            "Rolleston Tinting needed a clear way to present its vehicle, home and commercial services online. The website brings service information, completed-work galleries and quote requests together.",
        role:
            "I planned and built the website, designed the pages and added content editing tools. My work also covers search setup and ongoing technical improvements.",
        outcomes: [
            "Separate pages for vehicle, home and commercial tinting",
            "Clear contact forms and ways to request a quote",
            "Tools for updating website content and images",
            "Layouts for phones, tablets and desktop screens",
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
                title: "Show the services and the people behind them",
                description: "Customers can explore the services, learn about the team and view examples of completed work before requesting a quote.",
                focus: "Service information and team introduction",
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
            "Web and mobile development for a high school sports network.",
        summary:
            "I contribute full-stack development to State Champs! Sports Network. The platform brings sports news, video, events, athlete profiles and awards to fans across web and mobile.",
        role:
            "I contribute features across the website, mobile app, API and administration tools, and help test and release updates.",
        outcomes: [
            "Connected content, video, awards, voting, and athlete experiences",
            "Connected website, mobile app, API and staff tools",
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
                title: "Sports news and video in one place",
                description: "The site brings broadcasts, news, events and athlete content together, with tools for staff to manage the platform.",
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
            "An event marketplace for finding venues and service providers.",
        summary:
            "EventBookr is my independent product. I develop its venue and service listings, customer accounts, enquiries and event-planning tools, with regional support for South Africa and the US.",
        role:
            "I design the product and build its website, backend, accounts, listings and payment integrations.",
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
                title: "Find venues and event services",
                description: "Customers can browse listings and contact providers. Businesses can present their services and receive enquiries.",
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
