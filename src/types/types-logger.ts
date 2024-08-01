import { LogAdapter, LogAdapterConfig } from '../logger/logger-adapter.js';

export interface LogPrinter<MessageType> {
  error(message: MessageType, context?: string, trace?: any): void;
  warn(message: MessageType, context?: string): void;
  info(message: MessageType, context?: string): void;
  verbose(message: MessageType, context?: string): void;
  debug(message: MessageType, context?: string): void;
  debug(message: MessageType, context?: string): void;
  addAdapter(
    adapter: LogAdapter<MessageType>,
    config?: LogAdapterConfig<MessageType>
  ): LogPrinter<MessageType>;
  reConfig(config?: LogAdapterConfig<MessageType>): LogPrinter<MessageType>;
  clearLogAdapters(): LogPrinter<MessageType>;
}
