/**
 * Avatar SVG generator — ported 1:1 from the JS-generated markup captured in
 * `avatars.rendered.html` (source of truth: `init/Avatars Option D (standalone)
 * .html`). Produces the 15 Signature/App-icon variants at any shape override,
 * using the same ink-centred glyph measurement as the source bundle so the D /
 * /D / O/D marks stay perfectly centred in their safe zone.
 */

const FF = { magenta: '#FF006E', dark: '#0A0A0A', black: '#000000', white: '#FFFFFF', cream: '#F5F1EA' };

/* ---- Avatar configs — 8 Signature (circle) + 7 App icon (rounded square) = 15 ---- */
export const AVATARS = [
  // SIGNATURE — le cœur, à utiliser partout
  { id: 'sig-magenta', g: 'sig', name: 'Signature magenta', use: 'Avatar principal · X, GitHub', shape: 'circle', bg: FF.magenta, fg: FF.white, mark: 'D' },
  { id: 'sig-magenta-slash', g: 'sig', name: 'Signature magenta /D', use: 'Variante lockup · X, GitHub', shape: 'circle', bg: FF.magenta, fg: FF.white, mark: 'slashD' },
  { id: 'sig-dark', g: 'sig', name: 'Signature dark', use: 'UI sombres · Slack, Discord', shape: 'circle', bg: FF.dark, fg: FF.magenta, mark: 'D' },
  { id: 'sig-cream', g: 'sig', name: 'Cream', use: 'Papeterie · premium', shape: 'circle', bg: FF.cream, fg: FF.magenta, mark: 'D' },
  { id: 'sig-cream-slash', g: 'sig', name: 'Cream /D', use: 'Variante lockup · papeterie', shape: 'circle', bg: FF.cream, fg: FF.magenta, mark: 'slashD' },
  { id: 'sig-slashd', g: 'sig', name: 'Signature /D', use: 'Lockup signature · fond noir', shape: 'circle', bg: FF.black, fg: FF.magenta, mark: 'slashD' },
  { id: 'sig-od', g: 'sig', name: 'Contraction O/D', use: 'Option/D contracté · signature', shape: 'circle', bg: FF.black, fg: FF.white, accent: FF.magenta, mark: 'oslashd' },
  { id: 'sig-od-cream', g: 'sig', name: 'Contraction O/D cream', use: 'O/D · fond clair', shape: 'circle', bg: FF.cream, fg: FF.dark, accent: FF.magenta, mark: 'oslashd' },

  // APP ICON — carré arrondi iOS/macOS, à uploader sur les services
  { id: 'app-magenta', g: 'app', name: 'App magenta', use: 'PWA · home screen', shape: 'rounded', bg: FF.magenta, fg: FF.white, mark: 'D' },
  { id: 'app-magenta-slash', g: 'app', name: 'App magenta /D', use: 'Variante lockup · home screen', shape: 'rounded', bg: FF.magenta, fg: FF.white, mark: 'slashD' },
  { id: 'app-dark', g: 'app', name: 'App dark', use: 'Dock macOS', shape: 'rounded', bg: FF.dark, fg: FF.magenta, mark: 'D' },
  { id: 'app-cream', g: 'app', name: 'App cream', use: 'Light · favicon', shape: 'rounded', bg: FF.cream, fg: FF.dark, mark: 'D' },
  { id: 'app-cream-slash', g: 'app', name: 'App cream /D', use: 'Variante lockup · favicon', shape: 'rounded', bg: FF.cream, fg: FF.magenta, mark: 'slashD' },
  { id: 'app-slashd', g: 'app', name: 'App /D', use: 'Lockup · home screen', shape: 'rounded', bg: FF.black, fg: FF.magenta, mark: 'slashD' },
  { id: 'app-od', g: 'app', name: 'App O/D', use: 'Contraction · dock', shape: 'rounded', bg: FF.black, fg: FF.white, accent: FF.magenta, mark: 'oslashd' },
];

export const GROUPS = {
  sig: { tag: '01', name: 'Signature', desc: 'Le monogramme D et le lockup /D — ton avatar par défaut, partout.' },
  app: { tag: '02', name: 'App icon', desc: 'Carré arrondi — à uploader, les services croppent en rond.' },
  photo: { tag: '03', name: 'Photo', desc: "Portrait cadré sur le visage, cerclé du même contour magenta. Nécessite un asset photo fourni par l'implémenteur (non inclus dans le design system)." },
};

/* ---- SVG builder ---- */
function shapePath(shape) {
  if (shape === 'circle') return `<circle cx="400" cy="400" r="400"`;
  if (shape === 'rounded') return `<rect x="0" y="0" width="800" height="800" rx="184" ry="184"`;
  return `<rect x="0" y="0" width="800" height="800"`;
}
function baseShape(fill, shape) {
  return shapePath(shape) + ` fill="${fill}"/>`;
}
function squareFill(cfg) {
  return cfg.bg;
}

