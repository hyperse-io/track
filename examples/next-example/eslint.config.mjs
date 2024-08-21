import { defineConfig, nextjs } from '@hyperse/eslint-config-hyperse';

export default defineConfig([
  ...nextjs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
