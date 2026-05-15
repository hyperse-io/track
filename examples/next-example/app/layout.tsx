import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hyperse Track — Next.js Example',
  description:
    'Demo storefront that fires @hyperse/track events and shows reported payloads.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-dvh bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
};
