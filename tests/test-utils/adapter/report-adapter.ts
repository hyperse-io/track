import { BaseAdapter } from '../../../src/index.js';
import { AdapterReportData } from '../../../src/types/types-adapter.js';
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
    eventType: EventType,
    eventData: EventDataOption[EventType]
  ): boolean | Promise<boolean> {
    return true;
  }
  report(
    ctx: TrackContext<TrackData>,
    reportData: AdapterReportData,
    setupData?:
      | {
          name: 'setup' | 'setup1' | 'setup2';
          timeStamp: number;
          user?: string;
        }
      | undefined
  ): void | Promise<void> {}
}
