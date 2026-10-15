import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/Icons/Logo';

export const gitConfig = {
  user: 'hyperse-io',
  repo: 'track',
  branch: 'main',
};

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="flex items-center gap-2">
        <Logo height="20" />
        <span className="font-extralight">Hyperse Track</span>
      </span>
    ),
  },
  githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  links: [
    {
      text: 'Documentation',
      url: '/docs',
      active: 'nested-url',
    },
    {
      text: 'FAQ',
      url: '/docs/faq',
    },
  ],
};
