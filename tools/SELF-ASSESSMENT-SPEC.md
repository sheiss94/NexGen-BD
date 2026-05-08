# Client Self-Assessment Tool — Spec

**Status:** v0.1 — build-ready spec for Brenden's review
**Author:** Shain Heiss · with Claude (architecture)
**Owner of the build:** Brenden Fritz
**Owner of the design:** Chip Thompson Design
**Owner of the content:** Shain Heiss
**Source story:** `content/MASTER-STORY-ELEMENTS.md` v0.3

---

## 1. Purpose

The Self-Assessment is the **front door** of NexGen. Every potential member — owner, engineer, manager, EPLAN customer, or curious browser — funnels through it before they ever talk to a human or pick a tier. Its job is to:

1. **Help the visitor recognize themselves** in Brenden's story (the gradient, the wrong answers, the order-of-operations realization)
2. **Map their actual shop state** to the v0.3 framework (where they are in the 5-act arc · which Foundation pillars exist · which Tools are installed but stalled)
3. **Recommend the right NexGen entry point** — tier, project, or shop assessment — without sales pressure
4. **Capture leads** with enough qualification depth that Shain's first call is a *next-step conversation*, not a discovery call
5. **Optionally accept visual evidence** (photos, video) of the shop, panels, work orders, processes — so Brenden can pre-analyze before any conversation

> **The strategic insight:** the assessment IS the story, retold from the visitor's perspective. They don't read about Brenden's gradient — they answer questions that reveal *their own* gradient. By the time they reach the recommendation, they've already convinced themselves they're a fit.

---

## 2. Strategic Foundation — How It Ties to v0.3

The v0.3 story spine maps 1:1 to the assessment phases:

| Story Act | Assessment Phase | What we're learning |
|---|---|---|
| Act I — The Vision | **Phase 0 — Frame** (intro page) | Visitor sees the timeline, recognizes the integrated future, opts in |
| Act II — The Gradient | **Phase 1 — Where you are** | Bid-loss patterns, margin trend, key-person risk |
| Act III — Wrong Answers | **Phase 2 — What you've tried** | Tools installed but stalled, consultants hired, automation mismatch |
| Act IV — Order of Operations | **Phase 3 — Foundation readiness** | Lean / Systems / Culture / Commitment + Tools status (EPLAN, automation, CI) |
| Act V — Compounding + Ask | **Phase 4 — What you want** | Outcomes, tier recommendation, optional visual evidence, enrollment path |

Output: a **stage report** + a **tier recommendation** + an **optional shop-analysis upgrade** (visual evidence) + a **scheduled call link or direct enrollment**.

---

## 3. The User Experience — End-to-End Flow

### 3.1 Entry points

| Entry point | Pre-fill | Notes |
|---|---|---|
| `panelmentor.com/assess` (direct) | Empty | Default landing for self-driven traffic |
| Live-site CTA "Take the assessment" | Empty | Replaces / enhances current "Get Started" buttons |
| QR card from Germany show | Source = "EPLAN World 2026" | Auto-tagged for show campaign |
| Email link from Shain or EPLAN rep | Source = sender | Personalized · attribution preserved |
| Existing CYOA tools (germany-v2, client-proposal) | Bridge link | Migrate users into the canonical assessment |

### 3.2 Flow Architecture

```
INTRO              →  Reveal the 5-act arc visually
                     "Where are you on the road?"
                     [ Begin Assessment → ]
   ↓
PHASE 1 — Gradient (4-6 questions)
                     Bid losses · margin trend · key-person dependency
                     Time horizon · who you're losing to
   ↓
PHASE 2 — Wrong Answers (4-6 questions)
                     Tools installed · consultants used · what stalled
   ↓
PHASE 3 — Foundation Readiness (6-8 questions)
                     Lean · Systems · Culture · Commitment · CI
                     EPLAN status · Automation status
   ↓
PHASE 4 — Outcomes & Identity (3-4 questions)
                     What you want fixed · who you are · timeline
   ↓
OPTIONAL — Visual Evidence Module
                     Upload photos / video of shop / panels / work orders
                     Optional but encouraged with concrete value prop
   ↓
EMAIL CAPTURE      →  Enrichment via Apollo
                     Confirmation email + Salesforce lead created
   ↓
RESULT PAGE        →  Stage Report (where you are in the arc)
                     Tier Recommendation (with reasoning)
                     Next Step CTA (book call · enroll · request shop assessment)
                     Downloadable PDF of the report
   ↓
FOLLOW-UP          →  5-touch email sequence based on stage + recommendation
                     If visual evidence submitted: Brenden's video reply within 7 days
```

