/**
 * Molecules / Input + Label — pairs `.od-input-label` and `.od-input`.
 */
export default {
  title: 'Molecules/Input + Label',
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    helper: { control: 'text' },
  },
  args: {
    label: 'Email professionnel',
    placeholder: 'vous@entreprise.fr',
    required: true,
    helper: 'On ne partage jamais ton adresse.',
  },
};

export const Playground = {
  render: ({ label, placeholder, required, helper }) => `
    <div style="max-width:340px;background:#0A0A0A;padding:32px;border-radius:var(--od-radius-12);">
      <label class="od-input-label" for="sb-molecule-input">
        ${label}${required ? ' <span style="color:var(--od-color-primary);">*</span>' : ''}
      </label>
      <input id="sb-molecule-input" class="od-input" type="email" placeholder="${placeholder}" ${required ? 'required' : ''} />
      ${helper ? `<p style="font:12px/1.5 var(--od-font-sans);color:var(--od-color-muted-on-dark);margin:8px 0 0;">${helper}</p>` : ''}
    </div>
  `,
};
