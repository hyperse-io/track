import { Track, TrackEventDataBase } from '../../../src/index.js';
import { TrackContext } from '../../../src/types/types-create.js';
import { ConsoleLogger } from '../console-logger.js';

export const defaultTackInstance = <
  TrackData,
  EventData extends TrackEventDataBase,
>() => {
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

  const track = new Track<TrackContext<TrackData>, EventData>(configuration);

  return track;
};
