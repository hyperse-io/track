# BaseAdapter

`BaseAdapter` is an abstract class that serves as the foundation for creating track adapters. It provides common functionality and hooks for tracking events, allowing you to extend and customize behavior for specific use cases.

## Overview

The `BaseAdapter` class defines two key methods:

- isTrackable: This method checks if a particular event should be tracked.
- report: This method handles the reporting of event data to a third-party service or system.

Both methods are meant to be extended in a concrete implementation of the `BaseAdapter` class.

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

`isTrackable` is an abstract method that checks whether a specific event should be tracked by the adapter. This method must be implemented in any subclass of `BaseAdapter`.

#### Parameters

- **ctx** : `TrackContext<TrackData>`

  The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event.

- **eventType** : `keyof EventData`

  The type of event being tracked. This is usually a key from the EventData that corresponds to specific events like click, purchase, etc.

- **eventData** : `EventData[keyof EventData]`

  The data associated with the event. This contains all relevant information for the specific event type.

#### Returns

- `boolean | Promise<boolean>` - A boolean or a promise that resolves to a boolean, indicating whether the event should be tracked. `true` means the event is trackable, while `false` means it is not.

#### Example

Here’s an example implementation of `isTrackable` that only tracks `addCart` events:

```typescript title="ReportAdapter.ts"
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
    return eventType === 'addCart';
  }
}
```

### `report`

`report` is a protected method used to send event data to an external system or service. This method can be overridden in a subclass to customize the reporting process, such as transforming the data or adding additional logic before the report is sent.

#### Parameters

- **ctx** : `TrackContext<TrackData>`

  The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event.

- **reportData** : `AdapterReportData`

  The data that needs to be reported. This can include the event type, associated data, and any additional metadata that should be sent to the third-party service.

- **setupData** : `Required<AdapterOptions>['setup'] extends (...args: any) => any ? Awaited<ReturnType<Required<AdapterOptions>['setup']> : undefined` (Optional)

  The setup data, which may include configurations or preliminary data used during the report phase. This allows for additional data processing or setup before the reporting occurs.

#### Returns

- `void | Promise<void>`

  This method can either return `void` or a `Promise` that resolves to `void`, depending on whether the reporting process is asynchronous.

#### Example

Here’s an example implementation of the report method:

```typescript title="ReportAdapter.ts"
export class ReportAdapter extends BaseAdapter<
  TrackContext<TrackData>,
  EventData,
  AdapterOptions<TrackContext<TrackData>, EventData>
> {
    report(
        ctx: TrackContext<TrackData>,
        reportData: AdapterReportData,
        setupData?: Awaited<ReturnType<AdapterOptions<TrackContext<TrackData>, EventData>['setup']>
    ): void | Promise<void> {
        // do something
    }
}
```
