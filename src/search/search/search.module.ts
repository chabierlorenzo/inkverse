import { Module } from '@nestjs/common';
import { SearchController } from './infraestructure/search.controller';
import { GoogleBooksModule } from '../search-plugins/google-books/google-books.module';
import { SearchPluginsService } from '../search-plugins/plugin-module/search-plugins.service';
import { SearchResolver } from './infraestructure/graphql/search.resolver';
import { GoogleSearch } from '../search-plugins/google-books/infraestructure/google.search';

@Module({
  imports: [GoogleBooksModule],
  controllers: [SearchController],
  providers: [
    SearchPluginsService,
    SearchResolver,

    {
      provide: 'PLUGIN_REGISTRATION',
      useFactory: (
        googleSearch: GoogleSearch,
        pluginsService: SearchPluginsService,
      ) => {
        pluginsService.registerPlugin('google-books', googleSearch);
      },
      inject: [GoogleSearch, SearchPluginsService],
    },
  ],
  exports: [SearchPluginsService],
})
export class SearchModule {}
