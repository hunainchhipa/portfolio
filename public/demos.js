// Self-playing product demos: HTML recreations of each app inside a browser frame.
// Each demo is a list of scenes; a scene renders its markup, then runs timed steps
// (cursor moves, clicks, typing, state changes) before handing over to the next scene.

const W = 1200;
const H = 750;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Small helpers ---------- */

const P = {
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M16 13H8M16 17H8"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  chevr: '<path d="m9 18 6-6-6-6"/>',
  chevl: '<path d="m15 18-6-6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrowl: '<path d="m12 19-7-7 7-7M19 12H5"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"/><circle cx="12" cy="13" r="3"/>',
  filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54Z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  shirt: '<path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2l.6 3.5a1 1 0 0 0 1 .8H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.2a1 1 0 0 0 1-.8l.6-3.5a2 2 0 0 0-1.3-2.2Z"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17M16 7h6v6"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S12.5 5 12 2.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z"/>',
  upright: '<path d="M7 17 17 7M7 7h10v10"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  more: '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7Z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  shapes: '<path d="M8.3 10a.7.7 0 0 1-.6-1.1l3.7-6a.7.7 0 0 1 1.2 0l3.7 6a.7.7 0 0 1-.6 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>',
  hatch: '<path d="M3 21 21 3M3 13 13 3M11 21 21 11"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 16V10M12 16V6M17 16v-4"/>',
  axes: '<path d="M4 4v16h16"/>',
  brush: '<path d="M9.06 11.9 17.5 3.5a2.1 2.1 0 0 1 3 3L12.1 14.9"/><path d="M7 14c-1.7 0-3 1.3-3 3 0 1.3-.7 2-2 2 1.5 1.3 3.2 2 5 2 2.8 0 5-2.2 5-5 0-1.1-.9-2-2-2Z"/>',
  bucket: '<path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5M2 13h15M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/>',
  legend: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  tag: '<path d="M12 2H2v10l9.3 9.3a1 1 0 0 0 1.4 0l8.6-8.6a1 1 0 0 0 0-1.4Z"/><circle cx="7" cy="7" r="1.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  copy: '<rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
};
const ic = (name, size = 14) =>
  `<svg class="i" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[name] || ""}</svg>`;

const fmt = (n) => Math.round(n).toLocaleString("en-US");
const fmtIN = (n) => Math.round(n).toLocaleString("en-IN");

// Deterministic wavy series so demos look the same on every load
function wave(n, base, amp, seed) {
  let s = seed * 9973;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: n }, (_, i) => base + Math.sin(i / 2.1 + seed) * amp * 0.55 + (rnd() - 0.5) * amp);
}

