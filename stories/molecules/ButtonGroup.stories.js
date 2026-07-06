/**
 * Molecules / Button group — a primary action + supporting actions,
 * composed from the `.od-btn` atom.
 */
export default {
  title: 'Molecules/Button group',
  parameters: { layout: 'padded' },
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column'] },
  },
  args: {
    direction: 'row',
  },
};

export const Playground = {
  render: ({ direction }) => `
    <div style="background:#0A0A0A;padding:32px;border-radius:var(--od-radius-12);display:inline-flex;">
      <div style="display:flex;flex-direction:${direction};gap:12px;align-items:${direction === 'row' ? 'center' : 'stretch'};">
        <button class="od-btn od-btn--primary">Réserver un appel</button>
        <button class="od-btn od-btn--secondary-dark">En savoir plus</button>
        <button class="od-btn od-btn--icon" aria-label="Suivant">→</button>
      </div>
    </div>
  `,
};
