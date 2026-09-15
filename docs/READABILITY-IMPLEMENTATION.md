# CodeStudioWorks readability update

## Implemented

- Short, descriptive headings and plain-language service descriptions across the main public pages.
- Spacious page heroes restored at the owner’s request, with the revised headings and descriptions retained.
- Direct introduction to Ryno and selected work immediately after the opening section and studio facts.
- Restored entry and route transitions, scroll reveals, image parallax, pointer effects, count-up animation and the horizontal desktop portfolio. Reduced-motion support remains.
- Brighter text, consistent heading sizes and spacing, a keyboard skip link, and captions below case-study images.
- Shared service names and form options, including compatibility with older service enquiry links.
- Illustrative pricing scopes with revisions, content, subscriptions and maintenance boundaries agreed in writing.
- Official email: info@codestudioworks.com. Visible contact, footer and form-fallback links.
- Smaller WebP decorative images: approximately 9.25 MB to 0.38 MB combined. Original files remain available.
- Turnstile CSP allowances, visible loading/error text and a safe email fallback. Verification remains mandatory in production.
- Optional consultation scheduling fields, with matching server validation.
- Session campaign attribution saved only with enquiries, sanitised on the server. No third-party advertising pixel added.
- Admin lead stages, revenue received in USD and an all-time source summary. Failed database connections show a clear error state.
- Privacy copy explains campaign attribution.

## Restored design verification

- Production build and lint pass after restoring the design.
- Six main pages checked at 390px with no horizontal overflow and the revised headings retained.
- Desktop homepage and mobile pricing hero visually reviewed.

## Earlier verification

- Production build and lint pass.
- Four focused tests cover campaign sanitisation and navigation, production Turnstile validation, and required CSP allowances.
- Browser checked ten public pages at 390px: no horizontal overflow, one main heading and one content target per page.
- Earlier compact-layout measurements are superseded by the restored spacious heroes.
- Case-study role text renders light grey; screenshot captions are outside the image; no broken images in the checked case study.
- Legacy app-service links preselect the correct new form option.
- Admin update route rejects unauthenticated and cross-origin requests with 403; invalid stages and negative revenue with 400.
- No enquiry emails sent or customer records changed during testing.

## Production setup still required

1. Configure a real Cloudflare Turnstile widget for `codestudioworks.com` and `www.codestudioworks.com`.
2. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in the production host. The public site key must be present at build time, so rebuild after adding it. Do not use test keys in production.
3. Verify `MONGODB_URI`. The hostname currently configured locally returns an SRV DNS lookup failure. Check whether the cluster hostname is current, then check credentials and network access. The production database connection was not independently verified.
4. Run `npm run check:production` to check the local environment for required settings. This checks presence, not provider validity.
5. After deployment, send an authorised test enquiry and support request. Confirm storage, owner notification, customer receipt, reply-to address and request reference. Test both successful and expired Turnstile states.
6. Test campaign links, e.g. `/services?utm_source=google&utm_medium=cpc&utm_campaign=business-websites`. Submit a test enquiry and check the source in Admin. Mark its lifecycle and received revenue when appropriate.

No client testimonials, measured business results, LinkedIn URL, or response-time promises have been invented. Add client-approved testimonials and evidence when available.

The changes are prepared for the main branch. Production deployment and enquiry delivery require separate verification.
