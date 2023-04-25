// export function debounce(func, delay) {
//     let timeoutId;
//     return function (...args) {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => {
//             func.apply(this, args);
//         }, delay);
//     };
// }

export function debounce(action, seconds) {
  let timerId = null;
  return function (...event) {
    clearTimeout(timerId);
    timerId = setTimeout(action, seconds, ...event);
  };
}
