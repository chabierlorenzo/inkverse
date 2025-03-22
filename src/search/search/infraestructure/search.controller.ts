import { Controller, Get } from '@nestjs/common';
import { GoogleSearch } from 'src/search/search-plugins/google-books/infraestructure/google.search';

@Controller('search')
export class SearchController {
  constructor(private readonly googleSearch: GoogleSearch) {}

  @Get()
  search() {
    return this.googleSearch.search({
      query: {
        title: 'The Hobbit',
      },
    });
  }
}
