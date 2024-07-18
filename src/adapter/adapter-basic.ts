import { TrackAdapter } from '../types/types-adapter.js';

export abstract class BasicAdapter implements TrackAdapter {
  before(): void {}
  transform(): void {}
  track(): void {}
  after(): void {}
  init(): void {}
  isTrackable(): boolean {
    return true;
  }
}
