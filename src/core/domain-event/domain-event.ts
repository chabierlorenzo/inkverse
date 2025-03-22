import { EventMessage } from './domain-event.interfaces';

export abstract class DomainEvent {
  readonly ocurredOn: Date;

  message: EventMessage;

  constructor(message: EventMessage) {
    this.ocurredOn = new Date();
    this.message = message;
  }

  getType(): string {
    return this.message.type;
  }

  getPayload(): Record<string, any> {
    return this.message.payload;
  }

  getMetadata(): Record<string, any> {
    return this.message.metadata;
  }

  getMessage(): EventMessage {
    return this.message;
  }
}
