import fs from 'node:fs';
import path from 'node:path';

const layoutPath = path.resolve(
  import.meta.dirname,
  '../../node_modules/nextra-theme-docs/dist/layout.js'
);

if (!fs.existsSync(layoutPath)) {
  console.warn('nextra-theme-docs layout.js not found, skip patch');
  process.exit(0);
}

const source = fs.readFileSync(layoutPath, 'utf8');
const from = '} = LayoutPropsSchema.safeParse(themeConfig);';
const to = '} = LayoutPropsSchema.safeParse({ ...themeConfig, children });';

if (source.includes(to)) {
  console.log('nextra-theme-docs layout patch already applied');
  process.exit(0);
}

if (!source.includes(from)) {
  console.warn('nextra-theme-docs layout patch pattern not found');
  process.exit(1);
}

fs.writeFileSync(layoutPath, source.replace(from, to));
console.log('patched nextra-theme-docs layout.js');
