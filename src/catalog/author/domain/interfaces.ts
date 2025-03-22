import { LANGUAGES } from 'src/core/const';

export interface Author {
  id: number;
  name: string;
  surname: string;
  langs: keyof (typeof LANGUAGES)[];
}

export interface Translator {
  id: number;
  name: string;
  surname: string;
  langs: keyof (typeof LANGUAGES)[];
}

export interface Ilustrator {
  id: number;
  name: string;
  surname: string;
}
