/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    // Avoid conflicts with antd
    preflight: false,
  },
  content: ['./app/**/*.{js,tsx,md,mdx}'],
  theme: {
    extend: {},
  },
};
