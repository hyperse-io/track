/**
 * A default track transform function.
 *
 * @param _ The input value of type Context.
 * @param options The options of type EventData.
 * @returns The transformed options of type EventData.
 */
export const defaultTrackTransform = <Context, EventData>(
  _: Context,
  options: EventData
): EventData => {
  return options;
};
