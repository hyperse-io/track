import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { basePath } from '@/lib/base-path';
import '@/styles/globals.css';

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
  generator: 'Hyperse',
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

const RootLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href={`${basePath}/logo.svg`}
          type="image/svg+xml"
          sizes="32x32"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        {/*
          Fumadocs' static search client builds its URL as
          `join(BASE_PATH, api)`, and `BASE_PATH` comes from Vite's
          `import.meta.env.BASE_URL` — which does not exist in Next.js, so it is
          always `'/'`. Next.js' `basePath` is therefore NOT applied
          automatically, and omitting it makes the client request
          `/api/search` (404) instead of `${basePath}/api/search`.
        */}
        <RootProvider
          theme={{ defaultTheme: 'dark', enableSystem: false }}
          search={{
            options: { type: 'static', api: `${basePath}/api/search` },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
