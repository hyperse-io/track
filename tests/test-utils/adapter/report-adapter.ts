import { AdapterReportData, BaseAdapter } from '../../../src/index.js';
import { TrackContext } from '../../../src/types/types-create.js';
import { AdapterOptions } from '../types/type-adapter-options.js';
import { EventDataOption } from '../types/type-event.js';
import { TrackData } from '../types/type-track-data.js';

export class ReportAdapter extends BaseAdapter<
  TrackContext<TrackData>,
  EventDataOption,
  AdapterOptions<TrackContext<TrackData>, EventDataOption>
> {
  isTrackable<EventType extends keyof EventDataOption>(
    ctx: TrackContext<TrackData>,
    eventType: keyof EventDataOption,
    reportData?:
      | AdapterReportData<EventDataOption, EventDataOption, EventType>
      | Awaited<AdapterReportData<EventDataOption, EventDataOption, EventType>>
      | undefined
  ): boolean | Promise<boolean> {
    return true;
  }

  report<EventType extends keyof EventDataOption>(
    ctx: TrackContext<TrackData>,
    eventType: keyof EventDataOption,
    reportData?:
      | AdapterReportData<EventDataOption, EventDataOption, EventType>
      | Awaited<AdapterReportData<EventDataOption, EventDataOption, EventType>>
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
