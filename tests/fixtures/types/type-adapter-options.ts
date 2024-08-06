export type AdapterOptions<Context, EventData> = {
  setup?: (
    ctx: Context,
    eventData: EventData[keyof EventData]
  ) => Promise<{
    name: 'setup' | 'setup1' | 'setup2';
    timeStamp: number;
    user?: string;
  }>;
};
