/**
 * Foundations / Radii — the `--od-radius-*` scale.
 */
export default {
  title: 'Foundations/Radii',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

const RADII = [
  ['radius-2', '2px'],
  ['radius-3', '3px'],
  ['radius-4', '4px'],
  ['radius-6', '6px'],
  ['radius-8', '8px'],
  ['radius-12', '12px'],
  ['radius-16', '16px'],
  ['radius-pill', '9999px'],
  ['radius-circle', '50%'],
];

export const AllRadii = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font:700 20px/1.2 var(--od-font-sans);margin:0 0 20px;">Radii</h2>
      <div style="display:flex;flex-wrap:wrap;gap:24px;">
        ${RADII.map(
          ([name, value]) => `
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <div style="width:88px;height:88px;background:var(--od-color-primary,#FF006E);border-radius:var(--od-${name});"></div>
            <div style="font:11px var(--od-font-mono);color:var(--od-color-text-muted);">--od-${name}</div>
            <div style="font:12px var(--od-font-mono);color:var(--od-color-text-muted);">${value}</div>
          </div>
        `
        ).join('')}
      </div>
    </div>
  `,
};
