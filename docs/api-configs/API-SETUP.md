# API Setup — Apollo & Salesforce

This guide is for Brenden and any future developer. Follow exactly.

## Security Rule

> **NEVER commit real API keys to GitHub.**
>
> All keys live in deploy-time env vars (Netlify / Vercel dashboard) or a local `.env` file that is gitignored.
> If a real key ends up in a commit — even if reverted — **rotate it immediately**.

## Apollo

| Item | Where |
|---|---|
| API key location | `app.apollo.io` → Settings → Integrations → API Keys |
| Env var name | `APOLLO_API_KEY` |
| Used by | All 4 CYOA tools (enrichment on email submit) |

### Steps

1. Log in at app.apollo.io.
2. Settings → Integrations → API Keys → "Create new key" (label it `nexgen-bd-prod`).
3. Copy the key into the deploy platform's env vars (Netlify/Vercel → Site Settings → Environment Variables).
4. In each tool, replace `YOUR_APOLLO_API_KEY` with `process.env.APOLLO_API_KEY` or the equivalent runtime injection.
5. Redeploy.
6. Test with a fake email — confirm enrichment data returns in network tab.

## Salesforce

| Item | Where |
|---|---|
| Organization ID | SF Setup → Company Information → Organization ID (15 or 18 char) |
| Env var name | `SALESFORCE_OID` |
| Used by | All 4 CYOA tools (lead routing + campaign attribution) |
| Campaign | "EPLAN World 2026" (Germany show) |

### Steps

1. SF → Setup → Quick Find: "Company Information" → copy Organization ID.
2. Setup → Campaigns → confirm "EPLAN World 2026" exists with campaign ID.
3. Add `SALESFORCE_OID` to deploy platform env vars.
4. In each tool, replace `YOUR_SALESFORCE_ORG_ID` with the runtime env var.
5. Test: submit fake lead → verify it lands in SF with correct campaign attribution.

## Tool Checklist (all 4 CYOA tools)

For each of `nexgen-germany-v2.html`, `nexgen-client-proposal.html`, `nexgen-boss-deck.html`, `nexgen-germany-show.html`:

- [ ] Apollo key wired via env var (no literal in source)
- [ ] SF OID wired via env var (no literal in source)
- [ ] Test lead lands in SF with correct campaign
- [ ] Confirmation email sends from approved domain
- [ ] Lead enrichment data shows in confirmation flow
- [ ] Mobile (375px) and tablet (768px) layouts verified
- [ ] Analytics event fires (visible in `tools/hub/`)

## Rotation Schedule

- Apollo key: rotate every 90 days
- SF OID: doesn't rotate (it's an identifier, not a secret), but limit which IPs/origins can post
- Document each rotation in `monthly-reports/` for the month it happened
