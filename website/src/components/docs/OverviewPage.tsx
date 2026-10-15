import type { FC, ReactNode } from 'react';
import { createElement } from 'react';
import type { Folder, Item, Node } from 'fumadocs-core/page-tree';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { icons as lucideIcons } from 'lucide-react';
import { source } from '@/lib/source';

const collectItems = (nodes: Node[]): Item[] => {
  const out: Item[] = [];
  for (const node of nodes) {
    if (node.type === 'page') {
      out.push(node);
    } else if (node.type === 'folder') {
      if (node.index) out.push(node.index);
      out.push(...collectItems(node.children));
    }
  }
  return out;
};

const groupByFolder = (
  nodes: Node[]
): { title?: ReactNode; items: Item[] }[] => {
  const groups: { title?: ReactNode; items: Item[] }[] = [];

  const looseItems = nodes.filter((n) => n.type === 'page') as Item[];
  if (looseItems.length > 0) {
    groups.push({ items: looseItems });
  }

  for (const node of nodes) {
    if (node.type !== 'folder') continue;
    const folder = node as Folder;
    const items = collectItems(folder.children);
    if (folder.index) items.unshift(folder.index);
    groups.push({ title: folder.name, items });
  }

  return groups;
};

/**
 * Resolves a page's `icon` frontmatter value into a rendered element.
 *
 * The `lucideIconsPlugin` on the source loader turns these into elements for
 * the sidebar, but `getPageTree()` output here is serialized, so we resolve the
 * name to a Lucide component directly. Falls back to any icon passed via the
 * legacy `icons` prop.
 */
const resolveIcon = (
  iconKey: string | undefined,
  fallback?: Record<string, FC<{ className?: string }>>
): ReactNode => {
  if (!iconKey) return undefined;
  const Icon =
    fallback?.[iconKey] ?? lucideIcons[iconKey as keyof typeof lucideIcons];
  return Icon ? createElement(Icon) : undefined;
};

export const OverviewPage: FC<{
  /** Legacy escape hatch: explicit icon components keyed by icon name. */
  icons?: Record<string, FC<{ className?: string }>>;
}> = ({ icons }) => {
  const tree = source.getPageTree();
  const groups = groupByFolder(tree.children);

  return (
    <>
      {groups.map((group) => (
        <section key={String(group.title) || group.items[0]?.url || 'group'}>
          {group.title ? <h2>{group.title}</h2> : null}
          <Cards>
            {group.items.map((item) => {
              const iconKey = (item as Item & { icon?: string }).icon;
              return (
                <Card
                  key={item.url}
                  title={item.name}
                  href={item.url}
                  icon={resolveIcon(iconKey, icons)}
                />
              );
            })}
          </Cards>
        </section>
      ))}
    </>
  );
};
