# CodeStudioWorks SEO, AEO, and GEO handoff

Last updated: October 1, 2026

## Positioning implemented

CodeStudioWorks is presented consistently as a Westland-based, founder-led development studio serving Westland, Detroit, Metro Detroit, and Michigan, with worldwide project delivery through online meetings and digital collaboration.

The website does not claim a public storefront, guaranteed rankings, unverified awards, reviews, or business results.

## Search-intent map

| Page | Primary intent | Supporting intent |
| --- | --- | --- |
| `/` | Westland website design and development | Metro Detroit websites, software, SEO and marketing |
| `/detroit-web-development` | Detroit web development | Metro Detroit developer, Michigan web developer, worldwide remote delivery |
| `/start-a-business` | Website and online launch help for a new business | Bookings, payments, email, domains, hosting |
| `/services` | Web, app, and software development services | Technical support and ongoing development |
| `/services/business-website-launch` | Small-business website design and development | Website redesign, lead generation, local-search foundations |
| `/westland-web-design` | Westland web design and development | Actual local base, meetings and website scope |
| `/services/custom-software-development` | Custom software development | Internal workflows, integrations and reporting |
| `/services/seo-local-presence` | Westland and Metro Detroit local SEO | Technical SEO, service pages and measurement |
| `/services/digital-marketing` | Digital marketing foundations | Campaign planning, landing pages and attribution |
| `/services/custom-web-apps` | Custom web and mobile app development | Portals, dashboards, booking systems, business tools |
| `/services/fractional-development-partner` | Fractional and freelance development support | Development capacity without an internal team |
| `/services/care-maintenance` | Website maintenance and technical SEO support | Takeovers, updates, integrations, performance |
| `/work` | Web development portfolio and software case studies | Client delivery and product engineering proof |
| `/pricing` | Web-development pricing and engagements | Website, app, care, and ongoing-support starting prices |
| `/about` | Ryno van Eeden, Westland full-stack developer | Experience, accountability, founder credibility |
| `/contact` | Request a website, software or SEO quote | Project enquiry and worldwide online delivery |

## Technical work included

- Unique titles, descriptions, canonical URLs, Open Graph data, and Twitter cards for core and dynamic pages
- Organization, ProfessionalService, Person, WebSite, WebPage, Service, FAQPage, BreadcrumbList, ItemList, OfferCatalog, ProfilePage, ContactPage, and CreativeWork structured data where supported by visible content
- Updated XML sitemap and robots configuration
- Search-verification environment hooks for Google and Bing
- A substantial Detroit service-area page instead of thin duplicated city pages
- Clear internal links to the Detroit page
- A factual `llms.txt` summary as a supplemental machine-readable reference
- Consistent Westland base, Metro Detroit service area, Michigan and worldwide delivery
- Local meetings by arrangement after 5pm or on weekends

## Deployment and search-console checklist

1. Website source commit `06d33d4` is published at `https://www.codestudioworks.com`; repeat production checks after future changes.
2. Google Search Console is already configured. Use URL Inspection to check important new destinations and the selected canonical for the contact page.
3. Add the Google verification value as `GOOGLE_SITE_VERIFICATION` in the production environment if HTML verification is used.
4. Create or verify the site in Bing Webmaster Tools.
5. Add the Bing verification value as `BING_SITE_VERIFICATION` in the production environment if HTML verification is used.
6. Submit `https://www.codestudioworks.com/sitemap.xml` to both platforms.
7. Inspect the website, Westland, Detroit, custom software, SEO and digital marketing destinations; request indexing where appropriate.
8. Validate representative pages with Google's Rich Results Test and Schema.org Validator.
9. Confirm that contact-form submissions and important call-to-action clicks are measured in the chosen analytics platform.
10. Review impressions, clicks, queries, landing pages, and qualified enquiries monthly. Compare Detroit-area discovery with worldwide service discovery instead of judging success by a single keyword.

## Google Business Profile caveat

Create or optimize a Google Business Profile only if the business meets Google's current eligibility rules, including making in-person contact with customers during stated hours. Do not publish a false storefront address. If eligible as a service-area business, configure the real service area and hide a residential address where appropriate.

## Next authority-building work

- Add client-approved testimonials with names and genuine context.
- Expand case studies with truthful before-and-after evidence, screenshots, responsibilities, constraints, and measurable outcomes when available.
- Publish useful first-hand guidance based on real project experience, such as website planning for a new Detroit-area business, when there is enough original expertise to make the page genuinely useful.
- Earn relevant local and industry citations through real partnerships, associations, client relationships, and editorial mentions. Do not buy bulk links.

## Expectations

This implementation gives search engines and answer systems a stronger technical and editorial foundation. It cannot guarantee a specific ranking, featured answer, AI citation, traffic level, or enquiry volume. Those outcomes depend on competition, reputation, content quality, links and mentions, user response, indexation, and time.

## Published implementation and validation

The website source changes were pushed to `origin/main` as `06d33d44f1557693db22506d6465b84d85891d08`. The matching Vercel Production deployment was Ready, and checks against the production domain passed for all 26 sitemap pages: HTTP 200, one H1, canonical URL and parseable JSON-LD. Updated `llms.txt` and private admin cache behavior were checked separately.

Public content uses SSG because it is stored in code. Contact uses a static shell with client-side service preselection. Admin and APIs remain dynamic/private with no-store responses. Social images are generated statically. ISR becomes useful if content later updates independently of deployments; it is not necessary for the present code-backed pages.

The homepage presents the offer and quote action immediately, makes the 3D tour optional and removes introductory/route curtains. Dedicated software, SEO, digital marketing and Westland pages are linked from relevant public destinations. Website design, development and custom coded websites share one substantive website destination to avoid redundant search intent.

Lint, 11 automated tests and the Next.js 16.3.8 production build passed before publication. Invalid-request rejection and private cache checks passed locally; compatible dependency fixes reported zero npm vulnerabilities at the time of verification.

## Measurement and acceptance boundary

GA4 is configured through `NEXT_PUBLIC_GA_MEASUREMENT_ID`, with explicit visitor consent. Production checks verified no Google script before choice, the correct tag after allowance and no script after withdrawal plus reload. The matching property received a production service-page visit in Realtime.

Enhanced measurement was verified off because the application emits explicit page views, contact clicks and confirmed enquiry events. `generate_lead` is marked as a key event, counted once per event with no default monetary value. Contact-link clicks are intent signals; they are not confirmed enquiries. Admin pages and form contents are excluded from application measurement.

Still outstanding:

- Fresh production Turnstile → stored enquiry → owner notification/requester receipt acceptance, including the corresponding analytics event when consent is granted.
- Important URL Inspection results and non-indexed exclusion reasons in Search Console.
- A successful Lighthouse run and field Core Web Vitals review; public PageSpeed requests returned quota errors.
- Complete keyboard/screen-reader acceptance, independently verified local profile ownership/eligibility and a location-specific rank baseline.

The supplied Search Console exports support prioritizing qualified discovery, but the early sample does not establish a conversion-rate problem. Private export rows, analytics/account screenshots and the detailed audit remain in the local `outputs/growth-audit/` folder, which is excluded from this public repository.

See [the practical lead-generation plan](LEAD-GENERATION-PLAN.md) for owner-ready messaging and next actions.

References: [Google AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [local ranking guidance](https://support.google.com/business/answer/7091), [Next.js ISR](https://nextjs.org/docs/app/guides/incremental-static-regeneration).
