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
    window.postMessage({
      type: 'report',
      data: {
        ctx,
        reportData,
        setupData,
      },
    });
  }
}
