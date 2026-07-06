import { describe, it, expect } from 'vitest';
import { bannerSVG, FORMATS, CONCEPTS, HEADLINE } from '../../stories/organisms/banners.js';

describe('Organisms / Banners — banners.js', () => {
  it('exposes exactly the 3 brand concepts: Halo, Monogramme, Slash', () => {
    expect(Object.keys(CONCEPTS)).toEqual(['halo', 'monogram', 'slash']);
    expect(CONCEPTS.halo.label).toBe('Halo');
    expect(CONCEPTS.monogram.label).toBe('Monogramme');
    expect(CONCEPTS.slash.label).toBe('Slash');
  });

  it('the two-term signature headline is exactly "— DAVID · DIGITAL —"', () => {
    expect(HEADLINE).toBe('— DAVID · DIGITAL —');
  });

  const expectedFormats = {
    linkedin: { W: 1584, H: 396, dim: '1584×396' },
    'linkedin-co': { W: 4200, H: 700, dim: '4200×700' },
    x: { W: 1500, H: 500, dim: '1500×500' },
    generic: { W: 1104, H: 480, dim: '1104×480' },
    cover: { W: 1920, H: 640, dim: '1920×640' },
  };

  it.each(Object.entries(expectedFormats))('format "%s" maps to the expected dimensions', (key, expected) => {
    expect(FORMATS[key]).toBeDefined();
    expect(FORMATS[key].W).toBe(expected.W);
    expect(FORMATS[key].H).toBe(expected.H);
    expect(FORMATS[key].dim).toBe(expected.dim);
  });

  it.each(['halo', 'monogram', 'slash'])(
    'bannerSVG renders a valid <svg> for the "%s" concept, sized to the requested W×H',
    (concept) => {
      const svg = bannerSVG(concept, 'dark', 1104, 480);
      expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true);
      expect(svg).toContain('viewBox="0 0 1104 480"');
      expect(svg).toContain('width="1104"');
      expect(svg).toContain('height="480"');
    }
  );

  it.each(['halo', 'monogram', 'slash'])(
    'bannerSVG renders the magenta wordmark accent ("/" and "D") for the "%s" concept',
    (concept) => {
      const svg = bannerSVG(concept, 'dark', 1104, 480);
      expect(svg).toContain('fill="#FF006E">/</text>');
      expect(svg).toContain('fill="#FF006E">D</text>');
      expect(svg).toContain('>Option</text>');
    }
  );

  it('renders the headline text within the halo banner', () => {
    const svg = bannerSVG('halo', 'dark', 1104, 480);
    expect(svg).toContain(HEADLINE);
  });

  it('produces different pixel dimensions per format for the same concept', () => {
    const linkedin = bannerSVG('halo', 'dark', FORMATS.linkedin.W, FORMATS.linkedin.H);
    const x = bannerSVG('halo', 'dark', FORMATS.x.W, FORMATS.x.H);
    expect(linkedin).toContain(`viewBox="0 0 ${FORMATS.linkedin.W} ${FORMATS.linkedin.H}"`);
    expect(x).toContain(`viewBox="0 0 ${FORMATS.x.W} ${FORMATS.x.H}"`);
    expect(linkedin).not.toBe(x);
  });
});
