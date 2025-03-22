// ISBN
export type ISBN = string;
export type LANG = keyof typeof LANGUAGES;

export const ISBN_13 = 13;
export const ISBN_10 = 13;

export const LANGUAGES = [
  'es', // Español
  'en', // Inglés
  'fr', // Francés
  'de', // Alemán (corregido de 'ge')
  'it', // Italiano
  'pt', // Portugués
  'ru', // Ruso
  'zh', // Chino
  'ja', // Japonés
  'ko', // Coreano
  'ar', // Árabe
  'hi', // Hindi
  'bn', // Bengalí
  'pa', // Panyabí
  'te', // Telugu
  'mr', // Maratí
  'ta', // Tamil
  'ur', // Urdu
  'nl', // Neerlandés
  'tr', // Turco
  'pl', // Polaco
  'vi', // Vietnamita
  'th', // Tailandés
  'he', // Hebreo
  'el', // Griego
  'cs', // Checo
  'ro', // Rumano
  'hu', // Húngaro
  'sv', // Sueco
  'da', // Danés
  'fi', // Finlandés
  'sk', // Eslovaco
  'no', // Noruego
  'uk', // Ucraniano
  'id', // Indonesio
  'ms', // Malayo
  'fa', // Persa
  'ca', // Catalán
  'gl', // Gallego
  'eu', // Euskera
  'ga', // Irlandés
  'is', // Islandés
  'hr', // Croata
  'sr', // Serbio
  'lt', // Lituano
  'lv', // Letón
  'et', // Estonio
  'sl', // Esloveno
  'bg', // Búlgaro
  'mk', // Macedonio
  'sq', // Albanés
  'hy', // Armenio
  'ka', // Georgiano
  'uz', // Uzbeko
  'kk', // Kazajo
  'ky', // Kirguís
  'tk', // Turcomano
  'mn', // Mongol
  'ps', // Pastún
  'ne', // Nepalí
  'si', // Cingalés
  'my', // Birmano
  'km', // Camboyano
  'lo', // Lao
];
