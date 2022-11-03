/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin .3s linear infinite',
      }
    }
  },
  plugins: [],
}
