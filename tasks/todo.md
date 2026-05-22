# Ivnix org + website on GitHub

## Plan (checklist)

- [ ] Create GitHub organization **ivnix** (web UI — see README in ivnix project) if it does not exist yet
- [x] Scaffold **ivnix** Next.js site under `Cursor/ivnix`
- [x] Add branding, metadata, and `.gitignore` hygiene (no `.next`, `node_modules`)
- [x] Initial git commit and push to GitHub (`IslamLiveApp/ivnix` until org exists)
- [x] Verify `npm run build` passes

## Stripe (IVNIX support /support) — LIVE

- [x] Live catalog on islam.Live plugin account: `price_1TYVnIGriX06OP2Z8Xsg8uJ5` ($5/mo)
- [x] `.env.local` switched to **live** layout; test keys commented out
- [x] `npm run stripe:ensure-monthly` — validates/creates monthly price for your key’s account
- [ ] **You:** paste **live** `STRIPE_SECRET_KEY` in `.env.local` ([IVNIX live keys](https://dashboard.stripe.com/acct_1TYVgXPpCceGl727/apikeys) or [islam.Live](https://dashboard.stripe.com/acct_1KKTv8GriX06OP2Z/apikeys) — must match price account)
- [ ] **You:** run `npm run stripe:ensure-monthly` if price id does not match your live account
- [ ] **You:** [Customer portal (live)](https://dashboard.stripe.com/settings/billing/portal) → Activate
- [ ] **You:** Live webhook → `https://<your-domain>/api/stripe/webhook` → `checkout.session.completed` → `STRIPE_WEBHOOK_SECRET`
- [ ] **You:** same env vars on Vercel/hosting + `NEXT_PUBLIC_SITE_URL=https://your-domain`

## Review

- **Site path:** `G:\. Digital Organization\Cursor\ivnix`
- **GitHub (current):** [github.com/IslamLiveApp/ivnix](https://github.com/IslamLiveApp/ivnix) — public, `master` default branch.
- **Org `ivnix`:** Not created yet; `gh repo create ivnix/...` returns 404. Create the org on GitHub, then transfer the repo and point `origin` at the new URL if desired.
- **Stack:** Next.js 15.5.x, React 19, Tailwind, App Router. `npm run build` succeeded locally.
- **Follow-up:** Replace placeholder copy and `mailto`/GitHub links in `app/page.tsx` after the org and domain are final.
