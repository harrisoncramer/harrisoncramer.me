/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Helvetica'],
      serif: [],
      display: ['Nugelo'],
      playfair: 'Playfair',
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.55rem',
      '2xl': '1.8rem',
      '3xl': '2rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'app-blue': "#9ec4ff",
      'app-white': '#ffffff',
      'app-black': '#0d0d0d',
      'app-background-dark': '#141414',
      'app-background-medium': '#2e2e2e',
      'app-background-medium-dark': '#1e1e1e',
      'app-background-light': '#242424',
      'app-gray': '#C9D1D9',
    },
    extend: {
      screens: {
        betterhover: { raw: '(hover: hover)' },
      },
      transitionProperty: {
        height: 'height',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

