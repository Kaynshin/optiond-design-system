import { describe, it, expect } from 'vitest';
import BadgeMeta, { Playground, AllVariants } from '../../stories/atoms/Badge.stories.js';

describe('Atoms / Badge', () => {
  it('renders the .od-badge--pill class for the pill variant', () => {
    const html = Playground.render({ ...BadgeMeta.args, variant: 'pill' });
    expect(html).toContain('od-badge od-badge--pill');
  });

  it('renders the .od-badge--magenta class for the magenta variant', () => {
    const html = Playground.render({ ...BadgeMeta.args, variant: 'magenta' });
    expect(html).toContain('od-badge od-badge--magenta');
  });

  it('renders the .od-badge--dot class for the dot variant', () => {
    const html = Playground.render({ ...BadgeMeta.args, variant: 'dot' });
    expect(html).toContain('od-badge od-badge--dot');
  });

  it('renders the label text', () => {
    const html = Playground.render({ ...BadgeMeta.args, variant: 'pill', label: 'Disponible' });
    expect(html).toContain('Disponible');
  });

  it('the dot variant uses the primary (magenta) accent color when active', () => {
    const html = Playground.render({ ...BadgeMeta.args, variant: 'dot', dotActive: true });
    expect(html).toContain('--dot-color:var(--od-color-primary)');
  });

  it('the dot variant uses the muted color when inactive', () => {
    const html = Playground.render({ ...BadgeMeta.args, variant: 'dot', dotActive: false });
    expect(html).toContain('--dot-color:var(--od-color-muted-on-dark)');
  });

  it('AllVariants renders pill, magenta, and dot together', () => {
    const html = AllVariants.render(BadgeMeta.args);
    expect(html).toContain('od-badge--pill');
    expect(html).toContain('od-badge--magenta');
    expect(html).toContain('od-badge--dot');
  });
});
