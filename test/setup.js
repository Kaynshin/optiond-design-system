/**
 * happy-dom does not implement a real <canvas> 2D rendering context
 * (`canvas.getContext('2d')` returns `null`). Both `stories/organisms/banners.js`
 * and `stories/organisms/avatars.js` create an off-screen canvas at module load
 * time to measure text (`measureText`, `actualBoundingBox*`, `letterSpacing`) so
 * glyphs stay perfectly centered in the generated SVG markup.
 *
 * We install a minimal, deterministic fake 2D context so those modules can load
 * and run under Vitest without needing a native `canvas` binding. The metrics
 * are not pixel-accurate to a real browser, but they are internally consistent
 * (proportional to font size and text length), which is all the structural
 * assertions in this test suite need.
 */
function createFakeContext2D() {
  let currentFont = '';

  function fontSize() {
    const match = /(\d+(?:\.\d+)?)px/.exec(currentFont);
    return match ? parseFloat(match[1]) : 16;
  }

  return {
    get font() {
      return currentFont;
    },
    set font(value) {
      currentFont = value;
    },
    letterSpacing: '0px',
    textAlign: 'left',
    textBaseline: 'alphabetic',
    measureText(text) {
      const size = fontSize();
      const width = text.length * size * 0.6;
      return {
        width,
        actualBoundingBoxLeft: 0,
        actualBoundingBoxRight: width,
        actualBoundingBoxAscent: size * 0.7,
        actualBoundingBoxDescent: size * 0.15,
      };
    },
  };
}

if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = function getContext(type) {
    if (type === '2d') return createFakeContext2D();
    return null;
  };
}
