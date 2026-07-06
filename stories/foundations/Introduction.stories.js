/**
 * Foundations / Introduction — install, CDN usage, theming.
 * A docs-style page rendered as a plain HTML story (no MDX pipeline needed).
 */
export default {
  title: 'Foundations/Introduction',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

const section = (title, body) => `
  <section style="margin:0 0 40px;">
    <h2 style="font:700 20px/1.2 var(--od-font-sans);letter-spacing:-0.01em;margin:0 0 12px;">${title}</h2>
    ${body}
  </section>
`;

const codeBlock = (code) => `
  <pre style="background:var(--od-color-surface-card, #1A1A1A);color:var(--od-color-body-on-dark,#CCCCCC);
    border:1px solid var(--od-color-hairline-dark,#2A2A2A);border-radius:var(--od-radius-8);
    padding:16px 18px;font:12px/1.6 var(--od-font-mono);overflow:auto;margin:0;">${code}</pre>
`;

export const Usage = {
  render: () => `
    <div style="max-width:760px;margin:0 auto;padding:48px 24px 64px;font-family:var(--od-font-sans);">
      <div class="od-wordmark" style="margin-bottom:8px;">Option<span class="od-wordmark__accent">/D</span></div>
      <p class="od-signature" style="display:block;margin-bottom:32px;">— DAVID · DIGITAL —</p>

      ${section('Installation (npm)', codeBlock('npm install option-d-design-system'))}

      ${section('Import CSS', codeBlock(
        `import 'option-d-design-system/css';\n// ou : &lt;link rel="stylesheet" href="node_modules/option-d-design-system/dist/option-d.css"&gt;`
      ))}

      ${section('CDN', codeBlock(
        `&lt;link rel="stylesheet"\n  href="https://unpkg.com/option-d-design-system/dist/option-d.css"&gt;`
      ))}

      ${section('Tokens JS / Tailwind preset', codeBlock(
        `import tokens from 'option-d-design-system';\nimport odPreset from 'option-d-design-system/tailwind';`
      ))}

      ${section('Thèmes', `
        <p style="font:14px/1.6 var(--od-font-sans);color:var(--od-color-text-muted);max-width:60ch;margin:0 0 12px;">
          Les alias sémantiques (<code>--od-color-canvas</code>, <code>--od-color-text</code>, ...) basculent
          via l'attribut <code>data-theme="dark"</code> (ou la classe <code>.od-dark</code>) posé sur un
          conteneur ancêtre. Par défaut (aucun attribut), le thème est <strong>light</strong>.
        </p>
        ${codeBlock(`&lt;body data-theme="dark"&gt;...&lt;/body&gt;\n&lt;div class="od-dark"&gt;...&lt;/div&gt;`)}
      `)}

      ${section('Invariants de marque', `
        <ul style="font:14px/1.7 var(--od-font-sans);color:var(--od-color-text-muted);padding-left:20px;margin:0;">
          <li>Accent unique magenta <code>#FF006E</code> — jamais de bichromie.</li>
          <li>Wordmark : <code>/</code> et <code>D</code> toujours magenta ; « Option » hérite la couleur du texte.</li>
          <li>Signature : deux termes fixes — <code>DAVID · DIGITAL</code>.</li>
          <li>Halo réservé au Hero et aux bannières hero.</li>
          <li>Avatars : une seule couleur d'accent, D centré dans sa zone de sécurité.</li>
        </ul>
      `)}
    </div>
  `,
};
