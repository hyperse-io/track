import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons';
import { docs } from '../../.source/server';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  // Resolves the `icon` frontmatter field into a Lucide React element for the
  // sidebar. Without this the value stays a string and renders as nothing.
  plugins: [lucideIconsPlugin()],
});
