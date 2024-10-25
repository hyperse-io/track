import type { AdapterReportData, TrackContext } from '@hyperse/track';
import { BaseAdapter } from '@hyperse/track';
import type {
  ReportAdapterOptions,
  ReportEventData,
  ReportRealEventData,
  ReportTrackData,
} from './types';

export class ReportAdapter extends BaseAdapter<
  TrackContext<ReportTrackData>,
  ReportEventData,
  ReportAdapterOptions<
    TrackContext<ReportTrackData>,
    ReportEventData,
    ReportRealEventData
  >,
  ReportRealEventData
> {
  isTrackable(): boolean | Promise<boolean> {
    return true;
  }

  protected report<EventType extends keyof ReportRealEventData>(
    ctx: TrackContext<ReportTrackData>,
    eventType: keyof ReportRealEventData,
    reportData?:
      | AdapterReportData<ReportRealEventData, ReportEventData, EventType>
      | Awaited<
          AdapterReportData<ReportRealEventData, ReportEventData, EventType>
        >
      | undefined,
    setupData?: { timeStamp: number } | undefined
  ): void | Promise<void> {
    window.postMessage({
      type: 'report',
      data: {
        ctx,
        eventType,
        reportData,
        setupData,
      },
    });
  }
}
