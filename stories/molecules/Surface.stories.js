/**
 * Molecules / Card / Surface — `.od-surface` (soft), `.od-card` (card),
 * `.od-surface--elevated` (elevated).
 */
export default {
  title: 'Molecules/Card · Surface',
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['soft', 'card', 'elevated'] },
  },
  args: {
    variant: 'card',
  },
};

const CLASS_MAP = {
  soft: 'od-surface',
  card: 'od-card',
  elevated: 'od-surface--elevated',
};

export const Playground = {
  render: ({ variant }) => `
    <div style="background:#000;padding:32px;border-radius:var(--od-radius-12);">
      <div class="${CLASS_MAP[variant]}" style="max-width:360px;padding:24px;">
        <div style="font:600 16px/1.3 var(--od-font-sans);color:var(--od-color-on-dark);margin-bottom:6px;">Titre de carte</div>
        <p style="font:14px/1.6 var(--od-font-sans);color:var(--od-color-body-on-dark);margin:0;">
          Surface « ${variant} » — composée depuis <code>.${CLASS_MAP[variant]}</code>.
        </p>
      </div>
    </div>
  `,
};

export const AllVariants = {
  argTypes: { variant: { control: false } },
  render: () => `
    <div style="background:#000;padding:32px;border-radius:var(--od-radius-12);display:flex;gap:20px;flex-wrap:wrap;">
      ${['soft', 'card', 'elevated']
        .map(
          (variant) => `
        <div class="${CLASS_MAP[variant]}" style="width:220px;padding:20px;">
          <div style="font:600 14px/1.3 var(--od-font-sans);color:var(--od-color-on-dark);">${variant}</div>
        </div>
      `
        )
        .join('')}
    </div>
  `,
};
