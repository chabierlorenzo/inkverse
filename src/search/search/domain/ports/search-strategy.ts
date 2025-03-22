import { Book } from 'src/catalog/book/domain/interfaces';

// Alias para tipos comunes
type ISBN = string;

// Paginación
type Pagination = {
  page?: number; // Página actual
  limit?: number; // Límite de resultados por página
};

// Orígenes de búsqueda
type ResultOrigin =
  | 'google-books'
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

// Consulta de búsqueda: combinación de búsqueda, paginación y estrategias
export type SearchQuery = {
  query: BookSearch; // Parámetros de búsqueda
} & Pagination & // Paginación opcional
  SearchStrategies; // Estrategias y configuraciones de búsqueda

// Resultado de la búsqueda
export type SearchResult = {
  results: Book[];
  total: number;
  metadata?: Record<string, any>;
  origin?: ResultOrigin;
};

// Interfaz para estrategias de búsqueda
