import { ISBN, ISBN_10 } from '../const';
import { ValueObject } from './value-object';

export class Isbn10ValueObject extends ValueObject<ISBN> {
  constructor(value) {
    super(value);
  }

  equals(value) {
    return value.length === ISBN_10;
  }

  protected transform(value: any): string {
    return value.replace(/-/g, '');
  }
}
