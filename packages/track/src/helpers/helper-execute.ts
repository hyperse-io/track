/**
 * Executes a given function with the provided arguments.
 * @param fn - The function to execute.
 * @param args - The arguments to pass to the function.
 * @returns A promise that resolves with the function's result or rejects with an error.
 */
export async function executeFunction<T extends (...args: any[]) => any>(
  fn?: T,
  ...args: Parameters<T>
): Promise<ReturnType<T> | undefined> {
  if (!fn) {
    return;
  }
  const result = await fn(...args);
  return result;
}
