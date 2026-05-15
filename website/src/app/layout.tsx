import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import NextImage from 'next/image';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer, Layout, Link, Navbar } from 'nextra-theme-docs';
import { SITE_BASE_PATH } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  description:
    '@hyperse/track: a typed, smart, scalable data collection engine for modern web applications.',
  metadataBase: new URL('https://hyperse-io.github.io'),
  keywords: [
    'Hyperse',
    'Track',
    'Analytics',
    'TypeScript',
    'Google Analytics',
    'Facebook',
    'Klaviyo',
    'Data collection',
  ],
  generator: 'Next.js',
  applicationName: 'Hyperse Track',
  appleWebApp: {
    title: 'Track',
  },
  title: {
    default: 'Hyperse Track',
    template: '%s | Track',
  },
  openGraph: {
    url: './',
    siteName: 'Hyperse Track',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
  },
};

const banner = (
  <Banner dismissible={false}>
    📌 Documentation for{' '}
    <Link
      href="https://www.npmjs.com/package/@hyperse/track"
      className="text-current!"
    >
      @hyperse/track
    </Link>{' '}
    and premium adapter plugins.
  </Banner>
);

const navbar = (
  <Navbar
    logo={
      <div className="flex items-center gap-2">
        <NextImage
          src={`${SITE_BASE_PATH}/logo.svg`}
          alt=""
          width={15}
          height={22}
          className="h-[22px] w-auto shrink-0 rounded-sm"
          style={{ width: 'auto', height: 22 }}
        />
        <span className="font-semibold text-white">Track</span>
      </div>
    }
    projectLink="https://github.com/hyperse-io/track"
  />
);

const footer = (
  <Footer className="flex-col items-center md:items-start">
    <p className="text-sm text-gray-500">
      Part of the{' '}
      <Link href="https://github.com/hyperse-io" className="text-current!">
        Hyperse
      </Link>{' '}
      toolchain.
    </p>
    <p className="mt-4 text-xs text-gray-600">
      © {new Date().getFullYear()} Hyperse Inc.
    </p>
  </Footer>
);

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const pageMap = await getPageMap();

  return (
    <html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/hyperse-io/track/tree/main/website"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
          nextThemes={{
            forcedTheme: 'dark',
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
