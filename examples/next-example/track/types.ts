export type ReportAdapterOptions<Context, EventData> = {
  setup?: <EventType extends keyof EventData>(
    ctx: Context,
    eventTYpe: EventType,
    eventData: EventData[EventType]
  ) => Promise<{
    timeStamp: number;
  }>;
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
  addCart?: {
    price: number;
    goodsId: string;
    goodsName: string;
    count: number;
  };
};
