import { LogLevel } from '../constant/log-level.js';
import { ConsoleAdapter } from './console-adapter.js';
import { ConsoleFormatStrategy } from './console-format-strategy.js';
import { FormatStrategy } from './format-strategy.js';
import { Logger } from './logger.js';

export const logger = new Logger({
  logLevel: LogLevel.Info as LogLevel,
  adapter: new ConsoleAdapter({
    formatStrategy: new ConsoleFormatStrategy(),
  }),
});

export const configLogger = <MessageType>(
  formatStrategy: FormatStrategy<MessageType>
) => {
  logger.reConfig({
    formatStrategy: formatStrategy,
  });
};
