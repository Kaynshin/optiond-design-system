// Cross-platform asset assembly step, run after style-dictionary.config.mjs.
//  1. Assemble dist/option-d.css = @font-face (build/fontface.css) + generated tokens
//     (dist/_od-tokens.css) + hand-authored primitives (build/primitives.css).
//  2. Copy the 11 self-hosted Geist/Geist Mono woff2 files + OFL license into dist/fonts/.
//  3. Copy the tailwind preset source into dist/.
import { readFile, writeFile, rm, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const dist = path.join(root, 'dist');

async function assembleCss() {
  const [fontface, tokens, primitives] = await Promise.all([
    readFile(path.join(root, 'build/fontface.css'), 'utf8'),
    readFile(path.join(dist, '_od-tokens.css'), 'utf8'),
    readFile(path.join(root, 'build/primitives.css'), 'utf8'),
  ]);

  const banner = `/*!
 * option-d-design-system — dist/option-d.css
 * Generated file: fonts (build/fontface.css) + tokens (tokens/*.tokens.json via Style Dictionary)
 * + primitives (build/primitives.css). Do not edit directly.
 */\n`;

  const css = [banner, fontface.trim(), '', tokens.trim(), '', primitives.trim(), ''].join('\n');
  await writeFile(path.join(dist, 'option-d.css'), css, 'utf8');
  await rm(path.join(dist, '_od-tokens.css'));
  console.log('✔ dist/option-d.css assembled');
}

async function copyFonts() {
  const destDir = path.join(dist, 'fonts');
  await mkdir(destDir, { recursive: true });
  await cp(path.join(root, 'assets/fonts'), destDir, { recursive: true });
  console.log('✔ dist/fonts/ (11 woff2 + LICENSE-OFL.txt)');
}

async function copyTailwindPreset() {
  await cp(path.join(root, 'build/tailwind-preset.js'), path.join(dist, 'tailwind-preset.js'));
  console.log('✔ dist/tailwind-preset.js');
}

await mkdir(dist, { recursive: true });
await assembleCss();
await copyFonts();
await copyTailwindPreset();
