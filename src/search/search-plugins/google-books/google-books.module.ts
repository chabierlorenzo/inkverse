import { Module } from '@nestjs/common';
import { GoogleSearch } from './infraestructure/google.search';
import { HttpModule } from '@nestjs/axios';
import { GbooksMapper } from './domain/services/mapper';
import { GBooksFilter } from './domain/services/filter';

@Module({
  imports: [HttpModule],
  providers: [GoogleSearch, GbooksMapper, GBooksFilter],
  exports: [GoogleSearch],
})
export class GoogleBooksModule {}
