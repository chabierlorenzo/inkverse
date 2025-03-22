import { LANGUAGES } from '../const';
import { ValueObject } from './value-object';

export class LangValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  protected transform(value: any): string {
    return String(value).trim().toLowerCase();
  }

  protected validate(value: string): boolean {
    if (value.length !== 2 || !LANGUAGES.includes(value)) {
      throw new Error(`El código de idioma "${value}" no es válido.`);
    }
    return true;
  }

  equals(value: string): boolean {
    return this.value === value.toLowerCase();
  }
}
