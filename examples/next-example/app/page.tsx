'use client';

import { useEffect, useState } from 'react';
import { fetchGoodsList, GoodsRecord } from './service';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const onAddToCart = (item: GoodsRecord) => {
    console.log('onAddToCart', JSON.stringify(item));
    // await reportTrack().select('reportAdapter').track('addCart', {
    //   price: 25.99,
    //   goodsId: '23432252',
    //   goodsName: 'Long Chair',
    //   count: 1,
    // });
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
