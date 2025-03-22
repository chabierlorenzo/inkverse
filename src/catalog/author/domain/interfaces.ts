import { LANGUAGES, NATIONALITY } from 'src/core/const';

type Person = {
  id?: number;
  name?: string;
  surname?: string;
  langs?: keyof (typeof LANGUAGES)[];
  nationality?: keyof typeof NATIONALITY;
};

export interface Author extends Person {
  birthDate?: Date;
  deathDate?: Date;
}

// Adding a specific property to differentiate Ilustrator from Person
export interface Ilustrator extends Person {
  illustrationStyle?: string;
}

// Adding a specific property to differentiate Translator from Person
export interface Translator extends Person {
  translationLanguages?: keyof (typeof LANGUAGES)[];
}
