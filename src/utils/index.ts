/**
 * Debounce function, call once after timeout
 * will reset & re-wait timeout in case re-call before timeout
 * @param fn callback function
 * @param wait in milliseconds
 * @returns {(...args: any) => void}
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function ggjDebounce(fn: any, wait?: number) {
  let timerId: any, lastArguments: any, lastThis: any
  return (...args: any) => {
    timerId && clearTimeout(timerId)
    lastArguments = args
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this
    timerId = setTimeout(function () {
      fn.apply(lastThis, lastArguments)
      timerId = null
    }, wait || 400)
  }
}
