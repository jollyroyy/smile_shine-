/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts}',
  ],
  theme: {
    // The palette is replaced rather than extended. Tailwind's default ramps
    // are what let the first draft reach for slate-900/cyan-400/rose-500 at
    // random; with them gone, every colour on the page has to come from a
    // token that was actually chosen for it.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      ink: {
        DEFAULT: 'var(--ink)',
        raise: 'var(--ink-raise)',
        sink: 'var(--ink-sink)',
      },
      bone: {
        DEFAULT: 'var(--bone)',
        dim: 'var(--bone-dim)',
        mute: 'var(--bone-mute)',
      },
      mint: {
        DEFAULT: 'var(--mint)',
        deep: 'var(--mint-deep)',
        wash: 'var(--mint-wash)',
      },
      line: {
        DEFAULT: 'var(--line)',
        firm: 'var(--line-firm)',
      },
      danger: 'var(--danger)',
    },
    borderRadius: {
      none: '0',
      sm: 'var(--r-sm)',
      DEFAULT: 'var(--r-sm)',
      md: 'var(--r-md)',
      full: 'var(--r-pill)',
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-text)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1180px',
        prose: '62ch',
      },
      transitionTimingFunction: {
        ease: 'var(--ease)',
      },
    },
  },
  plugins: [],
};
