/**
 * Foundations / Hairlines — the `--od-color-hairline-*` tokens.
 */
export default {
  title: 'Foundations/Hairlines',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

const ROWS = [
  ['hairline-light', '#E5E5E5', 'light'],
  ['hairline-strong-light', '#D0D0D0', 'light'],
  ['hairline-dark', '#2A2A2A', 'dark'],
  ['hairline-strong-dark', '#3A3A3A', 'dark'],
];

export const AllHairlines = {
  render: () => `
    <div style="padding:24px;display:flex;flex-direction:column;gap:20px;">
      <h2 style="font:700 20px/1.2 var(--od-font-sans);margin:0;">Hairlines</h2>
      ${ROWS.map(
        ([name, hex, on]) => `
        <div style="display:flex;align-items:center;gap:16px;padding:16px;border-radius:var(--od-radius-8);background:${on === 'dark' ? '#0A0A0A' : '#FFFFFF'};">
          <div style="flex:1;height:0;border-top:1px solid ${hex};"></div>
          <div style="font:11px var(--od-font-mono);color:${on === 'dark' ? '#888' : '#75758A'};white-space:nowrap;">
            --od-color-${name} · ${hex} · sur ${on}
          </div>
        </div>
      `
      ).join('')}
    </div>
  `,
};
