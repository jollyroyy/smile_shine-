/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          teal: '#06b6d4',
          cyan: '#22d3ee',
          sky: '#0284c7',
          platinum: '#f8fafc',
        },
      },
      letterSpacing: {
        widest: '.2em',
        luxury: '.25em',
      },
    },
  },
  plugins: [],
};