function smoothPath(pts) {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}
function toPts(vals, w, h, { max = Math.max(...vals), min = 0, padTop = 4, padBottom = 2 } = {}) {
  const step = w / (vals.length - 1);
  return vals.map((v, i) => [i * step, padTop + (1 - (v - min) / (max - min || 1)) * (h - padTop - padBottom)]);
}
function spark(vals, color, { w = 160, h = 34, d = 0 } = {}) {
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path class="draw" style="--d:${d}s" pathLength="1" d="${smoothPath(toPts(vals, w, h))}" fill="none" stroke="${color}" stroke-width="1.6"/></svg>`;
}
function donut(values, colors, { r = 46, sw = 22, label = "", value = "", dark = false } = {}) {
  const total = values.reduce((a, b) => a + b, 0);
  const c = 2 * Math.PI * r;
  let off = 0;
  const size = (r + sw) * 2;
  const arcs = values.map((v, i) => {
    const len = (v / total) * c;
    const seg = `<circle class="arc" style="--len:${len.toFixed(1)};--c:${c.toFixed(1)};--d:${(i * 0.18).toFixed(2)}s" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${colors[i]}" stroke-width="${sw}" stroke-dasharray="${len.toFixed(1)} ${c.toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>`;
    off += len;
    return seg;
  });
  return `<svg class="donut" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${arcs.join("")}
    <text x="50%" y="46%" text-anchor="middle" font-size="9" fill="${dark ? "#9aa3b2" : "#9ca3af"}">${label}</text>
    <text x="50%" y="60%" text-anchor="middle" font-size="16" font-weight="600" fill="${dark ? "#f3f4f6" : "#111827"}">${value}</text></svg>`;
}

const CURSOR = `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 3l14 7.5-6.2 1.6L10 18.5Z" fill="#111" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg><span class="d-ripple"></span>`;

/* ---------- Demo engine ---------- */

function createDemo(root, spec) {
  root.innerHTML = `
    <div class="d-window">
      <div class="d-bar">
        <span class="d-dots"><i></i><i></i><i></i></span>
        <div class="d-url">${ic("lock", 11)}<span></span></div>
      </div>
      <div class="d-view">
        <div class="d-stage" style="width:${W}px;height:${H}px">
          ${spec.scenes.map(() => '<div class="d-scene"></div>').join("")}
          <div class="d-cursor">${CURSOR}</div>
        </div>
      </div>
    </div>
    <div class="d-steps">
      ${spec.scenes.map((s, i) => `<button type="button" class="d-step" data-i="${i}" style="--dur:${s.dur}ms"><i></i>${s.label}</button>`).join("")}
    </div>`;

  const view = root.querySelector(".d-view");
  const stage = root.querySelector(".d-stage");
  const layers = [...root.querySelectorAll(".d-scene")];
  const chips = [...root.querySelectorAll(".d-step")];
  const urlEl = root.querySelector(".d-url span");
  const cursor = root.querySelector(".d-cursor");
  let scale = 1, cur = 0, timers = [], visible = false;

  const fit = () => {
    scale = view.clientWidth / W;
    stage.style.transform = `scale(${scale})`;
    view.style.height = `${H * scale}px`;
  };
  new ResizeObserver(fit).observe(view);
  fit();

  const clear = () => { timers.forEach(clearTimeout); timers = []; };
  const later = (fn, ms) => (reduceMotion ? fn() : timers.push(setTimeout(fn, ms)));

  function ctxFor(L) {
    const el = (sel) => (typeof sel === "string" ? L.querySelector(sel) : sel);
    return {
      q: (s) => L.querySelector(s),
      qa: (s) => [...L.querySelectorAll(s)],
      later,
      move(sel, { click = false, dx = 0, dy = 0 } = {}) {
        const t = el(sel);
        if (!t) return;
        const r = t.getBoundingClientRect(), sr = stage.getBoundingClientRect();
        const x = (r.left - sr.left) / scale + r.width / scale / 2 + dx;
        const y = (r.top - sr.top) / scale + r.height / scale / 2 + dy;
        cursor.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        if (click) later(() => { cursor.classList.remove("press"); void cursor.offsetWidth; cursor.classList.add("press"); }, 620);
      },
      type(sel, text, speed = 65) {
        const t = el(sel);
        if (!t) return;
        if (reduceMotion) { t.textContent = text; return; }
        let k = 0;
        t.classList.add("typing");
        const tick = () => {
          t.textContent = text.slice(0, ++k);
          if (k < text.length) timers.push(setTimeout(tick, speed));
          else timers.push(setTimeout(() => t.classList.remove("typing"), 400));
        };
        tick();
      },
      count(sel, to, { from = 0, ms = 900, f = fmt, prefix = "", suffix = "" } = {}) {
        const t = el(sel);
        if (!t) return;
        if (reduceMotion) { t.textContent = prefix + f(to) + suffix; return; }
        const frames = Math.max(1, Math.round(ms / 30));
        for (let k = 1; k <= frames; k++) {
          timers.push(setTimeout(() => {
            const p = 1 - Math.pow(1 - k / frames, 3);
            t.textContent = prefix + f(from + (to - from) * p) + suffix;
          }, k * 30));
        }
      },
      add: (sel, cls) => el(sel)?.classList.add(cls),
      rm: (sel, cls) => el(sel)?.classList.remove(cls),
      html: (sel, h) => { const t = el(sel); if (t) t.innerHTML = h; },
      text: (sel, h) => { const t = el(sel); if (t) t.textContent = h; },
    };
  }

  function play(i) {
    clear();
    cur = i;
    const scene = spec.scenes[i];
    layers.forEach((l, j) => {
      l.classList.toggle("on", j === i);
      if (j !== i) setTimeout(() => { if (cur !== j) l.innerHTML = ""; }, 500);
    });
    chips.forEach((c, j) => {
      c.classList.toggle("on", j === i);
      c.classList.remove("run");
    });
    const L = layers[i];
    L.innerHTML = scene.html();
    urlEl.textContent = scene.url;
    const ctx = ctxFor(L);
    if (reduceMotion || !visible) {
      if (reduceMotion) scene.steps.forEach(([, fn]) => fn(ctx));
      return;
    }
    void chips[i].offsetWidth;
    chips[i].classList.add("run");
    scene.steps.forEach(([t, fn]) => timers.push(setTimeout(() => fn(ctx), t)));
    timers.push(setTimeout(() => play((i + 1) % spec.scenes.length), scene.dur));
  }

  chips.forEach((c) => c.addEventListener("click", () => play(+c.dataset.i)));

  new IntersectionObserver(
    ([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) play(cur);
      if (!visible && was) { clear(); chips.forEach((c) => c.classList.remove("run")); }
    },
    { threshold: 0.3 }
  ).observe(root);

  play(0);
}

/* ======================================================================
   Vizantra
   ====================================================================== */

const VZ = "#4f46e5";
const vzLogo = `<svg width="20" height="18" viewBox="0 0 24 22"><path d="M1 1h6l5 11 5-11h6L14 21h-4Z" fill="${VZ}"/><path d="M7 1h4l1 2.5L10 8Z" fill="#a5b4fc"/></svg>`;

function vzShell(tab, body, { sub = "" } = {}) {
  const tabs = ["Dashboards", "Reports", "Schedules", "Data Sources"];
  return `<div class="vz">
    <aside class="vz-side">
      <div class="vz-logo">${vzLogo}Vizantra</div>
      <div class="vz-sec">ANALYSIS</div>
      <div class="vz-nav">${ic("dashboard")}Dashboard</div>
      <div class="vz-nav on">${ic("users")}Clients</div>
      <div class="vz-nav">${ic("file")}Reports</div>
      <div class="vz-sec">MANAGEMENT</div>
      <div class="vz-nav">${ic("settings")}Settings</div>
      <div class="vz-user"><span class="vz-av">A</span><div><b>Acme Agency</b><small>hello@acmeagency.com</small></div></div>
    </aside>
    <main class="vz-main">
      <header class="vz-head">
        <div class="vz-crumb">Clients ${ic("chevr", 12)} <b><span class="vz-chip">A</span>Acme Corp ${ic("chev", 12)}</b></div>
        <nav class="vz-tabs">${tabs.map((t) => `<span class="vz-tab${t === tab ? " on" : ""}">${t}</span>`).join("")}</nav>
      </header>
      <div class="vz-wrap">${sub}<div class="vz-body">${body}</div></div>
    </main>
  </div>`;
}

const vzSources = [
  ["Google Analytics 4", '<span class="lg lg-ga"><i></i><i></i><i></i></span>'],
  ["Google Search Console", '<span class="lg lg-gsc">G</span>'],
  ["Google Ads", '<span class="lg lg-ads"><i></i><i></i></span>'],
  ["Meta Ads", '<span class="lg lg-meta">∞</span>'],
  ["Instagram", '<span class="lg lg-ig"><i></i></span>'],
];

const vzConnect = {
  label: "Connect",
  url: "app.vizantra.com/clients/acme-corp/data-sources",
  dur: 6200,
  html: () =>
    vzShell(
      "Data Sources",
      `<div class="vz-row"><div><h4 class="vz-h">Data Sources</h4><p class="vz-sub">Connected accounts that feed dashboards and reports for this client.</p></div>
        <span class="vz-btn pri" id="vz-connect">${ic("plus", 13)}Connect Data Source</span></div>
       <div class="vz-filters"><span class="vz-input">${ic("search", 13)}Search data sources</span><span class="vz-btn">All sources ${ic("chev", 12)}</span><span class="vz-btn">All statuses ${ic("chev", 12)}</span></div>
       <table class="vz-table"><thead><tr><th>Data source</th><th>Account</th><th>Status</th><th>Last sync</th></tr></thead><tbody>
        ${vzSources.map(([n, logo], i) => `<tr data-r="${i}"><td><span class="vz-src">${logo}${n}</span></td><td class="acc">—</td><td><span class="vz-pill">Not connected</span></td><td class="sync">—</td></tr>`).join("")}
       </tbody></table>
       <div class="vz-menu vz-acc" hidden>
         <div class="vz-mlabel">SELECT ACCOUNT</div>
         <div class="vz-opt" id="vz-acc1">Acme Corp — Main site</div>
         <div class="vz-opt">Acme Corp — Blog</div>
       </div>`
    ),
  steps: [
    [500, (c) => c.move("#vz-connect", { click: true })],
    [1250, (c) => { c.q(".vz-acc").hidden = false; }],
    [1500, (c) => c.move("#vz-acc1", { click: true })],
    [1900, (c) => c.add("#vz-acc1", "hl")],
    [2300, (c) => {
      c.q(".vz-acc").hidden = true;
      c.qa("tbody tr").forEach((tr, i) => {
        c.later(() => {
          tr.querySelector(".acc").textContent = i < 3 ? "Acme Corp — Main site" : "@acmecorp";
          tr.querySelector(".vz-pill").outerHTML = '<span class="vz-pill sync"><span class="spin"></span>Syncing</span>';
        }, i * 380);
        c.later(() => {
          tr.querySelector(".vz-pill").outerHTML = `<span class="vz-pill ok">${ic("check", 11)}Connected</span>`;
          tr.querySelector(".sync").textContent = "Just now";
          tr.classList.add("flash");
        }, i * 380 + 700);
      });
    }],
    [2600, (c) => c.move("tbody tr:nth-child(3) .vz-src", { dx: 160 })],
  ],
};

function vzKpis(dark = false) {
  const k = [
    ["Organic Clicks", 12438, "12,438", wave(30, 40, 22, 1)],
    ["Impressions", 328000, "328K", wave(30, 40, 18, 2)],
    ["Avg. CTR", 3.8, "3.8%", wave(30, 40, 30, 3)],
    ["Avg. Position", 14.2, "14.2", wave(30, 40, 16, 4)],
  ];
  return `<div class="vz-kpis">${k
    .map(([n, , v, s], i) => `<div class="vz-card vz-kpi"><div class="vz-kh">${ic("search", 11)}<span>${n}</span><b>${v}</b></div><div class="vz-kv" data-k="${i}">${v}</div>${spark(s, dark ? "#8b83ff" : "#6d63f6", { d: 0.2 + i * 0.15 })}</div>`)
    .join("")}</div>`;
}

function vzLineCard(title, val, vals, { w = 360, h = 120, dark = false, id = "" } = {}) {
  const pts = toPts(vals, w, h, { max: Math.max(...vals) * 1.15 });
  const grid = [0, 1, 2].map((g) => `<line x1="0" x2="${w}" y1="${4 + g * ((h - 6) / 2)}" y2="${4 + g * ((h - 6) / 2)}" stroke="${dark ? "#353b4a" : "#f0f1f4"}"/>`).join("");
  const labels = ["01 Sep", "05 Sep", "09 Sep", "13 Sep", "17 Sep", "21 Sep", "25 Sep", "29 Sep"];
  return `<div class="vz-card vz-line" ${id ? `id="${id}"` : ""}><div class="vz-kh">${ic("search", 11)}<span>${title}</span><b>${val}</b></div>
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="vz-linesvg">${grid}
      <path d="${smoothPath(pts)} L${w} ${h} L0 ${h}Z" fill="${VZ}" opacity=".07" class="fadein"/>
      <path class="draw" style="--d:.4s;--t:1.8s" pathLength="1" d="${smoothPath(pts)}" fill="none" stroke="${dark ? "#8b83ff" : "#6d63f6"}" stroke-width="2"/>
    </svg>
    <div class="vz-x">${labels.map((l) => `<span>${l}</span>`).join("")}</div>
    <div class="vz-tip" hidden><b>12 Sep</b><span><i></i>486 clicks</span></div></div>`;
}

const vzDashboard = {
  label: "Dashboard",
  url: "app.vizantra.com/clients/acme-corp/dashboards/seo-overview",
  dur: 7200,
  html: () =>
    vzShell(
      "Dashboards",
      `<div class="vz-row tight"><span class="vz-btn sel"><span class="dotc"></span>SEO Overview ${ic("chev", 12)}</span>
         <div class="vz-actions"><span class="vz-btn">${ic("share", 12)}Share</span><span class="vz-btn">${ic("edit", 12)}Edit</span><span class="vz-btn" id="vz-range">${ic("calendar", 12)}<span class="lbl">This Month</span></span></div></div>
       <div class="vz-menu vz-rangemenu" hidden><div class="vz-opt">Last 7 days</div><div class="vz-opt">This Month</div><div class="vz-opt" id="vz-q">Last Quarter</div><div class="vz-opt">Custom range…</div></div>
       <h4 class="vz-h sm">Organic Performance</h4><p class="vz-sub">How much traffic search is sending, and whether visibility is turning into clicks.</p>
       ${vzKpis()}
       <div class="vz-two">${vzLineCard("Organic Clicks", "12,438", wave(30, 420, 160, 7), { id: "vz-clicks" })}${vzLineCard("Impressions", "328K", wave(30, 10, 4, 9))}</div>
       <h4 class="vz-h sm">Devices</h4><p class="vz-sub">How search performance differs between desktop, mobile and tablet.</p>
       <div class="vz-three">
         <div class="vz-card vz-dev"><div class="vz-kh"><span>Organic Clicks <em>by Device</em></span></div>${donut([62, 30, 8], ["#c7c3fb", "#a7e3c9", "#f9d3a5"], { label: "Organic Clicks", value: "12,438", r: 38, sw: 18 })}</div>
         <div class="vz-card vz-dev"><div class="vz-kh"><span>Avg. CTR <em>by Device</em></span></div><div class="vz-vbars">${[[70, "#7c74f4"], [92, "#34c38f"], [40, "#f5a54a"]].map(([v, col], i) => `<span class="grow" style="--d:${0.3 + i * 0.12}s;height:${v}%;background:${col}"></span>`).join("")}</div><div class="vz-x c3"><span>DESKTOP</span><span>MOBILE</span><span>TABLET</span></div></div>
         <div class="vz-card vz-dev"><div class="vz-kh"><span>Avg. Position <em>by Device</em></span></div><div class="vz-vbars">${[[55, "#7c74f4"], [68, "#34c38f"], [86, "#f5a54a"]].map(([v, col], i) => `<span class="grow" style="--d:${0.45 + i * 0.12}s;height:${v}%;background:${col}"></span>`).join("")}</div><div class="vz-x c3"><span>DESKTOP</span><span>MOBILE</span><span>TABLET</span></div></div>
       </div>`,
      {
        sub: `<div class="vz-subnav"><div class="vz-sec">ANALYSIS</div><div class="vz-nav on sm">Dashboards</div><div class="vz-sec">DATA SOURCES</div>
          <div class="vz-tree"><span>Analytics ${ic("chev", 10)}</span><span class="l1">Google Analytics ${ic("chev", 10)}</span><span class="l2">Acme Corp · GA4 ${ic("chev", 10)}</span><span class="l3">Acquisition ${ic("chev", 10)}</span><span class="l4">All</span><span class="l4">Organic Search</span><span class="l4">Paid Search</span><span class="l4">Direct</span><span class="l3">Audience</span><span class="l3">Conversions</span><span class="l3">Pages</span><span class="l3">Events</span></div></div>`,
      }
    ),
  steps: [
    [300, (c) => {
      c.count('[data-k="0"]', 12438, { ms: 1100 });
      c.count('[data-k="1"]', 328, { ms: 1100, suffix: "K" });
      c.count('[data-k="2"]', 3.8, { ms: 1100, f: (n) => n.toFixed(1), suffix: "%" });
      c.count('[data-k="3"]', 14.2, { ms: 1100, f: (n) => n.toFixed(1) });
    }],
    [1700, (c) => c.move("#vz-clicks .vz-linesvg", { dx: -40, dy: 4 })],
    [2300, (c) => { const t = c.q("#vz-clicks .vz-tip"); t.hidden = false; }],
    [3400, (c) => { c.q("#vz-clicks .vz-tip").hidden = true; c.move("#vz-range", { click: true }); }],
    [4100, (c) => { c.q(".vz-rangemenu").hidden = false; }],
    [4400, (c) => c.move("#vz-q", { click: true })],
    [4800, (c) => c.add("#vz-q", "hl")],
    [5200, (c) => {
      c.q(".vz-rangemenu").hidden = true;
      c.text("#vz-range .lbl", "Last Quarter");
      c.count('[data-k="0"]', 36912, { from: 12438, ms: 900 });
      c.count('[data-k="1"]', 941, { from: 328, ms: 900, suffix: "K" });
      c.count('[data-k="2"]', 3.9, { from: 3.8, ms: 900, f: (n) => n.toFixed(1), suffix: "%" });
      c.count('[data-k="3"]', 13.6, { from: 14.2, ms: 900, f: (n) => n.toFixed(1) });
    }],
  ],
};

const vzReport = {
  label: "Report",
  url: "app.vizantra.com/clients/acme-corp/reports/march-performance-report",
  dur: 7600,
  html: () => `<div class="vz vz-report">
      <div class="vz-rtop"><span class="vz-back">${ic("arrowl", 13)}Reports</span><b>March Performance Report</b>
        <div class="vz-actions"><span class="vz-btn pri" id="vz-share">${ic("share", 12)}Share</span><span class="vz-btn">${ic("calendar", 12)}This Month</span></div></div>
      <div class="vz-rbody">
        <aside class="vz-pages"><span class="vz-btn pri full">${ic("plus", 12)}Add Page</span>
          ${["Cover", "Traffic Overview", "Acquisition", "Devices", "Top Queries"].map((p, i) => `<div class="vz-page${i === 1 ? " on" : ""}"><span>${i + 1}.</span>${p}</div>`).join("")}</aside>
        <section class="vz-canvaswrap"><div class="vz-crumbs">Page 2 › Traffic Overview</div>
          <div class="vz-paper" id="vz-paper">
            <div class="vz-ptitle">Traffic Overview <small>Acme Corp · March 2026</small></div>
            <div class="vz-pkpis" id="vz-pk">
              <div class="vz-card vz-kpi"><div class="vz-kh"><span>Active Users</span></div><div class="vz-kv">18,204</div>${spark(wave(24, 40, 20, 11), "#6d63f6", { d: 0.2 })}</div>
              <div class="vz-card vz-kpi"><div class="vz-kh"><span>Sessions</span></div><div class="vz-kv">26,931</div>${spark(wave(24, 40, 20, 12), "#6d63f6", { d: 0.35 })}</div>
              <div class="vz-card vz-kpi"><div class="vz-kh"><span>Engagement Rate</span></div><div class="vz-kv">61.4%</div>${spark(wave(24, 40, 20, 13), "#6d63f6", { d: 0.5 })}</div>
              <div class="vz-card vz-kpi vz-slot" id="vz-slot"><span>Drop a metric here</span></div>
            </div>
            ${vzLineCard("Sessions", "26,931", wave(30, 900, 300, 14), { w: 520, h: 130 })}
          </div></section>
        <aside class="vz-metrics"><div class="vz-mtabs"><span class="on">Metrics</span><span>Content</span></div>
          <span class="vz-input">${ic("search", 12)}Search…</span><span class="vz-btn full">Source: All ${ic("chev", 11)}</span>
          <div class="vz-mgroup">ACME CORP · GA4</div>
          <div class="vz-mi l0">${ic("chev", 10)}Users</div>
          <div class="vz-mi">Active Users</div><div class="vz-mi">Total Users</div><div class="vz-mi" id="vz-new">New Users</div>
          <div class="vz-mi l0">${ic("chevr", 10)}Sessions</div><div class="vz-mi l0">${ic("chevr", 10)}Engagement</div><div class="vz-mi l0">${ic("chevr", 10)}Events</div><div class="vz-mi l0">${ic("chevr", 10)}Key Events</div><div class="vz-mi l0">${ic("chevr", 10)}Ecommerce</div>
          <small class="vz-hint">Drag onto the canvas to add</small></aside>
      </div>
      <div class="vz-ghost" hidden>${ic("plus", 11)}New Users</div>
      <div class="vz-toast" hidden>${ic("check", 13)}Share link copied · vizantra.com/r/acme-march</div>
    </div>`,
  steps: [
    [500, (c) => c.move("#vz-new")],
    [1300, (c) => { c.add("#vz-new", "hl"); const g = c.q(".vz-ghost"); const r = c.q("#vz-new"); const m = r.closest(".vz-metrics"); g.style.left = m.offsetLeft + r.offsetLeft + 10 + "px"; g.style.top = m.offsetTop + r.offsetTop - 4 + "px"; g.hidden = false; }],
    [1500, (c) => {
      c.move("#vz-slot");
      const g = c.q(".vz-ghost"), s = c.q("#vz-slot");
      g.classList.add("fly");
      g.style.left = s.offsetLeft + 30 + "px";
      g.style.top = s.offsetTop + 30 + "px";
      c.add("#vz-slot", "target");
    }],
    [2400, (c) => {
      c.q(".vz-ghost").hidden = true;
      c.rm("#vz-new", "hl");
      c.q("#vz-slot").outerHTML = `<div class="vz-card vz-kpi pop"><div class="vz-kh"><span>New Users</span></div><div class="vz-kv" id="vz-nu">0</div>${spark(wave(24, 40, 20, 15), "#6d63f6", { d: 0.1 })}</div>`;
      c.count("#vz-nu", 9842, { ms: 900 });
    }],
    [4000, (c) => c.move("#vz-share", { click: true })],
    [4700, (c) => { c.q(".vz-toast").hidden = false; }],
  ],
};

const vzSchedule = {
  label: "Schedule",
  url: "app.vizantra.com/clients/acme-corp/report-schedules",
  dur: 8200,
  html: () =>
    vzShell(
      "Schedules",
      `<div class="vz-row"><div><h4 class="vz-h">Report Schedules</h4><p class="vz-sub">Email reports to your client's inbox, on a cadence you choose.</p></div>
         <span class="vz-btn pri" id="vz-new-s">${ic("plus", 13)}New Schedule</span></div>
       <div class="vz-filters"><span class="vz-input">${ic("search", 13)}Search schedules…</span><span class="vz-btn">All statuses ${ic("chev", 12)}</span><span class="vz-count">Showing 0 of 0</span></div>
       <table class="vz-table"><thead><tr><th>Schedule</th><th>Report</th><th>Recipients</th><th>Next send</th><th>Status</th></tr></thead>
        <tbody><tr class="empty"><td colspan="5"><div class="vz-empty">${ic("mail", 22)}<b>No schedules yet</b><span>Create one to deliver reports automatically.</span></div></td></tr></tbody></table>
       <div class="vz-modal" hidden><div class="vz-dialog">
         <div class="vz-dh"><b>New schedule</b>${ic("x", 14)}</div>
         <label>Report</label><span class="vz-field">March Performance Report ${ic("chev", 12)}</span>
         <label>Frequency</label><div class="vz-seg"><span>Daily</span><span class="on" id="vz-weekly">Weekly</span><span>Monthly</span></div>
         <div class="vz-2col"><div><label>Day</label><span class="vz-field">Monday ${ic("chev", 12)}</span></div><div><label>Time</label><span class="vz-field">9:00 AM ${ic("chev", 12)}</span></div></div>
         <label>Recipients</label><span class="vz-field" id="vz-rcpt"><span class="t"></span></span>
         <div class="vz-df"><span class="vz-btn">Cancel</span><span class="vz-btn pri" id="vz-create">Create schedule</span></div>
       </div></div>
       <div class="vz-toast" hidden>${ic("check", 13)}Schedule created. Next report goes out Monday at 9:00 AM.</div>`
    ),
  steps: [
    [500, (c) => c.move("#vz-new-s", { click: true })],
    [1200, (c) => { c.q(".vz-modal").hidden = false; }],
    [1700, (c) => c.move("#vz-rcpt", { click: true })],
    [2400, (c) => { c.add("#vz-rcpt", "focus"); c.type("#vz-rcpt .t", "sarah@acmecorp.com", 60); }],
    [4000, (c) => c.move("#vz-create", { click: true })],
    [4700, (c) => {
      c.q(".vz-modal").hidden = true;
      c.html("tbody", `<tr class="rowin"><td>Every Monday at 9:00 AM</td><td>March Performance Report</td><td>sarah@acmecorp.com</td><td>Oct 19, 2026, 9:00 AM</td><td><span class="vz-pill ok">Active</span></td></tr>`);
      c.text(".vz-count", "Showing 1 of 1");
      c.q(".vz-toast").hidden = false;
    }],
  ],
};

const vzPortal = {
  label: "Client portal",
  url: "app.vizantra.com/portal/acme-corp/dashboards/seo-overview",
  dur: 6200,
  html: () => `<div class="vz dark vz-portal">
      <div class="vz-ptop"><span class="vz-chip lg">A</span><b>Acme Agency</b><span class="vz-btn dk">${ic("calendar", 12)}This Month</span></div>
      <div class="vz-pbody">
        <h3>Acme Corp</h3><p class="vz-url">${ic("globe", 11)}https://acmecorp.com/</p>
        <h4 class="vz-h sm">Organic Performance</h4><p class="vz-sub">How much traffic search is sending, and whether visibility is turning into clicks.</p>
        ${vzKpis(true)}
        <div class="vz-two wide">${vzLineCard("Organic Clicks", "12,438", wave(30, 420, 160, 7), { dark: true, w: 520, h: 170, id: "vz-pl" })}
          <div class="vz-card vz-dev"><div class="vz-kh"><span>Organic Clicks <em>by Device</em></span></div>${donut([62, 30, 8], ["#6b63c9", "#2f7d5f", "#8a6a3c"], { label: "Clicks", value: "12,438", r: 52, sw: 22, dark: true })}
            <div class="vz-legend"><span><i style="background:#7c74f4"></i>DESKTOP</span><span><i style="background:#34c38f"></i>MOBILE</span><span><i style="background:#f5a54a"></i>TABLET</span></div></div></div>
      </div></div>`,
  steps: [
    [300, (c) => {
      c.count('[data-k="0"]', 12438, { ms: 1100 });
      c.count('[data-k="1"]', 328, { ms: 1100, suffix: "K" });
      c.count('[data-k="2"]', 3.8, { ms: 1100, f: (n) => n.toFixed(1), suffix: "%" });
      c.count('[data-k="3"]', 14.2, { ms: 1100, f: (n) => n.toFixed(1) });
    }],
    [1800, (c) => c.move("#vz-pl .vz-linesvg", { dx: -60 })],
    [2500, (c) => { c.q("#vz-pl .vz-tip").hidden = false; }],
    [4200, (c) => c.move(".vz-legend span:nth-child(2)")],
  ],
};

/* ======================================================================
   StyleCreation (names and figures are illustrative)
   ====================================================================== */

function scShell(active, body) {
  const item = (name, icon, sub = false) => `<div class="sc-nav${sub ? " sub" : ""}${name === active ? " on" : ""}">${ic(icon, 13)}${name}</div>`;
  return `<div class="sc">
    <aside class="sc-side">
      <div class="sc-logo">STYLE CREATION <span>«</span></div>
      ${item("Dashboard", "dashboard")}${item("Entries", "file")}
      <div class="sc-nav">${ic("box", 13)}Resources <em>${ic("chev", 11)}</em></div>
      ${item("Brands", "users", true)}${item("Washers", "droplet", true)}${item("Thread Cutter", "scissors", true)}${item("Stitcher", "scissors", true)}${item("Printer", "file", true)}${item("Products", "shirt", true)}${item("Accessories", "tag", true)}${item("Fits", "shirt", true)}${item("Packing Materials", "box", true)}
      <div class="sc-nav">${ic("file", 13)}Challan <em>${ic("chev", 11)}</em></div>
      ${item("Challans", "file", true)}${item("Bundle Items", "layers", true)}
      ${item("User Management", "user")}
      <div class="sc-user"><span>A</span><div><b>Admin</b><small>admin@factory.in</small></div></div>
    </aside>
    <main class="sc-main">${body}</main>
  </div>`;
}

const scLots = [
  ["L-979", "17/10/2026", "1 days", "Urban Loom", 402, 25, "3993-abd", "Aqua Wash Co.", 3],
  ["L-978", "17/10/2026", "1 days", "Urban Loom", 560, 25, "3992-abcd", "Aqua Wash Co.", 4],
  ["L-977", "17/10/2026", "1 days", "Northwind Denim", 432, 25, "1715-1719", "Riverstone Wash", 3],
  ["L-976", "17/10/2026", "1 days", "Northwind Denim", 466, 25, "310-313", "Riverstone Wash", 3],
  ["L-975", "16/10/2026", "2 days", "Kaya Wear", 266, 20, "362", "Blue Harbor Wash", 3],
  ["L-974", "16/10/2026", "2 days", "Kaya Wear", 266, 20, "361", "Blue Harbor Wash", 3],
  ["L-973", "16/10/2026", "2 days", "Urban Loom", 506, 25, "3858", "Aqua Wash Co.", 4],
];

const scDashboard = {
  label: "Dashboard",
  url: "stylecreation.in/dashboard",
  dur: 6600,
  html: () => {
    const kpis = [
      ["Total Inward", 18420, "₹4,60,500", "box", "#3b82f6"],
      ["Total Processed", 14960, "₹3,74,000", "check", "#10b981"],
      ["Pending Processing", 3460, "₹86,500", "clock", "#f59e0b"],
      ["Total Delivered", 13880, "", "check", "#10b981"],
      ["Pending Delivery", 1080, "", "clock", "#f59e0b"],
      ["Total Outward", 13700, "", "box", "#6366f1"],
      ["Factory Ready Stock", 240, "", "layers", "#a855f7"],
    ];
    const status = [["Delivered", 41, "#10b981"], ["In Progress", 22, "#3b82f6"], ["Not Started", 4, "#6b7280"], ["Ready Stock", 3, "#a855f7"], ["Rework", 1, "#ef4444"]];
    const pending = [["Pressed Samples", 1840], ["Unpressed Samples", 96], ["Washing", 620], ["Alter", 34], ["Printing", 12]];
    const inward = [0, 1640, 980, 420, 1260, 760, 2050, 1320, 1980, 2840, 360, 1240, 1610, 1890, 2120, 1760];
    const delivered = [0, 1180, 1620, 210, 540, 1320, 2380, 1150, 140, 1460, 90, 1280, 1380, 1720, 1540, 1980];
    const w = 900, h = 170, max = 3200;
    const pi = toPts(inward, w, h, { max }), pd = toPts(delivered, w, h, { max });
    return scShell(
      "Dashboard",
      `<div class="sc-top"><h2>Dashboard</h2><div class="sc-actions"><span class="sc-btn">Lot ${ic("chev", 11)}</span><span class="sc-btn">${ic("filter", 12)}Filters</span></div></div>
       <div class="sc-row"><span class="sc-chip">68 Lots</span><span class="sc-month">${ic("chevl", 13)}<b>October 2026</b>${ic("chevr", 13)}</span></div>
       <div class="sc-kpis">${kpis.map(([n, v, m, i, col], k) => `<div class="sc-card sc-kpi"><div class="sc-kh"><span>${n}</span><em style="color:${col}">${ic(i, 12)}</em></div><b data-k="${k}">0</b>${m ? `<small>${m}</small>` : ""}</div>`).join("")}</div>
       <div class="sc-grid2">
         <div class="sc-card"><div class="sc-ch"><b>Lot Status Overview</b><span class="sc-chip sm">71 total</span></div>
           <div class="sc-hbars">${status.map(([n, v, col], i) => `<div class="sc-hb" ${i === 1 ? 'id="sc-prog"' : ""}><span>${n}</span><div><i class="growx" style="--d:${0.2 + i * 0.1}s;width:${(v / 45) * 100}%;background:${col}"></i><em>${v}</em></div></div>`).join("")}</div>
           <p class="sc-note">Click on any row to view lot details</p><div class="sc-tip" hidden><b>In Progress</b>22 lots · 9,120 pieces</div></div>
         <div class="sc-card"><div class="sc-ch"><b>Process Pending Items</b></div>
           <div class="sc-hbars">${pending.map(([n, v], i) => `<div class="sc-hb"><span>${n}</span><div><i class="growx" style="--d:${0.3 + i * 0.1}s;width:${Math.max(1, (v / 2000) * 100)}%;background:#3b82f6"></i><em>${fmt(v)}</em></div></div>`).join("")}</div>
           <p class="sc-note">Click on any row to view lot-wise pending details</p></div>
       </div>
       <div class="sc-card sc-area"><div class="sc-ch"><b>Daily Production Overview</b><span class="sc-btn">Daily ${ic("chev", 11)}</span></div>
         <svg viewBox="0 0 ${w} ${h + 10}" class="sc-areasvg">
           <defs><linearGradient id="scg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b82f6" stop-opacity=".35"/><stop offset="1" stop-color="#3b82f6" stop-opacity=".02"/></linearGradient>
           <linearGradient id="scg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#10b981" stop-opacity=".35"/><stop offset="1" stop-color="#10b981" stop-opacity=".02"/></linearGradient></defs>
           ${[0, 1, 2, 3].map((g) => `<line x1="0" x2="${w}" y1="${4 + g * ((h - 6) / 3)}" y2="${4 + g * ((h - 6) / 3)}" stroke="#f1f2f4"/>`).join("")}
           <path class="fadein" d="${smoothPath(pi)} L${w} ${h} L0 ${h}Z" fill="url(#scg1)"/><path class="fadein" d="${smoothPath(pd)} L${w} ${h} L0 ${h}Z" fill="url(#scg2)"/>
           <path class="draw" style="--d:.3s;--t:1.6s" pathLength="1" d="${smoothPath(pi)}" fill="none" stroke="#3b82f6" stroke-width="2"/>
           <path class="draw" style="--d:.5s;--t:1.6s" pathLength="1" d="${smoothPath(pd)}" fill="none" stroke="#10b981" stroke-width="2"/>
           ${pi.map((p, i) => (i % 3 === 1 ? `<g class="fadein" style="--d:${1.4 + i * 0.03}s"><rect x="${p[0] - 16}" y="${p[1] - 17}" width="32" height="13" rx="2" fill="#3b82f6"/><text x="${p[0]}" y="${p[1] - 7.5}" text-anchor="middle" font-size="8.5" fill="#fff">${fmt(inward[i])}</text></g>` : "")).join("")}
         </svg>
         <div class="sc-legend"><span><i style="background:#3b82f6"></i>Inward</span><span><i style="background:#10b981"></i>Delivered</span></div></div>`
    );
  },
  steps: [
    [200, (c) => {
      const vals = [18420, 14960, 3460, 13880, 1080, 13700, 240];
      vals.forEach((v, k) => c.count(`[data-k="${k}"]`, v, { ms: 1000 }));
    }],
    [1800, (c) => c.move("#sc-prog i", { dx: 20 })],
    [2500, (c) => { c.add("#sc-prog", "hl"); c.q(".sc-tip").hidden = false; }],
    [4000, (c) => { c.rm("#sc-prog", "hl"); c.q(".sc-tip").hidden = true; c.move(".sc-areasvg", { dx: 120, dy: -20 }); }],
  ],
};

const scEntries = {
  label: "Entries",
  url: "stylecreation.in/entries",
  dur: 6800,
  html: () =>
    scShell(
      "Entries",
      `<div class="sc-top"><h2>Entries</h2><div class="sc-actions"><span class="sc-icon on">${ic("list", 13)}</span><span class="sc-icon">${ic("grid", 13)}</span><span class="sc-icon">${ic("download", 13)}</span><span class="sc-btn dark">Add Entry</span></div></div>
       <div class="sc-search-row"><span class="sc-search" id="sc-search">${ic("search", 13)}<span class="t ph">Search by lot, brand, washer, product, thread cutter, stitcher, article, inwards…</span></span><span class="sc-btn">Lot ${ic("chev", 11)}</span><span class="sc-btn">${ic("filter", 12)}Filters</span></div>
       <div class="sc-row"><div class="sc-chips"><span class="sc-chip" id="sc-c1">68 Lots</span><span class="sc-chip" id="sc-c2">18,420 Inwards</span><span class="sc-chip">1,080 Pending</span></div><span class="sc-month">${ic("chevl", 13)}<b>October 2026</b>${ic("chevr", 13)}</span></div>
       <div class="sc-card sc-tablecard"><table class="sc-table"><thead><tr><th>Image</th><th>Status / Type</th><th>Lot No.</th><th>Date</th><th>Brand</th><th>Inwards</th><th>Cost</th><th>A-No / PL-No</th><th>Washer / Stitcher</th><th>Delivered</th></tr></thead>
        <tbody>${scLots.map(([lot, date, age, brand, inw, rate, pl, washer, del]) => `<tr data-brand="${brand}"><td><span class="sc-img">${ic("camera", 15)}</span></td><td><span class="sc-badge">In Progress</span><span class="sc-badge lite">Lot</span></td><td><b>${lot}</b></td><td><span class="sc-date">${ic("calendar", 10)}${date}</span><span class="sc-age">${ic("clock", 10)}${age}</span></td><td><span class="sc-tag">${brand}</span></td><td><b>${inw}</b></td><td><b>₹${rate}</b><small>₹${fmtIN(inw * rate)}</small></td><td>A-No: -<small class="pl">PL-No: ${pl}</small></td><td><span class="sc-tag sm">W: ${washer}</span><span class="sc-tag sm">S: -</span></td><td><b>${del}</b><small class="red">(${inw - del})</small></td></tr>`).join("")}</tbody></table></div>`
    ),
  steps: [
    [500, (c) => c.move("#sc-search", { click: true, dx: -260 })],
    [1200, (c) => { const t = c.q("#sc-search .t"); t.classList.remove("ph"); t.textContent = ""; c.add("#sc-search", "focus"); c.type("#sc-search .t", "urban loom", 80); }],
    [2300, (c) => {
      c.qa("tbody tr").forEach((tr) => tr.classList.toggle("out", tr.dataset.brand !== "Urban Loom"));
      c.text("#sc-c1", "3 Lots");
      c.text("#sc-c2", "1,468 Inwards");
    }],
    [3400, (c) => c.move('tbody tr[data-brand="Urban Loom"] td:nth-child(3)')],
    [3900, (c) => c.add('tbody tr[data-brand="Urban Loom"]', "hover")],
    [4500, (c) => c.move('tbody tr[data-brand="Urban Loom"] td:nth-child(3)', { click: true })],
  ],
};

const scLot = {
  label: "Lot workflow",
  url: "stylecreation.in/entry/l-979",
  dur: 7400,
  html: () =>
    scShell(
      "Entries",
      `<div class="sc-top"><div class="sc-lothead">${ic("arrowl", 15)}${ic("box", 16)}<h2>L-979</h2><span class="sc-badge lite">Lot</span><span class="sc-badge">In Progress</span></div>
         <div class="sc-actions"><span class="sc-party">Party Lot: <b>3993-abd</b></span><span class="sc-icon">${ic("download", 13)}</span><span class="sc-btn">Mark as Delivered</span><span class="sc-btn">Mark as Rework</span><span class="sc-icon dark">${ic("edit", 13)}</span></div></div>
       <div class="sc-info">
         <div class="sc-ic b">${ic("users", 15)}<div><small>Brand</small><b>Urban Loom</b></div></div>
         <div class="sc-ic o">${ic("droplet", 15)}<div><small>Washer</small><b>Aqua Wash Co.</b></div></div>
         <div class="sc-ic p">${ic("shirt", 15)}<div><small>Product</small><b>Jeans</b></div></div>
         <div class="sc-ic g">${ic("trend", 15)}<div><small>Progress</small><b id="sc-pct">1%</b></div></div>
       </div>
       <div class="sc-card sc-overall"><div class="sc-ch"><b>Overall Progress</b><span id="sc-of">3 of 402 pieces processed</span></div>
         <div class="sc-track"><i id="sc-bar" style="width:1%"></i></div>
         <div class="sc-ch sm"><span class="red" id="sc-rem">Remaining: 399 pieces</span><span id="sc-pct2">0.7%</span></div></div>
       <div class="sc-tabs"><span class="on">${ic("trend", 12)}Process</span><span>${ic("camera", 12)}Images</span><span>${ic("tag", 12)}Accessories</span><span>${ic("box", 12)}Packing</span><span>₹ Costs</span><span>${ic("file", 12)}Job Card</span><span>${ic("file", 12)}Challan</span></div>
       <div class="sc-proc">
         <div class="sc-card"><div class="sc-ch"><b>${ic("box", 13)}Inward Stock</b><span class="sc-plus">${ic("plus", 12)}</span></div><div class="sc-kv"><span>Total Inward:</span><em>402 pieces</em></div><div class="sc-entry">${ic("box", 12)}<b>402 pieces</b><span>${ic("calendar", 10)}17/10/2026</span></div></div>
         <div class="sc-card" id="sc-tc"><div class="sc-ch"><b>${ic("scissors", 13)}Thread Cutting</b><span class="sc-plus">${ic("plus", 12)}</span></div>
           <div class="sc-kv"><span>Total Sent:</span><em>402 pieces</em></div><div class="sc-kv"><span>Total Received:</span><em id="sc-recv">0 pieces</em></div><div class="sc-kv"><span>Remaining:</span><em class="bad" id="sc-left">402 pieces</em></div>
           <div class="sc-entry">${ic("upright", 12)}<b>Sent: 402 pieces</b><span>${ic("calendar", 10)}17/10/2026</span></div><span class="sc-btn sm" id="sc-receive">Receive</span></div>
         <div class="sc-card"><div class="sc-ch"><b>${ic("shirt", 13)}Unpressed Samples</b><span class="sc-plus">${ic("plus", 12)}</span></div><div class="sc-emptyc">${ic("shirt", 26)}<span>No samples recorded</span><span class="sc-btn sm">${ic("plus", 11)}Add Sample</span></div></div>
         <div class="sc-card"><div class="sc-ch"><b>${ic("droplet", 13)}Washing</b><span class="sc-plus">${ic("plus", 12)}</span></div><div class="sc-kv"><span>Total Sent:</span><em id="sc-wsent">0 pieces</em></div><div class="sc-kv"><span>Washer:</span><em>Aqua Wash Co.</em></div><div class="sc-kv"><span>Status:</span><em id="sc-wst" class="mute">Waiting</em></div></div>
       </div>
       <div class="sc-toast" hidden>${ic("check", 13)}Received 268 pieces from thread cutting</div>`
    ),
  steps: [
    [600, (c) => c.move("#sc-receive", { click: true })],
    [1400, (c) => {
      c.count("#sc-recv", 268, { ms: 800, suffix: " pieces" });
      c.count("#sc-left", 134, { from: 402, ms: 800, suffix: " pieces" });
      c.q(".sc-toast").hidden = false;
    }],
    [2300, (c) => {
      c.q("#sc-left").className = "warn";
      c.q("#sc-bar").style.width = "67%";
      c.count("#sc-pct", 67, { from: 1, ms: 1100, suffix: "%" });
      c.count("#sc-pct2", 66.7, { from: 0.7, ms: 1100, f: (n) => n.toFixed(1), suffix: "%" });
      c.count("#sc-of", 268, { from: 3, ms: 1100, suffix: " of 402 pieces processed" });
      c.count("#sc-rem", 134, { from: 399, ms: 1100, prefix: "Remaining: ", suffix: " pieces" });
    }],
    [3800, (c) => c.move("#sc-wst")],
    [4400, (c) => { c.count("#sc-wsent", 268, { ms: 700, suffix: " pieces" }); c.q("#sc-wst").className = "ok"; c.text("#sc-wst", "At washer"); }],
  ],
};

const scChallans = {
  label: "Challans",
  url: "stylecreation.in/challans",
  dur: 7000,
  html: () =>
    scShell(
      "Challans",
      `<div class="sc-top"><h2>Challans</h2><span class="sc-btn dark" id="sc-create">Create Challan</span></div>
       <div class="sc-search-row"><span class="sc-search">${ic("search", 13)}<span class="t ph">Search by DC No., lot, party lot, article, brand… (e.g., dc-10, l-6, pl-182)</span></span><span class="sc-btn">${ic("filter", 12)}Filters</span></div>
       <div class="sc-row"><div class="sc-seg"><span class="on" id="sc-dct">Delivery Challan (3)</span><span>Return Goods Challan (0)</span></div><span class="sc-month">${ic("chevl", 13)}<b>October 2026</b>${ic("chevr", 13)}</span></div>
       <div class="sc-card sc-tablecard"><table class="sc-table"><thead><tr><th>Image</th><th>DC No.</th><th>Lot No.</th><th>Date</th><th>Brand</th><th>A-No / PL-No</th><th>Pieces</th></tr></thead>
        <tbody>${[["DC-3", "L-897", "Kaya Wear", "PL: 420", "Art: K-114", 162], ["DC-2", "L-897", "Kaya Wear", "PL: 420", "Art: K-114", 10], ["DC-1", "L-900", "Kaya Wear", "PL: 1174-1177", "Art: -", 156]]
          .map(([dc, lot, brand, pl, art, pcs]) => `<tr><td><span class="sc-doc"><i></i><i></i><i></i><i></i></span></td><td><span class="sc-tag">${dc}</span></td><td><span class="sc-tag blue">${lot}</span></td><td><span class="sc-date">${ic("calendar", 10)}05/10/2026</span></td><td><span class="sc-tag">${brand}</span></td><td>${pl}<small>${art}</small></td><td><b>${pcs}</b></td></tr>`).join("")}</tbody></table></div>
       <div class="sc-drawer" hidden><div class="sc-dh"><b>New Delivery Challan</b>${ic("x", 14)}</div>
         <label>Lot</label><span class="sc-field">L-979 · Urban Loom ${ic("chev", 11)}</span>
         <label>Pieces</label><span class="sc-field" id="sc-pcs"><span class="t"></span></span>
         <label>Date</label><span class="sc-field">18/10/2026 ${ic("calendar", 11)}</span>
         <label>Photo of signed challan</label><div class="sc-drop">${ic("camera", 18)}<span>challan-dc4.jpg</span></div>
         <span class="sc-btn dark full" id="sc-gen">Generate challan</span></div>`
    ),
  steps: [
    [500, (c) => c.move("#sc-create", { click: true })],
    [1200, (c) => { c.q(".sc-drawer").hidden = false; }],
    [1700, (c) => c.move("#sc-pcs", { click: true })],
    [2400, (c) => { c.add("#sc-pcs", "focus"); c.type("#sc-pcs .t", "268", 120); }],
    [3300, (c) => c.move("#sc-gen", { click: true })],
    [4000, (c) => {
      c.q(".sc-drawer").hidden = true;
      c.q("tbody").insertAdjacentHTML("afterbegin", `<tr class="rowin new"><td><span class="sc-doc"><i></i><i></i><i></i><i></i></span></td><td><span class="sc-tag">DC-4</span></td><td><span class="sc-tag blue">L-979</span></td><td><span class="sc-date">${ic("calendar", 10)}18/10/2026</span></td><td><span class="sc-tag">Urban Loom</span></td><td>PL: 3993-abd<small>Art: -</small></td><td><b>268</b></td></tr>`);
      c.text("#sc-dct", "Delivery Challan (4)");
    }],
  ],
};

/* ======================================================================
   ApexCharts Editor
   ====================================================================== */

const AX_PAL = {
  palette1: ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0"],
  palette3: ["#33b2df", "#546e7a", "#d4526e", "#13d8aa", "#a5978b"],
  palette7: ["#d7263d", "#f46036", "#2e294e", "#1b998b", "#c5d86d"],
};

function axChart(st) {
  const w = 400, h = 250, padL = 34, padB = 26, padT = 18, padR = 12;
  const cw = w - padL - padR, ch = h - padT - padB;
  const bg = st.dark ? "#343a55" : "#ffffff";
  const fg = st.dark ? "#e8eaf2" : "#373d3f";
  const grid = st.dark ? "#4a5170" : "#e7e7e7";
  const cols = st.colors;
  const shadow = st.shadow ? 'filter="url(#axs)"' : "";
  let body = "";
  if (st.type === "donut") {
    const vals = st.series[0].data, total = vals.reduce((a, b) => a + b, 0);
    const r = 70, cx = w / 2, cy = h / 2 - 6, c = 2 * Math.PI * r;
    let off = 0;
    body = vals.map((v, i) => {
      const len = (v / total) * c;
      const s = `<circle class="arc" style="--len:${len.toFixed(1)};--c:${c.toFixed(1)};--d:${i * 0.12}s" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${cols[i % cols.length]}" stroke-width="34" stroke-dasharray="${len.toFixed(1)} ${c.toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})" ${shadow}/>`;
      off += len;
      return s;
    }).join("") + st.cats.map((cat, i) => `<g transform="translate(${70 + i * 56} ${h - 10})"><circle r="4" fill="${cols[i % cols.length]}"/><text x="7" y="3.5" font-size="9" fill="${fg}">${cat}</text></g>`).join("");
  } else {
    const all = st.series.flatMap((s) => s.data);
    const max = Math.max(10, Math.ceil(Math.max(...all) / 10) * 10);
    const ticks = 4;
    body += Array.from({ length: ticks + 1 }, (_, i) => {
      const y = padT + ch - (i / ticks) * ch;
      return `<line x1="${padL}" x2="${w - padR}" y1="${y}" y2="${y}" stroke="${grid}"/><text x="${padL - 8}" y="${y + 3}" text-anchor="end" font-size="9" fill="${fg}">${Math.round((max / ticks) * i)}</text>`;
    }).join("");
    const n = st.cats.length, slot = cw / n;
    body += st.cats.map((cat, i) => `<text x="${padL + slot * i + slot / 2}" y="${h - 9}" text-anchor="middle" font-size="9" fill="${fg}">${cat}</text>`).join("");
    if (st.type === "column") {
      const k = st.series.length, bw = Math.min(34, (slot * 0.62) / k);
      st.series.forEach((s, si) => s.data.forEach((v, i) => {
        const bh = (v / max) * ch;
        const x = padL + slot * i + slot / 2 - (bw * k) / 2 + si * bw;
        body += `<rect class="grow" style="--d:${(i * 0.06 + si * 0.1).toFixed(2)}s" x="${x.toFixed(1)}" y="${(padT + ch - bh).toFixed(1)}" width="${(bw - 2).toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${cols[si % cols.length]}" ${shadow}/>`;
      }));
    } else {
      st.series.forEach((s, si) => {
        const pts = s.data.map((v, i) => [padL + slot * i + slot / 2, padT + ch - (v / max) * ch]);
        const col = cols[si % cols.length];
        if (st.type === "area") body += `<path class="fadein" d="${smoothPath(pts)} L${pts[pts.length - 1][0]} ${padT + ch} L${pts[0][0]} ${padT + ch}Z" fill="${col}" opacity=".3"/>`;
        body += `<path class="draw" style="--t:1.2s;--d:${si * 0.15}s" pathLength="1" d="${smoothPath(pts)}" fill="none" stroke="${col}" stroke-width="3" ${shadow}/>`;
      });
    }
    if (st.series.length > 1) body += st.series.map((s, i) => `<g transform="translate(${w / 2 - 70 + i * 80} 8)"><circle r="4" fill="${cols[i % cols.length]}"/><text x="7" y="3.5" font-size="9" fill="${fg}">${s.name}</text></g>`).join("");
  }
  return `<svg viewBox="0 0 ${w} ${h}" class="ax-svg" style="background:${bg}"><defs><filter id="axs" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity=".35"/></filter></defs>${body}</svg>`;
}

const AX_TYPES = ["Line", "Smoothline", "Area", "Stacked Area", "Column", "Bar", "Stacked Column", "Stacked Bar", "100% Stacked Col", "Funnel", "Slope", "Pie", "Donut", "Radialbar", "Radar", "Heatmap", "Treemap", "Scatter"];
function axThumb(t) {
  const a = "#26c6da", b = "#1e88e5", g = "#00e396";
  const m = {
    Line: `<path d="M3 22 L11 12 L18 17 L26 7 L37 14" stroke="${a}" stroke-width="2" fill="none"/><path d="M3 18 L12 20 L20 9 L29 15 L37 6" stroke="${b}" stroke-width="2" fill="none"/>`,
    Smoothline: `<path d="M3 20 C10 4 16 26 22 12 S32 4 37 10" stroke="${a}" stroke-width="2" fill="none"/><path d="M3 14 C10 24 18 6 25 18 S33 20 37 16" stroke="${b}" stroke-width="2" fill="none"/>`,
    Area: `<path d="M3 24 L10 14 L17 18 L25 6 L37 12 L37 26 L3 26Z" fill="${g}"/><path d="M3 26 L12 20 L22 22 L37 16 L37 26Z" fill="${b}"/>`,
    "Stacked Area": `<path d="M3 16 L12 8 L22 14 L37 6 L37 26 L3 26Z" fill="${a}"/><path d="M3 22 L12 18 L22 21 L37 15 L37 26 L3 26Z" fill="${b}"/>`,
    Column: [8, 14, 6, 18].map((h, i) => `<rect x="${5 + i * 8}" y="${26 - h}" width="5" height="${h}" fill="${i % 2 ? b : a}"/>`).join(""),
    Bar: [26, 18, 30, 12].map((w, i) => `<rect x="4" y="${4 + i * 6}" width="${w}" height="4" fill="${i % 2 ? b : a}"/>`).join(""),
    "Stacked Column": [10, 16, 8, 14].map((h, i) => `<rect x="${5 + i * 8}" y="${26 - h}" width="5" height="${h}" fill="${a}"/><rect x="${5 + i * 8}" y="${26 - h - 6}" width="5" height="6" fill="${b}"/>`).join(""),
    "Stacked Bar": [20, 14, 26, 10].map((w, i) => `<rect x="4" y="${4 + i * 6}" width="${w}" height="4" fill="${a}"/><rect x="${4 + w}" y="${4 + i * 6}" width="8" height="4" fill="${b}"/>`).join(""),
    "100% Stacked Col": [12, 8, 14, 10].map((h, i) => `<rect x="${5 + i * 8}" y="4" width="5" height="22" fill="${b}"/><rect x="${5 + i * 8}" y="${26 - h}" width="5" height="${h}" fill="${a}"/>`).join(""),
    Funnel: `<rect x="6" y="5" width="28" height="4" fill="${g}"/><rect x="10" y="11" width="20" height="4" fill="${a}"/><rect x="14" y="17" width="12" height="4" fill="${b}"/><rect x="17" y="23" width="6" height="3" fill="#feb019"/>`,
    Slope: `<path d="M6 8 L34 20 M6 20 L34 8 M6 14 L34 16" stroke="${a}" stroke-width="1.6"/><circle cx="6" cy="8" r="2" fill="#feb019"/><circle cx="34" cy="8" r="2" fill="#feb019"/>`,
    Pie: `<circle cx="20" cy="15" r="11" fill="${a}"/><path d="M20 15 L20 4 A11 11 0 0 1 30.5 18Z" fill="#feb019"/><path d="M20 15 L30.5 18 A11 11 0 0 1 14 24.5Z" fill="${b}"/>`,
    Donut: `<circle cx="20" cy="15" r="9" fill="none" stroke="${a}" stroke-width="5"/><path d="M20 6 A9 9 0 0 1 29 15" stroke="#feb019" stroke-width="5" fill="none"/>`,
    Radialbar: `<circle cx="20" cy="15" r="10" fill="none" stroke="${b}" stroke-width="2.5" stroke-dasharray="44 100"/><circle cx="20" cy="15" r="6.5" fill="none" stroke="${a}" stroke-width="2.5" stroke-dasharray="28 100"/>`,
    Radar: `<path d="M20 4 L31 12 L27 25 L13 25 L9 12Z" fill="none" stroke="#546e7a" stroke-width=".8"/><path d="M20 9 L27 13 L24 21 L15 22 L13 13Z" fill="${g}" opacity=".8"/>`,
    Heatmap: Array.from({ length: 12 }, (_, i) => `<rect x="${5 + (i % 4) * 8}" y="${5 + Math.floor(i / 4) * 7}" width="7" height="6" fill="${[a, b, g, "#26a69a"][(i * 7) % 4]}"/>`).join(""),
    Treemap: `<rect x="4" y="4" width="18" height="22" fill="${a}"/><rect x="23" y="4" width="13" height="10" fill="${b}"/><rect x="23" y="15" width="13" height="11" fill="${g}"/>`,
    Scatter: Array.from({ length: 14 }, (_, i) => `<circle cx="${5 + ((i * 13) % 31)}" cy="${6 + ((i * 7) % 19)}" r="1.4" fill="${i % 2 ? a : b}"/>`).join(""),
  };
  return `<svg viewBox="0 0 40 30" width="44" height="33">${m[t] || ""}</svg>`;
}

function axShell({ panel, rail = "charts", chart = "", topSave = false, extra = "" }) {
  const railCharts = [["TEMPLATES", "grid"], ["CHARTS", "chart"], ["BACKGROUND", "hatch"], ["TEXT", "type"], ["GRAPHICS", "shapes"]];
  const railEdit = [["DATA", "grid"], ["CHART THEME", "brush"], ["AXES | GRID", "axes"], ["FONTS", "type"], ["CHART OPTIONS", "gear"], ["CHART FILL", "bucket"], ["LEGEND", "legend"], ["DATALABELS / MARKERS", "tag"]];
  const items = rail === "charts" ? railCharts : railEdit;
  return `<div class="ax">
    <header class="ax-top"><span class="ax-logo"><svg width="22" height="18" viewBox="0 0 24 20"><path d="M2 18 12 2l10 16Z" fill="none" stroke="#fff" stroke-width="2"/><path d="M7 18l5-8 5 8" fill="#f5c542"/></svg></span><b>My Project</b>
      <span class="ax-save${topSave ? " dirty" : ""}">${ic("file", 12)}Save</span><span class="ax-tb">${ic("edit", 12)}Resize</span>
      <span class="ax-right"><span class="ax-ib" id="ax-dl">${ic("download", 15)}</span><span class="ax-ib">${ic("share", 15)}</span><span class="ax-ib">${ic("user", 15)}</span></span></header>
    <div class="ax-body">
      <nav class="ax-rail">${rail === "edit" ? `<span class="ax-ri back">${ic("arrowl", 15)}</span>` : ""}${items.map(([n, i], k) => `<span class="ax-ri${(rail === "charts" && k === 1) || (rail === "edit" && n === (extra || "DATA")) ? " on" : ""}" data-r="${n}">${ic(i, 16)}<small>${n}</small></span>`).join("")}</nav>
      <aside class="ax-panel">${panel}</aside>
      <section class="ax-canvas"><div class="ax-toolbar">${chart ? `${ic("copy", 14)}${ic("layers", 14)}${ic("layers", 14)}${ic("trash", 14)}` : ""}</div>
        <div class="ax-board"><div class="ax-chart" id="ax-chart">${chart}</div></div></section>
    </div>
    <div class="ax-dlmenu" hidden><span>Download SVG</span><span id="ax-png">Download PNG</span><span>Download JPEG</span></div>
    <div class="ax-toast" hidden>${ic("check", 13)}chart.png exported · 1600 × 1000</div>
  </div>`;
}

const axPicker = () => `<div class="ax-types">${AX_TYPES.map((t) => `<span class="ax-type" data-t="${t}">${axThumb(t)}<small>${t.toUpperCase()}</small></span>`).join("")}</div>`;
const axBase = () => ({ type: "column", cats: ["Item 1", "Item 2", "Item 3", "Item 4"], series: [{ name: "Column", data: [10, 20, 30, 40] }], colors: AX_PAL.palette1, dark: false, shadow: false });
const axGrid = (st) => `<div class="ax-btns"><span class="ax-b blue" id="ax-row">${ic("list", 12)}+ ROW</span><span class="ax-b blue" id="ax-col">${ic("grid", 12)}+ COLUMN</span><span class="ax-b green">${ic("download", 12)}CSV</span></div>
  <table class="ax-grid"><thead><tr><th>Category</th>${st.series.map((s) => `<th>${s.name}</th>`).join("")}<th></th><th></th></tr></thead>
  <tbody>${st.cats.map((c, i) => `<tr><td>${c}</td>${st.series.map((s) => `<td>${s.data[i]}</td>`).join("")}<td>${ic("settings", 11)}</td><td>${ic("x", 11)}</td></tr>`).join("")}</tbody></table>`;
const axSetChart = (c, st) => c.html("#ax-chart", axChart(st) + '<i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i><i class="h tm"></i><i class="rot"></i>');

const axPick = {
  label: "Pick a chart",
  url: "editor.apexcharts.com/c/new",
  dur: 5600,
  html: () => axShell({ panel: axPicker() }),
  steps: [
    [500, (c) => c.move('[data-t="Line"]')],
    [1100, (c) => { c.add('[data-t="Line"]', "hov"); c.move('[data-t="Area"]'); }],
    [1700, (c) => { c.rm('[data-t="Line"]', "hov"); c.add('[data-t="Area"]', "hov"); c.move('[data-t="Column"]', { click: true }); }],
    [2500, (c) => {
      c.rm('[data-t="Area"]', "hov");
      c.add('[data-t="Column"]', "hov");
      axSetChart(c, axBase());
      c.add("#ax-chart", "sel");
      c.add(".ax-save", "dirty");
    }],
    [3600, (c) => c.move("#ax-chart .br", { dx: 4, dy: 4 })],
    [4200, (c) => { c.add("#ax-chart", "big"); c.move("#ax-chart .br", { dx: 4, dy: 4 }); }],
  ],
};

const axData = {
  label: "Edit data",
  url: "editor.apexcharts.com/c/new",
  dur: 7600,
  html: () => {
    const st = axBase();
    return axShell({ panel: axGrid(st), rail: "edit", chart: axChart(st), topSave: true, extra: "DATA" });
  },
  steps: [
    [100, (c) => { c.add("#ax-chart", "sel"); c.add("#ax-chart", "big"); axSetChart(c, axBase()); }],
    [500, (c) => c.move("#ax-row", { click: true })],
    [1200, (c) => c.q(".ax-grid tbody").insertAdjacentHTML("beforeend", `<tr class="rowin"><td>Item 5</td><td id="ax-v5" class="edit"><span class="t">0</span></td><td>${ic("settings", 11)}</td><td>${ic("x", 11)}</td></tr>`)],
    [1600, (c) => c.move("#ax-v5", { click: true })],
    [2300, (c) => { c.text("#ax-v5 .t", ""); c.type("#ax-v5 .t", "55", 150); }],
    [2900, (c) => { const st = axBase(); st.cats.push("Item 5"); st.series[0].data.push(55); axSetChart(c, st); }],
    [3700, (c) => c.move("#ax-col", { click: true })],
    [4500, (c) => {
      const st = axBase();
      st.cats.push("Item 5");
      st.series[0].data.push(55);
      st.series.push({ name: "Column 2", data: [24, 18, 36, 28, 42] });
      c.html(".ax-panel", axGrid(st));
      c.q(".ax-grid").classList.add("rowin");
      axSetChart(c, st);
    }],
  ],
};

const axThemeState = () => { const st = axBase(); st.cats.push("Item 5"); st.series[0].data.push(55); st.series.push({ name: "Column 2", data: [24, 18, 36, 28, 42] }); return st; };
const axTheme = {
  label: "Theme",
  url: "editor.apexcharts.com/c/new",
  dur: 7800,
  html: () =>
    axShell({
      rail: "edit",
      extra: "CHART THEME",
      topSave: true,
      chart: axChart(axThemeState()),
      panel: `<div class="ax-sec"><div class="ax-sh">Chart Theme ${ic("chev", 12)}</div>
        <div class="ax-f"><span>Mode</span><span class="ax-seg"><i class="on" id="ax-light">${ic("sun", 11)}</i><i id="ax-dark">${ic("moon", 11)}</i></span></div>
        <div class="ax-f"><span>Chart Background Color</span><span class="ax-sw" id="ax-bgc" style="background:#fff"></span></div>
        <div class="ax-f"><span>Chart Text Color</span><span class="ax-sw" id="ax-fgc" style="background:#373d3f"></span></div>
        <div class="ax-radio on">Select a Predefined Theme</div>
        <span class="ax-select" id="ax-pal"><span class="t">palette1</span>${ic("chev", 11)}</span>
        <div class="ax-opts" hidden><span>palette1</span><span>palette3</span><span id="ax-p7">palette7</span><span>palette8</span><span>palette10</span></div>
        <div class="ax-radio">Use Custom Colors</div>
        <div class="ax-sws" id="ax-sws">${AX_PAL.palette1.map((col) => `<span class="ax-sw" style="background:${col}"></span>`).join("")}<span class="ax-sw add">+</span></div></div>
       <div class="ax-sec"><div class="ax-sh">Drop Shadow ${ic("chev", 12)}</div>
        <div class="ax-f"><span>Enable</span><span class="ax-tog" id="ax-sh"><i></i></span></div>
        <div class="ax-sl"><span>Blur</span><i style="--v:20%"></i></div><div class="ax-sl"><span>Offset X</span><i style="--v:50%"></i></div><div class="ax-sl"><span>Offset Y</span><i style="--v:50%"></i></div>
        <div class="ax-sl"><span>Shadow Opacity</span><i style="--v:35%"></i></div></div>`,
    }),
  steps: [
    [100, (c) => { c.add("#ax-chart", "sel"); c.add("#ax-chart", "big"); }],
    [500, (c) => c.move("#ax-dark", { click: true })],
    [1200, (c) => {
      c.rm("#ax-light", "on"); c.add("#ax-dark", "on");
      c.q("#ax-bgc").style.background = "#343a55"; c.q("#ax-fgc").style.background = "#e8eaf2";
      const st = axThemeState(); st.dark = true; st.colors = ["#26c6da", "#7c8cf8"]; axSetChart(c, st);
    }],
    [2100, (c) => c.move("#ax-pal", { click: true })],
    [2800, (c) => { c.q(".ax-opts").hidden = false; }],
    [3100, (c) => c.move("#ax-p7", { click: true })],
    [3800, (c) => {
      c.q(".ax-opts").hidden = true;
      c.text("#ax-pal .t", "palette7");
      c.html("#ax-sws", AX_PAL.palette7.map((col) => `<span class="ax-sw pop" style="background:${col}"></span>`).join("") + '<span class="ax-sw add">+</span>');
      const st = axThemeState(); st.dark = true; st.colors = AX_PAL.palette7.slice(3); axSetChart(c, st);
    }],
    [4700, (c) => c.move("#ax-sh", { click: true })],
    [5400, (c) => {
      c.add("#ax-sh", "on");
      const st = axThemeState(); st.dark = true; st.colors = AX_PAL.palette7.slice(3); st.shadow = true; axSetChart(c, st);
    }],
  ],
};

const axSwitch = {
  label: "Chart types",
  url: "editor.apexcharts.com/c/new",
  dur: 7000,
  html: () => {
    const st = axThemeState(); st.dark = true; st.colors = AX_PAL.palette7.slice(3);
    return axShell({ panel: axPicker(), chart: axChart(st), topSave: true });
  },
  steps: [
    [100, (c) => { c.add("#ax-chart", "sel"); c.add("#ax-chart", "big"); }],
    [500, (c) => c.move('[data-t="Smoothline"]', { click: true })],
    [1200, (c) => { c.add('[data-t="Smoothline"]', "hov"); const st = axThemeState(); st.dark = true; st.colors = AX_PAL.palette7.slice(3); st.type = "line"; axSetChart(c, st); }],
    [2500, (c) => c.move('[data-t="Area"]', { click: true })],
    [3200, (c) => { c.rm('[data-t="Smoothline"]', "hov"); c.add('[data-t="Area"]', "hov"); const st = axThemeState(); st.dark = true; st.colors = AX_PAL.palette7.slice(3); st.type = "area"; axSetChart(c, st); }],
    [4500, (c) => c.move('[data-t="Donut"]', { click: true })],
    [5200, (c) => {
      c.rm('[data-t="Area"]', "hov"); c.add('[data-t="Donut"]', "hov");
      const st = axThemeState(); st.dark = true; st.colors = AX_PAL.palette7; st.type = "donut"; st.series = [st.series[0]]; axSetChart(c, st);
    }],
  ],
};

const axExport = {
  label: "Export",
  url: "editor.apexcharts.com/c/new",
  dur: 5400,
  html: () => {
    const st = axThemeState(); st.dark = true; st.colors = AX_PAL.palette7; st.type = "donut"; st.series = [st.series[0]];
    return axShell({ panel: axPicker(), chart: axChart(st), topSave: true });
  },
  steps: [
    [100, (c) => c.add("#ax-chart", "big")],
    [500, (c) => c.move("#ax-dl", { click: true })],
    [1200, (c) => { c.q(".ax-dlmenu").hidden = false; }],
    [1600, (c) => c.move("#ax-png", { click: true })],
    [2000, (c) => c.add("#ax-png", "hl")],
    [2400, (c) => { c.q(".ax-dlmenu").hidden = true; c.q(".ax-toast").hidden = false; }],
  ],
};

/* ---------- Mount ---------- */

const specs = {
  vizantra: { scenes: [vzConnect, vzDashboard, vzReport, vzSchedule, vzPortal] },
  stylecreation: { scenes: [scDashboard, scEntries, scLot, scChallans] },
  apexcharts: { scenes: [axPick, axData, axTheme, axSwitch, axExport] },
};

document.querySelectorAll("[data-demo]").forEach((el) => {
  const spec = specs[el.dataset.demo];
  if (spec) createDemo(el, spec);
});
