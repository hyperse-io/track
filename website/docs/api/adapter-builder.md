# AdapterBuilder

The `AdapterBuilder` class is used to create a new adapter instance. It is a factory class that creates a new adapter instance based on the provided configuration.

```typescript title="Signature"
class AdapterBuilder<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterOptions extends TrackAdapterOptions<Context, EventData>,
> {
  constructor(adapter: TrackAdapter<Context, EventData, AdapterOptions>);
}
```

## Hooks

### `setup`

The setup data. It is often useful to extend the report method by configuring some additional data to be used in the report phase without the transform processing

#### Props

- **ctx** : `TrackContext<TrackData>` - The track context.
- **eventType** : `keyof EventDataOption` - The event type.
- **eventData** : `EventDataOption[keyof EventDataOption]` - The event data.

#### Example

```typescript title="AdapterBuilder.ts"
adapterBuilder.setup(
  (
    ctx: TrackContext<TrackData>,
    eventType: keyof EventDataOption,
    eventData: EventDataOption[keyof EventDataOption]
  ) => {
    return Promise.resolve({
      name: 'setup',
      timeStamp: Date.now(),
    });
  }
);
```

### `before`

The adapter hook function is executed before tracking an event.

#### Props

- **ctx** : `TrackContext<TrackData>` - The track context.
- **eventType** : `keyof EventDataOption` - The event type.
- **eventData** : `EventDataOption[keyof EventDataOption]` - The event data.

#### Example

```typescript title="AdapterBuilder.ts"
adapterBuilder.before(
  (
    ctx: TrackContext<TrackData>,
    eventType: keyof EventDataOption,
    eventData: EventDataOption[keyof EventDataOption]
  ) => {
    //do something
  }
);
```

### `transform`

The adapter hook function is executed to transform the event data before tracking.

#### Props

- **eventType** : `keyof EventDataOption` - The event type.
- **fun** : `(
  ctx: Context,
  eventType: Key,
  eventData: LeftEventData[Key]
) => AdapterReportData | Promise<AdapterReportData>` - The transform function.

#### Example

```typescript title="AdapterBuilder.ts"
adapterBuilder
  .transform(
    'addCart',
    (
      ctx: TrackContext<TrackData>,
      eventType: 'addCart',
      eventData: EventDataOption['addCart']
    ) => {
      return {
        ...eventData,
        goodName: 'ac_' + eventData?.goodsName,
        timeStamp: Date.now(),
      };
    }
  )
  .transform(
    'previewGoods',
    (
      ctx: TrackContext<TrackData>,
      eventType: 'previewGoods',
      eventData: EventDataOption['previewGoods']
    ) => {
      return {
        ...eventData,
        goodName: 'pg_' + eventData?.goodsName,
        timeStamp: Date.now(),
      };
    }
  );
```

### `after`

The adapter hook function is executed after report an event.

#### Props

- **ctx** : `TrackContext<TrackData>` - The track context.
- **eventType** : `keyof EventDataOption` - The event type.
- **reportData** : `AdapterReportData` - The report data.

#### Example

```typescript title="AdapterBuilder.ts"
adapterBuilder.after(
  (
    ctx: TrackContext<TrackData>,
    eventType: keyof EventDataOption,
    reportData: AdapterReportData
  ) => {
    //do something
  }
);
```

### `build`

Builds a adapter instance.

#### Returns

- `Adapter<Context, EventData, AdapterOptions>` - Adapter instance.

#### Example

```typescript title="AdapterBuilder.ts"
const adapter = adapterBuilder.build();
```
