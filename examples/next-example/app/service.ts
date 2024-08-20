import Mock from 'mockjs';

export interface GoodsRecord {
  goodsName: string;
  goodsId: string;
  price: number;
}

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
