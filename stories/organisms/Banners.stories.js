import './banners.css';
import { bannerSVG, FORMATS, CONCEPTS } from './banners.js';

/**
 * Organisms / Bannières — recreated live from the exact SVG-primitive algorithm
 * captured in `banners.rendered.html` (source of truth: `init/Bannieres Option D
 * (standalone).html`). Controls: concept × format × repère (avatar/logo safe zone).
 */
export default {
  title: 'Organisms/Bannières',
  parameters: { layout: 'padded' },
  argTypes: {
    concept: { control: 'select', options: Object.keys(CONCEPTS) },
    format: { control: 'select', options: Object.keys(FORMATS) },
    repere: { control: 'boolean', description: 'Overlay de la zone photo/logo masquée par la plateforme.' },
  },
  args: {
    concept: 'halo',
    format: 'linkedin',
    repere: false,
  },
};

function renderGuide(format, repere) {
  const F = FORMATS[format];
  if (!F.ring) return '';
  const { d, cx, cy, square } = F.ring;
  const widthPct = (d * (F.H / F.W) * 100).toFixed(2);
  const heightPct = (d * 100).toFixed(2);
  return `
    <div class="bn-guide" style="display:${repere ? 'block' : 'none'};">
      <div class="ring" style="
        left:${(cx * 100).toFixed(2)}%;
        top:${(cy * 100).toFixed(2)}%;
        width:${widthPct}%;
        height:${heightPct}%;
        border-radius:${square ? '12px' : '50%'};
      ">
        <span class="tag">${square ? 'zone logo' : 'zone photo'}</span>
      </div>
    </div>
  `;
}

function renderBannerCard({ concept, format, repere }) {
  const F = FORMATS[format];
  const C = CONCEPTS[concept];
  const svg = bannerSVG(concept, 'dark', F.W, F.H);
  return `
    <div class="bn-frame">
      <div class="bn-shadow">
        <div class="bn-clip">${svg}</div>
        ${renderGuide(format, repere)}
      </div>
    </div>
    <div class="bn-meta">
      <div>
        <div class="name">${C.label}</div>
        <div class="desc">${C.desc}</div>
        <div class="dimtag">${F.label} · ${F.W}×${F.H}px</div>
      </div>
    </div>
  `;
}

export const Playground = {
  render: renderBannerCard,
};

export const AllConcepts = {
  argTypes: { concept: { control: false } },
  render: (args) => `
    <div style="display:flex;flex-direction:column;gap:32px;">
      ${Object.keys(CONCEPTS)
        .map((concept) => renderBannerCard({ ...args, concept }))
        .join('')}
    </div>
  `,
};
