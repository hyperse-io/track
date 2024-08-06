import { Mock } from 'vitest';
import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { TrackAdapter } from '../src/types/types-adapter.js';
import { TrackContext } from '../src/types/types-create.js';
import { ReportAdapter } from './fixtures/adapter/report-adapter.js';
import { AdapterOptions } from './fixtures/types/type-adapter-options.js';
import { EventDataOption } from './fixtures/types/type-event.js';
import { TrackData } from './fixtures/types/type-track-data.js';

describe('test-track-pipeline.spec', () => {
  const eventData: EventDataOption = {
    registry: {
      userName: 'testUser',
      mobile: '1234567890',
      pwd: 'password123',
      email: 'testuser@example.com',
    },
    previewGoods: {
      goodsId: 'g123',
      goodsName: 'Sample Goods',
    },
    addCart: {
      price: 99.99,
      goodsId: 'g123',
      goodsName: 'Sample Goods',
      count: 2,
    },
    timeStamp: '1000',
  };
  const [reportReportFun, reportReportCallback, reportAdapter] =
    mockAdapter('reportAdapter');
  const [analyzerReportFun, analyzerReportCallback, analyzerAdapter] =
    mockAdapter('analyzerAdapter');
  const [consoleReportFun, consoleReportCallback, consoleAdapter] =
    mockAdapter('consoleAdapter');

  const adapterMap = {
    reportAdapter: reportAdapter,
    analyzerAdapter: analyzerAdapter,
    consoleAdapter: consoleAdapter,
  };

  const trackBuilder = createTrackBuilder<
    TrackContext<TrackData>,
    EventDataOption
  >();

  const trackBuilderFactory = trackBuilder.init(() => adapterMap);

  it('test track parallel select', async () =>
    new Promise((done) => {
      setTimeout(async () => {
        await trackBuilderFactory
          .select('analyzerAdapter')
          .track('addCart', eventData.addCart);
        expect(analyzerReportCallback.mock.results[0].value).toBe(
          'analyzerAdapter'
        );
      }, 1000);

      setTimeout(async () => {
        await trackBuilderFactory.select().track('addCart', eventData.addCart);
        expect(reportReportCallback.mock.results[0].value).toBe(
          'reportAdapter'
        );
        expect(analyzerReportCallback.mock.results[0].value).toBe(
          'analyzerAdapter'
        );
        expect(consoleReportCallback.mock.results[0].value).toBe(
          'consoleAdapter'
        );
      }, 1500);

      setTimeout(async () => {
        await trackBuilderFactory
          .select(() => {
            return ['consoleAdapter', 'analyzerAdapter'];
          })
          .track('addCart', eventData.addCart);
        expect(analyzerReportCallback.mock.results[0].value).toBe(
          'analyzerAdapter'
        );
        expect(consoleReportCallback.mock.results[0].value).toBe(
          'consoleAdapter'
        );
        done('done');
      }, 2000);
    }));
});

const mockAdapter = (
  adapterName: string
): [
  Mock<(ctx: any, reportData: any, setupData: any) => any>,
  Mock<(adapterName: string) => string>,
  TrackAdapter<TrackContext<TrackData>, EventDataOption, any>,
] => {
  const reportAdapterBuilder = createAdapterBuilder<
    TrackContext<TrackData>,
    EventDataOption,
    AdapterOptions<TrackContext<TrackData>, EventDataOption>
  >(new ReportAdapter());

  const reportAdapter = reportAdapterBuilder.build();

  const reportCallback = vi.fn((adapterName: string) => {
    console.log(`Reported by ${adapterName}`);
    return adapterName;
  });
  const report = vi.fn((ctx: any, reportData: any, setupData: any) => {
    reportCallback(adapterName);
  });

  vi.spyOn(reportAdapter as ReportAdapter, 'report').mockImplementation(report);

  return [report, reportCallback, reportAdapter];
};
