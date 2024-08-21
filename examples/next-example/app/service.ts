import Mock from 'mockjs';
import { GoodsRecord } from '@/track/types';

export const fetchGoodsList = (): GoodsRecord[] => {
  const data = Mock.mock({
    'list|10-20': [
      {
        goodsName: '@cword(3,5)',
        goodsId: '@id()',
        price: '@float(10, 100, 2, 2)',
      },
    ],
  });
  return data.list;
};
