/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Helvetica'],
      serif: [],
      display: ['Nugelo'],
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
      'app-white': '#ffffff',
      'app-black': '#000000',
      'app-header': '#f8b591',
      'app-theme': '#f4473a',
      'app-background': '#fff5e1',
      'app-background-dark': '#e6ddcc',
      'app-gray': '#ebebf2',
      'app-gray-light': '#f8f8ff',
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
