export abstract class ValueObject<T> {
  public readonly value: T;

  constructor(value: T) {
    if (value === null || value === undefined) {
      throw new Error('El valor no puede ser nulo ni indefinido');
    }

    const transformedValue = this.transform(value);

    if (!this.validate(transformedValue)) {
      throw new Error('El valor proporcionado no es válido');
    }

    this.value = transformedValue;
    Object.freeze(this);
  }

  protected validate(value: T): boolean {
    return this.equals(value);
  }

  abstract equals(value: T): boolean;

  protected transform(value: any): T {
    return value;
  }
}
