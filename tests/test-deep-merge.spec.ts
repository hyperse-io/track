import { deepMerge } from '../src/helpers/helper-deep-merge.js';

describe('test-deep-merge.spec', () => {
  it('creates a new object reference', () => {
    const nestedObject = { b: 2, y: 2 };
    const input: any = {
      a: nestedObject,
      x: 1,
    };

    const result = deepMerge(input, {
      c: 5,
      a: {
        y: undefined,
      },
      x: undefined,
      d: 1,
    } as any);
    expect(result).toEqual({
      a: nestedObject,
      c: 5,
      x: 1,
      d: 1,
    });

    expect(input).not.toBe(result);
    expect(input.a).not.toBe(result.a);
  });

  it('creates a new object reference with undefined', () => {
    const nestedObject = { b: 2, c: 1 };
    const input: any = {
      a: nestedObject,
      x: 1,
    };

    const result = deepMerge(
      input,
      {
        c: 5,
        a: {
          b: undefined,
        },
        x: undefined,
        d: undefined,
      } as any,
      true
    );
    expect(result).toEqual({
      a: {
        c: 1,
        b: undefined,
      },
      c: 5,
      x: undefined,
      d: undefined,
    });

    expect(input).not.toBe(result);
    expect(input.a).not.toBe(result.a);
  });

  it('merge options with nested function', () => {
    function fn1() {}
    function fn2() {}
    const input: any = {
      b: 2,
      child: {
        fn: fn1,
      },
    };
    const result = deepMerge(input, {
      b: 2,
      child: {
        fn: fn2,
      },
    } as any);

    expect(result).toEqual({
      b: 2,
      child: {
        fn: fn2,
      },
    });

    expect(input).not.toEqual(result);
    expect(input.child.fn).not.toBe(result.child.fn);
    expect(input.child.fn).toBe(fn1);
    expect(result.child.fn).toBe(fn2);
  });

  it('merges top-level properties', () => {
    const input: any = {
      a: 1,
      b: 2,
    };

    const result = deepMerge(input, { b: 3, c: 5 } as any);
    expect(result).toEqual({
      a: 1,
      b: 3,
      c: 5,
    });
  });

  it('does not merge arrays', () => {
    const input: any = {
      a: [1],
    };

    const result = deepMerge(input, { a: [2] } as any);
    expect(result).toEqual({
      a: [2],
    });
  });

  it('merges deep properties', () => {
    const input: any = {
      a: 1,
      b: { c: 2 },
    };

    const result = deepMerge(input, { b: { c: 5 } } as any);
    expect(result).toEqual({
      a: 1,
      b: { c: 5 },
    });
  });

  it('does not mutate target', () => {
    const input: any = {
      a: 1,
      b: { c: { d: 'foo', e: { f: 1 } } },
    };

    const result = deepMerge(input, { b: { c: { d: 'bar' } } } as any);
    expect(result).toEqual({
      a: 1,
      b: { c: { d: 'bar', e: { f: 1 } } },
    });
    expect(input).toEqual({
      a: 1,
      b: { c: { d: 'foo', e: { f: 1 } } },
    });
  });

  it('works when nested', () => {
    const input1: any = {
      a: 1,
      b: { c: { d: 'foo1', e: { f: 1 } } },
    };

    const input2: any = {
      b: { c: { d: 'foo2', e: { f: 2 } } },
    };

    const result = deepMerge(
      input1,
      deepMerge(input2, { b: { c: { d: 'bar' } } } as any)
    );

    expect(result).toEqual({
      a: 1,
      b: { c: { d: 'bar', e: { f: 2 } } },
    });
    expect(input1).toEqual({
      a: 1,
      b: { c: { d: 'foo1', e: { f: 1 } } },
    });
    expect(input2).toEqual({
      b: { c: { d: 'foo2', e: { f: 2 } } },
    });
  });

  it('replaces class instances rather than merging their properties', () => {
    class Foo {
      name = 'foo';
    }

    class Bar {
      name = 'bar';
    }

    const input: any = {
      class: new Foo(),
    };

    const result = deepMerge(input, { class: new Bar() } as any);

    expect(result.class instanceof Bar).toBe(true);
    expect(result.class.name).toBe('bar');
  });

  it('merge deep nested objects', () => {
    const defaultValue = {
      settingOptions: {
        autoDataInit: false,
      },
      nextCacheOptions: {
        nextFrontEndPoint: 'https://www.kzfoo.com',
        nextCleanSSGCacheToken: 'YYDS',
      },
      // 1. redis session cache db: 1
      // 2. semic redis data cache db: 2,
      // 3. BullMQJobQueuePlugin db: 0,
      dataCacheOptions: {
        strategyType: 'mysql',
        // available only while `strategyType: 'redis'`
        redisOptions: {
          redisCacheTTL: 60 * 60 * 24 * 30,
          redisConnection: {
            port: 6379,
            db: 2,
            host: process.env.REDIS_CONN_HOST || '127.0.0.1',
            password: process.env.REDIS_CONN_PASSWORD || '',
            maxRetriesPerRequest: null,
          },
        },
      },
      sessionCacheOptions: {
        strategyType: 'mysql',
        // available only while `strategyType: 'redis'`
        redisOptions: {
          redisCacheTTL: 60 * 60 * 24 * 30,
          redisConnection: {
            db: 1,
            port: 6379,
            host: process.env.REDIS_CONN_HOST || '127.0.0.1',
            password: process.env.REDIS_CONN_PASSWORD || '',
            maxRetriesPerRequest: null,
          },
        },
      },
      exchangeRatesOptions: {
        exchangeRateAppId: '2893632f2da64ec88de0e311184efc82',
      },
    };
    const result = deepMerge(defaultValue, {
      dataCacheOptions: {
        redisOptions: {
          redisConnection: {
            db: 5,
          },
        },
      },
    });
    expect(result.dataCacheOptions.strategyType).toBe('mysql');
    expect(result.dataCacheOptions.redisOptions.redisConnection.db).toBe(5);
    expect(defaultValue.dataCacheOptions.redisOptions.redisConnection.db).toBe(
      2
    );
  });
});
