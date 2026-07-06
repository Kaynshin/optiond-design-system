/**
 * Foundations / Typography — the `.od-t-*` scale, Geist / Geist Mono families, pangram.
 */
export default {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

const SIZES = [10, 11, 12, 13, 14, 15, 16, 18, 20, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 120];
const PANGRAM = 'Portez ce vieux whisky au juge blond qui fume';

export const Scale = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font:700 20px/1.2 var(--od-font-sans);margin:0 0 8px;">Échelle typographique</h2>
      <p style="font:14px/1.6 var(--od-font-sans);color:var(--od-color-text-muted);margin:0 0 24px;max-width:60ch;">
        Classes utilitaires <code>.od-t-{size}</code> (font-size uniquement, hérite la famille et le poids
        du contexte). Familles : <strong>Geist</strong> (texte) et <strong>Geist Mono</strong> (labels, mono).
      </p>
      <div style="display:flex;flex-direction:column;gap:4px;">
        ${SIZES.map(
          (s) => `
          <div style="display:flex;align-items:baseline;gap:20px;border-bottom:1px solid var(--od-color-hairline,#E5E5E5);padding:10px 0;">
            <div style="font:11px var(--od-font-mono);color:var(--od-color-text-muted);width:64px;flex:none;">od-t-${s}</div>
            <div class="od-sans od-t-${s}" style="line-height:1.15;">${PANGRAM}</div>
          </div>
        `
        ).join('')}
      </div>
    </div>
  `,
};

export const Families = {
  render: () => `
    <div style="padding:24px;display:flex;flex-direction:column;gap:32px;">
      <div>
        <div style="font:11px var(--od-font-mono);color:var(--od-color-text-muted);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">Geist — sans</div>
        <div class="od-sans" style="font-size:32px;font-weight:700;letter-spacing:-0.02em;">${PANGRAM}</div>
        <div class="od-sans" style="font-size:16px;font-weight:400;margin-top:8px;color:var(--od-color-text-muted);">${PANGRAM}</div>
      </div>
      <div>
        <div style="font:11px var(--od-font-mono);color:var(--od-color-text-muted);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">Geist Mono</div>
        <div class="od-mono" style="font-size:20px;font-weight:500;">${PANGRAM.toUpperCase()}</div>
        <div class="od-mono" style="font-size:13px;font-weight:400;margin-top:8px;color:var(--od-color-text-muted);">0123456789 — DAVID · DIGITAL —</div>
      </div>
    </div>
  `,
};
