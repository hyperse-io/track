# Example

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Simple usage

Here is a simple usage for using the component:

---

:::info

Read more in [**User guide > introducing**](/docs/intro/introducing)

:::

<Tabs>

<TabItem value="track" label="track.ts">

```typescript title="track.ts"
export const reportTrack = () => {
  const reportAdapter = new ReportAdapter();

  const adapterBuilder = createAdapterBuilder<
    TrackContext<ReportTrackData>,
    ReportEventData,
    ReportAdapterOptions<TrackContext<ReportTrackData>, ReportEventData>
  >(reportAdapter);

  const adapter = adapterBuilder
    .setup(() => {
      return Promise.resolve({
        name: 'setup',
        timeStamp: Date.now(),
      });
    })
    .before((ctx, eventType, eventData) => {
      console.log('before', ctx, eventType, eventData);
    })
    .transform('addCart', (ctx, eventType, eventData) => {
      return {
        ...eventData,
        goodName: 'ac_' + eventData?.goodsName,
      };
    })
    .transform('registry', (ctx, eventType, eventData) => {
      return { ...eventData, userName: 'rg_' + eventData?.userName };
    })
    .after((ctx, eventType, reportData) => {
      console.log('after', ctx, eventType, reportData);
    })
    .build();

  const trackBuilder = createTrackBuilder<
    TrackContext<ReportTrackData>,
    ReportEventData
  >();

  return trackBuilder
    .init(() => {
      return {
        reportAdapter: adapter,
      };
    })
    .before((ctx) => {
      console.log('before track', ctx);
    })
    .after((ctx) => {
      console.log('after track', ctx);
    });
};
```

</TabItem>
<TabItem value="reportAdapter" label="reportAdapter.ts">

```typescript title="reportAdapter.ts"
export class ReportAdapter extends BaseAdapter<
  TrackContext<ReportTrackData>,
  ReportEventData,
  ReportAdapterOptions<TrackContext<ReportTrackData>, ReportEventData>
> {
  isTrackable<EventType extends keyof ReportEventData>(
    ctx: TrackContext<ReportTrackData>,
    eventType: EventType,
    eventData: ReportEventData[EventType]
  ): boolean | Promise<boolean> {
    return true;
  }

  protected report(
    ctx: TrackContext<ReportTrackData>,
    reportData: AdapterReportData,
    setupData?:
      | { name: 'setup' | 'setup2' | 'setup3'; timeStamp: number }
      | undefined
  ): void | Promise<void> {
    console.log('report', ctx, reportData, setupData);
  }
}
```

</TabItem>

<TabItem value="types" label="types.ts">

```typescript title="types.ts"
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
```

</TabItem>

<TabItem value="index" label="index.txs">

```typescript title="index.tsx"
export const Index = () => {
  const onAddToCart = async () => {
    await reportTrack().select('reportAdapter').track('addCart', {
      price: 25.99,
      goodsId: '23432252',
      goodsName: 'Long Chair',
      count: 1,
    });
  };
  return (
    <div>
      <div class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">
        <div class="h-48 bg-gray-700 rounded-xl"></div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-row justify-between">
            <div class="flex flex-col">
              <span class="text-xl font-bold">Long Chair</span>
              <p class="text-xs text-gray-700">ID: 23432252</p>
            </div>
            <span class="font-bold  text-red-600">$25.99</span>
          </div>
          <button class="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
```

</TabItem>
</Tabs>

## Congratulations !

That's all, now let's deep dive into the [props](/docs/api/base-adapter).
