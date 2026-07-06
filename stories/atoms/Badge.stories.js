import './atoms.css';

/**
 * Atoms / Badge — `.od-badge--pill` / `.od-badge--magenta` from dist/option-d.css,
 * plus a Storybook-only `.od-badge--dot` demo variant (see atoms.css).
 */
export default {
  title: 'Atoms/Badge',
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['pill', 'magenta', 'dot'] },
    label: { control: 'text' },
    dotActive: {
      control: 'boolean',
      description: 'Dot variant only — magenta (active) vs muted (inactive). Single-accent invariant preserved.',
    },
  },
  args: {
    variant: 'pill',
    label: 'Disponible',
    dotActive: true,
  },
};

function renderBadge({ variant, label, dotActive }) {
  if (variant === 'dot') {
    return `
      <span class="od-badge od-badge--dot">
        <span class="dot" style="--dot-color:${dotActive ? 'var(--od-color-primary)' : 'var(--od-color-muted-on-dark)'}"></span>
        ${label}
      </span>
    `;
  }
  return `<span class="od-badge od-badge--${variant}">${label}</span>`;
}

export const Playground = {
  render: (args) => `
    <div style="background:#0A0A0A;padding:32px;border-radius:var(--od-radius-12);display:inline-block;">
      ${renderBadge(args)}
    </div>
  `,
};

export const AllVariants = {
  argTypes: { variant: { control: false } },
  render: (args) => `
    <div style="display:flex;gap:12px;background:#0A0A0A;padding:32px;border-radius:var(--od-radius-12);">
      ${renderBadge({ ...args, variant: 'pill' })}
      ${renderBadge({ ...args, variant: 'magenta' })}
      ${renderBadge({ ...args, variant: 'dot' })}
    </div>
  `,
};
