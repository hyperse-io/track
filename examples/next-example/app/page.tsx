'use client';

import { useEffect, useState } from 'react';
import mockjs from 'mockjs';
import { reportTrack } from '@/track/track';
import { GoodsRecord } from '@/track/types';
import { fetchGoodsList } from './service';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-4">
      {mounted &&
        fetchGoodsList().map((item, index: number) => {
          return (
            <div
              key={index}
              className="flex h-80 w-4/5 max-w-md flex-col gap-1 rounded-2xl bg-gray-50 p-3"
            >
              <div className="h-48 rounded-xl bg-gray-700"></div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-700">
                      {item.goodsName}
                    </span>
                    <p className="text-xs text-gray-700">ID: {item.goodsId}</p>
                  </div>
                  <span className="font-bold  text-red-600">${item.price}</span>
                </div>
                <button
                  className="rounded-md bg-sky-800 py-2 text-gray-50 hover:bg-sky-700"
                  onClick={() => onAddToCart(item)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
    </main>
  );
}
