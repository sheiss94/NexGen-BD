# Raw Assets — DROP ZONE

This folder is for **raw, unedited source assets**: audio recordings, video footage, original photos, scanned documents.

## Rules

- **This folder is gitignored.** Files dropped here stay on your local machine + Egnyte. They do NOT go to GitHub.
- **Why:** raw audio/video/photo files are large, often confidential, and not meant for public versioning.
- **Polished outputs** (transcripts, edited audio cuts, exported video clips, prepared images) live elsewhere in `content/` and DO get committed.

## Naming Convention

```
[type]-[prompt-number]-[short-slug].[ext]
```

Examples:
- `audio-01-the-inheritance.m4a`
- `audio-02-the-tuesday.m4a`
- `video-shopfloor-walkthrough-take1.mp4`
- `photo-archive-1989-toolbench.jpg`

## Brenden's Active Drop List

For the story bible interviews — drop into this folder as you record:

- [ ] `audio-01-the-inheritance.m4a` — Prompt 1: walk into the shop
- [ ] `audio-02-the-tuesday.m4a` — Prompt 2: the moment it broke ⭐ HIGHEST PRIORITY
- [ ] `audio-03-the-wrong-bets.m4a` — Prompt 3: what didn't work
- [ ] `audio-04-the-pillars.m4a` — Prompt 4: the four pillars stories
- [ ] `audio-05-the-inflection.m4a` — Prompt 5: when you knew
- [ ] `audio-06-the-why-now.m4a` — Prompt 6: why NexGen, why now
- [ ] `audio-07-sensory.m4a` — Prompt 7: ten sensory hooks

See `content/STORY-BIBLE.md` Section 3 for the full prompts.

## What goes elsewhere

| Asset | Goes to |
|---|---|
| Transcripts | `content/raw-transcripts/` (also gitignored until polished) |
| Polished story copy | `content/` root |
| Final case studies | `content/case-studies/published/` |
| Final video edits | linked from Drive/Vimeo, not committed |
| Final audio cuts | linked from Drive/Spotify, not committed |
