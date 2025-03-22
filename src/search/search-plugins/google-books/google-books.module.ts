import { Module } from '@nestjs/common';
import { GoogleSearch } from './infraestructure/google.search';
import { HttpModule } from '@nestjs/axios';
import { GbooksMapper } from './domain/services/mapper';

@Module({
  imports: [HttpModule],
  providers: [GoogleSearch, GbooksMapper],
  exports: [GoogleSearch],
})
export class GoogleBooksModule {}
