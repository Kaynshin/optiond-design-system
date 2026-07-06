/**
 * Organisms / Hero — `.od-hero` : canvas noir + halo magenta, wordmark + signature.
 *
 * Brand invariant: the halo/hero canvas is always pure black (`--od-color-canvas-pure-black`)
 * regardless of the global light/dark toolbar — the halo effect is exclusive to this
 * context (see spec "Halo réservé au hero / bannières hero"). The `theme` control below
 * documents this: both values render the same canonical dark hero, on purpose.
 */
export default {
  title: 'Organisms/Hero',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['dark', 'light'],
      description:
        'Hero is canonically dark-only (brand invariant). Kept as a documented no-op control.',
    },
  },
  args: { theme: 'dark' },
};

export const Playground = {
  render: ({ theme }) => `
    <div class="od-hero">
      <div class="od-hero-inner">
        <div class="od-wordmark">Option<span class="od-wordmark__accent">/D</span></div>
        <p class="od-signature" style="color:#FFFFFF;">— DAVID · DIGITAL —</p>
        ${theme === 'light' ? '<!-- theme=light requested — hero stays canonically dark, see file header comment -->' : ''}
      </div>
    </div>
  `,
};
