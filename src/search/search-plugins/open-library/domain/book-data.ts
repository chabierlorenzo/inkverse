export interface OpenApiBookInfo {
  description: Description;
  title: string;
  publish_date: string;
  publishers: string[];
  type: Type;
  isbn_13?: string[];
  isbn_10?: string[];
  physical_dimensions: string;
  weight: string;
  series: string[];
  publish_places: string[];
  languages: Type[];
  contributors: Contributor[];
  translated_from: Type[];
  covers: number[];
  source_records: string[];
  key: string;
  number_of_pages: number;
  works: Type[];
  latest_revision: number;
  revision: number;
  created: Description;
  last_modified: Description;
}

interface Contributor {
  role: string;
  name: string;
}

interface Type {
  key: string;
}

interface Description {
  type: string;
  value: string;
}
