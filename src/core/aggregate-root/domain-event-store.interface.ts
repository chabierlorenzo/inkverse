import { DomainEvent } from '../domain-event/domain-event';

export interface DomainEventStore {
  /**
   * Registra un nuevo evento de dominio generado por el agregado.
   */
  record(evnt: DomainEvent): void;

  /**
   * Devuelve todos los eventos de dominio no procesados y los elimina del almacenamiento.
   */
  flushDomainEvents(): DomainEvent[];

  /**
   * Devuelve todos los eventos de dominio sin eliminarlos del almacenamiento.
   */
  getDomainEvents(): DomainEvent[];

  /**
   * Reconstruye el estado del agregado a partir de una lista de eventos.
   * Opcional, útil para event sourcing.
   */
  replay(events: DomainEvent[]): void;

  /**
   * Devuelve la versión actual del agregado.
   * Opcional, útil si trabajas con versionamiento.
   */
  getVersion(): number;
}
