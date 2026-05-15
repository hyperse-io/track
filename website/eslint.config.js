import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, nextjs } from '@hyperse/eslint-config-hyperse';

const websiteDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(
  [
    ...nextjs,
    {
      extends: [eslintPluginBetterTailwindcss.configs.correctness],
      settings: {
        'better-tailwindcss': {
          entryPoint: path.join(websiteDir, 'src/app/globals.css'),
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
