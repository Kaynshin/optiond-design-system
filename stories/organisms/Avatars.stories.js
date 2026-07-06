import { AVATARS, GROUPS, PHOTOS, buildAvatarSVG, buildPhotoPlaceholderSVG } from './avatars.js';

/**
 * Organisms / Avatars — recreated from the exact SVG-primitive algorithm
 * captured in `avatars.rendered.html` (source of truth: `init/Avatars Option D
 * (standalone).html`). 3 familles : Signature (rond, 8 variantes), App icon
 * (carré arrondi, 7 variantes), Photo (2 — silhouette placeholder, voir
 * avatars.js : aucun asset photo réel ne fait partie du design system source).
 */
export default {
  title: 'Organisms/Avatars',
  parameters: { layout: 'padded' },
  argTypes: {
    famille: { control: 'select', options: ['Signature', 'App icon', 'Photo'] },
    variante: { control: 'select' },
    forme: {
      control: 'inline-radio',
      options: ['canonique', 'circle', 'rounded', 'square'],
      description: 'Force une forme differente de la forme canonique de la variante.',
    },
  },
  args: {
    famille: 'Signature',
    variante: 'sig-magenta',
    forme: 'canonique',
  },
};

const FAMILY_TO_GROUP = { Signature: 'sig', 'App icon': 'app', Photo: 'photo' };

function variantsForFamily(famille) {
  if (famille === 'Photo') return PHOTOS.map((p) => p.id);
  const group = FAMILY_TO_GROUP[famille];
  return AVATARS.filter((a) => a.g === group).map((a) => a.id);
}

function card(name, use, svg) {
  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
      <div style="width:140px;height:140px;">${svg}</div>
      <div style="text-align:center;">
        <div style="font:600 13px/1.3 var(--od-font-sans);color:var(--od-color-text);">${name}</div>
        <div style="font:11px var(--od-font-mono);color:var(--od-color-text-muted);margin-top:2px;">${use}</div>
      </div>
    </div>
  `;
}

function renderOne({ famille, variante, forme }) {
  const shapeOverride = forme === 'canonique' ? undefined : forme;
  if (famille === 'Photo') {
    const p = PHOTOS.find((x) => x.id === variante) || PHOTOS[0];
    return card(p.name, p.use, buildPhotoPlaceholderSVG(p, shapeOverride));
  }
  const cfg = AVATARS.find((a) => a.id === variante) || AVATARS[0];
  return card(cfg.name, cfg.use, buildAvatarSVG(cfg, shapeOverride));
}

export const Playground = {
  argTypes: {
    variante: {
      control: 'select',
      options: [...variantsForFamily('Signature'), ...variantsForFamily('App icon'), ...variantsForFamily('Photo')],
    },
  },
  render: (args) => `
    <div style="background:#000;padding:32px;border-radius:var(--od-radius-12);display:inline-flex;">
      ${renderOne(args)}
    </div>
  `,
};

export const SignatureFamily = {
  argTypes: { famille: { control: false }, variante: { control: false } },
  render: ({ forme }) => `
    <div>
      <h3 style="font:700 16px var(--od-font-sans);color:var(--od-color-text);margin:0 0 6px;">${GROUPS.sig.tag} · ${GROUPS.sig.name}</h3>
      <p style="font:13px var(--od-font-sans);color:var(--od-color-text-muted);margin:0 0 20px;max-width:60ch;">${GROUPS.sig.desc}</p>
      <div style="background:#000;padding:32px;border-radius:var(--od-radius-12);display:flex;flex-wrap:wrap;gap:24px;">
        ${AVATARS.filter((a) => a.g === 'sig')
          .map((cfg) => card(cfg.name, cfg.use, buildAvatarSVG(cfg, forme === 'canonique' ? undefined : forme)))
          .join('')}
      </div>
    </div>
  `,
};

export const AppIconFamily = {
  argTypes: { famille: { control: false }, variante: { control: false } },
  render: ({ forme }) => `
    <div>
      <h3 style="font:700 16px var(--od-font-sans);color:var(--od-color-text);margin:0 0 6px;">${GROUPS.app.tag} · ${GROUPS.app.name}</h3>
      <p style="font:13px var(--od-font-sans);color:var(--od-color-text-muted);margin:0 0 20px;max-width:60ch;">${GROUPS.app.desc}</p>
      <div style="background:#000;padding:32px;border-radius:var(--od-radius-12);display:flex;flex-wrap:wrap;gap:24px;">
        ${AVATARS.filter((a) => a.g === 'app')
          .map((cfg) => card(cfg.name, cfg.use, buildAvatarSVG(cfg, forme === 'canonique' ? undefined : forme)))
          .join('')}
      </div>
    </div>
  `,
};

export const PhotoFamily = {
  argTypes: { famille: { control: false }, variante: { control: false } },
  render: ({ forme }) => `
    <div>
      <h3 style="font:700 16px var(--od-font-sans);color:var(--od-color-text);margin:0 0 6px;">${GROUPS.photo.tag} · ${GROUPS.photo.name}</h3>
      <p style="font:13px var(--od-font-sans);color:var(--od-color-text-muted);margin:0 0 20px;max-width:60ch;">${GROUPS.photo.desc}</p>
      <div style="background:#000;padding:32px;border-radius:var(--od-radius-12);display:flex;flex-wrap:wrap;gap:24px;">
        ${PHOTOS.map((p) => card(p.name, p.use, buildPhotoPlaceholderSVG(p, forme === 'canonique' ? undefined : forme))).join('')}
      </div>
    </div>
  `,
};
