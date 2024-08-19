import { BaseAdapter } from '../../src/index.js';
import { AdapterReportData } from '../../src/types/types-adapter.js';
import { TrackContext } from '../../src/types/types-create.js';
import {
  ReportAdapterOptions,
  ReportEventData,
  ReportTrackData,
} from './types.js';

export class ReportAdapter extends BaseAdapter<
  TrackContext<ReportTrackData>,
  ReportEventData,
  ReportAdapterOptions<TrackContext<ReportTrackData>, ReportEventData>
> {
  isTrackable<EventType extends keyof ReportEventData>(
    ctx: TrackContext<ReportTrackData>,
    eventType: EventType,
    eventData: ReportEventData[EventType]
  ): boolean | Promise<boolean> {
    return true;
  }

  protected report(
    ctx: TrackContext<ReportTrackData>,
    reportData: AdapterReportData,
    setupData?:
      | { name: 'setup' | 'setup2' | 'setup3'; timeStamp: number }
      | undefined
  ): void | Promise<void> {
    console.log('report', ctx, reportData, setupData);
  }
}
