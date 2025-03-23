import { Module } from '@nestjs/common';
import { SearchController } from './infraestructure/search.controller';
import { GoogleBooksModule } from '../search-plugins/google-books/google-books.module';
import { SearchPluginsService } from '../search-plugins/plugin-module/search-plugins.service';
import { SearchResolver } from './infraestructure/graphql/search.resolver';
import { GoogleSearch } from '../search-plugins/google-books/infraestructure/google.search';
import { OpenLibraryModule } from '../search-plugins/open-library/open-library.module';
import { OpenApiBookSearch } from '../search-plugins/open-library/infraestructure/open-api.search';

@Module({
  imports: [GoogleBooksModule, OpenLibraryModule],
  controllers: [SearchController],
  providers: [
    SearchPluginsService,
    SearchResolver,

    {
      provide: 'PLUGIN_REGISTRATION',
      useFactory: (
        googleSearch: GoogleSearch,
        openApiBookSearch: OpenApiBookSearch,
        pluginsService: SearchPluginsService,
      ) => {
        pluginsService.registerPlugin(
          openApiBookSearch.origin(),
          openApiBookSearch,
        );
        // pluginsService.registerPlugin(googleSearch.origin(), googleSearch);
      },
      inject: [GoogleSearch, OpenApiBookSearch, SearchPluginsService],
    },
  ],
  exports: [SearchPluginsService],
})
export class SearchModule {}
