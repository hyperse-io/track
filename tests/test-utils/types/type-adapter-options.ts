import type { GetSafeRealEventTypes } from '../../../src/index.js';

export interface AdapterOptions<Context, EventData> {
  setup?: <EventType extends keyof EventData>(
    ctx: Context,
    eventType: EventType,
    eventData: EventData[EventType]
  ) => Promise<{
    name: 'setup' | 'setup1' | 'setup2';
    timeStamp: number;
    user?: string;
  }>;
}

export type AdapterRealOptions<Context, EventData, RealEventData> = {
  setup?: <EventType extends keyof EventData>(
    ctx: Context,
    eventType: GetSafeRealEventTypes<RealEventData, EventData>,
    eventData: EventData[EventType]
  ) => {
    name: 'setup' | 'setup1' | 'setup2';
    timeStamp: number;
    user?: string;
  };
};
