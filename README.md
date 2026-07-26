# North Shore Caroline Springs Booking Funnel

The Term 3 lead-generation site for North Shore Coaching College Caroline
Springs. It includes:

- a general Prep to Year 10 tutoring landing page
- a dedicated selective-school preparation page
- a dedicated scholarship-preparation page
- a mobile-first enquiry form with campaign attribution
- Cloudflare D1 lead storage
- a token-protected lead dashboard and CSV export
- Google Analytics, Google Ads conversion, website-call, and Meta Pixel hooks
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

The production Worker automatically provisions its D1 database from
`wrangler.jsonc`. It also needs:

- a secret named `ADMIN_TOKEN`
- optional `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- optional `NEXT_PUBLIC_GOOGLE_ADS_ID`
- optional `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`
- optional `NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL`
- optional `NEXT_PUBLIC_META_PIXEL_ID`

The private lead dashboard is available at `/admin/leads/<ADMIN_TOKEN>`.
Never commit the token or analytics credentials.

## Deployment

```bash
npm exec wrangler login
npm run deploy
npm exec wrangler secret put ADMIN_TOKEN
```

Run the secret command after the first deployment, then redeploy once so the
private dashboard is ready alongside the public site.

## Main Paths

- `/` - tutoring and assessment funnel
- `/tutoring-caroline-springs` - Google Search tutoring landing page
- `/selective-school-preparation-caroline-springs` - selective preparation
- `/scholarship-preparation-caroline-springs` - scholarship preparation
- `/thank-you` - post-enquiry confirmation page
- `/api/leads` - lead capture endpoint
- `/admin/leads/<ADMIN_TOKEN>` - private lead dashboard
