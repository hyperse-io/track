import { themes } from 'prism-react-renderer';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import type * as Plugin from '@docusaurus/types/src/plugin';
import { copyrightConfig } from './copyright.config';

const config: Config = {
  title: 'hyperse data tracker engine',
  tagline:
    'A typed, smart, scalable , powerful data collection engine written in typescript',
  url: 'https://hyperse-io.github.io',
  baseUrl: '/track',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/icon/favicon.svg',
  organizationName: 'Hyperse',
  projectName: 'hyperse tracker',
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/hyperse-io/track',
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/layout.css'),
            require.resolve('./src/css/overrides.css'),
            require.resolve('./src/css/code-blocks.css'),
          ],
        },
        gtag: {
          trackingID: 'GTM-THVM29S',
          anonymizeIP: false,
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      // title: 'Hyperse',
      hideOnScroll: false,
      logo: {
        alt: 'Hyperse',
        src: 'img/logo.svg',
        style: {
          borderRadius: '2px',
        },
      },
      items: [
        {
          type: 'doc',
          docId: 'intro/introducing',
          position: 'left',
          label: 'User Guide',
        },
        {
          href: 'https://www.npmjs.com/package/@hyperse/track',
          label: 'NPM',
          position: 'right',
        },
        {
          href: 'https://github.com/hyperse-io/track',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discord.com/invite/tj3ahjXXzM',
          label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://www.hyperse.net/blog',
          label: 'Blog',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'hyperse',
              href: 'https://www.hyperse.net/',
            },
            {
              label: 'hyperse blog',
              href: 'https://www.hyperse.net/blog',
            },
            {
              label: 'hyperse devutils',
              href: 'https://devutils.hyperse.net/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.com/invite/tj3ahjXXzM',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/hyperse_net',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hyperse-io',
            },
          ],
        },
      ],
      copyright: copyrightConfig,
    },
    algolia: {
      apiKey: 'e337db95355de648d3a47a18aaee8e25',
      appId: 'O6DZ543ZMD',
      indexName: 'hyperse-ioio',
    },
    prism: {
      theme: themes.nightOwlLight,
      darkTheme: themes.nightOwl,
      additionalLanguages: ['docker', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    async function myPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require.resolve('tailwindcss'));
          postcssOptions.plugins.push(require.resolve('autoprefixer'));
          return postcssOptions;
        },
      };
    } satisfies Plugin.PluginModule,
  ],
};

export default async function createConfig() {
  return config;
}
