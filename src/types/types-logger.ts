/**
 * A logger interface for tracking messages.
 * @template MessageType - The type of the message.
 */
export interface TrackLogger<MessageType> {
  error(message: MessageType, context?: string): void;
  warn(message: MessageType, context?: string): void;
  info(message: MessageType, context?: string): void;
  verbose(message: MessageType, context?: string): void;
  debug(message: MessageType, context?: string): void;
}
