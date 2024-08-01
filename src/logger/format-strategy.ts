import type { LogLevel } from '../constant/log-level.js';

/**
 * Used to determine how messages should be printed or saved.
 *
 * @see PrettyFormatStrategy
 */
export interface FormatStrategy<MessageType> {
  print(
    priority: LogLevel,
    context: string,
    message: MessageType,
    trace?: any
  ): void;
}
