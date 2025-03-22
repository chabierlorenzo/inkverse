// Alias para tipos comunes
type ISBN = string;

// Paginación
type Pagination = {
  page?: number; // Página actual
  limit?: number; // Límite de resultados por página
};

// Orígenes de búsqueda
type ResultOrigin =
  | 'google'
  | 'amazon'
  | 'sintinta'
  | 'openlibrary'
  | 'goodreads'
  | 'wikipedia'
  | 'librarything'
  | 'isbnsearch'
  | 'worldcat'
  | 'bookdepository'
  | 'casadellibro'
  | 'fnac'
  | 'elcorteingles'
  | 'agapea'
  | 'iberlibro'
  | 'todostuslibros';

// Estrategias de búsqueda y exclusión
type SearchStrategies = {
  strategies: ResultOrigin[]; // Lista de orígenes a utilizar
  ia_search?: boolean; // Indicador para búsquedas con inteligencia artificial
  exclude?: {
    title?: string; // Excluir resultados con títulos específicos
    isbn?: ISBN; // Excluir resultados con ciertos ISBNs
    regExp?: string; // Exclusión basada en expresiones regulares
  };
};

// Datos de búsqueda
type BookSearch = {
  title?: string; // Título del libro
  author?: string; // Autor del libro
  isbn?: ISBN; // ISBN del libro
};

// Imagen del libro
type BookImage = {
  url: string; // URL de la imagen
  title?: string; // Título asociado a la imagen
};

type Publisher = {
  name: string;
  country: string;
};

type Author = {
  name: string;
  birthDate: Date;
  deathDate?: Date;
  language: string;
  nationality: string;
};

type BookEdition = {
  isbn: ISBN;
  language: string;
  publisher: Publisher;
  images: BookImage[];
  publisedDate?: Date;
};

// Resultado de la búsqueda
type BookResult = {
  title: string;
  author: Author[];
  publisedDate: Date;
  language: string;
  editions: BookEdition[];
};

// Consulta de búsqueda: combinación de búsqueda, paginación y estrategias
type SearchQuery = {
  query: BookSearch; // Parámetros de búsqueda
} & Pagination & // Paginación opcional
  SearchStrategies; // Estrategias y configuraciones de búsqueda

// Resultado de la búsqueda
type SearchResult = {
  results: BookResult[];
  total: number;
  metadata?: Record<string, any>;
  origin?: ResultOrigin;
};

// Interfaz para estrategias de búsqueda
export interface SearchStrategy {
  search(query: SearchQuery): Promise<SearchResult>; // Método de búsqueda
}
