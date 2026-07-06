import { describe, it, expect } from 'vitest';
import { AVATARS, GROUPS, PHOTOS, buildAvatarSVG, buildPhotoPlaceholderSVG } from '../../stories/organisms/avatars.js';

const MAGENTA = '#FF006E';
const WHITE = '#FFFFFF';
const DARK = '#0A0A0A';
const BLACK = '#000000';
const CREAM = '#F5F1EA';

function tspanCount(svg) {
  return (svg.match(/<tspan/g) || []).length;
}

describe('Organisms / Avatars — avatars.js', () => {
  it('exposes exactly 15 avatar configs: 8 Signature + 7 App icon', () => {
    expect(AVATARS).toHaveLength(15);
    expect(AVATARS.filter((a) => a.g === 'sig')).toHaveLength(8);
    expect(AVATARS.filter((a) => a.g === 'app')).toHaveLength(7);
  });

  it('all 15 ids are unique', () => {
    const ids = AVATARS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('exposes the sig, app, and photo group metadata', () => {
    expect(Object.keys(GROUPS)).toEqual(['sig', 'app', 'photo']);
    expect(GROUPS.sig.name).toBe('Signature');
    expect(GROUPS.app.name).toBe('App icon');
    expect(GROUPS.photo.name).toBe('Photo');
  });

  it.each(AVATARS.map((a) => [a.id, a]))(
    'buildAvatarSVG("%s") returns a valid <svg> viewBox="0 0 800 800" scaling to its container (width="100%%", not a fixed "800")',
    (id, cfg) => {
      const svg = buildAvatarSVG(cfg);
      expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true);
      expect(svg).toContain('viewBox="0 0 800 800"');
      // Non-regression: the SVG root element used to overflow its container with
      // a fixed width="800"/height="800"; it must scale via width="100%"/height="100%".
      // (Inner shapes legitimately use width="800"/height="800" for the 800x800
      // canvas rect/clip-path, so we only inspect the root <svg ...> opening tag.)
      const openingTag = svg.match(/^<svg[^>]*>/)[0];
      expect(openingTag).toContain('width="100%"');
      expect(openingTag).toContain('height="100%"');
      expect(openingTag).not.toMatch(/width="800"/);
      expect(openingTag).not.toMatch(/height="800"/);
    }
  );

  const colorCases = [
    ['sig-magenta', { bg: MAGENTA, ring: WHITE }],
    ['sig-magenta-slash', { bg: MAGENTA, ring: WHITE }],
    ['sig-dark', { bg: DARK, ring: MAGENTA }],
    ['sig-cream', { bg: CREAM, ring: MAGENTA }],
    ['sig-cream-slash', { bg: CREAM, ring: MAGENTA }],
    ['sig-slashd', { bg: BLACK, ring: MAGENTA }],
    ['sig-od', { bg: BLACK, ring: MAGENTA }],
    ['sig-od-cream', { bg: CREAM, ring: MAGENTA }],
    ['app-magenta', { bg: MAGENTA, ring: WHITE }],
    ['app-dark', { bg: DARK, ring: MAGENTA }],
    ['app-cream', { bg: CREAM, ring: DARK }],
    ['app-cream-slash', { bg: CREAM, ring: MAGENTA }],
    ['app-slashd', { bg: BLACK, ring: MAGENTA }],
    ['app-od', { bg: BLACK, ring: MAGENTA }],
  ];

  it.each(colorCases)('"%s" renders with the configured background fill and ring stroke color', (id, expected) => {
    const cfg = AVATARS.find((a) => a.id === id);
    expect(cfg).toBeDefined();
    const svg = buildAvatarSVG(cfg);
    expect(svg).toContain(`fill="${expected.bg}"/>`);
    expect(svg).toContain(`stroke="${expected.ring}"`);
  });

  it('the "circle" shape is used for the Signature family, "rounded" for App icon', () => {
    AVATARS.filter((a) => a.g === 'sig').forEach((cfg) => {
      expect(cfg.shape).toBe('circle');
      expect(buildAvatarSVG(cfg)).toContain('<circle cx="400" cy="400" r="400"');
    });
    AVATARS.filter((a) => a.g === 'app').forEach((cfg) => {
      expect(cfg.shape).toBe('rounded');
      expect(buildAvatarSVG(cfg)).toContain('rx="184" ry="184"');
    });
  });

  it.each(AVATARS.filter((a) => a.mark === 'D').map((a) => a.id))(
    '"%s" (mark "D") renders exactly 1 <tspan> for the single-letter D glyph',
    (id) => {
      const cfg = AVATARS.find((a) => a.id === id);
      const svg = buildAvatarSVG(cfg);
      expect(tspanCount(svg)).toBe(1);
      expect(svg).toContain('>D</tspan>');
    }
  );

  it.each(AVATARS.filter((a) => a.mark === 'slashD').map((a) => a.id))(
    '"%s" (mark "slashD") renders exactly 1 <tspan> for the "/D" lockup glyph',
    (id) => {
      const cfg = AVATARS.find((a) => a.id === id);
      const svg = buildAvatarSVG(cfg);
      expect(tspanCount(svg)).toBe(1);
      expect(svg).toContain('>/D</tspan>');
    }
  );

  it.each(AVATARS.filter((a) => a.mark === 'oslashd').map((a) => a.id))(
    '"%s" (mark "oslashd") renders exactly 2 <tspan>s ("O" then "/D"), with the "/D" run in the magenta accent color',
    (id) => {
      const cfg = AVATARS.find((a) => a.id === id);
      const svg = buildAvatarSVG(cfg);
      expect(tspanCount(svg)).toBe(2);
      expect(svg).toContain('>O</tspan>');
      expect(svg).toMatch(new RegExp(`fill="${cfg.accent}"[^>]*>/D</tspan>`));
    }
  );

  it('supports overriding the shape independent of the variant canonical shape', () => {
    const cfg = AVATARS.find((a) => a.id === 'sig-magenta');
    const forcedSquare = buildAvatarSVG(cfg, 'square');
    expect(forcedSquare).toContain('<rect x="0" y="0" width="800" height="800"');
    expect(forcedSquare).not.toContain('<circle cx="400" cy="400" r="400"');
  });

  it('exposes exactly 2 photo placeholder configs (circle + rounded)', () => {
    expect(PHOTOS).toHaveLength(2);
    expect(PHOTOS.map((p) => p.shape)).toEqual(['circle', 'rounded']);
  });

  it.each(PHOTOS.map((p) => [p.id, p]))(
    'buildPhotoPlaceholderSVG("%s") renders a magenta ring and scales via width="100%%"',
    (id, photo) => {
      const svg = buildPhotoPlaceholderSVG(photo);
      expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true);
      expect(svg).toContain('viewBox="0 0 800 800"');
      expect(svg).toContain('width="100%"');
      expect(svg).toContain('height="100%"');
      expect(svg).toContain(`stroke="${MAGENTA}"`);
    }
  );
});
