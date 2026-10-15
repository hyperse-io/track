import { createMDX } from 'fumadocs-mdx/next';
import path from 'node:path';
import { z } from 'zod/v4';
import { createNextConfig, createNextConfigEnv } from '@hyperse/next-config';
import { basePath } from './src/lib/base-path';

const withMDX = createMDX();

// We use a custom env to validate the build env
const buildEnv = createNextConfigEnv(
  z.object({
    NEXT_BUILD_ENV_OUTPUT: z
      .union([z.literal('standalone'), z.literal('export')])
      .optional(),
  })
);

export default createNextConfig(
  {
    basePath,
    output: buildEnv.NEXT_BUILD_ENV_OUTPUT,
    images: {
      unoptimized:
        buildEnv.NEXT_BUILD_ENV_OUTPUT === 'export' ? true : undefined,
    },
    /*
      Turbopack resolves packages (e.g. `next`) relative to its workspace root,
      which it auto-detects by walking up to the nearest lockfile. In CI the repo
      is checked out at a deeper path, and Next.js then rejects that root because
      it would include the runner's home directory, falling back to `website/`
      where the hoisted `node_modules` is not visible:

        Error: Could not find the Next.js package (next/package.json)

      Pinning the root to the monorepo directory keeps resolution stable across
      local and CI environments.
    */
    turbopack: {
      root: path.join(import.meta.dirname, '..'),
    },
  },
  [withMDX]
);
