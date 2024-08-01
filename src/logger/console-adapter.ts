import { LogLevel } from '../constant/log-level.js';
import { ConsoleFormatStrategy } from './console-format-strategy.js';
import { FormatStrategy } from './format-strategy.js';
import { LogAdapter, LogAdapterConfig } from './logger-adapter.js';

export class ConsoleAdapter<MessageType> implements LogAdapter<MessageType> {
  private formatStrategy: FormatStrategy<MessageType> =
    new ConsoleFormatStrategy<MessageType>();
  private level = LogLevel.Info;

  constructor(options?: LogAdapterConfig<MessageType>) {
    this.config(options);
  }

  config(config?: LogAdapterConfig<MessageType>): LogAdapter<MessageType> {
    if (config?.formatStrategy) {
      this.formatStrategy = config?.formatStrategy;
    }
    if (config?.logLevel !== undefined) {
      this.level = config?.logLevel || this.level;
    }
    return this as LogAdapter<MessageType>;
  }

  isLoggable(priority: LogLevel): boolean {
    return this.level >= priority;
  }

  print(
    priority: LogLevel,
    context: string,
    message: MessageType,
    trace?: any
  ): void {
    this.formatStrategy.print(priority, context, message, trace);
  }
}
