
# NextPrompt.tech — Next.js MVP

Modern MVP for gated prompt packs with Next.js 14 + Tailwind, ready for Supabase Auth + Stripe.

## Quickstart
```bash
pnpm i   # or npm i / yarn
cp .env.local.example .env.local  # fill in values
pnpm dev
```

Open http://localhost:3000

## Files
- `app/` — App Router pages
- `public/packs.json` — Library content (edit here)
- `app/api/checkout` — Creates Stripe Checkout session (needs STRIPE_SECRET_KEY + NEXT_PUBLIC_PRICE_ID)
- `app/api/stripe/webhook` — Stripe webhooks (set endpoint in dashboard)

## Environment
Set in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_PRICE_ID=
```

## Supabase (when you add auth)
- Create project at supabase.com → copy URL + anon key.
- Create `profiles` table for users (optional).
- In webhooks, on `checkout.session.completed`, set user role to 'pro'.

## Deploy
Push to GitHub, import to Vercel. Add env vars in Vercel → Project → Settings → Environment Variables.
