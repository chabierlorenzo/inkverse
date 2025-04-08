import { Module } from '@nestjs/common';

import { TodosTusLibrosService } from './todos-tus-libros/todos-tus-libros.service';
import { TodosTusLibrosAdapter } from './todos-tus-libros/todos-tus-libros.adapter';

@Module({
  providers: [TodosTusLibrosService, TodosTusLibrosAdapter],
  exports: [TodosTusLibrosService],
})
export class DataHarvestingModule {}
