import type { MetaRecord } from 'nextra';

const meta: MetaRecord = {
  index: {
    type: 'page',
    display: 'hidden',
  },
  guide: {
    type: 'page',
    title: 'Guide',
  },
  api: {
    type: 'page',
    title: 'API',
  },
  plugins: {
    type: 'page',
    title: 'Plugins',
  },
  resources: {
    type: 'menu',
    title: 'Resources',
    items: {
      community: {
        title: 'Contributing',
        href: '/community/contributing',
      },
      changelog: {
        title: 'Changelog',
        href: 'https://github.com/hyperse-io/track/blob/main/CHANGELOG.md',
      },
      npm: {
        title: 'npm',
        href: 'https://www.npmjs.com/package/@hyperse/track',
      },
      repo: {
        title: 'GitHub',
        href: 'https://github.com/hyperse-io/track',
      },
      discord: {
        title: 'Discord',
        href: 'https://www.hyperse.net/community',
      },
      blog: {
        title: 'Hyperse Blog',
        href: 'https://www.hyperse.net/blog',
      },
    },
  },
  faq: {
    type: 'page',
    theme: {
      typesetting: 'article',
    },
  },
  community: {
    type: 'page',
    theme: {
      typesetting: 'article',
    },
  },
};

export default meta;
