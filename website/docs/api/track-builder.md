# TrackBuilder

The `TrackBuilder` class is designed to create a track from a series of waypoints. It provides a structured way to generate a path for a vehicle or an event tracking system to follow. This class includes hooks that allow you to customize the behavior of the track creation process.

## Overview

The `TrackBuilder` class allows you to define and customize the process of building a track by:

- Initializing the track with specific options.
- Adding hooks to execute custom logic before and after certain stages of the track building.
- Selecting specific adapters for tracking events.
- Tracking events with custom data.

```typescript title="Signature"
class TrackBuilder<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> {
  constructor(options: TrackCreateOptions<Context, EventData> = {});
}
```

### Constructor

- options: `TrackCreateOptions<Context, EventData>` (Optional)

  The options used to create the track. These options typically include configurations for the tracking adapters, context, and other relevant settings.

## Hooks

### `init`

The `init` method is used to initialize the track builder with specific options, such as which adapters to use for reporting and console output.

#### Parameters

- options: `TrackCreateOptions<Context, EventData>`

  An object containing the initialization options for the track. This typically includes the adapters and other configurations necessary to build the track.

#### Example

```typescript title="TrackBuilder.ts"
// method 1
trackBuilder.init({ reportAdapter: adapter, consoleAdapter: adapter });
// method 2
trackBuilder.init(() => {
  return { reportAdapter: adapter, consoleAdapter: adapter };
});
```

### `before`

The `before` method is a hook that allows you to execute custom logic before the track building process begins. This can be used for tasks such as preprocessing, validation, or logging.

#### Props

- **ctx** : `TrackContext<TrackData>`

  The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event.

#### Example

```typescript title="TrackBuilder.ts"
trackBuilder.before(async (ctx: TrackContext<TrackData>) => {
  // do something
});
```

### `after`

The `after` method is a hook that allows you to execute custom logic after the track building process is completed. This can be used for tasks such as cleanup, final validation, or post-processing.

#### Props

- **ctx** : `TrackContext<TrackData>`

  The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event.

#### Example

```typescript title="TrackBuilder.ts"
trackBuilder.after(async (ctx: TrackContext<TrackData>) => {
  // do something
});
```

### `select`

The `select` method is used to choose which adapters should be used during the track creation process. This allows for dynamic selection based on the context or specific conditions.

#### Props

- **ctx** : `TrackContext<TrackData>`

  The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event.

- **adapterMap** : `Record<string, TrackAdapter<Context, EventData>>`

  A map of available adapters, where the key is the adapter name and the value is the adapter instance.

#### Example

```typescript title="TrackBuilder.ts"
// method 1
trackBuilder.select(['consoleAdapter', 'reportAdapter']);
// method 2
trackBuilder.select(
  (
    ctx: TrackContext<TrackData>,
    adapterMap: {
      reportAdapter: ReportAdapter;
      consoleAdapter: ReportAdapter;
    }
  ) => ['consoleAdapter', 'reportAdapter']
);
// method 3
trackBuilder.select(
  (
    ctx: TrackContext<TrackData>,
    adapterMap: {
      reportAdapter: ReportAdapter;
      consoleAdapter: ReportAdapter;
    }
  ) => Promise.resolve(['consoleAdapter', 'reportAdapter'])
);
```

### `track`

The `track` method is used to track an event by specifying the event type and associated event data. This method triggers the tracking process, using the previously selected adapters.

#### Props

- **eventType** : `addCart`

  The type of event being tracked. This is usually a key from the EventData that corresponds to specific events like click, purchase, etc.

- **eventData** : `EventData[keyof EventData]`

  An object containing the data associated with the event. This data usually includes information such as item details, pricing, quantity, and other relevant attributes.

#### Example

```typescript title="TrackBuilder.ts"
trackBuilder.track('addCart', {
  price: 99.99,
  goodsId: 'g123',
  goodsName: 'Sample Goods',
  count: 2,
});
```
