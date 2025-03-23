import { Module } from '@nestjs/common';
import { SearchPluginsService } from '../search-plugins/plugin-module/search-plugins.service';
import { GoogleSearch } from '../search-plugins/google-books/infraestructure/google.search';
import { OpenApiBookSearch } from '../search-plugins/open-library/infraestructure/open-api.search';
import { GoogleBooksModule } from '../search-plugins/google-books/google-books.module';
import { OpenLibraryModule } from '../search-plugins/open-library/open-library.module';

@Module({
  imports: [GoogleBooksModule, OpenLibraryModule, SearchOrchestationModule],
  providers: [
    SearchPluginsService,
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
        pluginsService.registerPlugin(googleSearch.origin(), googleSearch);
      },
      inject: [GoogleSearch, OpenApiBookSearch, SearchPluginsService],
    },
  ],
  exports: [SearchPluginsService],
})
export class SearchOrchestationModule {}
