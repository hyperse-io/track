'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import mockjs from 'mockjs';
import { reportTrack } from '@/track/track';
import type { GoodsRecord } from '@/track/types';
import { fetchGoodsList } from './service';

export default function Home() {
  const [text, setText] = useState<string>();
  const [data] = useState<GoodsRecord[]>(() => fetchGoodsList());
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const { data } = event;
      if (data && data.type === 'report') {
        setText(`${JSON.stringify(data.data, null, 2)}`);
      }
    };

    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    reportTrack()
      .select('reportAdapter')
      .track(
        'pv',
        mockjs.mock({
          timeStamp: Date.now(),
          url: '@url()',
          userName: '@name()',
          userId: '@id(12)',
        })
      );
  }, [mounted]);

  const onAddToCart = (item: GoodsRecord) => {
    reportTrack()
      .select('reportAdapter')
      .track('addCart', {
        ...item,
      });
  };

  const onAddToMultiCart = (item: GoodsRecord) => {
    reportTrack()
      .select('reportAdapter')
      .track('addCartList', [
        {
          ...item,
        },
      ]);
  };

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="space-y-2 text-center sm:text-left">
        <p className="text-xs font-semibold tracking-wide text-cyan-400 uppercase">
          @hyperse/track
        </p>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Next.js live example
        </h1>
        <p className="text-sm text-slate-400">
          Add items to cart to emit track events. Report payloads appear in the
          panel below.
        </p>
      </header>

      {mounted ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <li
              key={`${item.goodsId}`}
              className="animate-fade-in flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-lg shadow-cyan-500/5"
            >
              <div className="h-40 rounded-xl bg-linear-to-br from-slate-700 to-slate-800" />
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {item.goodsName}
                    </h2>
                    <p className="text-xs text-slate-400">ID: {item.goodsId}</p>
                  </div>
                  <span className="shrink-0 text-lg font-bold text-red-400">
                    {'$'}
                    {item.price}
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-auto cursor-pointer rounded-lg bg-cyan-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-500"
                  onClick={() => {
                    if (index % 2 === 1) {
                      onAddToCart(item);
                    } else {
                      onAddToMultiCart(item);
                    }
                  }}
                >
                  Add to cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-sm text-slate-500">Loading catalog…</p>
      )}

      {text ? (
        <section
          className="animate-fade-in fixed inset-x-0 bottom-0 z-50 flex max-h-[50dvh] flex-col border-t border-white/10 bg-slate-900 shadow-2xl"
          aria-live="polite"
        >
          <header className="relative flex items-center justify-center border-b border-white/10 px-6 py-3">
            <h2 className="text-lg font-semibold text-white">Report data</h2>
            <button
              type="button"
              className="absolute right-6 flex size-7 cursor-pointer items-center justify-center rounded-md bg-slate-700 text-sm text-slate-200 transition-colors hover:bg-slate-600"
              aria-label="Close report panel"
              onClick={() => setText(undefined)}
            >
              ×
            </button>
          </header>
          <pre className="overflow-y-auto px-6 py-4 text-sm leading-relaxed text-slate-300">
            <code>{text}</code>
          </pre>
        </section>
      ) : null}
    </main>
  );
}
