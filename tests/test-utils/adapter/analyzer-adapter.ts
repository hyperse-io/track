import {
  AdapterReportData,
  BaseAdapter,
  CheckUndefined,
} from '../../../src/index.js';
import { TrackContext } from '../../../src/types/types-create.js';
import { AdapterRealOptions } from '../types/type-adapter-options.js';
import { EventDataOption, RealEventDataOption } from '../types/type-event.js';
import { TrackData } from '../types/type-track-data.js';

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
    EventType extends
      | CheckUndefined<RealEventDataOption, EventDataOption>
      | CheckUndefined<RealEventDataOption, EventDataOption>[],
  >(
    eventType: CheckUndefined<RealEventDataOption, EventDataOption>,
    reportData:
      | RealEventDataOption[keyof RealEventDataOption]
      | EventDataOption[keyof EventDataOption],
    realEventType: EventType
  ): reportData is EventType extends CheckUndefined<
    RealEventDataOption,
    EventDataOption
  >[]
    ? AdapterReportData<RealEventDataOption, EventDataOption, EventType[number]>
    : AdapterReportData<RealEventDataOption, EventDataOption, EventType> {
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
    return !this.isEventOfReportDataEqual(eventType, reportData, [
      '_timeStamp',
    ]);
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
