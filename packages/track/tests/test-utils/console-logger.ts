import { DEFAULT_CONTEXT } from '../../src/index.js';
import type { TrackLogger } from '../../src/types/types-logger.js';

const ensureString = (message: any): string => {
  return typeof message === 'string'
    ? message
    : message instanceof Error
      ? message.toString()
      : JSON.stringify(message, null, 2);
};
const localeStringOptions = {
  year: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
} as const;

export const print = (
  priority: 'Debug' | 'Verbose' | 'Info' | 'Warn' | 'Error',
  message: any,
  context?: string
) => {
  const prefix = priority;
  const timestamp =
    new Date(Date.now()).toLocaleString(undefined, localeStringOptions) + ' -';
  const printMessage = ensureString(message);
  const colors: string[] = [];
  switch (priority) {
    case 'Debug':
      colors.push(`color:magenta;`);
      break;
    case 'Verbose':
      colors.push(`color:magenta;`);
      break;
    case 'Info':
      colors.push(`color:blue;`);
      break;
    case 'Warn':
      colors.push(`color:yellow;`);
      break;
    case 'Error':
      colors.push(`color:red;`);
      break;
  }
  // color of logTimestamp
  colors.push(`color:grey;`);
  // color of context
  colors.push(`color:cyan;`);
  // print log message.
  console.log(
    ...[
      [
        `%c${priority}`,
        `%c${timestamp}`,
        `%c${context || DEFAULT_CONTEXT}`,
      ].join(' '),
      colors[0],
      colors[1],
      colors[2],
      printMessage,
      '\n',
    ]
  );
};

export class ConsoleLogger implements TrackLogger<any> {
  error(message: any, context?: string): void {
    print('Error', message);
  }
  warn(message: any, context?: string): void {
    print('Warn', message);
  }
  info(message: any, context?: string): void {
    print('Error', message);
  }
  verbose(message: any, context?: string): void {
    print('Verbose', message);
  }
  debug(message: any, context?: string): void {
    print('Debug', message);
  }
}
