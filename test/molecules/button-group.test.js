import { describe, it, expect } from 'vitest';
import ButtonGroupMeta, { Playground } from '../../stories/molecules/ButtonGroup.stories.js';

describe('Molecules / Button group', () => {
  it('composes primary, secondary-dark, and icon button atoms', () => {
    const html = Playground.render(ButtonGroupMeta.args);
    expect(html).toContain('od-btn od-btn--primary');
    expect(html).toContain('od-btn od-btn--secondary-dark');
    expect(html).toContain('od-btn od-btn--icon');
  });

  it('lays out the buttons in a row by default', () => {
    const html = Playground.render(ButtonGroupMeta.args);
    expect(html).toContain('flex-direction:row');
  });

  it('lays out the buttons in a column when direction is column', () => {
    const html = Playground.render({ ...ButtonGroupMeta.args, direction: 'column' });
    expect(html).toContain('flex-direction:column');
  });

  it('the icon button carries an accessible label', () => {
    const html = Playground.render(ButtonGroupMeta.args);
    expect(html).toContain('aria-label="Suivant"');
  });
});
