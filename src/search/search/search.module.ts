import { Module } from '@nestjs/common';
import { SearchController } from './infraestructure/search.controller';
import { GoogleBooksModule } from '../search-plugins/google-books/google-books.module';

@Module({
  imports: [GoogleBooksModule],
  controllers: [SearchController],
})
export class SearchModule {}
