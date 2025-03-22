import { DomainEvent } from '../domain-event/domain-event';
import { DomainEventStore } from './domain-event-store.interface';

export class AggregateRoot implements DomainEventStore {
  private domainEvents: DomainEvent[] = [];

  getVersion(): number {
    return 1;
  }

  record(evnt: DomainEvent): void {
    console.log('Event recorded:', evnt);
    throw new Error('Method not implemented.');
  }

  /**
   * Devuelve todos los eventos de dominio no procesados y los elimina del almacenamiento.
   */
  flushDomainEvents(): DomainEvent[] {
    throw new Error('Method not implemented');
  }

  /**
   * Devuelve todos los eventos de dominio sin eliminarlos del almacenamiento.
   */
  getDomainEvents(): DomainEvent[] {
    throw new Error('Method not implemented');
  }

  /**
   * Reconstruye el estado del agregado a partir de una lista de eventos.
   * Opcional, útil para event sourcing.
   */
  replay(events: DomainEvent[]): void {
    console.log('Replaying events:', events);
    throw new Error('Method not implemented.');
  }
}
