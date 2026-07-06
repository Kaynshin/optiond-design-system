import { describe, it, expect } from 'vitest';
import { SIGNATURES } from '../../stories/organisms/signatures.js';

describe('Organisms / Signatures email — signatures.js', () => {
  it('exposes exactly 4 variants: Halo, Slash, Ligne, Cream', () => {
    expect(Object.keys(SIGNATURES)).toEqual(['halo', 'slash', 'ligne', 'cream']);
  });

  it.each(Object.keys(SIGNATURES))('the "%s" variant renders the Option/D wordmark with a magenta accent', (key) => {
    const html = SIGNATURES[key].html(true);
    expect(html).toContain('Option<span style="color:#FF006E;">/D</span>');
  });

  it.each(Object.keys(SIGNATURES))('the "%s" variant links to optiond.fr', (key) => {
    const html = SIGNATURES[key].html(true);
    expect(html).toContain('optiond.fr');
    expect(html).toContain('https://optiond.fr');
  });

  it.each(Object.keys(SIGNATURES))('the "%s" variant includes David\'s name and email when named', (key) => {
    const html = SIGNATURES[key].html(true);
    expect(html).toContain('David');
    expect(html).toContain('david@optiond.fr');
  });

  it.each(Object.keys(SIGNATURES))('the "%s" variant removes David\'s name and email when not named', (key) => {
    const html = SIGNATURES[key].html(false);
    expect(html).not.toContain('David');
    expect(html).not.toContain('david@optiond.fr');
    expect(html).not.toContain('mailto:');
  });

  // "halo", "slash", and "cream" render the "— DAVID · DIGITAL —" / "— DIGITAL —"
  // mono tagline under the wordmark. "ligne" is the ultra-condensed variant and
  // deliberately drops the tagline to save space — it still keeps the two-term
  // invariant everywhere else the headline actually appears.
  const VARIANTS_WITH_TAGLINE = ['halo', 'slash', 'cream'];

  it.each(VARIANTS_WITH_TAGLINE)('the "%s" variant renders the two-term "— DAVID · DIGITAL —" tagline when named', (key) => {
    const html = SIGNATURES[key].html(true);
    expect(html).toContain('— DAVID');
    expect(html).toContain('DIGITAL —');
  });

  it.each(VARIANTS_WITH_TAGLINE)('the "%s" variant collapses the tagline to the single-term "— DIGITAL —" when not named', (key) => {
    const html = SIGNATURES[key].html(false);
    expect(html).toContain('— DIGITAL —');
    expect(html).not.toContain('DAVID');
  });

  it.each(Object.keys(SIGNATURES))('the "%s" variant still links to optiond.fr when not named', (key) => {
    const html = SIGNATURES[key].html(false);
    expect(html).toContain('optiond.fr');
  });

  it('each variant exposes a label, a description, and pixel dimensions', () => {
    Object.values(SIGNATURES).forEach((variant) => {
      expect(typeof variant.label).toBe('string');
      expect(variant.label.length).toBeGreaterThan(0);
      expect(typeof variant.desc).toBe('string');
      expect(variant.dim).toMatch(/×/);
    });
  });
});
