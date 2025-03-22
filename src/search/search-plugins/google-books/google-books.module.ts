import { Module } from '@nestjs/common';
import { GoogleSearch } from './infraestructure/google.search';
import { HttpModule } from '@nestjs/axios';
import { GbooksMapper } from './domain/services/mapper';
import { GBooksFilter } from './domain/services/filter';

@Module({
  imports: [HttpModule],
  exports: ['GoogleSearch'],
  providers: [
    GoogleSearch,
    GbooksMapper,
    GBooksFilter,
    { provide: 'GoogleSearch', useClass: GoogleSearch },
  ],
})
export class GoogleBooksModule {}
