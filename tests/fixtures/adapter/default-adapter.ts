import { createAdapterBuilder } from '../../../src/adapter/create-adapter-builder.js';
import { TrackEventDataBase } from '../../../src/index.js';

export const defaultAdapter = async <T, V extends TrackEventDataBase>() => {
  const adapterBuilder = await createAdapterBuilder<T, V>();

  return adapterBuilder
    .init(() => {})
    .transform(() => {})
    .report(() => {})
    .build();
};