### 3.3 Total time investment

- **Without visual evidence:** ~6-8 minutes
- **With visual evidence:** ~10-15 minutes (additional 4-7 min for capture + upload)

Progress bar visible throughout. Estimated time displayed up-front: *"Six to eight minutes. About the length of a good coffee."*

---

## 4. Question Architecture

Below is the working question set — designed to extract enough data to make a confident tier recommendation while staying conversational. Brenden + Shain refine wording before build.

### Phase 0 — Frame (intro screen, no questions)

Single screen with the 5-act timeline visualization (re-use the asset from the Story Direction HTML). One sentence overlay: *"Most owners we talk to recognize themselves somewhere on this road. Find out where you are."* CTA: *"Begin →"*

### Phase 1 — The Gradient (where you are)

**Q1.1 — Bid pattern** *(single select)*
> Looking at the bids you've lost in the last twelve months, what's the typical pattern?
- We almost always win on price · we lose on capacity
- We lose by 10-20% — close enough to keep bidding, far enough that we're feeling it
- We lose by 30%+ — we're getting outbid badly
- We rarely lose — but we're missing growth targets
- We're not bidding competitively yet — we're earlier in our journey

**Q1.2 — Margin trend** *(single select)*
> Over the last 2-3 years, your margins have been:
- Growing — we're getting better at this
- Holding — but it's getting harder
- Slipping a little each year
- Slipping noticeably — and we're not sure why
- We don't track this with confidence yet

**Q1.3 — Who you're losing to** *(single select, optional)*
> When you look at who's beating your bids, what do you see?
- Cheaper competitors cutting corners
- Faster, higher-quality competitors who shouldn't be cheaper but somehow are
- A mix — some cheap, some genuinely better
- Honestly? I'm not sure
- N/A — we don't lose enough to have a pattern

**Q1.4 — Key-person dependency** *(scale 1-5)*
> If your two most experienced people quit tomorrow, what happens?
- 1 — Business as usual within a week
- 2 — Painful but recoverable in a month
- 3 — We'd lose 6 months
- 4 — We'd lose major customers
- 5 — Existential threat

**Q1.5 — How long this has been going on** *(single select)*
> How long have you been feeling this slow erosion / capacity ceiling?
- Less than a year
- 1-2 years
- 2-5 years
- More than 5 years
- We just inherited it

### Phase 2 — Wrong Answers (what you've tried)

**Q2.1 — Tools installed but stalled** *(multi-select)*
> Which of these have you bought or hired and *not yet* gotten the ROI you expected?
- ☐ EPLAN (or another electrical CAD)
- ☐ Wire processing automation (Komax, etc.)
- ☐ CNC enclosure machining
- ☐ ERP / shop floor software
- ☐ Outside consultant or training program
- ☐ Higher-skilled engineer hire(s)
- ☐ New salesperson (or several)
- ☐ None of the above

**Q2.2 — What you blamed first** *(single select)*
> When the first wave of investments didn't deliver, what did you initially blame?
- The team didn't adopt it
- We bought the wrong product
- We didn't have time to implement it properly
- We needed even more equipment / software
- We didn't blame anything — we just kept pushing

**Q2.3 — What you've never had time to do** *(multi-select)*
> Be honest — which of these have you NEVER fully built?
- ☐ Documented standard work for the panel build process
- ☐ Visual management on the shop floor
- ☐ Cell-based or flow-based production
- ☐ A working engineering-to-manufacturing handoff
- ☐ A culture where the floor proposes improvements
- ☐ Codified onboarding for new hires (vs. shadowing)
- ☐ Honestly, most of these aren't built

