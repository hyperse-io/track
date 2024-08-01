import { DEFAULT_CONTEXT } from '../constant/default-constant.js';
import { LogPrinter } from '../types/types-logger.js';
import { LogAdapter, LogAdapterConfig } from './logger-adapter.js';
import { LoggerPrinter } from './logger-printer.js';

export type LoggerOptions<
  MessageType,
  OptionExtendType extends Record<string, unknown> = {},
> = LogAdapterConfig<MessageType> & {
  adapter?: LogAdapter<MessageType>;
  context?: string;
} & OptionExtendType;

/**
 * The default logger, which logs to the console (stdout) with optional timestamps. Since this logger is part of the
 * default Vendure configuration, you do not need to specify it explicitly in your server config. You would only need
 * to specify it if you wish to change the log level (which defaults to `LogLevel.Info`) or remove the timestamp.
 */
export class Logger<
  MessageType,
  OptionExtendType extends Record<string, unknown> = {},
> {
  private printer: LogPrinter<MessageType> = new LoggerPrinter<MessageType>();
  private context = DEFAULT_CONTEXT;

  constructor(options?: LoggerOptions<MessageType, OptionExtendType>) {
    this.context = options?.context || DEFAULT_CONTEXT;
    if (options?.adapter) {
      this.addLogAdapter(options.adapter, options);
    }
  }

  usePrinter(printer: LogPrinter<MessageType>) {
    this.printer = printer;
    return this;
  }

  reConfig(options?: Partial<LoggerOptions<MessageType, OptionExtendType>>) {
    this.context = options?.context || this.context;
    this.printer.reConfig(options);
  }

  addLogAdapter(
    adapter: LogAdapter<MessageType>,
    config?: LogAdapterConfig<MessageType> | undefined
  ) {
    this.printer.addAdapter(adapter, config);
    return this;
  }

  clearLogAdapters() {
    this.printer.clearLogAdapters();
    return this;
  }

  error(message: MessageType, context?: string, trace?: any): void {
    this.printer.error(message, this.logContext(context), trace);
  }

  warn(message: MessageType, context?: string): void {
    this.printer.warn(message, this.logContext(context));
  }

  info(message: MessageType, context?: string): void {
    this.printer.info(message, this.logContext(context));
  }

  verbose(message: MessageType, context?: string): void {
    this.printer.verbose(message, this.logContext(context));
  }

  debug(message: MessageType, context?: string): void {
    this.printer.debug(message, this.logContext(context));
  }

  private logContext(context: any) {
    return context || this.context;
  }
}
