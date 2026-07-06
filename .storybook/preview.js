import '../dist/option-d.css';

/**
 * Global theme decorator — wraps every story in a canvas <div> carrying
 * `data-theme="light|dark"`, which drives the semantic --od-color-* aliases
 * defined in dist/option-d.css ([data-theme="dark"] / .od-dark selector).
 */
const withTheme = (Story, context) => {
  const theme = context.globals.theme || 'light';
  const wrapper = document.createElement('div');
  wrapper.setAttribute('data-theme', theme);
  wrapper.className = 'od-sans sb-canvas';
  wrapper.style.minHeight = '100%';
  wrapper.style.padding = '0';
  wrapper.style.background = 'var(--od-color-canvas)';
  wrapper.style.color = 'var(--od-color-text)';
  wrapper.style.fontFamily = 'var(--od-font-sans)';

  const result = Story();
  if (typeof result === 'string') {
    wrapper.innerHTML = result;
  } else if (result instanceof Node) {
    wrapper.appendChild(result);
  }
  return wrapper;
};

/** @type {import('@storybook/html-vite').Preview} */
const preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'canvas-light',
      values: [
        { name: 'canvas-light', value: '#FFFFFF' },
        { name: 'canvas-dark', value: '#0A0A0A' },
        { name: 'pure-black', value: '#000000' },
        { name: 'cream', value: '#F5F1EA' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color|fill|bg)$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Option/D global theme (data-theme)',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
