/**
 * @description
 * An enum of valid logging levels.
 */
export enum LogLevel {
  /**
   * @description
   * Log Errors only. These are usually indicative of some potentially
   * serious issue, so should be acted upon.
   */
  Error = 0,
  /**
   * @description
   * Warnings indicate that some situation may require investigation
   * and handling. But not as serious as an Error.
   */
  Warn = 1,
  /**
   * @description
   * Logs general information such as startup messages.
   */
  Info = 2,
  /**
   * @description
   * Logs detailed info useful in debug scenarios, including stack traces for
   * all errors. In production this would probably generate too much noise.
   */
  Debug = 3,
  /**
   * @description
   * Logs additional information
   */
  Verbose = 4,
}
