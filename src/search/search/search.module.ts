import { Module } from '@nestjs/common';
import { SearchController } from './infraestructure/search.controller';
import { GoogleBooksModule } from '../search-plugins/google-books/google-books.module';
import { PluginsModule } from '../search-plugins/plugin-module/plugin.module';
import { GoogleSearch } from '../search-plugins/google-books/infraestructure/google.search';
import { SearchPluginsService } from '../search-plugins/plugin-module/search-plugins.service';

@Module({
  providers: [
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
  imports: [GoogleBooksModule, PluginsModule],
  controllers: [SearchController],
})
export class SearchModule {}
