import { Controller, Get, Inject, Param } from '@nestjs/common';
import { SearchStrategyPort } from '../domain/ports/search.port';

@Controller('search')
export class SearchController {
  constructor(
    @Inject('GoogleSearch')
    private readonly googleSearch: SearchStrategyPort,
  ) {}

  @Get(':query')
  search(@Param('query') query: string) {
    const searchQuery = {};
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery.includes('isnbn')) {
      searchQuery['isbn'] = this.extractValue(normalizedQuery, 'isbn');
    } else if (normalizedQuery.includes('author')) {
      searchQuery['author'] = this.extractValue(normalizedQuery, 'author');
    } else {
      searchQuery['title'] = normalizedQuery;
    }

    return this.googleSearch.search({
      query: searchQuery,
    });
  }

  private extractValue(input: string, key: string): string {
    const regex = new RegExp(`${key}:(.+)`, 'i');
    const match = input.match(regex);
    return match?.[1].trim() ?? '';
  }
}
