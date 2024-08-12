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

`Function`

Sets up the adapter.

#### Props

- **ctx** : `Context` - The track context.

#### Returns

- `Promise<void>` - A promise that resolves when the adapter is set up.

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
