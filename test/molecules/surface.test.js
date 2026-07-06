import { describe, it, expect } from 'vitest';
import SurfaceMeta, { Playground, AllVariants } from '../../stories/molecules/Surface.stories.js';

describe('Molecules / Card · Surface', () => {
  it('renders .od-surface for the "soft" variant', () => {
    const html = Playground.render({ ...SurfaceMeta.args, variant: 'soft' });
    expect(html).toContain('class="od-surface"');
  });

  it('renders .od-card for the "card" variant', () => {
    const html = Playground.render({ ...SurfaceMeta.args, variant: 'card' });
    expect(html).toContain('class="od-card"');
  });

  it('renders .od-surface--elevated for the "elevated" variant', () => {
    const html = Playground.render({ ...SurfaceMeta.args, variant: 'elevated' });
    expect(html).toContain('class="od-surface--elevated"');
  });

  it('AllVariants renders all three surface classes together', () => {
    const html = AllVariants.render();
    expect(html).toContain('class="od-surface"');
    expect(html).toContain('class="od-card"');
    expect(html).toContain('class="od-surface--elevated"');
  });
});
