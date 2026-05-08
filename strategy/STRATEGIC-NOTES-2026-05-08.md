# Strategic Notes — 2026-05-08

**Author:** Shain (with Claude as analyst)
**Reviewed by:** Brenden (TBD)
**Status:** Working analysis — first pass after pulling the strategic surfaces in `content/`, `tools/`, and the live site.

This is a living document. New observations and decisions append here. When a decision becomes a commitment, it migrates to `POSITIONING.md`, `BRAND-BRIEF.md`, or the relevant tracker.

---

## What I'm Reading

| Surface | Where | Headline | Audience |
|---|---|---|---|
| Live site | bolt.host preview | "Turn panel shop modernization into measurable progress." | Direct-to-shop, broad |
| Backstory architecture | `content/nexgen-backstory.html` | "The backstory is the product." | Brenden himself (concept doc) |
| Transformation Journey | `content/NexGen_Transformation_Journey.html` | "5 stages, 10× output potential" | Stage-mapped audience |
| EPLAN landing mockup | `creative/campaigns/2026-q3-core-launch/...` | "Speed Adoption. Improve ROI. Strengthen Retention." | **EPLAN partnership channel** |
| Germany v2 CYOA | `tools/cyoa/nexgen-germany-v2.html` | "Software is just the start." | EPLAN World 2026 booth |
| Boss Deck CYOA | `tools/cyoa/nexgen-boss-deck.html` | "The Next Generation Is Here." (message to Brenden) | Internal sell-in |
| Client Proposal CYOA | `tools/cyoa/nexgen-client-proposal.html` | "Built For You. Specifically." | Post-discovery prospect |
| Intelligence Hub | `tools/hub/nexgen-intelligence-hub.html` | Funnels, drop-off, answer patterns, SF sync | Internal ops |
| System Diagrams | `tools/hub/nexgen-system-diagrams.html` | Decision tree + knowledge flywheel | Internal architecture |
| Strategy Deck | `strategy/NexGen_Strategy_Presentation.pptx` | Binary — needs separate review | TBD |

---

## Five Tensions That Need Resolution

These are the conflicts I'm seeing between surfaces. Each one has a recommended call.

### 1. Pricing isn't yet canonical

Two different premium prices across surfaces, and the tier names diverge.

| Surface | Entry | Automation | Premium | Elite |
|---|---|---|---|---|
| Live site | EPLAN Entry · $300 | Panel Shop Automation · $400 | Premium Combined · **$600** | Elite One-on-One · $2,500 |
| EPLAN landing mockup | EPLAN Essentials · $300 | Automation Leadership · $400 | Premium Access · **$900** | Elite Partnership · $2,500 |

**Recommendation:** Lock the live-site names + prices ($600 Premium) as canonical. Update the EPLAN mockup to match. If the EPLAN partnership channel needs different tier names for positioning, treat that as a marketing skin over the same SKUs — not a different ladder.

**Decision needed from Brenden:** confirm $600 Premium (live site) is canonical, not $900 (mockup).

### 2. The site leads with plans; the strategy says lead with story

`content/nexgen-backstory.html` argues bluntly:

> *"The current site jumps straight to plans. Move the story above the fold of 'what you'll do together.' A reader who finds themselves in the journey is a reader who is already pre-qualified for a tier."*

The live site does exactly what the strategy doc warns against. Hero → pillars → tier paths → CTA. No story arc, no Brenden voice, no "is this you?"

**Recommendation:** Backstory rewrite is the single highest-leverage site change before Germany. Even a draft beats none. The backstory doc has discovery prompts for Brenden — those answers are the asset, not the prose around them.

**Decision needed from Brenden:** carve out 60 minutes to record voice answers to the six discovery prompts in `nexgen-backstory.html` Part 02. Shain transcribes → drafts page copy → Chip designs.

### 3. Three audiences in the brief, four on the live site, three more in landing mockups

