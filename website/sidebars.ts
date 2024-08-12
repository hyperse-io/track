/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: 'API',
      items: [
        {
          type: 'doc',
          id: 'api/base-adapter',
          label: 'BaseAdapter',
        },
        {
          type: 'doc',
          id: 'api/adapter-builder',
          label: 'AdapterBuilder',
        },
        {
          type: 'doc',
          id: 'api/track-builder',
          label: 'TrackBuilder',
        },
      ],
    },
    {
      type: 'category',
      label: 'Adapters',
      items: [
        {
          type: 'doc',
          id: 'adapters/google-adapter',
          label: 'GoogleAdapter',
        },
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        {
          type: 'doc',
          id: 'community/contributing',
          label: 'Contributing',
        },
        {
          type: 'link',
          label: 'ChangeLog',
          href: 'https://github.com/hyperse-io/track/blob/main/CHANGELOG.md',
        },
        {
          type: 'link',
          label: 'Hyperse',
          href: 'https://github.com/hyperse-io',
        },
      ],
    },
    {
      type: 'category',
      label: 'Related projects',
      items: [
        {
          type: 'link',
          label: 'Hyperse Pipeline',
          href: 'https://hyperse-io.github.io/pipeline/',
        },
        {
          type: 'link',
          label: 'Hyperse gh-pages starter',
          href: 'https://hyperse-io.github.io/gh-pages-starter/',
        },
      ],
    },
    {
      type: 'doc',
      id: 'faq',
      label: "FAQ's",
    },
  ],
};

export default sidebars;
