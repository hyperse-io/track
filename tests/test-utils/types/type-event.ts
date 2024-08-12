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
  timeStamp?: string;
};
