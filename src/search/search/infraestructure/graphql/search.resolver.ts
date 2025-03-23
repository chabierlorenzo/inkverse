import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchPluginsService } from '../../../search-plugins/plugin-module/search-plugins.service';
import { SearchQuery } from '../../domain/ports/search-strategy';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResponse } from './search.type';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchPluginsService: SearchPluginsService) {}

  @Query(() => SearchResponse)
  search(@Args('query') query: string) {
    const searchQuery = {};
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery.includes('isbn')) {
      searchQuery['isbn'] = this.extractValue(normalizedQuery, 'isbn');
    } else if (normalizedQuery.includes('author')) {
      searchQuery['author'] = this.extractValue(normalizedQuery, 'author');
    } else {
      searchQuery['title'] = normalizedQuery;
    }

    const plugins = this.searchPluginsService.getAllPlugins();

    if (!plugins.length) {
      return { results: [] };
    }

    return forkJoin(
      plugins.map((plugin) =>
        plugin.search({ query: searchQuery } as SearchQuery),
      ),
    ).pipe(
      map((results) => ({
        results: results.map((result) => ({ books: result })),
      })),
    );
  }

  private extractValue(input: string, key: string): string {
    const regex = new RegExp(`${key}:(.+)`, 'i');
    const match = input.match(regex);
    return match?.[1].trim() ?? '';
  }
}
