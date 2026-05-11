/**
 * RaceCircuit
 * ===========
 *
 * Drop-in animated race-circuit widget. Carries an F1-style track + N turns + N cars
 * + a content panel display. Built for NexGen Panel Mentoring.
 *
 * Usage
 * -----
 *
 *   <div id="my-circuit"></div>
 *   <script src="race-circuit.js"></script>
 *   <script>
 *     var circuit = RaceCircuit.create('#my-circuit', {
 *       turns: [{ title, telemetry, body, hook }, ...],
 *       brenden: { color, glow },
 *       competitors: [{ color, glow }, ...],
 *       lapPositions: [[brendenPct, comp1Pct, ...], ...],
 *       autoplay: true,
 *       onTurnChange: function(turn) { ... }
 *     });
 *     circuit.goTo(3);   // jump to turn 3
 *   </script>
 *
 * Designed by Shain Heiss · architecture by Claude.
 * Lives in nexgen-bd repo at tools/components/race-circuit.js
 *
 * License: internal use, NexGen Panel Mentoring.
 */
(function (global) {
  'use strict';

  // -----------------------------------------------------------------------
  // CONSTANTS
  // -----------------------------------------------------------------------

  var DEFAULT_TRACK = 'M 150 100 L 720 100 C 850 100 920 135 920 210 C 920 290 860 325 720 325 C 660 325 620 305 580 305 C 540 305 520 325 480 325 L 280 325 C 140 325 80 295 80 220 C 80 160 100 115 150 100 Z';
  var DEFAULT_VIEWBOX = '0 0 1000 380';

  var DEFAULTS = {
    trackPath:        DEFAULT_TRACK,
    viewBox:          DEFAULT_VIEWBOX,
    turns:            [],           // [{title, telemetry, body, hook}]
    brenden:          { color: '#2578E4', glow: 'rgba(37,120,228,0.55)' },
    competitors:      [],           // [{color, glow}]
    lapPositions:     [],           // [[brendenPct, comp1Pct, ...], ...]
    autoplay:         true,
    autoplayMs:       5000,
    finishDwellMs:    7500,
    startTurn:        1,
    showControls:     true,
    showLapDisplay:   true,
    showProgress:     true,
    showStartFinish:  true,
    progressLabel:    'TURN',       // "TURN 3 / 8" — change for other vocab
    turnLabel:        'TURN',       // chip on each panel
    title:            null,         // optional H3 above the widget
    onTurnChange:     null,
    onComplete:       null
  };

  // -----------------------------------------------------------------------
  // STYLES (injected once, namespaced to .rc-)
  // -----------------------------------------------------------------------

  var STYLES = [
    '.rc { font-family: Inter, system-ui, -apple-system, sans-serif; color: #E5E7EB; }',
    '.rc * { box-sizing: border-box; }',
    '.rc-svg-wrap { width: 100%; overflow-x: auto; overflow-y: hidden; padding: 0.5rem 0 1rem; }',
    '.rc-svg-wrap svg { width: 100%; min-width: 760px; max-width: 100%; height: auto; display: block; }',
    '.rc-car { transition: transform 1.5s cubic-bezier(.22,.85,.3,1); }',
    '.rc-car--brenden { /* glow set inline */ }',
    '.rc-car--competitor { opacity: 0.85; }',
    '.rc-station { cursor: pointer; transition: opacity 0.3s ease; }',
    '.rc-station circle { transition: stroke 0.4s ease, fill 0.4s ease; }',
    '.rc-station text { transition: fill 0.4s ease; }',
    '.rc-station.is-passed circle { stroke: #2578E4; fill: rgba(37,120,228,0.08); }',
    '.rc-station.is-passed text { fill: #2578E4; }',
    '.rc-station.is-active circle { stroke: #2578E4; fill: #2578E4; filter: drop-shadow(0 0 6px rgba(37,120,228,0.7)); }',
    '.rc-station.is-active text { fill: white; }',
    '.rc-station:hover circle { stroke: #EAF3FF; }',
    '.rc-station:focus { outline: none; }',
    '.rc-station:focus circle { stroke: #EAF3FF; }',
    '.rc-controls { display: flex; gap: 0.75rem; justify-content: center; align-items: center; margin: 0.5rem 0 1.75rem; flex-wrap: wrap; }',
    '.rc-ctrl { background: transparent; color: #A1AAB8; border: 1px solid rgba(229,231,235,0.08); padding: 0.6rem 1rem; font-family: "JetBrains Mono", monospace; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: 3px; transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease; }',
    '.rc-ctrl:hover { background: rgba(37,120,228,0.08); border-color: #2578E4; color: #EAF3FF; }',
    '.rc-ctrl-play { border-color: #2578E4; color: #2578E4; }',
    '.rc-progress { padding: 0.55rem 0.95rem; color: #E5E7EB; font-family: "JetBrains Mono", monospace; font-size: 0.76rem; letter-spacing: 0.15em; text-transform: uppercase; border: 1px solid rgba(229,231,235,0.08); border-radius: 3px; background: rgba(229,231,235,0.02); min-width: 110px; text-align: center; }',
    '.rc-display { position: relative; min-height: 360px; margin-top: 0.5rem; }',
    '.rc-panel { position: absolute; inset: 0; opacity: 0; transform: translateY(12px); transition: opacity 0.45s ease, transform 0.45s ease; pointer-events: none; padding: 1.5rem 0.5rem 0; }',
    '.rc-panel.is-active { opacity: 1; transform: translateY(0); pointer-events: auto; }',
    '.rc-panel-head { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem; }',
    '.rc-telemetry { font-family: "JetBrains Mono", monospace; font-size: 0.7rem; letter-spacing: 0.2em; color: #6B7280; text-transform: uppercase; }',
    '.rc-tag { display: inline-flex; align-items: baseline; gap: 0.4rem; padding: 0.3rem 0.7rem; background: rgba(37,120,228,0.08); border: 1px solid rgba(37,120,228,0.25); border-radius: 3px; }',
    '.rc-tag-label { font-family: "JetBrains Mono", monospace; font-size: 0.65rem; letter-spacing: 0.18em; color: #6B7280; }',
    '.rc-tag-num { font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 1.05rem; color: #2578E4; }',
    '.rc-tag-finish { background: rgba(52,211,153,0.08); border-color: rgba(52,211,153,0.3); }',
    '.rc-tag-finish .rc-tag-num { color: #34D399; }',
    '.rc-panel h3 { font-family: Fraunces, Georgia, serif; font-weight: 500; font-style: italic; font-size: clamp(1.4rem, 2.5vw, 1.95rem); line-height: 1.15; margin: 0 0 1rem; letter-spacing: -0.01em; }',
    '.rc-panel p { color: #A1AAB8; font-size: 1rem; line-height: 1.65; margin: 0 0 1rem; max-width: 760px; }',
    '.rc-panel .rc-hook { font-family: Fraunces, Georgia, serif; font-style: italic; color: #EAF3FF; font-size: 1.05rem; padding-top: 1rem; border-top: 1px solid rgba(229,231,235,0.08); max-width: 760px; }',
    '.rc-title { font-family: Fraunces, Georgia, serif; font-weight: 500; font-style: italic; color: #EAF3FF; margin: 0 0 1.5rem; font-size: clamp(1.4rem, 2.6vw, 2rem); }',
    '@media (max-width: 700px) {',
    '  .rc-ctrl { font-size: 0.7rem; padding: 0.5rem 0.7rem; }',
    '  .rc-progress { min-width: 90px; font-size: 0.7rem; padding: 0.5rem 0.7rem; }',
    '  .rc-display { min-height: 420px; }',
    '}'
  ].join('\n');

  // -----------------------------------------------------------------------
  // HELPERS
  // -----------------------------------------------------------------------

  var nextId = 0;
  function uid() { return 'rc-' + (++nextId); }

  function merge(a, b) {
    var out = {};
    Object.keys(a).forEach(function (k) { out[k] = a[k]; });
    Object.keys(b || {}).forEach(function (k) { if (b[k] !== undefined) out[k] = b[k]; });
    return out;
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function esc(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function carSvg(id, color, glow, scale, isBrenden) {
    // Top-down F1 silhouette. Nose at +x (forward direction).
    var s = scale || 1;
    var rearWing = isBrenden ? 5 : 4;
    var bodyW = isBrenden ? 32 : 28;
    var bodyH = isBrenden ? 20 : 18;
    var noseLen = isBrenden ? 10 : 8;
    var noseY = isBrenden ? 9 : 8;
    var driverR = isBrenden ? 4.5 : 4;
    var wheelLen = isBrenden ? 9 : 8;
    var wheelOffset = isBrenden ? 17 : 15;

    return '<g class="rc-car ' + (isBrenden ? 'rc-car--brenden' : 'rc-car--competitor') + '"' +
      ' data-car="' + id + '"' +
      ' transform="translate(150,100)"' +
      (glow ? ' style="filter: drop-shadow(0 0 ' + (isBrenden ? 10 : 4) + 'px ' + glow + ')"' : '') +
      '>' +
      // Rear wing (left side)
      '<rect x="-' + (wheelOffset + 3) + '" y="-' + (bodyH/2 + 2) + '" width="' + rearWing + '" height="' + (bodyH + 4) + '" fill="' + darken(color) + '"/>' +
      // Body
      '<rect x="-' + (bodyW/2) + '" y="-' + (bodyH/2) + '" width="' + bodyW + '" height="' + bodyH + '" rx="3" fill="' + color + '"/>' +
      // Nose
      '<polygon points="' + (bodyW/2 + noseLen) + ',-3 ' + (bodyW/2) + ',-' + noseY + ' ' + (bodyW/2) + ',' + noseY + ' ' + (bodyW/2 + noseLen) + ',3" fill="' + color + '"/>' +
      // Driver
      '<circle cx="2" cy="0" r="' + driverR + '" fill="#0F1218"/>' +
      // Rear wheels
      '<rect x="-' + (wheelOffset) + '" y="-' + (bodyH/2 + 3) + '" width="' + wheelLen + '" height="4" rx="1" fill="#171A1F"/>' +
      '<rect x="-' + (wheelOffset) + '" y="' + (bodyH/2 - 1) + '" width="' + wheelLen + '" height="4" rx="1" fill="#171A1F"/>' +
      // Front wheels
      '<rect x="' + (bodyW/2 - 8) + '" y="-' + (bodyH/2 + 3) + '" width="' + (wheelLen - 1) + '" height="4" rx="1" fill="#171A1F"/>' +
      '<rect x="' + (bodyW/2 - 8) + '" y="' + (bodyH/2 - 1) + '" width="' + (wheelLen - 1) + '" height="4" rx="1" fill="#171A1F"/>' +
      '</g>';
  }

  function darken(hex) {
    // Quick rough darken — returns a darker variant for rear wing color.
    if (!hex || hex[0] !== '#') return '#1D5FB6';
    var m = hex.match(/^#([0-9a-f]{6})$/i);
    if (!m) return hex;
    var n = parseInt(m[1], 16);
    var r = Math.max(0, ((n >> 16) & 0xff) - 40);
    var g = Math.max(0, ((n >> 8) & 0xff) - 40);
    var b = Math.max(0, (n & 0xff) - 40);
    return '#' + pad2(r.toString(16)) + pad2(g.toString(16)) + pad2(b.toString(16));
  }

  // -----------------------------------------------------------------------
  // CONSTRUCTOR
  // -----------------------------------------------------------------------

  function RaceCircuit(target, options) {
    this.opts = merge(DEFAULTS, options || {});
    this.el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!this.el) {
      console.error('[RaceCircuit] target not found:', target);
      return;
    }
    this.id = uid();
    this.current = this.opts.startTurn;
    this.playing = this.opts.autoplay;
    this.timer = null;
    this.totalLength = 0;

    this._injectStyles();
    this._render();
    this._cacheRefs();
    this._positionStations();
    this._setupPassedPath();
    this._wire();
    this._renderState();
    if (this.playing) this._schedule();

    // Respect reduced motion
    if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.pause();
    }
  }

  // -----------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------

  RaceCircuit.prototype._injectStyles = function () {
    if (document.getElementById('race-circuit-styles')) return;
    var style = document.createElement('style');
    style.id = 'race-circuit-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  };

  RaceCircuit.prototype._render = function () {
    var o = this.opts;
    var titleHtml = o.title ? '<h3 class="rc-title">' + esc(o.title) + '</h3>' : '';

    var stationsSvg = o.turns.map(function (t, i) {
      var lap = i + 1;
      var isLast = lap === o.turns.length;
      var color = isLast ? '#34D399' : '#A1AAB8';
      return '<g class="rc-station" data-turn="' + lap + '" tabindex="0" role="button" aria-label="Jump to turn ' + lap + '">' +
        '<circle r="20" fill="#0F1218" stroke="' + color + '" stroke-width="2"/>' +
        '<text y="5" text-anchor="middle" fill="' + color + '" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">' + pad2(lap) + '</text>' +
        '</g>';
    }).join('');

    var compsSvg = o.competitors.map(function (c, i) {
      return carSvg('comp-' + i, c.color, c.glow, 1, false);
    }).join('');

    var brendenSvg = carSvg('brenden', o.brenden.color, o.brenden.glow, 1, true);

    var startFinishSvg = o.showStartFinish ?
      '<g data-role="start-finish" pointer-events="none">' +
      '<rect data-role="start-flag" x="0" y="0" width="6" height="46" fill="url(#' + this.id + '-checkers)" opacity="0.85"/>' +
      '<text data-role="start-flag-label" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#34D399" letter-spacing="0.12em" text-anchor="middle">START / FINISH</text>' +
      '</g>' : '';

    var defsSvg = '<defs>' +
      '<linearGradient id="' + this.id + '-gradient" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#1D5FB6"/>' +
      '<stop offset="100%" stop-color="#2578E4"/>' +
      '</linearGradient>' +
      (o.showStartFinish ? '<pattern id="' + this.id + '-checkers" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">' +
      '<rect width="6" height="6" fill="#E5E7EB"/>' +
      '<rect x="6" y="6" width="6" height="6" fill="#E5E7EB"/>' +
      '</pattern>' : '') +
      '</defs>';

    var svgHtml = '<svg viewBox="' + esc(o.viewBox) + '" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true">' +
      defsSvg +
      '<path data-role="track" d="' + esc(o.trackPath) + '" fill="none" stroke="#1A1F28" stroke-width="44" stroke-linejoin="round"/>' +
      '<path data-role="passed" d="' + esc(o.trackPath) + '" fill="none" stroke="url(#' + this.id + '-gradient)" stroke-width="44" stroke-linejoin="round" opacity="0.35" pointer-events="none"/>' +
      '<path d="' + esc(o.trackPath) + '" fill="none" stroke="#F5A623" stroke-width="2" stroke-dasharray="14 12" opacity="0.4" pointer-events="none"/>' +
      stationsSvg +
      compsSvg +
      brendenSvg +
      startFinishSvg +
      '</svg>';

    var controlsHtml = '';
    if (o.showControls) {
      controlsHtml = '<div class="rc-controls">' +
        '<button class="rc-ctrl" data-action="prev" aria-label="Previous">◀ PREV</button>' +
        (o.showProgress ? '<span class="rc-progress" data-role="progress">' + o.progressLabel + ' 1 / ' + o.turns.length + '</span>' : '') +
        '<button class="rc-ctrl rc-ctrl-play" data-action="playpause" aria-label="Pause or play">⏸ PAUSE</button>' +
        '<button class="rc-ctrl" data-action="next" aria-label="Next">NEXT ▶</button>' +
        '</div>';
    }

    var panelsHtml = '';
    if (o.showLapDisplay) {
      panelsHtml = '<div class="rc-display">' + o.turns.map(function (t, i) {
        var lap = i + 1;
        var isLast = lap === o.turns.length;
        var bodyHtml = t.body || '';   // allow HTML — caller's responsibility to escape
        var hookHtml = t.hook ? '<p class="rc-hook">' + esc(t.hook) + '</p>' : '';
        return '<div class="rc-panel' + (lap === 1 ? ' is-active' : '') + '" data-turn="' + lap + '">' +
          '<div class="rc-panel-head">' +
          '<span class="rc-telemetry">' + esc(t.telemetry || '') + '</span>' +
          '<span class="rc-tag' + (isLast ? ' rc-tag-finish' : '') + '">' +
          '<span class="rc-tag-label">' + esc(o.turnLabel) + '</span>' +
          '<span class="rc-tag-num">' + pad2(lap) + '</span>' +
          '</span>' +
          '</div>' +
          '<h3>' + esc(t.title || '') + '</h3>' +
          '<p>' + bodyHtml + '</p>' +
          hookHtml +
          '</div>';
      }).join('') + '</div>';
    }

    this.el.innerHTML = titleHtml + '<div class="rc"><div class="rc-svg-wrap">' + svgHtml + '</div>' + controlsHtml + panelsHtml + '</div>';
  };

  RaceCircuit.prototype._cacheRefs = function () {
    var el = this.el;
    this.refs = {
      svg: el.querySelector('svg'),
      path: el.querySelector('[data-role="track"]'),
      passedPath: el.querySelector('[data-role="passed"]'),
      brenden: el.querySelector('[data-car="brenden"]'),
      competitors: Array.prototype.slice.call(el.querySelectorAll('[data-car^="comp-"]')),
      stations: Array.prototype.slice.call(el.querySelectorAll('.rc-station')),
      panels: Array.prototype.slice.call(el.querySelectorAll('.rc-panel')),
      progress: el.querySelector('[data-role="progress"]'),
      startFlag: el.querySelector('[data-role="start-flag"]'),
      startFlagLabel: el.querySelector('[data-role="start-flag-label"]'),
      btnPlay: el.querySelector('[data-action="playpause"]'),
      btnPrev: el.querySelector('[data-action="prev"]'),
      btnNext: el.querySelector('[data-action="next"]')
    };
    if (this.refs.path && typeof this.refs.path.getTotalLength === 'function') {
      this.totalLength = this.refs.path.getTotalLength();
    }
  };

  RaceCircuit.prototype._positionStations = function () {
    if (!this.totalLength) return;
    var self = this;
    this.refs.stations.forEach(function (s) {
      var lap = parseInt(s.getAttribute('data-turn'), 10);
      var pct = self._brendenPctForLap(lap);
      var p = self.refs.path.getPointAtLength(self.totalLength * pct);
      s.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ',' + p.y.toFixed(2) + ')');
    });

    // Position start/finish flag perpendicular to track at turn 1
    if (this.refs.startFlag && this.refs.startFlagLabel && this.opts.showStartFinish) {
      var p0 = this.refs.path.getPointAtLength(this.totalLength * 0.005);
      var p1 = this.refs.path.getPointAtLength(this.totalLength * 0.02);
      var ang = Math.atan2(p1.y - p0.y, p1.x - p0.x) - Math.PI / 2;
      var fx = p0.x + Math.cos(ang) * 36;
      var fy = p0.y + Math.sin(ang) * 36;
      this.refs.startFlag.setAttribute('x', fx - 3);
      this.refs.startFlag.setAttribute('y', fy - 23);
      this.refs.startFlagLabel.setAttribute('x', fx);
      this.refs.startFlagLabel.setAttribute('y', fy - 28);
    }
  };

  RaceCircuit.prototype._setupPassedPath = function () {
    if (!this.refs.passedPath || !this.totalLength) return;
    this.refs.passedPath.setAttribute('stroke-dasharray', this.totalLength);
    this.refs.passedPath.setAttribute('stroke-dashoffset', this.totalLength);
    this.refs.passedPath.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(.22,.85,.3,1)';
  };

  // -----------------------------------------------------------------------
  // STATE — render the current turn
  // -----------------------------------------------------------------------

  RaceCircuit.prototype._brendenPctForLap = function (lap) {
    var lp = this.opts.lapPositions[lap - 1];
    if (lp && lp.length > 0) return lp[0];
    // Fallback: distribute lap stations evenly
    var n = this.opts.turns.length;
    return n > 1 ? (lap - 1) / (n - 1) * 0.9 + 0.05 : 0.5;
  };

  RaceCircuit.prototype._compPctForLap = function (lap, compIndex) {
    var lp = this.opts.lapPositions[lap - 1];
    if (lp && lp[compIndex + 1] != null) return lp[compIndex + 1];
    // Fallback: match brenden's pct
    return this._brendenPctForLap(lap);
  };

  RaceCircuit.prototype._carTransform = function (distance) {
    var L = this.totalLength;
    var d = Math.max(0, Math.min(L - 1, distance));
    var p1 = this.refs.path.getPointAtLength(d);
    var p2 = this.refs.path.getPointAtLength(Math.min(d + 6, L));
    var ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    return 'translate(' + p1.x.toFixed(2) + ',' + p1.y.toFixed(2) + ') rotate(' + ang.toFixed(2) + ')';
  };

  RaceCircuit.prototype._renderState = function () {
    if (!this.totalLength) return;
    var lap = this.current;
    var L = this.totalLength;

    // Brenden
    var brendenPct = this._brendenPctForLap(lap);
    if (this.refs.brenden) {
      this.refs.brenden.setAttribute('transform', this._carTransform(brendenPct * L));
    }

    // Competitors
    var self = this;
    this.refs.competitors.forEach(function (car, idx) {
      var pct = self._compPctForLap(lap, idx);
      car.setAttribute('transform', self._carTransform(pct * L));
    });

    // Passed track reveal
    if (this.refs.passedPath) {
      this.refs.passedPath.setAttribute('stroke-dashoffset', Math.max(L - brendenPct * L, 0));
    }

    // Stations
    this.refs.stations.forEach(function (s) {
      var sLap = parseInt(s.getAttribute('data-turn'), 10);
      s.classList.remove('is-active', 'is-passed');
      if (sLap < lap) s.classList.add('is-passed');
      if (sLap === lap) s.classList.add('is-active');
    });

    // Panels
    this.refs.panels.forEach(function (p) {
      var pLap = parseInt(p.getAttribute('data-turn'), 10);
      p.classList.toggle('is-active', pLap === lap);
    });

    // Progress label
    if (this.refs.progress) {
      this.refs.progress.textContent = this.opts.progressLabel + ' ' + lap + ' / ' + this.opts.turns.length;
    }

    if (typeof this.opts.onTurnChange === 'function') {
      this.opts.onTurnChange(lap);
    }
    if (lap === this.opts.turns.length && typeof this.opts.onComplete === 'function') {
      this.opts.onComplete();
    }
  };

  // -----------------------------------------------------------------------
  // CONTROLS
  // -----------------------------------------------------------------------

  RaceCircuit.prototype._wire = function () {
    var self = this;
    this.refs.stations.forEach(function (s) {
      s.addEventListener('click', function () {
        self.goTo(parseInt(s.getAttribute('data-turn'), 10));
      });
      s.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          self.goTo(parseInt(s.getAttribute('data-turn'), 10));
        }
      });
    });
    if (this.refs.btnPrev) this.refs.btnPrev.addEventListener('click', function () { self.prev(); });
    if (this.refs.btnNext) this.refs.btnNext.addEventListener('click', function () { self.next(); });
    if (this.refs.btnPlay) this.refs.btnPlay.addEventListener('click', function () { self.toggle(); });

    if (global.IntersectionObserver) {
      this._observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && self.playing) self._schedule();
          else clearTimeout(self.timer);
        });
      }, { threshold: 0.2 });
      this._observer.observe(this.el);
    }
  };

  RaceCircuit.prototype._schedule = function () {
    clearTimeout(this.timer);
    if (!this.playing) return;
    var self = this;
    var delay = this.current === this.opts.turns.length ? this.opts.finishDwellMs : this.opts.autoplayMs;
    this.timer = setTimeout(function () { self._advance(); }, delay);
  };

  RaceCircuit.prototype._advance = function () {
    this.current = this.current >= this.opts.turns.length ? 1 : this.current + 1;
    this._renderState();
    this._schedule();
  };

  RaceCircuit.prototype.goTo = function (lap) {
    if (lap < 1 || lap > this.opts.turns.length) return;
    this.current = lap;
    this._renderState();
    if (this.playing) this._schedule();
  };

  RaceCircuit.prototype.next = function () {
    this.goTo(this.current === this.opts.turns.length ? 1 : this.current + 1);
  };

  RaceCircuit.prototype.prev = function () {
    this.goTo(this.current === 1 ? this.opts.turns.length : this.current - 1);
  };

  RaceCircuit.prototype.play = function () {
    this.playing = true;
    if (this.refs.btnPlay) this.refs.btnPlay.textContent = '⏸ PAUSE';
    this._schedule();
  };

  RaceCircuit.prototype.pause = function () {
    this.playing = false;
    if (this.refs.btnPlay) this.refs.btnPlay.textContent = '▶ PLAY';
    clearTimeout(this.timer);
  };

  RaceCircuit.prototype.toggle = function () {
    if (this.playing) this.pause(); else this.play();
  };

  // Raw position setters (for self-assessment use case)
  RaceCircuit.prototype.setBrendenPosition = function (pct) {
    if (!this.totalLength || !this.refs.brenden) return;
    var d = Math.max(0, Math.min(1, pct)) * this.totalLength;
    this.refs.brenden.setAttribute('transform', this._carTransform(d));
    if (this.refs.passedPath) {
      this.refs.passedPath.setAttribute('stroke-dashoffset', Math.max(this.totalLength - d, 0));
    }
  };

  RaceCircuit.prototype.setCompetitorPosition = function (index, pct) {
    if (!this.totalLength) return;
    var car = this.refs.competitors[index];
    if (!car) return;
    var d = Math.max(0, Math.min(1, pct)) * this.totalLength;
    car.setAttribute('transform', this._carTransform(d));
  };

  RaceCircuit.prototype.getCurrentTurn = function () { return this.current; };
  RaceCircuit.prototype.isPlaying = function () { return this.playing; };

  RaceCircuit.prototype.destroy = function () {
    clearTimeout(this.timer);
    if (this._observer) this._observer.disconnect();
    this.el.innerHTML = '';
  };

  // -----------------------------------------------------------------------
  // STORY DATA — Brenden's canonical 8-turn pit-crew story.
  // Use as: RaceCircuit.create('#x', { turns: RaceCircuit.brendenTurns, ...brendenDefaults })
  // -----------------------------------------------------------------------

  var BRENDEN_TURNS = [
    { title: 'The Build', telemetry: 'DAY ONE · BUILT FROM ZERO', body: 'Brenden built ADS from the ground up — paper schematics, hand-drawn layouts, an owner who swept the floor at the end of every shift. He hired carefully, trained personally, and grew the shop one customer at a time. Working harder was the strategy.', hook: 'Working harder was the strategy. For a long while, it was enough.' },
    { title: 'The First Cracks', telemetry: 'EARLY WARNINGS · IGNORED', body: 'A missed date. A senior wireman muttering about retirement. A regular customer placing a smaller order than last quarter. The first cracks are easy to miss — they look like having a bad month. He chalked it up to volume, weather, the cycle.', hook: '"The first cracks are easy to miss."' },
    { title: 'The Vision', telemetry: '2014 · SPS DRIVES · NUREMBERG', body: 'Spring 2014. The panel building hall at SPS Drives. Software, automation, workflow, and manufacturing operating as one connected system. The future already existed. Most of us in the US just hadn\'t seen it yet.', hook: '"He thought he\'d found the lever. He hadn\'t. Not the whole one."' },
    { title: 'The CNC Misjudgment', telemetry: 'FIRST WRONG TURN · MACHINE BUY', body: 'He came home convinced the answer was horsepower. ADS bought its first Steinhauer ModCenter CNC. Precision arrived almost overnight — the kind of repeatability the shop had never delivered before.', hook: '"Precision wasn\'t the problem. The strategy was."' },
    { title: 'The Gradient', telemetry: 'PACE DROP · +10–20% / LAP', body: 'For two-and-a-half years, quality went up and throughput went up — and the bids kept coming back ten to twenty percent under. Competitors weren\'t cutting corners. They were better.', hook: '"Their margins were holding while their prices were dropping."' },
    { title: 'The Wrong Answers', telemetry: 'PIT FAILURE · × N', body: 'More automation. Consultants who left binders. Higher-skilled engineers. Three salespeople in two years. Longer hours behind the wheel. Heavier reliance on the senior wiremen carrying the production capability of the company.', hook: '"None of it moved the needle by a single point."' },
    { title: 'The Real Strategy', telemetry: 'REGROUP · ORDER OF OPS', body: 'It wasn\'t a part. It was an order of operations. Lean — see the waste. Standards — keep what works. Cell-based production. Employee engagement. <em>Then</em> EPLAN. <em>Then</em> automation.', hook: '"The goal was never to remove craftsmanship. The goal was to remove struggle."' },
    { title: 'Championship Pace', telemetry: 'CHECKERED FLAG · +70% PACE', body: 'Today ADS runs 70% faster than it did. Not because the driver works harder — because the crew works better. Engineering flows into manufacturing. Good people freed from broken processes return to craftsmanship.', hook: '"He already paid. The receipts are on the website."' }
  ];

  var BRENDEN_POSITIONS = [
    [0.05, 0.12, 0.09],
    [0.17, 0.24, 0.21],
    [0.29, 0.37, 0.33],
    [0.41, 0.53, 0.47],
    [0.53, 0.67, 0.60],
    [0.65, 0.77, 0.71],
    [0.77, 0.82, 0.79],
    [0.92, 0.84, 0.88]
  ];

  // -----------------------------------------------------------------------
  // PUBLIC API
  // -----------------------------------------------------------------------

  global.RaceCircuit = {
    create: function (target, options) { return new RaceCircuit(target, options); },
    brendenTurns: BRENDEN_TURNS,
    brendenPositions: BRENDEN_POSITIONS,
    DEFAULT_TRACK: DEFAULT_TRACK,
    DEFAULT_VIEWBOX: DEFAULT_VIEWBOX,
    version: '0.1.0'
  };

})(window);
