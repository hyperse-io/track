import { createGenerator } from 'fumadocs-typescript';

/**
 * Shared TypeScript generator used by `<AutoTypeTable />` in MDX.
 *
 * The `dist/*.d.ts` files of the workspace packages are resolved through the
 * root `tsconfig` paths, so API tables always reflect the built types.
 */
export const generator = createGenerator({
  tsconfigPath: './tsconfig.json',
});

export const typeTableBasePath = process.cwd();