const RING_W = 20;
function ringColor(cfg) {
  return cfg.accent || cfg.fg;
}
function ringSVG(cfg, shape) {
  const col = ringColor(cfg),
    w = RING_W,
    h = w / 2;
  if (shape === 'circle') return `<circle cx="400" cy="400" r="${400 - h}" fill="none" stroke="${col}" stroke-width="${w}"/>`;
  if (shape === 'rounded') return `<rect x="${h}" y="${h}" width="${800 - w}" height="${800 - w}" rx="${184 - h}" ry="${184 - h}" fill="none" stroke="${col}" stroke-width="${w}"/>`;
  return `<rect x="${h}" y="${h}" width="${800 - w}" height="${800 - w}" fill="none" stroke="${col}" stroke-width="${w}"/>`;
}

/* ---- Mark definitions: glyph runs, measured & centered by real ink metrics ---- */
const SANS = "'Geist','Inter',system-ui,sans-serif";
const MARK_DEFS = {
  D: { size: 560, weight: 700, fam: SANS, ls: 0, runs: [{ t: 'D' }] },
  slashD: { size: 420, weight: 700, fam: SANS, ls: -10, runs: [{ t: '/D' }] },
  oslashd: { size: 330, weight: 700, fam: SANS, ls: -8, runs: [{ t: 'O' }, { t: '/D', accent: true }] },
};

const _mctx = document.createElement('canvas').getContext('2d');
const _geomCache = {};
function geom(mark) {
  if (_geomCache[mark]) return _geomCache[mark];
  const M = MARK_DEFS[mark];
  _mctx.font = `${M.weight} ${M.size}px ${M.fam}`;
  _mctx.textAlign = 'left';
  _mctx.textBaseline = 'alphabetic';
  const hasLS = 'letterSpacing' in _mctx;
  if (hasLS) _mctx.letterSpacing = (M.ls || 0) + 'px';
  let cur = 0,
    left = Infinity,
    right = -Infinity,
    asc = -Infinity,
    desc = -Infinity;
  const advances = [];
  M.runs.forEach((r) => {
    const m = _mctx.measureText(r.t);
    advances.push(cur);
    left = Math.min(left, cur - m.actualBoundingBoxLeft);
    right = Math.max(right, cur + m.actualBoundingBoxRight);
    asc = Math.max(asc, m.actualBoundingBoxAscent);
    desc = Math.max(desc, m.actualBoundingBoxDescent);
    cur += m.width + (M.ls || 0);
  });
  if (hasLS) _mctx.letterSpacing = '0px';
  const inkCx = (left + right) / 2;
  const y0 = 400 + (asc - desc) / 2;
  const x0 = 400 - inkCx;
  return (_geomCache[mark] = { M, x0, y0, advances });
}

function markSVG(cfg) {
  if (!MARK_DEFS[cfg.mark]) return '';
  const g = geom(cfg.mark),
    M = g.M;
  const ls = M.ls ? ` letter-spacing="${M.ls}"` : '';
  const runs = M.runs
    .map((r, i) => {
      const x = (g.x0 + g.advances[i]).toFixed(2);
      const col = r.accent ? cfg.accent || FF.magenta : cfg.fg;
      return `<tspan x="${x}" fill="${col}">${r.t}</tspan>`;
    })
    .join('');
  return `<text y="${g.y0.toFixed(2)}" font-family="${M.fam}" font-size="${M.size}" font-weight="${M.weight}" text-anchor="start"${ls}>${runs}</text>`;
}

/**
 * @param {object} cfg one entry of AVATARS
 * @param {'circle'|'rounded'|'square'} [shapeOverride] force a shape different
 *   from the variant's canonical one (Storybook `forme` control)
 */
export function buildAvatarSVG(cfg, shapeOverride) {
  const shape = shapeOverride || cfg.shape;
  const uid = cfg.id + '-' + shape;
  const clipId = 'cl-' + uid;
  const defs = `<clipPath id="${clipId}">${shapePath(shape)}/></clipPath>`;
  const bg = baseShape(cfg.bg, shape);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800"><defs>${defs}</defs>${bg}${ringSVG(cfg, shape)}${markSVG(cfg)}</svg>`;
}

/* ---- Photo family placeholder — no real portrait asset ships with the design
   system (the source bundle referenced ephemeral blob: URLs). We render a
   silhouette placeholder with the same magenta ring treatment so the story
   still documents the intended crop/shape/ring spec. */
export const PHOTOS = [
  { id: 'photo-circle', name: 'Photo ronde', use: 'Avatar perso · LinkedIn, X, mail', shape: 'circle' },
  { id: 'photo-rounded', name: 'Photo arrondie', use: "App icon · à uploader", shape: 'rounded' },
];

export function buildPhotoPlaceholderSVG(photo, shapeOverride) {
  const shape = shapeOverride || photo.shape;
  const clipId = 'cl-photo-' + photo.id + '-' + shape;
  const w = RING_W,
    h = w / 2;
  const clip = `<clipPath id="${clipId}">${shapePath(shape)}/></clipPath>`;
  const silhouette = `<g clip-path="url(#${clipId})">
      <rect width="800" height="800" fill="#2A2A2A"/>
      <circle cx="400" cy="330" r="140" fill="#4A4A4A"/>
      <ellipse cx="400" cy="760" rx="260" ry="220" fill="#4A4A4A"/>
    </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800"><defs>${clip}</defs>${silhouette}${ringSVG({ fg: FF.magenta }, shape)}</svg>`;
}
