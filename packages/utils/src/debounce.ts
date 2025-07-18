/**
 * Creates a debounced version of a function, ensuring it is called only after a specified
 * delay from the last invocation.
 *
 * @template F The type of the function to debounce
 * @param fn - The function to debounce.
 * @param delay - The time in milliseconds to wait before calling the function after the last call.
 * @returns A debounced version of the function that returns a promise and has a cancel method.
 *
 * @example
 * // Example usage of the debounce function
 * const debouncedFetchData = debounce(async (query: string) => {
 * const response = await fetch(`/api/search?q=${query}`);
 * return response.json();
 * }, 300);
 *
 * // Calling the debounced function multiple times
 * debouncedFetchData("hello").then(console.log); // Will only call fetch once after 300ms delay
 * debouncedFetchData("world").then(console.log); // Will cancel the previous call and make a new one
 *
 * // To cancel the debounced call before it executes
 * const promise = debouncedFetchData("to be cancelled");
 * promise.cancel();
 */
export default function debounce<
  F extends (...args: Parameters<F>) => ReturnType<F>,
>(
  fn: F,
  delay: number,
): ((...args: Parameters<F>) => Promise<ReturnType<F>>) & {
  cancel: () => void;
} {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounceExec = (...args: Parameters<F>): Promise<ReturnType<F>> => {
    // Timer already exists, clear it. This way we avoid resolving more than once.
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise<ReturnType<F>>((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        // Timer hasn't been cancelled, call the function
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };

  // Clear the timeout and reject the promise
  debounceExec.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounceExec;
}
