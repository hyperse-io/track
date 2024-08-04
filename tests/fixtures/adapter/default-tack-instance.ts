import { createTrackBuilder } from '../../../src/index.js';
import { TrackContext } from '../../../src/types/types-create.js';
import { ConsoleLogger } from '../console-logger.js';
import { TrackData } from '../types/type-track-data.js';

export const defaultTackInstance = async () => {
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

  const track = await createTrackBuilder({
    createData(eventData) {
      return configuration.data;
    },
    logger: new ConsoleLogger(),
  });

  return track;
};
