export type AdapterOptions<Context, EventData> = {
  setup?: <EventType extends keyof EventData>(
    ctx: Context,
    eventTYpe: EventType,
    eventData: EventData[EventType]
  ) => Promise<{
    name: 'setup' | 'setup1' | 'setup2';
    timeStamp: number;
    user?: string;
  }>;
};
