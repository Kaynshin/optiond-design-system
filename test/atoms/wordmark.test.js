import { describe, it, expect } from 'vitest';
import WordmarkMeta, { Playground, HeroScale } from '../../stories/atoms/Wordmark.stories.js';

describe('Atoms / Wordmark', () => {
  it('contains the "Option" text segment', () => {
    const html = Playground.render(WordmarkMeta.args);
    expect(html).toContain('Option');
  });

  it('wraps both "/" and "D" together in the single accent span (two accent segments, one accent color)', () => {
    const html = Playground.render(WordmarkMeta.args);
    // Invariant: "/" and "D" are the accent, always together, never split apart.
    expect(html).toMatch(/<span class="od-wordmark__accent">\/D<\/span>/);
  });

  it('does not render the "D" outside of the accent span (D is never in the plain text color)', () => {
    const html = Playground.render(WordmarkMeta.args);
    const beforeAccent = html.split('od-wordmark__accent')[0];
    expect(beforeAccent).not.toContain('D');
  });

  it('the wordmark text color (controllable) is applied on the container, not on the accent', () => {
    const html = Playground.render({ ...WordmarkMeta.args, textColor: '#123456' });
    expect(html).toContain('color:#123456;');
    // The accent span itself carries no inline color override — it is styled via CSS only.
    expect(html).not.toMatch(/od-wordmark__accent"\s+style="color/);
  });

  it('HeroScale renders the wordmark with the same /D accent invariant, independent of controls', () => {
    const html = HeroScale.render();
    expect(html).toContain('Option');
    expect(html).toMatch(/<span class="od-wordmark__accent">\/D<\/span>/);
  });
});
