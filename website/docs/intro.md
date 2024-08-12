---
sidebar_position: 1
slug: /getting-started
---

# Getting Started

## Install

```bash
npm install @hyperse/track --save
```

or you can use **yarn**

```bash
yarn add @hyperse/track
```

We have completed installing the package.

## Simple usage

Here is a simple usage for using the component:

```ts
export type Context = {
  env: 'prod' | 'uat';
  platform: 'android' | 'ios';
  ip: string;
  userId: string;
};

export type EventData = {
  registry: {
    userName: string;
    mobile: string;
    pwd: string;
    email: string;
  };
  addCart: {
    price: number;
    goodsId: string;
    goodsName: string;
    count: number;
  };
};

export type AdapterOptions<Context, EventData> = {
  setup?: (
    ctx: Context,
    eventData: EventData[keyof EventData]
  ) => Promise<{
    name: 'setup' | 'setup1' | 'setup2';
    timeStamp: number;
  }>;
};

// custom report adapter
export class ReportAdapter extends BaseAdapter<
  TrackContext<TrackData>,
  EventData,
  AdapterOptions<TrackContext<TrackData>, EventData>
> {
  isTrackable<EventType extends keyof EventData>(
    ctx: TrackContext<TrackData>,
    eventType: EventType,
    eventData: EventData[EventType]
  ): boolean | Promise<boolean> {
    return true;
  }
  report(
    ctx: TrackContext<TrackData>,
    reportData: AdapterReportData,
    setupData?:
      | {
          name: 'setup' | 'setup1' | 'setup2';
          timeStamp: number;
        }
      | undefined
  ): void | Promise<void> {}
}

const reportAdapter = new ReportAdapter();

// create adapter builder
const adapterBuilder = createAdapterBuilder<
  TrackContext<TrackData>,
  EventData,
  AdapterOptions<TrackContext<TrackData>, EventData>
>(reportAdapter);

// mount adapter hook
adapterBuilder
  .setup((ctx, eventData) => {
    return Promise.resolve({
      name: 'setup' as const,
      timeStamp: new Date().getTime(),
      newField: 'newField',
    });
  })
  .before(async (ctx, eventType, eventData) => {
    console.log('before');
  })
  .transform('addCart', (ctx, eventType, eventData) => {
    return {
      ...eventData,
      pay: {
        payId: 'p123',
        payName: 'Sample Pay',
        payType: 'credit',
      },
      timeStamp: '2024-09-01T00:00:00Z',
    };
  })
  .after(async (ctx, eventType, eventData) => {
    console.log('after', eventData);
  })
  .build();

// create track builder
const trackBuilder = createTrackBuilder<
  TrackContext<TrackData>,
  EventDataOption
>();

// mount track hook
await trackBuilder
  .init({ reportAdapter: reportAdapter })
  .before(async (ctx) => {})
  .after(async (ctx) => {})
  .select(() => ['reportAdapter'])
  .track('addCart', eventData.addCart);
```

## Congratulations !

That's all, now let's deep dive into the [props](/docs/api-reference).
