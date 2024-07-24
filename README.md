# @hyperse/track

<p align="left">
  <a aria-label="Build" href="https://github.com/hyperse-io/track/actions?query=workflow%3ACI">
    <img alt="build" src="https://img.shields.io/github/actions/workflow/status/hyperse-io/track/ci-integrity.yml?branch=main&label=ci&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="stable version" href="https://www.npmjs.com/package/@hyperse/track">
    <img alt="stable version" src="https://img.shields.io/npm/v/%40hyperse%2Ftrack?branch=main&label=version&logo=npm&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Top language" href="https://github.com/hyperse-io/track/search?l=typescript">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/hyperse-io/track?style=flat-square&labelColor=000&color=blue">
  </a>
  <a aria-label="Licence" href="https://github.com/hyperse-io/track/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/github/license/hyperse-io/track?style=flat-quare&labelColor=000000" />
  </a>
</p>

A typed, smart, scalable , powerful data collection engine written in typescript

## Usage

- ### Create CustomerAdapter
  Creating a CustomerAdapter requires extends BaseAdapter, and you need to provide implementations of the transform and report methods

```ts
export type Context = {
  name: string;
  env: 'prod' | 'uat';
  platform?: string;
};

export type InputOption = {
  level?: 'info' | 'warn' | 'error';
  message?: string;
  page?: string;
  event?: string;
};

class ConsoleAdapter extends BaseAdapter<Context, InputOption> {
  transform(ctx: Context, options: InputOption) {
    return {
      ...options,
      adapter: 'console',
      page: 'page',
      url: 'http://localhost:3000',
    };
  }
  after(
    ctx: Context,
    result: Awaited<ReturnType<typeof this.transform>>
  ): void {
    console.log('ConsoleAdapter after: ');
  }

  before(ctx: Context, options: InputOption): void {
    console.log('ConsoleAdapter before: ');
  }

  init(ctx: Context): void {
    console.log('ConsoleAdapter init');
  }

  report(result: Awaited<ReturnType<typeof this.transform>>): void {
    console.log('ConsoleAdapter report: ', result);
  }

  isTrackable(): boolean {
    return true;
  }
}
```

- ### Create a Track instance using the createTracker method

```ts
import { createTrack } from '@hyperse/track';

const track = await createTrack<Context, InputOption>({
  createCtx: () => {
    return {
      name: 'customer adapter',
      env: 'prod',
      platform: 'web',
    };
  },
  level: 'info',
});

const inputOptions: InputOption = {
  message: 'this is a message',
};

//construct the track actuator
track
  //add adapter
  .addAdapter([customerAdapter])
  //add one or more functions to be executed before the main track function
  .before(() => {
    console.log('global before: ', new Date().getTime());
  })
  //add one or more functions to be executed after the track event is triggered.
  .after(() => {
    console.log('global after: ', new Date().getTime());
  })
  //filter the list of adapters to be executed
  .select((ctx, adapterList) => {
    return adapterList.filter((adapter) => adapter.isTrackable());
  })
  //The global transform function for the track inputOption.
  .transform((ctx, options) => {
    return Promise.resolve({
      ...ctx,
      ...options,
      age: 1,
    });
  })
  //execute function
  .track(inputOptions);
```

- ### Create a Track instance with a constructor

```ts
const ctxOptions: Context = {
  name: 'customer adapter',
  env: 'prod',
  platform: 'web',
};
const track = new Track<Context, InputOption>(ctxOptions);
```

## Errors

If an exception occurs during the track process, you can use trycache to catch the exception information and handle the error information.

```ts
const inputOptions: InputOption = {
  message: 'this is a message',
};

try {
  await track.addAdapter([customerAdapter]).track(inputOptions);
} catch (error: any) {
  console.error(error.message);
}
```

## Development

yarn install

## Testing

yarn test
