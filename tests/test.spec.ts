import { p } from 'rocket-pipes-slim';
describe('Test', () => {
  it('should return true', async () => {
    const resp = p(
      (name: string) => {
        return new Promise<{ x: number; y: string }>((resolve) => {
          setTimeout(() => {
            resolve({ x: 123, y: name });
          }, 2000);
        });
      },
      (ctx) => {
        return { res: ctx.x + 1, y: ctx.y };
      }
    );

    const r = await resp('test').catch((e) => {
      console.log(e);
    });

    expect(r).toMatchObject({
      res: 124,
      y: 'test',
    });
  });
});
