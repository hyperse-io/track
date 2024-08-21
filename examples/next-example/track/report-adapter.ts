import { AdapterReportData, BaseAdapter, TrackContext } from '@hyperse/track';
import {
  ReportAdapterOptions,
  ReportEventData,
  ReportTrackData,
} from './types';

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
    alert(
      `report: \n ctx: ${JSON.stringify(ctx, null, 2)} \n reportData: ${JSON.stringify(reportData, null, 2)} \n setupData: ${JSON.stringify(setupData, null, 2)}`
    );
  }
}
