import './atoms.css';

/**
 * Atoms / Button — `.od-btn` + `.od-btn--{variant}` from dist/option-d.css.
 */
export default {
  title: 'Atoms/Button',
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary-dark', 'secondary-light', 'icon', 'link'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Preview canvas background (independent of the global theme toolbar).',
    },
    label: { control: 'text' },
  },
  args: {
    variant: 'primary',
    state: 'default',
    theme: 'dark',
    label: 'Réserver un appel',
  },
};

function buttonMarkup({ variant, state, label }) {
  const isIcon = variant === 'icon';
  const disabled = state === 'disabled';
  const forceHover = state === 'hover' && !disabled;
  return `
    <button
      class="od-btn od-btn--${variant}"
      ${disabled ? 'disabled' : ''}
      ${forceHover ? "data-force-state='hover'" : ''}
      aria-label="${isIcon ? label : ''}"
    >${isIcon ? '→' : label}</button>
  `;
}

function canvasWrap(innerHtml, theme) {
  const canvasBg = theme === 'dark' ? '#0A0A0A' : '#FFFFFF';
  const canvasColor = theme === 'dark' ? '#FFFFFF' : '#0A0A0A';
  return `
    <div style="display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:16px;min-height:160px;background:${canvasBg};color:${canvasColor};border-radius:var(--od-radius-12);padding:32px;">
      ${innerHtml}
    </div>
  `;
}

export const Playground = {
  render: ({ variant, state, theme, label }) => canvasWrap(buttonMarkup({ variant, state, label }), theme),
};

export const AllVariants = {
  argTypes: { variant: { control: false }, state: { control: false } },
  render: (args) =>
    canvasWrap(
      ['primary', 'secondary-dark', 'secondary-light', 'icon', 'link']
        .map((variant) => buttonMarkup({ ...args, variant }))
        .join(''),
      'dark'
    ),
};
