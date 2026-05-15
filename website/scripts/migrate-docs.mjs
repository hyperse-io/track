import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const OUT = path.join(ROOT, 'src/app');

const ROUTE_MAP = {
  'intro/introducing': 'guide/introduction',
  'intro/installation': 'guide/installation',
  'intro/sample-example': 'guide/sample-example',
  'intro/live-example': 'guide/live-example',
  'api/base-adapter': 'api/base-adapter',
  'api/adapter-builder': 'api/adapter-builder',
  'api/track-builder': 'api/track-builder',
  'community/contributing': 'community/contributing',
  faq: 'faq',
  'plugins/google-adapter': 'plugins/google-adapter',
  'plugins/facebook-adapter': 'plugins/facebook-adapter',
  'plugins/klaviyo-adapter': 'plugins/klaviyo-adapter',
};

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(md|mdx)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function titleCase(slug) {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function transformContent(raw, relPath) {
  let content = raw;

  // Strip docusaurus-only frontmatter fields
  content = content.replace(
    /^---\n([\s\S]*?)\n---\n/,
    (match, body) => {
      const lines = body
        .split('\n')
        .filter(
          (line) =>
            !line.startsWith('title:') &&
            !line.startsWith('hide_table_of_contents:')
        );
      if (lines.length === 0) return '';
      return `---\n${lines.join('\n')}\n---\n`;
    }
  );

  content = content.replace(
    /^import PreviewUML from '@site\/src\/components\/PreviewUML';\n\n?/m,
    ''
  );

  content = content.replace(/```bash npm2yarn\n/g, '```bash\n');
  content = content.replace(/```(bash|sh) npm2yarn\n/g, '```$1\n');

  content = content.replace(/\/docs\/intro\//g, '/guide/');
  content = content.replace(/\/docs\/api\//g, '/api/');
  content = content.replace(/\/docs\/plugins\//g, '/plugins/');
  content = content.replace(/\/docs\/faq/g, '/faq');
  content = content.replace(/\/docs\/community\//g, '/community/');

  content = content.replace(
    /\]\(\.\.\/types\/([^)]+)\.mdx\)/g,
    '](/plugins/types/$1)'
  );
  content = content.replace(
    /\]\(\.\.\/types\/([^)]+)\)/g,
    '](/plugins/types/$1)'
  );
  content = content.replace(/\.mdx\)/g, ')');
  content = content.replace(/\.md\)/g, ')');

  if (relPath.includes('intro/introducing')) {
    content = content.replace(
      /\[props\]\(\/api\/base-adapter\)/,
      '[BaseAdapter](/api/base-adapter)'
    );
  }

  return content.trim() + '\n';
}

function destFor(relFromDocs) {
  const base = relFromDocs.replace(/\.(md|mdx)$/, '');
  if (ROUTE_MAP[base]) return ROUTE_MAP[base];
  if (base.startsWith('plugins/')) return base;
  return null;
}

function writePage(destRel, content) {
  const pageDir = path.join(OUT, destRel, 'page.mdx');
  fs.mkdirSync(path.dirname(pageDir), { recursive: true });
  fs.writeFileSync(pageDir, content);
}

function writeMeta(dirRel, entries) {
  const lines = [
    "import type { MetaRecord } from 'nextra';",
    '',
    'const meta: MetaRecord = {',
    ...entries.map(([key, title]) => `  ${JSON.stringify(key)}: { title: ${JSON.stringify(title)} },`),
    '};',
    '',
    'export default meta;',
    '',
  ];
  const metaPath = path.join(OUT, dirRel, '_meta.tsx');
  fs.mkdirSync(path.dirname(metaPath), { recursive: true });
  fs.writeFileSync(metaPath, lines.join('\n'));
}

// Migrate doc files
for (const file of walk(DOCS)) {
  const rel = path.relative(DOCS, file);
  if (rel === 'changelog.mdx') continue;

  const dest = destFor(rel);
  if (!dest) {
    console.warn('skip', rel);
    continue;
  }

  const content = transformContent(fs.readFileSync(file, 'utf8'), rel);
  writePage(dest, content);
  console.log('migrated', rel, '->', dest);
}

// Generate _meta for event folders
const eventDirs = [
  'plugins/standard-events',
  'plugins/google-events',
  'plugins/facebook-events',
  'plugins/klaviyo-events',
  'plugins/types',
];

for (const dirRel of eventDirs) {
  const dir = path.join(OUT, dirRel);
  if (!fs.existsSync(dir)) continue;
  const slugs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  writeMeta(
    dirRel,
    slugs.map((s) => [s, titleCase(s)])
  );
}

console.log('done');
