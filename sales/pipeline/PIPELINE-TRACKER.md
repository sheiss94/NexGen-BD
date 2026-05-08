# Pipeline Tracker

Single source of truth for active deals. Update weekly (Monday) before the tech sync.

## Stage Definitions

| Stage | Definition | Exit criteria |
|---|---|---|
| **Lead** | Inbound or scraped contact, no conversation yet | First reply / call booked |
| **Discovery** | Discovery call held; pain confirmed | Scoping call scheduled |
| **Proposal** | Written proposal sent | Verbal yes/no |
| **Negotiation** | Verbal yes; pricing/terms in motion | Signed SOW or PO |
| **Won** | SOW/PO signed, deposit invoiced | — |
| **Lost** | Disqualified, ghosted, or competitor won | — |

## Active Pipeline

| Company | Contact | Offer | Value | Stage | Probability | Next Action | Next Date | Owner |
|---|---|---|---|---|---|---|---|---|
| _example_ | _Jane Doe_ | _Shop Assessment_ | _$5,500_ | _Discovery_ | _40%_ | _Send proposal_ | _2026-05-15_ | _SH_ |
|  |  |  |  |  |  |  |  |  |

## Germany Show Leads (EPLAN World 2026)

> Detail tracker lives in `sales/germany-show/leads/`. Roll-up summary here.

| Company | Contact | Source | Status | Disposition | Last Touch |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## Monthly Closed-Won Log

| Month | Deal | Offer | Value | MRR? | Notes |
|---|---|---|---|---|---|
| 2026-05 |  |  |  |  |  |
| 2026-06 |  |  |  |  |  |
| 2026-07 |  |  |  |  |  |
| 2026-08 |  |  |  |  |  |
| 2026-09 |  |  |  |  |  |
| 2026-10 |  |  |  |  |  |

## Month 6 Breakeven Math ($70K cumulative)

Two streams combine to clear $70K through Month 6.

### Stream 1 — Membership MRR ramp
Target: $0 → $12K MRR by Month 6. Cumulative: ~$38,500.

### Stream 2 — Project work
Need to deliver ~$31,500-$33,500 in project revenue by Month 6.

| Sample project mix | Subtotal |
|---|---|
| 2 × EPLAN Sprint @ $15,000 | $30,000 |
| 3 × Shop Assessment @ $5,500 | $16,500 |
| 1 × EPLAN Sprint + 3 × Shop Assessment (alt mix) | $31,500 |
| 1 × Engineering Fix (low-end) | $25,000+ |

**Lead requirement:** 15-20 qualified leads in pipeline by end of Month 4 (mix of membership-fit and project-fit).

## Forecast Health Signals

- 🟢 **Green:** ≥ 4× target value in Discovery+Proposal
- 🟡 **Yellow:** 2-4× target value
- 🔴 **Red:** < 2× target value — escalate
