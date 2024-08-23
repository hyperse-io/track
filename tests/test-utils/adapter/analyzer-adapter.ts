import { AdapterReportData, BaseAdapter } from '../../../src/index.js';
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
    return eventType !== '_timeStamp';
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
