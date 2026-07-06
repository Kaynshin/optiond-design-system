import './signatures.css';
import { SIGNATURES } from './signatures.js';

/**
 * Organisms / Signatures email — recreated from the exact HTML-table markup
 * captured in `signatures.rendered.html` (source of truth: `init/Signatures
 * email Option D (standalone).html`). Controls: variante × contenu (avec/sans
 * nom) × fond (sombre/clair preview context — the table's own bgcolor is fixed
 * per variant, matching real email-client rendering).
 */
export default {
  title: 'Organisms/Signatures email',
  parameters: { layout: 'padded' },
  argTypes: {
    variante: { control: 'select', options: Object.keys(SIGNATURES) },
    contenu: { control: 'inline-radio', options: ['avec-nom', 'sans-nom'] },
    fond: { control: 'inline-radio', options: ['sombre', 'clair'] },
  },
  args: {
    variante: 'halo',
    contenu: 'avec-nom',
    fond: 'sombre',
  },
};

function renderSignatureCard({ variante, contenu, fond }) {
  const S = SIGNATURES[variante];
  const named = contenu === 'avec-nom';
  const bg = fond === 'sombre' ? 'dark' : 'light';
  return `
    <div class="sig-frame" data-bg="${bg}">
      <div class="sig-mailctx">… on se cale pour un point en début de semaine prochaine&nbsp;? Bonne journée,<span class="sep"></span></div>
      ${S.html(named)}
    </div>
    <div class="sig-meta">${S.label} · ${S.dim}</div>
  `;
}

export const Playground = {
  render: renderSignatureCard,
};

export const AllVariants = {
  argTypes: { variante: { control: false } },
  render: (args) => `
    <div style="display:flex;flex-direction:column;gap:32px;">
      ${Object.keys(SIGNATURES)
        .map((variante) => renderSignatureCard({ ...args, variante }))
        .join('')}
    </div>
  `,
};
