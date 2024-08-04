import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 100000,
    exclude: [...configDefaults.exclude],
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
  },
});
