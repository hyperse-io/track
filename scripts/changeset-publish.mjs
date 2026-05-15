import { execSync } from 'node:child_process';
import { delimiter, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const scriptsDir = join(root, 'scripts');

execSync('changeset publish', {
  stdio: 'inherit',
  env: {
    ...process.env,
    PATH: [scriptsDir, process.env.PATH].filter(Boolean).join(delimiter),
  },
});
