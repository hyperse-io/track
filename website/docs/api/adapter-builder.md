# AdapterBuilder

The `AdapterBuilder` class is a factory used to create a new adapter instance for tracking events. It allows you to configure the adapter through a series of hooks that define how events are processed before, during, and after they are tracked.

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

The `AdapterBuilder` class provides several hooks that allow you to customize the behavior of the adapter:`AdapterBuilder`

### `setup`

The `setup` hook allows you to configure initial data before the event is processed. This is useful for preparing any additional data or context needed during the reporting phase.

#### Parameters

- **ctx** : `TrackContext<TrackData>`

  The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event.

- **eventType** : `keyof EventData`

  The type of event being tracked. This is usually a key from the EventData that corresponds to specific events like click, purchase, etc.

- **eventData** : `EventData[keyof EventData]`

  The data associated with the event. This contains all relevant information for the specific event type.

#### Example

```typescript title="AdapterBuilder.ts"
adapterBuilder.setup(
  (
    ctx: TrackContext<TrackData>,
    eventType: keyof EventData,
    eventData: EventData[keyof EventData]
  ) => {
    return Promise.resolve({
      name: 'setup',
      timeStamp: Date.now(),
    });
  }
);
```

### `before`

The `before` hook is executed before tracking an event. This is where you can perform any necessary preprocessing or validation.

#### Parameters

- **ctx** : `TrackContext<TrackData>`

  The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event.

- **eventType** : `keyof EventData`

  The type of event being tracked. This is usually a key from the EventData that corresponds to specific events like click, purchase, etc.

- **eventData** : `EventData[keyof EventData]`

  The data associated with the event. This contains all relevant information for the specific event type.

#### Example

```typescript title="AdapterBuilder.ts"
adapterBuilder.before(
  (
    ctx: TrackContext<TrackData>,
    eventType: keyof EventData,
    eventData: EventData[keyof EventData]
  ) => {
    //do something
  }
);
```

### `transform`

The `transform` hook allows you to modify the event data before it is sent to the tracking system. This hook is highly flexible, enabling you to change, enrich, or sanitize the event data according to your specific needs. It also supports scenarios where `RealEventData` is a mapped object of `EventData`.

#### Parameters

- **eventType** : `keyof EventData | [keyof EventData, keyof RealEventData]`

  The type of event being tracked. Typically, this is a key from the `EventData` that corresponds to specific events like click, purchase, etc. When `RealEventData` is used, it allows you to map the `EventData` to a corresponding event type in `RealEventData`.

- **fun** : `(
  ctx: Context,
  eventType: EventType,
  eventData: EventData[keyof EventType]
) => AdapterReportData | Promise<AdapterReportData>`

  A function that transforms the event data. The function receives the event type and data, and should return the modified data, either directly or as a promise.

#### Example

The following examples illustrate how to use the `transform` hook to modify event data for different scenarios:

```typescript title="AdapterBuilder.ts"
// Example 1: Simple event transformation for a single event type
adapterBuilder.transform(
  'addCart',
  (
    ctx: TrackContext<TrackData>,
    eventType: 'addCart',
    eventData: EventData['addCart']
  ) => {
    return {
      ...eventData,
      goodsName: 'ac_' + eventData?.goodsName,
      timeStamp: Date.now(),
    };
  }
);

// Example 2: Using RealEventData to map and transform data between different event types
adapterBuilder
  .transform(
    ['previewGoods', '_previewGoods'],
    (
      ctx: TrackContext<TrackData>,
      eventType: 'previewGoods',
      eventData: EventData['previewGoods']
    ) => {
      return {
        ...eventData,
        goodsName: 'pg_' + eventData?.goodsName,
        timeStamp: Date.now(),
      };
    }
  )
  .transform(
    ['checkout', '_checkout'],
    (
      ctx: TrackContext<TrackData>,
      eventType: 'checkout',
      eventData: RealEventData['_checkout']
    ) => {
      return {
        ...eventData,
        totalAmount: eventData.amount * 1.2, // Applying tax or additional charges
        timeStamp: Date.now(),
      };
    }
  );
```

:::note
• eventType: When using a tuple like [keyof EventData, keyof RealEventData], the first element should map to the key in EventData and the second to the corresponding key in RealEventData.

• fun: Ensure the transformation function handles asynchronous operations properly when returning a `Promise<AdapterReportData>`.

• This approach provides a flexible and powerful way to map and modify events, making it easier to adapt the event data for various tracking systems and scenarios.
:::

### `after`

The `after` hook is executed after the event has been reported. This is where you can perform any post-processing, such as logging or triggering additional actions based on the reported data.

#### Parameters

- **ctx** : `TrackContext<TrackData>`

  The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event.

- **eventType** : `keyof EventData`

  The type of event being tracked. This is usually a key from the EventData that corresponds to specific events like click, purchase, etc.

- **reportData** : `AdapterReportData<RealEventDataOption, EventDataOption, EventType> | Awaited<AdapterReportData<RealEventDataOption, EventDataOption, EventType>> | undefined`

  The data that needs to be reported. This can include the event type, associated data, and any additional metadata that should be sent to the third-party service.

#### Example

```typescript title="AdapterBuilder.ts"
adapterBuilder.after(
  (
    ctx: Context,
    eventType: CheckUndefined<RealEventData, EventData>,
    reportData?:
      | AdapterReportData<RealEventData, EventData>
      | Awaited<AdapterReportData<RealEventData, EventData>>
  ) => {
    //do something
  }
);
```

### `build`

The `build` method finalizes the adapter configuration and creates an instance of the adapter.

#### Returns

- `Adapter<Context, EventData, AdapterOptions>`

  The configured adapter instance.

#### Example

```typescript title="AdapterBuilder.ts"
const adapter = adapterBuilder.build();
```
