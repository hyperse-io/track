import { createTrackBuilder } from '../../../src/index.js';
import type { TrackContext } from '../../../src/types/types-create.js';
import { ConsoleLogger } from '../console-logger.js';
import type { TrackData } from '../types/type-track-data.js';

export const defaultTackInstance = () => {
  const configuration = {
    logger: new ConsoleLogger(),
    data: {
      bizMode: 'test',
      env: 'prod',
      platform: 'android',
      ip: '0.0.0.0',
      userId: 'uuid_10001',
    },
  } as TrackContext<TrackData>;

  const track = createTrackBuilder({
    createData(eventData) {
      return configuration.data;
    },
    logger: new ConsoleLogger(),
  });

  return track;
};
