# TrackBuilder

The `TrackBuilder` class is used to create a track from a list of waypoints. The waypoints are used to create a track that can be used to generate a path for a vehicle to follow.

```typescript title="Signature"
class TrackBuilder<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> {
  constructor(options: TrackCreateOptions<Context, EventData> = {});
}
```

## Hooks

### `init`

#### Props

- `options` - The options to create the track.

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

#### Props

- **ctx** : `Context` - The track context.

#### Example

```typescript title="TrackBuilder.ts"
trackBuilder.before(async (ctx: TrackContext<TrackData>) => {
  // do something
});
```

### `after`

#### Props

- **ctx** : `Context` - The track context.

#### Example

```typescript title="TrackBuilder.ts"
trackBuilder.after(async (ctx: TrackContext<TrackData>) => {
  // do something
});
```

### `select`

#### Props

- **ctx** : `Context` - The track context.
- **adapterMap** : `Record<string, TrackAdapter<Context, EventData>>` - The adapter map.

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

#### Props

- **eventType** : `addCart` - The event type.
- **eventData** : `{
  price: 99.99,
  goodsId: 'g123',
  goodsName: 'Sample Goods',
  count: 2,
}` - The event data.

#### Example

```typescript title="TrackBuilder.ts"
trackBuilder.track('addCart', {
  price: 99.99,
  goodsId: 'g123',
  goodsName: 'Sample Goods',
  count: 2,
});
```
