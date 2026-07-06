import { describe, it, expect } from 'vitest';
import InputWithLabelMeta, { Playground } from '../../stories/molecules/InputWithLabel.stories.js';

describe('Molecules / Input + Label', () => {
  it('renders the label text and the input, wired via matching for/id', () => {
    const html = Playground.render(InputWithLabelMeta.args);
    expect(html).toContain('class="od-input-label"');
    expect(html).toContain('class="od-input"');
    expect(html).toContain('for="sb-molecule-input"');
    expect(html).toContain('id="sb-molecule-input"');
    expect(html).toContain(InputWithLabelMeta.args.label);
  });

  it('adds a required marker and the required attribute when required is true', () => {
    const html = Playground.render({ ...InputWithLabelMeta.args, required: true });
    expect(html).toMatch(/<input[^>]*\brequired\b/);
    expect(html).toContain('*</span>');
  });

  it('omits the required marker and attribute when required is false', () => {
    const html = Playground.render({ ...InputWithLabelMeta.args, required: false });
    expect(html).not.toMatch(/<input[^>]*\brequired\b/);
    expect(html).not.toContain('*</span>');
  });

  it('renders the helper text when provided, and omits it when empty', () => {
    const withHelper = Playground.render({ ...InputWithLabelMeta.args, helper: 'On ne partage jamais ton adresse.' });
    expect(withHelper).toContain('On ne partage jamais ton adresse.');

    const withoutHelper = Playground.render({ ...InputWithLabelMeta.args, helper: '' });
    expect(withoutHelper).not.toContain('<p style');
  });
});
