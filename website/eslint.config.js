import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import { defineConfig, nextjs } from '@hyperse/eslint-config-hyperse';

export default defineConfig(
  [
    ...nextjs,
    {
      extends: [eslintPluginBetterTailwindcss.configs.correctness],
      settings: {
        'better-tailwindcss': {
          entryPoint: 'src/app/globals.css',
        },
      },
    },
    {
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@eslint-react/dom-no-dangerously-set-innerhtml': 'off',
      },
    },
    {
      files: ['**/*.mdx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  ['**/out', 'next-env.d.ts']
);