### Phase 3 — Foundation Readiness

This is the diagnostic core. Each pillar gets a 1-5 self-rating with anchored definitions.

**Q3.1 — Lean readiness** *(scale 1-5 with descriptors)*
> Lean: how much waste does your team actively *see* and remove?
- 1 — We don't talk about lean. The floor runs hot.
- 2 — We've heard of it. Tried 5S once.
- 3 — Some lean tools in use. Inconsistent.
- 4 — Lean is part of how we work. Continuous improvement happens.
- 5 — Lean is foundational. New hires learn it on day one.

**Q3.2 — Systems readiness** *(scale 1-5)*
> Systems: if a key person quits, how much knowledge stays?
- 1 — Most knowledge is in heads.
- 2 — Some processes documented. Most aren't.
- 3 — Major processes documented, but not always followed.
- 4 — Documented systems are standard. People follow them.
- 5 — The system survives any resignation.

**Q3.3 — Culture readiness** *(scale 1-5)*
> Culture: does the floor propose improvements unprompted?
- 1 — Floor waits for direction.
- 2 — Occasional suggestions, often ignored.
- 3 — Suggestions happen but rarely turn into changes.
- 4 — Floor regularly proposes. Some improvements get implemented.
- 5 — Floor is the engine of CI. Owner / GM is mostly there to remove blockers.

**Q3.4 — Commitment readiness** *(scale 1-5)*
> Commitment: when an initiative gets hard, what happens?
- 1 — We usually drop it and try the next thing.
- 2 — We push through some. Drop others.
- 3 — We finish what we start, but it takes longer than it should.
- 4 — We commit, deliver, and keep what works.
- 5 — Discipline is the differentiator. We finish what we commit to.

**Q3.5 — EPLAN status** *(single select)*
> Where are you with EPLAN?
- Not yet — still using AutoCAD or similar
- Installed but barely used
- In active use but inconsistently — some users / projects only
- Standard part of the workflow — most projects, most engineers
- EPLAN is fully integrated with our manufacturing flow

**Q3.6 — Automation status** *(single select)*
> What's the state of automation on your floor?
- Manual everything
- One or two pieces of equipment, used intermittently
- Multiple machines, used regularly but not connected
- Multiple machines, connected to engineering / ERP
- Fully integrated automation flow with feedback loops

### Phase 4 — Outcomes & Identity

