import './atoms.css';

/**
 * Atoms / Input — `.od-input` (+ `.od-input-label`) from dist/option-d.css.
 */
export default {
  title: 'Atoms/Input',
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'select', options: ['default', 'focus', 'disabled'] },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    state: 'default',
    placeholder: 'vous@exemple.fr',
    value: '',
  },
};

function renderInput({ state, placeholder, value }) {
  const disabled = state === 'disabled';
  const forceFocus = state === 'focus' && !disabled;
  return `
    <div style="max-width:320px;background:#0A0A0A;padding:32px;border-radius:var(--od-radius-12);">
      <input
        class="od-input"
        type="email"
        placeholder="${placeholder}"
        value="${value}"
        ${disabled ? 'disabled' : ''}
        ${forceFocus ? "data-force-focus='true'" : ''}
      />
    </div>
  `;
}

export const Playground = {
  render: renderInput,
};

export const WithLabel = {
  argTypes: { state: { control: false } },
  render: ({ placeholder, value }) => `
    <div style="max-width:320px;background:#0A0A0A;padding:32px;border-radius:var(--od-radius-12);">
      <label class="od-input-label" for="sb-input-email">Email</label>
      <input id="sb-input-email" class="od-input" type="email" placeholder="${placeholder}" value="${value}" />
    </div>
  `,
};
