export type EventDataOption = {
  registry?: {
    userName: string;
    mobile: string;
    pwd: string;
    email: string;
  };
  previewGoods?: {
    goodsId: string;
    goodsName: string;
  };
  addCart?: {
    price: number;
    goodsId: string;
    goodsName: string;
    count: number;
  };
  addCartList?: {
    price: number;
    goodsId: string;
    goodsName: string;
    count: number;
  }[];
  timeStamp?: string;
};

export type RealEventDataOption = {
  _registry?: {
    _userName: string;
    _mobile: string;
    _pwd: string;
    _email: string;
  };
  _previewGoods?: {
    _goodsId: string;
    _goodsName: string;
    _url: string;
    timeStamp: string;
  };
  _addCart?: {
    _price: number;
    _goodsId: string;
    _goodsName: string;
    _count: number;
  }[];
  _timeStamp?: string;
};
