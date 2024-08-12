# BaseAdapter

BaseAdapter is an abstract class that serves as the base for implementing track adapters. It provides common functionality and hooks for tracking events.

```typescript title="Signature"
export interface TrackAdapter<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterOptions extends TrackAdapterOptions<Context, EventData>,
> {
   abstract isTrackable<EventType extends keyof EventData>(
    ctx: Context,
    eventType: EventType,
    eventData: EventData[EventType]
  ): boolean | Promise<boolean>;

  protected report(
    ctx: Context,
    reportData: AdapterReportData,
    setupData?: Required<AdapterOptions>['setup'] extends (...args: any) => any
      ? Awaited<ReturnType<Required<AdapterOptions>['setup']>>
      : undefined
  ): void | Promise<void> {}
}
```

### `isTrackable`

`abstract Function`

Checks if the adapter is available.

#### Props

- **ctx** : `Context` - The track context.
- **eventType** : `EventType` - The type of the event.
- **eventData** : `EventData[EventType]` - The data associated with the event.

#### Returns

- `boolean | Promise<boolean>` - A boolean indicating if the adapter is available.

#### Example

```typescript title="ReportAdapter.ts"
export class ReportAdapter extends BaseAdapter<
  TrackContext<TrackData>,
  EventDataOption,
  AdapterOptions<TrackContext<TrackData>, EventDataOption>
> {
  isTrackable<EventType extends keyof EventDataOption>(
    ctx: TrackContext<TrackData>,
    eventType: EventType,
    eventData: EventDataOption[EventType]
  ): boolean | Promise<boolean> {
    return eventType === 'addCart';
  }
}
```

### `report`

`protected Function`

Reports the event to the adapter.

#### Props

- **ctx** : `Context` - The track context.
- **reportData** : `AdapterReportData` - The data to report.
- **setupData** : `Required<AdapterOptions>['setup'] extends (...args: any) => any ? Awaited<ReturnType<Required<AdapterOptions>['setup']> : undefined` - The setup data.

#### Returns

- `void | Promise<void>` - A void or a promise that resolves to void.

#### Example

```typescript title="ReportAdapter.ts"
export class ReportAdapter extends BaseAdapter<
  TrackContext<TrackData>,
  EventDataOption,
  AdapterOptions<TrackContext<TrackData>, EventDataOption>
> {
    report(
        ctx: TrackContext<TrackData>,
        reportData: AdapterReportData,
        setupData?: Awaited<ReturnType<AdapterOptions<TrackContext<TrackData>, EventDataOption>['setup']>
    ): void | Promise<void> {
        // do something
    }
}
```
