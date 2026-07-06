/**
 * Atoms / Wordmark — `.od-wordmark` + `.od-wordmark__accent`.
 * Invariant: "/" and "D" are always the magenta accent; only "Option"'s color
 * is controllable (it inherits the surrounding text color).
 */
export default {
  title: 'Atoms/Wordmark',
  parameters: { layout: 'padded' },
  argTypes: {
    textColor: { control: 'color' },
    background: { control: 'color' },
  },
  args: {
    textColor: '#FFFFFF',
    background: '#0A0A0A',
  },
};

export const Playground = {
  render: ({ textColor, background }) => `
    <div style="display:flex;align-items:center;justify-content:center;min-height:160px;background:${background};border-radius:var(--od-radius-12);padding:32px;">
      <div class="od-wordmark" style="color:${textColor};">
        Option<span class="od-wordmark__accent">/D</span>
      </div>
    </div>
  `,
};

export const HeroScale = {
  argTypes: { textColor: { control: false }, background: { control: false } },
  render: () => `
    <div class="od-hero" style="min-height:280px;">
      <div class="od-hero-inner">
        <div class="od-wordmark">Option<span class="od-wordmark__accent">/D</span></div>
      </div>
    </div>
  `,
};
