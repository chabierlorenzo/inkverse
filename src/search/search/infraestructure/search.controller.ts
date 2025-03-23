import { Controller, Get, Param } from '@nestjs/common';
import { SearchPluginsService } from '../../search-plugins/plugin-module/search-plugins.service';
import { SearchQuery } from '../domain/ports/search-strategy';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsolidateService } from '../../search-consolidator/domain/services/consolidate.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchPluginsService: SearchPluginsService,
    private readonly consolidateService: ConsolidateService,
  ) {}

  @Get(':query')
  search(@Param('query') query: string) {
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
    ).pipe(
      map((results) =>
        this.consolidateService.consolidate(results, searchQuery),
      ),
    );
  }

  private extractValue(input: string, key: string): string {
    const regex = new RegExp(`${key}:(.+)`, 'i');
    const match = input.match(regex);
    return match?.[1].trim() ?? '';
  }
}
