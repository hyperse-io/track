import { BasicAdapter, Track } from '../src/index.js';

describe('test-track.spec', () => {
  it('test Track  instance', async () => {
    const track = new Track();

    class ConsoleAdapter implements BasicAdapter {
      before(): void {
        throw new Error('Method not implemented.');
      }
      transform(): void {
        throw new Error('Method not implemented.');
      }
      track(): void {
        throw new Error('Method not implemented.');
      }
      after(): void {
        throw new Error('Method not implemented.');
      }
      init(): void {
        throw new Error('Method not implemented.');
      }
      isTrackable(): boolean {
        return true;
      }
    }

    track.use(new ConsoleAdapter());

    expect(true).toBe(true);
  });
});
