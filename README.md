# @hyperse/track

<p align="left">
  <a aria-label="Build" href="https://github.com/hyperse-io/track/actions?query=workflow%3ACI">
    <img alt="build" src="https://img.shields.io/github/actions/workflow/status/hyperse-io/track/ci-integrity.yml?branch=main&label=ci&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="stable version" href="https://www.npmjs.com/package/@hyperse/track">
    <img alt="stable version" src="https://img.shields.io/npm/v/%40hyperse%2Ftrack?branch=main&label=version&logo=npm&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Top language" href="https://github.com/hyperse-io/track/search?l=typescript">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/hyperse-io/track?style=flat-square&labelColor=000&color=blue">
  </a>
  <a aria-label="Licence" href="https://github.com/hyperse-io/track/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/github/license/hyperse-io/track?style=flat-quare&labelColor=000000" />
  </a>
</p>

<!-- hyperse-vitest-coverage-reporter-marker-readme -->

## Coverage Report

<table> <thead> <tr> <th align="center">Status</th> <th align="left">Category</th> <th align="right">Percentage</th> <th align="right">Covered / Total</th> </tr> </thead> <tbody> <tr> <td align="center">🔵</td> <td align="left">Lines</td> <td align="right">100%</td> <td align="right">185 / 185</td> </tr> <tr> <td align="center">🔵</td> <td align="left">Statements</td> <td align="right">100%</td> <td align="right">185 / 185</td> </tr> <tr> <td align="center">🔵</td> <td align="left">Functions</td> <td align="right">98.18%</td> <td align="right">54 / 55</td> </tr> <tr> <td align="center">🔵</td> <td align="left">Branches</td> <td align="right">93.75%</td> <td align="right">75 / 80</td> </tr> </tbody> </table>

A typed, smart, scalable , powerful data collection engine written in typescript

## Install

```ts
// npm
npm i @hyperse/track

// yarn
yarn add @hyperse/track
```

## Usage

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

## Options

### ReportAdapter

Adapter used to process event data reporting

#### `isTrackable`

Checks if the adapter is available.

#### `report`

Data report

### AdapterBuilder

A builder for track adapter. Provides the ability to load adpater corresponding hooks

#### `setup`

The adapter hook Performs data consolidation against the rules defined by AdapterOptions. Passes the returned results to report. Executes before the report function is called

#### `before`

The adapter hook function is executed before tracking an event.

#### `transform`

The adapter hook function that converts EventData corresponding to different EventType

#### `after`

The adapter hook function is triggered after the report is executed

#### `build`

Return adapter instance

### TrackBuilder

A builder for track. Provides the ability to load track corresponding hooks

#### `init`

Track builder initialization, which loads the adapter into the track

#### `before`

A function that is executed before tracking

#### `after`

A function that is executed after a track event

#### `select`

Selects track adapter from a given context, event data, and adapter map.

#### `track`

Event reporting activation function
