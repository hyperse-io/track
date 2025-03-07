import { defineConfig } from '@flatjs/forge';

export default defineConfig({
  input: ['src/index.ts'],
  dts: {
    compilationOptions: {
      followSymlinks: false,
      preferredConfigPath: 'tsconfig.build.json',
    },
    entryPointOptions: {
      libraries: {
        importedLibraries: ['@hyperse/pipeline'],
      },
    },
  },
  output: {
    bundledDependencies: [],
    sourcemap: true,
  },
  plugin: {
    pluginConfigs: {
      babelOptions: {
        usePreset: 'node',
      },
    },
  },
});
