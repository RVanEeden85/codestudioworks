# CodeStudioWorks transactional email and form security

The website code is complete. Do not paste or embed API code into a page. Provider credentials belong only in the deployment environment and must never be committed to Git or exposed through `NEXT_PUBLIC_` variables, except for the public Turnstile site key.

## Production setup

### 1. Postmark

1. Keep Postmark as the single transactional email provider for this site.
2. In Postmark, verify `codestudioworks.com` as a sending domain.
3. Complete DKIM and the custom return-path DNS records shown by Postmark.
4. Confirm the visible sender, such as `CodeStudioWorks <support@codestudioworks.com>`.
5. Create a server token dedicated to this website. Rotate any token that has previously appeared in logs, screenshots, or shared output.
6. Add these production environment variables:
   - `POSTMARK_API_KEY`
   - `POSTMARK_FROM_EMAIL`
   - `POSTMARK_TO_EMAIL`
   - `POSTMARK_REPLY_TO_EMAIL`
   - `POSTMARK_MESSAGE_STREAM=outbound`

The site sends two separate messages for each request: a complete internal alert and a privacy-conscious receipt to the requester. Each has responsive HTML and a complete plain-text alternative.

### 2. Cloudflare Turnstile

1. In Cloudflare Turnstile, create a Managed widget.
2. Add `codestudioworks.com` and `www.codestudioworks.com` as allowed hostnames. Add an exact preview hostname only when you intentionally test a deployment preview.
3. Copy the site key to `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
4. Copy the secret key to `TURNSTILE_SECRET_KEY`. Never use a `NEXT_PUBLIC_` name for the secret.
5. Set `TURNSTILE_ALLOWED_HOSTNAMES=codestudioworks.com,www.codestudioworks.com`.

Official always-pass testing credentials are used automatically in local development only when real Turnstile variables are absent. Production fails closed if the real secret or site key is missing.

### 3. Durable protection and storage

Set a long random `FORM_SECURITY_SECRET`. This hashes request identifiers used by the database-backed rate limiter. Keep the existing MongoDB and admin variables configured:

- `MONGODB_URI`
- `MONGODB_DB`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Requests are written to MongoDB before email delivery is attempted. The admin inbox shows `sent`, `partial`, `failed`, or `not_configured` delivery states and provides a retry control for incomplete delivery.

### 4. Email authentication and monitoring

1. Add a DMARC record in monitoring mode (`p=none`) after SPF and DKIM are aligned.
2. Review DMARC reports, then move deliberately to `quarantine` and eventually `reject` when all legitimate senders are confirmed.
3. Test the four message types in Gmail, Outlook, Apple Mail, and on a phone:
   - project enquiry
   - project planner
   - consultation request
   - support request
4. Confirm both HTML and plain-text content, reply routing, dark-mode readability, links, and request references.
5. Monitor Postmark bounces, spam complaints, and suppression events.

## What the implementation protects

- Cloudflare Turnstile with mandatory server-side verification
- hidden honeypot fields
- same-origin checks
- database-backed rate limits using hashed request identifiers
- client submission IDs and database uniqueness to prevent duplicate sends
- strict server-side field validation and length limits
- storage-first processing so requests are not lost when email delivery fails
- separate internal and requester delivery tracking with manual retry

## Safe release check

After adding production variables, submit one real request of each type. Confirm it appears in `/admin`, confirm both messages arrive, and confirm the delivery badge reports `sent`. Do not use real customer information for release testing.
