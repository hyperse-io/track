import { createAdapterBuilder } from '../../../src/adapter/create-adapter-builder.js';
import { TrackEventValueBase } from '../../../src/index.js';

export const defaultAdapter = async <T, V extends TrackEventValueBase>() => {
  const adapterBuilder = await createAdapterBuilder<T, V>();

  return adapterBuilder
    .init(() => {})
    .report(() => {})
    .build();
};
