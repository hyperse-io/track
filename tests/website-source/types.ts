export type ReportAdapterOptions<Context, EventData> = {
  setup?: <EventType extends keyof EventData>(
    ctx: Context,
    eventTYpe: EventType,
    eventData: EventData[EventType]
  ) => Promise<{
    name: 'setup' | 'setup2' | 'setup3';
    timeStamp: number;
  }>;
};

export type ReportTrackData = {
  bizMode: 'test' | 'test2';
  env: 'prod' | 'uat';
  platform: 'android' | 'ios';
  ip: string;
  userId: string;
};

export type ReportEventData = {
  registry?: {
    userName: string;
    mobile: string;
    pwd: string;
    email: string;
  };
  addCart?: {
    price: number;
    goodsId: string;
    goodsName: string;
    count: number;
  };
};
