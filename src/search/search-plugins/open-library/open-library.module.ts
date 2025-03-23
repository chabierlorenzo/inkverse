import { Module } from '@nestjs/common';
import { OpenApiBookImage } from './domain/services/book-image';
import { OpenApiBookSearch } from './infraestructure/open-api.search';
import { OpenApiMapper } from './domain/services/mapper';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OpenApiBookImage, OpenApiBookSearch, OpenApiMapper],
  exports: [OpenApiBookSearch],
})
export class OpenLibraryModule {}
