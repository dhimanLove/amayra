/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'carbon-ink': '#0f0f0f',
        'graphite': '#222222',
        'iron': '#4c4c4c',
        'steel': '#606060',
        'slate': '#898989',
        'fog': '#9d9d9d',
        'silver': '#b2b2b2',
        'pewter': '#c6c6c6',
        'ash': '#dbdbdb',
        'mist': '#efefef',
        'canvas-white': '#ffffff',
        'ice-blue': '#e6f1ff',
        'ice-blue-dark': '#cce0ff',
        'cobalt-spark': '#0c76fe',
        'cobalt-dark': '#0a5fd4',
        'lime-glow': '#dcf58f',
        'lime-glow-dark': '#c8e07a',
      },
      fontFamily: {
        'sans': ['Elms Sans', 'system-ui', 'sans-serif'],
        'serif': ['Newsreader', 'GT Sectra', 'Georgia', 'serif'],
        'mono': ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'display': ['64px', { lineHeight: '1.0', letterSpacing: '-1.92px' }],
        'heading': ['48px', { lineHeight: '1.1', letterSpacing: '-0.86px' }],
        'heading-sm': ['36px', { lineHeight: '1.15', letterSpacing: '-0.5px' }],
        'subheading': ['24px', { lineHeight: '1.25', letterSpacing: '-0.24px' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.6' }],
        'eyebrow': ['13px', { lineHeight: '1', letterSpacing: '0.12em' }],
        'caption': ['12px', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      borderRadius: {
        'full': '9999px',
        'card': '12px',
        'lg': '16px',
      },
      maxWidth: {
        'page': '1280px',
        'content': '720px',
      },
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(12, 118, 254, 0.15)',
        'glow-sm': '0 0 20px rgba(12, 118, 254, 0.1)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
