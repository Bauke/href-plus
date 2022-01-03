export default function debounce(
  this: any,
  fn: (...args: any[]) => any,
  timeout = 250,
): typeof fn {
  let timeoutId: number;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
}
