import { fileURLToPath } from 'url';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 100000000,
    exclude: [...configDefaults.exclude],
    alias: {
      '~/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
  },
});
