// export type EventMetadata = Record<string, any>;
// export type EventContent = Record<string, any>;

export type EventMetadata<M = Record<string, unknown>> = M;
export type EventContent<P = Record<string, unknown>> = P;

export type EventType = string;

export type EventMessage = {
  type: EventType;
  payload: EventContent;
  metadata: EventMetadata;
};
