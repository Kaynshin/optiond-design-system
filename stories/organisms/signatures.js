/**
 * Email signature HTML-table generator — ported 1:1 from the JS-generated markup
 * captured in `signatures.rendered.html` (source of truth: `init/Signatures email
 * Option D (standalone).html`). Deliberately table-based, inline-styled markup:
 * this is what actually survives Gmail / Outlook / Apple Mail paste, so it is not
 * rewritten with modern CSS.
 */

const C = {
  mag: '#FF006E',
  ink: '#0A0A0A',
  dark: '#0A0A0A',
  white: '#FFFFFF',
  cream: '#F5F1EA',
  bodyD: '#CCCCCC',
  mutedD: '#888888',
  hairD: '#2A2A2A',
  inkBody: '#3A3A3A',
  mutedL: '#75758A',
  hairL: '#D9D4CB',
};
const SANS = "'Geist',Helvetica,Arial,sans-serif";
const MONO = "'Geist Mono','SF Mono',Consolas,'Liberation Mono',monospace";
const A = { mail: 'david@optiond.fr', site: 'optiond.fr', siteHref: 'https://optiond.fr', name: 'David' };

function sub(named) {
  return named ? '— DAVID&nbsp;&middot;&nbsp;DIGITAL —' : '— DIGITAL —';
}
function role(colText, colSlash) {
  const sl = `<span style="color:${colSlash};font-weight:600;">/</span>`;
  return `Agents&nbsp;IA ${sl} RDV&nbsp;IA ${sl} Sites&nbsp;internet`;
}

function sigHalo(named) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="480" bgcolor="${C.dark}" style="border-collapse:collapse;background-color:${C.dark};border-radius:12px;">
  <tr><td bgcolor="${C.dark}" style="padding:22px 28px;background-color:${C.dark};font-family:${SANS};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="middle" style="vertical-align:middle;padding-right:26px;white-space:nowrap;">
        <div style="font-family:${SANS};font-size:30px;font-weight:700;letter-spacing:-1.3px;color:${C.white};line-height:1;">Option<span style="color:${C.mag};">/D</span></div>
        <div style="font-family:${MONO};font-size:10px;font-weight:500;letter-spacing:2.4px;color:${C.mutedD};margin-top:9px;">${sub(named)}</div>
      </td>
      <td valign="middle" style="vertical-align:middle;border-left:1px solid ${C.hairD};padding-left:26px;">
        ${
          named
            ? `<div style="font-family:${SANS};font-size:15px;font-weight:600;color:${C.white};line-height:1.3;">${A.name}</div>
        <div style="font-family:${SANS};font-size:12px;color:${C.bodyD};line-height:1.5;margin-top:3px;">${role(C.bodyD, C.mag)}</div>
        <div style="font-family:${MONO};font-size:12px;line-height:1.95;margin-top:11px;">
          <a href="mailto:${A.mail}" style="color:${C.bodyD};text-decoration:none;">${A.mail}</a><br>
          <a href="${A.siteHref}" style="color:${C.mag};text-decoration:none;font-weight:500;">${A.site}</a>
        </div>`
            : `<div style="font-family:${SANS};font-size:13px;font-weight:500;color:${C.bodyD};line-height:1.55;">${role(C.bodyD, C.mag)}</div>
        <div style="font-family:${MONO};font-size:12px;line-height:1;margin-top:12px;">
          <a href="${A.siteHref}" style="color:${C.mag};text-decoration:none;font-weight:500;">${A.site}</a>
        </div>`
        }
      </td>
    </tr></table>
  </td></tr>
</table>`;
}

function sigSlash(named) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.dark}" style="border-collapse:collapse;background-color:${C.dark};border-radius:12px;">
  <tr>
    <td width="4" bgcolor="${C.mag}" style="width:4px;background-color:${C.mag};border-radius:12px 0 0 12px;font-size:1px;line-height:1px;">&nbsp;</td>
    <td bgcolor="${C.dark}" style="padding:20px 26px 20px 22px;background-color:${C.dark};font-family:${SANS};">
      <div style="font-family:${SANS};font-size:26px;font-weight:700;letter-spacing:-1.1px;color:${C.white};line-height:1;">Option<span style="color:${C.mag};">/D</span></div>
      <div style="font-family:${MONO};font-size:10px;font-weight:500;letter-spacing:2.4px;color:${C.mutedD};margin-top:8px;">${sub(named)}</div>
      <div style="font-family:${SANS};font-size:13px;font-weight:${named ? 600 : 400};color:${named ? C.white : C.bodyD};line-height:1.4;margin-top:14px;">${
        named
          ? `${A.name} <span style="color:${C.mutedD};font-weight:400;">&mdash;</span> <span style="font-weight:400;color:${C.bodyD};">${role(C.bodyD, C.mag)}</span>`
          : role(C.bodyD, C.mag)
      }</div>
      <div style="font-family:${MONO};font-size:12px;color:${C.bodyD};line-height:1;margin-top:12px;padding-top:13px;border-top:1px solid ${C.hairD};">
        <a href="${A.siteHref}" style="color:${C.mag};text-decoration:none;font-weight:500;">${A.site}</a>${
          named
            ? `
        <span style="color:${C.hairD};">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
        <a href="mailto:${A.mail}" style="color:${C.bodyD};text-decoration:none;">${A.mail}</a>`
            : ``
        }
      </div>
    </td>
  </tr>
</table>`;
}

