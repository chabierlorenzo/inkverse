import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchPluginsService } from '../../../search-plugins/plugin-module/search-plugins.service';
import { SearchQuery } from '../../domain/ports/search-strategy';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsolidateService } from '../../../search-consolidator/domain/services/consolidate.service';
import { SearchResultGQ } from './search.type';

@Resolver('Search')
export class SearchResolver {
  constructor(
    private readonly searchPluginsService: SearchPluginsService,
    private readonly consolidateService: ConsolidateService,
  ) {}

  @Query(() => SearchResultGQ)
  async search(@Args('query') query: string): Promise<SearchResultGQ> {
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
    return forkJoin(
      plugins.map((plugin) =>
        plugin.search({ query: searchQuery } as SearchQuery),
      ),
    )
      .pipe(
        map((results) =>
          this.consolidateService.consolidate(results, searchQuery),
        ),
      )
      .toPromise();
  }

  private extractValue(input: string, key: string): string {
    const regex = new RegExp(`${key}:(.+)`, 'i');
    const match = input.match(regex);
    return match?.[1].trim() ?? '';
  }
}
