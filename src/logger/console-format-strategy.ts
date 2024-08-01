import { LogLevel } from '../constant/log-level.js';
import { FormatStrategy } from './format-strategy.js';

export class ConsoleFormatStrategy<MessageType>
  implements FormatStrategy<MessageType>
{
  private readonly localeStringOptions = {
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
  } as const;

  print(
    priority: LogLevel,
    context: string,
    message: MessageType,
    trace: any
  ): void {
    this.logMessage(priority, this.ensureString(message), context, trace);
  }

  private logMessage(
    priority: LogLevel,
    message: string,
    context?: string,
    trace?: any
  ) {
    let prefix = LogLevel.Info;
    let printMessage = this.ensureString(message);
    const colors: string[] = [];
    switch (priority) {
      case LogLevel.Debug:
        prefix = LogLevel.Debug;
        colors.push(`color:magenta;`);
        break;
      case LogLevel.Verbose:
        prefix = LogLevel.Verbose;
        colors.push(`color:magenta;`);
        break;
      case LogLevel.Info:
        prefix = LogLevel.Info;
        colors.push(`color:blue;`);
        break;
      case LogLevel.Warn:
        prefix = LogLevel.Warn;
        printMessage = message;
        colors.push(`color:yellow;`);
        break;
      case LogLevel.Error:
        prefix = LogLevel.Error;
        printMessage =
          this.ensureString(message) +
          (trace ? `\n${this.ensureString(trace)}` : '');
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
          `%c${LogLevel[prefix].toLowerCase()}`,
          `%c${this.logTimestamp()}`,
          `%c${this.logContext(context)}`,
        ].join(' '),
        colors[0],
        colors[1],
        colors[2],
        printMessage,
        '\n',
      ]
    );
  }

  private logContext(context?: string) {
    return `[${context || DEFAULT_CONTEXT}]`;
  }

  private logTimestamp() {
    const timestamp = new Date(Date.now()).toLocaleString(
      undefined,
      this.localeStringOptions
    );
    return timestamp + ' -';
  }

  private ensureString(message): string {
    return typeof message === 'string'
      ? message
      : message instanceof Error
        ? message.toString()
        : JSON.stringify(message, null, 2);
  }
}
