import { Module } from '@nestjs/common';
import { SearchController } from './infraestructure/search.controller';
import { GoogleBooksModule } from '../search-plugins/google-books/google-books.module';
import { SearchPluginsService } from '../search-plugins/plugin-module/search-plugins.service';
import { SearchResolver } from './infraestructure/graphql/search.resolver';

@Module({
  imports: [GoogleBooksModule],
  controllers: [SearchController],
  providers: [SearchPluginsService, SearchResolver],
  exports: [SearchPluginsService],
})
export class SearchModule {}