| Source | Audiences |
|---|---|
| `BRAND-BRIEF.md` (after my reconciliation) | Owners ($5-50M), OEMs, Engineering teams, Mfg leaders |
| Live site `/paths` page | Engineers/CAD users, Owners/managers, Premium combined, Elite |
| EPLAN mockup | New EPLAN customers, Existing EPLAN customers (ROI rescue), Shop managers, Owners/C-suite |
| Backstory doc | "Panel shop owner reading your site" (single archetype) |

**Recommendation:** Pick the *primary* audience for each surface deliberately. The audiences are not wrong individually — what's wrong is they're not consciously sequenced. Suggested map:

| Surface | Primary audience |
|---|---|
| Live site home | Owner / GM (because backstory only works for someone who's lived it) |
| Live site `/paths` | Engineer (Path A) and Manager (Path B) — already segmented correctly |
| EPLAN landing | EPLAN reps + their underperforming customers |
| Germany show CYOA | Mixed — EPLAN customers AND EPLAN reps |
| Boss deck | Brenden / internal stakeholders |

### 4. The EPLAN angle is bigger than the brief currently treats it

The EPLAN landing mockup contains the most strategically dense statistics in the entire repo:

- **11 of 12** EPLAN customers surveyed at an Omaha-area event report **no significant ROI** from their software investment
- **6,000+ UL shops** addressable in the US
- ADS is **1 of 12** — the only customer at that event with a real ROI story

That's a wedge. EPLAN has a churn-and-adoption problem, ADS is the proof case, NexGen is the solution. **This is a channel partnership, not just a marketing campaign.** See section below.

**Recommendation:** Promote EPLAN partnership from "campaign" to a named **GTM motion** with its own quarterly goals. The Germany show is the activation event, but the motion runs continuously after.

### 5. Brand color in the brief is now reconciled, but typography and logo are still TBD

I aligned the BRAND-BRIEF to the live site palette (`#2578E4` blue on `#171A1F` graphite). But:
- Logo is still placeholder text on the live site
- Typography is system stack — no decision yet
- No brand guidelines doc exists in `creative/brand/guidelines/`

**Decision needed from Chip:** logo concepts (P0 in his onboarding), typography proposal (P1), guidelines doc (P2).

---

## The EPLAN Partnership Opportunity — A Real GTM Motion

This deserves its own section because it's the most underdeveloped, highest-upside lever in the current strategy.

### The pitch (to EPLAN, not to customers)

> Eleven of twelve of your customers at our local event reported no measurable ROI. The twelfth was us — Automated Drive Systems — using your software the way you intended. NexGen Panel Mentoring exists to turn the other eleven into more of the twelfth. We do the adoption work you can't bill for. Your customers stop churning. Your reps close more renewals. We never compete with your training revenue — we live below it, where the actual workflow problem lives.

### Why EPLAN should care
- **Churn protection** — every customer who fails to adopt is a likely non-renewal
- **Land-and-expand** — successful customers buy more seats
- **Reference accounts** — they need testimonials they don't have
- **Reduced support load** — adoption issues consume EPLAN support cycles

### Why we should care
- **Warm referrals at scale** — EPLAN reps surfacing leads is 100× the throughput of cold outbound
- **Implicit endorsement** — referred-by-EPLAN is a different conversation than cold
- **Pricing power** — channel-referred deals close at 2-3× the rate
- **Defensible moat** — once we're the named partner, switching cost rises

### Concrete activation steps (needed before/at Germany)

1. **One-page partnership memo** — send to EPLAN regional director before Germany. Frames the relationship.
2. **Reference architecture deck** — ADS as the proof case, mapped to EPLAN's stated customer-success metrics.
3. **Co-branded asset** — landing page (mockup exists!) ready for EPLAN to share internally.
4. **Lead-share agreement draft** — what data we share back, in what cadence.
5. **3 partnership conversations at Germany** — already a stated show goal. Make it the *primary* show goal, not a side goal.
6. **Pilot proposal** — "Give us your worst-performing 3 accounts in our region for 90 days. We'll show you the curve." Measurable. Bounded. Hard to refuse.

### The math

If EPLAN refers 5 qualified accounts per quarter at average $400/mo (Automation tier), that's $2,000 new MRR per quarter. Over 12 months: **$24,000/year recurring**, growing.
If even 1 of those becomes a Premium ($600) or Elite ($2,500), the unit economics blow past direct outbound.

---

## Highest-Leverage Near-Term Moves

Ordered by leverage / time-to-impact.

| # | Move | Owner | Time | Why |
|---|---|---|---|---|
| 1 | Brenden answers the six backstory prompts (audio OK) | Brenden | 60 min | Unblocks site rewrite, deck rewrite, sales narrative |
| 2 | Lock canonical pricing ($600 Premium) | Brenden + Shain | 15 min | Removes mockup vs. site contradiction |
| 3 | Draft the EPLAN partnership memo (1 page) | Shain | 90 min | Prerequisite for the most valuable Germany conversations |
| 4 | Update EPLAN landing mockup to match canonical pricing | Brenden | 30 min | One source of truth |
| 5 | Get logo + brand guidelines from Chip | Chip | 2-3 weeks | Blocks branded QR card and EPLAN co-branded asset |
| 6 | Wire Apollo + SF keys into 4 CYOA tools | Brenden | 2-3 hrs | Germany show requirement |
| 7 | Move backstory above tier selector on live site | Brenden + Bolt | 1 day | Highest-leverage UX change |

---

## Open Questions (Brenden + Shain)

These need answers before next strategy review (1st of month).

1. **Is the EPLAN partnership a formal channel motion or an opportunistic campaign?** The answer changes how we resource it.
2. **Are EPLAN Sprints and Shop Assessments still actively sold?** They're not on the membership platform. If yes, they need their own product page or case-by-case sales motion.
3. **What's the realistic Q3 customer-count target by tier?** The subscription tracker has a worked example (5/5/8/1/1/0) — does Brenden agree those mix ratios are realistic?
4. **Does NexGen have a stated stance on competing with EPLAN's own training?** The disclaimer says "not official EPLAN training," but the EPLAN mockup positions NexGen as filling EPLAN's adoption gap. The line needs to be sharp.
5. **Who is the second-best customer profile after panel shop owners?** Owners are the bullseye; OEMs vs. EPLAN customers vs. mfg leaders is a real prioritization question.
6. **What does success look like at the end of the 6-month Chip Thompson engagement?** The deliverable list exists; the *quality bar* doesn't.

---

## What's Missing from the Repo (gaps I'd recommend filling)

| Gap | Suggested file | Priority |
|---|---|---|
| EPLAN partnership strategy | `strategy/EPLAN-PARTNERSHIP.md` | P0 |
| Brenden's answered backstory prompts | `strategy/BRENDEN-BACKSTORY-INTERVIEW.md` | P0 |
| Audience prioritization | `strategy/AUDIENCE-MAP.md` | P1 |
| Channel strategy | `strategy/CHANNELS.md` | P1 |
| Competitive intel (EPLAN, RIB, AutoCAD electrical, in-house consultants) | `strategy/competitive-intel/` | P1 |
| Case studies (ADS as proof case) | `content/case-studies/published/ADS-PROOF-CASE.md` | P0 — needed for EPLAN pitch |
| Local setup guide for Brenden | `docs/processes/LOCAL-SETUP.md` | P2 |

---

## Process Notes

- This file is the running strategic log. Add observations as we collect them.
- When a decision is made, move the durable answer to the permanent doc (POSITIONING, BRAND-BRIEF, etc.) and reference here.
- Strategy review cadence: 1st of month, all three (per `WEEKLY-RHYTHM.md`).
