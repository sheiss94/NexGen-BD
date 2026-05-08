# Tools — Inventory & Configuration

Seven HTML tools power the NexGen lead-capture, qualification, and proposal flow. All seven are built. Drop the files into the matching subfolder once cleared from local.

## Inventory

| # | Tool | File | Folder | Purpose | Status |
|---|---|---|---|---|---|
| 1 | Germany Show v2 | `nexgen-germany-v2.html` | `tools/cyoa/` | Primary EPLAN World 2026 lead-capture CYOA | Complete |
| 2 | Client Proposal | `nexgen-client-proposal.html` | `tools/cyoa/` | Client-facing CYOA with Apollo enrichment | Complete |
| 3 | Boss Deck | `nexgen-boss-deck.html` | `tools/cyoa/` | Internal meta-CYOA for executive presentation | Complete |
| 4 | Germany Show v1 | `nexgen-germany-show.html` | `tools/cyoa/` | Original v1 (kept for reference) | Complete |
| 5 | Intelligence Hub | `nexgen-intelligence-hub.html` | `tools/hub/` | Analytics + knowledge capture dashboard | Complete |
| 6 | A/B Tester | `nexgen-ab-tester.html` | `tools/ab-tester/` | Side-by-side proposal comparison | Complete |
| 7 | System Diagrams | `nexgen-system-diagrams.html` | `tools/hub/` | Decision tree + knowledge flywheel viz | Complete |

> ROI calculator (`tools/roi-calculator/`) is reserved for the next build — not yet started.

## Configuration

Before deploying, replace these placeholders in every tool that uses them:

| Placeholder | Replace with | Source |
|---|---|---|
| `YOUR_SALESFORCE_ORG_ID` | 18-char SF Organization ID | SF Setup → Company Information |
| `YOUR_APOLLO_API_KEY` | Apollo API key | app.apollo.io → Settings → API Keys |

> **Security:** never commit real API keys. See `docs/api-configs/API-SETUP.md`. Use environment variables or a deploy-time secret-injection step.

## Deploy Options

| Option | Best for | Notes |
|---|---|---|
| **Netlify Drop** | Fastest demo | Drag folder to app.netlify.com/drop. Custom domain optional. |
| **GitHub Pages** | Free, version-controlled | Settings → Pages → Source: branch root. Subdirectory deploy supported. |
| **Vercel** | Best DX, serverless functions | `vercel deploy` from each tool folder. Env vars in dashboard. |

## Standard Pre-Deploy Checklist

- [ ] All `YOUR_*` placeholders replaced
- [ ] Apollo + SF integration manually tested (one fake lead end-to-end)
- [ ] Mobile breakpoints verified (375px, 768px, 1280px)
- [ ] Lead lands in Salesforce with correct campaign attribution
- [ ] Confirmation email sends from correct domain
