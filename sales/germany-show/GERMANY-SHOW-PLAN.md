# Germany Show — Execution Plan

**Event:** EPLAN World 2026 (Q2)
**Location:** Germany
**Owner:** Shain Heiss
**Status:** Pre-show prep

## Objective

| Metric | Target |
|---|---|
| Total qualified leads | **50+** |
| EPLAN partnership conversations | **3** |
| Discovery calls booked from show | **10** |

## Lead Capture Flow

```
QR code on card  →  nexgen-germany-v2.html (CYOA)
                 →  AI proposal generated on screen
                 →  Email captured (gate to PDF download)
                 →  Salesforce campaign: "EPLAN World 2026"
                 →  Tagged for follow-up sequence
```

Backup capture: physical badge scan + business card → manual entry into SF same day.

## Pre-Show Checklist

### Shain
- [ ] Confirm booth assignment + logistics with EPLAN
- [ ] Print 200 QR cards (Chip's design)
- [ ] Brief on top 25 target accounts (Apollo)
- [ ] Schedule 5 pre-show coffee meetings with EPLAN reps
- [ ] Pack: cards, laptop, demo backup, badge, presenter remote

### Brendan
- [ ] Deploy `nexgen-germany-v2.html` to production URL
- [ ] Apollo + SF live in tool, end-to-end tested
- [ ] QR code points to live URL (not staging)
- [ ] Salesforce campaign created with correct attribution
- [ ] Confirmation email template approved + sending
- [ ] Mobile + tablet performance verified (booth iPad)
- [ ] Analytics dashboard live in `tools/hub/`

### Chip
- [ ] QR card front + back final, print-ready
- [ ] Booth banner approved
- [ ] One-page proposal template branded
- [ ] Confirmation email visual designed
- [ ] Social tiles for daily show recap (LinkedIn)

## Post-Show Follow-Up Sequence

| Day | Touch | Owner | Channel |
|---|---|---|---|
| **Day 1** | Personal thank-you + their AI-generated proposal PDF | SH | Email |
| **Day 3** | Case study matched to their stated pain | SH | Email |
| **Day 7** | Calendar link for 20-min discovery call | SH | Email |
| **Day 14** | Value-add asset (FPGA-PM deep dive or EPLAN guide) | SH | Email |
| **Day 21** | Direct ask: "Should we keep talking or close the loop?" | SH | Email + LinkedIn |

After Day 21, leads who haven't responded → nurture list (monthly).

## Lead Tracker

Detailed tracker: `sales/germany-show/leads/`
Follow-up status: `sales/germany-show/follow-up/`

## Success Definition

50+ leads with 10 discovery calls booked = **win**.
3 EPLAN partnership conversations advancing = **bonus**.
2 EPLAN Sprints closed by Month 6 = **the target the show needs to feed**.
