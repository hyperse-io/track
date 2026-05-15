import type {
  AdapterReportData,
  GetSafeRealEventTypes,
} from '../../../src/index.js';
import { BaseAdapter } from '../../../src/index.js';
import type { TrackContext } from '../../../src/types/types-create.js';
import type { AdapterRealOptions } from '../types/type-adapter-options.js';
import type {
  EventDataOption,
  RealEventDataOption,
} from '../types/type-event.js';
import type { TrackData } from '../types/type-track-data.js';

export class AnalyzerAdapter extends BaseAdapter<
  TrackContext<TrackData>,
  EventDataOption,
  AdapterRealOptions<
    TrackContext<TrackData>,
    EventDataOption,
    RealEventDataOption
  >,
  RealEventDataOption
> {
  testIsEventOfReportDataEqual<
    EventType extends GetSafeRealEventTypes<
      RealEventDataOption,
      EventDataOption
    >,
  >(
    eventType: GetSafeRealEventTypes<RealEventDataOption, EventDataOption>,
    reportData:
      | RealEventDataOption[keyof RealEventDataOption]
      | EventDataOption[keyof EventDataOption],
    realEventType: EventType
  ): reportData is AdapterReportData<
    RealEventDataOption,
    EventDataOption,
    EventType
  > {
    return this.isEventOfReportDataEqual(eventType, reportData, realEventType);
  }

  isTrackable<EventType extends keyof RealEventDataOption>(
    ctx: TrackContext<TrackData>,
    eventType: keyof RealEventDataOption,
    reportData?:
      | AdapterReportData<RealEventDataOption, EventDataOption, EventType>
      | Awaited<
          AdapterReportData<RealEventDataOption, EventDataOption, EventType>
        >
      | undefined
  ): boolean | Promise<boolean> {
    return !this.isEventOfReportDataEqual(eventType, reportData, '_timeStamp');
  }

  report<EventType extends keyof RealEventDataOption>(
    ctx: TrackContext<TrackData>,
    eventType: keyof RealEventDataOption,
    reportData?:
      | AdapterReportData<RealEventDataOption, EventDataOption, EventType>
      | Awaited<
          AdapterReportData<RealEventDataOption, EventDataOption, EventType>
        >
      | undefined,
    setupData?:
      | {
          name: 'setup' | 'setup1' | 'setup2';
          timeStamp: number;
          user?: string;
        }
      | undefined
  ): void | Promise<void> {}
}
