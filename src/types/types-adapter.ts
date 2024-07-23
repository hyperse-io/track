export type TrackAdapterOptions = {
  name: string;
};

export interface TrackAdapter {
  init<Context>(ctx: Context): void;
  before<Context, V>(ctx: Context, options: V): void;
  transform<Context, V>(ctx: Context, options: V): Promise<unknown> | unknown;
  isTrackable(): boolean;
  after<Context>(ctx: Context, result: unknown): void;
  report(result: unknown): void;
}
