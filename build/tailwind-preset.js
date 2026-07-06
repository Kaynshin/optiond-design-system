// Tailwind CSS preset for option-d-design-system.
// Hand-authored (not generated) — copied as-is into dist/ by build/copy-assets.mjs, where it
// sits next to the generated dist/tokens.js and imports it as a sibling module.
//
// ESM by design: package.json declares "type": "module", so a .js file under this package is
// parsed as ESM. Consume it with `import` (see README) — not `require()`.
import { color, font, fontSize, space, radius, effect } from './tokens.js';

const splitFontFamily = (value) => value.split(',').map((part) => part.trim());

/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        ...color,
        halo: effect.halo,
      },
      fontFamily: {
        sans: splitFontFamily(font.sans),
        mono: splitFontFamily(font.mono),
      },
      fontWeight: font.weight,
      fontSize,
      spacing: space,
      borderRadius: radius,
    },
  },
};

export default preset;
