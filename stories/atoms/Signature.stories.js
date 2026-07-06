/**
 * Atoms / Signature — `.od-signature` lockup.
 * Invariant: always two terms, "— DAVID · DIGITAL —" — the text is not a
 * free-form control on purpose (see spec: signature must keep its two terms).
 */
export default {
  title: 'Atoms/Signature',
  parameters: { layout: 'padded', controls: { disable: true } },
};

export const OnDark = {
  render: () => `
    <div style="display:flex;align-items:center;justify-content:center;min-height:120px;background:#0A0A0A;border-radius:var(--od-radius-12);padding:32px;">
      <p class="od-signature" style="color:#FFFFFF;">— DAVID · DIGITAL —</p>
    </div>
  `,
};

export const OnLight = {
  render: () => `
    <div style="display:flex;align-items:center;justify-content:center;min-height:120px;background:#FFFFFF;border-radius:var(--od-radius-12);padding:32px;">
      <p class="od-signature" style="color:#0A0A0A;">— DAVID · DIGITAL —</p>
    </div>
  `,
};
