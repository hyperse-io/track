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
      type: 'category',
      label: 'Getting Started',
      items: [
        {
          type: 'doc',
          id: 'intro/introducing',
          label: 'Introducing',
        },
        {
          type: 'doc',
          id: 'intro/installation',
          label: 'Installation',
        },
        {
          type: 'doc',
          id: 'intro/sample-example',
          label: 'Sample Example',
        },
        {
          type: 'doc',
          id: 'intro/live-example',
          label: 'Live Example',
        },
      ],
    },
    {
      type: 'category',
      label: 'How-to Guides',
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
      label: 'Premium Plugins',
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
      type: 'link',
      label: 'LICENSE',
      href: 'https://github.com/hyperse-io/track/blob/main/LICENSE',
    },
    {
      type: 'doc',
      id: 'faq',
      label: "FAQ's",
    },
  ],
};

export default sidebars;
