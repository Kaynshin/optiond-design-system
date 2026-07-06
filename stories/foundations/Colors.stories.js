import colorTokens from '../../tokens/color.tokens.json';

/**
 * Foundations / Colors — every `--od-color-*` token, its hex value and role.
 */
export default {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

const ROLES = {
  primary: 'Accent unique de la marque — jamais de bichromie.',
  'primary-active': 'Hover / active de primary.',
  'primary-disabled': 'Disabled de primary.',
  'on-primary': 'Texte/icône au-dessus de primary.',
  'canvas-light': 'Canvas thème light.',
  'canvas-dark': 'Canvas thème dark.',
  'canvas-pure-black': 'Réservé hero / halo bannières.',
  cream: 'Variante claire chaleureuse (signatures, papeterie).',
  ink: 'Encre — texte fort sur fond clair.',
  'surface-soft': 'Surface basse élévation (dark).',
  'surface-card': 'Surface carte (dark).',
  'surface-elevated': 'Surface élevée (dark).',
  'on-dark': 'Texte principal sur fond dark.',
  'body-on-dark': 'Texte body sur fond dark.',
  'body-strong': 'Texte body appuyé sur fond dark.',
  'muted-on-dark': 'Texte muted sur fond dark.',
  'muted-soft-on-dark': 'Texte muted doux sur fond dark.',
  'body-on-light': 'Texte body sur fond light.',
  'body-soft-on-light': 'Texte body doux sur fond light.',
  'muted-on-light': 'Texte muted sur fond light.',
  'hairline-light': 'Filet sur fond light.',
  'hairline-strong-light': 'Filet appuyé sur fond light.',
  'hairline-dark': 'Filet sur fond dark.',
  'hairline-strong-dark': 'Filet appuyé sur fond dark.',
  success: 'Statut succès.',
  warning: 'Statut avertissement.',
  error: 'Statut erreur.',
};

function swatch(name, hex) {
  const isLight = ['#FFFFFF', '#F5F1EA', '#E5E5E5', '#D0D0D0', '#E6E6E6'].includes(hex);
  return `
    <div style="border:1px solid var(--od-color-hairline-dark,#2A2A2A);border-radius:var(--od-radius-8);overflow:hidden;">
      <div style="height:72px;background:${hex};"></div>
      <div style="padding:10px 12px;background:var(--od-color-surface-card,#1A1A1A);">
        <div style="font:600 13px/1.3 var(--od-font-sans);color:var(--od-color-on-dark,#fff);">--od-color-${name}</div>
        <div style="font:11px/1.6 var(--od-font-mono);color:var(--od-color-muted-on-dark,#888);">${hex}</div>
        <div style="font:12px/1.5 var(--od-font-sans);color:var(--od-color-body-on-dark,#ccc);margin-top:4px;max-width:32ch;">${ROLES[name] || ''}</div>
      </div>
    </div>
  `;
}

export const AllTokens = {
  render: () => {
    const entries = Object.entries(colorTokens.color);
    return `
      <div style="padding:24px;">
        <h2 style="font:700 20px/1.2 var(--od-font-sans);margin:0 0 16px;">Color tokens</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;">
          ${entries.map(([name, def]) => swatch(name, def.$value)).join('')}
        </div>
      </div>
    `;
  },
};
