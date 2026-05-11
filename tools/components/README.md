# NexGen — Reusable UI Components

Drop-in components built for the NexGen story system. Self-contained (no build step, no framework dependency, vanilla JS), styled in the live brand palette, designed to be embedded into any page in the ecosystem.

## Inventory

| Component | File | Purpose |
|---|---|---|
| **RaceCircuit** | `race-circuit.js` | Animated F1-style race circuit. Configurable turns, cars, positions. Used in the Pit Crew direction piece and the Self-Assessment tool. |

## RaceCircuit

### Use cases

1. **The story** — replay Brenden's full 8-turn arc (auto-plays). The `nexgen-pit-crew-direction.html` page uses this configuration.
2. **The self-assessment tool** — as the client answers questions, advance their car around the track. Competitor cars show industry-average positioning.
3. **The slide deck** — minimal visualization with no controls, looping.
4. **The Germany booth screen** — auto-play full story, kiosk mode.

### Quick start

```html
<div id="my-circuit"></div>
<script src="race-circuit.js"></script>
<script>
  RaceCircuit.create('#my-circuit', {
    turns: RaceCircuit.brendenTurns,
    lapPositions: RaceCircuit.brendenPositions,
    competitors: [
      { color: '#8F95A0', glow: 'rgba(143,149,160,0.35)' },
      { color: '#E78635', glow: 'rgba(231,134,53,0.40)' }
    ]
  });
</script>
```

That's it. You get the full Brenden story with two competitor cars, auto-play, accessible controls, mobile-responsive, reduced-motion-aware.

### Full options reference

| Option | Type | Default | Notes |
|---|---|---|---|
| `trackPath` | string | F1 default | SVG path `d` attribute. Closed loop. |
| `viewBox` | string | `0 0 1000 380` | SVG viewBox |
| `turns` | array | `[]` | Array of `{title, telemetry, body, hook}` objects |
| `brenden` | object | `{color:'#2578E4', glow:'rgba(37,120,228,0.55)'}` | Brenden's car |
| `competitors` | array | `[]` | Array of `{color, glow}` car configs |
| `lapPositions` | array | `[]` | Per-turn position arrays `[brendenPct, comp1Pct, comp2Pct]` |
| `autoplay` | bool | `true` | Auto-advance through turns |
| `autoplayMs` | number | `5000` | Milliseconds per turn during autoplay |
| `finishDwellMs` | number | `7500` | Extra time on the final turn |
| `startTurn` | number | `1` | Which turn to begin at |
| `showControls` | bool | `true` | Prev / Play / Next buttons |
| `showLapDisplay` | bool | `true` | Story content panels below the track |
| `showProgress` | bool | `true` | "TURN 3 / 8" indicator |
| `showStartFinish` | bool | `true` | Checkered start/finish flag |
| `progressLabel` | string | `'TURN'` | Vocabulary — e.g. `'STAGE'` for assessment |
| `turnLabel` | string | `'TURN'` | Tag on panel cards |
| `title` | string | `null` | Optional H3 above the widget |
| `onTurnChange` | function | `null` | Callback fired when current turn changes |
| `onComplete` | function | `null` | Callback fired when reaching final turn |

### Methods (returned from `create()`)

```js
var circuit = RaceCircuit.create('#x', { ... });

circuit.goTo(5);                        // jump to turn 5
circuit.next();                         // advance one
circuit.prev();                         // back one
circuit.play();                         // start auto-play
circuit.pause();                        // pause auto-play
circuit.toggle();                       // play <-> pause
circuit.setBrendenPosition(0.5);        // raw 0-1 position (without changing turn)
circuit.setCompetitorPosition(0, 0.3);  // index, raw position
circuit.getCurrentTurn();               // returns 1-N
circuit.isPlaying();                    // returns boolean
circuit.destroy();                      // tear down + clear DOM
```

### Constants

- `RaceCircuit.brendenTurns` — Brenden's canonical 8-turn story content
- `RaceCircuit.brendenPositions` — Brenden's canonical position-per-turn array
- `RaceCircuit.DEFAULT_TRACK` — the F1 path
- `RaceCircuit.DEFAULT_VIEWBOX` — `'0 0 1000 380'`
- `RaceCircuit.version` — currently `'0.1.0'`

## Self-Assessment Integration Pattern

```js
var assess = RaceCircuit.create('#assessment-viz', {
  turns: [
    { title: 'Just Starting' },
    { title: 'Cracks Showing' },
    // ... 8 stages mapped to your assessment questions
  ],
  lapPositions: [
    [0.05, 0.20, 0.15],   // Stage 1 — you're far behind industry
    // ... more stages, competitors moving with you
    [0.92, 0.82, 0.86]    // Stage 8 — you're now ahead
  ],
  competitors: [
    { color: '#8F95A0', glow: 'rgba(143,149,160,0.35)' },   // Industry average
    { color: '#E78635', glow: 'rgba(231,134,53,0.40)' }     // Top performers
  ],
  autoplay: false,              // user-driven, not time-driven
  showControls: false,          // hide manual scrubbing
  showLapDisplay: false,        // no story panels — just visualization
  progressLabel: 'STAGE',       // change vocab from TURN -> STAGE
  onTurnChange: function (stage) {
    // Update your assessment UI based on user's current stage
    // Show tier recommendation, narrative, etc.
    updateAssessmentResult(stage);
  }
});

// When the user submits answers to your assessment questionnaire:
function onAssessmentAnswerSubmitted(answersSoFar) {
  var stage = computeStageFromAnswers(answersSoFar);
  assess.goTo(stage);
}
```

### Why this works strategically

The visualization tells the user where they are *before* it tells them what to do. They see themselves on the same circuit Brenden ran. They see the silver and ember cars (the industry) ahead of them in early stages. They see those cars getting passed in later stages — that's the *promise of the program* rendered as motion. By the time they reach the recommendation, they've already internalized the journey.

This matches the strategic principle in `content/MASTER-STORY-ELEMENTS.md`: *the reader has to find themselves on the road, or the road doesn't matter.*

## Browser Support

- Modern Chrome, Firefox, Safari, Edge (2020+)
- SVG2 transform attribute animation
- IntersectionObserver (auto-pauses when off-screen)
- prefers-reduced-motion (auto-pauses for accessibility)
- Mobile responsive — horizontal scroll on narrow viewports

## File Footprint

- `race-circuit.js`: ~28 KB unminified, vanilla JS, zero dependencies
- Single `<script>` tag, single CSS injection (auto-scoped via `.rc-*` namespace)
- Multiple instances per page supported

## Open Items / Future Versions

- **v0.2** — Add **mini-obstacle annotations** on the curves between turns (small text labels like *"customer lost"*, *"consultant fee"*, *"key person quit"*)
- **v0.2** — **Overtaking flash** when Brenden passes a competitor (Turn 7→8 visual emphasis)
- **v0.3** — **Per-instance theming** — override colors via options for non-NexGen brand contexts
- **v0.3** — **Audio narration sync** — `audioElement` option, lap transitions cue narration
- **v0.4** — **Telemetry export** — what stage did the user land at, how long did they spend, sent to Salesforce on submit
