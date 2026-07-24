# North Shore Caroline Springs Booking Funnel

The Term 3 lead-generation site for North Shore Coaching College Caroline
Springs. It includes:

- a general Prep to Year 10 tutoring landing page
- a dedicated selective-school preparation page
- a mobile-first enquiry form with campaign attribution
- Cloudflare D1 lead storage
- a token-protected lead dashboard and CSV export
- Google Analytics and Meta Pixel hooks
- local SEO metadata, schema, sitemap, and social sharing artwork

## Local Development

Requires Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`.

## Verification

```bash
npm run lint
npm run build
```

## Runtime Configuration

The production Worker needs:

- a Cloudflare D1 binding named `DB`
- a secret named `ADMIN_TOKEN`
- optional `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- optional `NEXT_PUBLIC_META_PIXEL_ID`

The private lead dashboard is available at `/admin/leads/<ADMIN_TOKEN>`.
Never commit the token or analytics credentials.

## Main Paths

- `/` - tutoring and assessment funnel
- `/selective-school-preparation-caroline-springs` - selective preparation
- `/api/leads` - lead capture endpoint
- `/admin/leads/<ADMIN_TOKEN>` - private lead dashboard
