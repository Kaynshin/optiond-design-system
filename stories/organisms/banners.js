/**
 * Banner SVG generator — ported 1:1 from the JS-generated markup captured in
 * `banners.rendered.html` (source of truth: `init/Bannieres Option D (standalone).html`).
 * Produces the exact same SVG primitives for the 3 brand concepts (Halo, Monogramme,
 * Slash) at any target W×H, so Storybook can recreate every platform format live
 * instead of hand-copying static markup per variant.
 */

const FF = { magenta: '#FF006E', dark: '#0A0A0A', black: '#000000', white: '#FFFFFF', cream: '#F5F1EA' };
export const HEADLINE = '— DAVID · DIGITAL —';

export const FORMATS = {
  linkedin: { label: 'LinkedIn perso', dim: '1584×396', W: 1584, H: 396, ring: { d: 0.62, cx: 0.045, cy: 0.42 } },
  'linkedin-co': {
    label: 'LinkedIn entreprise',
    dim: '4200×700',
    W: 4200,
    H: 700,
    ring: { d: 0.78, cx: 0.035, cy: 0.3, square: true },
  },
  x: { label: 'X', dim: '1500×500', W: 1500, H: 500, ring: { d: 0.4, cx: 0.045, cy: 0.56 } },
  generic: { label: 'Générique', dim: '1104×480', W: 1104, H: 480, ring: null },
  cover: { label: 'Cover large', dim: '1920×640', W: 1920, H: 640, ring: null },
};

export const CONCEPTS = {
  halo: { label: 'Halo', desc: 'Halo magenta sur noir, lockup centré. Sobre, cinématique — l’usage quotidien.' },
  monogram: { label: 'Monogramme', desc: 'Grand D magenta en pied de cadre, wordmark cale à gauche. Signature, identitaire.' },
  slash: { label: 'Slash', desc: 'Wordmark plein cadre, scanlines, rail magenta. Editorial, builder-in-public.' },
};

/* ---------- shared font measuring (parity with the source bundle) ---------- */
const measCv = document.createElement('canvas');
const measCtx = measCv.getContext('2d');
function famCss(family) {
  return family === 'mono' ? "'Geist Mono','JetBrains Mono',monospace" : "'Geist','Inter',sans-serif";
}
function fontStr(size, weight, family) {
  return `${weight} ${size}px ${famCss(family)}`;
}
function measure(t, size, weight, family, spacing) {
  measCtx.font = fontStr(size, weight, family);
  try {
    measCtx.letterSpacing = spacing + 'px';
  } catch (e) {
    /* older browsers */
  }
  const w = measCtx.measureText(t).width;
  try {
    measCtx.letterSpacing = '0px';
  } catch (e) {
    /* older browsers */
  }
  return w;
}
function textRun(centerX, y, segments, size, weight, family, spacing) {
  const widths = segments.map((s) => measure(s.t, size, weight, family, spacing));
  const total = widths.reduce((a, b) => a + b, 0);
  let x = centerX - total / 2;
  return segments.map((s, i) => {
    const p = { type: 'text', x, y, t: s.t, size, weight, family, spacing, color: s.color };
    x += widths[i];
    return p;
  });
}

function palette(theme) {
  if (theme === 'light')
    return { base: FF.cream, text: FF.dark, muted: 'rgba(10,10,10,0.55)', accent: FF.magenta, dot: 'rgba(10,10,10,0.06)', scan: 'rgba(10,10,10,0.035)' };
  return { base: FF.dark, text: FF.white, muted: 'rgba(255,255,255,0.62)', accent: FF.magenta, dot: 'rgba(255,255,255,0.06)', scan: 'rgba(255,255,255,0.045)' };
}

