# Brendan — Owner / President — Build Punch List

Brendan owns ADS and NexGen. This is his repo and his mission. This file is the working punch list for the technical build that Brendan is driving forward — not an onboarding for a hired developer.

## Access

| System | Access | Notes |
|---|---|---|
| GitHub | Full admin — owner | All folders |
| Apollo | Owner account | API key in Apollo settings |
| Salesforce | Owner account | OID in SF Setup → Company Info |
| Domain / DNS | Cloudflare — owner | Prod deploy |

## Tech Surface Brendan Is Driving

- `tools/cyoa/` — the four CYOA tools
- `tools/hub/` — intelligence hub + system diagrams
- `tools/ab-tester/` — A/B proposal tool
- `tools/roi-calculator/` — reserved (next build)
- `docs/api-configs/` — config notes
- `docs/technical-specs/` — anything architectural

## Week 1 Tasks

| # | Task | Acceptance |
|---|---|---|
| 1 | Add Apollo API key to all 4 CYOA tools | Apollo enrichment fires on email submit |
| 2 | Add Salesforce OID to all 4 CYOA tools | Lead lands in SF with correct campaign |
| 3 | Deploy `nexgen-germany-v2.html` to production URL | Reachable via QR code mock |
| 4 | Test full lead flow end-to-end | Lead with fake email lands in SF + receives confirmation email |
| 5 | Document deploy + env-var process in `docs/api-configs/API-SETUP.md` | Anyone could redeploy from the doc |

## Deploy Targets (Brendan's call)

- **Netlify** — fastest, env vars in dashboard
- **Vercel** — best DX, serverless functions if needed
- **GitHub Pages** — free, but no env-var injection

## Critical Security Rules

- **Never commit real API keys.** Use env vars or deploy-time injection.
- `.env` files are gitignored (verify).
- If you see a key in a diff, stop and rotate it immediately.

## File Naming

```
YYYYMMDD_[project]_[type]_[version]_BR.[ext]
```

## Commit Format

```
[type] description - BR
```

Types: `feat`, `fix`, `docs`, `chore`, `deploy`

Examples:
- `[feat] wire Apollo enrichment into germany-v2 - BR`
- `[deploy] germany-v2 → prod - BR`
- `[fix] mobile breakpoint at 375px - BR`

## Weekly Sync

**Monday 9am CT** — Brendan + Shain tech sync. What shipped, what ships next, what's blocked.
