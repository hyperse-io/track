# AdapterBuilder

The `AdapterBuilder` class is used to create a new adapter instance. It is a factory class that creates a new adapter instance based on the provided configuration.

```typescript title="Signature"
export class AdapterBuilder<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterOptions extends TrackAdapterOptions<Context, EventData>,
> {
  constructor(
    options: AdapterBuilderOptions<Context, EventData, AdapterOptions>
  );
}
```

## Hooks

### `setup`

`<EventType extends keyof EventData>(
    ctx: Context,
    eventType: EventType,
    eventData: EventData[EventType]
  ) => any | Promise<any>`

The setup data. It is often useful to extend the report method by configuring some additional data to be used in the report phase without the transform processing

#### Props

- **ctx** : `Context` - The track context.
- **eventType** : `EventType` - The event type.
- **eventData** : `EventData[EventType]` - The event data.

#### Returns

- `any` | `Promise<void>` - A value or a promise that resolves to a value.

#### Example

```typescript title="AdapterBuilder.ts"
const adapterBuilder = new AdapterBuilder({
  new ReportAdapter(),
});

adapterBuilder.setup(ctx);
```

### `build`

`Function`

Builds a new adapter instance.

#### Props

- **ctx** : `Context` - The track context.

#### Returns

- `Adapter<Context, EventData, AdapterOptions>` - A new adapter instance.

#### Example

```typescript title="AdapterBuilder.ts"
const adapterBuilder = new AdapterBuilder({
  new ReportAdapter(),
});

const adapter = adapterBuilder.build(ctx);
```

### `before`

The adapter hook function is executed before tracking an event.

#### Props

- **event** : `EventData` - The event data.

#### Returns

- `EventData` - The modified event data.

#### Example

```typescript title="AdapterBuilder.ts"
const adapterBuilder = new AdapterBuilder({
  new ReportAdapter(),
});

adapterBuilder.before(event);
```

### `transform`

The adapter hook function is executed to transform the event data before tracking.

#### Props

- **event** : `EventData` - The event data.

#### Returns

- `EventData` - The modified event data.

#### Example

```typescript title="AdapterBuilder.ts"
const adapterBuilder = new AdapterBuilder({
  new ReportAdapter(),
});

adapterBuilder.transform(event);
```

### `after`
