import { describe, it, expect } from 'vitest';
import ButtonMeta, { Playground, AllVariants } from '../../stories/atoms/Button.stories.js';

describe('Atoms / Button', () => {
  const variants = ['primary', 'secondary-dark', 'secondary-light', 'icon', 'link'];

  it.each(variants)('renders the .od-btn--%s class for that variant', (variant) => {
    const html = Playground.render({ ...ButtonMeta.args, variant });
    expect(html).toContain(`od-btn od-btn--${variant}`);
  });

  it('renders the label as button content for non-icon variants', () => {
    const html = Playground.render({ ...ButtonMeta.args, variant: 'primary', label: 'Réserver un appel' });
    expect(html).toContain('>Réserver un appel</button>');
  });

  it('adds the disabled attribute when state is disabled', () => {
    const html = Playground.render({ ...ButtonMeta.args, state: 'disabled' });
    expect(html).toMatch(/<button[^>]*\bdisabled\b/);
  });

  it('does not add the disabled attribute for the default state', () => {
    const html = Playground.render({ ...ButtonMeta.args, state: 'default' });
    expect(html).not.toMatch(/\bdisabled\b/);
  });

  it('uses aria-label with the label for the icon variant', () => {
    const html = Playground.render({ ...ButtonMeta.args, variant: 'icon', label: 'Suivant' });
    expect(html).toContain('aria-label="Suivant"');
  });

  it('AllVariants renders all five variants together', () => {
    const html = AllVariants.render(ButtonMeta.args);
    variants.forEach((variant) => {
      expect(html).toContain(`od-btn--${variant}`);
    });
  });
});
