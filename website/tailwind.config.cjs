/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    // Avoid conflicts with antd
    preflight: false,
  },
  content: [
    './docs/**/*.{js,tsx,md,mdx}',
    './src/**/*.{js,tsx,md,mdx}',
    './copyright.config.ts',
  ],
  theme: {
    extend: {},
  },
};
