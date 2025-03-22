import { ISBN_13, ISBN } from '../const';
import { ValueObject } from './value-object';

export class Isbn13 extends ValueObject<ISBN> {
  constructor(value) {
    super(value);
  }

  equals(value) {
    return value.length === ISBN_13;
  }

  protected transform(value: any): string {
    return value.replace(/-/g, '');
  }
}
