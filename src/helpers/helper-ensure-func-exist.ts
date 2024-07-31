export const ensureFuncExist = <T>(fn?: T): T | (() => void) => {
  if (!fn) {
    return () => {};
  }
  return fn;
};
