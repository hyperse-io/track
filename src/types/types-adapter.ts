export type TrackAdapterOptions = {
  name: string;
};

export interface TrackAdapter {
  init(options: TrackAdapterOptions): void;
  before(options: TrackAdapterOptions): void;
  transform(options: TrackAdapterOptions): void;
  track(options: TrackAdapterOptions): void;
  isTrackable(): boolean;
  after(options: TrackAdapterOptions): void;
}
