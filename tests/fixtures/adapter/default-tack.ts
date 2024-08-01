import { Track, TrackEventDataBase } from '../../../src/index.js';

export const defaultTack = <T, V extends TrackEventDataBase>() => {
  const context = {
    env: 'prod',
    platform: 'android',
    ip: '0.0.0.0',
    userId: 'uuid_10001',
  };
  const track = new Track<T, V>(context as T);
  return track;
};