function buildPrims(concept, theme, W, H) {
  const p = palette(theme);
  const prims = [];
  const wide = W / H > 4.5; // ultra-wide formats (LinkedIn entreprise 6:1) need larger type
  const wordSegs = (c) => [{ t: 'Option', color: c.text }, { t: '/', color: c.accent }, { t: 'D', color: c.accent }];

  if (concept === 'halo') {
    prims.push({ type: 'rect', x: 0, y: 0, w: W, h: H, fill: theme === 'light' ? FF.cream : FF.black });
    prims.push({
      type: 'rect',
      x: 0,
      y: 0,
      w: W,
      h: H,
      fill: {
        radial: {
          cx: W * 0.5,
          cy: H * 0.44,
          r: H * 0.95,
          stops: [
            [0, `rgba(255,0,110,${theme === 'light' ? 0.16 : 0.24})`],
            [0.4, 'rgba(255,0,110,0.05)'],
            [0.76, 'rgba(255,0,110,0)'],
          ],
        },
      },
    });
    const ws = H * (wide ? 0.46 : 0.3);
    prims.push(...textRun(W * 0.5, H * 0.43, wordSegs(p), ws, 700, 'sans', -ws * 0.045));
    const hs = H * (wide ? 0.075 : 0.05);
    prims.push(...textRun(W * 0.5, H * 0.72, [{ t: HEADLINE, color: p.muted }], hs, 500, 'mono', hs * 0.2));
  } else if (concept === 'monogram') {
    prims.push({ type: 'rect', x: 0, y: 0, w: W, h: H, fill: p.base });
    prims.push({ type: 'dots', step: H * 0.085, r: H * 0.0072, color: p.dot });
    prims.push({ type: 'text', x: W * 0.83, y: H * 0.5, t: 'D', size: H * 0.96, weight: 700, family: 'sans', spacing: 0, color: p.accent, anchorCenter: true });
    const ws = H * 0.165;
    prims.push(...textRun(W * 0.4, H * 0.43, wordSegs(p), ws, 700, 'sans', -ws * 0.045));
    const hs = H * 0.055;
    prims.push(...textRun(W * 0.4, H * 0.6, [{ t: HEADLINE, color: p.muted }], hs, 500, 'mono', hs * 0.2));
  } else if (concept === 'slash') {
    prims.push({ type: 'rect', x: 0, y: 0, w: W, h: H, fill: theme === 'light' ? FF.white : FF.dark });
    prims.push({ type: 'scanlines', gap: Math.max(3, H * 0.0075), color: p.scan });
    prims.push({ type: 'rect', x: 0, y: 0, w: W * (wide ? 0.006 : 0.014), h: H, fill: p.accent }); // rail
    const ws = H * (wide ? 0.5 : 0.34);
    prims.push(...textRun(W * 0.5, H * 0.45, wordSegs(p), ws, 700, 'sans', -ws * 0.05));
    const hs = H * (wide ? 0.075 : 0.05);
    prims.push(...textRun(W * 0.5, H * 0.78, [{ t: HEADLINE, color: p.muted }], hs, 500, 'mono', hs * 0.2));
    const ls = H * (wide ? 0.078 : 0.038),
      sp = ls * 0.16,
      gap = ls * 0.85;
    const offSegs = [
      { t: 'AGENTS IA', color: p.muted },
      { t: '/', color: p.accent },
      { t: 'SITES INTERNET PREMIUM', color: p.muted },
    ];
    const ows = offSegs.map((s) => measure(s.t, ls, 500, 'mono', sp));
    const otot = ows[0] + gap + ows[1] + gap + ows[2];
    let ox = W - W * 0.04 - otot;
    offSegs.forEach((s, i) => {
      prims.push({ type: 'text', x: ox, y: H * 0.15, t: s.t, size: ls, weight: 500, family: 'mono', spacing: sp, color: s.color });
      ox += ows[i] + (i < offSegs.length - 1 ? gap : 0);
    });
  }
  return prims;
}

let _gid = 0;
function svgFromPrims(prims, W, H) {
  let defs = '';
  let body = '';
  for (const pr of prims) {
    if (pr.type === 'rect') {
      if (pr.fill && pr.fill.radial) {
        const g = pr.fill.radial;
        const id = 'rg' + _gid++;
        defs +=
          `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${g.cx}" cy="${g.cy}" r="${g.r}">` +
          g.stops.map((s) => `<stop offset="${s[0] * 100}%" stop-color="${s[1]}"/>`).join('') +
          `</radialGradient>`;
        body += `<rect x="${pr.x}" y="${pr.y}" width="${pr.w}" height="${pr.h}" fill="url(#${id})"/>`;
      } else {
        body += `<rect x="${pr.x}" y="${pr.y}" width="${pr.w}" height="${pr.h}" fill="${pr.fill}"/>`;
      }
    } else if (pr.type === 'dots') {
      const id = 'pt' + _gid++;
      defs += `<pattern id="${id}" width="${pr.step}" height="${pr.step}" patternUnits="userSpaceOnUse"><circle cx="${pr.step / 2}" cy="${pr.step / 2}" r="${pr.r}" fill="${pr.color}"/></pattern>`;
      body += `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#${id})"/>`;
    } else if (pr.type === 'scanlines') {
      const id = 'sl' + _gid++;
      defs += `<pattern id="${id}" width="4" height="${pr.gap}" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="1" fill="${pr.color}"/></pattern>`;
      body += `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#${id})"/>`;
    } else if (pr.type === 'text') {
      const anchor = pr.anchorCenter ? 'middle' : 'start';
      body += `<text x="${pr.x}" y="${pr.y}" font-family="${famCss(pr.family).replace(/"/g, '&quot;')}" font-size="${pr.size}" font-weight="${pr.weight}" letter-spacing="${pr.spacing}" text-anchor="${anchor}" dominant-baseline="central" fill="${pr.color}">${pr.t.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defs ? `<defs>${defs}</defs>` : ''}${body}</svg>`;
}

export function bannerSVG(concept, theme, W, H) {
  return svgFromPrims(buildPrims(concept, theme, W, H), W, H);
}
