import { GetSafeRealEventTypes } from '@hyperse/track';

export type ReportAdapterOptions<Context, EventData, RealEventData> = {
  setup?: <EventType extends keyof EventData>(
    ctx: Context,
    eventType: GetSafeRealEventTypes<RealEventData, EventData>,
    eventData: EventData[EventType]
  ) => {
    timeStamp: number;
  };
};

export type ReportTrackData = {
  env: 'prod' | 'uat';
  platform: 'android' | 'ios';
  ip: string;
};

export type ReportEventData = {
  pv?: {
    url: string;
    timeStamp: number;
    userName: string;
    userId: string;
  };
  addCart?: GoodsRecord;
  addCartList: GoodsRecord[];
};

export type ReportRealEventData = {
  pageView?: {
    url: string;
    timeStamp: number;
    userName: string;
    userId: string;
  };
  addCart?: GoodsRecord[];
};

export interface GoodsRecord {
  goodsName: string;
  goodsId: string;
  price: number;
}
