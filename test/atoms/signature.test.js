import { describe, it, expect } from 'vitest';
import { OnDark, OnLight } from '../../stories/atoms/Signature.stories.js';

describe('Atoms / Signature', () => {
  it('OnDark renders the exact two-term signature text', () => {
    const html = OnDark.render();
    expect(html).toContain('— DAVID · DIGITAL —');
  });

  it('OnLight renders the exact two-term signature text', () => {
    const html = OnLight.render();
    expect(html).toContain('— DAVID · DIGITAL —');
  });

  it('the signature has exactly two terms separated by a middle dot (not three)', () => {
    const html = OnDark.render();
    const match = /—\s*(.+?)\s*—/.exec(html);
    expect(match).not.toBeNull();
    const terms = match[1].split('·').map((t) => t.trim());
    expect(terms).toEqual(['DAVID', 'DIGITAL']);
    expect(terms).toHaveLength(2);
  });

  it('applies the .od-signature class', () => {
    const html = OnDark.render();
    expect(html).toContain('class="od-signature"');
  });
});
