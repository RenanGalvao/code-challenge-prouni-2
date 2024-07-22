/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Using modern `rgb`
        dominant: 'rgb(var(--color-dominant) / <alpha-value>)',
        complementary: 'rgb(var(--color-complementary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',

        // Using modern `hsl`
        dominant: 'hsl(var(--color-dominant) / <alpha-value>)',
        complementary: 'hsl(var(--color-complementary) / <alpha-value>)',
        accent: 'hsl(var(--color-accent) / <alpha-value>)',

        // Using legacy `rgba`
        dominant: 'rgba(var(--color-dominant), <alpha-value>)',
        complementary: 'rgba(var(--color-complementary), <alpha-value>)',
        accent: 'rgba(var(--color-accent) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}