**Q4.1 — Top outcome you want** *(single select, ranked)*
> If we could fix one thing first, what would it be?
- Stop losing bids by single-digit margins
- Reduce dependence on senior people
- Get EPLAN actually working in production
- Improve quality / reduce rework
- Standardize onboarding so growth doesn't require unicorn hires
- Build a continuous-improvement culture
- All of the above (we know we're at the start)

**Q4.2 — Your role** *(single select)*
> Who are you?
- Owner / President
- General Manager / VP Operations
- Engineering Manager / Director
- Shop / Production Manager
- Engineer / EPLAN user
- Salesperson / BD
- EPLAN rep
- Other (text field)

**Q4.3 — Company size** *(single select)*
> Annual revenue range?
- Under $5M
- $5M-$15M
- $15M-$50M
- $50M+
- Prefer not to say

**Q4.4 — Timeline urgency** *(single select)*
> When do you need to start seeing change?
- Yesterday — we're losing customers
- This quarter
- This year — but we want to plan it right
- Exploratory — looking 12+ months out

**Q4.5 — Optional context** *(text, optional)*
> Anything specific you want Brenden to know? (Two sentences is plenty.)

---

## 5. Visual Evidence Module *(optional but encouraged)*

A separate optional phase, reachable from Phase 4 or after the recommendation. The value prop is concrete: *"Upload a 60-second walkthrough of your shop and we'll send back specific observations within 7 days."*

### 5.1 What we ask for

| Asset | Purpose | Recommended length |
|---|---|---|
| Shop floor walkthrough video | See flow, layout, visual management state | 60-90 seconds |
| Engineering desk / workstation photo | See drawing → production handoff | 1-3 photos |
| Wire prep area photo | See wire processing maturity | 1-3 photos |
| Sample panel (in-progress or finished) photo | See build quality, standards | 1-3 photos |
| Sample work order or schematic | See documentation state | 1-2 photos / PDF |
| Anything else they want analyzed | Open-ended | Up to 5 files |

### 5.2 What they get back

- **Within 7 days** — written observations from Brenden, mapped to the v0.3 framework: where they are on the road, which Foundation pillars are visible / missing, what's likely to be the highest-leverage first move
- **Optionally** — a 5-minute video reply from Brenden, walking through what he saw (high-conversion move for Elite-tier-fit prospects)
- **Embedded in their result PDF** — annotated screenshots/frames pointing at specific observations

### 5.3 Privacy & handling

This is the section the legal team will care about. Defaults built in from day one:

- **No automatic public exposure.** All uploads land in a private bucket, accessible only to Shain + Brenden.
- **Customer name removal.** Visual analysis report shows the customer's shop without naming any of *their* customers, partners, or projects.
- **Visible objects.** Submitter is warned: *"Make sure no proprietary IP, customer drawings, or wage information is visible. Blur anything you wouldn't want a stranger to see."*
- **Retention.** Files retained for 12 months active analysis; archived encrypted after. Submitter can request deletion any time.
- **Consent gate.** Explicit checkbox before upload: *"I confirm I'm authorized to share these images / video, and that no third-party IP is exposed."*
- **Storage.** S3-equivalent with encryption at rest. Signed URLs only, no public links. Access logged.
- **Sharing in NexGen content.** Default = never. If a customer becomes a case study, *separate* written consent is required for any image use.

### 5.4 UX

- Drag-and-drop browser upload, mobile-friendly
- Per-file upload progress, no page reload
- File size limit per file: 200 MB (covers a 90-second 4K video)
- Total submission limit: 1 GB
- Accepted: JPG, PNG, HEIC, MP4, MOV, PDF
- Compression hint on upload: *"Phone-camera quality is perfect — don't shoot 4K, save us both time."*
- Confirmation screen after upload: *"Brenden will personally review these. Expect a written analysis within 7 days; if it's a fit for a video reply, you'll hear about that on the same email."*

---

## 6. Recommendation Engine

Maps Phase 1-4 answers (and Phase 5 evidence if submitted) to a NexGen entry point.

### 6.1 Stage classification

The visitor lands in one of five stages based on weighted answers across phases:

| Stage | Profile | Recommended entry |
|---|---|---|
| **S1 — Pre-Gradient** | Hasn't yet hit the wall · still scaling on heroics | Panel Shop Automation tier ($400/mo) — start with leadership before pain forces it |
| **S2 — Mid-Gradient** | Losing 10-20% bids · margin slipping · trying things | Shop Assessment ($5.5K) → tier recommendation after diagnostic |
| **S3 — Wrong-Answers Fatigue** | Bought tools that didn't stick · ready to admit machines aren't enough | Premium Combined ($600/mo) — the order-of-operations rebuild |
| **S4 — Mid-Rebuild** | Foundation work in progress · need acceleration on EPLAN / automation | EPLAN Sprint ($15K) + EPLAN Entry ($300/mo) |
| **S5 — Compounding** | System working · wants to scale further · looking for executive partnership | Elite One-on-One ($2,500/mo) — by application |

### 6.2 Scoring logic (working draft)

A weighted formula across phase signals. Brenden + Shain refine before build.

```
foundation_score = avg(Q3.1, Q3.2, Q3.3, Q3.4)         // Lean/Systems/Culture/Commitment
tools_score      = avg(Q3.5, Q3.6)                     // EPLAN, Automation
gradient_signal  = f(Q1.1, Q1.2, Q1.5)                 // bid pattern, margin trend, duration
wrong_answers    = count(Q2.1) + count(Q2.3)           // tools stalled + foundation gaps

if foundation_score < 2 AND gradient_signal == low:
    stage = S1
elif gradient_signal == high AND foundation_score < 3:
    stage = S2
elif wrong_answers >= 4 AND foundation_score < 3:
    stage = S3
elif foundation_score >= 3 AND tools_score < 3:
    stage = S4
elif foundation_score >= 4 AND tools_score >= 3:
    stage = S5
else:
    stage = S2  // safe default — recommend assessment
```

> **Key principle:** *no stage gets an aggressive sell.* The recommendation is framed as "where to start," not "what to buy." Pressure kills trust at the assessment phase.

### 6.3 Result Page Output

Each visitor sees:
1. **Their stage label and one-line characterization** ("You're mid-gradient — the slow erosion is real, and you're not alone.")
2. **Their position on the 5-act arc** — same visualization as the intro, with their dot placed
3. **Foundation Readiness chart** — radar / bar chart of the four foundation pillars
4. **Tier recommendation with reasoning** — *why* this tier, not what the tier is (link to tier page for that)
5. **What's NOT recommended yet, and why** — anti-recommendations build trust ("EPLAN Entry isn't your right next step yet because…")
6. **Next-step CTA** — book a call · enroll · request shop assessment · upload visual evidence
7. **Downloadable PDF report** — same content, branded, shareable with their leadership team

---

## 7. Enrollment Path

After the result page, the visitor has three paths. **All three capture data; only one transacts immediately.**

| Path | When it fires | Backend |
|---|---|---|
| **A — Book a 20-min call with Shain** | High-fit owner / GM, S2-S5 | Calendly link · auto-attached to SF lead |
| **B — Self-enroll in recommended tier** | Lower-touch — engineer, manager, S3-S4 fits | Stripe checkout · subscription created · tier-specific onboarding email |
| **C — Request shop assessment** | S2 fits unsure where to start | Form → Shain reaches out within 2 business days · books assessment · invoices $5,500 deposit |

Visual evidence module accessible from any of the three paths — encouraged for A and C, optional for B.

---

## 8. Data Capture & Integration

### 8.1 Captured per submission

- All Phase 1-4 answers (structured)
- Phase 5 file URLs + metadata (if submitted)
- Computed stage classification + recommendation
- Apollo enrichment (company, role, revenue, employee count) — fired on email capture
- UTM / referrer / device / browser
- Timestamp · session duration · drop-off point if abandoned

### 8.2 Salesforce sync

| Object | What gets created |
|---|---|
| Lead | One per submission · stage and recommendation in custom fields |
| Campaign | Mapped from referrer (Germany show, EPLAN partner, direct, etc.) |
| Activity | Visual evidence submitted? Yes/no flag, link to bucket |
| Task | If S5/Elite-fit: auto-assign to Brenden for personal review |

### 8.3 Intelligence Hub

The existing `tools/hub/nexgen-intelligence-hub.html` already has the funnel-tracking infrastructure. Extend with:

- Stage distribution dashboard (S1-S5 mix over time)
- Foundation-readiness scatter (Foundation vs. Tools)
- Pain-point heatmap from Q4.1
- Visual evidence submission rate
- Conversion rate per stage to tier enrollment

### 8.4 Data retention

- Submission records: indefinite (anonymized after 24 months if no enrollment)
- Visual evidence: 12 months active · archived encrypted thereafter
- Email contact: standard CAN-SPAM unsubscribe path
- Right to deletion: honored within 14 days of request

---

## 9. Privacy & Security Summary

### Visitor-facing trust statements (live on the assessment)

> *"Your answers go to Shain and Brenden, no one else. We use them to recommend the right entry point — not to spam you. You can opt out of follow-up at any time."*

> *"Photos and video you upload are private. We use them to give you a better answer. We don't post them, share them, or use them as marketing without separate written permission."*

### Internal handling

- Encrypted at rest, encrypted in transit
- Bucket access: Shain (admin), Brenden (admin), service account for Salesforce sync
- Quarterly access audit
- Visual evidence access is logged (who viewed what, when)
- No third-party AI processing of customer images without separate consent (i.e., we don't auto-pipe their shop into a public LLM for analysis)

### Open compliance question

If submitter is in EU / UK: GDPR-compliant consent flow needed. Detect IP, present GDPR-specific consent if EU. Default to GDPR-style flow if uncertain — it's stricter and safer.

---

## 10. Phased Build Plan

### Phase 1 — MVP (4-6 weeks)
- Phases 0-4 of the assessment (no visual evidence)
- Recommendation engine v1 with hardcoded scoring
- Result page with PDF export
- Salesforce lead creation
- Apollo enrichment
- Confirmation email

### Phase 2 — Visual Evidence (6-8 weeks after MVP)
- Upload module with consent gate
- Private bucket storage + access controls
- Brenden's review queue dashboard
- 7-day SLA reply email automation
- Annotated PDF augmentation

### Phase 3 — Intelligence + Refinement (8-10 weeks after Phase 2)
- Intelligence Hub extensions
- Scoring formula refinement (data-driven after 100+ submissions)
- A/B testing of question wording (re-use `nexgen-ab-tester.html`)
- Custom Brenden video reply workflow for Elite-fit submissions
- Localization framework (German for Germany show)

### Phase 4 — Channel Activation (parallel to Phase 3)
- EPLAN partnership co-branded version (uses partner attribution)
- Embed kit for EPLAN reps to drop into their own outreach
- Trade-show kiosk mode (booth iPad)

---

## 11. Open Decisions for Brenden + Shain

These need to be resolved before build begins.

### Strategic
1. **Free or gated?** Is the assessment public (anyone can take it without email) or gated (email required to see results)? Recommendation: **email-gated for the result PDF, but show the stage label inline so visitors get value before deciding to share email.**
2. **Anonymous mode?** Should an anonymous mode exist for window-shoppers? Recommendation: **yes — track session, no PII, no recommendation reveal until email captured.**
3. **EPLAN partnership skin?** Should EPLAN reps get a co-branded version they can share? Recommendation: **yes — Phase 4. Builds the channel motion described in `STRATEGIC-NOTES-2026-05-08.md`.**
4. **Visual evidence in MVP?** Defer to Phase 2 (recommended) or include in MVP? Recommendation: **defer.** MVP value is high enough without it; Phase 2 doubles conversion intent for high-fit prospects.

### Build / technical
5. **Stack:** continue Bolt + Next.js (matches live site) or build standalone? Recommendation: **same stack** — leverages existing brand tokens, deploy infra, analytics.
6. **Storage for visual evidence:** S3, Cloudflare R2, or Egnyte API? Recommendation: **S3 or R2** — purpose-built for this; Egnyte is for Brenden's working files, not customer submissions.
7. **Email service:** existing system or new? Recommendation: confirm what currently sends from `panelmentor.com`; align.

### Product / UX
8. **Question count tolerance:** ~22 questions across 4 phases is the current draft. Acceptable? Recommendation: **test at 22, target ≤18 after first round of usage data.** Drop-off rate at the 7-minute mark is the metric.
9. **Branching logic:** simple linear (current draft) or branching (skip irrelevant questions)? Recommendation: **linear for MVP**, branching in Phase 3 once we have data on what's safe to skip.
10. **Stage label tone:** "Pre-Gradient / Mid-Gradient / etc." or owner-friendly names ("Just Starting / Hitting the Wall / etc.")? Recommendation: **owner-friendly internally; expose v0.3 vocabulary only if user opts to "go deeper."**

---

## 12. Linkages

| Connects to | Where |
|---|---|
| Story canon | `content/MASTER-STORY-ELEMENTS.md` v0.3 |
| Story Bible (creative philosophy) | `content/STORY-BIBLE.md` |
| Story Direction (visual register) | `content/STORY-DIRECTION.html` |
| Existing CYOA tools | `tools/cyoa/nexgen-germany-v2.html`, `nexgen-client-proposal.html` |
| Analytics hub | `tools/hub/nexgen-intelligence-hub.html` |
| API / integration setup | `docs/api-configs/API-SETUP.md` |
| Pricing reference | `financials/pricing/PRICING-SHEET.md` |
| Strategic context | `strategy/STRATEGIC-NOTES-2026-05-08.md` |

---

*Last updated 2026-05-08. Status: v0.1 spec, awaiting Brenden + Shain review before build kicks off.*
