import { base, defineConfig } from '@hyperse/eslint-config-hyperse';

export default defineConfig([
  // ...typescript
  ...base,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]);
