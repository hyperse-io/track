import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  dts: true,
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: !options.watch,
  clean: true,
  minify: !options.watch,
  treeshake: true,
  tsconfig: './tsconfig.build.json',
  format: ['esm'],
}));
