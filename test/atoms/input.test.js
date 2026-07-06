import { describe, it, expect } from 'vitest';
import InputMeta, { Playground, WithLabel } from '../../stories/atoms/Input.stories.js';

describe('Atoms / Input', () => {
  it('renders the .od-input class', () => {
    const html = Playground.render(InputMeta.args);
    expect(html).toContain('class="od-input"');
  });

  it('renders the given placeholder and value', () => {
    const html = Playground.render({ ...InputMeta.args, placeholder: 'vous@exemple.fr', value: 'a@b.fr' });
    expect(html).toContain('placeholder="vous@exemple.fr"');
    expect(html).toContain('value="a@b.fr"');
  });

  it('adds the disabled attribute when state is disabled', () => {
    const html = Playground.render({ ...InputMeta.args, state: 'disabled' });
    expect(html).toMatch(/<input[^>]*\bdisabled\b/);
  });

  it('does not render the label in the plain Playground story', () => {
    const html = Playground.render(InputMeta.args);
    expect(html).not.toContain('od-input-label');
  });

  it('WithLabel renders the .od-input-label alongside the input', () => {
    const html = WithLabel.render(InputMeta.args);
    expect(html).toContain('class="od-input-label"');
    expect(html).toContain('class="od-input"');
    expect(html).toContain('for="sb-input-email"');
    expect(html).toContain('id="sb-input-email"');
  });
});
