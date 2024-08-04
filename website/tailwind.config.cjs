/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  corePlugins: {
    // Avoid conflicts with antd
    preflight: false,
  },
  content: ['./docs/**/*.{js,tsx,md,mdx}', './src/**/*.{js,tsx,md,mdx}'],
  theme: {
    extend: {},
  },
};
