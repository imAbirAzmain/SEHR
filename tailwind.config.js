/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#141311',
          charcoal: '#1c1917',
          espresso: '#2a231f',
          brown: '#5a483c',
          amber: '#603500',
          gold: '#c59b6d',
          'gold-light': '#dfc29c',
          'gold-dark': '#9e7343',
          cream: '#faf7f2',
          sand: '#f3ece2',
          border: '#e8e0d5',
          muted: '#8c827a'
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        display: ['Cinzel', 'Cormorant Garamond', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      aspectRatio: {
        'portrait': '3 / 4',
      }
    },
  },
  plugins: [],
}
