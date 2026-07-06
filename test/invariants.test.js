import { describe, it, expect } from 'vitest';

import ButtonMeta, { AllVariants as ButtonAllVariants } from '../stories/atoms/Button.stories.js';
import BadgeMeta, { AllVariants as BadgeAllVariants } from '../stories/atoms/Badge.stories.js';
import WordmarkMeta, { Playground as WordmarkPlayground } from '../stories/atoms/Wordmark.stories.js';
import { OnDark as SignatureOnDark, OnLight as SignatureOnLight } from '../stories/atoms/Signature.stories.js';
import SurfaceMeta, { AllVariants as SurfaceAllVariants } from '../stories/molecules/Surface.stories.js';
import { bannerSVG, CONCEPTS } from '../stories/organisms/banners.js';
import { SIGNATURES } from '../stories/organisms/signatures.js';
import { AVATARS, PHOTOS, buildAvatarSVG, buildPhotoPlaceholderSVG } from '../stories/organisms/avatars.js';

const MAGENTA = '#FF006E';

// Every neutral hex color legitimately used across the design system's
// generated markup (dark/light backgrounds, greys, hairlines, cream, white,
// black). Any hex color found outside this list AND outside magenta would be
// an unauthorized second accent color, which breaks the single-accent brand
// invariant.
const ALLOWED_NEUTRAL_HEX = new Set([
  '#0A0A0A',
  '#000000',
  '#FFFFFF',
  '#F5F1EA',
  '#CCCCCC',
  '#888888',
  '#2A2A2A',
  '#3A3A3A',
  '#75758A',
  '#D9D4CB',
  '#4A4A4A',
]);

function collectHexColors(html) {
  return (html.match(/#[0-9A-Fa-f]{6}/g) || []).map((h) => h.toUpperCase());
}

function collectAllGeneratedMarkup() {
  const outputs = [];

  ['primary', 'secondary-dark', 'secondary-light', 'icon', 'link'].forEach((variant) => {
    outputs.push(ButtonAllVariants.render({ ...ButtonMeta.args, variant }));
  });
  ['pill', 'magenta', 'dot'].forEach((variant) => {
    outputs.push(BadgeAllVariants.render({ ...BadgeMeta.args, variant }));
  });
  outputs.push(WordmarkPlayground.render(WordmarkMeta.args));
  outputs.push(SignatureOnDark.render());
  outputs.push(SignatureOnLight.render());
  outputs.push(SurfaceAllVariants.render(SurfaceMeta.args));

  Object.keys(CONCEPTS).forEach((concept) => {
    outputs.push(bannerSVG(concept, 'dark', 1104, 480));
    outputs.push(bannerSVG(concept, 'light', 1104, 480));
  });

  Object.values(SIGNATURES).forEach((variant) => {
    outputs.push(variant.html(true));
    outputs.push(variant.html(false));
  });

  AVATARS.forEach((cfg) => outputs.push(buildAvatarSVG(cfg)));
  PHOTOS.forEach((photo) => outputs.push(buildPhotoPlaceholderSVG(photo)));

  return outputs;
}

describe('Cross-cutting invariants', () => {
  it('magenta (#FF006E) is the single brand accent color: no component introduces a second saturated accent', () => {
    const outputs = collectAllGeneratedMarkup();
    const unauthorized = new Set();

    outputs.forEach((html) => {
      collectHexColors(html).forEach((hex) => {
        if (hex !== MAGENTA && !ALLOWED_NEUTRAL_HEX.has(hex)) {
          unauthorized.add(hex);
        }
      });
    });

    expect([...unauthorized]).toEqual([]);
  });

  it('every generated surface that renders a hex accent color uses magenta, never anything else', () => {
    const outputs = collectAllGeneratedMarkup();
    const accentLikeUsages = [];
    outputs.forEach((html) => {
      // Any "accent" css var or inline style referencing a hex color for links,
      // rails, rings, dots, or the wordmark slash/D must be magenta.
      const matches = html.match(/(?:color|fill|stroke|background-color):\s*(#[0-9A-Fa-f]{6})/g) || [];
      matches.forEach((m) => accentLikeUsages.push(m));
    });
    const nonNeutralAccents = accentLikeUsages.filter((usage) => {
      const hex = usage.match(/#[0-9A-Fa-f]{6}/)[0].toUpperCase();
      return hex !== MAGENTA && !ALLOWED_NEUTRAL_HEX.has(hex);
    });
    expect(nonNeutralAccents).toEqual([]);
  });

  it('the signature lockup is always exactly two terms — "DAVID" and "DIGITAL" — never a third', () => {
    const htmls = [SignatureOnDark.render(), SignatureOnLight.render()];
    htmls.forEach((html) => {
      const match = /—\s*(.+?)\s*—/.exec(html);
      expect(match).not.toBeNull();
      const terms = match[1].split('·').map((t) => t.trim());
      expect(terms).toEqual(['DAVID', 'DIGITAL']);
    });
  });

  it('the wordmark accent is always the "/D" pair together, always in magenta, never split or recolored', () => {
    const html = WordmarkPlayground.render(WordmarkMeta.args);
    expect(html).toContain('<span class="od-wordmark__accent">/D</span>');
    // Only one accent span, and it is not itself given an inline override color
    // (the brand magenta comes exclusively from the .od-wordmark__accent CSS class).
    expect((html.match(/od-wordmark__accent/g) || []).length).toBe(1);
  });

  it('every email signature variant renders its "Option/D" wordmark with the "/D" run colored magenta', () => {
    Object.values(SIGNATURES).forEach((variant) => {
      const html = variant.html(true);
      expect(html).toContain(`Option<span style="color:${MAGENTA};">/D</span>`);
    });
  });

  it('every banner concept renders its "/" and "D" wordmark runs colored magenta', () => {
    Object.keys(CONCEPTS).forEach((concept) => {
      const svg = bannerSVG(concept, 'dark', 1104, 480);
      expect(svg).toContain(`fill="${MAGENTA}">/</text>`);
      expect(svg).toContain(`fill="${MAGENTA}">D</text>`);
    });
  });
});
