'use client';

import { useRouter } from 'next/navigation';
import { Hero } from './Hero';
import { HomeFeatures } from './HomeFeatures';
import { SiteFooter } from './SiteFooter';

export const HomePage = () => {
  const route = useRouter();
  return (
    <div className="relative flex min-h-screen flex-col grid-bg selection:bg-cyan-500/30 selection:text-cyan-200">
      <main className="grow">
        <Hero />
        <HomeFeatures />

        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-cyan-900/10" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to ship typed analytics?
            </h2>
            <p className="mb-10 text-lg text-gray-400 md:text-xl">
              Install the core package, wire adapters for your stack, and browse
              premium plugin events in the docs.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="cursor-pointer rounded-lg bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-gray-200"
                onClick={() => route.push('/guide/installation')}
              >
                Get started now
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-lg border border-white/20 bg-transparent px-8 py-4 font-bold text-white transition-colors hover:bg-white/10"
                onClick={() => {
                  window.open('https://github.com/hyperse-io/track', '_blank');
                }}
              >
                View on GitHub
              </button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