function sigLigne(named) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.dark}" style="border-collapse:collapse;background-color:${C.dark};border-radius:10px;">
  <tr><td bgcolor="${C.dark}" style="padding:16px 22px;background-color:${C.dark};font-family:${SANS};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="middle" style="vertical-align:middle;padding-right:18px;border-right:1px solid ${C.hairD};white-space:nowrap;">
        <span style="font-family:${SANS};font-size:22px;font-weight:700;letter-spacing:-1px;color:${C.white};">Option<span style="color:${C.mag};">/D</span></span>
      </td>
      <td valign="middle" style="vertical-align:middle;padding-left:18px;">
        ${
          named
            ? `<div style="font-family:${SANS};font-size:13px;font-weight:600;color:${C.white};line-height:1.4;">${A.name}</div>
        <div style="font-family:${MONO};font-size:11px;color:${C.bodyD};line-height:1.5;margin-top:3px;">
          <a href="${A.siteHref}" style="color:${C.mag};text-decoration:none;font-weight:500;">${A.site}</a>
          <span style="color:${C.mutedD};">&nbsp;&middot;&nbsp;</span>
          <a href="mailto:${A.mail}" style="color:${C.bodyD};text-decoration:none;">${A.mail}</a>
        </div>`
            : `<div style="font-family:${SANS};font-size:12px;font-weight:500;color:${C.bodyD};line-height:1.45;">${role(C.bodyD, C.mag)}</div>
        <div style="font-family:${MONO};font-size:11px;line-height:1.5;margin-top:4px;">
          <a href="${A.siteHref}" style="color:${C.mag};text-decoration:none;font-weight:500;">${A.site}</a>
        </div>`
        }
      </td>
    </tr></table>
  </td></tr>
</table>`;
}

function sigCream(named) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="480" bgcolor="${C.cream}" style="border-collapse:collapse;background-color:${C.cream};border-radius:12px;">
  <tr><td bgcolor="${C.cream}" style="padding:22px 28px;background-color:${C.cream};font-family:${SANS};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="middle" style="vertical-align:middle;padding-right:26px;white-space:nowrap;">
        <div style="font-family:${SANS};font-size:30px;font-weight:700;letter-spacing:-1.3px;color:${C.ink};line-height:1;">Option<span style="color:${C.mag};">/D</span></div>
        <div style="font-family:${MONO};font-size:10px;font-weight:500;letter-spacing:2.4px;color:${C.mutedL};margin-top:9px;">${sub(named)}</div>
      </td>
      <td valign="middle" style="vertical-align:middle;border-left:1px solid ${C.hairL};padding-left:26px;">
        ${
          named
            ? `<div style="font-family:${SANS};font-size:15px;font-weight:600;color:${C.ink};line-height:1.3;">${A.name}</div>
        <div style="font-family:${SANS};font-size:12px;color:${C.inkBody};line-height:1.5;margin-top:3px;">${role(C.inkBody, C.mag)}</div>
        <div style="font-family:${MONO};font-size:12px;line-height:1.95;margin-top:11px;">
          <a href="mailto:${A.mail}" style="color:${C.inkBody};text-decoration:none;">${A.mail}</a><br>
          <a href="${A.siteHref}" style="color:${C.mag};text-decoration:none;font-weight:500;">${A.site}</a>
        </div>`
            : `<div style="font-family:${SANS};font-size:13px;font-weight:500;color:${C.inkBody};line-height:1.55;">${role(C.inkBody, C.mag)}</div>
        <div style="font-family:${MONO};font-size:12px;line-height:1;margin-top:12px;">
          <a href="${A.siteHref}" style="color:${C.mag};text-decoration:none;font-weight:500;">${A.site}</a>
        </div>`
        }
      </td>
    </tr></table>
  </td></tr>
</table>`;
}

export const SIGNATURES = {
  halo: { label: 'Halo — dark signature', desc: 'Wordmark + filet, puis tagline et coordonnées. La carte de référence, sobre.', dim: '~480 × 96 px · fond #0A0A0A', html: sigHalo },
  slash: { label: 'Slash — rail magenta', desc: 'Rail magenta plein à gauche, bloc compact, contact sur une ligne. Builder-in-public.', dim: '~430 × 130 px · fond #0A0A0A', html: sigSlash },
  ligne: { label: 'Ligne — ultra condensé', desc: 'Le minimum vital : wordmark, tagline, site. Pour les réponses rapides.', dim: '~400 × 64 px · fond #0A0A0A', html: sigLigne },
  cream: { label: 'Cream — pour fils blancs', desc: 'Variante claire du Halo. Idéale si ton client mail force un fond blanc.', dim: '~480 × 96 px · fond #F5F1EA', html: sigCream },
};
